export type Faq = {
  question: string;
  answer: (string | string[])[];
  cta?: { label: string; href: string };
};

export const faqs: Faq[] = [
  {
    question: "Is there a long-term contract?",
    answer: [
      "No. Every plan runs month to month, so you stay with us because the results are working — not because a contract says you have to.",
    ],
  },
  {
    question: "Can I change my plan later?",
    answer: [
      "Yes. You can upgrade or downgrade at any time and the change takes effect on your next billing cycle. Your account manager stays the same either way.",
    ],
  },
  {
    question: "How much does it cost to hire an Amazon PPC agency?",
    answer: [
      "The investment isn't set in stone. What you pay depends on the scope of service, campaign complexity and your ad spend — which is why our plans start at $999 a month and scale from there.",
      "To talk pricing and ROI for your catalogue, book a free consultation with us. No strings attached.",
    ],
    cta: { label: "Schedule a free consultation", href: "/contact" },
  },
  {
    question: "What if I'm not satisfied?",
    answer: [
      "Every plan is backed by a 30-day money-back guarantee. If the first month doesn't meet expectations, tell us and we'll refund it in full.",
    ],
  },
  {
    question: "How long does it take to see results from Amazon PPC campaigns?",
    answer: [
      "It depends on your strategy and how competitive your category is. We structure campaigns for early wins while the longer-term work on ranking and ACOS compounds month over month.",
      "Want specifics for your products? Reach out and we'll walk you through a realistic timeline.",
    ],
    cta: { label: "Talk to our team", href: "/contact" },
  },
  {
    question: "Do you provide customized campaign strategies?",
    answer: [
      "Always. A customized strategy is what separates a competitive agency from a dashboard babysitter. We build the plan around your category, margins and growth goals rather than dropping you into a template.",
    ],
  },
  {
    question: "What marketplaces do you manage?",
    answer: [
      "We manage Amazon US, CA, UK, EU, AU and UAE marketplaces. If you sell in a region that isn't listed, get in touch and we'll confirm coverage before you sign up.",
    ],
  },
  {
    question: "How can I evaluate the success of my Amazon PPC agency?",
    answer: [
      "Success shows up in the numbers — better visibility, more sales, a lower ACOS. We keep you updated with clear reporting so the trend is never in question.",
      "Want proof of performance before you commit? Let's talk and we'll show you the work.",
    ],
    cta: { label: "See what we can do", href: "/contact" },
  },
  {
    question: "What results can I expect from working with FBA Zest?",
    answer: [
      "Results are unique to each business and depend on the campaign type, ad spend and niche. Across managed accounts, our clients have reported:",
      [
        "+242% client sales growth",
        "+63.6% increase in PPC sales",
        "45% reduction in ACOS",
      ],
    ],
  },
  {
    question: "How often will I receive reports?",
    answer: [
      "You get a detailed performance report every month, plus a weekly snapshot of sales, ad spend and ACOS. A live dashboard is available whenever you want to check in.",
    ],
  },
  {
    question: "What are the biggest perks of working with FBA Zest?",
    answer: [
      "Our clients tell us it comes down to three things:",
      [
        "A free account audit that highlights your budget leaks and the fastest improvement areas.",
        "Timely communication through the channel you already use — WhatsApp, Slack, email or phone.",
        "Weekly campaign optimization that pushes budget toward your high-performing keywords.",
      ],
    ],
  },
  {
    question: "What makes your results better than other agencies?",
    answer: [
      "Because we grow your organic ranking instead of only chasing clicks. We audit your listings to find optimization opportunities — relevant keywords, stronger images, better A+ content — so visibility and click-through improve even before ad spend does.",
    ],
  },
  {
    question: "Can you share real success stories or case studies?",
    answer: [
      "Yes. We're always happy to share real accounts of sellers whose sales climbed after partnering with us.",
      "Our case studies cover the strategy, the numbers and the timeline for each brand.",
    ],
    cta: { label: "Browse our case studies", href: "/case-studies" },
  },
  {
    question: "How do you keep performance consistent month over month?",
    answer: [
      "By watching the metrics that actually move the account — ACOS, TACOS and click-through rate — and adjusting before a trend becomes a problem.",
      "A falling ACOS, for instance, tells us you're spending less on ads per unit sold than you did last month. That's the signal we optimize toward.",
    ],
  },
  {
    question: "Do you offer a custom plan?",
    answer: [
      "Absolutely. If you're running a large catalogue or need services outside these packages, we'll build a scope and quote around your goals.",
    ],
  },
];
