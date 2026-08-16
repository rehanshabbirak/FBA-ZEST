import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies, type CaseStudy } from "@/lib/content/case-studies";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";

type Metric = CaseStudy["metrics"][number];

const TONE_RING: Record<NonNullable<Metric["tone"]>, string> = {
  positive: "bg-teal-50 text-teal-500",
  negative: "bg-error/10 text-error",
  neutral: "bg-surface text-muted",
};

const TONE_VALUE: Record<NonNullable<Metric["tone"]>, string> = {
  positive: "text-teal-500",
  negative: "text-error",
  neutral: "text-ink",
};

/**
 * A leading minus or a "20% -> 5%" range means the number came down; every
 * other shape is a gain. Direction is about movement, not about whether the
 * movement was good — `tone` carries that.
 */
function metricIcon(value: string): IconName {
  return value.startsWith("-") || value.includes("→")
    ? "arrow-down"
    : "arrow-up-right";
}

function MetricStat({ metric }: { metric: Metric }) {
  const tone = metric.tone ?? "neutral";
  return (
    <li className="sm:pl-5 sm:first:pl-0">
      <div className="flex items-center gap-1.5">
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-full ${TONE_RING[tone]}`}
        >
          <Icon name={metricIcon(metric.value)} size={13} strokeWidth={2.2} />
        </span>
        <p
          className={`leading-none font-bold tracking-[-0.015em] ${TONE_VALUE[tone]} ${
            metric.value.length > 7 ? "text-[17px]" : "text-[21px]"
          }`}
        >
          {metric.value}
        </p>
      </div>
      <p className="mt-1.5 text-[11px] leading-[1.35] font-medium text-muted">
        {metric.label}
      </p>
    </li>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card">
      <div className="grid lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
        <div className="relative aspect-16/10 lg:aspect-auto lg:min-h-60">
          <Image
            src={study.image}
            alt={`${study.industry} products featured in this Amazon growth case study`}
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-6 lg:px-7 lg:py-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-[11px] font-bold tracking-[0.16em] text-teal-500 uppercase">
              Case Study {String(study.caseStudyNumber).padStart(2, "0")}
            </p>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span className="text-[11.5px] font-semibold text-muted">
              {study.industry}
            </span>
          </div>

          <h3 className="mt-2 text-[20px] leading-[1.25] font-bold tracking-[-0.015em] text-ink lg:text-[22px]">
            {study.cardTitle}
          </h3>

          <p className="mt-2 max-w-[68ch] text-[13px] leading-[1.6] text-muted">
            {study.cardDescription}
          </p>

          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-5 sm:grid-cols-4 sm:gap-x-0 sm:divide-x sm:divide-line">
            {study.metrics.map((metric) => (
              <MetricStat key={metric.label} metric={metric} />
            ))}
          </ul>

          {study.representativePeriod ? (
            <p className="mt-3 text-[10.5px] tracking-[0.02em] text-subtle">
              {study.representativePeriod}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 border-t border-line bg-surface px-6 py-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-8 lg:px-7">
        <div className="flex gap-3">
          <Icon
            name="lightbulb"
            size={15}
            strokeWidth={1.9}
            className="mt-0.5 shrink-0 text-teal-500"
          />
          <p className="text-[12.5px] leading-[1.6] text-muted">
            <span className="font-bold text-ink">Key takeaway: </span>
            {study.keyTakeaway}
          </p>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-8">
          <p className="text-[10.5px] font-bold tracking-[0.14em] text-ink uppercase">
            Services Used
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {study.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] leading-none text-muted"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
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
          <RevealText className="mx-auto mt-4 max-w-4xl text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-ink sm:text-[34px] lg:text-[38px]">
            How FBA Zest Turns Amazon Complexity Into Profitable Growth
          </RevealText>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-1 w-14 rounded-full bg-teal-500"
          />
          <p className="mx-auto mt-6 max-w-[68ch] text-[15px] leading-[1.75] text-muted">
            Amazon growth rarely comes from increasing ad spend alone. It comes
            from connecting advertising, organic visibility, conversion,
            inventory, pricing, and profitability into one clear strategy.
          </p>
          <p className="mx-auto mt-4 max-w-[68ch] text-[13.5px] leading-[1.7] text-subtle">
            The following case studies show how FBA Zest has helped brands
            improve performance across competitive Amazon categories. Client
            names have been withheld, while the results and strategic work
            reflect actual account outcomes.
          </p>
        </Reveal>

        <StaggerCards className="mt-11 space-y-6">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <CaseStudyCard study={study} />
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
