"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

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
  const trackRef = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setPages(Math.max(1, Math.round(track.scrollWidth / track.clientWidth)));
    setPage(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener("scroll", measure, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-surface">
      <Container className="py-16 lg:py-24">
        <Reveal className="text-center">
          <Eyebrow>Clients Love Us</Eyebrow>
          <h2 className="mt-4 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[42px]">
            What Our Clients Say
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <ul
            ref={trackRef}
            tabIndex={0}
            aria-label="Client testimonials"
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item) => (
              <li
                key={item.name}
                className="w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <figure className="card-lift flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card">
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
              </li>
            ))}
          </ul>
        </Reveal>

        {pages > 1 ? (
          <div className="mt-9 flex justify-center gap-2.5">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial slide ${i + 1}`}
                aria-current={i === page}
                className={cn(
                  "size-2.5 rounded-full transition-[background-color,width] duration-200",
                  i === page ? "w-6 bg-teal-500" : "bg-ink/20 hover:bg-ink/35",
                )}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
