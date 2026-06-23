"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Indicador fino de progreso de scroll (línea de acento). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[var(--z-progress)] h-0.5 origin-left bg-[linear-gradient(to_right,var(--accent),var(--accent-text))] shadow-[0_0_12px_var(--accent-soft)]"
      style={{ scaleX }}
    />
  );
}
