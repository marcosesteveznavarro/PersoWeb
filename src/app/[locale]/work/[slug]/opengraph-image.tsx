import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, projectSlugs } from "@/data/projects";
import { SITE } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Marcos Estévez — case study";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projectSlugs().map((slug) => ({ locale, slug })),
  );
}

/** OG específica del caso de estudio: título del proyecto, tipo y stack. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  const [clash, satoshi] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/ClashDisplay-Semibold.ttf")),
    readFile(join(process.cwd(), "src/fonts/og/Satoshi-Medium.ttf")),
  ]);

  const title = project?.title ?? SITE.shortName;
  const channel = project
    ? `${project.typeLabel[locale]} · ${project.year}`
    : locale.toUpperCase();
  const stack = project?.stack.slice(0, 4).join("  /  ") ?? "";

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
            {channel}
          </div>
        </div>

        {/* project title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#F4F4F2",
              fontFamily: "Clash",
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {stack && (
            <div
              style={{
                display: "flex",
                color: "#38a6ff",
                fontSize: 26,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {stack}
            </div>
          )}
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
          <div style={{ display: "flex" }}>{SITE.name}</div>
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
