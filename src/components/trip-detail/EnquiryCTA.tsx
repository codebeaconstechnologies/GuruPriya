import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function EnquiryCTA({ trip }: { trip: Trip }) {
  const { t, language } = useI18n();
  const pick = useLocalized();

  return (
    <section className="relative overflow-hidden bg-temple-maroon py-16 text-center">
      <div className="container-px relative mx-auto flex max-w-3xl flex-col items-center gap-5">
        <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">{pick(trip.title)}</h2>
        <p className="text-white/75">{t.trip.enquireAboutYatra}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            {t.trip.bookThisYatra}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <WhatsAppButton
            message={
              language === "mr"
                ? `नमस्कार, मला "${pick(trip.title)}" या यात्रेबद्दल अधिक माहिती हवी आहे.`
                : `Hello, I would like more information about "${pick(trip.title)}".`
            }
          />
        </div>
      </div>
    </section>
  );
}
