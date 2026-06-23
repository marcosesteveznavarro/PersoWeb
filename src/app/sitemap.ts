import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/data/site";
import { projectSlugs } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    "/legal/privacy",
    "/legal/legal-notice",
    ...projectSlugs().map((s) => `/work/${s}`),
  ];

  const languages = (path: string) =>
    Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE.domain}/${l}${path}`]),
    );

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE.domain}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: languages(path) },
    })),
  );
}
