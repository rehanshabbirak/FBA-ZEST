import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fbazest.com"),
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
    // Opts back into Next's scroll-behavior override during route transitions:
    // without it, globals.css `scroll-behavior: smooth` makes every navigation
    // smooth-scroll to the top instead of jumping there.
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col antialiased"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-teal-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
