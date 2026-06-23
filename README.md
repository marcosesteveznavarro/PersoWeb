# Marcos Estévez — Web personal

Web personal bilingüe (ES/EN) de Marcos Estévez Navarro: escaparate de servicios
digitales + portfolio + carta de presentación. Dirección de arte **"Tech Blue"**
(dark premium **solo modo oscuro**, azul eléctrico `#38a6ff` HUD, vernáculo de
telemetría/automoción: boot, osciloscopio, arco de tacómetro, timeline, rail de misión).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl ·
Motion + GSAP/ScrollTrigger · Lenis · fuentes self-hosted (Clash Display, Satoshi,
JetBrains Mono).

---

## Arrancar

```bash
npm install
npm run dev      # desarrollo → http://localhost:3000 (redirige a /es)
npm run build    # build de producción
npm run start    # servir el build
npm run lint
```

Node 18.18+ (probado con Node 24). Copia `.env.example` a `.env.local` si vas a
activar analítica o el envío de email.

---

## Estructura

```
messages/
  es.json · en.json        ← TODA la copy traducible (edítala aquí)
src/
  app/
    [locale]/               ← rutas por locale (/es, /en)
      layout.tsx            ← <html lang>, fuentes, providers, header/footer
      page.tsx              ← home (ensambla las secciones + JSON-LD)
      work/                 ← índice de trabajo + work/[slug] (caso de estudio)
      legal/                ← privacidad · aviso legal
      opengraph-image.tsx   ← OG dinámica por locale
      not-found.tsx
    api/contact/route.ts    ← handler del formulario (validación + honeypot)
    sitemap.ts · robots.ts
    globals.css             ← DESIGN TOKENS + tema (ver abajo)
  proxy.ts                  ← negociación de locale (Next 16 renombra middleware→proxy)
  i18n/                     ← routing, request, navigation de next-intl
  data/
    site.ts                 ← identidad, contacto, redes, nav, servicios, skills
    projects.ts             ← colección tipada de proyectos (bilingüe inline)
    legal.ts                ← textos legales (bilingüe)
  components/
    sections/               ← hero, marquee, services, process, featured-work,
                              about, skills, social-proof, contact
    layout/                 ← header, footer, language-switcher, theme-toggle,
                              scroll-progress, cursor, cookie-consent
    hud/                    ← channel, section-header, telemetry-panel (firma)
    work/                   ← project-card, project-visual, status-badge, work-explorer
    motion/                 ← split-text
    ui/                     ← button, magnetic
  fonts/                    ← woff2 self-hosted (+ /og ttf para la imagen OG)
```

---

## Editar contenido (sin tocar componentes)

- **Textos / copy:** `messages/es.json` y `messages/en.json`. Mantén las mismas
  claves en ambos. Cero texto hardcodeado en los componentes.
- **Proyectos / casos de estudio:** `src/data/projects.ts`. Cada proyecto lleva
  su prosa bilingüe inline (`summary`, `problem`, `solution`, `result`, `role`,
  `metrics`, `links`, `status`, `featured`…). Añade uno al array `PROJECTS` y
  aparece solo en la home (si `featured: true`), en `/work` y con su propia página
  `/work/<slug>`.
- **Datos del sitio:** `src/data/site.ts` (email, redes, CV, nav, skills, idiomas).
- **Legal:** `src/data/legal.ts`.

### Imágenes reales de proyecto
Cada tarjeta usa un **visual de telemetría generado** (honesto, no una captura
falsa). Para una imagen real: añádela a `/public` y rellena `cover: "/mi-imagen.jpg"`
en el proyecto de `projects.ts`.

---

## Tema y acento de marca

Todo el sistema visual son **design tokens** en `src/app/globals.css`.

**Cambiar el acento (swap trivial):** ajusta `data-theme`/`data-accent` en `<html>`
desde `src/app/[locale]/layout.tsx`:

| Paleta | Atributo | Acento |
|--------|----------|--------|
| A · Telemetry Night (default) | _(ninguno)_ | lima `#CDFF3D` |
| B · Racing Amber | `data-accent="amber"` | ámbar `#FFB257` |
| C · Carbon & Cyan | `data-accent="cyan"` | cian `#36E0FF` |

**Light mode:** incluido y accesible. Lo controla el toggle de la cabecera
(persiste en `localStorage`, sin flash gracias al script no-FOUC). Arranca en oscuro.

Para ajustar colores, espaciado, radios o tipografía, edita las variables CSS al
inicio de `globals.css` (`:root`, `[data-accent="…"]`, `[data-theme="light"]`).

---

## Motion

