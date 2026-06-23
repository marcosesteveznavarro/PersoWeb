import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";
import { buildAlternates } from "@/lib/seo";
import { LEGAL_NOTICE } from "@/data/legal";
import { LegalDocView } from "@/components/legal-doc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.legalNotice" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/legal/legal-notice"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE.domain}/${locale}/legal/legal-notice`,
      images: [`/${locale}/opengraph-image`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocView doc={LEGAL_NOTICE[locale]} code="NOTICE" />;
}
