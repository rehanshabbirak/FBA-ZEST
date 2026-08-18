import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/shared/TrustBar";
import { Services } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonials } from "@/components/home/Testimonials";

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
      <WhyUs />
      <Testimonials />
    </>
  );
}
