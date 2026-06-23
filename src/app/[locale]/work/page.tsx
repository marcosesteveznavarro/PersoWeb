import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";
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
      images: [`/${locale}/opengraph-image`],
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
  return <WorkExplorer />;
}
