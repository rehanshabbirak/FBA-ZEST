import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export const BLOG_TAG = "blog";

export function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  // force-cache puts every response in the data cache under BLOG_TAG. Without
  // it Next 16 defaults to no-store: the dynamic /blogs route would hit Sanity
  // on every request, and the publish webhook's revalidateTag would have no
  // cache entry to invalidate.
  return client.fetch<T>(query, params, {
    cache: "force-cache",
    next: { tags: [BLOG_TAG] },
  });
}
