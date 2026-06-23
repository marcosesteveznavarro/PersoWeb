import { Channel } from "@/components/hud/channel";
import type { LegalDoc } from "@/data/legal";

export function LegalDocView({ doc, code }: { doc: LegalDoc; code: string }) {
  return (
    <article className="shell max-w-3xl pb-24 pt-32 md:pt-40">
      <Channel label="Legal" code={code} />
      <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.5rem)]">{doc.title}</h1>
      <p className="mono mt-3 text-xs text-ink-mute">↳ {doc.updated}</p>
      <p className="mt-6 max-w-2xl text-pretty text-ink-dim">{doc.intro}</p>

      <div className="mt-12 flex flex-col gap-10">
        {doc.sections.map((s, i) => (
          <section key={i} className="flex flex-col gap-3 border-t border-line pt-8">
            <h2 className="font-display text-xl tracking-tight">{s.heading}</h2>
            {s.body.map((p, j) => (
              <p key={j} className="text-pretty leading-relaxed text-ink-dim">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
