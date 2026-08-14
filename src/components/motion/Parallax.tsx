"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type ParallaxProps = {
  children: ReactNode;
  amount?: number;
  className?: string;
};

export function Parallax({
  children,
  amount = 6,
  className,
}: ParallaxProps) {
  const scope = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = inner.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { scale: 1 + (amount * 2) / 100 });

        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope, dependencies: [amount] },
  );

  return (
    <div ref={scope} className={cn("overflow-hidden", className)}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
