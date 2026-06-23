import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/data/site";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { FeaturedWork } from "@/components/sections/featured-work";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta.home" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.domain}/#person`,
        name: SITE.name,
        url: SITE.domain,
        jobTitle: "Delivery & Project Manager",
        email: `mailto:${SITE.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vigo",
          addressRegion: "Galicia",
          addressCountry: "ES",
        },
        sameAs: [SITE.socials.linkedin, SITE.socials.github],
        knowsAbout: [
          "Project management",
          "Software delivery",
          "Agile",
          "Scrum",
          "Next.js",
          "Android",
          "SaaS",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.domain}/#service`,
        name: `${SITE.shortName} — Software & Web`,
        url: SITE.domain,
        description: t("description"),
        founder: { "@id": `${SITE.domain}/#person` },
        areaServed: "ES",
        serviceType: [
          "Custom software / SaaS",
          "Mobile apps",
          "Web design & development",
        ],
      },
    ],
  };

  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <FeaturedWork />
      <About />
      <Skills />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
