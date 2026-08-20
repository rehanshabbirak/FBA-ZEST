import Image, { type StaticImageData } from "next/image";
import discoverStrategize from "../../../public/images/01_discover_and_strategize.png";
import buildOptimize from "../../../public/images/02_build_and_optimize.png";
import measureScale from "../../../public/images/03_measure_and_scale.png";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessRow } from "@/components/motion/ProcessRow";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";

type Step = {
  number: string;
  /** Split so the phrase after the ampersand can carry the teal accent. */
  title: string;
  titleAccent: string;
  description: string;
  /** Rendered two per row, so these read across then down. */
  points: { icon: IconName; label: string }[];
  image: StaticImageData;
  alt: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Discover &",
    titleAccent: "Strategize",
    description:
      "We analyze your brand, products, competitors, category, and current Amazon performance to identify the biggest growth opportunities.",
    points: [
      { icon: "search", label: "Market & competitor research" },
      { icon: "tag", label: "Keyword & category research" },
      { icon: "document", label: "Account & listing audit" },
      { icon: "target", label: "Growth strategy roadmap" },
    ],
    image: discoverStrategize,
    alt: "An Amazon Seller Central dashboard on a laptop showing $125,420 in total sales, 3,254 orders and 22.3% ACOS beside a rising sales-over-time chart.",
  },
  {
    number: "02",
    title: "Build &",
    titleAccent: "Optimize",
    description:
      "We turn the strategy into high-converting listings, compelling content, and optimized advertising campaigns designed to improve visibility and sales.",
    points: [
      { icon: "document", label: "Listing optimization" },
      { icon: "chart-line", label: "PPC campaign management" },
      { icon: "layers", label: "A+ Content & Storefront" },
      { icon: "image", label: "Creative & brand development" },
    ],
    image: buildOptimize,
    alt: "A product listing for headphones on one monitor beside a PPC campaigns panel reporting $3,240.50 spend against $18,960.70 in sales at 17.1% ACOS.",
  },
  {
    number: "03",
    title: "Measure &",
    titleAccent: "Scale",
    description:
      "We continuously monitor performance, identify opportunities, and optimize campaigns to increase profitable growth over time.",
    points: [
      { icon: "chart-line", label: "Performance tracking" },
      { icon: "pie-chart", label: "Sales & ACOS analysis" },
      { icon: "target", label: "PPC optimization" },
      { icon: "growth-arrow", label: "Continuous growth strategy" },
    ],
    image: measureScale,
    alt: "A business performance dashboard reporting $248,890 in total sales, 6,784 orders, 19.6% ACOS and 5.12 ROAS above a twelve-month growth chart.",
  },
];

export function Process() {
  return (
    <section className="bg-surface">
      <Container className="py-16 lg:py-24">
        <Reveal className="text-center">
          <Eyebrow>Our Process</Eyebrow>
          <RevealText className="mx-auto mt-4 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[42px]">
            A Proven Process for{" "}
            <span className="text-teal-500">Amazon Growth</span>
          </RevealText>
          <p className="mx-auto mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-muted">
            From strategy to execution, we follow a data-driven process that
            helps Amazon brands grow, scale, and stay ahead of the competition.
          </p>
        </Reveal>

        <ol className="mt-12 space-y-6 lg:mt-14 lg:space-y-8">
          {steps.map((step, index) => {
            // Every other card flips, so the eye zig-zags down the column
            // instead of tracking one straight edge.
            const imageFirst = index % 2 === 0;

            return (
              <li key={step.number}>
                <ProcessRow mediaSide={imageFirst ? "left" : "right"}>
                  <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
                    <div className="grid lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)]">
                      <div
                        data-process-media
                        className={cn(
                          "relative aspect-16/10 lg:aspect-auto",
                          !imageFirst && "lg:order-2",
                        )}
                      >
                        {/* Elliptical radii — 56px across, 50% down — put the
                            corner arcs' meeting point at the vertical centre,
                            giving one continuous sweep instead of two rounded
                            corners with a flat run between them. The teal sits
                            a touch wider than the photo so the curve reads as
                            an accent edge rather than a border. */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-0 bg-teal-500",
                            imageFirst
                              ? "lg:rounded-tr-[56px_50%] lg:rounded-br-[56px_50%]"
                              : "lg:rounded-tl-[56px_50%] lg:rounded-bl-[56px_50%]",
                          )}
                        />
                        <div
                          className={cn(
                            "absolute inset-0 overflow-hidden",
                            imageFirst
                              ? "lg:right-2.5 lg:rounded-tr-[56px_50%] lg:rounded-br-[56px_50%]"
                              : "lg:left-2.5 lg:rounded-tl-[56px_50%] lg:rounded-bl-[56px_50%]",
                          )}
                        >
                          <Image
                            src={step.image}
                            alt={step.alt}
                            fill
                            placeholder="blur"
                            sizes="(min-width: 1024px) 46vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div
                        className={cn(
                          "p-7 lg:p-10",
                          !imageFirst && "lg:order-1",
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            data-process-badge
                            className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-[19px] font-bold text-white"
                          >
                            {step.number}
                          </span>
                          <div>
                            <h3
                              data-process-copy
                              className="text-[22px] leading-tight font-bold tracking-[-0.01em] text-ink sm:text-[26px]"
                            >
                              {step.title}{" "}
                              <span className="text-teal-500">
                                {step.titleAccent}
                              </span>
                            </h3>
                            <span
                              data-process-rule
                              aria-hidden="true"
                              className="mt-3 block h-1 w-10 rounded-full bg-teal-400"
                            />
                          </div>
                        </div>

                        <p
                          data-process-copy
                          className="mt-5 text-[15px] leading-[1.7] text-muted"
                        >
                          {step.description}
                        </p>

                        <ul className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                          {step.points.map((point) => (
                            <li
                              key={point.label}
                              data-process-point
                              className="flex items-center gap-3"
                            >
                              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-teal-500/25 bg-teal-50 text-teal-600">
                                <Icon
                                  name={point.icon}
                                  size={18}
                                  strokeWidth={1.7}
                                />
                              </span>
                              <span className="text-[14px] leading-snug text-ink">
                                {point.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ProcessRow>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
