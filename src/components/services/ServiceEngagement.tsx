import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerCards } from "@/components/motion/StaggerCards";
import type { ServiceStep } from "@/lib/content/services";

export function ServiceEngagement({ steps }: { steps: ServiceStep[] }) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="teal-glow pointer-events-none absolute -top-[25%] -right-[8%] h-105 w-130 opacity-45"
      />

      <Container className="relative py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="onTeal">How It Runs</Eyebrow>
          <h2 className="mt-4 text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[2rem]">
            How the Engagement Runs
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-[1.7] text-white/60">
            Four stages, each with an owner and an output you can hold us to.
          </p>
        </Reveal>

        <StaggerCards className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="h-full">
              <div className="glass-panel group relative isolate flex h-full flex-col overflow-hidden rounded-lg p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-teal-500/60 hover:shadow-[0_1.375rem_2.875rem_-1.375rem_rgb(0_0_0/0.9),inset_0_0.0625rem_0_rgb(255_255_255/0.22)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-white/0 transition-colors duration-500 ease-out-soft group-hover:bg-white/6"
                />

                <span className="text-[2rem] leading-none font-extrabold tracking-[-0.03em] text-teal-400/70 transition-colors duration-500 ease-out-soft group-hover:text-teal-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-[1.0625rem] leading-snug font-bold text-white">
                  {step.title}
                </h3>

                {step.timing ? (
                  <p className="mt-2 inline-flex w-fit rounded-full border border-teal-500/35 bg-teal-500/10 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-teal-300 uppercase transition-colors duration-500 ease-out-soft group-hover:border-teal-500/60 group-hover:bg-teal-500/15">
                    {step.timing}
                  </p>
                ) : null}

                <p className="mt-4 text-[0.875rem] leading-[1.7] text-white/65">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
