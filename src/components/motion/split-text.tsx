"use client";

import { type ElementType, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Revela un titular palabra a palabra con máscara (overflow-hidden).
 * Sin JS el texto se ve normal; con reduced-motion no se anima.
 */
export function SplitText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const words = ref.current?.querySelectorAll("[data-word]");
      if (!words || !words.length) return;
      // useGSAP corre en useLayoutEffect (antes del paint), así que gsap.from
      // fija el estado oculto antes de pintar y revela sin flash perceptible.
      gsap.from(words, {
        yPercent: 115,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.055,
        delay,
      });
    },
    { scope: ref },
  );

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span data-word className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
