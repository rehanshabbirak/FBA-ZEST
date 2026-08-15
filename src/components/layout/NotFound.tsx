import Image from "next/image";
import Link from "next/link";
import artwork from "../../../public/png/404-page-image.png";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

const ARTWORK_ALT =
  "A monitor showing a missing page with a sad face, examined by a magnifying glass, surrounded by floating Amazon sales and analytics charts.";

const helpfulLinks: {
  href: string;
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    href: "/services",
    icon: "layers",
    title: "Our Services",
    description: "Explore how we grow Amazon brands",
  },
  {
    href: "/case-studies",
    icon: "chart-line",
    title: "Case Studies",
    description: "See real results we've delivered",
  },
  {
    href: "/about",
    icon: "users",
    title: "About Us",
    description: "Learn more about FBA Zest",
  },
  {
    href: "/contact",
    icon: "chat",
    title: "Contact Us",
    description: "Talk to our Amazon growth experts",
  },
];

export function NotFound() {
  return (
    <section className="bg-hero-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="teal-glow animate-ambient-glow pointer-events-none absolute top-[8%] right-[6%] h-120 w-140 opacity-50"
      />

      <Container className="relative py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="max-w-xl">
            <p className="text-[13px] font-bold tracking-[0.34em] text-teal-400 uppercase">
              Oops!
            </p>

            <p className="mt-4 text-[104px] leading-[0.92] font-extrabold tracking-[-0.045em] text-white sm:text-[132px] lg:text-[150px]">
              4<span className="text-teal-500">0</span>4
            </p>

            <h1 className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.02em] text-white sm:text-[42px] lg:text-[48px]">
              Page Not Found
            </h1>

            <span
              aria-hidden="true"
              className="mt-6 block h-px w-20 bg-white/25"
            />

            <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.7] text-white/65">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been
              moved. Let&rsquo;s get you back on track.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/" size="lg" iconPosition="start">
                Back to Home
              </Button>
              <Button href="/services" variant="dark" size="lg">
                Explore Our Services
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src={artwork}
              alt={ARTWORK_ALT}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-7 lg:mt-16 lg:px-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-0">
            <div className="flex items-center gap-4 lg:pr-8">
              <span className="flex size-13 shrink-0 items-center justify-center rounded-full border border-teal-500/40 bg-teal-500/10 text-teal-400">
                <Icon name="compass" size={24} strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-[16px] font-bold text-white">
                  Not sure where to go?
                </p>
                <p className="mt-1 text-[13.5px] leading-[1.5] text-white/55">
                  Here are some helpful links to get you started.
                </p>
              </div>
            </div>

            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 lg:border-l lg:border-white/10 lg:px-6"
              >
                <Icon
                  name={link.icon}
                  size={20}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-teal-400"
                />
                <span>
                  <span className="block text-[14.5px] font-bold text-white transition-colors duration-200 group-hover:text-teal-400">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-[1.5] text-white/55">
                    {link.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
