import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/content/blog";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/case-studies",
    "/pricing",
    "/blogs",
    "/contact",
    "/privacy-policy",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/blogs" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy-policy" ? 0.3 : 0.7,
  }));

  const slugs = await getAllPostSlugs();
  const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${site.url}/blogs/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
