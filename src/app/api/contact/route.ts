import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate-limit best-effort en memoria (se reinicia en cold start). Suficiente
// como primera barrera; combínalo con la protección del proveedor de deploy.
const WINDOW = 60_000;
const MAX = 5;
const hits = new Map<string, { count: number; ts: number }>();

function isLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const projectType = str(body.projectType);
  const company = str(body.company); // honeypot

  // Bots rellenan el honeypot: fingimos éxito y descartamos.
  if (company) return NextResponse.json({ ok: true });

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  // Envío de email vía Resend si hay API key (RESEND_API_KEY). Sin key,
  // registramos en servidor y devolvemos OK (modo desarrollo).
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.CONTACT_FROM ?? "Web Marcos <onboarding@resend.dev>",
        to: "marcos.esteveznavarro@gmail.com",
        replyTo: email,
        subject: `Nuevo mensaje de ${name}${projectType ? ` · ${projectType}` : ""}`,
        text: `Nombre: ${name}\nEmail: ${email}\nTipo: ${projectType || "—"}\n\n${message}`,
      });
    } catch (err) {
      console.error("[contact] fallo al enviar email", err);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } else {
    console.info("[contact] (sin RESEND_API_KEY) mensaje recibido", {
      name,
      email,
      projectType,
      length: message.length,
    });
  }

  return NextResponse.json({ ok: true });
}
