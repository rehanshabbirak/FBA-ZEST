"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { PolicySection } from "@/lib/content/legal";
import { cn } from "@/lib/cn";

const COLLAPSED_COUNT = 7;

const SCROLL_OFFSET = 96;

function SectionBody({ section }: { section: PolicySection }) {
  return (
    <div className="mt-3 space-y-3.5 sm:pl-11">
      {section.body.map((paragraph) => (
        <p key={paragraph} className="text-[14px] leading-[1.75] text-muted">
          {paragraph}
        </p>
      ))}

      {section.bullets ? (
        <ul className="space-y-2.5">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5">
              <Icon
                name="check"
                size={15}
                strokeWidth={2.4}
                className="mt-1 shrink-0 text-teal-500"
              />
              <span className="text-[14px] leading-[1.7] text-muted">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.contacts ? (
        <ul className="grid gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-3">
          {section.contacts.map((contact) => (
            <li key={contact.label} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-500">
                <Icon name={contact.icon} size={15} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-[10.5px] font-bold tracking-[0.12em] text-subtle uppercase">
                  {contact.label}
                </p>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="text-[13px] leading-[1.5] font-medium break-words text-ink transition-colors duration-200 hover:text-teal-600"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-[13px] leading-[1.5] font-medium text-ink">
                    {contact.value}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Section({
  section,
  index,
  total,
}: {
  section: PolicySection;
  index: number;
  total: number;
}) {
  // The sections are split across two containers so the tail can collapse,
  // which makes :first-child / :last-child match in each half rather than
  // across the document. Position has to come from the index instead.
  return (
    <article
      id={section.id}
      className={cn(
        "scroll-mt-24 border-b border-line py-7",
        index === 0 && "pt-0",
        index === total - 1 && "border-b-0",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-teal-500 text-[13px] font-bold text-white">
          {index + 1}
        </span>
        <h2 className="text-[18px] leading-tight font-bold text-ink sm:text-[19px]">
          {section.title}
        </h2>
      </div>
      <SectionBody section={section} />
    </article>
  );
}

export function PolicyContent({ sections }: { sections: PolicySection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [expanded, setExpanded] = useState(false);
  const [animate, setAnimate] = useState(true);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const anchorTop = useRef<number | null>(null);

  // Collapsing deletes the tail from above the button, so the document shrinks
  // out from under an unchanged scroll position and the reader is dumped into
  // the footer. Re-anchor by scrolling back exactly as far as the button moved.
  useLayoutEffect(() => {
    const before = anchorTop.current;
    if (before === null) return;
    anchorTop.current = null;

    const after = toggleRef.current?.getBoundingClientRect().top;
    if (after === undefined) return;
    window.scrollBy({ top: after - before, behavior: "instant" });
  }, [expanded]);

  const handleToggle = useCallback(() => {
    if (expanded) {
      // Measure first, and drop the transition so the layout settles within
      // this commit — an animated collapse would leave the reading stale.
      anchorTop.current = toggleRef.current?.getBoundingClientRect().top ?? 0;
      setAnimate(false);
    } else {
      setAnimate(true);
    }
    setExpanded(!expanded);
  }, [expanded]);

  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // Several sections can share the band at once; the first in document
        // order is the one the reader has actually reached.
        const current = sections.find((section) => visible.has(section.id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -62% 0px` },
    );

    for (const section of sections) {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [sections]);

  // A link into the collapsed tail cannot scroll anywhere until the tail has
  // height, so open it first and jump on the next frame.
  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
      if (expanded || index < COLLAPSED_COUNT) return;

      event.preventDefault();
      setAnimate(true);
      setExpanded(true);

      requestAnimationFrame(() => {
        const node = document.getElementById(id);
        if (!node) return;
        window.scrollTo({
          top:
            window.scrollY + node.getBoundingClientRect().top - SCROLL_OFFSET,
          behavior: "smooth",
        });
        history.replaceState(null, "", `#${id}`);
      });
    },
    [expanded],
  );

  const shown = sections.slice(0, COLLAPSED_COUNT);
  const hidden = sections.slice(COLLAPSED_COUNT);

  return (
    <section className="bg-surface">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,270px)_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <nav
              aria-label="On this page"
              className="rounded-xl border border-line bg-white p-4 shadow-card"
            >
              <p className="px-2 pb-2 text-[11px] font-bold tracking-[0.14em] text-teal-500 uppercase">
                On This Page
              </p>
              <ul className="space-y-0.5">
                {sections.map((section, index) => {
                  const isActive = section.id === activeId;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(event) =>
                          handleNavClick(event, section.id, index)
                        }
                        className={cn(
                          "flex items-start gap-2.5 rounded-lg px-2 py-2 text-[13px] leading-snug transition-colors duration-200",
                          isActive
                            ? "bg-teal-50 font-semibold text-teal-600"
                            : "text-muted hover:bg-surface hover:text-ink",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-md transition-colors duration-200",
                            isActive
                              ? "bg-teal-500/15 text-teal-600"
                              : "bg-surface text-subtle",
                          )}
                        >
                          <Icon
                            name={section.icon}
                            size={13}
                            strokeWidth={1.8}
                          />
                        </span>
                        <span className="pt-0.5">
                          {index + 1}. {section.title}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <p className="mt-4 flex gap-3 rounded-xl border border-teal-100 bg-teal-50/60 p-4 text-[12.5px] leading-[1.6] text-muted">
              <Icon
                name="shield-check"
                size={18}
                strokeWidth={1.7}
                className="shrink-0 text-teal-500"
              />
              We are committed to keeping your data safe and secure.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-6 shadow-card lg:p-8">
            {shown.map((section, index) => (
              <Section
                key={section.id}
                section={section}
                index={index}
                total={sections.length}
              />
            ))}

            {/* grid-rows 0fr -> 1fr collapses without removing the sections
                from the DOM, so find-in-page and crawlers still reach them. */}
            <div
              className={cn(
                "grid",
                animate
                  ? "transition-[grid-template-rows] duration-500 ease-out-soft"
                  : "transition-none",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                {hidden.map((section, index) => (
                  <Section
                    key={section.id}
                    section={section}
                    index={index + COLLAPSED_COUNT}
                    total={sections.length}
                  />
                ))}
              </div>
            </div>

            {hidden.length > 0 ? (
              <div className="relative">
                {!expanded ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-linear-to-t from-white to-transparent"
                  />
                ) : null}
                <div className="flex justify-center pt-7">
                  <button
                    suppressHydrationWarning
                    type="button"
                    ref={toggleRef}
                    aria-expanded={expanded}
                    onClick={handleToggle}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-teal-500 px-5 text-[14px] font-semibold text-white transition-[background-color,box-shadow] duration-200 ease-out-soft hover:bg-teal-400 hover:shadow-cta active:bg-teal-700"
                  >
                    {expanded ? "Show Less" : "Read Full Policy"}
                    <Icon
                      name="arrow-down"
                      size={16}
                      strokeWidth={2}
                      className={cn(
                        "transition-transform duration-300 ease-out-soft",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
