import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/shared/TrustBar";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { OperatingRhythm } from "@/components/home/OperatingRhythm";
import { WeeklyReporting } from "@/components/home/WeeklyReporting";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { FitCheck } from "@/components/home/FitCheck";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonials } from "@/components/home/Testimonials";
import { ProofResults } from "@/components/home/ProofResults";
import { Faq } from "@/components/shared/Faq";
import { GrowthChapter } from "@/components/home/GrowthChapter";

export const metadata: Metadata = {
  title: "Amazon Account Management Agency",
  description:
    "We build, grow and scale Amazon brands. From strategy to execution — PPC, listing optimization, content and analytics that drive profitable growth.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar heading={"We’ve Helped Brands Grow on Amazon"} />
      <Services />
      <Process />
      <OperatingRhythm />
      <WeeklyReporting />
      <AboutSnapshot />
      <FitCheck />
      <WhyUs />
      <Testimonials />
      <ProofResults />
      <Faq />
      <GrowthChapter />
    </>
  );
}
