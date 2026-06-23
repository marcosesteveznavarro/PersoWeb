"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Conmutador ES / EN. Preserva la ruta; el locale persiste vía cookie
 *  que escribe el proxy de next-intl. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  return (
    <div
      className={cn("mono flex items-center text-xs", className)}
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc, i) => {
        const isActive = loc === locale;
        return (
          <span key={loc} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="px-1 text-line-strong">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                router.replace(
                  pathname +
                    (typeof window !== "undefined" ? window.location.hash : ""),
                  { locale: loc },
                )
              }
              aria-current={isActive ? "true" : undefined}
              aria-label={t(loc)}
              lang={loc}
              className={cn(
                "-my-1 px-2 py-1.5 uppercase tracking-widest transition-colors duration-200",
                isActive
                  ? "text-accent-text"
                  : "text-ink-mute hover:text-ink",
              )}
            >
              {loc}
            </button>
          </span>
        );
      })}
    </div>
  );
}
