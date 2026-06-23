"use client";

import { useEffect } from "react";

/**
 * Analítica respetuosa con la privacidad (Plausible/Umami), sin cookies.
 * Solo se carga si:
 *  - hay un dominio configurado en NEXT_PUBLIC_PLAUSIBLE_DOMAIN, y
 *  - el usuario no ha rechazado el consentimiento.
 * [RELLENAR] define NEXT_PUBLIC_PLAUSIBLE_DOMAIN para activarla.
 */
export function Analytics() {
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (!domain) return;

    const SCRIPT_ID = "plausible-analytics";

    function load() {
      if (document.getElementById(SCRIPT_ID)) return;
      try {
        if (localStorage.getItem("cookie-consent") === "denied") return;
      } catch {
        /* no-op */
      }
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.defer = true;
      s.dataset.domain = domain;
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }

    load();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "granted") load();
    };
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  return null;
}
