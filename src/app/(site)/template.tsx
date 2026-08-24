"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// Module scope survives the remount Next gives template.tsx on every
// navigation, so the very first paint renders unanimated and never delays LCP.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  // gsap.ts refreshes ScrollTrigger on the document `load` event, which fires
  // only for the first page. A client-side navigation swaps the DOM without it,
  // so the incoming page's triggers measure a layout that has not settled —
  // and because they are `once: true`, they never re-evaluate, leaving whole
  // sections stuck at the opacity 0 their setup applied.
  useEffect(() => {
    if (!animate) return;

    const node = wrapper.current;
    const refresh = () => ScrollTrigger.refresh();
    let cancelled = false;

    const frame = requestAnimationFrame(refresh);
    // Measuring mid-animation reads positions through the page-enter
    // transform, so take them again once it has finished.
    node?.addEventListener("animationend", refresh, { once: true });
    document.fonts.ready.then(() => {
      if (!cancelled) refresh();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      node?.removeEventListener("animationend", refresh);
    };
  }, [animate]);

  return (
    <div ref={wrapper} className={animate ? "page-enter" : undefined}>
      {children}
    </div>
  );
}
