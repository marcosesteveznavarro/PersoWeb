"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Osciloscopio: onda sinusoidal animada en <canvas> al pie del hero. Reacciona
 * sutilmente al cursor (amplitud según Y, frecuencia según X). Es decoración
 * ambiental — `aria-hidden`, sin datos.
 *
 * Robustez:
 *  - DPR-aware (nítido en retina, cap a 2), se redimensiona con la ventana.
 *  - Lee --accent en vivo (respeta data-accent amber/cyan y data-theme).
 *  - Pausa el rAF cuando el hero sale de viewport (IntersectionObserver).
 *  - prefers-reduced-motion → dibuja una línea estática una sola vez.
 *
 * Colócalo absolute al pie del hero:
 *   <Oscilloscope className="absolute inset-x-0 bottom-10 z-[1] px-[6%]" />
 */
export function Oscilloscope({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = { x: 0.5, y: 0.5 };
    let w = 0;
    let h = 0;
    let dpr = 1;
    let accent = "#38a6ff";
    let baseline = "rgba(255,255,255,0.04)";
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const readTokens = () => {
      const css = getComputedStyle(document.documentElement);
      const a = css.getPropertyValue("--accent").trim();
      if (a) accent = a;
      const l = css.getPropertyValue("--line").trim();
      if (l) baseline = l;
    };

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const wave = (nx: number, t: number, amp: number, freq: number) =>
      h / 2 +
      Math.sin(nx * freq + t * 2.2) *
        amp *
        (0.55 + 0.45 * Math.sin(t * 0.6 + nx * 3)) +
      Math.sin(nx * 60 - t * 3.5) * amp * 0.18;

    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = baseline;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      const amp = h * 0.26 * (0.55 + 0.7 * pointer.y);
      const freq = 18 + pointer.x * 10;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = wave(x / w, t, amp, freq);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.72;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Punto que recorre la traza
      const sxN = (t * 0.16) % 1;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(sxN * w, wave(sxN, t, amp, freq), 2.6, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = e.clientY / window.innerHeight;
    };
    const onResize = () => size();

    readTokens();
    size();

    if (reduce) {
      // Estática: una sola pasada, sin animación.
      const amp = h * 0.2;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h / 2 + Math.sin((x / w) * 22) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      return;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    // Pausa fuera de viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    // Reacciona al cambio de acento/tema (data-* en <html>).
    const mo = new MutationObserver(readTokens);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent", "data-theme"],
    });

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      mo.disconnect();
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="block h-[74px] w-full" />
    </div>
  );
}
