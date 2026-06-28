import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/data/projects";
import { ProjectMark } from "./project-mark";
import { StatusBadge } from "./status-badge";
import { ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Tarjeta-instrumento de proyecto: corchetes que se extienden + barrido de glow
 * al hover (clase .inst). Compacta: el monograma actúa de icono/identidad. La
 * captura (project.cover) NO va en la tarjeta — solo en la página de detalle.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("work");

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "inst group relative flex h-full flex-col gap-5 overflow-hidden rounded-md border border-line bg-surface p-6",
        className,
      )}
    >
      <span className="sweep" aria-hidden />
      <span
        aria-hidden
        className="tick-tl absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l border-t border-accent/50"
      />
      <span
        aria-hidden
        className="tick-br absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b border-r border-accent/50"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <ProjectMark title={project.title} size="lg" />
          <div className="flex flex-col">
            <span className="mono text-xs uppercase tracking-widest text-accent-text">
              {project.typeLabel[locale]}
            </span>
            <span className="mono text-[0.7rem] text-ink-mute">
              {project.year}
            </span>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="relative flex flex-col gap-2">
        <h3 className="font-display text-2xl tracking-tight">{project.title}</h3>
        <p className="text-pretty text-sm leading-relaxed text-ink-dim">
          {project.summary[locale]}
        </p>
      </div>

      <div className="relative mt-auto flex items-end justify-between gap-3 pt-2">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <li
              key={s}
              className="mono rounded-xs border border-line px-2 py-0.5 text-[0.65rem] text-ink-mute"
            >
              {s}
            </li>
          ))}
        </ul>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm text-ink-dim transition-colors group-hover:text-accent-text">
          {t("viewCase")}
          <ArrowUpRight className="arrow h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
