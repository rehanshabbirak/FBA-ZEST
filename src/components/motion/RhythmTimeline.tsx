"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RhythmTimelineProps = {
  children: ReactNode;
};

type StepParts = {
  rail: Element[];
  disc: Element[];
  node: Element[];
  drop: Element[];
  icon: Element[];
  rule: Element[];
  copy: Element[];
};

/** How much of the timeline one step occupies before the next begins. Steps
 *  span ~2 units, so at 1.35 apart each starts while the one before it is
 *  still settling — the rail reads as continuous rather than stop-start. */
const STEP = 1.35;

function collect(root: HTMLElement): StepParts[] {
  return gsap.utils
    .toArray<HTMLElement>("[data-rhythm-step]", root)
    .map((step) => {
      const q = gsap.utils.selector(step);
      return {
        rail: q("[data-rhythm-rail]"),
        disc: q("[data-rhythm-disc]"),
        node: q("[data-rhythm-node]"),
        drop: q("[data-rhythm-drop]"),
        icon: q("[data-rhythm-icon]"),
        rule: q("[data-rhythm-rule]"),
        copy: q("[data-rhythm-copy]"),
      };
    });
}

/** Only transforms and opacity, so hiding a step costs no layout. */
function hide(parts: StepParts[]) {
  for (const part of parts) {
    gsap.set(part.rail, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(part.drop, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(part.rule, { scaleX: 0, transformOrigin: "center" });
    gsap.set(part.disc, { opacity: 0, scale: 0.5 });
    gsap.set(part.node, { opacity: 0, scale: 0 });
    gsap.set(part.icon, { opacity: 0, scale: 0.85 });
    gsap.set(part.copy, { opacity: 0, y: 14 });
  }
}

/** One step draws in a fixed order — rail, disc, node, drop, icon, copy, rule
 *  — so the eye is led along the rail into the plate and then the words.
 *
 *  Each beat is given room to finish and the next starts before it does, so
 *  the step reads as one continuous move rather than seven separate ones. */
function draw(tl: gsap.core.Timeline, part: StepParts, at: number) {
  tl.to(
    part.rail,
    // Eases out of the previous disc and into the next, so the join reads as
    // a stroke being drawn rather than a bar being stretched.
    { scaleX: 1, duration: 0.7, ease: "power1.inOut" },
    at,
  )
    .to(
      part.disc,
      { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
      at + 0.5,
    )
    .to(
      part.node,
      { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(3)" },
      at + 0.8,
    )
    .to(part.drop, { scaleY: 1, duration: 0.5, ease: "power1.out" }, at + 0.85)
    .to(
      part.icon,
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      at + 1.15,
    )
    .to(
      part.copy,
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.18, ease: "power2.out" },
      at + 1.4,
    )
    .to(part.rule, { scaleX: 1, duration: 0.35, ease: "power2.out" }, at + 1.7);
}

/**
 * Wraps the whole section — heading included — because the section is what
 * gets pinned, and pinning the list alone would let the heading scroll away
 * above it.
 *
 * Every timeline here is scrubbed: tied to scroll position, not a clip played
 * at a threshold. Nothing advances unless the user is scrolling, and backing
 * up rewinds it. The 0.7 smoothing does not change that — it only lets the
 * timeline glide to the position the scroll asked for instead of snapping.
 *
 * Targets are found by data attribute so the section stays a server component.
 */
export function RhythmTimeline({ children }: RhythmTimelineProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // No reduced-motion branch: the markup renders fully drawn, so leaving
      // the timelines unbuilt is already the correct static end state.

      // Desktop: step 01 draws as the section rises into place, then the
      // section pins and the remaining steps are spent scrolling in one by
      // one. `end: "+=340%"` buys roughly a viewport of scroll per step.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const parts = collect(el);
          if (!parts.length) return;
          hide(parts);

          const intro = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top top",
              // A touch of smoothing rather than a hard 1:1 tie. It still only
              // ever moves because the user scrolled — it just glides to the
              // new position over ~0.7s instead of stepping frame to frame.
              scrub: 0.7,
            },
            defaults: { ease: "none" },
          });
          draw(intro, parts[0], 0);

          const pinned = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top top",
              // Roughly one viewport of scroll per step, so each has room to
              // play out instead of being flicked through.
              end: "+=340%",
              pin: true,
              // Pins a frame early, which is what keeps a fast scroll from
              // showing the section jump as it switches to fixed positioning.
              anticipatePin: 1,
              scrub: 0.7,
            },
            defaults: { ease: "none" },
          });
          parts
            .slice(1)
            .forEach((part, index) => draw(pinned, part, index * STEP));
          // A beat of held scroll after the last step, so 04 is finished
          // rather than still drawing when the section lets go.
          pinned.to({}, { duration: 0.7 });

          return () => {
            intro.scrollTrigger?.kill();
            intro.kill();
            pinned.scrollTrigger?.kill();
            pinned.kill();
          };
        },
      );

      // Below lg the four steps stack into a column far taller than a phone
      // screen, so pinning would crop it. The stack is already long enough to
      // scrub against on its own.
      mm.add(
        "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
        () => {
          const parts = collect(el);
          if (!parts.length) return;
          hide(parts);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 85%",
              scrub: 0.7,
            },
            defaults: { ease: "none" },
          });
          parts.forEach((part, index) => draw(tl, part, index * STEP));

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
