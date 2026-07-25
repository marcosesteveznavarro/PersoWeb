import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/** Manifest mínimo (no es una PWA instalable; mejora Lighthouse/branding). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.shortName,
    short_name: SITE.shortName,
    start_url: "/es",
    display: "browser",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
