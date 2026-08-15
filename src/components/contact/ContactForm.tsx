"use client";

import { useActionState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/(site)/contact/actions";
import { serviceNav } from "@/lib/site";
import { cn } from "@/lib/cn";

// Lives here, not in actions.ts: a "use server" module may only export async
// functions, so a plain object export arrives as undefined at runtime.
const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
  errors: {},
};

const fieldBase =
  "h-12 w-full rounded-[10px] border bg-white px-3.5 text-[14px] text-ink transition-colors duration-200 outline-none placeholder:text-subtle focus:border-teal-400";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-semibold text-ink"
    >
      {children}
      {required ? <span className="ml-0.5 text-error">*</span> : null}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-[12.5px] text-error">
      {children}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialContactState,
  );

  return (
    <div className="rounded-lg border border-line bg-white p-6 shadow-card lg:p-8">
      <h2 className="text-[24px] font-bold text-ink lg:text-[26px]">
        Send Us a Message
      </h2>
      <p className="mt-2.5 max-w-[46ch] text-[14px] leading-[1.6] text-muted">
        Fill out the form below and one of our Amazon experts will get back to
        you shortly.
      </p>

      <form action={formAction} className="mt-7" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" required>
              Full Name
            </Label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              aria-invalid={Boolean(state.errors.name)}
              aria-describedby={state.errors.name ? "name-error" : undefined}
              className={cn(
                fieldBase,
                state.errors.name ? "border-error" : "border-line",
              )}
            />
            <FieldError id="name-error">{state.errors.name}</FieldError>
          </div>

          <div>
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={Boolean(state.errors.email)}
              aria-describedby={state.errors.email ? "email-error" : undefined}
              className={cn(
                fieldBase,
                state.errors.email ? "border-error" : "border-line",
              )}
            />
            <FieldError id="email-error">{state.errors.email}</FieldError>
          </div>

          <div>
            <Label htmlFor="company">Company Name</Label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Enter your company name"
              className={cn(fieldBase, "border-line")}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              className={cn(fieldBase, "border-line")}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="service">Service Interested In</Label>
            <select
              id="service"
              name="service"
              defaultValue=""
              className={cn(fieldBase, "border-line appearance-none pr-10")}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a9297' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.85rem center",
                backgroundSize: "1.15rem",
              }}
            >
              <option value="">Select a service</option>
              {serviceNav.map((service) => (
                <option key={service.href} value={service.label}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="message" required>
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your business and how we can help..."
              aria-invalid={Boolean(state.errors.message)}
              aria-describedby={
                state.errors.message ? "message-error" : undefined
              }
              className={cn(
                fieldBase,
                "h-auto resize-y py-3 leading-[1.6]",
                state.errors.message ? "border-error" : "border-line",
              )}
            />
            <FieldError id="message-error">{state.errors.message}</FieldError>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="group/btn mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-[10px] bg-teal-500 text-[15px] font-semibold text-white transition-[background-color,box-shadow] duration-200 ease-out-soft hover:bg-teal-400 hover:shadow-cta disabled:pointer-events-none disabled:opacity-55"
        >
          {isPending ? "Sending..." : "Send Message"}
          <Icon
            name="send"
            size={17}
            className="shrink-0 transition-transform duration-200 ease-out-soft group-hover/btn:translate-x-0.5"
          />
        </button>

        {state.status !== "idle" ? (
          <p
            role="status"
            className={cn(
              "mt-4 rounded-[10px] px-4 py-3 text-[13.5px] font-medium",
              state.status === "success"
                ? "bg-teal-50 text-teal-700"
                : "bg-error/10 text-error",
            )}
          >
            {state.message}
          </p>
        ) : null}

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[12.5px] text-subtle">
          <Icon name="lock" size={14} />
          Your information is 100% secure and will never be shared.
        </p>
      </form>
    </div>
  );
}
