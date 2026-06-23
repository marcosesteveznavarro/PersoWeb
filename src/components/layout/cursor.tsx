"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Cursor personalizado sutil (anillo de acento aditivo, no reemplaza el
 * nativo). Solo en punteros finos y sin reduced-motion. No estorba:
 * pointer-events none + aria-hidden.
 */
export function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;

  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 1600, damping: 55, mass: 0.16 });
  const sy = useSpring(y, { stiffness: 1600, damping: 55, mass: 0.16 });

  useEffect(() => {
    if (!enabled) return;
    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      setActive(Boolean(el?.closest("a, button, [data-cursor]")));
    }
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        animate={{
          width: active ? 46 : 20,
          height: active ? 46 : 20,
          opacity: active ? 1 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
