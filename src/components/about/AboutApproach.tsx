import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { site } from "@/lib/site";

type Pillar = { icon: IconName; title: string; description: string };

/** Each pillar names a discipline the agency already sells, so the page does
 *  not promise anything the services pages do not back up. */
const pillars: Pillar[] = [
  {
    icon: "megaphone",
    title: "Advertising that pays for itself",
    description:
      "PPC managed against profit, not vanity clicks — budget pushed toward the terms that convert.",
  },
  {
    icon: "search",
    title: "Listings built to convert",
    description:
      "SEO, content and creative worked together, so paid traffic lands on a page that closes.",
  },
  {
    icon: "chart-bar",
    title: "Decisions backed by data",
    description:
      "Analytics and reporting that explain why the numbers moved, and what we are testing next.",
  },
  {
    icon: "briefcase",
    title: "One team on the whole account",
    description:
      "Ads, catalog, inventory and brand health handled together instead of split across vendors.",
  },
];

export function AboutApproach() {
  return (
    <section className="bg-surface">
      <Container className="grid gap-12 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-7 bg-teal-500" />
            <Eyebrow>Why Choose Us</Eyebrow>
          </div>

          <RevealText className="mt-4 max-w-[16ch] text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[36px] lg:text-[40px]">
            Specialists, not <span className="text-teal-500">generalists.</span>
          </RevealText>

          <p className="mt-5 max-w-[50ch] text-[15px] leading-[1.7] text-muted">
            {site.name} exists to scale ecommerce brands on Amazon with
            data-driven strategy — advertising, listings, catalog health and
            profitability treated as one account rather than separate projects.
          </p>

          <p className="mt-4 max-w-[50ch] text-[15px] leading-[1.7] text-muted">
            That focus is deliberate. Amazon is the only marketplace we work in,
            so the playbooks we bring to your account were written on accounts
            like it.
          </p>

          <Button href="/contact" size="lg" className="mt-8">
            Get Started
          </Button>
        </Reveal>

        <StaggerCards className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <div className="card-lift group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card hover:border-teal-400">
                <span className="flex size-11 items-center justify-center rounded-lg border border-teal-500/25 bg-teal-50 text-teal-600 transition-transform duration-300 ease-out-soft group-hover:scale-105">
                  <Icon name={pillar.icon} size={20} strokeWidth={1.7} />
                </span>

                <h3 className="mt-5 text-[16px] leading-snug font-bold tracking-[-0.01em] text-ink">
                  {pillar.title}
                </h3>

                <p className="mt-2.5 text-[14px] leading-[1.65] text-muted">
                  {pillar.description}
                </p>
              </div>
            </li>
          ))}
        </StaggerCards>
      </Container>
    </section>
  );
}
