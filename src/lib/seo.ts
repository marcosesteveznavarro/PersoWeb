import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";

/** path SIN locale (p. ej. "/work" o "" para home). */
function clean(path: string) {
  return path === "/" ? "" : path;
}

/** Mapa hreflang para `alternates.languages`. */
export function languageAlternates(path = "") {
  const c = clean(path);
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) languages[loc] = `${SITE.domain}/${loc}${c}`;
  languages["x-default"] = `${SITE.domain}/${routing.defaultLocale}${c}`;
  return languages;
}

/** URL canónica para un locale + path. */
export function canonical(locale: Locale, path = "") {
  return `${SITE.domain}/${locale}${clean(path)}`;
}

/** Bloque `alternates` listo para `Metadata`. */
export function buildAlternates(locale: Locale, path = "") {
  return {
    canonical: canonical(locale, path),
    languages: languageAlternates(path),
  };
}
