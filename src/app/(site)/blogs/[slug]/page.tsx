import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import amazonLogo from "../../../../../public/png/amazon-scale-icon.png";
import growthBackdrop from "../../../../../public/png/growth-arrows.png";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CTABanner } from "@/components/shared/CTABanner";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleReaderProvider } from "@/components/blog/ArticleReader";
import { ArticleSidebar } from "@/components/blog/ArticleSidebar";
import { ShareRow } from "@/components/blog/ShareRow";
import { getAllPostSlugs } from "@/lib/content/blog";
import {
  getArticleHeadings,
  getNextPost,
  getPostBySlug,
  getReadingMinutes,
  getRelatedPosts,
} from "@/lib/content/blog-article";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blogs/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const [next, related] = await Promise.all([
    getNextPost(post),
    getRelatedPosts(post),
  ]);

  const headings = getArticleHeadings(post.body);

  return (
    <>
      <ArticleHero post={post} readingMinutes={getReadingMinutes(post.body)} />

      <section className="bg-surface">
        <ArticleReaderProvider>
          <Container className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_336px] lg:py-16">
            <article className="flex flex-col gap-7">
              <div className="relative aspect-16/9 overflow-hidden rounded-lg border border-line bg-white shadow-card">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              <ArticleBody blocks={post.body} sectionNoun={post.sectionNoun} />

              <footer className="mt-2 flex flex-col gap-6 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                <ShareRow
                  url={`${site.url}/blogs/${post.slug}`}
                  title={post.title}
                />

                {next ? (
                  <Link
                    href={`/blogs/${next.slug}`}
                    className="group flex items-center gap-4 sm:max-w-xs"
                  >
                    <span className="min-w-0 text-right">
                      <span className="block text-[11.5px] font-semibold text-subtle">
                        Next Article
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug font-bold text-ink transition-colors duration-200 group-hover:text-teal-600">
                        {next.title}
                      </span>
                    </span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-teal-600 transition-colors duration-200 group-hover:border-teal-400 group-hover:bg-teal-50">
                      <Icon name="arrow-right" size={16} />
                    </span>
                  </Link>
                ) : null}
              </footer>
            </article>

            <ArticleSidebar post={post} headings={headings} related={related} />
          </Container>
        </ArticleReaderProvider>
      </section>

      <CTABanner
        logo={amazonLogo}
        backdrop={growthBackdrop}
        title="Want to Scale Your Amazon Business?"
        description="Book a free consultation with our Amazon experts."
        ctaLabel="Get a Free Consultation"
      />
    </>
  );
}
