import type { IconName } from "@/components/ui/Icon";

export const site = {
  name: "FBA Zest",
  tagline: "Amazon Brand Management Agency",
  description:
    "We help Amazon brands grow smarter, sell more, and scale beyond limits.",
  email: "hello@fbazest.com",
  phone: "+1 (323) 456-7890",
  phoneHref: "+13234567890",
  address: "123 Business Ave, New York, NY 10001, USA",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

export const serviceNav: NavItem[] = [
  { label: "Amazon Strategy", href: "/services#strategy" },
  { label: "Listing Optimization", href: "/services#listing-optimization" },
  { label: "PPC Management", href: "/services#ppc" },
  { label: "Brand Building", href: "/services#brand-building" },
  { label: "Content Creation", href: "/services#content" },
  { label: "Analytics & Reporting", href: "/services#analytics" },
  { label: "Digital Marketing", href: "/services#digital-marketing" },
  { label: "Amazon Growth Consulting", href: "/services#consulting" },
];

export const resourceNav: NavItem[] = [
  { label: "Blog", href: "/blogs" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Amazon Seller Guide", href: "/blogs" },
  { label: "FAQs", href: "/contact#faqs" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export const socialLinks: {
  label: string;
  href: string;
  icon: IconName;
}[] = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "X (Twitter)", href: "https://x.com", icon: "twitter-x" },
];
