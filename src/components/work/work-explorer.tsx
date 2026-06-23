"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PROJECTS, availableTypes, type ProjectType } from "@/data/projects";
import { ProjectCard } from "@/components/work/project-card";
import { Channel } from "@/components/hud/channel";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectType;

export function WorkExplorer() {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", ...availableTypes];
  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section className="shell pb-24 pt-32 md:pt-40">
      <div className="flex flex-col gap-5">
        <Channel label={t("channel")} code="INDEX // ALL" />
        <h1 className="text-[clamp(2.5rem,7vw,5rem)]">{t("index.title")}</h1>
        <p className="max-w-xl text-pretty text-ink-dim">{t("index.lead")}</p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "mono rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-200",
              filter === f
                ? "border-accent bg-accent text-accent-ink"
                : "border-line text-ink-dim hover:border-line-strong hover:text-ink",
            )}
          >
            {t(`filters.${f}`)}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
