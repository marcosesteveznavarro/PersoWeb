import { cn } from "@/lib/utils";

/**
 * Etiqueta de canal HUD — el motivo firma. Punto vivo (acento) + nombre
 * de canal en mono + coordenada/código opcional. El punto y el código son
 * decorativos (aria-hidden); el nombre del canal sí se lee.
 */
export function Channel({
  label,
  code,
  className,
}: {
  label: string;
  code?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
      />
      <span className="channel">{label}</span>
      {code ? (
        <span aria-hidden className="channel text-line-strong">
          {code}
        </span>
      ) : null}
    </span>
  );
}
