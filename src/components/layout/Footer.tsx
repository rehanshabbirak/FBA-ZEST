import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  legalNav,
  mainNav,
  resourceNav,
  serviceNav,
  site,
  socialLinks,
  type NavItem,
} from "@/lib/site";

function LinkColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h3 className="text-[15px] font-bold text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link
              href={item.href}
              className="text-[14px] text-white/60 transition-colors duration-200 hover:text-teal-400"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: IconName;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-teal-500/12 text-teal-400">
        <Icon name={icon} size={16} />
      </span>
      <span className="text-[14px] leading-relaxed">
        <span className="block font-semibold text-white">{label}</span>
        <span className="text-white/60">{children}</span>
      </span>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr_1.3fr] lg:gap-8 lg:py-16">
        <div>
          <Logo size="md" />
          <p className="mt-6 max-w-[26ch] text-[14px] leading-relaxed text-white/60">
            {site.description}
          </p>
          <ul className="mt-7 flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors duration-200 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
                >
                  <Icon name={social.icon} size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <LinkColumn title="Quick Links" items={mainNav} />
        <LinkColumn title="Our Services" items={serviceNav} />
        <LinkColumn title="Resources" items={resourceNav} />

        <div>
          <h3 className="text-[15px] font-bold text-white">Contact Us</h3>
          <ul className="mt-5 space-y-4">
            <ContactRow icon="mail" label="Email">
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-teal-400"
              >
                {site.email}
              </a>
            </ContactRow>
            <ContactRow icon="phone" label="Phone">
              <a
                href={`tel:${site.phoneHref}`}
                className="transition-colors hover:text-teal-400"
              >
                {site.phone}
              </a>
            </ContactRow>
            <ContactRow icon="location-pin" label="Location">
              {site.address}
            </ContactRow>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} Account Management Agency.
            All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-teal-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
