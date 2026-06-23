/**
 * Corchetes de encuadre en las 4 esquinas del hero (motivo de visor/HUD).
 * Decoración pura (`aria-hidden`). Hijo directo del <section> del hero. Los
 * superiores bajan a top:100px para librar la cabecera fija.
 */
export function HeroBrackets() {
  const base = "pointer-events-none absolute h-[22px] w-[22px] opacity-[0.55]";
  return (
    <div aria-hidden>
      <span className={`${base} left-7 top-[100px] border-l border-t border-accent`} />
      <span className={`${base} right-7 top-[100px] border-r border-t border-accent`} />
      <span className={`${base} bottom-7 left-7 border-b border-l border-accent`} />
      <span className={`${base} bottom-7 right-7 border-b border-r border-accent`} />
    </div>
  );
}
