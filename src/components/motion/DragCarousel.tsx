"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Draggable, gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type DragCarouselProps = {
  children: ReactNode;
  ariaLabel: string;
  itemClassName?: string;
  className?: string;
  tone?: "light" | "dark";
};

/** Settle after a dot/arrow press. Eased rather than sprung so it cannot overshoot past a bound. */
const SETTLE = { duration: 0.55, ease: "power3.out" } as const;

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

/** Inverse of targetFor: which page does this x land on. */
function pageFor(m: Metrics, x: number) {
  const raw = m.centered
    ? Math.round((m.pad - x) / m.stride)
    : Math.round(-x / m.vpWidth);
  return Math.max(0, Math.min(m.pages - 1, raw));
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const dragger = useRef<InstanceType<typeof Draggable> | null>(null);
  /** Written by the snap solver, read once the throw settles. */
  const landedOn = useRef(0);

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
    const perPage =
      stride > 0 ? Math.max(1, Math.round((vpWidth + gap) / stride)) : 1;
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
      const rl = rail.current;
      const clamped = Math.max(0, Math.min(metrics.pages - 1, next));
      setPage(clamped);
      if (!rl) return;

      gsap.to(rl, {
        x: targetFor(metrics, clamped),
        duration: prefersReducedMotion() ? 0 : SETTLE.duration,
        ease: SETTLE.ease,
        overwrite: true,
        // Draggable caches the element's position when it is created; a
        // programmatic move has to hand the new resting point back to it or
        // the next drag jumps from the stale value.
        onComplete: () => dragger.current?.update(),
      });
    },
    [metrics],
  );

  // Re-anchor and rebuild the drag handler whenever the layout changes: on
  // mount a centred rail must start at +pad rather than 0, and a breakpoint
  // change invalidates both the resting position and the drag bounds.
  useEffect(() => {
    const rl = rail.current;
    if (!rl || metrics.vpWidth === 0) return;

    gsap.set(rl, { x: targetFor(metrics, Math.min(page, metrics.pages - 1)) });

    if (metrics.maxDrag <= 1) return;

    const [instance] = Draggable.create(rl, {
      type: "x",
      bounds: { minX: metrics.pad - metrics.maxDrag, maxX: metrics.pad },
      // Mirrors Motion's dragElastic: a little give past the ends, not a wall.
      edgeResistance: 0.88,
      inertia: true,
      // Vertical page scrolling must still win on touch devices.
      allowNativeTouchScrolling: true,
      snap: {
        // Receives the position the throw would land on, so the page is chosen
        // from projected momentum rather than from where the finger lifted.
        x: (endValue: number) => {
          landedOn.current = pageFor(metrics, endValue);
          return targetFor(metrics, landedOn.current);
        },
      },
      onThrowComplete: () => setPage(landedOn.current),
    });
    dragger.current = instance;

    return () => {
      instance.kill();
      dragger.current = null;
    };
    // `page` is intentionally omitted: this realigns on layout change only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics]);

  // Entrance stagger. Scoped to the viewport so useGSAP reverts it on unmount.
  useGSAP(
    () => {
      const rl = rail.current;
      if (!rl || rl.children.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(Array.from(rl.children), {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: rl, start: "top 80%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: viewport },
  );

  const { pages, maxDrag } = metrics;
  // Derived rather than synced: a breakpoint change can shrink `pages` below
  // the stored index, and clamping here avoids a write-back render.
  const activePage = Math.min(page, pages - 1);
  const canScroll = maxDrag > 1;

  return (
    <div
      className={cn("relative", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div ref={viewport} className="overflow-x-clip overflow-y-visible">
        <ul
          ref={rail}
          className={cn(
            "flex gap-5",
            canScroll && "cursor-grab active:cursor-grabbing",
          )}
        >
          {Children.map(children, (child) => (
            <li className={cn("shrink-0", itemClassName)}>{child}</li>
          ))}
        </ul>
      </div>

      {canScroll ? (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            suppressHydrationWarning
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
                suppressHydrationWarning
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
            suppressHydrationWarning
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
  );
}
