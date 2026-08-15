import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutValues } from "@/components/about/AboutValues";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.name} is an Amazon brand management agency combining marketplace expertise, data-driven strategy and creative execution to grow brands profitably.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutValues />
    </>
  );
}
