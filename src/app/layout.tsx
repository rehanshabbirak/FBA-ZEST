import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "From strategy to scale, we help Amazon brands increase visibility, drive sales, and maximize profitability.",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Amazon Brand Management Agency`,
    description:
      "From strategy to scale, we help Amazon brands increase visibility, drive sales, and maximize profitability.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col antialiased"
      >
        {children}
      </body>
    </html>
  );
}
