import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingAssurances } from "@/components/pricing/PricingAssurances";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing, powerful growth. Choose the Amazon advertising, listing or full-service plan that fits your goals — no long-term contracts.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PricingAssurances />
    </>
  );
}
