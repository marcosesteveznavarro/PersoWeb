"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Mantiene ScrollTrigger en sincronía con Lenis. Lenis conduce su propio rAF
 * (autoRaf) y aquí solo actualizamos ScrollTrigger en cada scroll. Así el
 * ticker de GSAP queda libre para las tweens (hero, pin, etc.). Vive dentro de
 * <ReactLenis> para que useLenis() devuelva la instancia cuando está lista.
 */
function GsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

/**
 * Smooth scroll con Lenis sincronizado al ticker de GSAP. Respeta
 * prefers-reduced-motion: si está activo, no monta Lenis y usa scroll nativo
 * (en modo root no hay wrapper en el DOM, así que no hay mismatch de hidratación).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ duration: 1.1, smoothWheel: true, anchors: true }}
    >
      <GsapSync />
      {children}
    </ReactLenis>
  );
}
