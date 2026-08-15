export type SeedAuthor = {
  name: string;
  avatar: string;
  role: string;
  bio: string;
  linkedin: string;
  email: string;
};

export type SeedBlock =
  | { type: "section"; title: string }
  | { type: "paragraph"; text: string }
  | { type: "callout"; tone: "tip" | "benefit"; title: string; text: string }
  | { type: "checklist"; items: string[] }
  | { type: "highlights"; title: string; items: { icon: string; label: string }[] };

export type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
  popularRank?: number;
  sectionNoun?: string;
  body: SeedBlock[];
};

export const seedCategories: { slug: string; title: string }[] = [
  { slug: "amazon-ppc", title: "Amazon PPC" },
  { slug: "seo", title: "SEO" },
  { slug: "product-launch", title: "Product Launch" },
  { slug: "branding", title: "Branding" },
  { slug: "ads", title: "Ads" },
  { slug: "growth", title: "Growth" },
];

export const seedAuthors: SeedAuthor[] = [
  {
    name: "James Carter",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&q=80&auto=format&fit=crop&crop=faces",
    role: "Amazon PPC Expert",
    bio: "James helps Amazon brands scale profitably through data-driven PPC strategies and disciplined bid management.",
    linkedin: "https://linkedin.com",
    email: "james@fbazest.com",
  },
  {
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80&auto=format&fit=crop&crop=faces",
    role: "Head of Advertising",
    bio: "Sarah has managed eight figures of Amazon ad spend and writes about the levers that actually move ACOS.",
    linkedin: "https://linkedin.com",
    email: "sarah@fbazest.com",
  },
  {
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80&auto=format&fit=crop&crop=faces",
    role: "Product Launch Strategist",
    bio: "Michael has taken more than 200 products from listing to category page one, and documents what repeats.",
    linkedin: "https://linkedin.com",
    email: "michael@fbazest.com",
  },
  {
    name: "Emily Davis",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&q=80&auto=format&fit=crop&crop=faces",
    role: "Amazon SEO Lead",
    bio: "Emily reverse-engineers Amazon search for a living and turns the findings into listings that rank and convert.",
    linkedin: "https://linkedin.com",
    email: "emily@fbazest.com",
  },
  {
    name: "David Wilson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&q=80&auto=format&fit=crop&crop=faces",
    role: "Brand Management Director",
    bio: "David works with brand owners on protection, positioning, and the operational shift from seller to brand.",
    linkedin: "https://linkedin.com",
    email: "david@fbazest.com",
  },
  {
    name: "Lisa Brown",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&q=80&auto=format&fit=crop&crop=faces",
    role: "Growth Consultant",
    bio: "Lisa advises seven- and eight-figure sellers on the organic and operational side of sustainable growth.",
    linkedin: "https://linkedin.com",
    email: "lisa@fbazest.com",
  },
];

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

