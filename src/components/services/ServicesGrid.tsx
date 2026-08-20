import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { services } from "@/lib/content/services";
import { cn } from "@/lib/cn";

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
          {services.map((service, index) => (
            <li
              key={service.id}
              id={service.id}
              className={cn(
                "h-full scroll-mt-24",
                // Seven services leave one card alone on the final row. Hold it
                // to a single column's width and centre it rather than letting
                // it hug the left edge.
                index === services.length - 1 &&
                  "md:col-span-2 md:w-[calc(50%-0.75rem)] md:justify-self-center lg:col-span-1 lg:col-start-2 lg:w-auto lg:justify-self-stretch",
              )}
            >
              <div className="card-lift group flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card hover:border-teal-400">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white transition-transform duration-300 ease-out-soft group-hover:scale-106">
                  <Icon name={service.icon} size={26} strokeWidth={1.6} />
                </span>

                <h3 className="mt-6 text-[19px] leading-snug font-bold text-ink">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-muted">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.id}`}
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
