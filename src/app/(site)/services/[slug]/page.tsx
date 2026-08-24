import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import heroLaptop from "../../../../../public/images/services_hero_laptop.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { CTABanner } from "@/components/shared/CTABanner";
import { ProcessStrip } from "@/components/services/ProcessStrip";
import {
  getOtherServices,
  getServiceById,
  services,
} from "@/lib/content/services";
import { bookingUrl } from "@/lib/site";

const HERO_ALT =
  "A laptop on a desk displaying the Amazon logo above a rising bar chart and growth arrow, lit in teal.";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

// The seven services are the only valid segments, so anything else is a 404
// rather than an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      type: "website",
      title: service.title,
      description: service.description,
      url: `/services/${service.id}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) notFound();

  const others = getOtherServices(service.id);

  return (
    <>
      <section className="bg-hero-dark relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Image
            src={heroLaptop}
            alt={HERO_ALT}
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-black from-0% to-transparent to-38%"
          />
        </div>

        <Container className="relative py-16 lg:py-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-white/55">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-teal-400"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron-right" size={14} className="opacity-60" />
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-teal-400"
                >
                  Our Services
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron-right" size={14} className="opacity-60" />
              </li>
              <li aria-current="page" className="text-white/85">
                {service.navLabel}
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-xl">
            <span className="flex size-14 items-center justify-center rounded-full bg-teal-500 text-white">
              <Icon name={service.icon} size={26} strokeWidth={1.6} />
            </span>

            <Eyebrow className="mt-6">Our Services</Eyebrow>

            <h1 className="mt-4 text-[2rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
              {service.title}
            </h1>

            <p className="mt-5 text-base leading-[1.7] text-white/70">
              {service.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={bookingUrl} size="lg">
                Get a Free Consultation
              </Button>
              <Button href="/services" variant="dark" size="lg">
                View All Services
              </Button>
            </div>
          </div>
        </Container>

        <div className="relative aspect-3/2 w-full lg:hidden">
          <Image
            src={heroLaptop}
            alt=""
            fill
            sizes="(min-width: 1024px) 1px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <ProcessStrip />

      <section className="bg-surface">
        <Container className="py-16 lg:py-20">
          <Reveal>
            <Eyebrow>Explore More</Eyebrow>
            <h2 className="mt-4 text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[2rem]">
              Other Services We Provide
            </h2>
          </Reveal>

          <StaggerCards className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.id} className="h-full">
                <Link
                  href={`/services/${other.id}`}
                  className="card-lift group flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card hover:border-teal-400"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white transition-transform duration-300 ease-out-soft group-hover:scale-106">
                    <Icon name={other.icon} size={22} strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-5 text-lg leading-snug font-bold text-ink">
                    {other.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-[1.65] text-muted">
                    {other.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 text-[0.875rem] font-semibold text-teal-500">
                    Learn More
                    <Icon
                      name="arrow-right"
                      size={16}
                      className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </StaggerCards>
        </Container>
      </section>

      <CTABanner
        icon={service.icon}
        title="Ready to Take Your Amazon Business to the Next Level?"
        description="Book a free consultation call with our experts and get a customized growth plan."
        ctaHref={bookingUrl}
      />
    </>
  );
}
