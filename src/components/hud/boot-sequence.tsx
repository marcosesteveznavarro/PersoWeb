"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Secuencia de arranque "núcleo de telemetría". Overlay de pantalla completa
 * que corre UNA vez por sesión, encima del hero (que ya está renderizado
 * debajo: es un overlay, no un gate de contenido — no penaliza el LCP).
 *
 * Garantías:
 *  - Solo cliente (sin mismatch SSR): no pinta nada hasta montar.
 *  - Gate por sessionStorage → no se repite en navegaciones internas.
 *  - prefers-reduced-motion → no se muestra.
 *  - Saltable con cualquier tecla/click/touch.
 *
 * Copy 100% en messages (hero.boot) — cero texto hardcodeado.
 */

type BootLine = { tag: string; label: string };

const SESSION_KEY = "me:booted";
const STEP_MS = 360; // separación entre líneas
const LAST_HOLD_MS = 650; // espera tras completar antes de cerrar
const FADE_MS = 600; // duración del fundido de salida

export function BootSequence() {
  const t = useTranslations("hero.boot");
  const lines = t.raw("lines") as BootLine[];

  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0); // nº de líneas reveladas
  const [closing, setClosing] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Decide si arrancar (cliente, una vez por sesión, sin reduced-motion).
  useEffect(() => {
    if (reduce) return;
    let booted = false;
    try {
      booted = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage no disponible → arrancamos igual */
    }
    if (booted) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    // Diferido a after-paint: el hero (SSR) pinta primero y el overlay se
    // superpone al frame siguiente — sin penalizar el LCP. Además evita el
    // setState síncrono en el cuerpo del effect.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Avance de líneas + cierre.
  useEffect(() => {
    if (!visible) return;
    const tm = timers.current;
    lines.forEach((_, i) => {
      tm.push(setTimeout(() => setShown(i + 1), i * STEP_MS));
    });
    // Tras la última línea (índice len-1) se espera 480 ms, luego LAST_HOLD_MS
    // antes de cerrar, y FADE_MS de fundido antes de desmontar (spec).
    const doneAt = (lines.length - 1) * STEP_MS + 480;
    tm.push(setTimeout(() => setClosing(true), doneAt + LAST_HOLD_MS));
    tm.push(setTimeout(() => setVisible(false), doneAt + LAST_HOLD_MS + FADE_MS));
    return () => {
      tm.forEach(clearTimeout);
      timers.current = [];
    };
  }, [visible, lines]);

  // Saltar.
  useEffect(() => {
    if (!visible) return;
    const skip = () => {
      timers.current.forEach(clearTimeout);
      setClosing(true);
      setTimeout(() => setVisible(false), FADE_MS);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [visible]);

  if (!visible) return null;

  const pct = Math.round((shown / lines.length) * 100);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[var(--z-boot)] flex items-center justify-center bg-canvas transition-opacity duration-[600ms] ease-out"
      style={{ opacity: closing ? 0 : 1 }}
    >
      <div className="w-[min(86vw,520px)]">
        <div className="mb-[18px] flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] [animation:pulseDot_1.2s_ease-in-out_infinite]" />
          {t("channel")}
        </div>

        <div className="min-h-[160px] font-mono text-[13px] leading-[1.9] text-ink-dim">
          {lines.slice(0, shown).map((line, i) => {
            const last = i === lines.length - 1;
            return (
              <div
                key={i}
                className="[animation:lineIn_0.3s_ease_both]"
                style={
                  last
                    ? {
                        color: "var(--accent-text)",
                        fontWeight: 500,
                        textTransform: "uppercase" as const,
                      }
                    : undefined
                }
              >
                <span className="inline-block w-[4.5ch] text-accent-text">
                  {line.tag}
                </span>
                <span className="mr-2">{line.label}</span>
                {!last && (
                  <>
                    <span className="text-accent">........</span>{" "}
                    <span className="text-accent">ok</span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-[18px] h-[3px] overflow-hidden rounded-sm bg-line">
          <div
            className="h-full bg-[linear-gradient(to_right,var(--accent),var(--accent-text))] shadow-[0_0_10px_var(--accent-soft)] transition-[width] duration-200 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
