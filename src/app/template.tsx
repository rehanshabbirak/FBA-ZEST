"use client";

import { useEffect, useState, type ReactNode } from "react";

// Module scope survives the remount Next gives template.tsx on every
// navigation, so the very first paint renders unanimated and never delays LCP.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
