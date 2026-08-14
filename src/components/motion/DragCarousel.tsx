"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  LazyMotion,
  animate,
  domMax,
  m,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type DragCarouselProps = {
  children: ReactNode;
  ariaLabel: string;
  itemClassName?: string;
  className?: string;
  tone?: "light" | "dark";
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

const track = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

type Metrics = {
  /** One card per view: pages map to cards and the active card is centred. */
  centered: boolean;
  pages: number;
  /** Card width plus gap. */
  stride: number;
  /** Offset that centres a card; also the resting x of the first card. */
  pad: number;
  /** Total travel available, as a positive number. */
  maxDrag: number;
  vpWidth: number;
};

const EMPTY_METRICS: Metrics = {
  centered: false,
  pages: 1,
  stride: 0,
  pad: 0,
  maxDrag: 0,
  vpWidth: 0,
};

const sameMetrics = (a: Metrics, b: Metrics) =>
  a.centered === b.centered &&
  a.pages === b.pages &&
  a.stride === b.stride &&
  a.pad === b.pad &&
  a.maxDrag === b.maxDrag &&
  a.vpWidth === b.vpWidth;

/** Resting x for a page: centred layouts step by card, others by viewport. */
function targetFor(m: Metrics, index: number) {
  if (m.centered) return m.pad - index * m.stride;
  // The last page snaps flush to the end so gap overflow never leaves a sliver
  // of the final card unreachable from the dots.
  return index >= m.pages - 1 && m.maxDrag > 0
    ? -m.maxDrag
    : Math.max(-m.maxDrag, -index * m.vpWidth);
}

export function DragCarousel({
  children,
  ariaLabel,
  itemClassName,
  className,
  tone = "light",
}: DragCarouselProps) {
  const onDark = tone === "dark";
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();

  const [metrics, setMetrics] = useState<Metrics>(EMPTY_METRICS);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const vp = viewport.current;
    const rl = rail.current;
    if (!vp || !rl || vp.clientWidth === 0) return;

    const items = Array.from(rl.children) as HTMLElement[];
    if (items.length === 0) return;

    const vpWidth = vp.clientWidth;
    const itemWidth = items[0].offsetWidth;
    const gap =
      items.length > 1
        ? Math.max(0, items[1].offsetLeft - items[0].offsetLeft - itemWidth)
        : 0;
    const stride = itemWidth + gap;

    // Cards that fit at once. One means a peek layout (mobile), where paging by
    // viewport width would leave the active card clipped at both edges.
    const perPage = stride > 0 ? Math.max(1, Math.round((vpWidth + gap) / stride)) : 1;
    const centered = perPage === 1 && items.length > 1;

    const next: Metrics = centered
      ? {
          centered: true,
          pages: items.length,
          stride,
          // Slack on each side of a centered card; also the resting x of card 0.
          pad: Math.max(0, (vpWidth - itemWidth) / 2),
          maxDrag: (items.length - 1) * stride,
          vpWidth,
        }
      : {
          centered: false,
          pages: Math.max(
            rl.scrollWidth - vpWidth > 1 ? 2 : 1,
            // Rounded, not ceiled: gaps push scrollWidth a few px past a whole
            // number of viewports, and ceil would add a phantom final page.
            Math.round(rl.scrollWidth / vpWidth),
          ),
          stride,
          pad: 0,
          maxDrag: Math.max(0, rl.scrollWidth - vpWidth),
          vpWidth,
        };

    setMetrics((prev) => (sameMetrics(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    const vp = viewport.current;
    const rl = rail.current;
    if (!vp || !rl) return;

    // ResizeObserver fires once on observe, so the initial measurement
    // happens in the callback rather than synchronously in this effect.
    const observer = new ResizeObserver(measure);
    observer.observe(vp);
    observer.observe(rl);
    return () => observer.disconnect();
  }, [measure]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(metrics.pages - 1, next));

      animate(
        x,
        targetFor(metrics, clamped),
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 280, damping: 34, mass: 0.6 },
      );
      setPage(clamped);
    },
    [metrics, reduced, x],
  );

  // Re-anchor whenever the layout changes: on mount a centred rail must start
  // at +pad rather than 0, and a breakpoint change invalidates the old resting
  // position for the page the user is on.
  useEffect(() => {
    if (metrics.vpWidth === 0) return;
    x.set(targetFor(metrics, Math.min(page, metrics.pages - 1)));
    // `page` is intentionally omitted: this realigns on layout change only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics, x]);

  const { centered, pages, pad, maxDrag, stride, vpWidth } = metrics;
  // Derived rather than synced: a breakpoint change can shrink `pages` below
  // the stored index, and clamping here avoids a write-back render.
  const activePage = Math.min(page, pages - 1);
  const canScroll = maxDrag > 1;
  // Centred rails rest at +pad, so both bounds shift by it.
  const dragConstraints = { left: pad - maxDrag, right: pad };

  return (
    // This is the only component on the site that needs Motion's drag
    // features, so the feature bundle is loaded here rather than app-wide.
    <LazyMotion features={domMax} strict>
      <div
        className={cn("relative", className)}
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        <div ref={viewport} className="overflow-x-clip overflow-y-visible">
          <m.ul
            ref={rail}
            style={{ x }}
            drag={canScroll ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0.12}
            dragMomentum
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={track}
            className={cn(
              "flex gap-5",
              canScroll && "cursor-grab active:cursor-grabbing",
            )}
            onDragEnd={(_, info) => {
              const projected = x.get() + info.velocity.x * 0.12;
              // Centred rails step one card at a time; otherwise a full view.
              goTo(
                centered
                  ? Math.round((pad - projected) / stride)
                  : Math.round(-projected / vpWidth),
              );
            }}
          >
            {Children.map(children, (child) => (
              <m.li variants={item} className={cn("shrink-0", itemClassName)}>
                {child}
              </m.li>
            ))}
          </m.ul>
        </div>

        {canScroll ? (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => goTo((activePage - 1 + pages) % pages)}
              aria-label="Previous"
              className={cn(
                "flex size-10 items-center justify-center rounded-full border transition-colors duration-200",
                onDark
                  ? "border-white/25 bg-white/10 text-white hover:border-teal-300 hover:text-teal-200"
                  : "border-line bg-white text-ink hover:border-teal-400 hover:text-teal-600",
              )}
            >
              <Icon name="chevron-right" size={18} className="rotate-180" />
            </button>

            <div className="flex gap-2.5">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === activePage}
                  className={cn(
                    "h-2.5 rounded-full transition-[background-color,width] duration-200",
                    i === activePage
                      ? onDark
                        ? "w-6 bg-teal-300"
                        : "w-6 bg-teal-500"
                      : onDark
                        ? "w-2.5 bg-white/25 hover:bg-white/45"
                        : "w-2.5 bg-ink/20 hover:bg-ink/35",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo((activePage + 1) % pages)}
              aria-label="Next"
              className={cn(
                "flex size-10 items-center justify-center rounded-full border transition-colors duration-200",
                onDark
                  ? "border-white/25 bg-white/10 text-white hover:border-teal-300 hover:text-teal-200"
                  : "border-line bg-white text-ink hover:border-teal-400 hover:text-teal-600",
              )}
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </LazyMotion>
  );
}
