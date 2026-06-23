import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";
import { buildAlternates } from "@/lib/seo";
import { PRIVACY } from "@/data/legal";
import { LegalDocView } from "@/components/legal-doc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/legal/privacy"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE.domain}/${locale}/legal/privacy`,
      images: [`/${locale}/opengraph-image`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocView doc={PRIVACY[locale]} code="PRIV" />;
}
