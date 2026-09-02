import type { IconName } from "@/components/ui/Icon";

/** One stage of "How the engagement runs". `timing` is optional because the
 *  research-led services run in sequence rather than against a calendar. */
export type ServiceStep = {
  title: string;
  timing?: string;
  body: string;
};

/** The proof panel. `href` links out to the case studies page the figure comes
 *  from; services with no published study omit it. */
export type ServiceProof = {
  value: string;
  label: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  eyebrow: string;
  /** The H1 on the detail page. `title` stays the catalog name used by the nav,
   *  breadcrumb, cards and metadata. */
  headline: string;
  lede: string;
  intro: string;
  inclusionsTitle: string;
  inclusions: string[];
  steps: ServiceStep[];
  builtFor: string[];
  proof: ServiceProof;
  faqs: ServiceFaq[];
  cta: { title: string; body: string; label: string };
  /** Service ids surfaced first in the "other services" grid. */
  related: string[];
  seo: { title: string; description: string; keywords: string[] };
};

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  navLabel: string;
  description: string;
  detail: ServiceDetail;
};

export const services: Service[] = [
  {
    id: "ppc-management",
    icon: "megaphone",
    title: "Amazon PPC Management",
    navLabel: "PPC Management",
    description:
      "End-to-end advertising management across Sponsored Products, Sponsored Brands, Sponsored Display, AMC, campaign structure and optimization.",
    detail: {
      eyebrow: "Amazon Advertising",
      headline: "PPC Managed Against Your Margin, Not a Benchmark",
      lede: "Sponsored Products, Sponsored Brands, Display and DSP — restructured, bid and reported against contribution margin rather than an ACOS target someone pulled off a blog.",
      intro:
        "Most accounts we take over distribute budget by campaign history rather than by what converts this month. Search terms that have never produced a sale keep drawing spend, while the handful of keywords genuinely carrying the account sit capped at a fraction of their available impression share. Closing that gap is week one, and it is usually where the fastest money is.",
      inclusionsTitle: "What's Included",
      inclusions: [
        "A full account restructure by match type, search intent and product line, so every dollar in the account has a job you can name out loud.",
        "Weekly search term mining with negatives applied at the correct entity level — negative exact for text terms, negative product targeting for ASINs, scoped by campaign type so you never block your own converters.",
        "Impression share analysis that surfaces keywords already converting profitably on a starved budget. In a typical takeover this finds more incremental revenue than any new campaign we could build.",
        "Break-even ACOS calculated from your landed cost, referral fee, FBA fee and return rate, then approved by you before a single bid moves.",
        "Branded and non-branded spend separated in every report, because a low blended ACOS propped up by your own brand name is defense spending filed under growth.",
        "Monthly reporting reconciled to your Sellerboard month-end totals, so the ad numbers tie to the P&L you actually run the business on.",
      ],
      steps: [
        {
          title: "Audit",
          timing: "Week one",
          body: "Sixty to ninety days of search term, impression share and business report data, graded in writing. The audit is yours to keep whatever you decide next.",
        },
        {
          title: "Restructure",
          timing: "Weeks two to four",
          body: "Negatives go in, campaigns get rebuilt, budget moves toward proven converters, and break-even targets are set per product line.",
        },
        {
          title: "Scale",
          timing: "Month two onward",
          body: "Non-branded discovery, competitor conquest and Sponsored Brands Video, with Display and DSP layered in as the funnel earns them.",
        },
        {
          title: "Report",
          timing: "Ongoing",
          body: "Written weekly updates, a reconciled monthly report, and a quarterly session where targets get revisited against your margin.",
        },
      ],
      builtFor: [
        "DTC and omni-channel brands spending six figures a month on Meta that need Amazon to stop cannibalizing and start compounding.",
        "Established FBA sellers with a mature catalog, a flat top line and an account nobody has restructured since launch.",
      ],
      proof: {
        value: ">$5,000",
        label: "Daily sales milestone",
        body: "A multi-SKU pantry brand crossed $5,000 in daily sales after budgets were rebuilt around per-SKU economics instead of one blended account target.",
        href: "/case-studies",
        linkLabel: "Read the specialty food case study",
      },
      faqs: [
        {
          question: "What ACOS should we be targeting?",
          answer:
            "Whatever clears your contribution margin, which means we cannot answer honestly until we have your landed cost, fees and return rate. Forty-five percent is excellent on a subscription product with an eight-month payback and ruinous on a one-time purchase at thirty points of margin. We build the break-even model first and set targets against it.",
        },
        {
          question: "Do you rebuild from scratch or keep our campaigns?",
          answer:
            "Usually a hybrid. Campaigns with real conversion history and clean structure are an asset worth keeping. Anything duplicated across match types or running on stale bids gets rebuilt, and the audit decides which is which.",
        },
        {
          question: "How quickly does anything move?",
          answer:
            "Waste reduction shows inside two to three weeks because negatives take effect immediately. Structural gains — impression share on your converters, a healthier non-branded mix — read clearly in the P&L at sixty to ninety days.",
        },
      ],
      cta: {
        title: "Start with the audit, not the contract",
        body: "Send us sixty days of your Sponsored Products search term impression share report. We will grade the account, quantify wasted spend in dollars per year, and hand back a ready-to-upload negative keyword file. No retainer required to receive it.",
        label: "Get my free wasted ad spend audit",
      },
      related: ["analytics-strategy", "brand-management", "creative-conversion"],
      seo: {
        title: "Amazon PPC Management Agency",
        description:
          "Sponsored Products, Brands, Display and DSP managed against contribution margin. Waste cut, structure rebuilt, reporting tied to your real P&L.",
        keywords: [
          "amazon ppc management",
          "amazon ppc agency",
          "sponsored products management",
          "amazon dsp agency",
          "amazon advertising agency",
        ],
      },
    },
  },
  {
    id: "brand-management",
    icon: "briefcase",
    title: "Amazon Brand Management",
    navLabel: "Brand Management",
    description:
      "Complete day-to-day management covering account operations, catalog, inventory, pricing, promotions, brand protection, and overall growth strategy.",
    detail: {
      eyebrow: "Full-Service Management",
      headline: "One Team Accountable for the Whole Channel",
      lede: "Catalog, inventory, advertising, compliance, promotions and reporting run by a dedicated pod — so Amazon stops generating surprises on a Friday afternoon.",
      intro:
        "Amazon punishes fragmentation. A suppression nobody catches for four days undoes six weeks of ranking work, and no amount of bid tuning compensates for a hero SKU that stocked out because the replenishment forecast lived in somebody's inbox. Every account here gets a pod: a brand manager who owns the relationship and the number, a PPC manager on advertising, a catalog manager on Seller Central operations. Named humans, not a shared support queue.",
      inclusionsTitle: "What the Pod Owns",
      inclusions: [
        "Seller Central operations end to end — listing creation and edits, variation family structure, flat file uploads, bulk changes and secondary locale content.",
        "Compliance and case management, covering suppressions, error 99300, restricted-claim takedowns, plan of action drafting and escalation through SAS where you have it.",
        "Inventory and FBA logistics, from tiered replenishment forecasting and shipment creation through pallet configuration and IPI monitoring before storage fees enter the conversation.",
        "The complete advertising program described on our PPC page, run inside the same pod rather than handed to a separate vendor with a separate agenda.",
        "A promotional calendar modeled for margin before launch: coupons, Subscribe & Save, Brand Tailored Promotions, Prime Day and Q4.",
        "Brand protection alongside it — Brand Registry enforcement, unauthorized seller monitoring, buy box defense and hijacker removal.",
      ],
      steps: [
        {
          title: "Onboard",
          timing: "First 30 days",
          body: "Full account and catalog audit, tooling access, a unit economics model built from your real costs, and a prioritized 90-day plan you sign off on.",
        },
        {
          title: "Stabilize",
          timing: "Days 30 to 60",
          body: "Compliance issues cleared, inventory forecast built, advertising restructured, reporting cadence live.",
        },
        {
          title: "Grow",
          timing: "Day 60 onward",
          body: "Launch and expansion work begins from a clean base: new ASINs, new keyword territory, new placements.",
        },
        {
          title: "Review",
          timing: "Quarterly",
          body: "Targets revisited against your margin, roadmap reset, and an honest read on what did not work.",
        },
      ],
      builtFor: [
        "Brands doing meaningful Amazon revenue with nobody internally who owns it end to end.",
        "Teams where Amazon still sits with a founder, a marketing generalist or a freelancer, and the complexity has outgrown that arrangement.",
      ],
      proof: {
        value: "+85%",
        label: "Year-over-year growth",
        body: "A premium wellness portfolio grew 85% year over year once catalog, offer, Buy Box and advertising decisions were made against the same priorities.",
        href: "/case-studies",
        linkLabel: "Read the premium wellness case study",
      },
      faqs: [
        {
          question: "Do we still need someone internal on Amazon?",
          answer:
            "Most clients keep one internal point of contact for approvals and brand decisions. The operational load — cases, flat files, shipments, bid management — moves to us.",
        },
        {
          question: "Who actually does the work?",
          answer:
            "Your pod, by name. They join your calls and sit in a shared channel with your team. We are deliberately not built around a ticket queue.",
        },
        {
          question: "Can you work with our existing 3PL and freight partners?",
          answer:
            "Yes. We plan shipments and pallet configurations to your partners' constraints rather than asking you to change vendors.",
        },
      ],
      cta: {
        title: "See the channel through our eyes first",
        body: "Before any conversation about retainers we run a full account and catalog review and walk you through what we found. If the honest answer is that you do not need an agency yet, we will say so.",
        label: "Book a channel review",
      },
      related: ["ppc-management", "analytics-strategy", "marketplace-expansion"],
      seo: {
        title: "Full-Service Amazon Brand Management",
        description:
          "A dedicated pod running your whole Amazon channel: catalog, inventory, advertising, cases, promotions and reporting. One team, one owner, one P&L.",
        keywords: [
          "amazon brand management",
          "full service amazon agency",
          "amazon account management",
          "seller central management",
          "amazon channel management",
        ],
      },
    },
  },
  {
    id: "seo-listing-optimization",
    icon: "search",
    title: "Amazon SEO & Listing Optimization",
    navLabel: "SEO & Listing Optimization",
    description:
      "Keyword research, listing SEO, titles, bullets, backend terms, A+ Content, Storefronts, conversion optimization, and organic ranking.",
    detail: {
      eyebrow: "Search & Conversion",
      headline: "Listings Built to Be Found, Then Built to Sell",
      lede: "Keyword architecture, 75-character title rewrites, A+ Content and backend indexation — engineered for how Amazon actually ranks today, including the AI layer sitting on top of it.",
      intro:
        "Amazon's 75-character title limit took effect in July 2026, and a large share of the catalog on the platform still carries titles written for a 200-character world. Truncation is the visible symptom. Underneath it, ranking now runs through three overlapping systems: the classic A10 relevance and velocity model, the COSMO layer inferring shopper intent, and the AI assistants that summarize a category before a results page ever loads.",
      inclusionsTitle: "What's Included",
      inclusions: [
        "Keyword research from Helium 10 Cerebro, DataDive and Search Query Performance, mapped so every high-value term has a home in the title, bullets, backend or A+ copy.",
        "Title rewrites inside 75 characters that protect ranking on the terms driving revenue rather than the ones with the biggest search volume.",
        "Bullets and Item Highlights rewritten to lead with whatever objection your reviews say is blocking the purchase.",
        "Backend search terms, subject matter and attribute completion — the unglamorous fields that quietly decide whether you index at all.",
        "Post-publish indexation auditing, verifying that the terms you paid to rank for are genuinely indexed rather than assumed to be.",
        "Variation family review plus bulk flat-file execution for large catalogs, including secondary locale copy written to be compliant in the target language rather than translated from compliant English.",
      ],
      steps: [
        {
          title: "Research",
          body: "Cerebro and DataDive pulls, branded and non-branded SQP analysis, competitor reverse-engineering, and a ranked keyword universe with revenue potential attached.",
        },
        {
          title: "Architecture",
          body: "Every term gets a placement and a documented reason, so the logic survives staff turnover on both sides.",
        },
        {
          title: "Rewrite",
          body: "Copy comes to you for approval. Nothing changes on a live listing without sign-off.",
        },
        {
          title: "Verify",
          body: "Changes publish in a controlled sequence, then we audit indexation and track rank movement across the following thirty days.",
        },
      ],
      builtFor: [
        "Catalogs carrying pre-2026 titles that now truncate in search results.",
        "Brands with strong products and weak conversion, where traffic arrives and leaves.",
        "Sellers whose listings have never been rebuilt around a deliberate keyword architecture.",
      ],
      proof: {
        value: "20% → 5%",
        label: "Return rate",
        body: "Rebuilding detail page content around fit and use cut an automotive brand's return rate from 20% to 5% while sales grew 41% year over year.",
        href: "/case-studies",
        linkLabel: "Read the automotive case study",
      },
      faqs: [
        {
          question: "Will rewriting our titles hurt our ranking?",
          answer:
            "It can, done carelessly. The risk is cutting a term that carries real ranking weight because it looked expendable at 75 characters. We identify the load-bearing terms from search term and SQP revenue data, then sequence changes so any movement is attributable rather than a mystery.",
        },
        {
          question: "How long until rank moves?",
          answer:
            "Indexation lands within days. Rank movement becomes readable across three to six weeks, and it accelerates when advertising is pushing velocity on the same terms — which is why we prefer to run SEO and PPC together.",
        },
        {
          question: "Do you write the copy or do we?",
          answer:
            "We write it, you approve it. Brands with a strong internal voice often revise our draft, which is fine; the keyword architecture is the part that has to survive editing.",
        },
      ],
      cta: {
        title: "Find out what your titles are costing you",
        body: "Send us your catalog export. We will show you which listings truncate, which high-revenue terms you are at risk of losing, and where indexation gaps are already suppressing traffic.",
        label: "Request a listing audit",
      },
      related: [
        "creative-conversion",
        "ppc-management",
        "product-launch-growth",
      ],
      seo: {
        title: "Amazon SEO & Listing Optimization",
        description:
          "Keyword architecture, title rewrites for the 75-character limit, A+ content and backend indexation — built for A10, COSMO and AI shopping assistants.",
        keywords: [
          "amazon seo",
          "amazon listing optimization",
          "amazon title optimization",
          "75 character title limit",
          "amazon a+ content",
          "amazon keyword research",
        ],
      },
    },
  },
  {
    id: "analytics-strategy",
    icon: "chart-bar",
    title: "Amazon Analytics & Strategy",
    navLabel: "Analytics & Strategy",
    description:
      "Business reporting, Brand Analytics, SQP, market & competitor analysis, customer insights, profitability, forecasting, and data-driven growth strategy.",
    detail: {
      eyebrow: "Analytics & Attribution",
      headline: "The Numbers Behind the Numbers",
      lede: "Branded versus non-branded revenue, cross-channel spillover from Meta, AMC cohort economics and contribution margin by SKU — analysis that changes what you decide, not just what you know.",
      intro:
        "An account can look healthy at the top line and be structurally fragile underneath it. Once more than seventy percent of revenue arrives through branded search, a brand is harvesting demand generated somewhere else rather than growing on Amazon, which leaves the whole channel hostage to a paid social budget that any quarter could cut. Our analytics work exists to expose that kind of dependency early and give you a defensible basis for where the next dollar goes.",
      inclusionsTitle: "The Analyses We Run",
      inclusions: [
        "Branded and non-branded revenue splits from Search Query Performance, business reports and search term data — the single most useful diagnostic we run on a new account.",
        "Cross-channel spillover quantifying how Meta and paid social spend converts into Amazon branded search volume and branded sales, expressed as a spillover ROAS your media buyer can act on.",
        "Amazon Marketing Cloud work — cohort LTV, new-to-brand economics, path to conversion and frequency — written as clean-room SQL against your instance.",
        "Contribution margin modeling by SKU and by channel, so pricing, promotion and advertising decisions get made against profit rather than revenue.",
        "Search Query Performance trending week over week and month over month, to catch category share loss while it is still a small number.",
        "Auditable workbooks and dashboards with live formulas, so your team can interrogate the assumptions instead of taking a PDF on faith.",
      ],
      steps: [
        {
          title: "Scope",
          body: "We agree the specific question the analysis has to answer, because analysis with no decision attached is expensive entertainment.",
        },
        {
          title: "Assemble",
          body: "Data from Seller Central, Campaign Manager, AMC, Sellerboard and your paid media platforms, reconciled against each other before anything is calculated.",
        },
        {
          title: "Analyze",
          body: "Findings built with visible formulas and stated assumptions rather than a black box and a conclusion.",
        },
        {
          title: "Present",
          body: "A working session on the logic with your team, then a written recommendation with the trade-offs made explicit.",
        },
      ],
      builtFor: [
        "DTC brands where Meta and Amazon budgets get argued about internally without data to settle it.",
        "Operators who suspect their Amazon growth leans harder on branded search than the top line suggests.",
        "Teams facing a real capital allocation decision who need something more rigorous than platform-reported ROAS.",
      ],
      proof: {
        value: "+85%",
        label: "Year-over-year growth",
        body: "Reading a wellness portfolio at product-line level rather than account average exposed where budget belonged, and the account grew 85% year over year.",
        href: "/case-studies",
        linkLabel: "Read the premium wellness case study",
      },
      faqs: [
        {
          question: "Do we need AMC access for this?",
          answer:
            "Not for most of it. Branded splits, spillover analysis and contribution margin work all run off standard reports. AMC adds cohort LTV and path analysis, and we can help you get an instance provisioned if you do not have one.",
        },
        {
          question: "Can you work with our existing BI stack?",
          answer:
            "Yes. We deliver workbooks and SQL your analysts can take over. We would rather your team own the model than rent it from us indefinitely.",
        },
        {
          question: "Is this a one-off project or ongoing?",
          answer:
            "Both models work. Attribution and branded-split analyses are usually a scoped project, while SQP trending and margin reporting tend to become part of the monthly cadence.",
        },
      ],
      cta: {
        title: "Ask us the question you cannot currently answer",
        body: "Most brands already know which number they do not trust. Tell us which one it is and we will scope the analysis that settles it.",
        label: "Scope an analysis",
      },
      related: ["ppc-management", "brand-management", "marketplace-expansion"],
      seo: {
        title: "Amazon Analytics & Attribution Strategy",
        description:
          "Branded vs non-branded revenue splits, cross-channel attribution, AMC cohort analysis and contribution margin reporting for DTC brands on Amazon.",
        keywords: [
          "amazon analytics",
          "amazon marketing cloud agency",
          "cross channel attribution amazon",
          "branded vs non branded amazon",
          "search query performance analysis",
        ],
      },
    },
  },
  {
    id: "product-launch-growth",
    icon: "rocket",
    title: "Product Launch & Growth",
    navLabel: "Product Launch & Growth",
    description:
      "Market research, product positioning, launch strategy, PPC launch campaigns, ranking, reviews, promotions, and scaling successful products.",
    detail: {
      eyebrow: "Launch & Ranking",
      headline: "Launches That Reach Escape Velocity",
      lede: "A funded, sequenced launch plan covering keyword targets, review velocity, promotional support and the date the ASIN has to start paying for itself.",
      intro:
        "An ASIN's first eight weeks set a trajectory that gets progressively more expensive to change. Amazon rewards early conversion velocity on a narrow set of terms, so a launch spreading budget across forty keywords typically ranks for none of them. A launch plan that cannot name its target terms on day one is not a plan, and we build ours with a defined ranking objective, a budget capable of reaching it, and an agreed date at which unprofitable spend stops.",
      inclusionsTitle: "What's Included",
      inclusions: [
        "Pre-launch keyword and competitive research establishing exactly which terms the ASIN will rank for, and what conversion velocity that requires.",
        "A budget model showing planned spend, expected ACOS by week and the crossover point where the ASIN turns contribution-positive.",
        "Listing and creative readiness review before a dollar goes out, because paid traffic hitting an unconverting page burns budget and ranking authority at the same time.",
        "Review velocity through Vine, follow-up sequences and post-purchase compliance, timed so social proof accumulates in step with traffic.",
        "Campaign architecture built for the honeymoon window, running discovery alongside tightly targeted exact-match campaigns on the priority terms.",
        "Weekly rank tracking against the named targets, with a scheduled day-60 decision on whether to double down, adjust or stop.",
      ],
      steps: [
        {
          title: "Plan",
          timing: "Pre-launch",
          body: "Keyword targets set, budget modeled, inventory and listing readiness confirmed, and a written launch brief signed off.",
        },
        {
          title: "Launch",
          timing: "Weeks one to four",
          body: "Concentrated spend on the priority terms, review velocity underway, daily monitoring of rank and conversion.",
        },
        {
          title: "Consolidate",
          timing: "Weeks five to eight",
          body: "Non-converting terms cut, budget compressed onto the terms showing movement, organic share tracked as it builds.",
        },
        {
          title: "Decide",
          timing: "Day 60",
          body: "An honest read against the plan. Some launches justify more investment, some products need repositioning, and occasionally the right call is to stop.",
        },
      ],
      builtFor: [
        "Brands introducing new SKUs into a category where they already hold authority.",
        "DTC products with proven off-Amazon demand making their first move onto the platform.",
        "Sellers who have launched before, stalled around page three, and want to understand why.",
      ],
      proof: {
        value: ">$5,000",
        label: "Daily sales milestone",
        body: "Tying campaign investment to keyword position rather than historical allocation took a multi-SKU pantry brand past $5,000 in daily sales.",
        href: "/case-studies",
        linkLabel: "Read the specialty food case study",
      },
      faqs: [
        {
          question: "How much budget does a launch need?",
          answer:
            "It scales with category competitiveness rather than with your price point. We model it backward from the conversion velocity required to rank on your target terms, and if that number is unrealistic against your margin we would rather tell you before you spend it.",
        },
        {
          question: "How long before a launch is profitable?",
          answer:
            "Most categories reach contribution-positive between month three and month six, assuming the ranking objective is met. Subscription and consumable products arrive sooner because repeat purchase carries the load.",
        },
        {
          question: "Do you use Vine?",
          answer:
            "Usually. It remains the cleanest compliant route to early reviews, and we time enrollment so reviews land as paid traffic ramps rather than after it.",
        },
      ],
      cta: {
        title: "Model the launch before you fund it",
        body: "Tell us the product and the category. We will build the ranking and budget model so the decision to launch gets made with a number rather than an instinct.",
        label: "Model my launch",
      },
      related: [
        "ppc-management",
        "seo-listing-optimization",
        "creative-conversion",
      ],
      seo: {
        title: "Amazon Product Launch & Growth Strategy",
        description:
          "Launch new ASINs with a named ranking target, funded honeymoon advertising, review velocity and a defined path to profitability.",
        keywords: [
          "amazon product launch",
          "amazon launch strategy",
          "new asin launch",
          "amazon ranking strategy",
          "amazon vine launch",
        ],
      },
    },
  },
  {
    id: "creative-conversion",
    icon: "image",
    title: "Amazon Creative & Conversion",
    navLabel: "Creative & Conversion",
    description:
      "A+ Content, Storefront design, product images, infographics, video, listing creative, and conversion-rate optimization.",
    detail: {
      eyebrow: "Creative & CRO",
      headline: "Creative Judged on Conversion, Not on Taste",
      lede: "Main images, infographics, A+ modules, Brand Stores and Sponsored Brands Video — produced by a creative team that reads your search term report before opening the design file.",
      intro:
        "Two levers move Amazon revenue without touching a bid: how many shoppers click your listing from a results page, and how many buy once they arrive. A main image that lifts click-through by a single point changes the economics of every campaign pointing at that ASIN, which is why creative belongs inside the advertising conversation rather than beside it. Our work starts from the data and gets measured against unit session percentage afterward.",
      inclusionsTitle: "What's Included",
      inclusions: [
        "Main image concepting and compliance-safe optimization, tested against click-through rather than approved on preference.",
        "The full image stack — infographics, lifestyle, scale and comparison — sequenced to answer purchase objections in the order shoppers actually raise them.",
        "A+ Content and Premium A+ modules built around the questions your reviews and returns data keep surfacing.",
        "Brand Store design and ongoing merchandising, structured so Sponsored Brands traffic lands somewhere that sells rather than somewhere that simply looks good.",
        "Sponsored Brands Video production, still one of the more underexploited placements in most catalogs we look at.",
        "Conversion diagnostics tying each creative change to unit session percentage movement, so you learn whether the investment worked.",
      ],
      steps: [
        {
          title: "Diagnose",
          body: "Review mining, competitor visual audit and conversion analysis to locate exactly where the page loses people.",
        },
        {
          title: "Concept",
          body: "Two or three directions with the reasoning attached, so the discussion is about the argument rather than the color palette.",
        },
        {
          title: "Produce",
          body: "Full asset build to Amazon spec, delivered publish-ready.",
        },
        {
          title: "Measure",
          body: "Click-through and unit session percentage read before and after, reported honestly even when a change underperforms.",
        },
      ],
      builtFor: [
        "Brands with strong traffic and weak conversion.",
        "Categories where every competitor image looks broadly the same and differentiation is available cheaply.",
        "Teams whose Amazon creative was adapted from DTC assets and never built for a results page.",
      ],
      proof: {
        value: "+41%",
        label: "Year-over-year growth",
        body: "Rebuilding an automotive brand's detail pages around fit and use grew sales 41% year over year and cut the return rate from 20% to 5%.",
        href: "/case-studies",
        linkLabel: "Read the automotive case study",
      },
      faqs: [
        {
          question: "Can you work from our existing brand guidelines?",
          answer:
            "Yes, and we prefer to — Amazon creative should extend the brand rather than argue with it. The one constraint we will push on is legibility at thumbnail size, which is where most DTC-native assets fail.",
        },
        {
          question: "Do you split test creative?",
          answer:
            "Where Manage Your Experiments supports the asset type, yes. Where it does not, we run sequential before-and-after reads with enough duration to mean something, and we are clear about the limits of that method.",
        },
        {
          question: "Is creative available without full management?",
          answer:
            "Yes, it runs as a standalone engagement. It works better when the team producing the asset can also see the search term data behind it.",
        },
      ],
      cta: {
        title: "Get a conversion read on your top ASINs",
        body: "Send us your five highest-traffic ASINs. We will benchmark unit session percentage against category norms and show you where creative is leaving revenue on the table.",
        label: "Request a creative audit",
      },
      related: [
        "seo-listing-optimization",
        "ppc-management",
        "brand-management",
      ],
      seo: {
        title: "Amazon Creative & Conversion Optimization",
        description:
          "Main image CTR testing, infographics, A+ modules, Brand Stores and Sponsored Brands Video — creative built to move conversion, then measured against it.",
        keywords: [
          "amazon creative agency",
          "amazon a+ content design",
          "amazon main image optimization",
          "sponsored brands video",
          "amazon brand store design",
        ],
      },
    },
  },
  {
    id: "marketplace-expansion",
    icon: "globe",
    title: "Marketplace Expansion",
    navLabel: "Marketplace Expansion",
    description:
      "International Amazon expansion, new marketplace launches, localization, DTC integration, external traffic, and omnichannel growth.",
    detail: {
      eyebrow: "New Channels",
      headline: "Growth That Does Not Depend on One Marketplace",
      lede: "Walmart and WFS, international Amazon marketplaces, Vendor Central and Amazon Business — launched properly, then operated with the same rigor as your core account.",
      intro:
        "Expansion fails on operations far more often than on demand. A Walmart listing suppressed by a GTIN mismatch, a UK launch stalled on VAT registration, a Vendor Central account bleeding margin through chargebacks nobody disputes — none of these are strategy problems, and every one of them will quietly cap a channel that would otherwise work. We treat a new marketplace as a full operational build rather than a catalog copy.",
      inclusionsTitle: "Where We Expand You",
      inclusions: [
        "Walmart Marketplace and WFS: catalog setup, item spec compliance, GTIN and UPC troubleshooting, Walmart Connect advertising, and sales diagnostics when performance drops without an obvious cause.",
        "International Amazon marketplaces across the UK, EU, Canada, Mexico and Australia, covering account setup, VAT and compliance groundwork, localized listings and market-specific campaign builds.",
        "Vendor Central and hybrid 1P/3P strategy, including purchase order management, chargeback disputes, cost negotiation support and the analytics needed to argue your case with a vendor manager.",
        "Amazon Business and B2B: quantity discount tiers, business pricing, case pack enrollment, and identifying the ASINs where institutional demand already shows up in your search terms.",
        "Channel economics modeled before launch on landed contribution margin, not on the size of the addressable market.",
        "Ongoing operation of the new channel by the same pod running your core account, keeping strategy and inventory decisions in one place.",
      ],
      steps: [
        {
          title: "Assess",
          body: "Demand, competitive density, fee structure, logistics cost and compliance burden modeled per marketplace, ending in a ranked recommendation that sometimes says do not expand.",
        },
        {
          title: "Build",
          body: "Account setup, catalog creation, compliance and logistics groundwork finished before a single listing goes live.",
        },
        {
          title: "Launch",
          body: "Listings live and advertising running, monitored daily through the window when problems are cheapest to fix.",
        },
        {
          title: "Operate",
          body: "The channel joins your reporting cadence with its own targets instead of disappearing into an Amazon US average.",
        },
      ],
      builtFor: [
        "Brands at or near ceiling on Amazon US looking for the next incremental channel.",
        "Sellers already live on Walmart or international marketplaces where the channel has never performed and nobody has diagnosed why.",
        "Brands weighing a move into Vendor Central, or already in one and unsure whether it is profitable.",
      ],
      proof: {
        value: "Operating experience",
        label: "Diagnostics run in-house",
        body: "We have traced a Walmart revenue decline to a GTIN mismatch and resolved it, and run the B2B analysis that found institutional demand sitting unclaimed in a client's search term report.",
      },
      faqs: [
        {
          question: "Is Walmart worth it for us?",
          answer:
            "Category and price point decide that far more than brand size does. Walmart converts differently, rewards different price positioning and carries real overhead through WFS. We model it before recommending it, and we regularly advise brands against it.",
        },
        {
          question: "Should we move to Vendor Central if invited?",
          answer:
            "Not automatically. A 1P invitation is flattering and frequently margin-destructive once chargebacks, co-op fees and the loss of price control are modeled. We will build that model with you before you answer.",
        },
        {
          question: "How long does an international launch take?",
          answer:
            "Typically 60 to 120 days from decision to live, with VAT registration and compliance documentation on the critical path rather than anything on the Amazon side.",
        },
      ],
      cta: {
        title: "Find out which channel is actually next",
        body: "We will model your top expansion options on landed margin and operational load, then hand you a ranked recommendation you can take to your board.",
        label: "Model my expansion options",
      },
      related: [
        "brand-management",
        "analytics-strategy",
        "product-launch-growth",
      ],
      seo: {
        title: "Walmart, International & Vendor Central Expansion",
        description:
          "Expand beyond Amazon US into Walmart WFS, international marketplaces, Vendor Central and Amazon B2B — with the operational detail handled.",
        keywords: [
          "walmart marketplace agency",
          "wfs management",
          "amazon international expansion",
          "vendor central agency",
          "amazon b2b pricing",
        ],
      },
    },
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

/** Every other service, with the ones named in `related` pulled to the front so
 *  the grid leads with the pages this service's copy actually cross-sells. */
export function getOtherServices(id: string): Service[] {
  const related = getServiceById(id)?.detail.related ?? [];

  const rank = (service: Service) => {
    const index = related.indexOf(service.id);
    return index === -1 ? related.length : index;
  };

  return services
    .filter((service) => service.id !== id)
    .sort((a, b) => rank(a) - rank(b));
}
