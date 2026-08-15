import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SidebarPanel } from "@/components/blog/SidebarPanel";
import { SearchPanel } from "@/components/blog/SearchPanel";
import { blogHref } from "@/components/blog/blogHref";
import {
  formatPostDate,
  getCategoryCounts,
  getPopularPosts,
} from "@/lib/content/blog";
import { cn } from "@/lib/cn";

type BlogSidebarProps = {
  category: string;
  query?: string;
};

export async function BlogSidebar({ category, query }: BlogSidebarProps) {
  const [popular, counts] = await Promise.all([
    getPopularPosts(),
    getCategoryCounts(),
  ]);

  return (
    <aside className="flex flex-col gap-6">
      <SearchPanel category={category} query={query} />

      <SidebarPanel title="Popular Posts">
        <ul className="mt-4 flex flex-col gap-4">
          {popular.map((post) => (
            <li key={post.slug} className="group flex items-center gap-3">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="block text-[13px] leading-snug font-bold text-ink transition-colors duration-200 group-hover:text-teal-600"
                >
                  {post.title}
                </Link>
                <span className="mt-1 block text-[11.5px] text-subtle">
                  {formatPostDate(post.publishedAt)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </SidebarPanel>

      <SidebarPanel title="Categories">
        <ul className="mt-3 flex flex-col">
          {counts.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={blogHref({ category: entry.slug, query })}
                aria-current={entry.slug === category ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between gap-3 border-b border-line py-3 text-[13.5px] transition-colors duration-200 last:border-b-0",
                  entry.slug === category
                    ? "font-semibold text-teal-600"
                    : "text-muted hover:text-teal-600",
                )}
              >
                <span>{entry.title}</span>
                <span className="flex items-center gap-1.5 text-subtle">
                  <span className="text-[12.5px]">({entry.count})</span>
                  <Icon name="chevron-right" size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </SidebarPanel>
    </aside>
  );
}
