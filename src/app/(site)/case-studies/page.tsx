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
        icon="target"
        title="Ready to Build a More Profitable Amazon Growth Strategy?"
        description="Whether you need to scale a hero product, improve advertising efficiency, recover after an inventory disruption, or turn a broad catalog into a focused growth engine, FBA Zest can help."
        note="Let's identify the biggest growth opportunities in your Amazon account."
      />
    </>
  );
}
