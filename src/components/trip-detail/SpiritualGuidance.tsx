import { Sparkles } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";

export function SpiritualGuidance({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();
  const spiritualFeature = trip.features.find((f) => f.icon === "spiritual");

  if (!spiritualFeature) return null;

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-px mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-saffron-50 to-gold/10 p-8 text-center sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gold-dark shadow-card">
            <Sparkles className="h-6 w-6" />
          </span>
          <h2 className="font-display text-xl font-bold text-charcoal">{t.trip.spiritualTitle}</h2>
          <p className="max-w-2xl leading-relaxed text-charcoal/65">{pick(spiritualFeature.description)}</p>
        </div>
      </div>
    </section>
  );
}
