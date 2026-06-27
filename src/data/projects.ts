import type { Locale } from "@/i18n/routing";

/**
 * Colección tipada de proyectos / casos de estudio.
 * Prosa bilingüe inline (cada caso se edita en un solo sitio).
 * Status real, sin exagerar. [RELLENAR] = dato a confirmar por Marcos.
 *
 * Por ahora solo proyectos publicados / en producción (GymCrew, Aurora).
 * Añade aquí los demás (SGS, Jovhen, Linda…) cuando estén listos.
 */

export type ProjectType = "saas" | "app" | "web" | "data";
export type ProjectStatus = "published" | "production" | "development";

export type Localized = Record<Locale, string>;

export interface ProjectMetric {
  label: Localized;
  /** Valor numérico/textual. Puede ser "[RELLENAR]" hasta tener el dato. */
  value: string;
}

export interface ProjectLink {
  label: string;
  href: string; // puede ser "[RELLENAR]"
}

export interface Project {
  slug: string;
  /** Nombre de marca (igual en ambos idiomas). */
  title: string;
  type: ProjectType;
  typeLabel: Localized;
  status: ProjectStatus;
  year: string;
  role: Localized;
  stack: string[];
  /** Una línea para tarjetas. */
  summary: Localized;
  problem: Localized;
  solution: Localized;
  result: Localized;
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
  featured: boolean;
  /** Nota de contexto (p. ej. paleta del cliente). */
  note?: Localized;
  /** Imagen de portada en /public (opcional). [RELLENAR] reales. */
  cover?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "gymcrew",
    title: "GymCrew",
    type: "app",
    typeLabel: { es: "App · SaaS", en: "App · SaaS" },
    status: "published",
    year: "2026",
    role: { es: "Producto + desarrollo Android", en: "Product + Android development" },
    stack: ["Android", "Kotlin", "Backend", "SaaS"],
    summary: {
      es: "Red social para gente que entrena, publicada en Google Play, con pivote B2B para gimnasios.",
      en: "A social network for people who train, live on Google Play, with a B2B pivot for gyms.",
    },
    problem: {
      es: "Entrenar es más constante en comunidad, y los gimnasios no tienen una capa social digital propia que retenga a sus socios.",
      en: "Training sticks better with a community, and gyms lack their own digital social layer to keep members engaged.",
    },
    solution: {
      es: "App social para deportistas con un módulo B2B donde cada gimnasio funciona como tenant: su comunidad, su marca, sus datos.",
      en: "A social app for athletes plus a B2B module where each gym runs as a tenant: its own community, brand and data.",
    },
    result: {
      es: "Publicada en Google Play. Pivote B2B en marcha; primer ancla previsto: Jovhen Sport.",
      en: "Live on Google Play. B2B pivot underway; first anchor planned: Jovhen Sport.",
    },
    metrics: [
      { label: { es: "Estado", en: "Status" }, value: "Google Play" },
      { label: { es: "Descargas", en: "Downloads" }, value: "[RELLENAR]" },
      { label: { es: "Tenant piloto", en: "Pilot tenant" }, value: "Jovhen Sport" },
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=io.gymcrew.app",
      },
    ],
    featured: true,
  },
  {
    slug: "marcosestevez-com",
    title: "Marcos Estévez",
    type: "web",
    typeLabel: { es: "Web · Portfolio", en: "Web · Portfolio" },
    status: "published",
    year: "2026",
    role: { es: "Diseño + desarrollo full-stack", en: "Full-stack design + development" },
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "next-intl", "Motion", "Vercel"],
    summary: {
      es: "Esta misma web: un portfolio bilingüe con estética 'tech', diseñado y construido de cero.",
      en: "This very site: a bilingual portfolio with a 'tech' aesthetic, designed and built from scratch.",
    },
    problem: {
      es: "Un perfil que mezcla gestión de entregas y desarrollo propio necesitaba una web que demostrara criterio de diseño y oficio técnico a la vez — no una plantilla más.",
      en: "A profile that blends delivery management and hands-on development needed a site that proves design judgment and technical craft at once — not one more template.",
    },
    solution: {
      es: "La diseñé y desarrollé entera: sistema de diseño oscuro 'Tech Blue', bilingüe ES/EN con next-intl, motion orquestado (Motion · GSAP · Lenis) y accesibilidad AA como suelo, no como extra.",
      en: "I designed and built the whole thing: a dark 'Tech Blue' design system, bilingual ES/EN with next-intl, orchestrated motion (Motion · GSAP · Lenis) and AA accessibility as a floor, not an add-on.",
    },
    result: {
      es: "La estás viendo. En producción en Vercel, con formulario de contacto real (Resend), SEO con JSON-LD y cabeceras de seguridad endurecidas.",
      en: "You're looking at it. Live on Vercel, with a working contact form (Resend), JSON-LD SEO and hardened security headers.",
    },
    metrics: [
      { label: { es: "Idiomas", en: "Languages" }, value: "ES · EN" },
      { label: { es: "Accesibilidad", en: "Accessibility" }, value: "WCAG AA" },
      { label: { es: "Estado", en: "Status" }, value: "Live" },
    ],
    links: [{ label: "marcosestevez.com", href: "https://www.marcosestevez.com" }],
    note: {
      es: "Sí: es esta página. El caso que estás leyendo vive en la propia web que describe.",
      en: "Yes — it's this page. The case you're reading lives on the very site it describes.",
    },
    featured: true,
    cover: "/work/marcosestevez.webp",
  },
  {
    slug: "linda-vibrante",
    title: "Linda Vibrante",
    type: "web",
    typeLabel: { es: "Web · Marca", en: "Web · Brand" },
    status: "published",
    year: "2026",
    role: { es: "Diseño + desarrollo full-stack", en: "Full-stack design + development" },
    stack: ["React 18", "Vite", "Motion sin librerías", "CSS a medida", "Vercel"],
    summary: {
      es: "Landing de una marca de estética y bienestar en Vigo: una sola página, mucho oficio de movimiento.",
      en: "Landing page for an aesthetics & wellness brand in Vigo: a single page, a lot of motion craft.",
    },
    problem: {
      es: "Una práctica de estética y bienestar necesitaba una presencia online cuidada que transmitiera su trato cercano y llevara a reservar, sin la fricción ni el coste de un CMS pesado.",
      en: "An aesthetics & wellness practice needed a polished online presence that conveyed its personal touch and led to bookings — without the friction or cost of a heavy CMS.",
    },
    solution: {
      es: "Una landing one-page 100% estática (React + Vite) con todo el motion resuelto sin librerías externas: scroll suave, revelados con máscara, cursor propio, botones magnéticos, parallax y grano — todo respetando 'prefers-reduced-motion'. Tipografía editorial con Newsreader y Hanken Grotesk.",
      en: "A 100% static one-page landing (React + Vite) with all the motion solved without external libraries: smooth scroll, mask reveals, a custom cursor, magnetic buttons, parallax and grain — all honoring 'prefers-reduced-motion'. Editorial type with Newsreader and Hanken Grotesk.",
    },
    result: {
      es: "En producción en Vercel. Presenta los servicios y deriva las reservas a Booksy y WhatsApp, sin backend que mantener.",
      en: "Live on Vercel. It showcases the services and routes bookings to Booksy and WhatsApp, with no backend to maintain.",
    },
    metrics: [
      { label: { es: "Formato", en: "Format" }, value: "One-page" },
      { label: { es: "Hosting", en: "Hosting" }, value: "Vercel" },
      { label: { es: "Ubicación", en: "Location" }, value: "Vigo" },
    ],
    links: [{ label: "lindavibrante.com", href: "https://www.lindavibrante.com" }],
    featured: true,
    cover: "/work/lindavibrante.webp",
  },
  {
    slug: "autocaravanas-aurora",
    title: "Autocaravanas Aurora",
    type: "saas",
    typeLabel: { es: "Software a medida", en: "Custom software" },
    status: "production",
    year: "2026",
    role: { es: "Diseño + desarrollo full-stack", en: "Full-stack design + development" },
    stack: ["Next.js", "TypeScript", "Reservas", "Gestión de flota"],
    summary: {
      es: "Software de gestión para una empresa de alquiler de autocaravanas: flota y reservas.",
      en: "Management software for a campervan rental company: fleet and bookings.",
    },
    problem: {
      es: "Coordinar flota, disponibilidad y reservas con hojas de cálculo genera solapamientos y huecos que cuestan dinero.",
      en: "Coordinating fleet, availability and bookings on spreadsheets creates overlaps and gaps that cost money.",
    },
    solution: {
      es: "Una herramienta a medida para gestionar flota y reservas en un solo sitio, con disponibilidad clara.",
      en: "A custom tool to manage fleet and bookings in one place, with clear availability.",
    },
    result: {
      es: "En producción para un cliente de pago, gestionando flota y reservas en un solo sitio.",
      en: "In production for a paying client, managing fleet and bookings in one place.",
    },
    metrics: [
      { label: { es: "Reservas/año", en: "Bookings/yr" }, value: "~120" },
      { label: { es: "Cliente", en: "Client" }, value: "B2B" },
    ],
    note: {
      es: "Proyecto privado del cliente: entregado y en uso real, sin capturas públicas.",
      en: "Private client project: delivered and in real use, no public screenshots.",
    },
    featured: true,
  },
];

export const PROJECT_TYPES: ProjectType[] = ["saas", "app", "web", "data"];

export const featuredProjects = PROJECTS.filter((p) => p.featured);

/** Tipos que realmente tienen proyectos (para los filtros del índice). */
export const availableTypes: ProjectType[] = PROJECT_TYPES.filter((t) =>
  PROJECTS.some((p) => p.type === t),
);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
