import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

type LegalHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  updatedAt: string;
  artwork: StaticImageData;
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function LegalHero({
  eyebrow,
  title,
  titleAccent,
  description,
  updatedAt,
  artwork,
}: LegalHeroProps) {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <Container className="relative">
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12 lg:py-20">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-teal-400/35 bg-teal-500/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] text-teal-300 uppercase">
              {eyebrow}
            </span>

            <h1 className="mt-5 text-[36px] leading-[1.08] font-extrabold tracking-[-0.02em] text-white sm:text-[44px] lg:text-[52px]">
              {title} <span className="text-teal-400">{titleAccent}</span>
            </h1>

            <span
              aria-hidden="true"
              className="mt-5 block h-1 w-14 rounded-full bg-teal-500"
            />

            <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-white/70">
              {description}
            </p>

            <p className="mt-7 flex items-center gap-2.5 border-t border-white/10 pt-6 text-[13.5px] text-white/55">
              <Icon
                name="calendar"
                size={17}
                strokeWidth={1.7}
                className="shrink-0 text-teal-400"
              />
              Last updated:{" "}
              <time dateTime={updatedAt}>
                {DATE_FORMAT.format(new Date(`${updatedAt}T00:00:00Z`))}
              </time>
            </p>
          </div>

          <div className="relative mx-auto aspect-4/3 w-full max-w-130">
            <Image
              src={artwork}
              alt=""
              aria-hidden="true"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
