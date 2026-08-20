import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { bookingUrl, site, socialLinks } from "@/lib/site";

const divider = <span aria-hidden="true" className="h-3.5 w-px bg-white/15" />;

/**
 * Utility strip above the header. Scrolls away with the page: only the header
 * below it is sticky, so the nav is not pushed off by a second fixed bar.
 */
export function TopBar() {
  return (
    <div className="border-b border-white/8 bg-dark-surface">
      <Container className="flex h-10 items-center justify-center gap-4 md:justify-between">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 text-[13px] font-semibold text-teal-400 transition-colors duration-200 hover:text-teal-300 md:inline-flex"
        >
          <Icon name="phone" size={15} className="shrink-0" />
          Schedule a Call
        </a>

        <div className="flex items-center gap-3 text-[13px] text-white/70 sm:gap-4">
          {/* Narrow screens keep both channels but drop to the icon alone: the
              address and a 15-digit number will not sit side by side at 360px.
              aria-label carries the value the hidden text would have read. */}
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-teal-400"
          >
            <Icon name="mail" size={15} className="shrink-0 text-white/50" />
            <span className="hidden sm:inline">{site.email}</span>
          </a>

          {divider}

          <a
            href={`tel:${site.phoneHref}`}
            aria-label={`Call ${site.phone}`}
            className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-teal-400"
          >
            <Icon name="phone" size={15} className="shrink-0 text-white/50" />
            <span className="hidden sm:inline">{site.phone}</span>
          </a>

          {divider}

          <ul className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="block text-white/55 transition-colors duration-200 hover:text-teal-400"
                >
                  <Icon name={social.icon} size={15} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
