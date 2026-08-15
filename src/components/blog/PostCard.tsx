import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { formatPostDate, type BlogPost } from "@/lib/content/blog";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card hover:border-teal-400">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-teal-500 uppercase">
          {post.categoryTitle}
        </p>

        <h3 className="mt-2.5 text-[15px] leading-snug font-bold text-ink">
          {/* Stretched link: the whole card is clickable but only one link is
              exposed to assistive tech. */}
          <Link
            href={`/blogs/${post.slug}`}
            className="transition-colors duration-200 after:absolute after:inset-0 group-hover:text-teal-600"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-[12.5px] leading-[1.6] text-muted">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Avatar name={post.author.name} src={post.author.avatar} size={28} />
            <span className="leading-tight">
              <span className="block text-[11.5px] font-semibold text-ink">
                By {post.author.name}
              </span>
              <span className="block text-[11px] text-subtle">
                {formatPostDate(post.publishedAt)}
              </span>
            </span>
          </div>

          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-teal-500"
          >
            Read More
            <Icon
              name="arrow-right"
              size={14}
              className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
