import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";
export type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-500 text-white hover:bg-teal-400 active:bg-teal-700 hover:shadow-cta",
  secondary:
    "bg-white text-ink border border-line-strong hover:border-teal-400 hover:text-teal-600",
  dark: "bg-black text-white border border-[#2a3235] hover:border-teal-500 hover:bg-dark-surface",
  ghost:
    "bg-transparent text-teal-500 hover:text-teal-400 px-0 hover:underline underline-offset-4",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-[14px]",
  lg: "h-13 px-6 text-[15px]",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName | null;
  /** Side the icon sits on; "start" also flips the hover nudge. */
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = SharedProps & { href: string };
type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classesFor({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: SharedProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-55",
    variants[variant],
    variant === "ghost" ? "h-auto text-[15px]" : sizes[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  // Destructuring separates presentation props from DOM props in one pass,
  // so no per-render object is built and stripped key by key.
  const {
    variant,
    size,
    icon = "arrow-right",
    iconPosition = "end",
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "group/btn",
    classesFor({ variant, size, fullWidth, className, children }),
  );

  const glyph = icon ? (
    <Icon
      name={icon}
      size={17}
      className={cn(
        "shrink-0 transition-transform duration-200 ease-out-soft",
        iconPosition === "start"
          ? "group-hover/btn:-translate-x-0.5"
          : "group-hover/btn:translate-x-0.5",
      )}
    />
  ) : null;

  const body = (
    <>
      {iconPosition === "start" ? glyph : null}
      <span>{children}</span>
      {iconPosition === "end" ? glyph : null}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link href={rest.href} className={classes}>
        {body}
      </Link>
    );
  }

  // Defaults to "button" so a Button dropped inside a form cannot submit it by
  // accident; an explicit type passed by the caller still wins.
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    >
      {body}
    </button>
  );
}
