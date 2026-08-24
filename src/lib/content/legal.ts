import type { IconName } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export type PolicyContact = {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
};

export type PolicySection = {
  id: string;
  title: string;
  icon: IconName;
  body: string[];
  bullets?: string[];
  contacts?: PolicyContact[];
};

const UPDATED_LAG_DAYS = 5;

export function getPrivacyPolicyUpdatedAt(): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - UPDATED_LAG_DAYS);
  return date.toISOString().slice(0, 10);
}

export const privacyPolicySections: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "document",
    body: [
      `Welcome to ${site.name}. We strive to be the top Amazon account management agency, known for driving exceptional sales growth and efficiency, and we want to empower brands with innovative strategies that lead to long-term success on Amazon.`,
      "Integrity sits at the centre of how we work. We believe in honesty and transparency in everything we do, and that extends to how we handle information about you. This Privacy Policy explains what we collect, why we collect it, how we use and share it, and the choices you have.",
      `It applies to ${site.url.replace("https://", "")} and to the services we provide to our clients. By using our website or engaging our services, you agree to the practices described here.`,
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: "box",
    body: [
      "We collect information that you provide directly to us, such as your name, email address, phone number, company name, and any other details you submit through our contact forms, consultation requests, or ongoing communication with our team.",
    ],
    bullets: [
      "Contact details you submit — name, email address, phone number, and company name.",
      "Business information you share so we can assess your account, such as brand, product category, and target marketplace.",
      "Correspondence, including messages, call notes, and support requests.",
      "Technical data collected automatically — IP address, browser and device type, operating system, referring URLs, and pages viewed.",
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    icon: "target",
    body: [
      "We use the information we collect to provide, maintain, and improve our services, respond to your inquiries, send you updates and marketing communications, and personalize your experience.",
    ],
    bullets: [
      "Responding to consultation requests and answering questions about our services.",
      "Delivering, managing, and improving Amazon account services for our clients.",
      "Sending service updates and, where you have opted in, marketing communications.",
      "Understanding how our website is used so we can improve its content and performance.",
      "Meeting our legal, accounting, and reporting obligations.",
    ],
  },
  {
    id: "cookies-and-tracking",
    title: "Cookies & Tracking Technologies",
    icon: "cursor",
    body: [
      "We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from.",
    ],
    bullets: [
      "Essential cookies that keep the site secure and working as intended.",
      "Analytics cookies that show us which pages are read and where visitors arrive from.",
      "Preference cookies that remember choices you have already made.",
    ],
  },
  {
    id: "analytics-and-third-parties",
    title: "Analytics & Third-Party Services",
    icon: "chart-bar",
    body: [
      "We use third-party services such as Google Analytics, Google Tag Manager, and others to analyze website performance and user behavior. These providers may set their own cookies and process data under their own privacy policies.",
      "We also rely on trusted providers for hosting, email delivery, scheduling, and customer relationship management. Each is engaged under terms that limit their use of your information to the services they perform for us.",
      "Our website links to external sites, including Amazon. We are not responsible for the privacy practices of those sites and encourage you to read their policies.",
    ],
  },
  {
    id: "how-we-protect-your-information",
    title: "How We Protect Your Information",
    icon: "lock",
    body: [
      "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
    ],
    bullets: [
      "Encrypted connections (HTTPS) across the entire website.",
      "Access controls that limit client and account data to the team members who need it.",
      "Regular review of the providers and tools we rely on.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    icon: "users",
    body: [
      "We do not sell your personal information. We may share your information with trusted third parties who assist us in operating our website or conducting our business, provided they agree to keep this information confidential.",
    ],
    bullets: [
      "Service providers who host our site, deliver our email, or support our day-to-day operations.",
      "Professional advisors such as accountants and legal counsel, where necessary.",
      "Authorities, where disclosure is required by law or to protect our rights.",
      "A successor entity, if our business is involved in a merger, acquisition, or sale of assets.",
    ],
  },
  {
    id: "your-privacy-rights",
    title: "Your Privacy Rights",
    icon: "shield-check",
    body: [
      "Depending on where you live, you may have rights over the personal information we hold about you.",
    ],
    bullets: [
      "Access — request a copy of the information we hold about you.",
      "Correction — ask us to fix information that is inaccurate or incomplete.",
      "Deletion — ask us to erase information we no longer need to keep.",
      "Objection and restriction — ask us to stop or limit certain processing.",
      "Opt out — unsubscribe from marketing at any time using the link in our emails.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: "clock",
    body: [
      "We keep personal information only for as long as we need it for the purposes described in this policy, or for as long as the law requires.",
      "Enquiry and consultation records are kept while we are in contact with you and for a reasonable period afterwards. Client account records are kept for the duration of the engagement and for the period required by our legal and accounting obligations. When information is no longer needed, we delete or anonymize it.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    icon: "handshake",
    body: [
      "Our website and services are intended for businesses and are not directed at children under the age of 13. We do not knowingly collect personal information from children.",
      "If you believe a child has provided us with personal information, please contact us and we will delete it.",
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to This Privacy Policy",
    icon: "megaphone",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes to our practices, our services, or the law.",
      "When we make a material change we will revise the “Last updated” date at the top of this page and, where appropriate, notify you directly. We encourage you to review this page periodically.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    icon: "mail",
    body: [
      "If you have questions about this Privacy Policy, or about how we handle your information, we are happy to hear from you.",
    ],
    contacts: [
      {
        icon: "mail",
        label: "Email",
        value: site.email,
        href: `mailto:${site.email}`,
      },
      {
        icon: "phone",
        label: "Phone",
        value: site.phone,
        href: `tel:${site.phoneHref}`,
      },
      { icon: "location", label: "Address", value: site.address },
    ],
  },
];
