import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useSeo } from "@/utils/seo";

export default function NotFound() {
  const { t } = useI18n();

  useSeo({ title: "404 | GuruPriya Tours & Travels", description: t.notFound.title });

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-4 text-center">
      <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-saffron-50 text-saffron-500">
        <Compass className="h-10 w-10" />
      </span>
      <h1 className="font-display text-2xl font-extrabold text-charcoal sm:text-3xl">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-charcoal/60">{t.notFound.subtitle}</p>
      <Link to="/" className="btn-primary mt-8">
        {t.common.backHome}
      </Link>
    </section>
  );
}
