import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";

const covered = [
  "Sales, orders, ACOS & TACOS",
  "PPC spend, sales & conversion",
  "Factors behind movement",
  "Prioritized next actions",
];

type Line = {
  label: string;
  value: string;
  delta: string;
  note: string;
};

const lines: Line[] = [
  {
    label: "Sales & Orders",
    value: "$51,542.83",
    delta: "6.82%",
    note: "Orders increased 3.39% as conversion remained stable across priority variations.",
  },
  {
    label: "ACOS & TACOS",
    value: "20.81% / 8.19%",
    delta: "6.54%",
    note: "TACOS rose modestly as investment increased behind ranking campaigns.",
  },
  {
    label: "PPC Performance",
    value: "$20,268.90",
    delta: "3.25%",
    note: "Spend was concentrated on top-converting terms while irrelevant traffic was negated.",
  },
];

export function WeeklyReporting() {
  return (
    <section data-testid="weekly-reporting" className="bg-surface">
      <Container className="py-10 lg:py-12">
        <Reveal className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-teal-500/50 sm:w-10"
          />
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-teal-500"
          />
          <Eyebrow>Clarity Every Week</Eyebrow>
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-teal-500"
          />
          <span
            aria-hidden="true"
            className="h-px w-8 bg-teal-500/50 sm:w-10"
          />
        </Reveal>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-14">
          <Reveal>
            <RevealText className="max-w-[16ch] text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[42px]">
              Reporting that answers{" "}
              <span className="text-teal-500">“why,”</span> not just “what.”
            </RevealText>

            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
              Your weekly update connects performance with inventory, pricing,
              reviews, catalog issues, and the actions we took.
            </p>

            <ul className="mt-8 space-y-4">
              {covered.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 shadow-card"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-teal-500/25 bg-teal-50 text-teal-600">
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span className="text-[14px] leading-snug font-semibold text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="group relative isolate overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-dark-surface via-dark-900 to-black p-6 shadow-card-hover lg:p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-teal-400/0 transition-colors duration-700 ease-out-soft group-hover:bg-teal-400/4"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-white/10 to-transparent"
              />
              <span
                aria-hidden="true"
                className="teal-glow pointer-events-none absolute -top-20 -right-16 -z-10 h-56 w-72 opacity-55 transition-opacity duration-700 ease-out-soft group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.14em] text-white/45 uppercase">
                    Weekly Performance
                  </p>
                  <h3 className="mt-1.5 text-[20px] leading-tight font-bold tracking-[-0.01em] text-white transition-colors duration-500 ease-out-soft group-hover:text-teal-200 lg:text-[22px]">
                    Executive summary
                  </h3>
                </div>

                <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] text-white/60 uppercase">
                  Feb 08 — Feb 14
                </span>
              </div>

              <StaggerCards
                y={18}
                className="mt-5 divide-y divide-white/10 border-t border-white/10"
              >
                {lines.map((line) => (
                  <li
                    key={line.label}
                    className="group/metric relative py-4 transition-colors duration-300 ease-out-soft hover:bg-white/4"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[13.5px] font-bold text-white transition-colors duration-300 ease-out-soft group-hover/metric:text-teal-100">
                        {line.label}
                      </p>
                      <p className="flex shrink-0 items-baseline gap-2">
                        <span className="text-[15px] font-bold tracking-[-0.01em] text-white transition-colors duration-300 ease-out-soft group-hover/metric:text-teal-50">
                          {line.value}
                        </span>
                        <span className="flex items-center gap-0.5 text-[12px] font-bold text-teal-300">
                          <Icon
                            name="arrow-up-right"
                            size={11}
                            strokeWidth={2.6}
                          />
                          {line.delta}
                        </span>
                      </p>
                    </div>
                    <p className="mt-1.5 max-w-[58ch] text-[13px] leading-[1.6] text-white/55">
                      {line.note}
                    </p>
                  </li>
                ))}
              </StaggerCards>

              <div className="mt-5 rounded-lg border border-teal-400/20 bg-teal-400/8 p-4">
                <p className="text-[11px] font-bold tracking-[0.14em] text-teal-300 uppercase">
                  Next Action
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-white/60 transition-colors duration-500 ease-out-soft group-hover:text-white/80">
                  Reduce bids on low-converting terms and expand exact-match
                  coverage for emerging search queries.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
