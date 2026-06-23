import { cn } from "@/lib/utils";

/** Iniciales reales del proyecto (GymCrew → GC, Autocaravanas Aurora → AA). */
export function initials(title: string) {
  const caps = title.match(/[A-Z]/g) ?? [];
  return (caps.slice(0, 2).join("") || title.slice(0, 2)).toUpperCase();
}

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-lg",
} as const;

/** Marca/“icono” del proyecto: monograma en un chip. No es un placeholder de
 *  captura — es la identidad de la pieza. */
export function ProjectMark({
  title,
  size = "md",
  className,
}: {
  title: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-md border border-line bg-elevated font-display font-semibold tracking-tight text-accent-text",
        sizes[size],
        className,
      )}
    >
      {initials(title)}
    </span>
  );
}
