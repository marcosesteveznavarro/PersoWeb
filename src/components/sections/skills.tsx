import { useLocale, useTranslations } from "next-intl";
import { SKILL_GROUPS } from "@/data/site";
import type { Locale } from "@/i18n/routing";
import { SectionHeader } from "@/components/hud/section-header";
import { Reveal } from "@/components/reveal";

export function Skills() {
  const t = useTranslations("skills");
  const locale = useLocale() as Locale;

  return (
    <section id="stack" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        channel={t("channel")}
        code="STK // 05"
        title={t("title")}
        lead={t("lead")}
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
        {SKILL_GROUPS.map((g) => (
          <Reveal key={g.id} className="flex flex-col gap-5 bg-surface p-7 md:p-8">
            <span className="mono text-xs uppercase tracking-widest text-accent-text">
              {t(`groups.${g.id}`)}
            </span>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => {
                const label = typeof item === "string" ? item : item[locale];
                return (
                  <li
                    key={label}
                    className="mono rounded-xs border border-line px-2.5 py-1 text-sm text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
