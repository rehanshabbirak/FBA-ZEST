import Image from "next/image";
import officeImage from "../../../public/png/about_office.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { site } from "@/lib/site";

export function AboutHero() {
  return (
    <section className="bg-white">
      <Container className="grid items-center gap-14 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <Eyebrow>About {site.name}</Eyebrow>

          <h1 className="mt-4 max-w-[14ch] text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] text-ink sm:text-[42px] lg:text-[46px]">
            We Are Amazon Growth Partners
          </h1>

          <span
            aria-hidden="true"
            className="mt-6 block h-1 w-16 rounded-full bg-teal-500"
          />

          <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.7] text-muted">
            {site.name} is an Amazon brand management agency focused on helping
            brands thrive in one of the world&rsquo;s most competitive
            marketplaces. We combine marketplace expertise, data-driven
            strategies, and creative execution to drive sustainable growth and
            long-term success for our clients.
          </p>

          <Button href="/services" size="lg" className="mt-9">
            Our Services
          </Button>
        </Reveal>

        <Reveal delay={120} className="relative lg:pb-10">
          <Parallax className="rounded-lg" amount={6}>
            <Image
              src={officeImage}
              alt={`Inside the ${site.name} office — a meeting room with the wall statement "We Build Brands. We Drive Growth. We Deliver Results."`}
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 660px"
              className="h-auto w-full"
            />
          </Parallax>

          <div className="relative z-10 mx-4 -mt-12 rounded-lg border border-line bg-white p-6 shadow-card-hover sm:mx-8 lg:absolute lg:bottom-0 lg:-left-10 lg:mx-0 lg:mt-0 lg:max-w-110">
            <div className="flex items-start gap-4">
              <span className="flex size-13 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                <Icon name="target" size={26} strokeWidth={1.6} />
              </span>
              <div>
                <h2 className="text-[19px] font-bold text-ink">Our Purpose</h2>
                <p className="mt-2 text-[14px] leading-[1.6] text-muted">
                  To empower brands to reach their full potential on Amazon
                  through smart strategies, innovation, and relentless
                  execution.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
