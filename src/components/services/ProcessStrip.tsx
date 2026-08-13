import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const steps: { icon: IconName; label: string }[] = [
  { icon: "target", label: "Analyze & Strategize" },
  { icon: "lightning", label: "Implement & Optimize" },
  { icon: "chart-bar", label: "Measure & Scale" },
];

export function ProcessStrip() {
  return (
    <section className="bg-surface">
      <Container className="pt-12 pb-16 lg:pt-16 lg:pb-24">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-lg bg-black px-6 py-10 lg:flex-row lg:gap-10 lg:px-10">
            <h2 className="max-w-[9ch] text-center text-[22px] leading-tight font-bold text-white lg:text-left lg:text-[24px]">
              Our Proven Process
            </h2>

            <span
              aria-hidden="true"
              className="hidden h-20 w-px shrink-0 bg-white/15 lg:block"
            />

            <ol className="flex flex-1 flex-col items-center gap-8 lg:flex-row lg:justify-around lg:gap-4">
              {steps.map((step, i) => (
                <li
                  key={step.label}
                  className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Icon
                      name={step.icon}
                      size={34}
                      strokeWidth={1.5}
                      className="text-teal-400"
                    />
                    <span className="text-[13px] font-medium text-white">
                      {i + 1}. {step.label}
                    </span>
                  </div>

                  {i < steps.length - 1 ? (
                    <Icon
                      name="arrow-right"
                      size={22}
                      aria-hidden="true"
                      className="rotate-90 text-teal-500/70 lg:rotate-0"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
