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
  salesGrowth: "growth-arrow",
  ppcSales: "megaphone",
  acos: "target",
  buyBox: "trophy",
};

export function WhyUs() {
  return (
    <section data-testid="why-us" className="relative overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_60%_at_65%_50%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="teal-glow pointer-events-none absolute -bottom-[30%] -left-[5%] h-105 w-130 opacity-45"
      />

      <Container className="relative grid gap-12 py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:py-12">
        <Reveal>
          <Eyebrow>Why Choose FBA Zest?</Eyebrow>
          <RevealText className="mt-4 max-w-[14ch] text-3xl leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[2.375rem] lg:text-[2.625rem]">
            Your Growth is Our Mission
          </RevealText>
          <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-[1.7] text-white/65">
            Our primary goal is to achieve up to 30% sales growth for your
            Amazon business through effective ad management. We specialize in
            optimizing your ad spend to ensure that every dollar works harder
            for you, driving higher returns. Our expert team uses data-driven
            strategies and advanced tools to fine-tune your campaigns, improve
            visibility, and boost conversions.
          </p>
          <Button href="/about" size="lg" className="mt-8">
            About Us
          </Button>
        </Reveal>

        <StaggerCards className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {agencyStats.map((stat, i) => (
            <li key={stat.key}>
              <div className="group glass-panel relative isolate flex h-full flex-col items-center justify-center overflow-hidden rounded-lg px-4 py-9 text-center transition-[transform,border-color,box-shadow] duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-teal-500/60 hover:shadow-[0_1.375rem_2.875rem_-1.375rem_rgb(0_0_0/0.9),inset_0_0.0625rem_0_rgb(255_255_255/0.22)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-white/0 transition-colors duration-500 ease-out-soft group-hover:bg-white/6"
                />

                <Icon
                  name={icons[stat.key]}
                  size={34}
                  strokeWidth={1.5}
                  className="text-teal-400 transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:scale-110"
                />
                <p className="mt-6 text-3xl leading-none font-bold text-white lg:text-[2.125rem]">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    delay={i * 80}
                  />
                </p>
                <p className="mt-2.5 text-[0.75rem] font-medium text-white/60 transition-colors duration-500 ease-out-soft group-hover:text-white/80">
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
