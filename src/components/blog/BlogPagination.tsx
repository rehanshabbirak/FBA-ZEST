import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { blogHref, type BlogQuery } from "@/components/blog/blogHref";
import { cn } from "@/lib/cn";

type BlogPaginationProps = BlogQuery & {
  page: number;
  totalPages: number;
};

function pageItems(current: number, total: number): (number | "gap")[] {
  const shown = new Set<number>([1, total]);

  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) shown.add(i);
  }
  if (current <= 2) [2, 3].forEach((n) => n <= total && shown.add(n));
  if (current >= total - 1) {
    [total - 1, total - 2].forEach((n) => n >= 1 && shown.add(n));
  }

  const sorted = [...shown].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];

  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) items.push("gap");
    items.push(n);
  });

  return items;
}

export function BlogPagination({
  page,
  totalPages,
  category,
  query,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Blog pagination" className="flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {pageItems(page, totalPages).map((entry, i) =>
          entry === "gap" ? (
            <li
              key={`gap-${i}`}
              aria-hidden="true"
              className="flex size-9 items-center justify-center text-[0.8125rem] text-subtle"
            >
              …
            </li>
          ) : (
            <li key={entry}>
              <Link
                href={blogHref({ category, query, page: entry })}
                aria-label={`Page ${entry}`}
                aria-current={entry === page ? "page" : undefined}
                className={cn(
                  "flex size-9 items-center justify-center rounded-sm border text-[0.8125rem] font-semibold transition-colors duration-200",
                  entry === page
                    ? "border-teal-500 bg-teal-500 text-white"
                    : "border-line bg-white text-muted hover:border-teal-400 hover:text-teal-600",
                )}
              >
                {entry}
              </Link>
            </li>
          ),
        )}

        {page < totalPages ? (
          <li className="ml-1">
            <Link
              href={blogHref({ category, query, page: page + 1 })}
              rel="next"
              className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-line bg-white px-4 text-[0.8125rem] font-semibold text-muted transition-colors duration-200 hover:border-teal-400 hover:text-teal-600"
            >
              Next
              <Icon name="arrow-right" size={15} />
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
