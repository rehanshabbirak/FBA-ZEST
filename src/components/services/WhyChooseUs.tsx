import Image from "next/image";
import growthPerson from "../../../public/png/services_growth_person.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { agencyStats, type Stat } from "@/lib/stats";

const icons: Record<Stat["key"], IconName> = {
  brands: "users",
  revenue: "growth-arrow",
  marketplaces: "globe",
  satisfaction: "chart-bar",
};

const OVERRIDES: Partial<Record<Stat["key"], number>> = { brands: 200 };

const shown = agencyStats
  .filter((stat) => stat.key !== "marketplaces")
  .map((stat) => ({ ...stat, value: OVERRIDES[stat.key] ?? stat.value }));

const PHOTO_ALT =
  "An Amazon brand manager reviewing performance dashboards on a laptop, with a rising sales chart behind him.";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-50 via-white to-surface">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden lg:block">
        <Image
          src={growthPerson}
          alt={PHOTO_ALT}
          fill
          sizes="45vw"
          className="scale-110 object-cover object-center origin-right [mask-image:linear-gradient(to_right,transparent_0%,#0009_9%,#000e_16%,#000_24%)]"
        />
      </div>

      <Container className="relative grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-10 lg:py-14 lg:pr-[42%]">
        <Reveal>
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2 className="mt-4 max-w-[19ch] text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[36px] lg:text-[38px]">
            Your Growth Partner on <span className="text-teal-500">Amazon</span>
          </h2>
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
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
