import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { Channel } from "@/components/hud/channel";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "@/components/icons";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const nav = [
    { href: "/#servicios", label: tn("services") },
    { href: "/work", label: tn("work") },
    { href: "/#sobre-mi", label: tn("about") },
    { href: "/#contacto", label: tn("contact") },
  ];

  const socials = [
    { href: SITE.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: SITE.socials.github, label: "GitHub", Icon: Github },
    { href: `mailto:${SITE.email}`, label: "Email", Icon: Mail },
    { href: `tel:${SITE.phoneHref}`, label: SITE.phone, Icon: Phone },
  ];

  return (
    <footer className="relative mt-px border-t border-line bg-elevated">
      <div className="scanline absolute inset-x-0 top-0" aria-hidden />
      <div className="shell py-16 md:py-20">
        {/* Tagline */}
        <div className="flex flex-col gap-8 border-b border-line pb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-xl flex-col gap-5">
            <Channel label={t("availability")} code="t+∞" />
            <p className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.05] text-ink">
              {t("tagline")}
            </p>
          </div>
          <a
            href="#top"
            className="mono group inline-flex items-center gap-2 self-start text-xs uppercase tracking-widest text-ink-dim transition-colors hover:text-ink"
          >
            {t("backToTop")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-2">
            <span className="mono text-xs uppercase tracking-widest text-ink-mute">
              {SITE.name}
            </span>
            <p className="max-w-xs text-sm text-ink-dim">{t("madeWith")}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-accent-text underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="mono text-xs uppercase tracking-widest text-ink-mute">
              {t("navTitle")}
            </span>
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-dim transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="mono text-xs uppercase tracking-widest text-ink-mute">
              {t("connectTitle")}
            </span>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={
                  href.startsWith("mailto:") || href.startsWith("tel:")
                    ? undefined
                    : "_blank"
                }
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p className="mono">
            © {year} {SITE.name}. {t("rights")}
          </p>
          <div className="mono flex items-center gap-5 uppercase tracking-widest">
            <Link href="/legal/privacy" className="hover:text-ink">
              {t("privacy")}
            </Link>
            <Link href="/legal/legal-notice" className="hover:text-ink">
              {t("legalNotice")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
