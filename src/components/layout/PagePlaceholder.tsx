import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="teal-glow pointer-events-none absolute -top-[30%] -right-[10%] h-130 w-160 opacity-60"
      />
      <Container className="relative flex min-h-[60vh] flex-col justify-center py-20 lg:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-[18ch] text-[36px] leading-[1.1] font-extrabold tracking-[-0.02em] text-white sm:text-[46px] lg:text-[54px]">
          {title}
        </h1>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-white/65">
          {description}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free Consultation
          </Button>
          <Button href="/" variant="dark" size="lg" icon={null}>
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
