import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerCards } from "@/components/motion/StaggerCards";
import type { ServiceDetail } from "@/lib/content/services";

type ServiceOverviewProps = {
  eyebrow: string;
  intro: string;
  inclusionsTitle: ServiceDetail["inclusionsTitle"];
  inclusions: ServiceDetail["inclusions"];
};

export function ServiceOverview({
  eyebrow,
  intro,
  inclusionsTitle,
  inclusions,
}: ServiceOverviewProps) {
  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-20">
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted lg:text-[1.125rem]">
            {intro}
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[2rem]">
            {inclusionsTitle}
          </h2>
          <span
            aria-hidden="true"
            className="mt-5 block h-1 w-14 rounded-full bg-teal-500"
          />
        </Reveal>

        <StaggerCards className="mt-9 grid gap-5 md:grid-cols-2">
          {inclusions.map((item) => (
            <li key={item} className="h-full">
              <div className="card-lift flex h-full gap-4 rounded-lg border border-line bg-white p-6 shadow-card hover:border-teal-400">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <Icon name="check" size={16} strokeWidth={2.4} />
                </span>
                <p className="text-[0.9375rem] leading-[1.7] text-muted">
                  {item}
                </p>
              </div>
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
