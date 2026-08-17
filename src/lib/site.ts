import type { IconName } from "@/components/ui/Icon";
import { services } from "@/lib/content/services";

export const site = {
  name: "FBA Zest",
  tagline: "Amazon Brand Management Agency",
  url: "https://fbazest.com",
  description:
    "We help Amazon brands grow smarter, sell more, and scale beyond limits.",
  email: "contact@fbazest.com",
  phone: "+92 317 4633207",
  phoneHref: "+923174633207",
  address: "150-H-1 Johar Town, Lahore",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

export const serviceNav: NavItem[] = services.map((service) => ({
  label: service.navLabel,
  href: `/services#${service.id}`,
}));

export const resourceNav: NavItem[] = [
  { label: "Blog", href: "/blogs" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Amazon Seller Guide", href: "/blogs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
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
  {
    label: "Facebook",
    href: "https://www.facebook.com/fbazestofficial",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fbazest/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fbazestofficial/",
    icon: "instagram",
  },
  { label: "X (Twitter)", href: "https://x.com/fbazest", icon: "twitter-x" },
];
