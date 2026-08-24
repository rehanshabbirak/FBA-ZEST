import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { cn } from "@/lib/cn";

type Panel = {
  tone: "fit" | "notFit";
  label: string;
  heading: string;
  marker: IconName;
  points: string[];
};

const panels: Panel[] = [
  {
    tone: "fit",
    label: "We are a strong fit if",
    heading: "You want an accountable growth partner.",
    marker: "check",
    points: [
      "You have a differentiated consumer brand",
      "You value profit and brand equity alongside revenue",
      "You are ready to improve the whole Amazon account",
      "You want transparent, proactive communication",
    ],
  },
  {
    tone: "notFit",
    label: "Probably not a fit if",
    heading: "You only want someone to change bids.",
    marker: "close",
    points: [
      "You are looking for guaranteed rankings",
      "You want growth regardless of margin",
      "You cannot maintain healthy inventory",
      "You prefer a hands-off, black-box relationship",
    ],
  },
];

export function FitCheck() {
  return (
    <section data-testid="fit-check" className="bg-surface">
      <Container className="py-10 lg:py-12">
        <StaggerCards className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {panels.map((panel) => {
            const isFit = panel.tone === "fit";

            return (
              <li key={panel.label}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-xl border p-7 shadow-card lg:p-9",
                    isFit
                      ? "border-teal-500/20 bg-teal-50"
                      : "border-line bg-white",
                  )}
                >
                  <Eyebrow tone={isFit ? "default" : "muted"}>
                    {panel.label}
                  </Eyebrow>

                  <h3 className="mt-4 max-w-[20ch] text-[1.375rem] leading-[1.2] font-bold tracking-[-0.02em] text-ink sm:text-[1.625rem]">
                    {panel.heading}
                  </h3>

                  <ul className="mt-7 space-y-3.5">
                    {panel.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-full",
                            isFit
                              ? "bg-teal-600 text-white"
                              : "border border-line-strong bg-surface text-subtle",
                          )}
                        >
                          <Icon
                            name={panel.marker}
                            size={isFit ? 12 : 11}
                            strokeWidth={isFit ? 3 : 2.5}
                          />
                        </span>
                        <span
                          className={cn(
                            "text-sm leading-[1.5]",
                            isFit ? "font-medium text-ink" : "text-muted",
                          )}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </StaggerCards>
      </Container>
    </section>
  );
}