const ppcBody: SeedBlock[] = [
  { type: "paragraph", text: "Amazon PPC can be a game changer for your brand — if done right. With the right strategies you can drive more traffic, boost conversions, and maximise your ad spend efficiency." },
  { type: "paragraph", text: "In this guide we share seven proven Amazon PPC strategies that actually work in 2024, in the order we apply them when we take over an account." },
  { type: "section", title: "Master Your Keyword Research" },
  { type: "paragraph", text: "Everything starts with the right keywords. Use Amazon’s search term report, tools like Helium 10 or DataDive, and competitor analysis to find high-converting keywords with the right balance of search volume and competition." },
  { type: "callout", tone: "tip", title: "Pro Tip", text: "Focus on long-tail keywords with high intent. They convert better and cost less." },
  { type: "section", title: "Optimize Your Campaign Structure" },
  { type: "paragraph", text: "A well-structured campaign gives you better control, cleaner insights, and more predictable performance." },
  { type: "checklist", items: ["Separate campaigns by match type (Exact, Phrase, Broad).", "Group similar products in their own campaigns.", "Use single keyword ad groups for tighter control."] },
  { type: "callout", tone: "benefit", title: "Key Benefit", text: "Better structure means better data, and better data means better optimisation." },
  { type: "section", title: "Improve Your Product Listings" },
  { type: "paragraph", text: "Your ads can bring traffic, but your listings need to convert. Make sure your titles, images, bullet points, and A+ Content are optimised for both shoppers and Amazon’s algorithm." },
  { type: "highlights", title: "Focus On", items: [
    { icon: "tag", label: "Keyword-rich titles" },
    { icon: "image", label: "High-quality images" },
    { icon: "document", label: "Strong bullet points" },
    { icon: "star", label: "A+ Content & Brand Story" },
  ] },
  { type: "section", title: "Leverage Negative Keywords" },
  { type: "paragraph", text: "Negative keywords are the cheapest win in most ad accounts. Every irrelevant search term you exclude is budget moved back to terms that convert, and the effect compounds week over week." },
  { type: "checklist", items: ["Review search term reports weekly, not monthly.", "Exclude terms with clicks but no orders after a fair sample.", "Add competitor brand names as negatives unless you are targeting them deliberately."] },
  { type: "section", title: "Optimize Bids with Data" },
  { type: "paragraph", text: "Bid on the value of a click rather than the position it buys. Work back from your target ACOS and conversion rate to a break-even bid, then adjust in small increments so you can attribute the change." },
  { type: "callout", tone: "tip", title: "Pro Tip", text: "Change one variable per week. Bids, placements, and budgets moved together tell you nothing about which one worked." },
  { type: "section", title: "Use Auto Campaigns Strategically" },
  { type: "paragraph", text: "Auto campaigns are a research tool, not a growth engine. Run them on a modest budget to harvest search terms, then graduate the winners into exact-match campaigns where you control the bid." },
  { type: "callout", tone: "benefit", title: "Key Benefit", text: "A steady harvesting loop keeps your exact-match campaigns fed without manual keyword hunting." },
  { type: "section", title: "Track, Analyze & Scale" },
  { type: "paragraph", text: "Scaling is a decision you earn with data. Track ACOS, ROAS, conversion rate, and total advertising cost of sales together, and only raise budgets on campaigns that hold their efficiency at the higher spend." },
  { type: "highlights", title: "Track Weekly", items: [
    { icon: "chart-line", label: "ACOS & ROAS trend" },
    { icon: "target", label: "Conversion rate" },
    { icon: "cart", label: "Organic vs ad sales" },
    { icon: "pie-chart", label: "Share of total spend" },
  ] },
];

const scalingBody: SeedBlock[] = [
  { type: "paragraph", text: "Scaling an Amazon brand is rarely about doing more of what already works. It is about removing the constraint that caps the next stage of growth — and that constraint moves as you grow." },
  { type: "paragraph", text: "This guide walks through the sequence we use with brands moving from seven to eight figures, and what to fix at each stage." },
  { type: "section", title: "Find the Constraint Before You Spend" },
  { type: "paragraph", text: "Adding ad spend to a listing that does not convert is expensive learning. Audit traffic, conversion, and inventory in that order, and fix whichever one is furthest below category benchmark first." },
  { type: "callout", tone: "tip", title: "Pro Tip", text: "If your conversion rate is below category average, the problem is on the listing, not in the ad account." },
  { type: "section", title: "Build a Catalogue, Not a Hero Product" },
  { type: "paragraph", text: "Single-product brands are fragile. Variations, bundles, and adjacent SKUs raise average order value and give you somewhere to send traffic when one ASIN stalls." },
  { type: "checklist", items: ["Launch variations before you launch new categories.", "Bundle slow movers with proven sellers.", "Keep one clear hero ASIN per category for ad efficiency."] },
  { type: "section", title: "Make Inventory a Growth Lever" },
  { type: "paragraph", text: "Stockouts reset rank and waste the ad spend that built it. Forecast on trailing velocity plus planned promotions, and hold safety stock ahead of every campaign push." },
  { type: "callout", tone: "benefit", title: "Key Benefit", text: "Brands that never stock out compound rank. Brands that do pay to rebuild it every quarter." },
  { type: "section", title: "Layer Full-Funnel Advertising" },
  { type: "paragraph", text: "Sponsored Products captures demand that already exists. Sponsored Brands and DSP create it. Once your bottom-funnel campaigns are efficient, moving budget upward is what raises the ceiling." },
  { type: "section", title: "Protect the Brand You Are Building" },
  { type: "paragraph", text: "Brand Registry, transparency programs, and a monitored storefront stop hijackers from taxing your growth. Protection is cheap relative to what an unauthorised seller costs you in reviews and buy-box share." },
  { type: "highlights", title: "Put in Place", items: [
    { icon: "shield-check", label: "Brand Registry" },
    { icon: "search", label: "Listing monitoring" },
    { icon: "star", label: "Review response process" },
    { icon: "globe", label: "Storefront & A+ Content" },
  ] },
  { type: "section", title: "Expand Deliberately" },
  { type: "paragraph", text: "New marketplaces multiply operational complexity. Expand once your home market runs without daily intervention, and take one marketplace at a time." },
  { type: "section", title: "Measure What Predicts Growth" },
  { type: "paragraph", text: "Revenue is a lagging indicator. Session share, conversion rate, review velocity, and contribution margin all move first, and watching them buys you a quarter of warning." },
];

