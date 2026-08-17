import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { pricingPlans, type PricingPlan } from "@/lib/content/pricing";
import { cn } from "@/lib/cn";

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl bg-white",
        plan.featured
          ? "border-2 border-teal-500 shadow-card-hover"
          : "border border-line shadow-card",
      )}
    >
      <div className="bg-teal-600 px-5 py-4">
        <h2 className="text-center text-[14px] font-bold tracking-[0.08em] text-white uppercase">
          {plan.name}
        </h2>
      </div>

      <div className="flex flex-1 flex-col px-6 py-7">
        <p className="flex items-start justify-center gap-1 text-ink">
          <span className="mt-2 text-[20px] font-semibold">$</span>
          <span className="text-[44px] leading-none font-extrabold tracking-[-0.03em]">
            {plan.price}
          </span>
        </p>
        <p className="mt-2 text-center text-[14px] font-medium text-teal-500">
          /{plan.period}
        </p>

        <ul className="mt-6 flex-1 divide-y divide-line border-t border-line">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 py-3.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-teal-500/40 text-teal-500">
                <Icon name="check" size={11} strokeWidth={3} />
              </span>
              <span className="text-[13.5px] leading-snug text-muted">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          href={plan.ctaHref}
          icon={null}
          className="mt-7 self-center px-8"
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </article>
  );
}

export function PricingPlans() {
  return (
    <section className="bg-white">
      <Container className="py-14 lg:py-18">
        <StaggerCards
          className="grid gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          y={20}
        >
          {pricingPlans.map((plan, index) => (
            <li
              key={plan.id}
              className={cn(
                "relative",
                // With an odd plan count the final card is left alone on the
                // second row at the two-up breakpoint. Span the row and hold it
                // to one column's width so it centres instead of hugging the
                // left edge. The three-up layout has no orphan, so reset there.
                pricingPlans.length % 2 === 1 &&
                  index === pricingPlans.length - 1 &&
                  "sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:justify-self-center lg:col-span-1 lg:w-auto lg:justify-self-stretch",
              )}
            >
              {plan.badge ? (
                // Sits outside the card so the card can clip its own header
                // without clipping the badge.
                <Reveal className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full border border-teal-400/45 bg-teal-600 px-5 py-1.5 text-[11.5px] font-bold tracking-[0.06em] whitespace-nowrap text-white uppercase shadow-card">
                    {plan.badge}
                  </span>
                </Reveal>
              ) : null}
              <PlanCard plan={plan} />
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
