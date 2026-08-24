export type BlogQuery = {
  category?: string;
  query?: string;
  page?: number;
};

export const BLOG_LIST_ANCHOR = "articles";

export function blogHref({ category, query, page }: BlogQuery): string {
  const params = new URLSearchParams();

  if (category && category !== "all") params.set("category", category);
  if (query) params.set("q", query);
  if (page && page > 1) params.set("page", String(page));

  const search = params.toString();
  return `/blogs${search ? `?${search}` : ""}#${BLOG_LIST_ANCHOR}`;
}
