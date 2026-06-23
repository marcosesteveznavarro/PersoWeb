import Link from "next/link";
import "./globals.css";

/**
 * not-found global (rutas sin locale). El layout raíz solo pasa children,
 * así que aquí proveemos <html>/<body>. Texto en ES por defecto.
 */
export default function GlobalNotFound() {
  return (
    <html lang="es" data-theme="dark">
      <body className="grid min-h-screen place-items-center bg-canvas text-ink antialiased">
        <main className="shell flex flex-col items-center gap-6 text-center">
          <span className="mono text-sm uppercase tracking-[0.3em] text-accent-text">
            404
          </span>
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-none">
            Señal perdida.
          </h1>
          <p className="max-w-sm text-ink-dim">
            Esta ruta no existe o se ha movido.
          </p>
          <Link
            href="/es"
            className="mono rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-ink"
          >
            Volver al inicio
          </Link>
        </main>
      </body>
    </html>
  );
}
