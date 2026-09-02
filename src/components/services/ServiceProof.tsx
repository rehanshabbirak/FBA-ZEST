import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceProof as Proof } from "@/lib/content/services";
import { cn } from "@/lib/cn";

type ServiceProofProps = {
  builtFor: string[];
  proof: Proof;
};

export function ServiceProof({ builtFor, proof }: ServiceProofProps) {
  return (
    <section className="bg-surface">
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-14 lg:py-20">
        <Reveal>
          <Eyebrow>Built For</Eyebrow>
          <h2 className="mt-4 text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[2rem]">
            Who This Is Built For
          </h2>

          <ul className="mt-8 space-y-4">
            {builtFor.map((item) => (
              <li key={item} className="flex gap-4">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                  <Icon name="check" size={16} strokeWidth={2.4} />
                </span>
                <p className="text-[0.9375rem] leading-[1.7] text-muted">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-xl bg-black p-8 lg:p-9">
            <div
              aria-hidden="true"
              className="teal-glow pointer-events-none absolute -top-[45%] -right-[15%] h-70 w-90 opacity-70"
            />

            <div className="relative">
              <Eyebrow tone="onTeal">Proof</Eyebrow>

              <p
                className={cn(
                  "mt-5 leading-none font-extrabold tracking-[-0.03em] text-teal-400",
                  // "Operating experience" and "20% → 5%" need to wrap where
                  // "+85%" can run at display size.
                  proof.value.length > 10
                    ? "text-[1.75rem] leading-tight sm:text-[2rem]"
                    : "text-[2.5rem] sm:text-[3rem]",
                )}
              >
                {proof.value}
              </p>

              <p className="mt-3 text-[0.6875rem] font-bold tracking-[0.16em] text-white/55 uppercase">
                {proof.label}
              </p>

              <p className="mt-5 text-[0.9375rem] leading-[1.7] text-white/70">
                {proof.body}
              </p>

              {proof.href ? (
                <Link
                  href={proof.href}
                  className="group/proof mt-6 inline-flex items-center gap-1.5 border-t border-white/12 pt-5 text-[0.875rem] font-semibold text-teal-400 transition-colors duration-200 hover:text-teal-300"
                >
                  {proof.linkLabel ?? "Read the case study"}
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-300 ease-out-soft group-hover/proof:translate-x-1"
                  />
                </Link>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
