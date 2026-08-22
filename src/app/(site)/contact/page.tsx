import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TrustBar } from "@/components/shared/TrustBar";
import { CTABanner } from "@/components/shared/CTABanner";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { bookingUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to our Amazon experts. Get a free consultation on PPC, SEO, listing optimization and brand growth — we reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-white">
        <Container className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10 lg:py-16">
          <ContactForm />
          <ContactChannels />
        </Container>
      </section>

      <TrustBar heading="Trusted by 300+ Amazon brands growing with us" dividers />

      <CTABanner
        icon="calendar"
        title="Ready to Take Your Amazon Business to the Next Level?"
        description="Book a free consultation call with our experts and get a customized growth plan."
        ctaLabel="Book Free Consultation"
        ctaHref={bookingUrl}
      />
    </>
  );
}
