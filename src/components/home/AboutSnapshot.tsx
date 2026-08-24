import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { site } from "@/lib/site";

type Fact = { icon: IconName; term: string; detail: string };

const facts: Fact[] = [
  {
    icon: "chat",
    term: "Direct access",
    detail: "Slack communication and a dedicated Brand Manager.",
  },
  {
    icon: "calendar",
    term: "Strategic cadence",
    detail: "Weekly updates and biweekly recorded reviews.",
  },
  {
    icon: "users",
    term: "Selective by design",
    detail: "A focused client roster, not a volume agency model.",
  },
];

export function AboutSnapshot() {
  return (
    <section
      data-testid="about-snapshot"
      className="bg-hero-dark relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(60%_55%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="teal-glow pointer-events-none absolute -top-40 left-1/2 h-100 w-160 -translate-x-1/2 opacity-40"
      />

      <Container className="relative py-10 lg:py-12">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-[0.0625rem] w-8 bg-teal-400/50 sm:w-10"
            />
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-teal-400"
            />
            <Eyebrow tone="onTeal">About {site.name}</Eyebrow>
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-teal-400"
            />
            <span
              aria-hidden="true"
              className="h-[0.0625rem] w-8 bg-teal-400/50 sm:w-10"
            />
          </div>

          <RevealText className="mx-auto mt-4 max-w-[20ch] text-3xl leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[2.375rem] lg:text-[2.75rem]">
            Senior thinking.{" "}
            <span className="text-teal-400">Selective partnerships.</span>
          </RevealText>

          <p className="mx-auto mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.6] font-semibold tracking-[-0.01em] text-white/90 lg:text-lg">
            {site.name} is a small, data-led Amazon growth team for premium
            brands that want senior attention and full-account accountability.
          </p>

          <p className="mx-auto mt-4 max-w-[62ch] text-[0.9375rem] leading-[1.7] text-white/55">
            Instead of separating PPC from listings, inventory, and operations,
            your dedicated Brand Manager connects every moving part around the
            same commercial goals.
          </p>
        </Reveal>

        <StaggerCards className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-14">
          {facts.map((fact) => (
            <li key={fact.term}>
              <div className="group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-white/12 bg-linear-to-b from-white/8 via-white/4 to-white/2 p-6 shadow-[inset_0_0.0625rem_0_rgb(255_255_255/0.16)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-teal-400/50 hover:shadow-[0_1.375rem_2.875rem_-1.375rem_rgb(0_0_0/0.9),inset_0_0.0625rem_0_rgb(255_255_255/0.26)] lg:p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-white/0 transition-colors duration-500 ease-out-soft group-hover:bg-white/6"
                />

                <span className="flex size-11 items-center justify-center rounded-lg border border-teal-400/25 bg-teal-400/10 text-teal-300 transition-[transform,background-color,border-color] duration-500 ease-out-soft group-hover:scale-110 group-hover:border-teal-400/45 group-hover:bg-teal-400/18">
                  <Icon name={fact.icon} size={20} strokeWidth={1.7} />
                </span>

                <h3 className="mt-5 text-[1.0625rem] leading-tight font-bold tracking-[-0.01em] text-white">
                  {fact.term}
                </h3>

                <span
                  aria-hidden="true"
                  className="mt-3 block h-0.5 w-7 rounded-full bg-teal-400 transition-[width] duration-500 ease-out-soft group-hover:w-12"
                />

                <p className="mt-4 text-sm leading-[1.7] text-white/55 transition-colors duration-500 ease-out-soft group-hover:text-white/70">
                  {fact.detail}
                </p>
              </div>
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
