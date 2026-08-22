import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { bookingUrl, site } from "@/lib/site";

type Channel = {
  icon: IconName;
  title: string;
  lines: { text: string; href?: string }[];
  note?: string;
};

const channels: Channel[] = [
  {
    icon: "mail",
    title: "Email Us",
    lines: [{ text: site.email, href: `mailto:${site.email}` }],
    note: "We typically reply within 24 hours",
  },
  {
    icon: "phone",
    title: "Call Us",
    lines: [{ text: site.phone, href: `tel:${site.phoneHref}` }],
    note: "Mon – Fri, 9:00 AM – 6:00 PM (PST)",
  },
  {
    icon: "location-pin",
    title: "Our Office",
    lines: [{ text: site.address }],
    note: "We welcome visitors by appointment",
  },
  {
    icon: "clock",
    title: "Business Hours",
    lines: [{ text: "Monday – Friday" }, { text: "9:00 AM – 6:00 PM (PST)" }],
    note: "Weekend: Closed",
  },
];

export function ContactChannels() {
  return (
    <aside>
      <h2 className="text-[24px] font-bold text-ink lg:text-[26px]">
        Get in Touch
      </h2>
      <span
        aria-hidden="true"
        className="mt-3 block h-0.5 w-12 rounded bg-teal-500"
      />

      <p className="mt-5 max-w-[44ch] text-[14px] leading-[1.65] text-muted">
        We&rsquo;re here to help you succeed on Amazon. Reach out to us through
        any of the following channels.
      </p>

      {/* Sits above the channel list: booking is the fastest route to a
          conversation, and it is the one channel the form cannot replace. */}
      <div className="mt-6 rounded-lg border border-teal-500/25 bg-teal-50 p-5">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
            <Icon name="calendar" size={19} strokeWidth={1.7} />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-ink">Book a Free Call</p>
            <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted">
              Prefer to talk it through? Pick a 30-minute slot that suits you
              and speak with an Amazon specialist no waiting on a reply.
            </p>
          </div>
        </div>
        <Button href={bookingUrl} fullWidth className="mt-4">
          Schedule on Calendly
        </Button>
      </div>

      <ul className="mt-4 flex flex-col gap-4">
        {channels.map((channel) => (
          <li
            key={channel.title}
            className="flex items-start gap-4 rounded-lg border border-line bg-surface p-5"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
              <Icon name={channel.icon} size={19} strokeWidth={1.7} />
            </span>

            <div className="min-w-0">
              <p className="text-[15px] font-bold text-ink">{channel.title}</p>

              {channel.lines.map((line) =>
                line.href ? (
                  <a
                    key={line.text}
                    href={line.href}
                    className="mt-1.5 block text-[13.5px] break-words text-teal-600 transition-colors duration-200 hover:text-teal-500"
                  >
                    {line.text}
                  </a>
                ) : (
                  <span
                    key={line.text}
                    className="mt-1.5 block text-[13.5px] leading-[1.5] text-muted"
                  >
                    {line.text}
                  </span>
                ),
              )}

              {channel.note ? (
                <p className="mt-2 text-[12.5px] text-subtle">{channel.note}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
