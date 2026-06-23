import type { Locale } from "@/i18n/routing";

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

// [RELLENAR] revisa con asesoría legal antes de publicar. Completa identidad,
// NIF y proveedor de hosting reales.
const UPDATED = "2026-06-23";

export const PRIVACY: Record<Locale, LegalDoc> = {
  es: {
    title: "Política de privacidad",
    updated: UPDATED,
    intro:
      "Esta política explica qué datos se tratan a través de este sitio y con qué fin, conforme al RGPD y la LOPDGDD.",
    sections: [
      {
        heading: "Responsable del tratamiento",
        body: [
          "Responsable: Marcos Estévez Navarro, O Porriño (Pontevedra), España.",
          "Contacto: marcos.esteveznavarro@gmail.com.",
        ],
      },
      {
        heading: "Datos que se recogen",
        body: [
          "Solo los que envías por el formulario de contacto: nombre, email y el contenido del mensaje.",
          "No se usan cookies de seguimiento de terceros.",
        ],
      },
      {
        heading: "Finalidad y base legal",
        body: [
          "Finalidad: responder a tu consulta o solicitud de servicio.",
          "Base legal: tu consentimiento al enviar el formulario.",
        ],
      },
      {
        heading: "Conservación",
        body: [
          "Conservo los datos el tiempo necesario para atender tu consulta y, si surge, la relación posterior; después se eliminan.",
        ],
      },
      {
        heading: "Destinatarios",
        body: [
          "Alojamiento: Vercel Inc. (con garantías adecuadas de transferencia internacional). Envío del email del formulario: Resend.",
          "Analítica sin cookies (Plausible), solo si está activada y das tu consentimiento.",
        ],
      },
      {
        heading: "Tus derechos",
        body: [
          "Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a marcos.esteveznavarro@gmail.com.",
          "También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    updated: UPDATED,
    intro:
      "This policy explains what data is processed through this site and why, under the GDPR.",
    sections: [
      {
        heading: "Data controller",
        body: [
          "Controller: Marcos Estévez Navarro, O Porriño (Pontevedra), Spain.",
          "Contact: marcos.esteveznavarro@gmail.com.",
        ],
      },
      {
        heading: "Data collected",
        body: [
          "Only what you send through the contact form: name, email and the message content.",
          "No third-party tracking cookies are used.",
        ],
      },
      {
        heading: "Purpose and legal basis",
        body: [
          "Purpose: to reply to your enquiry or service request.",
          "Legal basis: your consent when submitting the form.",
        ],
      },
      {
        heading: "Retention",
        body: [
          "Data is kept only as long as needed to handle your enquiry and any subsequent relationship, then deleted.",
        ],
      },
      {
        heading: "Recipients",
        body: [
          "Hosting: Vercel Inc. (with appropriate transfer safeguards). Contact-form email: Resend.",
          "Cookieless analytics (Plausible), only if enabled and consented to.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can exercise access, rectification, erasure, objection, restriction and portability by emailing marcos.esteveznavarro@gmail.com.",
          "You may also lodge a complaint with your data protection authority.",
        ],
      },
    ],
  },
};

export const LEGAL_NOTICE: Record<Locale, LegalDoc> = {
  es: {
    title: "Aviso legal",
    updated: UPDATED,
    intro: "Información general del titular y condiciones de uso del sitio.",
    sections: [
      {
        heading: "Titular",
        body: [
          "Titular: Marcos Estévez Navarro, O Porriño (Pontevedra), España.",
          "Contacto: marcos.esteveznavarro@gmail.com.",
          "Objeto: web personal, portfolio y oferta de servicios digitales.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        body: [
          "Los contenidos (textos, diseño, código y marca personal) pertenecen al titular salvo indicación en contrario.",
          "Las marcas de clientes y terceros pertenecen a sus respectivos propietarios.",
        ],
      },
      {
        heading: "Responsabilidad",
        body: [
          "El sitio se ofrece tal cual; el titular no se responsabiliza de un uso indebido ni de los contenidos de sitios externos enlazados.",
        ],
      },
      {
        heading: "Legislación aplicable",
        body: ["Se aplica la legislación española y los tribunales que correspondan."],
      },
    ],
  },
  en: {
    title: "Legal notice",
    updated: UPDATED,
    intro: "General owner information and terms of use of the site.",
    sections: [
      {
        heading: "Owner",
        body: [
          "Owner: Marcos Estévez Navarro, O Porriño (Pontevedra), Spain.",
          "Contact: marcos.esteveznavarro@gmail.com.",
          "Purpose: personal website, portfolio and digital services.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "Content (text, design, code and personal brand) belongs to the owner unless stated otherwise.",
          "Client and third-party trademarks belong to their respective owners.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The site is provided as is; the owner is not liable for misuse or for the content of external linked sites.",
        ],
      },
      {
        heading: "Applicable law",
        body: ["Spanish law and the corresponding courts apply."],
      },
    ],
  },
};
