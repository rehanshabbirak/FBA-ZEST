import type { IconName } from "@/components/ui/Icon";

export type CaseStudyMetric = {
  icon?: IconName;
  glyph?: string;
  value: string;
  label: string;
  period: string;
};

export type CaseStudy = {
  slug: string;
  brand: string;
  category: string;
  image: string;
  summary: string;
  quote: string;
  author: string;
  metrics: CaseStudyMetric[];
  services: string[];
  markets: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hydrofuel",
    brand: "HydroFuel",
    category: "Sports & Outdoors",
    image: "/png/case_hydrofuel.png",
    summary:
      "We helped HydroFuel optimize their listings, run high-performing PPC campaigns, and improve their brand presence.",
    quote:
      "FBA Zest took our Amazon business to the next level. Incredible team!",
    author: "Mark D., Founder",
    metrics: [
      {
        glyph: "$",
        value: "215%",
        label: "Increase in Sales",
        period: "in 6 Months",
      },
      {
        icon: "cart",
        value: "187%",
        label: "Increase in Orders",
        period: "in 6 Months",
      },
      {
        glyph: "ACOS",
        value: "-32%",
        label: "ACOS Reduced",
        period: "in 6 Months",
      },
      {
        icon: "chart-bar",
        value: "3.2X",
        label: "ROAS Achieved",
        period: "in 6 Months",
      },
    ],
    services: [
      "Listing Optimization",
      "PPC Management",
      "Brand Building",
      "Content Creation",
    ],
    markets: "United States",
  },
  {
    slug: "luxe-naturals",
    brand: "Luxe Naturals",
    category: "Beauty & Personal Care",
    image: "/png/case_luxe_naturals.png",
    summary:
      "From zero to top seller – we built a full-funnel strategy that boosted visibility and sales across the board.",
    quote: "Our best decision was partnering with FBA Zest!",
    author: "Sarah L., CEO",
    metrics: [
      {
        glyph: "$",
        value: "340%",
        label: "Increase in Sales",
        period: "in 5 Months",
      },
      {
        icon: "cart",
        value: "290%",
        label: "Increase in Orders",
        period: "in 5 Months",
      },
      {
        glyph: "ACOS",
        value: "-28%",
        label: "ACOS Reduced",
        period: "in 5 Months",
      },
      {
        icon: "chart-bar",
        value: "4.1X",
        label: "ROAS Achieved",
        period: "in 5 Months",
      },
    ],
    services: [
      "Amazon Strategy",
      "PPC",
      "Influencer Outreach",
      "Content Creation",
      "SEO",
    ],
    markets: "United States",
  },
  {
    slug: "ortiz-gaming",
    brand: "Ortiz Gaming",
    category: "Electronics",
    image: "/png/case_ortiz_gaming.png",
    summary:
      "We scaled Ortiz Gaming with data-driven PPC, optimized listings, and a strong brand identity on Amazon.",
    quote: "They know Amazon inside out. Sales grew beyond our expectations!",
    author: "James O., Founder",
    metrics: [
      {
        glyph: "$",
        value: "168%",
        label: "Increase in Sales",
        period: "in 4 Months",
      },
      {
        icon: "cart",
        value: "152%",
        label: "Increase in Orders",
        period: "in 4 Months",
      },
      {
        glyph: "ACOS",
        value: "-21%",
        label: "ACOS Reduced",
        period: "in 4 Months",
      },
      {
        icon: "chart-bar",
        value: "2.8X",
        label: "ROAS Achieved",
        period: "in 4 Months",
      },
    ],
    services: [
      "PPC Management",
      "Listing Optimization",
      "Brand Store",
      "Content Creation",
    ],
    markets: "United States, Canada",
  },
];
