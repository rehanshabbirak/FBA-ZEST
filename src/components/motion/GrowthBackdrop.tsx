"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const LINE =
  "M0,352 L100,330 L200,338 L300,292 L400,304 L500,250 L600,264 L700,204 L800,216 L900,152 L1000,138 L1100,88 L1200,58";

const AREA = `${LINE} L1200,420 L0,420 Z`;

const BARS = [96, 132, 112, 178, 150, 216, 194, 262, 238, 306, 284, 352];

type GrowthBackdropProps = {
  className?: string;
};

export function GrowthBackdrop({ className }: GrowthBackdropProps) {
  const scope = useRef<SVGSVGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const gradientId = useId();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);

        gsap.to(q(".bar"), {
          scaleY: 1,
          duration: 2.6,
          ease: "sine.inOut",
          stagger: { each: 0.14, repeat: -1, yoyo: true },
          transformOrigin: "50% 100%",
        });

        const path = line.current;
        if (!path) return;

        const plot = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });

        plot
          .fromTo(
            path,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 5.5, ease: "none" },
          )
          .fromTo(
            q(".area"),
            { opacity: 0 },
            { opacity: 1, duration: 2.4, ease: "sine.out" },
            0.6,
          )
          .fromTo(
            q(".head"),
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            0,
          )
          .to(
            q(".head"),
            {
              motionPath: { path, align: path },
              duration: 5.5,
              ease: "none",
            },
            0,
          )
          .to([path, q(".area"), q(".head")], {
            opacity: 0,
            duration: 1.1,
            ease: "sine.in",
          });

        return () => {
          plot.kill();
        };
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <svg
      ref={scope}
      viewBox="0 0 1200 420"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.34" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
        vectorEffect="non-scaling-stroke"
      >
        {[84, 168, 252, 336].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} />
        ))}
      </g>

      <g fill="currentColor" opacity="0.07">
        {BARS.map((height, i) => (
          <rect
            key={height}
            className="bar"
            x={26 + i * 98}
            y={420 - height}
            width="40"
            height={height}
            rx="4"
            style={{ transform: "scaleY(0.35)", transformBox: "fill-box" }}
          />
        ))}
      </g>

      <path className="area" d={AREA} fill={`url(#${gradientId})`} opacity="0" />

      {/*
        No vector-effect here, unlike the grid lines: DrawSVG and MotionPath
        both need getTotalLength(), which the browser refuses to compute for a
        non-scaling stroke on a non-proportionally scaled element
        (preserveAspectRatio="none"). The stroke scales with the viewBox
        instead, which is why it is specified thinner than the grid's.
      */}
      <path
        ref={line}
        className="line"
        d={LINE}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="1"
      />

      <circle className="head" r="5" fill="currentColor" opacity="0" />
    </svg>
  );
}
