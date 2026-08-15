"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function deliverEnquiry(enquiry: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}): Promise<void> {
  // NOT WIRED TO A PROVIDER YET. Replace this with the transactional email or
  // CRM call before launch, otherwise submissions are only written to the
  // server log and no one is notified.
  console.info("[contact] enquiry received", enquiry);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const enquiry = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    company: field(formData, "company"),
    phone: field(formData, "phone"),
    service: field(formData, "service"),
    message: field(formData, "message"),
  };

  const errors: ContactFormState["errors"] = {};

  if (!enquiry.name) errors.name = "Please tell us your name.";
  if (!enquiry.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(enquiry.email)) {
    errors.email = "That email address does not look right.";
  }
  if (enquiry.message.length < 10) {
    errors.message = "Please give us a little more detail (10+ characters).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  try {
    await deliverEnquiry(enquiry);
  } catch {
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
