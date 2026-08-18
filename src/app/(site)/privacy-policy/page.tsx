import type { Metadata } from "next";
import heroImage from "../../../../public/images/privacy-hero-section.png";
import { LegalHero } from "@/components/legal/LegalHero";
import { PolicyContent } from "@/components/legal/PolicyContent";
import { CTABanner } from "@/components/shared/CTABanner";
import {
  getPrivacyPolicyUpdatedAt,
  privacyPolicySections,
} from "@/lib/content/legal";
import { site } from "@/lib/site";

const DESCRIPTION = `Your privacy matters to us. Learn how ${site.name} collects, uses, and protects your information.`;

// The page is otherwise fully static, so the "Last updated" date would be
// frozen at build time. Regenerating daily lets it keep tracking today.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero
        eyebrow="Legal"
        title="Privacy"
        titleAccent="Policy"
        description={DESCRIPTION}
        updatedAt={getPrivacyPolicyUpdatedAt()}
        artwork={heroImage}
      />
      <PolicyContent sections={privacyPolicySections} />
      <CTABanner
        icon="shield-check"
        title="Questions About Your Data?"
        description="Our team is happy to walk you through what we collect, how it is used, and the choices you have."
        ctaLabel="Contact Us"
      />
    </>
  );
}
