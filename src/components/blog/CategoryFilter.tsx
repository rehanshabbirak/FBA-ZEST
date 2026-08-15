import Link from "next/link";
import { getCategories } from "@/lib/content/blog";
import { blogHref } from "@/components/blog/blogHref";
import { cn } from "@/lib/cn";

type CategoryFilterProps = {
  active: string;
  query?: string;
};

export async function CategoryFilter({ active, query }: CategoryFilterProps) {
  const tabs = [{ slug: "all", title: "All" }, ...(await getCategories())];

  return (
    <nav
      aria-label="Filter posts by category"
      className="rounded-lg border border-line bg-white p-2 shadow-card"
    >
      <ul className="flex flex-wrap items-center gap-1">
        {tabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <li key={tab.slug}>
              <Link
                href={blogHref({ category: tab.slug, query })}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-[8px] px-4 text-[13px] font-semibold transition-colors duration-200",
                  isActive
                    ? "bg-teal-500 text-white"
                    : "text-muted hover:bg-teal-50 hover:text-teal-600",
                )}
              >
                {tab.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
