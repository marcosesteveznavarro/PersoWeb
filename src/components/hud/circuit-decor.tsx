/**
 * Decoración de circuito (estilo tarjeta de Marcos): trazas angulares con
 * nodos. Ambiente/marco, no datos. currentColor → tíñelo con text-accent.
 */
export function CircuitDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 520"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M600 80 H460 V170" />
        <path d="M600 170 H520 V60" />
        <path d="M600 260 H560 V340 H470" />
        <path d="M520 0 V70 H430" />
        <path d="M600 360 H500" />
        <path d="M600 440 H540 V380" />
      </g>
      <g fill="currentColor" opacity="0.65">
        <circle cx="460" cy="170" r="4" />
        <circle cx="520" cy="60" r="4" />
        <circle cx="470" cy="340" r="4" />
        <circle cx="430" cy="70" r="4" />
        <circle cx="500" cy="360" r="4" />
        <circle cx="540" cy="380" r="4" />
      </g>
      <g fill="currentColor" opacity="0.28">
        <circle cx="560" cy="120" r="2.5" />
        <circle cx="440" cy="250" r="2.5" />
        <circle cx="580" cy="300" r="2.5" />
      </g>
    </svg>
  );
}
