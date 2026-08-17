import Image from "next/image";
import heroImage from "../../../public/images/case-study-hero.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const HERO_ALT =
  "An Amazon sales dashboard on a laptop with a steeply rising trend line, flanked by metric cards reading Total Sales $1,234,567 up 124.6%, ACOS 18.6% down 23.4%, and Orders 25,643 up 98.3%.";

export function CaseStudiesHero() {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <Image
          src={heroImage}
          alt={HERO_ALT}
          fill
          priority
          sizes="56vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-black from-0% via-black/35 via-14% to-transparent to-40%"
        />
      </div>

      <Container className="relative">
        <div className="max-w-lg py-16 lg:py-24">
          <Eyebrow>Case Studies</Eyebrow>

          <h1 className="mt-4 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[42px] lg:text-[46px]">
            Real Brands.
            <br />
            Real Results.
          </h1>

          <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.7] text-white/70">
            We partner with ambitious brands and turn challenges into measurable
            growth on Amazon and beyond.
          </p>

          <Button href="/contact" size="lg" className="mt-8">
            Work With Us
          </Button>
        </div>
      </Container>

      <div className="relative aspect-16/10 w-full lg:hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 1px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
