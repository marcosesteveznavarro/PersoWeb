"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { SITE } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { HeroInstruments } from "@/components/hud/hero-instruments";
import { Oscilloscope } from "@/components/hud/oscilloscope";
import { HeroBrackets } from "@/components/hud/hero-brackets";
import { ScrollCue } from "@/components/hud/scroll-cue";

export function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-[var(--nav-h)]"
    >
      {/* fondo: glow de acento + instrumentos reactivos (sin cableado de circuito) */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[46%] h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[150px]" />
        <HeroInstruments targetRef={heroRef} />
      </div>

      {/* corchetes de encuadre (visor/HUD) */}
      <HeroBrackets />

      <div className="shell relative z-[2] flex w-full max-w-7xl flex-col items-center gap-7 text-center">
        {/* Identidad en dos niveles: nombre destacado + rol/localización */}
        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.3em] text-accent-text">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] [animation:pulseDot_2.4s_ease-in-out_infinite]"
            />
            {SITE.name}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
            {t("eyebrow")}
          </span>
        </div>

        <h1 className="text-balance font-display text-[clamp(2.6rem,8vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
          <SplitText text={t("title")} />
        </h1>

        <p className="max-w-xl text-pretty text-[1.15rem] leading-relaxed text-ink-dim">
          {t("sub")}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Button href="#contacto" size="lg" arrow>
              {t("ctaPrimary")}
            </Button>
          </Magnetic>
          <Button href="#trabajo" size="lg" variant="secondary">
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>

      {/* onda de osciloscopio al pie del hero */}
      <Oscilloscope className="absolute inset-x-0 bottom-10 z-[1] px-[6%]" />

      {/* pista de scroll vertical (sustituye al cue inferior centrado) */}
      <ScrollCue />
    </section>
  );
}
