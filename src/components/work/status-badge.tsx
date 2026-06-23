import { useTranslations } from "next-intl";
import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const DOT: Record<ProjectStatus, string> = {
  published: "bg-ok",
  production: "bg-accent",
  development: "bg-ink-mute",
};

const TEXT: Record<ProjectStatus, string> = {
  published: "text-ok",
  production: "text-accent-text",
  development: "text-ink-dim",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const t = useTranslations("work.status");
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/70 px-2.5 py-1 text-[0.6rem] uppercase tracking-widest backdrop-blur-sm",
        TEXT[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[status])} />
      {t(status)}
    </span>
  );
}
