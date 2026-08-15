import Image from "next/image";
import Link from "next/link";
import logoOnDark from "../../../public/logos/FBA_Zest_Logo_Teal_White_Dark.svg";
import logoOnLight from "../../../public/logos/FBA_Zest_Logo_Teal.svg";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  size?: "sm" | "md";
  priority?: boolean;
};

export function Logo({
  className,
  tone = "dark",
  size = "sm",
  priority,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="FBA Zest, home"
      className={cn("inline-flex shrink-0", className)}
    >
      <Image
        src={tone === "dark" ? logoOnDark : logoOnLight}
        alt="FBA Zest"
        priority={priority}
        unoptimized
        className={cn(
          "w-auto",
          size === "sm" ? "h-8 sm:h-9 lg:h-10" : "h-9 sm:h-11 lg:h-12",
        )}
      />
    </Link>
  );
}
