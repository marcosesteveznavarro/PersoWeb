import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";
import { buildAlternates } from "@/lib/seo";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Cursor } from "@/components/layout/cursor";
import { Crosshair } from "@/components/hud/crosshair";
import { MissionRail } from "@/components/hud/mission-rail";
import { BootSequence } from "@/components/hud/boot-sequence";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { Analytics } from "@/components/analytics";

const clash = localFont({
  src: "../../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "400 700",
  display: "swap",
});

const satoshi = localFont({
  src: "../../fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  style: "normal",
  variable: "--font-satoshi",
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Tema único: oscuro. El <html> ya lleva data-theme="dark" fijo; el script solo
// marca .js para la mejora progresiva (reveals, etc.).
const THEME_SCRIPT = `document.documentElement.classList.add('js');`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Sitio dark-only: el chrome del navegador (barra de estado móvil, dirección en
// Android) debe casar con el canvas oscuro, no caer al blanco por defecto.
export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: t("title"),
      template: "%s — Marcos Estévez",
    },
    description: t("description"),
    applicationName: SITE.shortName,
    authors: [{ name: SITE.name, url: SITE.domain }],
    creator: SITE.name,
    alternates: buildAlternates(locale, ""),
    openGraph: {
      type: "website",
      siteName: SITE.shortName,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      url: `${SITE.domain}/${locale}`,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${clash.variable} ${satoshi.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain flex min-h-screen flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <div aria-hidden className="tech-bg" />
        <span id="top" aria-hidden className="absolute top-0" />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only z-[var(--z-skip)] rounded-sm bg-accent px-4 py-2 text-sm font-medium text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            {t("skip")}
          </a>
          <ScrollProgress />
          <SmoothScroll>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="relative z-[var(--z-content)] flex-1 focus:outline-none">
              {children}
            </main>
            <SiteFooter />
          </SmoothScroll>
          <MissionRail />
          <Cursor />
          <Crosshair />
          <BootSequence />
          <CookieConsent />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
