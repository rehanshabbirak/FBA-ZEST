/**
 * Blog listing state lives in the URL rather than client state: the filters,
 * search and pagination all render as plain links/forms, so the page keeps
 * working without JavaScript and maps directly onto a CMS query later.
 */
export type BlogQuery = {
  category?: string;
  query?: string;
  page?: number;
};

/**
 * Anchor on the filter bar. The featured post only renders for the unfiltered
 * first page, so changing filter or page removes it and slides everything
 * below upwards. Landing on this anchor makes the result position stable
 * regardless of whether the featured slot was showing.
 */
export const BLOG_LIST_ANCHOR = "articles";

export function blogHref({ category, query, page }: BlogQuery): string {
  const params = new URLSearchParams();

  if (category && category !== "all") params.set("category", category);
  if (query) params.set("q", query);
  if (page && page > 1) params.set("page", String(page));

  const search = params.toString();
  return `/blogs${search ? `?${search}` : ""}#${BLOG_LIST_ANCHOR}`;
}
