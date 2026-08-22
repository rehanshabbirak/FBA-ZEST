import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { ProofChart } from "@/components/home/ProofChart";

export function ProofResults() {
  return (
    <section
      data-testid="proof-results"
      className="bg-hero-dark relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="teal-glow pointer-events-none absolute -top-32 left-1/2 h-100 w-160 -translate-x-1/2 opacity-35"
      />

      <Container className="relative py-10 text-center lg:py-12">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-teal-400/50 sm:w-10"
            />
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-teal-400"
            />
            <Eyebrow tone="onTeal">Recent PPC Results</Eyebrow>
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-teal-400"
            />
            <span
              aria-hidden="true"
              className="h-px w-8 bg-teal-400/50 sm:w-10"
            />
          </div>

          <RevealText className="mx-auto mt-4 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[38px] lg:text-[44px]">
            Proof, <span className="text-teal-400">Not Promises</span>
          </RevealText>

          <p className="mx-auto mt-5 max-w-[58ch] text-[15px] leading-[1.7] text-white/60">
            The same client account, before and after FBA Zest took over ad
            management. Toggle the metric — every one moved in the right
            direction.
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-12">
          <ProofChart />
        </div>
      </Container>
    </section>
  );
}
