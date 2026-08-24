import Image from "next/image";
import Link from "next/link";
import { SidebarPanel } from "@/components/blog/SidebarPanel";
import { formatPostDate, type BlogPost } from "@/lib/content/blog";

export function RelatedPanel({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <SidebarPanel title="Related Posts">
      <ul className="mt-4 flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug} className="group flex items-center gap-3">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-md">
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="4vw"
                className="object-cover"
              />
            </span>
            <span className="min-w-0">
              <Link
                href={`/blogs/${post.slug}`}
                className="block text-[0.8125rem] leading-snug font-bold text-ink transition-colors duration-200 group-hover:text-teal-600"
              >
                {post.title}
              </Link>
              <span className="mt-1 block text-[0.71875rem] text-subtle">
                {formatPostDate(post.publishedAt)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </SidebarPanel>
  );
}
