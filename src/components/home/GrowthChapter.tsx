import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { AccountReviewForm } from "@/components/home/AccountReviewForm";

export function GrowthChapter() {
  return (
    <section data-testid="growth-chapter" className="bg-hero-dark relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-white/6"
        >
          <ellipse
            cx="600"
            cy="300"
            rx="560"
            ry="250"
            fill="none"
            stroke="currentColor"
            transform="rotate(-12 600 300)"
          />
          <ellipse
            cx="600"
            cy="300"
            rx="420"
            ry="330"
            fill="none"
            stroke="currentColor"
            transform="rotate(18 600 300)"
          />
        </svg>

        <div className="teal-glow absolute -top-32 left-1/2 h-100 w-160 -translate-x-1/2 opacity-40" />
      </div>

      <Container className="relative py-10 text-center lg:py-12">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-[0.0625rem] w-7 bg-teal-400" />
            <Eyebrow tone="onTeal">Your next growth chapter</Eyebrow>
          </div>

          <RevealText className="mx-auto mt-5 max-w-[18ch] text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.75rem] lg:text-[3.5rem]">
            Let’s find the biggest opportunity in your{" "}
            <span className="text-teal-400">Amazon account.</span>
          </RevealText>

          <p className="mx-auto mt-6 max-w-[62ch] text-[0.9375rem] leading-[1.7] text-white/60">
            Tell us where the business stands and what is getting in the way.
            We’ll use the first conversation to assess fit — not deliver a sales
            pitch.
          </p>
        </Reveal>

        <AccountReviewForm />
      </Container>
    </section>
  );
}
