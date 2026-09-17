import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { formatCurrency } from "@/utils/format";

export function RegistrationInfo({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-7 sm:p-8">
          <div className="flex items-start gap-3">
            <Info className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />
            <div className="w-full">
              <h2 className="font-display text-xl font-bold text-charcoal">{t.trip.registrationTitle}</h2>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {trip.advanceRegistration.map((reg, i) => (
                  <li key={i}>
                    <span className="font-bold text-charcoal">{pick(reg.mode)}:</span> {formatCurrency(reg.amount)} ({t.trip.nonRefundable})
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-charcoal/55">{t.common.detailsShared}</p>
              <Link to="/contact" className="btn-primary mt-5">
                {t.trip.enquireAboutYatra}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
