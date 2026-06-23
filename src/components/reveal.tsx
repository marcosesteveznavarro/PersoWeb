import type { ElementType, ReactNode } from "react";

/**
 * Reveal al scroll 100% CSS (animation-timeline: view()).
 * Sin JS, sin flash y no-JS-safe: si el navegador no lo soporta o el
 * usuario pide reduced-motion, el contenido se muestra normal.
 */
export function Reveal({
  as: Tag = "div",
  variant = "up",
  className,
  children,
}: {
  as?: ElementType;
  variant?: "up" | "fade";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-reveal={variant === "fade" ? "fade" : ""} className={className}>
      {children}
    </Tag>
  );
}
