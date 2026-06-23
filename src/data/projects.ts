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
