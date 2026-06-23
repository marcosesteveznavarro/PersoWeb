"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

/**
 * RAIL DE MISIÓN — navegación HUD fija en el borde izquierdo. Lista las
 * secciones como nodos; el de la sección activa se enciende (relleno de acento +
 * glow), muestra su etiqueta y crece. Cada nodo es un ancla a su sección.
 *
 * - Oculto < 1240 px (la nav de la cabecera cubre esos tamaños).
 * - No re-renderiza por scroll: muta `data-active` por ref dentro de un rAF +
 *   scroll listener (barato). El estilo activo/inactivo es 100% CSS.
 */

const ITEMS = [
  { id: "inicio", href: "#top", labelKey: "home" },
  { id: "servicios", href: "#servicios", labelKey: "services" },
  { id: "proceso", href: "#proceso", labelKey: "process" },
  { id: "trabajo", href: "#trabajo", labelKey: "work" },
  { id: "sobre-mi", href: "#sobre-mi", labelKey: "about" },
  { id: "stack", href: "#stack", labelKey: "stack" },
  { id: "contacto", href: "#contacto", labelKey: "contact" },
] as const;

export function MissionRail() {
  const t = useTranslations("nav");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.4;
      let current: string = ITEMS[0].id;
      for (const it of ITEMS) {
        const sel = it.id === "inicio" ? "#top, [data-station='inicio']" : "#" + it.id;
        const node = document.querySelector(sel);
        if (node && node.getBoundingClientRect().top <= mid) current = it.id;
      }
      root.querySelectorAll<HTMLElement>("[data-rail-node]").forEach((node) => {
        node.dataset.active = node.dataset.railNode === current ? "1" : "0";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      ref={ref}
      aria-label={t("sections")}
      className="fixed left-[26px] top-1/2 z-[var(--z-cue)] hidden -translate-y-1/2 flex-col gap-0.5 min-[1240px]:flex"
    >
      {ITEMS.map((it) => (
        <a
          key={it.id}
          href={it.href}
          data-rail-node={it.id}
          data-active="0"
          className="group relative flex h-[34px] items-center gap-3 no-underline [&[data-active='1']_.dot]:scale-110 [&[data-active='1']_.dot]:border-accent [&[data-active='1']_.dot]:bg-accent [&[data-active='1']_.dot]:shadow-[0_0_8px_var(--accent)] [&[data-active='1']_.label]:translate-x-0 [&[data-active='1']_.label]:text-accent-text [&[data-active='1']_.label]:opacity-100"
        >
          <span className="dot z-[1] h-2 w-2 shrink-0 rounded-full border border-line-strong bg-transparent transition-all duration-300" />
          <span className="label -translate-x-1.5 whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-mute opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
            {t(it.labelKey)}
          </span>
        </a>
      ))}
    </nav>
  );
}
