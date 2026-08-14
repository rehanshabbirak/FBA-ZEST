"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type StaggerCardsProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
};

export function StaggerCards({
  as: Tag = "ul",
  children,
  className,
  y = 26,
}: StaggerCardsProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      const items = gsap.utils.toArray<HTMLElement>(el.children);
      if (items.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { opacity: 0, y });

        const triggers = ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.09,
              overwrite: true,
            }),
        });

        return () => triggers.forEach((trigger) => trigger.kill());
      });

      return () => mm.revert();
    },
    { scope, dependencies: [y] },
  );

  return (
    <Tag ref={scope} className={cn("stagger-group", className)}>
      {children}
    </Tag>
  );
}
