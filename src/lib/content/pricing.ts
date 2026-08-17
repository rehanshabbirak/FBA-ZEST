import type { IconName } from "@/components/ui/Icon";

export type PricingPlan = {
  id: string;
  name: string;
  /** Digits only; the currency symbol and period are rendered separately. */
  price: string;
  period: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
};

export type PricingAssurance = {
  icon: IconName;
  title: string;
  description: string;
};

/** Shown as a row of check marks under the hero copy. */
export const pricingGuarantees = [
  "No Long-Term Contracts",
  "Cancel Anytime",
  "30-Day Money-Back Guarantee",
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "amazon-advertisement",
    name: "Amazon Advertisement",
    price: "999",
    period: "Monthly",
    features: [
      "Amazon PPC management",
      "Listing images",
      "Amazon listing optimization",
      "Amazon Account Management",
    ],
    ctaLabel: "Buy Now",
    ctaHref: "/contact",
  },
  {
    id: "product-listing",
    name: "Product Listing",
    price: "2,999",
    period: "Monthly",
    features: [
      "Amazon listing optimization",
      "Amazon PPC management",
      "A+ Content / EBC Services",
      "Amazon Account Management",
      "Keyword Research",
      "AI product video",
      "Product launches",
    ],
    ctaLabel: "Buy Now",
    ctaHref: "/contact",
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "full-service",
    name: "Full Service",
    price: "1,999",
    period: "Monthly",
    features: [
      "Amazon listing optimization",
      "Amazon PPC management",
      "A+ Content / EBC Services",
      "Amazon Account Management",
      "Keyword Research",
    ],
    ctaLabel: "Buy Now",
    ctaHref: "/contact",
  },
];

export const pricingAssurances: PricingAssurance[] = [
  {
    icon: "target",
    title: "Data-Driven Strategies",
    description:
      "We use real data and insights to make smart decisions that drive growth.",
  },
  {
    icon: "shield-check",
    title: "Transparent Reporting",
    description:
      "Clear, easy-to-understand reports so you always know where you stand.",
  },
  {
    icon: "users",
    title: "Amazon Experts",
    description:
      "A dedicated team of Amazon specialists focused on your success.",
  },
  {
    icon: "chart-line",
    title: "Scalable Solutions",
    description:
      "From startups to 7-figure brands, our plans scale with your business.",
  },
];
