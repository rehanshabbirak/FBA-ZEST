import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { agencyStats, type Stat } from "@/lib/stats";

const icons: Record<Stat["key"], IconName> = {
  salesGrowth: "chart-line",
  ppcSales: "megaphone",
  acos: "target",
  buyBox: "trophy",
};

export function AboutStats() {
  return (
    <section aria-label="Agency results at a glance" className="bg-white">
      <Container className="pb-16 lg:pb-24">
        <Reveal>
          <ul className="grid gap-y-10 rounded-lg bg-black px-6 py-11 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:px-4">
            {agencyStats.map((stat, i) => (
              <li
                key={stat.key}
                className="px-2 lg:border-l lg:border-white/12 lg:first:border-l-0"
              >
                <div className="mx-auto flex w-full max-w-52.5 items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                    <Icon name={icons[stat.key]} size={26} strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[26px] leading-none font-bold text-white lg:text-[28px]">
                      <CountUp
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        delay={i * 80}
                      />
                    </p>
                    <p className="mt-2 text-[13px] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
