import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[12px] font-bold tracking-[0.14em] text-teal-500 uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