- **Lenis** smooth scroll sincronizado con el ticker de **GSAP** (`SmoothScroll`).
- Reveals al scroll **100% CSS** (`animation-timeline: view()`) → sin JS, sin flash.
- Hero con split-text (GSAP), trabajo destacado con scroll horizontal pinneado
  (ScrollTrigger), botones magnéticos, cursor sutil, marquesina CSS.
- **Todo** respeta `prefers-reduced-motion` y degrada sin JS.

---

## Formulario de contacto

`src/app/api/contact/route.ts` valida, filtra spam (honeypot + rate-limit best
effort) y **envía el email vía Resend** cuando defines `RESEND_API_KEY`. Sin la
key valida y responde OK pero no envía (modo desarrollo, registra en servidor).
Con el remitente por defecto `onboarding@resend.dev` envía a tu Gmail **sin
verificar dominio**; para un remitente propio (`web@marcosestevez.com`) verifica
el dominio en Resend y define `CONTACT_FROM`.

## Analítica + consentimiento

Analítica sin cookies (Plausible) que **solo** se carga si defines
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` y el usuario no rechaza el banner de cookies.

## SEO

Metadata por locale, `hreflang` (es/en/x-default) + canonical, Open Graph dinámico
por locale, JSON-LD (`Person`, `ProfessionalService`, `CreativeWork` por proyecto),
`sitemap.xml` y `robots.txt`.

---

## Desplegar en Vercel

1. **GitHub:** sube el repo a un repositorio de GitHub.
2. **Vercel:** importa el repo en [vercel.com/new](https://vercel.com/new)
   (detecta Next.js solo; no toques el build).
3. **Variables de entorno** (Vercel → Project → Settings → Environment Variables):
   - `RESEND_API_KEY` — activa el envío del formulario.
   - `CONTACT_FROM` *(opcional)* — remitente propio tras verificar dominio en Resend.
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` *(opcional)* — activa la analítica.
4. **Dominio** (`marcosestevez.com`, registrado en Cloudflare): añádelo en Vercel
   → Domains y crea en Cloudflare los registros DNS que indique Vercel (modo
   *DNS only* / nube gris, no proxy). `SITE.domain` ya apunta ahí.
5. Cada push a la rama de producción despliega solo. El build es estático salvo
   el endpoint `/api/contact` (serverless).

---

## Pendientes — qué queda

Casi todo el contenido real ya está puesto (CV, fechas, métricas, enlace de
Google Play, legales). Posicionamiento: **Delivery & Project Manager que
construye sus propios productos**. Proyectos visibles: **GymCrew** y
**Autocaravanas Aurora** (los demás se añaden cuando estén publicados).

- [x] **CV en PDF** en `public/` (el botón ya apunta ahí).
- [x] **Dominio** `marcosestevez.com` comprado (Cloudflare). Pendiente: conectarlo en Vercel + DNS.
- [ ] **Email del formulario** → cuenta gratis en [Resend](https://resend.com) con tu Gmail, crea una API key y añade `RESEND_API_KEY` en `.env.local` (local) y en Vercel (producción). Ya cableado; sin la key valida pero no envía.
- [ ] **Remitente propio (opcional)** → verifica `marcosestevez.com` en Resend y define `CONTACT_FROM="Marcos Estévez <web@marcosestevez.com>"`.
- [ ] **Analítica (opcional)** → `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` para activarla.
- [ ] **Legal (opcional)** → si facturas como autónomo, valora añadir NIF al aviso legal (LSSI-CE) en `src/data/legal.ts` (la dirección de O Porriño es correcta).
- [ ] **Más proyectos** → añade los demás en `src/data/projects.ts` cuando estén publicados (`featured: true` para la home).

---

## Checklist "Done"

- [x] Bilingüe ES/EN con selector + hreflang/canonical correctos.
- [x] Home completa + índice de trabajo + plantilla de caso de estudio.
- [x] Contenido real sembrado; placeholders `[RELLENAR]` marcados, cero datos inventados.
- [x] Las 3 ofertas de servicio destacadas con CTA.
- [x] Design tokens + 3 paletas (A por defecto) + light mode; tipografía variable libre.
- [x] Motion premium con `prefers-reduced-motion`.
- [x] SEO completo (metadata por locale, OG dinámica, JSON-LD, sitemap, robots).
- [x] Formulario con anti-spam; analítica privacy-friendly + consentimiento; legales.
- [x] Responsive impecable (mobile-first).
- [ ] WCAG 2.2 AA + Lighthouse ≥95 → verificar con dominio/datos reales tras rellenar.
```
