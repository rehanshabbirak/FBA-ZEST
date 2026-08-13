import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const values: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "search",
    title: "Transparency",
    description:
      "We believe in clear communication and complete transparency in everything we do.",
  },
  {
    icon: "rocket",
    title: "Performance",
    description:
      "We are obsessed with data and performance. Your growth is our success.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    description:
      "We stay ahead of the curve by continuously learning, testing, and innovating.",
  },
  {
    icon: "handshake",
    title: "Partnership",
    description:
      "We work as an extension of your team, aligned with your goals and vision.",
  },
  {
    icon: "star",
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in our strategies and execution.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-surface">
      <Container className="py-16 lg:py-24">
        <Reveal className="text-center">
          <Eyebrow>Our Values</Eyebrow>
          <h2 className="mt-4 text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[42px]">
            What Drives Us Every Day
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {values.map((value, i) => (
            <Reveal as="li" key={value.title} delay={i * 70} className="h-full">
              <div className="card-lift group flex h-full flex-col items-center rounded-lg border border-line bg-white px-5 py-9 text-center shadow-card hover:border-teal-400">
                <Icon
                  name={value.icon}
                  size={36}
                  strokeWidth={1.5}
                  className="text-teal-500 transition-[color,transform] duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:scale-108 group-hover:text-teal-400"
                />
                <h3 className="mt-6 text-[16px] font-bold text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.65] text-muted">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
