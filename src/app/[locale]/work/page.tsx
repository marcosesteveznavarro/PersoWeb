import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { buildAlternates } from "@/lib/seo";
import { WorkExplorer } from "@/components/work/work-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.work" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/work"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE.domain}/${locale}/work`,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta.work" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE.domain}/${locale}/work#collection`,
    name: t("title"),
    description: t("description"),
    url: `${SITE.domain}/${locale}/work`,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `${SITE.domain}/${locale}/work/${p.slug}`,
      })),
    },
  };

  return (
    <>
      <WorkExplorer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
