import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "onTeal" | "muted";
};

export function Eyebrow({
  children,
  className,
  tone = "default",
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[12px] font-bold tracking-[0.14em] uppercase",
        tone === "onTeal" && "text-teal-200",
        tone === "muted" && "text-subtle",
        tone === "default" && "text-teal-500",
        className,
      )}
    >
      {children}
    </p>
  );
}
