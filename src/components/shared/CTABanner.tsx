import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

type CTABannerProps = {
  icon?: IconName;
  /** Replaces the icon badge with artwork, e.g. a brand mark. */
  logo?: StaticImageData;
  /** Decorative artwork anchored to the right edge of the banner. */
  backdrop?: StaticImageData;
  title: string;
  description: string;
  /** Closing invitation shown under the description, brighter than body copy. */
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CTABanner({
  icon = "rocket",
  logo,
  backdrop,
  title,
  description,
  note,
  ctaLabel = "Get a Free Consultation",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section data-testid="cta-banner" className="bg-white">
      <Container className="py-14 lg:py-16">
        <Reveal>
          <div className="relative flex flex-col items-center gap-7 overflow-hidden rounded-lg bg-black px-7 py-10 text-center lg:flex-row lg:justify-between lg:px-12 lg:py-11 lg:text-left">
            {backdrop ? (
              // Anchored to the right so the artwork sits just inside the CTA
              // rather than drifting behind the copy. Only shown on lg, where
              // the banner is a row and there is space beside the text.
              <Image
                src={backdrop}
                alt=""
                aria-hidden="true"
                sizes="560px"
                className="pointer-events-none absolute top-1/2 right-[8%] hidden h-[95%] w-auto max-w-none -translate-y-1/2 opacity-90 lg:block"
              />
            ) : null}

            <div
              aria-hidden="true"
              className="teal-glow pointer-events-none absolute -top-[60%] -left-[8%] h-90 w-130 opacity-60"
            />

            <div className="relative flex flex-col items-center gap-5 lg:flex-row lg:gap-6">
              {logo ? (
                <Image
                  src={logo}
                  alt=""
                  placeholder="blur"
                  className="h-16 w-auto shrink-0 lg:h-20"
                />
              ) : (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-teal-500/40 bg-teal-500/10 text-teal-400">
                  <Icon name={icon} size={26} strokeWidth={1.6} />
                </span>
              )}
              <div>
                <h2 className="text-[22px] leading-tight font-bold text-white lg:text-[26px]">
                  {title}
                </h2>
                <p className="mt-2 max-w-[64ch] text-[15px] leading-relaxed text-white/70">
                  {description}
                </p>
                {note ? (
                  <p className="mt-2.5 max-w-[64ch] text-[15px] leading-relaxed font-medium text-white">
                    {note}
                  </p>
                ) : null}
              </div>
            </div>

            <Button href={ctaHref} size="lg" className="relative shrink-0">
              {ctaLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
