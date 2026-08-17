import Image from "next/image";
import heroImage from "../../../public/images/blog-hero-section.png";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";

const HERO_ALT =
  "An Amazon seller dashboard on a laptop showing $1.45M total sales, 12,432 orders, 18.6% ACOS and 5.32 ROAS, beside a sales overview chart and a category breakdown.";

const highlights: { icon: IconName; label: string }[] = [
  { icon: "chart-bar", label: "Actionable Strategies" },
  { icon: "lightning", label: "Proven Results" },
  { icon: "users", label: "Expert Insights" },
];

export function BlogHero() {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <Image
          src={heroImage}
          alt={HERO_ALT}
          fill
          priority
          placeholder="blur"
          sizes="56vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-black from-0% via-black/35 via-14% to-transparent to-42%"
        />
      </div>

      <Container className="relative">
        <div className="max-w-lg py-16 lg:py-24">
          <Eyebrow>Blog &amp; Insights</Eyebrow>

          <h1 className="mt-4 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[42px] lg:text-[46px]">
            Insights That Drive
            <span className="block text-teal-400">Amazon Growth</span>
          </h1>

          <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.7] text-white/70">
            Stay ahead with expert strategies, tips, and case studies to scale
            your Amazon business.
          </p>

          <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-6">
            {highlights.map((highlight) => (
              <li
                key={highlight.label}
                className="flex max-w-[10ch] flex-col gap-2.5"
              >
                <Icon
                  name={highlight.icon}
                  size={26}
                  strokeWidth={1.6}
                  className="text-teal-400"
                />
                <span className="text-[13px] leading-snug font-semibold text-white">
                  {highlight.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative aspect-3/2 w-full lg:hidden">
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
