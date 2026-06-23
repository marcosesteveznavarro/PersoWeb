"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";

const KEY = "cookie-consent";

function subscribe(onChange: () => void) {
  window.addEventListener("cookie-consent", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("cookie-consent", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function hasDecided() {
  try {
    return Boolean(localStorage.getItem(KEY));
  } catch {
    return true;
  }
}

/** Banner mínimo RGPD. La analítica es sin cookies; aun así respetamos la
 *  elección del usuario y solo cargamos el script si acepta. */
export function CookieConsent() {
  const t = useTranslations("cookies");
  // SSR / primer render: asumimos decidido (no mostrar) para evitar flash.
  const decided = useSyncExternalStore(subscribe, hasDecided, () => true);

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* no-op */
    }
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
  }

  if (decided) return null;

  return (
    <div
      role="region"
      aria-label={t("dialogLabel")}
      className="fixed inset-x-3 bottom-3 z-[var(--z-overlay)] mx-auto max-w-2xl rounded-md border border-line bg-elevated/95 p-4 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:bottom-4 sm:right-4 sm:p-5"
    >
      <p className="text-sm text-ink-dim">
        {t("message")}{" "}
        <Link
          href="/legal/privacy"
          className="text-accent-text underline-offset-4 hover:underline"
        >
          {t("policy")}
        </Link>
      </p>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => decide("granted")}
          className={buttonClasses("primary", "md")}
        >
          {t("accept")}
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className={buttonClasses("secondary", "md")}
        >
          {t("reject")}
        </button>
      </div>
    </div>
  );
}
