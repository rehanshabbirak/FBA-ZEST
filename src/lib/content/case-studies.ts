export type CaseStudyMetric = {
  value: string;
  label: string;
  tone?: "positive" | "negative" | "neutral";
};

export type CaseStudy = {
  id: string;
  slug: string;
  caseStudyNumber: number;
  title: string;
  cardTitle: string;
  cardDescription: string;
  industry: string;
  services: string[];
  metrics: CaseStudyMetric[];
  challenge: string;
  strategy: string[];
  results: string[];
  representativePeriod?: string;
  keyTakeaway: string;
  image: string;
  featured?: boolean;
};

/**
 * Amazon case studies.
 * Source: FBA Zest Amazon Growth Case Studies document.
 * Client names are intentionally withheld because the source says client names
 * have been withheld and recommends keeping brands anonymous without approval.
 *
 * Images live in /public/images/case-studies/.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "premium-wellness-85-growth",
    slug: "premium-wellness-brand-85-percent-growth",
    caseStudyNumber: 1,
    title: "Scaling a Premium Wellness Brand by 85% Year Over Year",
    cardTitle: "85% YoY Growth for a Premium Wellness Brand",
    cardDescription:
      "We rebuilt the Amazon advertising strategy around product-level opportunities, traffic quality, and inventory, helping a premium wellness brand achieve 85% year-over-year growth.",
    industry: "Health & Wellness",
    services: [
      "Amazon PPC Management",
      "Growth Strategy",
      "Keyword Expansion",
      "Launch Support",
      "Budget Allocation",
    ],
    metrics: [
      { value: "85%", label: "YoY Sales Growth", tone: "positive" },
      { value: "+10.55%", label: "Weekly Sales", tone: "positive" },
      { value: "-12.82%", label: "TACOS", tone: "positive" },
      { value: "-3.59%", label: "PPC Spend", tone: "positive" },
    ],
    challenge:
      "A premium wellness brand competing across crowded categories such as matcha, bone broth, magnesium, and immune-support supplements needed to expand visibility and scale without sacrificing advertising efficiency.",
    strategy: [
      "Built a product-level advertising plan instead of treating the entire catalog as one blended account.",
      "Expanded Sponsored Products and Sponsored Brands Video coverage for the matcha line.",
      "Built campaigns around high-intent search terms and adjusted bids based on conversion performance.",
      "Separated branded and non-branded traffic for tighter budget control.",
      "Shifted spend toward products with stronger conversion and inventory coverage.",
      "Used search-term and N-gram analysis to remove irrelevant traffic.",
      "Increased budgets for proven campaigns and paused targets that failed to convert.",
      "Coordinated campaign launches with stock availability and category demand.",
      "Monitored TACOS alongside ACOS to align advertising with total revenue growth.",
    ],
    results: [
      "85% year-over-year sales growth.",
      "10.55% increase in total sales during a representative seven-day optimization period.",
      "8.61% increase in orders.",
      "12.82% reduction in TACOS.",
      "3.59% decrease in PPC spend.",
    ],
    representativePeriod: "Representative seven-day optimization period",
    keyTakeaway:
      "For multi-product wellness brands, profitable growth comes from treating every product differently. Product-level keyword expansion, disciplined budget allocation, and inventory-aware execution helped the brand scale while keeping advertising aligned with total business performance.",
    image: "/images/case-studies/premium-wellness-growth.png",
    featured: true,
  },
  {
    id: "specialty-food-5k-sales-day",
    slug: "specialty-food-brand-5000-sales-day",
    caseStudyNumber: 2,
    title: "Helping a Specialty Food Brand Break the $5,000-Per-Day Barrier",
    cardTitle: "From Steady Growth to a $5K Sales Day",
    cardDescription:
      "A hero-product strategy, inventory-aware budget allocation, and targeted catalog expansion helped a specialty food brand grow 15% YTD and reach its first $5,000 Amazon sales day.",
    industry: "Grocery & Specialty Foods",
    services: [
      "Amazon PPC Management",
      "Organic Ranking Support",
      "Catalog Expansion",
      "Pack-Size Strategy",
      "Search-Term Optimization",
    ],
    metrics: [
      { value: "15%", label: "YTD Growth", tone: "positive" },
      { value: "$5K", label: "First Sales Day", tone: "positive" },
      { value: "+21.53%", label: "Weekly Orders", tone: "positive" },
      { value: "-13.56%", label: "TACOS", tone: "positive" },
    ],
    challenge:
      "A specialty food brand with a broad catalog of pantry staples and alternative flours needed stronger organic visibility for its hero products while managing different pack-size inventory constraints and protecting advertising efficiency.",
    strategy: [
      "Built the account around a hero-product and portfolio-expansion model.",
      "Prioritized the baking soda line for ranking and revenue growth.",
      "Adjusted budgets and bids by pack size, stock availability, search-term performance, and organic opportunity.",
      "Increased ranking-focused coverage for the highest-potential products.",
      "Redirected spend between pack sizes when inventory availability changed.",
      "Launched campaigns around high-intent terms such as natural sodium bicarbonate.",
      "Expanded phrase-match and product-targeting coverage for emerging products.",
      "Reintroduced proven campaigns when products returned to stock.",
      "Paused non-converting targets and added negative keywords to reduce wasted spend.",
      "Increased budgets selectively for campaigns that repeatedly ran out of budget while remaining efficient.",
    ],
    results: [
      "15% year-to-date growth after the engagement began.",
      "First $5,000 sales day on Amazon.",
      "17.39% increase in total sales during a representative seven-day period.",
      "21.53% increase in orders.",
      "13.56% reduction in TACOS.",
      "8.30% increase in PPC sales.",
      "PPC spend increased by only 1.46%.",
    ],
    representativePeriod: "Representative seven-day performance period",
    keyTakeaway:
      "A broad catalog does not need a broad, unfocused advertising strategy. A hero-product strategy created momentum while selective portfolio expansion improved overall ad efficiency.",
    image: "/images/case-studies/specialty-food-growth.png",
  },
  {
    id: "automotive-41-growth-returns",
    slug: "automotive-brand-41-percent-growth",
    caseStudyNumber: 3,
    title:
      "Growing an Automotive Brand by 41% While Cutting Returns From 20% to 5%",
    cardTitle: "41% Growth With a 75% Reduction in Returns",
    cardDescription:
      "By connecting PPC, listing improvements, and catalog strategy, the automotive brand grew sales by 41% YoY while reducing its return rate from 20% to 5%.",
    industry: "Automotive Accessories & Equipment",
    services: [
      "Amazon PPC Management",
      "Listing Strategy",
      "Catalog Management",
      "Conversion Optimization",
      "Return-Rate Improvement",
    ],
    metrics: [
      { value: "41%", label: "YoY Sales Growth", tone: "positive" },
      { value: "20% → 5%", label: "Return Rate", tone: "positive" },
      { value: "-75%", label: "Relative Returns", tone: "positive" },
      { value: "-33.37%", label: "ACOS", tone: "positive" },
    ],
    challenge:
      "An automotive brand selling products such as brake bleeders, jack rods, manual jacks, and scissor jacks was facing growth limitations from an elevated return rate while its advertising also needed to become more efficient.",
    strategy: [
      "Refreshed key listings to improve product-page clarity and customer expectations.",
      "Improved variation positioning and aligned ad traffic with relevant in-stock products.",
      "Connected advertising decisions with catalog and listing improvements.",
      "Launched dedicated Sponsored Products campaigns for manual and scissor jack searches.",
      "Tested search terms and product targets before scaling them.",
      "Added relevant in-stock variations to established campaigns.",
      "Increased bids and budgets for proven performers.",
      "Reduced bids on low-converting traffic and removed irrelevant searches.",
      "Reintroduced historically successful campaigns when products returned to FBA inventory.",
      "Refreshed priority listings to improve conversion and reduce purchase confusion.",
    ],
    results: [
      "41% year-over-year sales growth.",
      "Return rate reduced from 20% to 5%.",
      "75% relative decrease in returns.",
      "12.21% increase in total sales during a representative seven-day period.",
      "54.74% increase in PPC sales.",
      "33.37% reduction in ACOS.",
      "8.18% reduction in TACOS.",
    ],
    representativePeriod: "Representative seven-day performance period",
    keyTakeaway:
      "Advertising cannot solve a conversion or return problem by itself. Connecting PPC with listing clarity, variation strategy, and inventory created healthier growth from the first click through the final customer experience.",
    image: "/images/case-studies/automotive-growth.png",
  },
  {
    id: "home-safety-restocking",
    slug: "home-safety-restocking-67-percent-growth",
    caseStudyNumber: 4,
    title: "Rebuilding Momentum After an Inventory Disruption",
    cardTitle: "67% Sales Growth After Restocking",
    cardDescription:
      "Inventory-aware campaign reactivation helped a home-safety brand increase weekly sales by 67%, grow PPC sales by 74%, and reduce TACOS by 34%.",
    industry: "Home Safety & Water Detection",
    services: [
      "Amazon PPC Management",
      "Inventory-Aware Growth Strategy",
      "Campaign Reactivation",
      "Conversion Optimization",
    ],
    metrics: [
      { value: "+67.33%", label: "Weekly Sales", tone: "positive" },
      { value: "+73.54%", label: "PPC Sales", tone: "positive" },
      { value: "-36.08%", label: "ACOS", tone: "positive" },
      { value: "-33.70%", label: "TACOS", tone: "positive" },
    ],
    challenge:
      "A home-safety brand selling sump-pump controls and water-detection products experienced inventory constraints across key ASINs. Campaigns had to be reduced or paused while stock was limited, creating a risk of lost momentum and inefficient spending when inventory returned.",
    strategy: [
      "Restarted ads only after relevant products were available for sale.",
      "Reactivated historically successful campaigns to preserve existing performance data.",
      "Kept initial budgets conservative while inventory remained limited.",
      "Increased budgets only after campaigns demonstrated efficient conversion.",
      "Paused non-performing targets and removed irrelevant search terms.",
      "Adjusted bids based on product-level conversion and inventory coverage.",
      "Monitored PPC conversion rate and total TACOS throughout the recovery.",
    ],
    results: [
      "67.33% increase in total sales during a representative seven-day period following campaign reactivation.",
      "18.97% increase in orders.",
      "73.54% increase in PPC sales.",
      "36.08% reduction in ACOS.",
      "33.70% reduction in TACOS.",
      "21.35% increase in PPC conversion rate.",
      "PPC spend rose by only 10.92% while PPC-attributed sales increased by more than 73%.",
    ],
    representativePeriod:
      "Representative seven-day period following campaign reactivation",
    keyTakeaway:
      "Returning to stock does not mean every campaign should immediately return to full spend. A phased, data-led reactivation helped the brand recover sales quickly, improve conversion, and protect limited inventory.",
    image: "/images/case-studies/home-safety-growth.png",
  },
];

export const caseStudyCategories = [
  "All",
  "Health & Wellness",
  "Grocery & Specialty Foods",
  "Automotive",
  "Home Safety",
];

export const caseStudyStats = [
  { value: "85%", label: "YoY Growth" },
  { value: "$5K", label: "Sales Day" },
  { value: "-75%", label: "Relative Returns" },
  { value: "+67%", label: "Weekly Sales" },
];
