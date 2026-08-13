import type { SVGProps } from "react";

const paths = {
  "arrow-right": <path d="M4 12h16M13 5l7 7-7 7" />,
  "arrow-up-right": <path d="M5 19 19 5M8 5h11v11" />,
  "bar-up": (
    <>
      <path d="M4 19V9M10 19V5M16 19V12M22 19V2" />
      <path d="M2 19h21" />
    </>
  ),
  box: <path d="M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2 11h10l3-8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
  "chart-bar": <path d="M4 20V10M10 20V5M16 20v-8M22 20H2" />,
  "chart-line": (
    <>
      <path d="M3 19V5M3 19h18" />
      <path d="m6 15 4-4 3 2 6-7" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V6M16 20V12M22 20V3" />
      <path d="M2 20h21" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  cursor: <path d="M5 3l4 15 3-5 5 3 2-3-5-3 5-2z" />,
  document: (
    <>
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v5h5M9 11h6M9 15h6M9 19h4" />
    </>
  ),
  "external-link": (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </>
  ),
  facebook: (
    <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  "growth-arrow": (
    <>
      <path d="M4 18 10 12l4 4 6-8" />
      <path d="M15 8h5v5" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 9l4-4 5 2 4-2 5 5-4 4-3-2-3 3-8-6z" />
      <path d="M7 5l3 3M17 5l-3 3" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.5" />
      <path d="M4 17l5-5 4 4 2-2 5 4" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" />
    </>
  ),
  lightbulb: (
    <path d="M9 18h6M10 21h4M8 14c-2-1.3-3-3-3-5a7 7 0 0 1 14 0c0 2-1 3.7-3 5l-1 2h-6z" />
  ),
  lightning: <path d="m13 2-9 12h7l-1 8 9-13h-7Z" />,
  linkedin: <path d="M5 8v11M5 5v.1M10 19v-6a4 4 0 0 1 8 0v6M10 11V8" />,
  "location-pin": (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-6.5 7-12A7 7 0 0 0 5 9c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  megaphone: <path d="M3 11v2l13 5V6zM16 8v8M7 16l2 5h3l-2-4" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  phone: (
    <path d="M7 3l3 3-2 3c1.5 3 2.5 4 5.5 5.5l3-2 3 3-2 3c-7 1-15-7-14-14z" />
  ),
  "pie-chart": (
    <>
      <path d="M12 3a9 9 0 1 0 9 9h-9Z" />
      <path d="M12 3v9h9" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  quote: (
    <path d="M9 8H5v5h4v4H5v-4c0-3.9 1.5-5.8 4-7Zm10 0h-4v5h4v4h-4v-4c0-3.9 1.5-5.8 4-7Z" />
  ),
  rocket: (
    <>
      <path d="M14 4c4-3 6-2 6-2s1 2-2 6l-6 6-4-4z" />
      <path d="M8 10L4 11l-2 4 5-1M14 16l-1 5 4-2 1-4" />
      <circle cx="16" cy="7" r="1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M16 16l5 5" />
    </>
  ),
  send: (
    <>
      <path d="m3 4 18 8-18 8 3-8-3-8Z" />
      <path d="M6 12h8" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6z" />
      <path d="M8 12l2.5 2.5L16 9" />
    </>
  ),
  star: (
    <path d="M12 2l3 6 7 .9-5 4.8 1.2 7-6.2-3.3-6.2 3.3 1.2-7-5-4.8L9 8z" />
  ),
  tag: (
    <>
      <path d="M3 4v7l9 9 8-8-9-8z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  trophy: (
    <path d="M8 4h8v5a4 4 0 0 1-8 0zM12 13v5M8 21h8M5 5H2v2a4 4 0 0 0 4 4M19 5h3v2a4 4 0 0 1-4 4" />
  ),
  "twitter-x": <path d="M5 4 19 20M19 4 5 20" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M15 15c3 0 5 2 5 5" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
  title?: string;
};

export function Icon({ name, size = 24, title, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
