import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Contact Us"
      title="Let's Scale Your Amazon Business"
      description="Consultation form, contact details and trust strip — this page is next in the build queue."
    />
  );
}
