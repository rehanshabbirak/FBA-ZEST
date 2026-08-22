import Image from "next/image";
import { brandLogos } from "@/lib/content/brands";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type TrustBarProps = {
  heading: string;
  /** Hairline rules above and below the band, to separate it from a neighbouring light section. */
  dividers?: boolean;
};

export function TrustBar({ heading, dividers = false }: TrustBarProps) {
  return (
    <section
      data-testid="trust-bar"
      aria-label="Brands we work with"
      className={cn("bg-surface", dividers && "border-y border-line")}
    >
      <Container className="py-10 lg:py-12">
        <Reveal>
          <p className="text-center text-[14px] text-muted">{heading}</p>

          {/*
            Two identical copies of the list scroll as one track; the animation
            travels exactly half its width, so the second copy lands where the
            first started and the loop has no seam. Spacing lives on the items
            rather than a flex gap, which would add one extra gap to the track
            and break that alignment.
          */}
          <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
            <ul className="flex w-max animate-logo-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6">
              {[...brandLogos, ...brandLogos].map((brand, index) => {
                const duplicate = index >= brandLogos.length;

                return (
                  <li
                    key={`${brand.name}-${index}`}
                    aria-hidden={duplicate}
                    className={cn(
                      "flex shrink-0 items-center justify-center px-7 lg:px-9",
                      duplicate && "motion-reduce:hidden",
                    )}
                  >
                    <Image
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      width={brand.width}
                      height={brand.height}
                      className="h-9 w-auto max-w-[130px] object-contain opacity-75 grayscale transition duration-300 ease-out-soft hover:opacity-100 hover:grayscale-0 lg:h-11 lg:max-w-[150px]"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
