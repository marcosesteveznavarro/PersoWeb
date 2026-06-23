/**
 * Datos estructurales del sitio (no-prosa). La copy traducible vive en
 * messages/{es,en}.json. Aquí: identidad, contacto, redes, navegación,
 * y las claves de servicios / proceso / skills.
 *
 * [RELLENAR] marca datos que solo Marcos puede confirmar.
 */

export const SITE = {
  name: "Marcos Estévez Navarro",
  shortName: "Marcos Estévez",
  initials: "MEN",
  role: { es: "Delivery & Project Manager", en: "Delivery & Project Manager" },
  location: { es: "Vigo, Galicia", en: "Vigo, Galicia (Spain)" },
  email: "marcos.esteveznavarro@gmail.com",
  phone: "671 11 38 59",
  phoneHref: "+34671113859",
  // [RELLENAR] confirmar al comprar el dominio (previsto: marcosestevez.com)
  domain: "https://marcosestevez.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/marcos-estevez-navarro/",
    github: "https://github.com/marcosesteveznavarro",
  },
  // [RELLENAR] copia el archivo CV_Marcos_Estevez.pdf en /public
  cvPath: "/CV_Marcos_Estevez.pdf",
} as const;

export type NavItem = { id: string; href: string };

/** Anclas de la home + páginas. El label sale de messages.nav.* */
export const NAV: NavItem[] = [
  { id: "services", href: "/#servicios" },
  { id: "work", href: "/work" },
  { id: "about", href: "/#sobre-mi" },
  { id: "contact", href: "/#contacto" },
];

export type ServiceId = "software" | "mobile" | "web";

/** Las 3 ofertas. Prosa en messages.services.items.<id> */
export const SERVICES: { id: ServiceId; code: string }[] = [
  { id: "software", code: "SVC.01" },
  { id: "mobile", code: "SVC.02" },
  { id: "web", code: "SVC.03" },
];

export type ProcessId = "discovery" | "design" | "build" | "delivery";

/** Pasos reales del proceso (secuencia → numeración ganada). */
export const PROCESS: ProcessId[] = ["discovery", "design", "build", "delivery"];

export type SkillGroupId = "delivery" | "product" | "ai" | "foundations";

/** Un chip de skill: texto neutro (tech) o localizado (conceptos). */
export type SkillItem = string | { es: string; en: string };

/** Grupos de stack. Títulos en messages.skills.groups.<id>. */
export const SKILL_GROUPS: { id: SkillGroupId; items: SkillItem[] }[] = [
  {
    id: "delivery",
    items: [
      "Agile / Scrum",
      "JIRA",
      "Confluence",
      { es: "Roadmap y backlog", en: "Roadmap & backlog" },
      { es: "Métricas de delivery", en: "Delivery metrics" },
      { es: "Gestión de riesgos", en: "Risk management" },
      { es: "Presupuesto", en: "Budget" },
    ],
  },
  {
    id: "product",
    items: ["TypeScript", "Next.js", "React", "Android", "Python", "Node.js"],
  },
  {
    id: "ai",
    items: [
      { es: "APIs de LLM", en: "LLM APIs" },
      { es: "Agentes de IA", en: "AI agents" },
      "OpenAI API",
      { es: "Automatización", en: "Automation" },
    ],
  },
  {
    id: "foundations",
    items: [
      "Git",
      "GitLab",
      "CI / CD",
      { es: "Validación HW/SW", en: "HW/SW validation" },
      "LabVIEW",
      "CAPL",
      "CAN",
    ],
  },
];

/** Idiomas hablados. value = nivel (no traducible salvo "nativo"). */
export const LANGUAGES: { id: string; level: { es: string; en: string } }[] = [
  { id: "Español", level: { es: "Nativo", en: "Native" } },
  { id: "Galego", level: { es: "Nativo", en: "Native" } },
  { id: "English", level: { es: "C1", en: "C1" } },
  { id: "Português", level: { es: "B1–B2", en: "B1–B2" } },
];

/** Acentos alternativos via data-accent en <html>. El base (sin atributo) es
 *  el azul de marca #38a6ff; cada uno aquí tiene su bloque [data-accent] en
 *  globals.css (mantener 1:1). */
export const ACCENTS = ["amber", "cyan"] as const;
export type Accent = (typeof ACCENTS)[number];
