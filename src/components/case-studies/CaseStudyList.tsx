import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies, type CaseStudy } from "@/lib/content/case-studies";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";

function MetricRing({ metric }: { metric: CaseStudy["metrics"][number] }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-teal-500/25 text-teal-500">
      {metric.icon ? (
        <Icon name={metric.icon} size={19} strokeWidth={1.7} />
      ) : (
        <span
          className={
            metric.glyph && metric.glyph.length > 1
              ? "text-[8.5px] font-bold tracking-tight"
              : "text-[17px] font-bold"
          }
        >
          {metric.glyph}
        </span>
      )}
    </span>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-line bg-white shadow-card lg:grid-cols-[236px_minmax(0,1fr)_minmax(0,1.85fr)]">
      <div className="relative aspect-square lg:aspect-auto lg:min-h-59">
        <Image
          src={study.image}
          alt={`${study.brand} product photography`}
          fill
          sizes="(max-width: 1024px) 100vw, 236px"
          className="object-cover"
        />
        <span className="absolute top-1/2 right-0 flex size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-line bg-white text-teal-500 shadow-card">
          <Icon name="growth-arrow" size={22} strokeWidth={1.8} />
        </span>
      </div>

      <div className="p-7 lg:py-8 lg:pr-6 lg:pl-9">
        <p className="text-[11px] font-bold tracking-[0.14em] text-teal-500 uppercase">
          Case Study {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-[20px] leading-tight font-bold text-ink">
          {study.brand}
        </h3>
        <p className="mt-1.5 text-[13px] font-medium text-teal-500">
          {study.category}
        </p>
        <p className="mt-4 text-[13px] leading-[1.65] text-muted">
          {study.summary}
        </p>

        <figure className="mt-5 rounded-[10px] bg-teal-50/70 p-4">
          <Icon
            name="quote"
            size={18}
            strokeWidth={1.7}
            className="text-teal-500"
          />
          <blockquote className="mt-2 text-[12.5px] leading-[1.6] text-muted">
            {study.quote}
          </blockquote>
          <figcaption className="mt-2 text-[12px] font-medium text-ink">
            &ndash; {study.author}
          </figcaption>
        </figure>
      </div>

      <div className="flex flex-col justify-center gap-6 border-line px-7 pb-7 lg:border-l lg:px-8 lg:py-8">
        <ul className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:divide-x lg:divide-line">
          {study.metrics.map((metric) => (
            <li
              key={metric.label}
              className="flex flex-col items-center gap-2.5 text-center lg:px-2"
            >
              <MetricRing metric={metric} />
              <p className="text-[20px] leading-none font-bold text-teal-500">
                {metric.value}
              </p>
              <div>
                <p className="text-[11px] font-medium text-ink">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-[10.5px] text-subtle">
                  {metric.period}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <dl className="grid gap-4 border-t border-line pt-5 sm:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
          <div>
            <dt className="text-[11.5px] font-bold text-ink">Services Used:</dt>
            <dd className="mt-1.5 text-[11.5px] leading-[1.6] text-muted">
              {study.services.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-[11.5px] font-bold text-ink">Market:</dt>
            <dd className="mt-1.5 text-[11.5px] leading-[1.6] text-muted">
              {study.markets}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function CaseStudyList() {
  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-20">
        <Reveal className="text-center">
          <Eyebrow>Featured Case Studies</Eyebrow>
          <RevealText className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[34px] lg:text-[38px]">
            Success Stories That Speak for Themselves
          </RevealText>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-1 w-14 rounded-full bg-teal-500"
          />
        </Reveal>

        <StaggerCards className="mt-12 space-y-7">
          {caseStudies.map((study, i) => (
            <li key={study.slug}>
              <CaseStudyCard study={study} index={i} />
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
