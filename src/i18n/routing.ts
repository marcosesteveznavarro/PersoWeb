import { defineRouting } from "next-intl/routing";

/**
 * Rutas por locale. ES por defecto, prefijo siempre visible (/es, /en)
 * para hreflang/canonical limpios.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
