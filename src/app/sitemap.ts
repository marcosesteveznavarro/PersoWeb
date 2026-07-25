import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/data/site";
import { projectSlugs } from "@/data/projects";
import { languageAlternates } from "@/lib/seo";

/**
 * Sin `lastModified`: un `new Date()` por build marca todo como recién
 * cambiado y Google acaba ignorando el campo. Mejor ausente que falso.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.8 },
    ...projectSlugs().map((s) => ({ path: `/work/${s}`, priority: 0.7 })),
    { path: "/legal/privacy", priority: 0.3 },
    { path: "/legal/legal-notice", priority: 0.3 },
  ];

  return paths.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${SITE.domain}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority,
      // Mismo mapa que el <head> (incluye x-default) — coherencia hreflang.
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
