"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Guías de puntería: una línea vertical y otra horizontal muy tenues que cruzan
 * la pantalla siguiendo el cursor. Complementan el anillo de <Cursor /> (que
 * sigue siendo el "círculo") para reforzar la lectura de instrumento/visor —
 * por eso aquí NO hay anillo, solo las líneas.
 *
 * Solo en punteros finos y sin reduced-motion. Se mueve por CSS vars (sin
 * re-render de React). `aria-hidden` + `pointer-events:none`.
 */
export function Crosshair() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[var(--z-crosshair)]"
      style={{ ["--mx" as string]: "50vw", ["--my" as string]: "50vh" }}
    >
      <div
        className="absolute bottom-0 top-0 w-px bg-accent opacity-[0.12]"
        style={{ left: "var(--mx)" }}
      />
      <div
        className="absolute inset-x-0 h-px bg-accent opacity-[0.12]"
        style={{ top: "var(--my)" }}
      />
    </div>
  );
}
