import Image from "next/image";
import heroLaptop from "../../../public/images/services_hero_laptop.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const HERO_ALT =
  "A laptop on a desk displaying the Amazon logo above a rising bar chart and growth arrow, lit in teal.";

export function ServicesHero() {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src={heroLaptop}
          alt={HERO_ALT}
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-black from-0% to-transparent to-38%"
        />
      </div>

      <Container className="relative">
        <div className="max-w-xl py-16 lg:py-28">
          <Eyebrow>Our Services</Eyebrow>

          <h1 className="mt-4 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[42px] lg:text-[46px]">
            End-to-End Solutions for Amazon &amp; Beyond
          </h1>

          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-white/70">
            We help brands grow, scale and succeed with data-driven strategies
            and performance marketing.
          </p>

          <Button href="/contact" size="lg" className="mt-8">
            Get a Free Consultation
          </Button>
        </div>
      </Container>

      <div className="relative aspect-3/2 w-full lg:hidden">
        <Image
          src={heroLaptop}
          alt=""
          fill
          sizes="(min-width: 1024px) 1px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
