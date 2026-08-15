import Image from "next/image";
import heroImage from "../../../public/png/contact-hero-dashboard.png";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";

const HERO_ALT =
  "An Amazon seller dashboard on a laptop and phone showing $1.45M total sales, 12,432 units ordered and channel breakdowns, ringed by phone, email and chat icons.";

const highlights: { icon: IconName; title: string; detail: string }[] = [
  { icon: "rocket", title: "Fast Response", detail: "Within 24 Hours" },
  { icon: "shield-check", title: "Trusted Experts", detail: "Amazon Specialists" },
  { icon: "chart-bar", title: "Results Driven", detail: "Growth Focused" },
];

export function ContactHero() {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <Image
          src={heroImage}
          alt={HERO_ALT}
          fill
          priority
          placeholder="blur"
          sizes="58vw"
          className="object-contain object-right"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-black from-0% via-black/40 via-12% to-transparent to-38%"
        />
      </div>

      <Container className="relative">
        <div className="max-w-xl py-16 lg:max-w-lg lg:py-24">
          <Eyebrow>Let&rsquo;s Grow Together</Eyebrow>

          <h1 className="mt-4 text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[42px] lg:text-[46px]">
            Let&rsquo;s Scale Your
            <span className="block text-teal-400">Amazon Business</span>
          </h1>

          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-white/70">
            Have questions or need expert advice? We&rsquo;re here to help. Get
            in touch with our team and take the first step toward growing your
            brand on Amazon.
          </p>

          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {highlights.map((highlight) => (
              <li key={highlight.title} className="flex flex-col gap-2.5">
                <Icon
                  name={highlight.icon}
                  size={26}
                  strokeWidth={1.6}
                  className="text-teal-400"
                />
                <span className="text-[13.5px] leading-snug font-semibold text-white">
                  {highlight.title}
                </span>
                <span className="-mt-1.5 text-[12.5px] text-white/55">
                  {highlight.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative aspect-4/3 w-full lg:hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 1px, 100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}
