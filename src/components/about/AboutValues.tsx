import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { DragCarousel } from "@/components/motion/DragCarousel";
import { GrowthBackdrop } from "@/components/motion/GrowthBackdrop";

const values: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield-check",
    title: "Integrity",
    description: "We believe in honesty and transparency in everything we do.",
  },
  {
    icon: "star",
    title: "Excellence",
    description:
      "We're committed to providing outstanding services and continuously improving.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    description:
      "We use cutting-edge tools and strategies to keep you ahead of the competition.",
  },
  {
    icon: "handshake",
    title: "Client-Centric",
    description:
      "Your success is our priority, and we tailor our services to meet your unique needs.",
  },
];

export function AboutValues() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-800 via-teal-900 to-dark-900">
      <GrowthBackdrop className="text-teal-200 opacity-45 mask-[linear-gradient(to_right,transparent_0%,#000_7%,#000_93%,transparent_100%)]" />

      <Container className="relative z-10 py-16 lg:py-24">
        <Reveal className="text-center">
          <Eyebrow tone="onTeal">Our Values</Eyebrow>
          <RevealText className="mt-4 text-3xl leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[2.375rem] lg:text-[2.625rem]">
            What Drives Us Every Day
          </RevealText>
        </Reveal>

        <DragCarousel
          ariaLabel="Our values"
          tone="dark"
          className="mt-12"
          itemClassName="w-[86%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
        >
          {values.map((value) => (
            <div key={value.title} className="h-full">
              <div className="card-lift group flex h-full min-h-56 flex-col items-center justify-center rounded-lg border border-line bg-white px-8 py-10 text-center shadow-card hover:border-teal-400 lg:px-9 lg:py-12">
                <span className="flex size-16 items-center justify-center rounded-full bg-teal-50 text-teal-500 transition-[background-color,transform] duration-300 ease-out-soft group-hover:scale-105 group-hover:bg-teal-100">
                  <Icon name={value.icon} size={32} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-[1.25rem] font-bold text-ink lg:text-[1.375rem]">
                  {value.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.7] text-muted">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </DragCarousel>
      </Container>
    </section>
  );
}
