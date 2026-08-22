import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutValues } from "@/components/about/AboutValues";
import { CTABanner } from "@/components/shared/CTABanner";
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
      <AboutApproach />
      <AboutValues />
      <CTABanner
        icon="handshake"
        title="Ready to Put a Senior Team on Your Amazon Account?"
        description="Tell us where the account stands today and what is getting in the way. We will come back with the biggest opportunities we can see — no obligation, no sales pitch."
        note="Every engagement starts with a free account audit."
      />
    </>
  );
}
