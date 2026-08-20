"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type ProcessRowProps = {
  /** Side the artwork sits on; the copy always enters from the opposite edge. */
  mediaSide: "left" | "right";
  children: ReactNode;
};

/**
 * One timeline per step rather than a trigger per element: the pieces of a step
 * have to arrive in a fixed order (artwork, heading, accent, checklist), and
 * independent triggers would fire on their own thresholds and scramble it.
 *
 * Targets are found by data attribute so the markup stays a server component.
 */
export function ProcessRow({ mediaSide, children }: ProcessRowProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);
        const rule = q("[data-process-rule]");
        const media = q("[data-process-media]");
        const badge = q("[data-process-badge]");
        const copy = q("[data-process-copy]");
        const points = q("[data-process-point]");

        // Artwork drifts in from its own edge, copy from the other, so the
        // zig-zag of the layout is what the motion traces.
        const dir = mediaSide === "left" ? -1 : 1;

        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(media, { opacity: 0, xPercent: 5 * dir });
        gsap.set(copy, { opacity: 0, x: -26 * dir });
        gsap.set(badge, { opacity: 0, scale: 0.7 });
        gsap.set(points, { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            // onEnter / onLeave / onEnterBack / onLeaveBack. Replays on every
            // downward entry; the reset on leaving upward is what re-arms it.
            // Scrolling back up into a finished step leaves it alone, so copy
            // is never hidden again while it is on screen.
            toggleActions: "restart none none reset",
          },
          defaults: { ease: "power3.out" },
        });

        tl.to(media, { opacity: 1, xPercent: 0, duration: 0.9 }, 0)
          .to(copy, { opacity: 1, x: 0, duration: 0.7, stagger: 0.09 }, 0.18)
          // Lands after the heading it sits beside, so the number reads as the
          // label for a step that has already arrived.
          .to(
            badge,
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)" },
            0.3,
          )
          // The accent underlines the heading, so it draws once the heading
          // and its badge have both landed.
          .to(rule, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0.42)
          .to(points, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 }, 0.5);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [mediaSide] },
  );

  return <div ref={scope}>{children}</div>;
}
