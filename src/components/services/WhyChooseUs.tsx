import Image from "next/image";
import growthPerson from "../../../public/images/services_growth_person.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { agencyStats, type Stat } from "@/lib/stats";
import { RevealText } from "@/components/motion/RevealText";

const icons: Record<Stat["key"], IconName> = {
  salesGrowth: "growth-arrow",
  ppcSales: "megaphone",
  acos: "target",
  buyBox: "chart-bar",
};

// The panel is a vertical stack beside the photo and only has room for three;
// Buy Box is the least relevant of the four to a services page.
const shown = agencyStats.filter((stat) => stat.key !== "buyBox");

const PHOTO_ALT =
  "An Amazon brand manager reviewing performance dashboards on a laptop, with a rising sales chart behind him.";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-50 via-white to-surface">
      <div className="absolute inset-y-0 right-0 hidden overflow-hidden lg:block lg:left-[calc(min(58%,calc(50%_+_0.08_*_var(--container-page)))_+_48px)]">
        <Image
          src={growthPerson}
          alt={PHOTO_ALT}
          fill
          sizes="45vw"
          className="scale-110 object-cover object-center origin-right [mask-image:linear-gradient(to_right,transparent_9%,#0009_17%,#000e_24%,#000_31%)]"
        />
      </div>

      <Container className="relative grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-10 lg:py-14 lg:pr-[min(42%,calc(0.42_*_var(--container-page)))]">
        <Reveal>
          <Eyebrow>Why Choose Us</Eyebrow>
          <RevealText className="mt-4 max-w-[19ch] text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[36px] lg:text-[38px]">
            Your Growth Partner on <span className="text-teal-500">Amazon</span>
          </RevealText>
          <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.7] text-muted">
            We combine industry expertise, innovative strategies and a
            performance-driven approach to deliver measurable results.
          </p>
          <Button href="/contact" size="lg" className="mt-7">
            Get Started
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <ul className="flex flex-col gap-6 rounded-lg border border-line bg-white p-7 shadow-card">
            {shown.map((stat, i) => (
              <li key={stat.key} className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <Icon name={icons[stat.key]} size={22} strokeWidth={1.7} />
                </span>
                <div>
                  <p className="text-[24px] leading-none font-bold text-ink">
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      delay={i * 80}
                    />
                  </p>
                  <p className="mt-1.5 text-[13px] text-muted">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <div className="relative aspect-16/10 w-full lg:hidden">
        <Image
          src={growthPerson}
          alt=""
          fill
          sizes="(min-width: 1024px) 1px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
