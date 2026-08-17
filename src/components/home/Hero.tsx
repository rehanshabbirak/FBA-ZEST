import Image from "next/image";
import heroAnalytics from "../../../public/images/home_hero_analytics.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Avatar } from "@/components/ui/Avatar";
import { Typewriter } from "@/components/ui/Typewriter";

const trustedBy = [
  "John Carter",
  "Sarah Mitchell",
  "Michael Brown",
  "Elena Ruiz",
  "David Kim",
];

const step = {
  eyebrow: "0ms",
  headlineA: "60ms",
  body: "260ms",
  actions: "360ms",
  trust: "460ms",
  visual: "200ms",
} as const;

const TYPING_STARTS_AT = 220;

export function Hero() {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="teal-glow animate-ambient-glow pointer-events-none absolute -top-[12%] -right-[10%] h-140 w-180"
      />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-10 lg:py-24">
        <div className="max-w-xl lg:max-w-none">
          <div className="hero-fade" style={{ animationDelay: step.eyebrow }}>
            <Eyebrow>Amazon Brand Management Experts</Eyebrow>
          </div>

          <h1 className="mt-5 text-[38px] leading-[1.08] font-extrabold tracking-[-0.02em] text-white sm:text-[48px] lg:text-[54px] xl:text-[58px]">
            <span className="hero-line-mask">
              <span
                className="hero-line"
                style={{ animationDelay: step.headlineA }}
              >
                We Build. We Grow.
              </span>
            </span>
            <Typewriter
              words={["You Win on Amazon."]}
              startDelay={TYPING_STARTS_AT}
              typeSpeed={45}
              deleteSpeed={25}
              holdTime={3000}
              loop
              className="text-teal-400 lg:whitespace-nowrap"
            />
          </h1>

          <p
            className="hero-fade mt-6 max-w-[46ch] text-[17px] leading-[1.65] text-white/70"
            style={{ animationDelay: step.body }}
          >
            From strategy to scale, we help Amazon brands increase visibility,
            drive sales, and maximize profitability.
          </p>

          <div
            className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: step.actions }}
          >
            <Button href="/services" size="lg">
              Our Services
            </Button>
            <Button href="/contact" variant="dark" size="lg">
              Get in Touch
            </Button>
          </div>

          <div
            className="hero-fade mt-12"
            style={{ animationDelay: step.trust }}
          >
            <p className="text-[13px] font-medium text-white/55">
              Trusted by 100+ Brands Worldwide
            </p>
            <ul className="mt-3 flex items-center">
              {trustedBy.map((name) => (
                <li key={name} className="-mr-2.5 last:mr-0">
                  <Avatar name={name} size={38} className="ring-2 ring-black" />
                </li>
              ))}
              <li
                aria-hidden="true"
                className="ml-2.5 flex size-9.5 items-center justify-center rounded-full border border-white/25 text-[15px] font-semibold text-white/80"
              >
                +
              </li>
            </ul>
          </div>
        </div>

        <div
          className="hero-fade relative"
          style={{ animationDelay: step.visual }}
        >
          <div className="animate-ambient-float">
            <Image
              src={heroAnalytics}
              alt="Amazon seller analytics dashboard on a laptop showing $1,234,567 in total sales, 25,643 orders and 18.6% ACOS, beside branded shipping boxes."
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 640px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
