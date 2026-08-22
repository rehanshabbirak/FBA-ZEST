"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { faqs } from "@/lib/content/faq";
import { cn } from "@/lib/cn";

export function Faq() {
  // Items open independently — the two columns sit side by side, so closing a
  // question the reader didn't touch would shift the other column under them.
  const [open, setOpen] = useState<number[]>([]);
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );

  return (
    <section data-testid="faq" id="faq" className="scroll-mt-24 bg-white">
      <Container className="py-10 lg:py-12">
        <Reveal className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <RevealText className="mt-4 text-[34px] leading-[1.12] font-bold tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[52px]">
            Frequently Asked Questions
          </RevealText>
          <span
            aria-hidden
            className="mx-auto mt-5 block h-1 w-14 rounded-full bg-teal-500"
          />
        </Reveal>

        <ul className="mt-10 grid items-start gap-4 lg:grid-cols-2 lg:gap-x-5">
          {faqs.map((faq, index) => {
            const isOpen = open.includes(index);
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-question-${index}`;

            return (
              <li key={faq.question}>
                <Reveal
                  delay={(index % 2) * 60}
                  className={cn(
                    "overflow-hidden rounded-lg border bg-white transition-colors duration-200",
                    isOpen
                      ? "border-teal-500/45 shadow-card"
                      : "border-line hover:border-teal-500/30",
                  )}
                >
                  <h3>
                    <button
                      suppressHydrationWarning
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span
                        className={cn(
                          "text-[14px] leading-snug font-semibold transition-colors duration-200",
                          isOpen ? "text-teal-600" : "text-ink",
                        )}
                      >
                        {faq.question}
                      </span>
                      <Icon
                        name="chevron-down"
                        size={16}
                        strokeWidth={2}
                        className={cn(
                          "shrink-0 transition-transform duration-300",
                          isOpen ? "-rotate-180 text-teal-500" : "text-muted",
                        )}
                      />
                    </button>
                  </h3>

                  {/* 0fr -> 1fr animates to the answer's natural height without
                      measuring it or pinning a max-height guess. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    // Keeps the collapsed answer out of tab order and off the
                    // accessibility tree without display:none, which would kill
                    // the open/close transition.
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 border-t border-line px-5 pt-4 pb-5 text-[13.5px] leading-[1.7] text-muted">
                        {faq.answer.map((block, blockIndex) =>
                          Array.isArray(block) ? (
                            <ul key={blockIndex} className="space-y-2">
                              {block.map((point) => (
                                <li key={point} className="flex gap-2.5">
                                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-teal-500" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p key={blockIndex}>{block}</p>
                          ),
                        )}
                        {faq.cta ? (
                          <p>
                            <Link
                              href={faq.cta.href}
                              className="inline-flex items-center gap-1.5 font-semibold text-teal-600 underline-offset-4 hover:underline"
                            >
                              {faq.cta.label}
                              <Icon
                                name="chevron-right"
                                size={13}
                                strokeWidth={2.5}
                              />
                            </Link>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
