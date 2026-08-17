import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { services } from "@/lib/content/services";

export function Services() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <VideoBackground
        src="/videos/background-video.mp4"
        videoClassName="brightness-112 contrast-106 saturate-112"
        overlayClassName="bg-linear-to-b from-black/78 from-0% via-black/30 via-52% to-black/55 after:absolute after:inset-0 after:bg-teal-800/8"
      />

      <Container className="relative z-10 py-16 lg:py-24">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>What We Do</Eyebrow>
            <RevealText className="mt-4 max-w-[16ch] text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[38px] lg:text-[42px]">
              End-to-End Amazon Brand Management
            </RevealText>
          </div>
          <p className="max-w-[52ch] text-[16px] leading-[1.65] text-white/85 lg:pb-2">
            We provide data-driven strategies and hands-on execution to help
            your brand stand out and scale profitably.
          </p>
        </Reveal>

        <StaggerCards className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.id} className="h-full">
              <Link
                href={`/services#${service.id}`}
                className="card-tint-lift group flex h-full flex-col items-center rounded-lg border border-white/12 bg-black/55 px-5 py-8 text-center backdrop-blur-sm hover:border-teal-400/60"
              >
                <Icon
                  name={service.icon}
                  size={38}
                  strokeWidth={1.5}
                  className="text-teal-400 transition-[color,transform] duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:scale-108 group-hover:text-teal-300"
                />
                <h3 className="mt-6 text-[15px] font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-white/65">
                  {service.description}
                </p>
              </Link>
            </li>
          ))}
        </StaggerCards>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/services" size="lg">
            Explore All Services
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
