import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { RhythmTimeline } from "@/components/motion/RhythmTimeline";

type Beat = {
  number: string;
  icon: IconName;
  title: string;
  description: string;
};

const beats: Beat[] = [
  {
    number: "01",
    icon: "document-search",
    title: "Audit",
    description:
      "Advertising, listings, catalog, profitability, inventory, and account health.",
  },
  {
    number: "02",
    icon: "clipboard-tasks",
    title: "Build the roadmap",
    description:
      "Targets, priorities, quick wins, and a focused 90-day growth plan.",
  },
  {
    number: "03",
    icon: "rocket-launch",
    title: "Execute",
    description:
      "Campaign launches, content improvements, and operational fixes.",
  },
  {
    number: "04",
    icon: "clipboard-check",
    title: "Optimize & report",
    description: "Weekly decisions, clear commentary, and continuous testing.",
  },
];

export function OperatingRhythm() {
  return (
    <section
      data-testid="operating-rhythm"
      className="bg-hero-dark overflow-x-clip"
    >
      <Reveal className="text-center pt-14">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-[0.0625rem] w-8 bg-teal-400/60 sm:w-10"
          />
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-teal-400"
          />
          <Eyebrow tone="onTeal">How We Work</Eyebrow>
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-teal-400"
          />
          <span
            aria-hidden="true"
            className="h-[0.0625rem] w-8 bg-teal-400/60 sm:w-10"
          />
        </div>

        <RevealText className="mx-auto mt-5 text-3xl leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[2.375rem] lg:text-[2.875rem]">
          A clear operating rhythm<span className="text-teal-400">.</span>
        </RevealText>

        <span
          aria-hidden="true"
          className="mx-auto mt-6 block h-[0.0625rem] w-16 bg-teal-400/70"
        />

        <p className="mx-auto mt-6 max-w-[52ch] text-[0.9375rem] leading-[1.8] text-white/65">
          No black box. You always know what we found, what we changed, and what
          we are testing next.
        </p>
      </Reveal>
      <RhythmTimeline>
        <Container className="flex min-h-svh flex-col justify-center py-10 lg:py-12">
          <ol className="mt-5 grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:mt-5 lg:grid-cols-4 lg:gap-x-4">
            {beats.map((beat, index) => (
              <li
                key={beat.number}
                data-rhythm-step
                className="relative flex flex-col items-center text-center"
              >
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    data-rhythm-rail
                    className="absolute top-[1.8125rem] right-1/2 mr-[1.8125rem] hidden h-[0.0625rem] w-[calc(100%+var(--spacing)*4-3.625rem)] bg-teal-400 lg:block"
                  />
                ) : null}

                <span
                  data-rhythm-disc
                  className="relative z-10 rounded-full border-2 border-teal-400 p-[0.1875rem]"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-white text-[0.9375rem] font-bold text-dark-900">
                    {beat.number}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  data-rhythm-node
                  className="size-1.5 rounded-full bg-teal-400"
                />
                <span
                  aria-hidden="true"
                  data-rhythm-drop
                  className="h-12 w-[0.0625rem] bg-teal-400 lg:h-14"
                />

                <span
                  data-rhythm-icon
                  className="flex size-24 items-center justify-center rounded-full border border-white/20 bg-linear-to-b from-white/14 via-white/6 to-white/2 text-teal-400 shadow-[inset_0_0.0625rem_0_rgb(255_255_255/0.32),inset_0_-0.75rem_1.375rem_-0.875rem_rgb(255_255_255/0.16)] backdrop-blur-md lg:size-28"
                >
                  <Icon name={beat.icon} size={44} strokeWidth={1.15} />
                </span>

                <h3
                  data-rhythm-copy
                  className="mt-7 text-xl leading-tight font-bold tracking-[-0.01em] text-white lg:text-[1.375rem]"
                >
                  {beat.title}
                </h3>

                <span
                  aria-hidden="true"
                  data-rhythm-rule
                  className="mt-4 block h-0.5 w-8 rounded-full bg-teal-400"
                />

                <p
                  data-rhythm-copy
                  className="mt-5 max-w-[30ch] text-sm leading-[1.7] text-white/60"
                >
                  {beat.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </RhythmTimeline>
    </section>
  );
}
