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

/** The four recurring beats of an engagement, in the order a client sees them. */
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
      className="bg-hero-dark overflow-x-hidden"
    >
      <Reveal className="text-center pt-14">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-teal-400/60 sm:w-10"
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
            className="h-px w-8 bg-teal-400/60 sm:w-10"
          />
        </div>

        <RevealText className="mx-auto mt-5 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[38px] lg:text-[46px]">
          A clear operating rhythm<span className="text-teal-400">.</span>
        </RevealText>

        <span
          aria-hidden="true"
          className="mx-auto mt-6 block h-px w-16 bg-teal-400/70"
        />

        <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-[1.8] text-white/65">
          No black box. You always know what we found, what we changed, and what
          we are testing next.
        </p>
      </Reveal>
      <RhythmTimeline>
        {/* The pinned frame. `svh` rather than `vh` so a mobile browser's
            collapsing address bar cannot make it overflow, and the content is
            centred so the sticky header only ever overlaps dark padding. */}
        <Container className="flex min-h-svh flex-col justify-center py-10 lg:py-12">
          <ol className="mt-5 grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:mt-5 lg:grid-cols-4 lg:gap-x-4">
            {beats.map((beat, index) => (
              <li
                key={beat.number}
                data-rhythm-step
                className="relative flex flex-col items-center text-center"
              >
                {/* Drawn from each step back to the previous one, so the rail
                  spans 01 → 04 without assuming a fixed column count, and so
                  each segment can be drawn in step with its own disc. It stops
                  short of both discs rather than running under them — a later
                  step is a later sibling, so its rail would paint over the
                  earlier step's number. Hence the 29px inset: the disc radius
                  plus its gap and ring. Only at lg, where the four steps
                  actually sit on one row. */}
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    data-rhythm-rail
                    className="absolute top-[29px] right-1/2 mr-[29px] hidden h-px w-[calc(100%+var(--spacing)*4-58px)] bg-teal-400 lg:block"
                  />
                ) : null}

                {/* Ring as a padded wrapper rather than `ring-offset-*`: the
                  section sits on a gradient, so the gap has to be the
                  background showing through, not a solid offset colour. */}
                <span
                  data-rhythm-disc
                  className="relative z-10 rounded-full border-2 border-teal-400 p-[3px]"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-white text-[15px] font-bold text-dark-900">
                    {beat.number}
                  </span>
                </span>

                {/* Drop line tying the number to its icon, pinned by a node
                  where it leaves the disc. */}
                <span
                  aria-hidden="true"
                  data-rhythm-node
                  className="size-1.5 rounded-full bg-teal-400"
                />
                <span
                  aria-hidden="true"
                  data-rhythm-drop
                  className="h-12 w-px bg-teal-400 lg:h-14"
                />

                {/* Composed rather than the flat `glass-panel` utility: the
                    backdrop here is an almost-flat dark gradient, so the blur
                    has nothing to refract and the panel read as a grey disc.
                    What sells glass on black is the lighting — a bright rim,
                    a fill that falls off top to bottom, a catch-light on the
                    upper edge and a bounce along the lower one. */}
                <span
                  data-rhythm-icon
                  className="flex size-24 items-center justify-center rounded-full border border-white/20 bg-linear-to-b from-white/14 via-white/6 to-white/2 text-teal-400 shadow-[inset_0_1px_0_rgb(255_255_255/0.32),inset_0_-12px_22px_-14px_rgb(255_255_255/0.16)] backdrop-blur-md lg:size-28"
                >
                  <Icon name={beat.icon} size={44} strokeWidth={1.15} />
                </span>

                <h3
                  data-rhythm-copy
                  className="mt-7 text-[20px] leading-tight font-bold tracking-[-0.01em] text-white lg:text-[22px]"
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
                  className="mt-5 max-w-[30ch] text-[14px] leading-[1.7] text-white/60"
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
