import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Channel } from "@/components/hud/channel";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="grid min-h-[80vh] place-items-center px-6 py-32">
      <div className="flex flex-col items-center gap-7 text-center">
        <Channel label={t("code")} code="signal//lost" />
        <h1 className="font-display text-[clamp(3rem,12vw,8rem)] leading-none">
          {t("title")}
        </h1>
        <p className="max-w-sm text-pretty text-ink-dim">{t("body")}</p>
        <Button href="/" arrow>
          {t("home")}
        </Button>
      </div>
    </section>
  );
}
