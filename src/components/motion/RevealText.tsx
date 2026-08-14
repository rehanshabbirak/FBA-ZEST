"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type RevealTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function RevealText({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
}: RevealTextProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", (_ctx, contextSafe) => {
        let split: SplitText | undefined;
        let cancelled = false;

        // A GSAP context only records animations created during its own
        // synchronous execution. Everything below runs after `fonts.ready`
        // resolves, so without contextSafe the ScrollTriggers created here are
        // never registered — and never reverted — leaving dead triggers
        // measuring detached nodes after every client-side navigation.
        const build = contextSafe?.(() => {
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            // Returning the tween lets autoSplit tear it down before re-splitting.
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.85,
                ease: "power3.out",
                stagger: 0.09,
                delay,
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                },
              }),
          });
        }) as (() => void) | undefined;

        document.fonts.ready.then(() => {
          if (!cancelled) build?.();
        });

        return () => {
          cancelled = true;
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [delay] },
  );

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  );
}
