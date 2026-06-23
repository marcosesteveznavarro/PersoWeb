import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, projectSlugs, PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Channel } from "@/components/hud/channel";
import { StatusBadge } from "@/components/work/status-badge";
import { ProjectMark } from "@/components/work/project-mark";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projectSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.typeLabel[locale]}`,
    description: project.summary[locale],
    alternates: buildAlternates(locale, `/work/${slug}`),
    openGraph: {
      type: "article",
      siteName: SITE.shortName,
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `${SITE.domain}/${locale}/work/${slug}`,
      title: project.title,
      description: project.summary[locale],
      images: [`/${locale}/opengraph-image`],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "work.case" });
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const blocks = [
    { key: "problem", body: project.problem[locale] },
    { key: "solution", body: project.solution[locale] },
    { key: "result", body: project.result[locale] },
  ] as const;

  const metrics = (project.metrics ?? []).filter(
    (m) => !m.value.startsWith("["),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE.domain}/${locale}/work/${slug}#creativework`,
    name: project.title,
    description: project.summary[locale],
    url: `${SITE.domain}/${locale}/work/${slug}`,
    dateCreated: project.year,
    creator: { "@id": `${SITE.domain}/#person` },
    keywords: project.stack.join(", "),
  };

  return (
    <article className="pt-28 md:pt-36">
      <div className="shell">
        <Link
          href="/work"
          className="mono group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-dim transition-colors hover:text-ink"
        >
          <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          {t("back")}
        </Link>

        {/* Header */}
        <header className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <ProjectMark title={project.title} size="lg" />
            <Channel label={project.typeLabel[locale]} code={`#${project.slug}`} />
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,7vw,5rem)]">
            {project.title}
          </h1>
          <p className="max-w-2xl text-pretty text-[1.15rem] leading-relaxed text-ink-dim">
            {project.summary[locale]}
          </p>
        </header>

        {/* Meta bar */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
          {[
            { label: t("role"), value: project.role[locale] },
            { label: t("year"), value: project.year },
            { label: t("type"), value: project.typeLabel[locale] },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-1.5 bg-surface p-5">
              <dt className="channel">{m.label}</dt>
              <dd className="text-sm text-ink">{m.value}</dd>
            </div>
          ))}
          <div className="flex flex-col gap-1.5 bg-surface p-5">
            <dt className="channel">Status</dt>
            <dd>
              <StatusBadge status={project.status} />
            </dd>
          </div>
        </dl>
      </div>

      {/* Captura real solo si existe (los proyectos privados no la tienen) */}
      {project.cover && (
        <div className="shell mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 92vw, 1100px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="shell mt-16 grid gap-12 pb-8 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-12 lg:col-span-7">
          {blocks.map((b) => (
            <section key={b.key} className="flex flex-col gap-4">
              <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] text-ink">
                {t(b.key)}
              </h2>
              <p className="text-pretty text-[1.05rem] leading-relaxed text-ink-dim">
                {b.body}
              </p>
            </section>
          ))}

          {project.note && (
            <aside className="rounded-md border border-accent/30 bg-accent-soft p-5">
              <span className="channel">{t("note")}</span>
              <p className="mt-2 text-sm text-ink">{project.note[locale]}</p>
            </aside>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-10 lg:col-span-5">
          <div className="flex flex-col gap-4">
            <span className="mono text-xs uppercase tracking-widest text-ink-mute">
              {t("stack")}
            </span>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="mono rounded-xs border border-line px-2.5 py-1 text-sm text-ink-dim"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {metrics.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="mono text-xs uppercase tracking-widest text-ink-mute">
                {t("metrics")}
              </span>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
                {metrics.map((m) => (
                  <div
                    key={m.label[locale]}
                    className="flex flex-col gap-1 bg-surface p-4"
                  >
                    <dt className="channel">{m.label[locale]}</dt>
                    <dd className="font-display text-xl text-accent-text">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="mono text-xs uppercase tracking-widest text-ink-mute">
                {t("links")}
              </span>
              <ul className="flex flex-col gap-px overflow-hidden rounded-md border border-line bg-line">
                {project.links.map((l) => {
                  const ready = l.href && !l.href.startsWith("[");
                  return (
                    <li key={l.label}>
                      {ready ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between bg-surface px-4 py-3 transition-colors hover:bg-surface-2"
                        >
                          <span className="text-sm text-ink">{l.label}</span>
                          <ArrowUpRight className="h-4 w-4 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="flex items-center justify-between bg-surface px-4 py-3 opacity-60"
                        >
                          <span className="text-sm text-ink">{l.label}</span>
                          <span className="mono text-[0.6rem] uppercase tracking-widest text-ink-mute">
                            {t("soon")}
                          </span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Next + CTA */}
      <div className="mt-12 border-t border-line">
        <div className="shell flex flex-col gap-10 py-16 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="channel">{t("cta")}</span>
            <Button href="/#contacto" size="lg" arrow>
              {t("ctaButton")}
            </Button>
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center gap-4 text-right"
          >
            <span className="flex flex-col items-end">
              <span className="mono text-xs uppercase tracking-widest text-ink-mute">
                {t("next")}
              </span>
              <span className="font-display text-2xl text-ink transition-colors group-hover:text-accent-text">
                {next.title}
              </span>
            </span>
            <ArrowRight className="h-6 w-6 text-ink-dim transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
