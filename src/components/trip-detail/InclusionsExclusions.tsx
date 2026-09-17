import { CheckCircle2, XCircle } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";

export function InclusionsExclusions({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <div className="card-premium p-7 sm:p-8">
          <h2 className="mb-5 font-display text-xl font-bold text-charcoal">{t.trip.inclusionsTitle}</h2>
          <ul className="space-y-3">
            {trip.inclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                {pick(item)}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-premium p-7 sm:p-8">
          <h2 className="mb-5 font-display text-xl font-bold text-charcoal">{t.trip.exclusionsTitle}</h2>
          <ul className="space-y-3">
            {trip.exclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal/70">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                {pick(item)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
