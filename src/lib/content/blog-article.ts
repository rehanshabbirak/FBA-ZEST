import { cache } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import type { IconName } from "@/components/ui/Icon";
import { sanityFetch } from "@/sanity/client";
import {
  nextPostQuery,
  postBySlugQuery,
  relatedPostsQuery,
} from "@/sanity/queries";
import type { BlogPost } from "@/lib/content/blog";

export type ArticleParagraph = PortableTextBlock & { type: "block" };

export type ArticleBlock =
  | { type: "section"; title: string }
  | ArticleParagraph
  | { type: "callout"; tone: "tip" | "benefit"; title: string; text: string }
  | { type: "checklist"; items: string[] }
  | {
      type: "highlights";
      title: string;
      items: { icon: IconName; label: string }[];
    };

export const SECTIONS_BEFORE_FOLD = 3;

export type Article = BlogPost & {
  body: ArticleBlock[];
  sectionNoun: string;
};

// cache() dedupes the generateMetadata and page-body calls for the same slug
// into one fetch per request.
export const getPostBySlug = cache((slug: string): Promise<Article | null> => {
  return sanityFetch<Article | null>(postBySlugQuery, { slug });
});

export function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(relatedPostsQuery, {
    slug: post.slug,
    category: post.category,
    limit,
  });
}

export function getNextPost(post: BlogPost): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>(nextPostQuery, {
    slug: post.slug,
    publishedAt: post.publishedAt,
  });
}

export type ArticleHeading = {
  id: string;
  title: string;
  number: number;
};

export function headingId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getArticleHeadings(body: ArticleBlock[]): ArticleHeading[] {
  return body
    .filter((block) => block.type === "section")
    .map((block, index) => ({
      id: headingId(block.title),
      title: block.title,
      number: index + 1,
    }));
}

function paragraphText(block: ArticleParagraph): string {
  return (block.children ?? [])
    .map((child) => (typeof child.text === "string" ? child.text : ""))
    .join(" ");
}

function wordsIn(block: ArticleBlock): number {
  switch (block.type) {
    case "section":
      return block.title.split(/\s+/).length;
    case "block":
      return paragraphText(block).split(/\s+/).filter(Boolean).length;
    case "callout":
      return block.text.split(/\s+/).length;
    case "checklist":
      return block.items.join(" ").split(/\s+/).length;
    case "highlights":
      return block.items.map((item) => item.label).join(" ").split(/\s+/).length;
  }
}

export function getReadingMinutes(body: ArticleBlock[]): number {
  const words = body.reduce((total, block) => total + wordsIn(block), 0);
  return Math.max(1, Math.ceil(words / 200));
}
