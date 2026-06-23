import { useTranslations } from "next-intl";

const ITEMS = [
  "GymCrew — Google Play",
  "Autocaravanas Aurora",
  "Software crítico · Grupo BMW",
  "Agile / Scrum",
  "JIRA",
  "Next.js",
  "Android",
  "Python",
  "OpenAI API",
  "Delivery",
];

/** Marquesina "en producción": CSS puro, pausa al hover, reduced-motion la
 *  detiene. Decorativa, aria-hidden; el contenido real vive en las secciones. */
export function Marquee() {
  const t = useTranslations("marquee");

  return (
    <section className="marquee relative overflow-hidden border-y border-line bg-elevated py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent" />
      <div aria-hidden className="flex w-max select-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-move flex shrink-0 items-center">
            {ITEMS.map((item, i) => (
              <li key={`${copy}-${i}`} className="flex items-center">
                <span className="mono whitespace-nowrap px-6 text-sm text-ink-dim">
                  {item}
                </span>
                <span className="text-accent">/</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <span className="sr-only">{t("label")}</span>
    </section>
  );
}
