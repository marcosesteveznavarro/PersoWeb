import type { ReactNode } from "react";
import "./globals.css";

/**
 * Layout raíz. Solo pasa children: las etiquetas <html>/<body> viven en
 * `[locale]/layout.tsx` para poder fijar `lang` según el locale.
 * (Patrón oficial de next-intl con App Router.)
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
