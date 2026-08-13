"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

function formatter(decimals: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  delay = 0,
  className,
}: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const format = formatter(decimals);
  const final = `${prefix}${format.format(value)}${suffix}`;

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const render = (n: number) =>
      `${prefix}${formatter(decimals).format(n)}${suffix}`;

    node.textContent = render(0);

    let frame = 0;
    let timer = 0;
    let startedAt = 0;

    const step = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      node.textContent = render(value * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(step);
      else node.textContent = render(value);
    };

    let armed = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const ratio = entries[entries.length - 1].intersectionRatio;

        if (!armed && ratio === 0) {
          armed = true;
          cancelAnimationFrame(frame);
          clearTimeout(timer);
          node.textContent = render(0);
          return;
        }

        if (armed && ratio >= 0.4) {
          armed = false;
          startedAt = 0;
          node.textContent = render(0);
          timer = window.setTimeout(() => {
            frame = requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: [0, 0.4] },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      node.textContent = render(value);
    };
  }, [value, prefix, suffix, decimals, duration, delay]);

  return (
    <span className={cn("tabular-nums", className)}>
      <span ref={numberRef} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
