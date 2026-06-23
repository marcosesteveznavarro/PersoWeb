import { cn } from "@/lib/utils";
import { Channel } from "./channel";

/**
 * Fila de canal con línea que se dibuja:  ●  CANAL ───────────  CÓDIGO // NN
 * La línea central lleva `data-draw` → se "dibuja" (scaleX 0→1) al entrar en
 * viewport vía CSS (animation-timeline), no-JS-safe y respeta reduced-motion.
 */
export function ChannelLine({
  channel,
  code,
  className,
}: {
  channel: string;
  code?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Channel label={channel} />
      <span
        aria-hidden
        data-draw
        className="h-px flex-1 bg-line-strong/70"
      />
      {code ? (
        <span aria-hidden className="channel shrink-0 text-ink-mute">
          {code}
        </span>
      ) : null}
    </div>
  );
}
