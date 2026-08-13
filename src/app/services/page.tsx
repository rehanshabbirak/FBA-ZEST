import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { WhyChooseUs } from "@/components/services/WhyChooseUs";
import { ProcessStrip } from "@/components/services/ProcessStrip";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Amazon brand management, PPC advertising, digital marketing, supply chain, content creation and growth consulting — end-to-end solutions for Amazon and beyond.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <WhyChooseUs />
      <ProcessStrip />
    </>
  );
}
