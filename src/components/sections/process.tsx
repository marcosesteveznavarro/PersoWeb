"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useTranslations } from "next-intl";
import { PROCESS } from "@/data/site";
import { SectionHeader } from "@/components/hud/section-header";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Proceso como TIMELINE DE TELEMETRÍA: una pista horizontal con un relleno de
 * acento que progresa con el scroll de la sección; cada nodo 01–04 se ACTIVA
 * (número en acento + glow, punto encendido) cuando el relleno lo alcanza.
 * Cierra la metáfora automoción/telemetría ("release en cada hito").
 *
 * - La pista solo se ve en desktop (≥ md); en móvil los pasos se apilan.
 * - reduced-motion: relleno al 100% sin animación y todos los nodos activos.
 * - Sin re-render por scroll: muta `data-active` por ref.
 */
export function Process() {
  const t = useTranslations("process");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const sectionRef = useRef<HTMLElement>(null);
  const olRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Progreso atado a la FILA DE TARJETAS (no a la sección entera, cuya cabecera
  // queda muy arriba y adelanta el avance). El relleno arranca (0%) en cuanto las
  // tarjetas empiezan a asomar (95% del viewport) — un tick antes que el "85%"
  // inicial — y completa (100%) cuando la fila llega arriba (15%). El span de 80%
  // de viewport mantiene el avance pausado: ~½ paso por tick de scroll.
  const { scrollYProgress } = useScroll({
    target: olRef,
    offset: ["start 95%", "start 15%"],
  });
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const setActive = (i: number, on: boolean) => {
    const el = stepRefs.current[i];
    if (el) el.dataset.active = on ? "1" : "0";
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    PROCESS.forEach((_, i) =>
      setActive(i, p >= i / (PROCESS.length - 1) - 0.02),
    );
  });

  // Estado inicial sin esperar a un "change" de scroll: reduced-motion → todo
  // activo; si no, sincroniza desde el progreso actual, de modo que al llegar a
  // la sección el nodo 1 ya está encendido aunque el progreso aún sea 0.
  useEffect(() => {
    if (reduce) {
      PROCESS.forEach((_, i) => setActive(i, true));
      return;
    }
    const p = scrollYProgress.get();
    PROCESS.forEach((_, i) => setActive(i, p >= i / (PROCESS.length - 1) - 0.02));
    // setActive/scrollYProgress son estables; solo re-sincronizamos con reduce.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="scroll-mt-24 border-t border-line bg-elevated"
    >
      <div className="shell py-24 md:py-32">
        <SectionHeader
          channel={t("channel")}
          code="PROC // 02"
          title={t("title")}
          lead={t("lead")}
        />

        {/* pista de telemetría (solo desktop) */}
        <div
          aria-hidden
          className="relative mb-6 mt-12 hidden h-0.5 bg-line md:block"
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-[linear-gradient(to_right,var(--accent),var(--accent-text))] shadow-[0_0_10px_var(--accent-soft)]"
            style={{ width: reduce ? "100%" : fillWidth }}
          />
        </div>

        <ol ref={olRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((id, i) => (
            <li
              key={id}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-reveal
              data-active="0"
              className="group relative flex flex-col gap-4 rounded-md border border-line bg-surface p-6
                         [&[data-active='1']_.num]:text-accent-text [&[data-active='1']_.num]:[text-shadow:0_0_18px_var(--accent-soft)]
                         [&[data-active='1']_.dot]:border-accent [&[data-active='1']_.dot]:bg-accent [&[data-active='1']_.dot]:shadow-[0_0_8px_var(--accent)]"
            >
              <div className="flex items-center justify-between">
                <span className="num font-display text-[2.6rem] leading-none text-line-strong transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="dot h-[9px] w-[9px] rounded-full border border-line-strong bg-transparent transition-all duration-300" />
              </div>
              <h3 className="font-display text-xl tracking-tight">
                {t(`steps.${id}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-ink-dim">
                {t(`steps.${id}.desc`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
