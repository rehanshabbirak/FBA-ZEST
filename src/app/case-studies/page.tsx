import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { CaseStudyList } from "@/components/case-studies/CaseStudyList";
import { TrustBar } from "@/components/shared/TrustBar";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real brands, real results. See how we grew sales, cut ACOS and lifted ROAS for Amazon brands across categories.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <TrustBar heading="Trusted by 100+ brands worldwide" dividers />
      <CaseStudyList />
      <CTABanner
        title="Ready to Be Our Next Success Story?"
        description="Let's build, grow, and scale your brand on Amazon."
      />
    </>
  );
}
