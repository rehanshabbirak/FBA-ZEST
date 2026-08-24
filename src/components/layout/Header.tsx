"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { bookingUrl, mainNav, serviceNav } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeTimer = useRef(0);

  const openMenu = useCallback((href: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(href);
  }, []);

  // A short grace period keeps the panel up while the pointer travels the gap
  // between the trigger and the panel, so a diagonal path does not dismiss it.
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-black transition-shadow duration-200 ease-out-soft",
        scrolled && "shadow-[0_0.0625rem_0_0_rgba(255,255,255,0.10)]",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo priority />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const submenu = item.href === "/services" ? serviceNav : null;
              const showing = submenu !== null && menu === item.href;

              return (
                <li
                  key={item.href}
                  className={submenu ? "relative" : undefined}
                  onMouseEnter={submenu ? () => openMenu(item.href) : undefined}
                  onMouseLeave={submenu ? scheduleClose : undefined}
                  // Capture phase so tabbing out of any panel link closes it.
                  onBlurCapture={
                    submenu
                      ? (e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) {
                            setMenu(null);
                          }
                        }
                      : undefined
                  }
                >
                  {submenu ? (
                    // Label and chevron are separate controls: the label goes
                    // to the section's own page, the chevron opens the panel.
                    // They cannot be one element — the label has to be a link
                    // to navigate, and a button nested inside a link is invalid
                    // markup. Splitting them also keeps the panel reachable on
                    // touch, which never fires the hover that opens it.
                    <div className="relative flex h-18 items-center gap-1.5">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "text-[0.9375rem] font-medium transition-colors duration-200",
                          active
                            ? "text-teal-400"
                            : "text-white/85 hover:text-white",
                        )}
                      >
                        {item.label}
                      </Link>

                      <button
                        suppressHydrationWarning
                        type="button"
                        onClick={() =>
                          showing ? setMenu(null) : openMenu(item.href)
                        }
                        aria-expanded={showing}
                        aria-haspopup="true"
                        aria-label={`${showing ? "Hide" : "Show"} ${item.label} menu`}
                        className={cn(
                          "inline-flex cursor-pointer items-center transition-colors duration-200",
                          active
                            ? "text-teal-400"
                            : "text-white/85 hover:text-white",
                        )}
                      >
                        <Icon
                          name="chevron-down"
                          size={15}
                          className={cn(
                            "shrink-0 transition-transform duration-200 ease-out-soft",
                            showing && "-rotate-180",
                          )}
                        />
                      </button>

                      <span
                        className={cn(
                          "absolute bottom-5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-teal-400 transition-opacity duration-200",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-18 items-center text-[0.9375rem] font-medium transition-colors duration-200",
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
                  )}

                  {submenu ? (
                    <div
                      // Delegated to the panel only: a same-page anchor never
                      // unmounts the header, so the panel must close itself.
                      onClick={() => setMenu(null)}
                      className={cn(
                        "absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2 transition duration-200 ease-out-soft",
                        showing
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0",
                      )}
                    >
                      <ul className="w-72 rounded-[0.875rem] border border-white/10 bg-black p-2 shadow-[0_1.5rem_3rem_-0.75rem_rgba(0,0,0,0.85)]">
                        {submenu.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              tabIndex={showing ? undefined : -1}
                              className="group/item flex items-center gap-3 rounded-[0.625rem] px-3 py-2.5 text-[0.875rem] font-medium text-white/80 transition-colors duration-200 hover:bg-white/8 hover:text-white"
                            >
                              {service.icon ? (
                                <Icon
                                  name={service.icon}
                                  size={17}
                                  className="shrink-0 text-teal-400"
                                />
                              ) : null}
                              {service.label}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-white/10 pt-1">
                          <Link
                            href={item.href}
                            tabIndex={showing ? undefined : -1}
                            className="group/all flex items-center gap-2 rounded-[0.625rem] px-3 py-2.5 text-[0.875rem] font-semibold text-teal-400 transition-colors duration-200 hover:bg-white/8"
                          >
                            View all services
                            <Icon
                              name="arrow-right"
                              size={15}
                              className="shrink-0 transition-transform duration-200 ease-out-soft group-hover/all:translate-x-0.5"
                            />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button href={bookingUrl}>Get a Free Consultation</Button>
          </div>

          <button
            suppressHydrationWarning
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-[0.625rem] text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        onClick={() => {
          setOpen(false);
          setExpanded(null);
        }}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--spacing)*18)] overflow-y-auto border-t border-white/10 bg-black shadow-[0_1.125rem_2.5rem_-0.75rem_rgba(0,0,0,0.75)] lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                const submenu = item.href === "/services" ? serviceNav : null;
                const isOpen = submenu !== null && expanded === item.href;

                return (
                  <li key={item.href}>
                    {submenu ? (
                      <button
                        suppressHydrationWarning
                        type="button"
                        // The menu wrapper closes on any click inside it, so
                        // expanding has to stop the event from reaching it.
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(isOpen ? null : item.href);
                        }}
                        aria-expanded={isOpen}
                        className={cn(
                          "flex min-h-11 w-full cursor-pointer items-center justify-between border-b border-white/8 py-3 text-[0.9375rem] font-medium transition-colors",
                          active
                            ? "text-teal-400"
                            : "text-white/85 hover:text-white",
                        )}
                      >
                        {item.label}
                        <Icon
                          name="chevron-down"
                          size={18}
                          className={cn(
                            "shrink-0 transition-transform duration-200 ease-out-soft",
                            isOpen ? "-rotate-180" : "opacity-50",
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center justify-between border-b border-white/8 py-3 text-[0.9375rem] font-medium transition-colors",
                          active
                            ? "text-teal-400"
                            : "text-white/85 hover:text-white",
                        )}
                      >
                        {item.label}
                        <Icon
                          name="chevron-right"
                          size={18}
                          className="shrink-0 opacity-50"
                        />
                      </Link>
                    )}

                    {submenu ? (
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-out-soft",
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <ul className="overflow-hidden">
                          {submenu.map((service) => (
                            <li key={service.href}>
                              <Link
                                href={service.href}
                                tabIndex={isOpen ? undefined : -1}
                                className="flex min-h-11 items-center gap-3 border-b border-white/5 py-2.5 pl-4 text-[0.875rem] text-white/70 transition-colors hover:text-white"
                              >
                                {service.icon ? (
                                  <Icon
                                    name={service.icon}
                                    size={16}
                                    className="shrink-0 text-teal-400"
                                  />
                                ) : null}
                                {service.label}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={item.href}
                              tabIndex={isOpen ? undefined : -1}
                              className="flex min-h-11 items-center gap-2 border-b border-white/5 py-2.5 pl-4 text-[0.875rem] font-semibold text-teal-400 transition-colors hover:text-teal-300"
                            >
                              View all services
                              <Icon
                                name="arrow-right"
                                size={15}
                                className="shrink-0"
                              />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>
          <Button href={bookingUrl} fullWidth size="lg" className="mt-5">
            Get a Free Consultation
          </Button>
        </Container>
      </div>
    </header>
  );
}
