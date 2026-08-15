import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/png/blog-hero-section.png";
import { Container } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { blogHref } from "@/components/blog/blogHref";
import { formatPostDate, type BlogPost } from "@/lib/content/blog";

const HERO_ALT =
  "An Amazon seller dashboard showing total sales, ACOS and ROAS beside a sales-over-time chart and a campaign performance breakdown.";

type ArticleHeroProps = {
  post: BlogPost;
  readingMinutes: number;
};

export function ArticleHero({ post, readingMinutes }: ArticleHeroProps) {
  const categoryTitle = post.categoryTitle;

  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <Image
          src={heroImage}
          alt={HERO_ALT}
          fill
          priority
          placeholder="blur"
          sizes="56vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-black from-0% via-black/40 via-16% to-transparent to-46%"
        />
      </div>

      <Container className="relative">
        <nav
          aria-label="Breadcrumb"
          className="pt-7 text-[12.5px] text-white/55"
        >
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li className="flex items-center gap-2">
              <Link
                href="/"
                className="transition-colors duration-200 hover:text-teal-400"
              >
                Home
              </Link>
              <Icon name="chevron-right" size={13} className="text-white/30" />
            </li>
            <li className="flex items-center gap-2">
              <Link
                href="/blogs"
                className="transition-colors duration-200 hover:text-teal-400"
              >
                Blogs
              </Link>
              <Icon name="chevron-right" size={13} className="text-white/30" />
            </li>
            <li className="flex items-center gap-2">
              <Link
                href={blogHref({ category: post.category })}
                className="transition-colors duration-200 hover:text-teal-400"
              >
                {categoryTitle}
              </Link>
              <Icon name="chevron-right" size={13} className="text-white/30" />
            </li>
            <li aria-current="page" className="text-teal-400">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="max-w-xl pt-8 pb-14 lg:max-w-lg lg:pt-10 lg:pb-20">
          <p className="text-[12px] font-bold tracking-[0.14em] text-teal-400 uppercase">
            {categoryTitle}
          </p>

          <h1 className="mt-4 text-[30px] leading-[1.14] font-extrabold tracking-[-0.02em] text-white sm:text-[38px] lg:text-[42px]">
            {post.title}
          </h1>

          <p className="mt-5 text-[15px] leading-[1.7] text-white/70">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Avatar
              name={post.author.name}
              src={post.author.avatar}
              size={44}
            />
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-white">
                By {post.author.name}
              </p>
              <p className="mt-1 flex items-center gap-2 text-[12px] text-white/55">
                <span>{formatPostDate(post.publishedAt)}</span>
                <span aria-hidden="true" className="text-white/25">
                  •
                </span>
                <span>{readingMinutes} min read</span>
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative aspect-3/2 w-full lg:hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 1px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
