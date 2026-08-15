import { sanityFetch } from "@/sanity/client";
import {
  archivePostsQuery,
  allPostSlugsQuery,
  categoriesQuery,
  categoryCountsQuery,
  featuredPostQuery,
  popularPostsQuery,
} from "@/sanity/queries";

export type BlogAuthor = {
  name: string;
  avatar: string;
  role: string;
  bio: string;
  linkedin: string;
  email: string;
};

export type BlogCategory = {
  slug: string;
  title: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTitle: string;
  coverImage: string;
  author: BlogAuthor;
  publishedAt: string;
  featured?: boolean;
  popularRank?: number;
};

export const POSTS_PER_PAGE = 6;

export function getCategories(): Promise<BlogCategory[]> {
  return sanityFetch<BlogCategory[]>(categoriesQuery);
}

export function getFeaturedPost(): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>(featuredPostQuery);
}

export function getPopularPosts(): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(popularPostsQuery);
}

export function getAllPostSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(allPostSlugsQuery);
}

export async function getCategoryCounts(): Promise<
  { slug: string; title: string; count: number }[]
> {
  const counts = await sanityFetch<
    { slug: string; title: string; count: number }[]
  >(categoryCountsQuery);

  return [
    {
      slug: "all",
      title: "All Categories",
      count: counts.reduce((total, entry) => total + entry.count, 0),
    },
    ...counts,
  ];
}

export type PostFilters = {
  category?: string;
  query?: string;
};

export function filterPosts({ category, query }: PostFilters): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(archivePostsQuery, {
    category: category ?? "all",
    query: query?.trim() ?? "",
  });
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    page: current,
    totalPages,
    total: items.length,
  };
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(iso: string): string {
  return DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}
