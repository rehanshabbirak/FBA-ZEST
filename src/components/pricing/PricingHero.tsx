import Image from "next/image";
import heroDashboard from "../../../public/images/pricing-hero-page.png";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { pricingGuarantees } from "@/lib/content/pricing";

const HERO_ALT =
  "Amazon seller dashboards on angled screens showing $125,420 total sales, 3,254 orders, 22.3% ACOS and rising performance charts, lit in teal.";

export function PricingHero() {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <Image
          src={heroDashboard}
          alt={HERO_ALT}
          fill
          priority
          placeholder="blur"
          sizes="56vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-black from-0% via-black/40 via-14% to-transparent to-42%"
        />
      </div>

      <Container className="relative">
        <div className="max-w-xl py-16 lg:max-w-lg lg:py-24">
          <Eyebrow>Pricing Plans</Eyebrow>

          <h1 className="mt-4 text-[2.125rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[2.625rem] lg:text-[2.875rem]">
            Simple Pricing.
            <span className="mt-1 block text-teal-400">Powerful Growth.</span>
          </h1>

          <p className="mt-5 max-w-[44ch] text-base leading-[1.7] text-white/70">
            Choose the plan that fits your business goals and let our Amazon
            experts drive real results.
          </p>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {pricingGuarantees.map((guarantee) => (
              <li
                key={guarantee}
                className="flex items-center gap-2 text-[0.8125rem] font-medium text-white/80"
              >
                <Icon
                  name="shield-check"
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-teal-400"
                />
                {guarantee}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative aspect-16/10 w-full lg:hidden">
        <Image
          src={heroDashboard}
          alt=""
          fill
          sizes="(min-width: 1024px) 1px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
