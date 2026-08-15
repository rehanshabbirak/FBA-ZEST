"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-black transition-shadow duration-200 ease-out-soft",
        scrolled && "shadow-[0_1px_0_0_rgba(255,255,255,0.10)]",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo priority />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-18 items-center text-[15px] font-medium transition-colors duration-200",
                      active
                        ? "text-teal-400"
                        : "text-white/85 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-teal-400 transition-opacity duration-200",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button href="/contact">Get a Free Consultation</Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-[10px] text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </Container>

      {/* Overlays the page instead of sitting in flow: in flow it grew the
          sticky header and pushed the content down when opened. `top-full`
          resolves against the sticky header, so it hangs just below the bar. */}
      <div
        id="mobile-nav"
        hidden={!open}
        onClick={() => setOpen(false)}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--spacing)*18)] overflow-y-auto border-t border-white/10 bg-black shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center justify-between border-b border-white/8 py-3 text-[15px] font-medium transition-colors",
                        active
                          ? "text-teal-400"
                          : "text-white/85 hover:text-white",
                      )}
                    >
                      {item.label}
                      <Icon
                        name="chevron-right"
                        size={18}
                        className="opacity-50"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Button href="/contact" fullWidth size="lg" className="mt-5">
            Get a Free Consultation
          </Button>
        </Container>
      </div>
    </header>
  );
}
