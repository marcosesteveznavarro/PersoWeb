import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { SITE, LANGUAGES } from "@/data/site";
import type { Locale } from "@/i18n/routing";
import { ChannelLine } from "@/components/hud/channel-line";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Download } from "@/components/icons";

export function About() {
  const t = useTranslations("about");
  const locale = useLocale() as Locale;
  const body = t.raw("body") as string[];
  const experience = t.raw("experience") as { role: string; period: string }[];

  return (
    <section
      id="sobre-mi"
      className="scroll-mt-24 border-t border-line bg-elevated"
    >
      <div className="shell grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
        {/* Foto */}
        <div className="lg:col-span-5">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-line">
              <Image
                src="/CV_image.jpeg"
                alt={t("photoAlt")}
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover object-top"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/50 via-transparent to-transparent"
              />
              {/* esquinas HUD */}
              <span aria-hidden className="absolute left-3 top-3 h-4 w-4 border-l border-t border-accent/70" />
              <span aria-hidden className="absolute right-3 top-3 h-4 w-4 border-r border-t border-accent/70" />
              <span aria-hidden className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-accent/70" />
              <span aria-hidden className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-accent/70" />
              <span className="mono absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6rem] uppercase tracking-[0.25em] text-ink">
                {SITE.location[locale]}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-9 lg:col-span-7">
          <div className="flex flex-col gap-5">
            <ChannelLine channel={t("channel")} code="BIO // 04" />
            <h2 className="text-[clamp(1.9rem,4.6vw,3.4rem)]">{t("title")}</h2>
          </div>

          <div className="flex max-w-xl flex-col gap-4 text-[1.05rem] leading-relaxed text-ink-dim">
            {body.map((p, i) => (
              <Reveal as="p" key={i}>
                {p}
              </Reveal>
            ))}
          </div>

          {/* Doble audiencia */}
          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {(
              [
                ["forClients", "forClientsText"],
                ["forRecruiters", "forRecruitersText"],
              ] as const
            ).map(([k, text]) => (
              <div key={k} className="flex flex-col gap-2 bg-surface p-5">
                <span className="channel">{t(k)}</span>
                <p className="text-sm leading-relaxed text-ink">{t(text)}</p>
              </div>
            ))}
          </div>

          {/* Trayectoria + idiomas */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="mono text-xs uppercase tracking-widest text-ink-mute">
                {t("experienceTitle")}
              </span>
              <ul className="flex flex-col gap-3">
                {experience.map((e, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="text-sm text-ink">{e.role}</span>
                    {!e.period.startsWith("[") && (
                      <span className="mono text-xs text-ink-mute">{e.period}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <span className="mono text-xs uppercase tracking-widest text-ink-mute">
                {t("languagesTitle")}
              </span>
              <ul className="flex flex-col gap-3">
                {LANGUAGES.map((l) => (
                  <li key={l.id} className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-ink">{l.id}</span>
                    <span className="mono text-xs text-accent-text">
                      {l.level[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href={SITE.cvPath} download>
              <span className="inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t("ctaCv")}
              </span>
            </Button>
            <Button href={SITE.socials.linkedin} external variant="secondary">
              {t("ctaLinkedin")}
            </Button>
            <Button href={SITE.socials.github} external variant="secondary">
              {t("ctaGithub")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
