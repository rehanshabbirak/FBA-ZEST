import type { IconName } from "@/components/ui/Icon";

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  navLabel: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "ppc-management",
    icon: "megaphone",
    title: "Amazon PPC Management",
    navLabel: "PPC Management",
    description:
      "End-to-end advertising management across Sponsored Products, Sponsored Brands, Sponsored Display, AMC, campaign structure and optimization.",
  },
  {
    id: "brand-management",
    icon: "briefcase",
    title: "Amazon Brand Management",
    navLabel: "Brand Management",
    description:
      "Complete day-to-day management covering account operations, catalog, inventory, pricing, promotions, brand protection, and overall growth strategy.",
  },
  {
    id: "seo-listing-optimization",
    icon: "search",
    title: "Amazon SEO & Listing Optimization",
    navLabel: "SEO & Listing Optimization",
    description:
      "Keyword research, listing SEO, titles, bullets, backend terms, A+ Content, Storefronts, conversion optimization, and organic ranking.",
  },
  {
    id: "analytics-strategy",
    icon: "chart-bar",
    title: "Amazon Analytics & Strategy",
    navLabel: "Analytics & Strategy",
    description:
      "Business reporting, Brand Analytics, SQP, market & competitor analysis, customer insights, profitability, forecasting, and data-driven growth strategy.",
  },
  {
    id: "product-launch-growth",
    icon: "rocket",
    title: "Product Launch & Growth",
    navLabel: "Product Launch & Growth",
    description:
      "Market research, product positioning, launch strategy, PPC launch campaigns, ranking, reviews, promotions, and scaling successful products.",
  },
  {
    id: "creative-conversion",
    icon: "image",
    title: "Amazon Creative & Conversion",
    navLabel: "Creative & Conversion",
    description:
      "A+ Content, Storefront design, product images, infographics, video, listing creative, and conversion-rate optimization.",
  },
  {
    id: "marketplace-expansion",
    icon: "globe",
    title: "Marketplace Expansion",
    navLabel: "Marketplace Expansion",
    description:
      "International Amazon expansion, new marketplace launches, localization, DTC integration, external traffic, and omnichannel growth.",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getOtherServices(id: string): Service[] {
  return services.filter((service) => service.id !== id);
}
