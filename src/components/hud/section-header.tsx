import { cn } from "@/lib/utils";
import { ChannelLine } from "./channel-line";
import { Reveal } from "@/components/reveal";

/** Cabecera de sección con canal HUD, título display y lead opcional. */
export function SectionHeader({
  channel,
  code,
  title,
  lead,
  align = "left",
  className,
}: {
  channel: string;
  code?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <ChannelLine channel={channel} code={code} />
      <Reveal>
        <h2 className="max-w-3xl text-[clamp(1.9rem,4.6vw,3.4rem)]">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal>
          <p
            className={cn(
              "max-w-xl text-pretty text-[1.05rem] leading-relaxed text-ink-dim",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