const launchBody: SeedBlock[] = [
  { type: "paragraph", text: "Most Amazon launches fail quietly. The listing goes live, gets a small burst of traffic, and settles into a rank it never escapes." },
  { type: "paragraph", text: "A launch that sells is planned backwards from the rank you need, and the work starts weeks before the listing is live." },
  { type: "section", title: "Validate Demand Before You Order Stock" },
  { type: "paragraph", text: "Check search volume, review counts, and price spread across the top ten results. A category where the leaders hold thousands of reviews and thin margins is a category to skip." },
  { type: "callout", tone: "tip", title: "Pro Tip", text: "If the top listings all have under 200 reviews, the category is still winnable with a good launch." },
  { type: "section", title: "Do Your Keyword Research First" },
  { type: "paragraph", text: "The keywords you find before listing determine the ceiling you can reach. Build a ranked target list and write the listing against it, rather than retrofitting keywords later." },
  { type: "section", title: "Build a Listing That Converts Cold Traffic" },
  { type: "paragraph", text: "Launch traffic is expensive, so conversion matters more in week one than at any other point. Every image, bullet, and A+ module should answer an objection." },
  { type: "checklist", items: ["Lead with the benefit, not the specification.", "Show the product in use in at least two images.", "Answer the top three review complaints in your category."] },
  { type: "section", title: "Price for Rank, Then for Margin" },
  { type: "paragraph", text: "Launch pricing sets your velocity, and velocity sets your rank trajectory. Plan a deliberate ramp back to target margin rather than launching at the price you eventually want." },
  { type: "callout", tone: "benefit", title: "Key Benefit", text: "Rank earned in the first 30 days is far cheaper than rank bought back in month six." },
  { type: "section", title: "Seed Reviews Without Risking the Account" },
  { type: "paragraph", text: "Vine and the Request a Review button are the compliant options. Time Vine enrolment so units land while your launch ads are running, not after they stop." },
  { type: "section", title: "Run Launch PPC With a Clear Job" },
  { type: "paragraph", text: "Launch campaigns buy data and rank, not profit. Accept a high ACOS for a defined window, then reset targets once organic rank holds." },
  { type: "highlights", title: "Launch Week Checklist", items: [
    { icon: "box", label: "Inventory landed" },
    { icon: "document", label: "Listing complete" },
    { icon: "megaphone", label: "Campaigns live" },
    { icon: "chart-bar", label: "Tracking in place" },
  ] },
];

const seoBody: SeedBlock[] = [
  { type: "paragraph", text: "Amazon search rewards listings that sell. Relevance gets you into the results; performance decides where in them you land." },
  { type: "paragraph", text: "These are the changes that consistently move rank across the accounts we manage." },
  { type: "section", title: "Understand What A9 Actually Weighs" },
  { type: "paragraph", text: "Relevance, conversion history, and sales velocity carry most of the weight. Everything else — content quality, fulfilment method, review score — feeds one of those three." },
  { type: "section", title: "Write Titles That Rank and Read Well" },
  { type: "paragraph", text: "A stuffed title ranks and then fails to convert, which costs you the rank again. Lead with the primary keyword phrase in natural language, then qualify." },
  { type: "callout", tone: "tip", title: "Pro Tip", text: "Read your title aloud. If it does not survive that, it will not survive a shopper’s two-second scan either." },
  { type: "section", title: "Use Backend Search Terms Correctly" },
  { type: "paragraph", text: "Backend fields are indexed once, without repetition and without punctuation. Duplicating front-end keywords there wastes the character budget." },
  { type: "checklist", items: ["No repeated words across fields.", "No commas, and no brand names you do not own.", "Include common misspellings and Spanish-language variants."] },
  { type: "section", title: "Treat Images as a Ranking Signal" },
  { type: "paragraph", text: "Images do not carry keywords, but they carry conversion — and conversion is what the algorithm reads. A stronger image stack raises rank indirectly and reliably." },
  { type: "section", title: "Ship A+ Content and Measure It" },
  { type: "paragraph", text: "A+ Content lifts conversion on most listings, but the size of the lift varies widely. Roll it out in batches and compare against a held-back control set." },
  { type: "callout", tone: "benefit", title: "Key Benefit", text: "A measured rollout tells you which modules earn their production cost, instead of assuming they all do." },
  { type: "section", title: "Audit Competitors Quarterly" },
  { type: "paragraph", text: "Categories drift. A quarterly pass over the top five competing listings surfaces the keywords, price points, and claims that have started working." },
  { type: "highlights", title: "Audit Each Quarter", items: [
    { icon: "tag", label: "Title & keyword set" },
    { icon: "image", label: "Image stack" },
    { icon: "star", label: "Review themes" },
    { icon: "chart-line", label: "Price movement" },
  ] },
];

