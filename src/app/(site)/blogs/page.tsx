import type { Metadata } from "next";
import amazonLogo from "../../../../public/images/amazon-scale-icon.png";
import growthBackdrop from "../../../../public/images/growth-arrows.png";
import { Container } from "@/components/ui/Container";
import { CTABanner } from "@/components/shared/CTABanner";
import { BlogHero } from "@/components/blog/BlogHero";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { PostCard } from "@/components/blog/PostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BLOG_LIST_ANCHOR } from "@/components/blog/blogHref";
import {
  filterPosts,
  getCategories,
  getFeaturedPost,
  paginate,
} from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Expert Amazon strategies, PPC tactics, SEO guides and case studies to help your brand rank higher, sell more and scale profitably.",
};

type SearchParams = Promise<{
  category?: string;
  q?: string;
  page?: string;
}>;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: rawCategory, q, page: rawPage } = await searchParams;

  // The featured query is independent of the filters, so it starts before the
  // category validation that filterPosts depends on.
  const featuredPromise = getFeaturedPost();

  const categories = await getCategories();
  const isKnownCategory = categories.some((c) => c.slug === rawCategory);
  const category = isKnownCategory ? rawCategory! : "all";
  const query = q?.trim() || undefined;

  const parsedPage = Number.parseInt(rawPage ?? "1", 10);
  const requestedPage = Number.isFinite(parsedPage) ? parsedPage : 1;

  const [featured, matching] = await Promise.all([
    featuredPromise,
    filterPosts({ category, query }),
  ]);

  const { items, page, totalPages, total } = paginate(matching, requestedPage);

  const showFeatured = featured && category === "all" && !query && page === 1;

  return (
    <>
      <BlogHero />

      <section className="bg-surface">
        <Container className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_336px] lg:py-16">
          <div className="flex flex-col gap-7">
            {showFeatured ? <FeaturedPost post={featured} /> : null}

            <div id={BLOG_LIST_ANCHOR} className="scroll-mt-24">
              <CategoryFilter active={category} query={query} />
            </div>

            {query ? (
              <p className="text-[13.5px] text-muted">
                {total === 0
                  ? "No articles match "
                  : `${total} article${total === 1 ? "" : "s"} matching `}
                <span className="font-semibold text-ink">
                  &ldquo;{query}&rdquo;
                </span>
              </p>
            ) : null}

            {items.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((post) => (
                  <li key={post.slug} className="h-full">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-line bg-white p-10 text-center text-[14px] text-muted shadow-card">
                Nothing here yet. Try another category or search term.
              </p>
            )}

            <BlogPagination
              page={page}
              totalPages={totalPages}
              category={category}
              query={query}
            />
          </div>

          <BlogSidebar category={category} query={query} />
        </Container>
      </section>

      <CTABanner
        logo={amazonLogo}
        backdrop={growthBackdrop}
        title="Want to Scale Your Amazon Business?"
        description="Book a free consultation with our experts."
        ctaLabel="Get Started"
      />
    </>
  );
}
