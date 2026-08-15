import Image from "next/image";
import featureImage from "../../../public/png/blog-feature-image.png";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { formatPostDate, type BlogPost } from "@/lib/content/blog";

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-line bg-white shadow-card md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="relative aspect-4/3 md:aspect-auto md:min-h-73">
        <Image
          src={featureImage}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-md bg-teal-500 px-3 py-1.5 text-[10.5px] font-bold tracking-[0.12em] text-white uppercase">
          Featured
        </span>
      </div>

      <div className="flex flex-col justify-center p-6 lg:p-8">
        <p className="text-[10.5px] font-bold tracking-[0.14em] text-teal-500 uppercase">
          {post.categoryTitle}
        </p>

        <h2 className="mt-3 text-[21px] leading-[1.25] font-bold text-ink lg:text-[24px]">
          {post.title}
        </h2>

        <p className="mt-3.5 text-[13.5px] leading-[1.65] text-muted">
          {post.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar name={post.author.name} src={post.author.avatar} size={38} />
            <span className="leading-tight">
              <span className="block text-[12.5px] font-semibold text-ink">
                By {post.author.name}
              </span>
              <span className="block text-[12px] text-subtle">
                {formatPostDate(post.publishedAt)}
              </span>
            </span>
          </div>

          <Button href={`/blogs/${post.slug}`}>Read Full Article</Button>
        </div>
      </div>
    </article>
  );
}
