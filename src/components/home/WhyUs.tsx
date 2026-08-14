import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { agencyStats, type Stat } from "@/lib/stats";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";

const icons: Record<Stat["key"], IconName> = {
  brands: "cart",
  revenue: "growth-arrow",
  marketplaces: "globe",
  satisfaction: "trophy",
};

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_60%_at_65%_50%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="teal-glow pointer-events-none absolute -bottom-[30%] -left-[5%] h-105 w-130 opacity-45"
      />

      <Container className="relative grid gap-12 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:py-24">
        <Reveal>
          <Eyebrow>Why Choose FBA Zest?</Eyebrow>
          <RevealText className="mt-4 max-w-[14ch] text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[38px] lg:text-[42px]">
            Your Growth is Our Mission
          </RevealText>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-white/65">
            We combine marketplace expertise, data-driven strategies, and
            creative execution to deliver real results.
          </p>
          <Button href="/about" size="lg" className="mt-8">
            About Us
          </Button>
        </Reveal>

        <StaggerCards className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {agencyStats.map((stat, i) => (
            <li key={stat.key}>
              <div className="glass-panel flex h-full flex-col items-center justify-center rounded-lg px-4 py-9 text-center transition-[border-color,transform] duration-300 ease-out-soft hover:-translate-y-1 hover:border-teal-500/60">
                <Icon
                  name={icons[stat.key]}
                  size={34}
                  strokeWidth={1.5}
                  className="text-teal-400"
                />
                <p className="mt-6 text-[30px] leading-none font-bold text-white lg:text-[34px]">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={i * 80}
                  />
                </p>
                <p className="mt-2.5 text-[12px] font-medium text-white/60">
                  {stat.label}
                </p>
              </div>
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
