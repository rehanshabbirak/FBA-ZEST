import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import type { ServiceFaq } from "@/lib/content/services";

export function ServiceFaqs({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <section className="bg-white">
      <Container className="py-16 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[2rem]">
            Questions We Get Asked First
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-1 w-14 rounded-full bg-teal-500"
          />
        </Reveal>

        <FaqAccordion
          columns={1}
          className="mx-auto mt-10 max-w-3xl"
          items={faqs.map((faq) => ({
            question: faq.question,
            answer: [faq.answer],
          }))}
        />
      </Container>
    </section>
  );
}
