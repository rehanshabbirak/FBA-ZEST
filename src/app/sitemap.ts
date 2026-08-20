import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/content/blog";
import { services } from "@/lib/content/services";
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

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const slugs = await getAllPostSlugs();
  const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${site.url}/blogs/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
