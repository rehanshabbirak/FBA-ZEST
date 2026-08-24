"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useArticleReader } from "@/components/blog/ArticleReader";
import {
  SECTIONS_BEFORE_FOLD,
  type ArticleHeading,
} from "@/lib/content/blog-article";
import { cn } from "@/lib/cn";

const ACTIVE_OFFSET = 130;

export function ArticleToc({ headings }: { headings: ArticleHeading[] }) {
  const { expanded, expand } = useArticleReader();
  const [activeId, setActiveId] = useState<string | null>(null);
  const pendingId = useRef<string | null>(null);

  const tracked = useMemo(
    () => (expanded ? headings : headings.slice(0, SECTIONS_BEFORE_FOLD)),
    [expanded, headings],
  );

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string | null = null;

      for (const heading of tracked) {
        const node = document.getElementById(heading.id);
        if (node && node.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = heading.id;
        }
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [tracked]);

  useEffect(() => {
    const target = pendingId.current;
    if (!target) return;
    pendingId.current = null;
    document
      .getElementById(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [expanded]);

  return (
    <section className="rounded-lg border border-line bg-white p-6 shadow-card">
      <h2 className="border-l-[0.1875rem] border-teal-500 pl-3 text-[1rem] font-bold text-ink">
        Table of Contents
      </h2>

      <ol className="mt-4 flex flex-col">
        {headings.map((heading, index) => {
          const isActive = heading.id === activeId;
          const isFolded = index >= SECTIONS_BEFORE_FOLD;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  if (expanded || !isFolded) return;
                  event.preventDefault();
                  pendingId.current = heading.id;
                  expand();
                }}
                className={cn(
                  "flex items-baseline gap-2.5 border-b border-line py-2.5 text-[0.8125rem] leading-snug transition-colors duration-200 last:border-b-0",
                  isActive
                    ? "font-semibold text-teal-600"
                    : "text-muted hover:text-teal-600",
                )}
              >
                <span
                  className={cn(
                    "w-4 shrink-0 text-[0.71875rem] font-semibold",
                    isActive ? "text-teal-600" : "text-subtle",
                  )}
                >
                  {heading.number}
                </span>
                <span>{heading.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
