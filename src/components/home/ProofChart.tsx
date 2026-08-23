"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { proofMetrics } from "@/lib/content/proof";
import { cn } from "@/lib/cn";

/** User units, not pixels — the SVG scales to whatever width it is given. */
const VIEW = { width: 1000, height: 340 };
const PLOT = { left: 40, right: 960, top: 40, bottom: 268 };

type Point = { x: number; y: number };

/**
 * Catmull-Rom through every reading, converted to cubic beziers. A polyline
 * would kink at each month; a spline reads as a trend, which is what the
 * section is arguing about.
 */
function spline(points: Point[]): string {
  if (points.length < 2) return "";

  let d = `M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };

    d += ` C${c1.x.toFixed(2)},${c1.y.toFixed(2)} ${c2.x.toFixed(2)},${c2.y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }

  return d;
}

export function ProofChart() {
  const gradientId = useId();
  const scope = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(proofMetrics[0].id);
  const [seen, setSeen] = useState(false);

  const metric =
    proofMetrics.find((entry) => entry.id === activeId) ?? proofMetrics[0];

  const chart = useMemo(() => {
    const series = [...metric.before, ...metric.after];
    const min = Math.min(...series);
    const max = Math.max(...series);
    // A tenth of the range as headroom, so peaks never touch the frame.
    const pad = (max - min) * 0.1 || 1;
    const lo = min - pad;
    const hi = max + pad;

    const step = (PLOT.right - PLOT.left) / (series.length - 1);
    const points = series.map((value, index) => ({
      x: PLOT.left + index * step,
      y: PLOT.bottom - ((value - lo) / (hi - lo)) * (PLOT.bottom - PLOT.top),
    }));

    // The two halves share the handover point, so the line is unbroken while
    // each half can carry its own colour.
    const split = metric.before.length - 1;
    const after = points.slice(split);
    const afterPath = spline(after);

    return {
      beforePath: spline(points.slice(0, split + 1)),
      afterPath,
      // Closed back along the baseline to give the after-line a fill.
      areaPath: `${afterPath} L${after[after.length - 1].x.toFixed(2)},${PLOT.bottom} L${after[0].x.toFixed(2)},${PLOT.bottom} Z`,
      dividerX: points[split].x,
      end: points[points.length - 1],
      first: metric.before[metric.before.length - 1],
      last: metric.after[metric.after.length - 1],
    };
  }, [metric]);

  // Matches the site's Reveal: hold the draw until the chart is on screen,
  // otherwise the one animation that carries the argument plays unseen.
  useEffect(() => {
    const node = scope.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!seen) return;

      const q = gsap.utils.selector(scope);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // The before-line draws first and faster: it is context, and the eye
        // should arrive at the handover already moving.
        tl.fromTo(
          q("[data-proof-before]"),
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.6 },
        )
          .fromTo(
            q("[data-proof-divider]"),
            { scaleY: 0, transformOrigin: "top center" },
            { scaleY: 1, duration: 0.3 },
            "-=0.15",
          )
          .fromTo(
            q("[data-proof-after]"),
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 1.1 },
            "-=0.1",
          )
          .fromTo(
            q("[data-proof-area]"),
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            "<",
          )
          .fromTo(
            q("[data-proof-end]"),
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(2.4)",
              // Absolute user units, not "center". GSAP resolves a relative
              // origin against the group's bbox and caches it on the DOM node;
              // switching metric only moves the circles' cx/cy, so a cached
              // origin would still describe the previous metric's dot and the
              // scale would be applied about a point that is no longer there.
              svgOrigin: `${chart.end.x} ${chart.end.y}`,
            },
            "-=0.3",
          );

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    // Redraws on every toggle, so switching metric replays the argument
    // rather than swapping one static line for another.
    { scope, dependencies: [activeId, seen] },
  );

  const format = (value: number) =>
    `${metric.prefix}${value.toLocaleString("en-US", {
      maximumFractionDigits: 1,
    })}${metric.suffix}`;

  return (
    <div ref={scope}>
      <div
        role="group"
        aria-label="Choose a metric"
        className="mx-auto inline-flex rounded-full border border-white/12 bg-white/5 p-1 backdrop-blur-md"
      >
        {proofMetrics.map((entry) => (
          <button
            suppressHydrationWarning
            key={entry.id}
            type="button"
            aria-pressed={entry.id === activeId}
            onClick={() => setActiveId(entry.id)}
            className={cn(
              "rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ease-out-soft",
              entry.id === activeId
                ? "bg-teal-500 text-white"
                : "text-white/55 hover:text-white",
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-[13px] text-white/50">{metric.caption}</p>
          <p className="flex items-baseline gap-2 text-[13px] text-white/50">
            {format(chart.first)}
            <span aria-hidden="true">→</span>
            <span className="text-[15px] font-bold text-white">
              {format(chart.last)}
            </span>
            {/* The arrow follows the metric, not the sign: a falling ACOS is
                the win, so an "up = good" arrow would misread the chart. */}
            <span className="flex items-center gap-1 rounded-full bg-teal-500/15 px-2.5 py-1 text-[12px] font-bold text-teal-300">
              <Icon
                name={metric.improvesDownward ? "arrow-down" : "arrow-up-right"}
                size={11}
                strokeWidth={2.6}
              />
              {metric.delta}
            </span>
          </p>
        </div>

        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          className="mt-4 h-auto w-full"
          role="img"
          aria-label={`${metric.caption}: ${format(chart.first)} before FBA Zest, ${format(chart.last)} after — a change of ${metric.delta}.`}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#20a8b4" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#20a8b4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((row) => {
            const y = PLOT.top + (row * (PLOT.bottom - PLOT.top)) / 4;
            return (
              <line
                key={row}
                x1={PLOT.left}
                x2={PLOT.right}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/6"
              />
            );
          })}

          <path
            data-proof-area
            d={chart.areaPath}
            fill={`url(#${gradientId})`}
          />

          <line
            data-proof-divider
            x1={chart.dividerX}
            x2={chart.dividerX}
            y1={PLOT.top - 14}
            y2={PLOT.bottom + 22}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 6"
            className="text-white/25"
          />

          <text
            x={chart.dividerX}
            y={PLOT.top - 22}
            textAnchor="middle"
            className="fill-white/45 text-[12px] font-bold tracking-[0.16em]"
          >
            FBA ZEST ONBOARDED
          </text>

          <path
            data-proof-before
            d={chart.beforePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/35"
          />

          <path
            data-proof-after
            d={chart.afterPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal-400"
          />

          {/* Keyed so the metric toggle mounts a fresh node: GSAP's transform
              cache lives on the element, and reusing it across a move leaves
              the dot pinned to the previous metric's end point. */}
          <g key={activeId} data-proof-end className="text-teal-400">
            <circle
              cx={chart.end.x}
              cy={chart.end.y}
              r="11"
              fill="currentColor"
              opacity="0.18"
            />
            <circle
              cx={chart.end.x}
              cy={chart.end.y}
              r="5"
              fill="currentColor"
            />
          </g>

          <text
            x={PLOT.left}
            y={VIEW.height - 12}
            className="fill-white/35 text-[12px] font-bold tracking-[0.16em]"
          >
            BEFORE
          </text>
          <text
            x={PLOT.right}
            y={VIEW.height - 12}
            textAnchor="end"
            className="fill-teal-400 text-[12px] font-bold tracking-[0.16em]"
          >
            WITH FBA ZEST
          </text>
        </svg>
      </div>
    </div>
  );
}
