import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const brands: { name: string; sub?: string; className?: string }[] = [
  { name: "UGREEN", className: "font-extrabold tracking-[-0.01em]" },
  { name: "ORTIZ", sub: "Gaming", className: "font-bold tracking-[0.02em]" },
  { name: "vivicti", className: "font-medium lowercase tracking-[0.01em]" },
  { name: "JUGLANA", className: "font-normal tracking-[0.18em]" },
  { name: "MAVEN", sub: "Threads", className: "font-normal tracking-[0.14em]" },
  { name: "YEK", sub: "Bags", className: "font-normal tracking-[0.2em]" },
];

type TrustBarProps = {
  heading: string;
  dividers?: boolean;
};

export function TrustBar({ heading, dividers = false }: TrustBarProps) {
  return (
    <section aria-label="Brands we work with" className="bg-surface">
      <Container className="py-12 lg:py-14">
        <Reveal>
          <p className="text-center text-[14px] text-muted">{heading}</p>

          <ul
            className={cn(
              "mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-4",
              dividers && "lg:divide-x lg:divide-line",
            )}
          >
            {brands.map((brand) => (
              <li
                key={brand.name}
                className={cn(
                  "flex flex-col items-center text-center text-ink/80 transition-colors duration-200 hover:text-ink",
                  dividers && "lg:flex-1 lg:px-6",
                )}
              >
                <span
                  className={cn("text-[22px] leading-none", brand.className)}
                >
                  {brand.name}
                </span>
                {brand.sub ? (
                  <span className="mt-1.5 text-[9px] font-medium tracking-[0.3em] text-subtle uppercase">
                    {brand.sub}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
