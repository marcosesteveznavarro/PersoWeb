"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { LanguageSwitcher } from "./language-switcher";
import { Close, Menu } from "@/components/icons";

const LINKS = [
  { id: "services", href: "/#servicios" },
  { id: "process", href: "/#proceso" },
  { id: "work", href: "/#trabajo" },
  { id: "about", href: "/#sobre-mi" },
  { id: "stack", href: "/#stack" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Al abrir el menú móvil, lleva el foco al primer enlace para teclado/lector.
  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-header)] transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-[var(--nav-h)] items-center gap-6">
        {/* Wordmark — nombre completo */}
        <Link
          href="/"
          className="group inline-flex shrink-0 items-baseline gap-1.5 whitespace-nowrap font-display text-[1.3rem] font-semibold tracking-[-0.02em] md:text-[1.5rem]"
          aria-label={SITE.shortName}
        >
          <span>{SITE.shortName}</span>
          <span className="mb-1 inline-block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
        </Link>

        {/* Desktop nav — 5 ítems centrados por flex (sin absolute) */}
        <nav
          aria-label="Primary"
          className="mono hidden flex-1 items-center justify-center gap-[26px] text-[11px] uppercase tracking-[0.16em] md:flex"
        >
          {LINKS.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className="group relative text-ink-dim transition-colors duration-200 hover:text-ink"
            >
              {t(l.id)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <LanguageSwitcher />
          <span className="h-4 w-px bg-line" />
          <Magnetic>
            <Button href="/#contacto" size="md" arrow>
              {t("cta")}
            </Button>
          </Magnetic>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("close") : t("menu")}
            className="inline-grid h-11 w-11 place-items-center rounded-sm text-ink"
          >
            {open ? (
              <Close className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        data-lenis-prevent
        hidden={!open}
        className={cn(
          "shell flex flex-col gap-8 overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-md md:hidden",
          open ? "pointer-events-auto py-10" : "pointer-events-none",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-5">
          {[...LINKS, { id: "contact", href: "/#contacto" }].map((l) => (
            <Link
              key={l.id}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-ink"
            >
              {t(l.id)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-line pt-6">
          <LanguageSwitcher />
          <Button href="/#contacto" arrow onClick={() => setOpen(false)}>
            {t("cta")}
          </Button>
        </div>
      </div>
    </header>
  );
}