const registryBody: SeedBlock[] = [
  { type: "paragraph", text: "Brand Registry is free, takes an afternoon, and unlocks most of the tools that separate a brand from a seller on Amazon. Very few brand owners use all of it." },
  { type: "section", title: "Take Control of Your Listings" },
  { type: "paragraph", text: "Registry gives your edits authority over third-party contributions, so the title and bullets you publish are the ones shoppers actually see." },
  { type: "section", title: "Remove Hijackers Faster" },
  { type: "paragraph", text: "Report a Violation turns a weeks-long support conversation into a form. Combined with Transparency codes, it makes your listings expensive to counterfeit." },
  { type: "callout", tone: "tip", title: "Pro Tip", text: "Test-buy from any unauthorised seller before reporting. A documented order is what makes the claim stick." },
  { type: "section", title: "Unlock A+ Content and Brand Story" },
  { type: "paragraph", text: "A+ Content and Brand Story modules are Registry-gated, and both measurably lift conversion on listings that previously relied on bullets alone." },
  { type: "checklist", items: ["Add comparison charts to reduce cross-shopping.", "Use Brand Story to route traffic across your catalogue.", "Keep modules consistent so the brand reads as one brand."] },
  { type: "section", title: "Open Up Brand Analytics" },
  { type: "paragraph", text: "Search Query Performance and the Search Terms report show what shoppers type before buying in your category — data you cannot get anywhere else." },
  { type: "callout", tone: "benefit", title: "Key Benefit", text: "Brand Analytics turns keyword research from an estimate into a measurement." },
  { type: "section", title: "Advertise With the Full Toolkit" },
  { type: "paragraph", text: "Sponsored Brands, Sponsored Display, and Stores all require Registry. Without it you are limited to the least differentiated ad type on the platform." },
  { type: "highlights", title: "Registry Unlocks", items: [
    { icon: "shield-check", label: "Listing protection" },
    { icon: "document", label: "A+ Content" },
    { icon: "pie-chart", label: "Brand Analytics" },
    { icon: "megaphone", label: "Sponsored Brands" },
  ] },
];

export const seedPosts: SeedPost[] = [
  { slug: "the-complete-guide-to-scaling-your-amazon-brand-in-2024", title: "The Complete Guide to Scaling Your Amazon Brand in 2024", excerpt: "Discover proven strategies to scale your Amazon business, increase profitability, and dominate your niche in 2024 and beyond.", category: "growth", coverImage: IMG("photo-1553729459-efe14ef6055d"), author: "James Carter", publishedAt: "2024-05-20", featured: true, sectionNoun: "Steps", body: scalingBody },
  { slug: "7-amazon-ppc-strategies-that-actually-work-in-2024", title: "7 Amazon PPC Strategies That Actually Work in 2024", excerpt: "Boost your ROAS and reduce ACOS with these proven Amazon PPC strategies.", category: "amazon-ppc", coverImage: IMG("photo-1460925895917-afdab827c52f"), author: "Sarah Johnson", publishedAt: "2024-05-18", popularRank: 1, sectionNoun: "Strategies", body: ppcBody },
  { slug: "how-to-launch-a-product-that-sells-on-amazon", title: "How to Launch a Product That Sells on Amazon", excerpt: "A step-by-step framework for launching Amazon products that generate sales.", category: "product-launch", coverImage: IMG("photo-1522543558187-768b6df7c25c"), author: "Michael Chen", publishedAt: "2024-05-15", popularRank: 2, sectionNoun: "Steps", body: launchBody },
  { slug: "amazon-seo-rank-higher-sell-more-in-2024", title: "Amazon SEO: Rank Higher & Sell More in 2024", excerpt: "Optimize your listings and rank higher in Amazon search results with these tips.", category: "seo", coverImage: IMG("photo-1563013544-824ae1b704d3"), author: "Emily Davis", publishedAt: "2024-05-12", popularRank: 3, sectionNoun: "Tactics", body: seoBody },
  { slug: "brand-registry-benefits-you-can-t-ignore", title: "Brand Registry: Benefits You Can’t Ignore", excerpt: "Unlock powerful features and protect your brand with Amazon Brand Registry.", category: "branding", coverImage: IMG("photo-1499951360447-b19be8fe80f5"), author: "David Wilson", publishedAt: "2024-05-10", popularRank: 4, sectionNoun: "Benefits", body: registryBody },
];
