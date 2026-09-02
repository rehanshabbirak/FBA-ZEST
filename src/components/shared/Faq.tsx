import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { faqs } from "@/lib/content/faq";

export function Faq() {
  return (
    <section data-testid="faq" id="faq" className="scroll-mt-24 bg-white">
      <Container className="py-10 lg:py-12">
        <Reveal className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <RevealText className="mt-4 text-[2.125rem] leading-[1.12] font-bold tracking-[-0.02em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
            Frequently Asked Questions
          </RevealText>
          <span
            aria-hidden
            className="mx-auto mt-5 block h-1 w-14 rounded-full bg-teal-500"
          />
        </Reveal>

        <FaqAccordion items={faqs} className="mt-10" />
      </Container>
    </section>
  );
}
