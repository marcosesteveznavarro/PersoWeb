import { useTranslations } from "next-intl";
import { SERVICES, type ServiceId } from "@/data/site";
import { SectionHeader } from "@/components/hud/section-header";
import { Reveal } from "@/components/reveal";
import {
  ArrowUpRight,
  BrowserIcon,
  ChipIcon,
  DeviceIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const ICONS: Record<ServiceId, typeof ChipIcon> = {
  software: ChipIcon,
  mobile: DeviceIcon,
  web: BrowserIcon,
};

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="servicios" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeader
        channel={t("channel")}
        code="SVC // 01"
        title={t("title")}
        lead={t("lead")}
      />

      <div className="mt-14 grid auto-rows-[minmax(0,1fr)] gap-4 lg:grid-cols-6">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.id];
          const featured = i === 0;
          return (
            // Reveal (entrada) envuelve; la tarjeta .inst (hover) va dentro:
            // así la animación scroll-timeline no "fija" el transform del lift.
            <Reveal
              key={s.id}
              className={cn(
                "h-full",
                featured ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-3",
              )}
            >
              <article
                className={cn(
                  "inst group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-line bg-surface p-7",
                  featured && "lg:p-9",
                )}
              >
                <span className="sweep" aria-hidden />
                <span
                  aria-hidden
                  className="tick-tl absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l border-t border-accent/50"
                />
                <span
                  aria-hidden
                  className="tick-br absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b border-r border-accent/50"
                />

                <div className="relative flex items-start justify-between">
                  <span className="mono text-xs tracking-widest text-ink-mute">
                    {s.code}
                  </span>
                  <Icon className="h-6 w-6 text-accent-text transition-transform duration-300 group-hover:scale-110" />
                </div>

                <div
                  className={cn(
                    "relative flex flex-col gap-3",
                    featured ? "mt-16" : "mt-12",
                  )}
                >
                  <h3
                    className={cn(
                      "font-display tracking-tight",
                      featured ? "text-[clamp(1.6rem,3vw,2.4rem)]" : "text-2xl",
                    )}
                  >
                    {t(`items.${s.id}.title`)}
                  </h3>
                  <p
                    className={cn(
                      "text-pretty text-ink-dim",
                      featured && "max-w-md text-[1.05rem]",
                    )}
                  >
                    {t(`items.${s.id}.desc`)}
                  </p>
                </div>

                <div className="relative mt-7 flex items-end justify-between border-t border-line pt-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="channel">{t("forWhom")}</span>
                    <p className="max-w-xs text-sm text-ink">
                      {t(`items.${s.id}.who`)}
                    </p>
                  </div>
                  <ArrowUpRight className="arrow h-5 w-5 shrink-0 text-ink-mute" />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
