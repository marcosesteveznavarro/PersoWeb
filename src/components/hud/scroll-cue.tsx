"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";

/**
 * Pista de scroll vertical, anclada al borde derecho y centrada en vertical
 * (fuera del recorrido de la onda del osciloscopio). Una línea con un destello
 * que cae en bucle; se desvanece en cuanto empiezas a hacer scroll.
 *
 * Sustituye al cue inferior centrado (flecha + "scroll") del hero, que chocaba
 * con el osciloscopio. El bucle de destello es CSS (@keyframes sweepDown) → se
 * neutraliza solo bajo prefers-reduced-motion por el bloque global.
 */
export function ScrollCue() {
  const t = useTranslations("hero");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0.85, 0]);

  return (
    <motion.div
      aria-hidden
      className="fixed right-[30px] top-1/2 z-[var(--z-cue)] hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      style={{ opacity }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-ink-mute [writing-mode:vertical-rl] [transform:rotate(180deg)]">
        {t("scroll")}
      </span>
      <div className="relative h-[84px] w-px overflow-hidden bg-[linear-gradient(to_bottom,transparent,var(--line)_16%,var(--line)_84%,transparent)]">
        <div className="absolute -left-px top-0 h-[26px] w-0.5 bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] shadow-[0_0_8px_var(--accent-soft)] [animation:sweepDown_2.2s_cubic-bezier(.6,0,.4,1)_infinite]" />
      </div>
    </motion.div>
  );
}
