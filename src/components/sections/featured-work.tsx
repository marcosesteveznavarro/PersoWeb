import { useTranslations } from "next-intl";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/work/project-card";
import { ChannelLine } from "@/components/hud/channel-line";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

/** Trabajo destacado: grid equilibrado (1 col móvil → 2 col desktop). */
export function FeaturedWork() {
  const t = useTranslations("work");

  return (
    <section
      id="trabajo"
      className="scroll-mt-24 overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-1 flex-col gap-5">
          <ChannelLine channel={t("channel")} code="WORK // 03" />
          <h2 className="max-w-2xl text-[clamp(1.9rem,4.6vw,3.4rem)]">
            {t("title")}
          </h2>
          <p className="max-w-md text-pretty text-ink-dim">{t("lead")}</p>
        </div>
        <Button href="/work" variant="secondary" arrow>
          {t("viewAll")}
        </Button>
      </div>

      <div className="shell mt-10 grid gap-5 sm:grid-cols-2 md:mt-14">
        {featuredProjects.map((p) => (
          <Reveal key={p.slug} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
