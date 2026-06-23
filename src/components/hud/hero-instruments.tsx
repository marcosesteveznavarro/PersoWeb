"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Instrumentos ambientales del hero: arco de tacómetro + horizonte de actitud,
 * DETRÁS del titular. Reactivos al cursor (parallax + inclinación) y al scroll
 * (el arco se "llena" según el progreso de lectura de la página).
 *
 * Es ATMÓSFERA, no datos: sin números ni etiquetas. `aria-hidden` +
 * `pointer-events:none`. Va en la capa de fondo del hero (-z-10), junto al glow
 * radial del hero. Se acopla a `motion` (ya usado en Cursor/ScrollProgress):
 * cero dependencias nuevas, sin re-render por frame (todo en motion values).
 */

const R = 330; // radio del arco en el viewBox 800×800
// Redondeo a 2 decimales: Math.cos/sin no son deterministas al último ULP entre
// el Node del SSR y el navegador, y la diferencia rompía la hidratación de los
// atributos x1/y1. Redondear da el MISMO string en servidor y cliente.
const round = (n: number) => Math.round(n * 100) / 100;
const TICKS = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * Math.PI * 2;
  const inner = i % 5 === 0 ? 314 : 322; // cada 5ª marca, más larga
  return {
    x1: round(400 + Math.cos(a) * R),
    y1: round(400 + Math.sin(a) * R),
    x2: round(400 + Math.cos(a) * inner),
    y2: round(400 + Math.sin(a) * inner),
  };
});

export function HeroInstruments({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const interactive = finePointer && !reduce;

  // — Cursor → muelles suaves en [-0.5, 0.5] —
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 22, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 120, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, px, py]);

  // — Scroll global → relleno del arco (100 → 0) —
  const { scrollYProgress } = useScroll();
  const dashoffset = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // — Scroll local del hero → parallax vertical del cluster —
  const hero = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(hero.scrollYProgress, [0, 1], [0, -60]);

  // — Transforms derivados del cursor —
  const horizonRotate = useTransform(sx, (v) => v * 7);
  const horizonY = useTransform(sy, (v) => v * 22);
  const clusterX = useTransform(sx, (v) => v * -8);
  const clusterY = useTransform(sy, (v) => v * -8);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ y: parallaxY }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: clusterX, y: clusterY }}
      >
        {/* Arco de tacómetro */}
        <svg
          viewBox="0 0 800 800"
          className="absolute left-1/2 top-1/2 h-[min(86vw,820px)] w-[min(86vw,820px)] -translate-x-1/2 -translate-y-[52%] opacity-50"
        >
          <circle
            cx="400"
            cy="400"
            r="330"
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
          />
          <circle
            cx="400"
            cy="400"
            r="300"
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="2 14"
          />
          <g>
            {TICKS.map((t, i) => (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="var(--line)"
                strokeWidth="1"
              />
            ))}
          </g>
          <motion.circle
            cx="400"
            cy="400"
            r="330"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            pathLength={100}
            strokeDasharray={100}
            strokeLinecap="round"
            transform="rotate(-90 400 400)"
            style={{
              strokeDashoffset: dashoffset,
              filter: "drop-shadow(0 0 6px var(--accent-soft))",
            }}
          />
        </svg>

        {/* Horizonte de actitud */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-px w-[min(70vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
          style={{
            rotate: horizonRotate,
            y: horizonY,
            background:
              "linear-gradient(to right, transparent, var(--accent) 20%, var(--accent) 80%, transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
