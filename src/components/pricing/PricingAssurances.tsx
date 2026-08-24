import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { pricingAssurances } from "@/lib/content/pricing";

export function PricingAssurances() {
  return (
    <section className="bg-white">
      <Container className="pb-14 lg:pb-18">
        <Reveal>
          <ul className="bg-hero-dark grid gap-8 rounded-xl px-7 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10 lg:px-4">
            {pricingAssurances.map((item) => (
              <li
                key={item.title}
                className="flex flex-col items-center gap-3 text-center lg:px-7"
              >
                <Icon
                  name={item.icon}
                  size={30}
                  strokeWidth={1.5}
                  className="text-teal-400"
                />
                <h2 className="text-[0.9375rem] leading-snug font-bold text-white">
                  {item.title}
                </h2>
                <p className="max-w-[34ch] text-[0.8125rem] leading-[1.65] text-white/60">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
