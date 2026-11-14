import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";

export function RegistrationInfo({ trip }: { trip: Trip }) {
  const { t } = useI18n();

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-7 sm:p-8">
          <div className="flex items-start gap-3">
            <Info className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />
            <div className="w-full">
              <h2 className="font-display text-xl font-bold text-charcoal">{t.trip.registrationTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{t.trip.registrationBody}</p>
              <Link to={`/contact?yatra=${trip.slug}`} className="btn-primary mt-5">
                {t.trip.enquireAboutYatra}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
