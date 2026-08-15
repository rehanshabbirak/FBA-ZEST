import { cn } from "@/lib/cn";

export function SidebarPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-line bg-white p-6 shadow-card",
        className,
      )}
    >
      <h2 className="text-[16px] font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
