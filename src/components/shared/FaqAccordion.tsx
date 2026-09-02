"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export type FaqAccordionItem = {
  question: string;
  /** A plain string renders as a paragraph, an array of strings as a bullet
   *  list — the shape the global FAQ content already uses. */
  answer: (string | string[])[];
  cta?: { label: string; href: string };
};

type FaqAccordionProps = {
  items: FaqAccordionItem[];
  /** Column count at lg and up. Three-question service pages read better in a
   *  single column; the fifteen-question global list needs two. */
  columns?: 1 | 2;
  className?: string;
};

export function FaqAccordion({
  items,
  columns = 2,
  className,
}: FaqAccordionProps) {
  // Items open independently — in the two-column layout, closing a question the
  // reader didn't touch would shift the other column under them.
  const [open, setOpen] = useState<number[]>([]);
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );

  return (
    <ul
      className={cn(
        "grid items-start gap-4",
        columns === 2 && "lg:grid-cols-2 lg:gap-x-5",
        className,
      )}
    >
      {items.map((faq, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-question-${index}`;

        return (
          <li key={faq.question}>
            <Reveal
              delay={(index % columns) * 60}
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
                      "text-sm leading-snug font-semibold transition-colors duration-200",
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
                  <div className="space-y-3 border-t border-line px-5 pt-4 pb-5 text-[0.84375rem] leading-[1.7] text-muted">
                    {faq.answer.map((block, blockIndex) =>
                      Array.isArray(block) ? (
                        <ul key={blockIndex} className="space-y-2">
                          {block.map((point) => (
                            <li key={point} className="flex gap-2.5">
                              <span className="mt-[0.4375rem] size-1.5 shrink-0 rounded-full bg-teal-500" />
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
  );
}
