"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { renderEnquiryEmail, type Enquiry } from "@/lib/email/enquiry-email";

export type AccountReviewState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"email" | "revenue", string>>;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTH = { short: 200, message: 5000 } as const;

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 3 } as const;

const recentSubmissions = new Map<string, number[]>();

function field(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function clientKey(): Promise<string> {
  const headerList = await headers();
  // x-forwarded-for is a client-controlled chain; the first entry is the one
  // the edge appended, so it is the least forgeable part available here.
  const forwarded = headerList.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT.windowMs;
  const recent = (recentSubmissions.get(key) ?? []).filter((at) => at > cutoff);

  if (recent.length >= RATE_LIMIT.max) {
    recentSubmissions.set(key, recent);
    return true;
  }

  recent.push(now);
  recentSubmissions.set(key, recent);

  // The map would otherwise grow for the lifetime of the process.
  if (recentSubmissions.size > 5000) {
    for (const [entry, times] of recentSubmissions) {
      if (times.every((at) => at <= cutoff)) recentSubmissions.delete(entry);
    }
  }

  return false;
}

async function deliverEnquiry(enquiry: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Fail loudly rather than telling the visitor their message was sent when
  // no provider is configured.
  if (!apiKey || !to || !from) {
    throw new Error(
      "Email is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
  }

  const { subject, html, text } = renderEnquiryEmail(enquiry);

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    // Sending as the visitor's own address would fail SPF/DKIM for their
    // domain and land in spam; reply-to keeps Reply pointed at them.
    replyTo: enquiry.email,
    subject,
    html,
    text,
  });

  if (error) throw new Error(error.message);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Hidden input no human can see or tab into. Anything in it is a bot, so
  // report success without sending — an error would tell it to retry.
  if (field(formData, "hp_reference")) {
    return {
      status: "success",
      message: "Thanks — your message is on its way. We reply within 24 hours.",
      errors: {},
    };
  }

  const enquiry: Enquiry = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    company: field(formData, "company"),
    phone: field(formData, "phone"),
    service: field(formData, "service"),
    message: field(formData, "message"),
  };

  const errors: ContactFormState["errors"] = {};

  if (!enquiry.name) errors.name = "Please tell us your name.";
  else if (enquiry.name.length > MAX_LENGTH.short)
    errors.name = "That name is too long.";

  if (!enquiry.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(enquiry.email)) {
    errors.email = "That email address does not look right.";
  } else if (enquiry.email.length > MAX_LENGTH.short) {
    errors.email = "That email address is too long.";
  }

  if (enquiry.message.length < 10) {
    errors.message = "Please give us a little more detail (10+ characters).";
  } else if (enquiry.message.length > MAX_LENGTH.message) {
    errors.message = "Please keep your message under 5000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  if (isRateLimited(await clientKey())) {
    return {
      status: "error",
      message:
        "You have sent several messages already. Please try again in a few minutes.",
      errors: {},
    };
  }

  try {
    await deliverEnquiry(enquiry);
  } catch (error) {
    // The enquiry itself is never logged: it carries the visitor's name, email
    // and phone number, and server logs are broadly readable.
    console.error(
      "[contact] delivery failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
      errors: {},
    };
  }

  return {
    status: "success",
    message: "Thanks — your message is on its way. We reply within 24 hours.",
    errors: {},
  };
}

const REVENUE_BANDS = [
  "Under $50K",
  "$50K–$150K",
  "$150K–$500K",
  "$500K+",
] as const;

export async function submitAccountReview(
  _prevState: AccountReviewState,
  formData: FormData,
): Promise<AccountReviewState> {
  if (field(formData, "hp_reference")) {
    return {
      status: "success",
      message: "Thanks — we will be in touch within one business day.",
      errors: {},
    };
  }

  const email = field(formData, "email");
  const revenue = field(formData, "revenue");
  const errors: AccountReviewState["errors"] = {};

  if (!email) {
    errors.email = "Please enter your work email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That email address does not look right.";
  } else if (email.length > MAX_LENGTH.short) {
    errors.email = "That email address is too long.";
  }

  if (!revenue) {
    errors.revenue = "Please choose a revenue range.";
  } else if (
    !REVENUE_BANDS.includes(revenue as (typeof REVENUE_BANDS)[number])
  ) {
    errors.revenue = "Please choose one of the listed ranges.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  if (isRateLimited(await clientKey())) {
    return {
      status: "error",
      message:
        "You have sent several requests already. Please try again in a few minutes.",
      errors: {},
    };
  }

  try {
    await deliverEnquiry({
      // No name is collected, so the address stands in for one: it is what the
      // subject line and reply-to need, and inventing a placeholder would put
      // fabricated text in front of whoever reads the notification.
      name: email,
      email,
      company: "",
      phone: "",
      service: "Account review",
      message: `Requested an account review from the homepage. Monthly Amazon revenue: ${revenue}.`,
    });
  } catch (error) {
    console.error(
      "[account-review] delivery failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return {
      status: "error",
      message: "Something went wrong sending your request. Please try again.",
      errors: {},
    };
  }

  return {
    status: "success",
    message: "Thanks — we will be in touch within one business day.",
    errors: {},
  };
}
