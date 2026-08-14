import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";

type Service = {
  icon: IconName;
  title: string;
  description: string;
  points: string[];
  href: string;
};

const services: Service[] = [
  {
    icon: "cart",
    title: "Amazon Brand Management",
    description:
      "Grow your Amazon business with end-to-end brand management and category expertise.",
    points: [
      "Product listing optimization",
      "A+ Content & Brand Story",
      "Performance growth",
    ],
    href: "/contact",
  },
  {
    icon: "megaphone",
    title: "Amazon Advertising (PPC)",
    description: "Maximize ROI with data-driven Amazon advertising campaigns.",
    points: [
      "Sponsored Products & Brands",
      "Advanced keyword targeting",
      "Lower ACOS, higher sales",
    ],
    href: "/contact",
  },
  {
    icon: "globe",
    title: "Digital Marketing",
    description:
      "Build a strong online presence and drive measurable results across all channels.",
    points: [
      "Social Media Marketing (Meta, LinkedIn, X)",
      "Google Ads & Performance Marketing",
      "Content Strategy & SEO",
    ],
    href: "/contact",
  },
  {
    icon: "box",
    title: "Supply Chain & Logistics",
    description:
      "Ensure smooth operations and timely delivery with optimized supply chain solutions.",
    points: ["Inventory Management", "FBA & 3PL Support", "Cost Optimization"],
    href: "/contact",
  },
  {
    icon: "image",
    title: "Content Creation & Branding",
    description:
      "Create compelling content and a strong brand identity that converts.",
    points: [
      "A+ Content & Storefront Design",
      "Product Photography & Videos",
      "Brand Strategy",
    ],
    href: "/contact",
  },
  {
    icon: "lightbulb",
    title: "Amazon Growth Consulting",
    description:
      "Strategic guidance and hands-on support to scale your Amazon business profitably.",
    points: [
      "Market Analysis & Strategy",
      "Performance Audits",
      "Long-term Growth Planning",
    ],
    href: "/contact",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-surface">
      <Container className="py-16 lg:py-24">
        <Reveal className="text-center">
          <Eyebrow>Our Services</Eyebrow>
          <RevealText className="mt-4 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[42px]">
            What We Offer
          </RevealText>
        </Reveal>

        <StaggerCards className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.title} className="h-full">
              <div className="card-lift group flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card hover:border-teal-400">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white transition-transform duration-300 ease-out-soft group-hover:scale-106">
                  <Icon name={service.icon} size={26} strokeWidth={1.6} />
                </span>

                <h3 className="mt-6 text-[19px] leading-snug font-bold text-ink">
                  {service.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.65] text-muted">
                  {service.description}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Icon
                        name="check"
                        size={17}
                        className="mt-0.5 shrink-0 text-teal-500"
                      />
                      <span className="text-[13.5px] leading-normal text-muted">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 text-[14px] font-semibold text-teal-500 transition-colors duration-300 ease-out-soft hover:text-teal-600"
                >
                  Learn More
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                  />
                  <span className="sr-only">about {service.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
