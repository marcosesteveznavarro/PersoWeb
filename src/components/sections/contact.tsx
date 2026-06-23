"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SITE } from "@/data/site";
import { ChannelLine } from "@/components/hud/channel-line";
import { buttonClasses } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  DeviceIcon,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

/** Enlaces verificables, visibles (antes en la sección "prueba social"). */
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: SITE.socials.linkedin, Icon: Linkedin },
  { label: "GitHub", href: SITE.socials.github, Icon: Github },
  {
    label: "Google Play — GymCrew",
    href: "https://play.google.com/store/apps/details?id=io.gymcrew.app",
    Icon: DeviceIcon,
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Sin focus-visible:outline-none: el anillo global :focus-visible debe verse
// con teclado (2.4.7). El borde de acento es el refuerzo suave en focus.
const FIELD =
  "w-full rounded-sm border border-line bg-canvas px-4 py-3 text-ink placeholder:text-ink-mute transition-colors focus:border-accent/50";

export function Contact() {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{
    name?: boolean;
    email?: "required" | "invalid" | null;
    message?: boolean;
  }>({});

  const types = ["software", "mobile", "web", "job", "other"] as const;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: typeof errors = {};
    if (!name) next.name = true;
    if (!email) next.email = "required";
    else if (!EMAIL_RE.test(email)) next.email = "invalid";
    if (!message) next.message = true;
    setErrors(next);
    if (Object.keys(next).length) {
      // Lleva el foco al primer campo con error para teclado/lector.
      const first = next.name ? "name" : next.email ? "email" : "message";
      form.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          projectType: String(data.get("projectType") ?? ""),
          company: String(data.get("company") ?? ""),
        }),
      });
      if (!res.ok) throw new Error("send failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-line bg-elevated"
    >
      <div className="shell py-24 md:py-32">
        {/* Línea de canal a ancho completo: el código // NN llega al borde
            derecho como en las demás secciones. */}
        <ChannelLine channel={t("channel")} code="MSG // 06" />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Lado izquierdo */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="flex flex-col gap-5">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)]">{t("title")}</h2>
            <p className="max-w-md text-pretty text-ink-dim">{t("lead")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="mono text-xs uppercase tracking-widest text-ink-mute">
              {t("directTitle")}
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-3 text-lg text-ink transition-colors hover:text-accent-text"
            >
              <Mail className="h-5 w-5" />
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="group inline-flex items-center gap-3 text-lg text-ink transition-colors hover:text-accent-text"
            >
              <Phone className="h-5 w-5" />
              {SITE.phone}
            </a>
          </div>

          {/* Enlaces verificables, visibles (antes en la sección 06) */}
          <div className="flex flex-col gap-3">
            <span className="mono text-xs uppercase tracking-widest text-ink-mute">
              {t("findMe")}
            </span>
            <ul className="flex flex-col gap-px overflow-hidden rounded-md border border-line bg-line">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between bg-surface px-5 py-4 transition-colors hover:bg-surface-2"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Icon className="h-4 w-4 text-accent-text" />
                      <span className="text-sm text-ink">{label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto rounded-md border border-line bg-surface p-5">
            <span className="channel">{t("hiring")}</span>
            <p className="mt-2 text-sm text-ink-dim">{t("hiringText")}</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-md border border-line bg-surface p-6 md:p-8"
          >
            {/* honeypot anti-spam (oculto) */}
            <div aria-hidden className="absolute left-[-9999px]" inert>
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="mono text-xs uppercase tracking-widest text-ink-dim">
                  {tf("name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={tf("namePlaceholder")}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "name-err" : undefined}
                  className={cn(FIELD, errors.name && "border-danger")}
                />
                {errors.name && (
                  <span id="name-err" className="text-xs text-danger">
                    {tf("required")}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="mono text-xs uppercase tracking-widest text-ink-dim">
                  {tf("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={tf("emailPlaceholder")}
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "email-err" : undefined}
                  className={cn(FIELD, errors.email && "border-danger")}
                />
                {errors.email && (
                  <span id="email-err" className="text-xs text-danger">
                    {errors.email === "invalid" ? tf("invalidEmail") : tf("required")}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="projectType" className="mono text-xs uppercase tracking-widest text-ink-dim">
                {tf("projectType")}
              </label>
              <select id="projectType" name="projectType" className={cn(FIELD, "appearance-none")}>
                {types.map((ty) => (
                  <option key={ty} value={ty}>
                    {tf(`types.${ty}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="mono text-xs uppercase tracking-widest text-ink-dim">
                {tf("message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={tf("messagePlaceholder")}
                aria-invalid={errors.message ? "true" : undefined}
                aria-describedby={errors.message ? "message-err" : undefined}
                className={cn(FIELD, "resize-y", errors.message && "border-danger")}
              />
              {errors.message && (
                <span id="message-err" className="text-xs text-danger">
                  {tf("required")}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className={buttonClasses("primary", "lg")}
              >
                <span>{status === "sending" ? tf("sending") : tf("submit")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p role="status" aria-live="polite" aria-atomic="true" className="text-sm">
                {status === "success" && (
                  <span className="text-ok">{tf("success")}</span>
                )}
                {status === "error" && (
                  <span className="text-danger">
                    {tf("error")}{" "}
                    <a href={`mailto:${SITE.email}`} className="underline">
                      {SITE.email}
                    </a>
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
}
