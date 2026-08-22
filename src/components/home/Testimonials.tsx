import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { DragCarousel } from "@/components/motion/DragCarousel";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "FBA Zest transformed our Amazon business. Our sales increased by 200% in just 6 months!",
    name: "John Carter",
    role: "CEO, UGREEN",
  },
  {
    quote:
      "Their PPC strategies and listing optimizations made a huge difference. Highly professional and results-driven team.",
    name: "Sarah Mitchell",
    role: "Founder, Ortiz Gaming",
  },
  {
    quote:
      "Thanks to FBA Zest, our brand is now a top performer in our category.",
    name: "Michael Brown",
    role: "Co-Founder, Maven Threads",
  },
  {
    quote:
      "They rebuilt our catalog and storefront from the ground up. Conversion rate went up and returns went down.",
    name: "Elena Ruiz",
    role: "Brand Director, Juglana",
  },
  {
    quote:
      "Reporting is genuinely transparent. We finally understand which campaigns earn their budget every week.",
    name: "David Kim",
    role: "Head of Ecommerce, YEK Bags",
  },
  {
    quote:
      "We launched in three new marketplaces with their team and hit profitability faster than we planned.",
    name: "Priya Nair",
    role: "COO, Vivicti",
  },
];

export function Testimonials() {
  return (
    <section data-testid="testimonials" className="bg-surface">
      <Container className="py-10 lg:py-12">
        <Reveal className="text-center">
          <Eyebrow>Clients Love Us</Eyebrow>
          <RevealText className="mt-4 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[42px]">
            What Our Clients Say
          </RevealText>
        </Reveal>

        <DragCarousel
          ariaLabel="Client testimonials"
          className="mt-12"
          itemClassName="w-[86%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
        >
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="card-lift flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card"
            >
              <Icon
                name="quote"
                size={30}
                strokeWidth={1.6}
                className="text-teal-500"
              />
              <blockquote className="mt-5 flex-1 text-[15px] leading-[1.65] text-muted">
                {item.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <Avatar name={item.name} src={item.avatar} size={42} />
                <span className="leading-tight">
                  <span className="block text-[14px] font-bold text-ink">
                    {item.name}
                  </span>
                  <span className="block text-[13px] text-subtle">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </DragCarousel>
      </Container>
    </section>
  );
}
