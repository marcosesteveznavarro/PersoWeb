import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Marcos Estévez — software engineering portfolio";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  const [clash, satoshi] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/ClashDisplay-Semibold.ttf")),
    readFile(join(process.cwd(), "src/fonts/og/Satoshi-Medium.ttf")),
  ]);

  const tagline =
    locale === "es"
      ? "Ingeniería de software que llega a producción."
      : "Software engineering that ships to production.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          padding: "72px",
          fontFamily: "Satoshi",
          position: "relative",
        }}
      >
        {/* grid backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #16181d 1px, transparent 1px), linear-gradient(to bottom, #16181d 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            display: "flex",
          }}
        />
        {/* top channel */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#38a6ff",
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#9AA1AC",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {`${SITE.name} · ${locale.toUpperCase()}`}
          </div>
        </div>

        {/* tagline */}
        <div
          style={{
            display: "flex",
            color: "#F4F4F2",
            fontFamily: "Clash",
            fontSize: 78,
            lineHeight: 1.02,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {tagline}
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#79808B",
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          <div style={{ display: "flex", color: "#38a6ff" }}>
            {`${t("description").slice(0, 56)}…`}
          </div>
          <div style={{ display: "flex" }}>marcosestevez.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash", data: clash, weight: 600, style: "normal" },
        { name: "Satoshi", data: satoshi, weight: 500, style: "normal" },
      ],
    },
  );
}
