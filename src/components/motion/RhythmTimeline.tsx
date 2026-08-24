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

function hide(parts: StepParts[]) {
  for (const part of parts) {
    gsap.set(part.rail, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(part.drop, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(part.rule, { scaleX: 0, transformOrigin: "center" });
    gsap.set(part.disc, { opacity: 0, scale: 0.5 });
    gsap.set(part.node, { opacity: 0, scale: 0 });
    gsap.set(part.icon, { opacity: 0, scale: 0.85 });
    gsap.set(part.copy, { opacity: 0, y: "0.875rem" });
  }
}

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

          // Temporary diagnostic.
          let probe: ReturnType<typeof setTimeout> | undefined;
          if (process.env.NODE_ENV !== "production") {
            const report = (when: string) =>
              console.log("[rhythm] " + when, {
                steps: parts.length,
                discsFound: parts[0].disc.length,
                scrollY: Math.round(window.scrollY),
                docHeight: Math.round(document.body.scrollHeight),
                intro: intro.scrollTrigger && {
                  start: Math.round(intro.scrollTrigger.start),
                  end: Math.round(intro.scrollTrigger.end),
                  progress: +intro.scrollTrigger.progress.toFixed(2),
                },
                pinned: pinned.scrollTrigger && {
                  start: Math.round(pinned.scrollTrigger.start),
                  end: Math.round(pinned.scrollTrigger.end),
                  progress: +pinned.scrollTrigger.progress.toFixed(2),
                },
                firstDiscOpacity:
                  parts[0].disc[0] &&
                  getComputedStyle(parts[0].disc[0] as Element).opacity,
              });
            report("setup");
            probe = setTimeout(() => report("after 1.5s"), 1500);
          }

          return () => {
            if (probe) clearTimeout(probe);
            if (process.env.NODE_ENV !== "production") {
              console.log("[rhythm] cleanup");
            }
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
