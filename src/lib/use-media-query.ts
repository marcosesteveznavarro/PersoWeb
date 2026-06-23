import { useSyncExternalStore } from "react";

/**
 * Suscripción a una media query sin setState-en-effect (patrón correcto de
 * store externo en React 19). SSR devuelve `false`; el cliente reconcilia.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
