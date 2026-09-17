import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ItineraryTimeline({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();
  const pointsById = new Map(trip.routePoints.map((rp) => [rp.id, rp]));

  return (
    <section id="itinerary" className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-4xl">
        <SectionHeading eyebrow={pick(trip.duration)} title={t.trip.itineraryTitle} />

        <div className="relative flex flex-col gap-8 border-l-2 border-dashed border-gold/40 pl-8">
          {trip.itinerary.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-xs font-bold text-gold ring-4 ring-ivory">
                {day.day}
              </span>

              <div className="card-premium p-5 sm:p-6">
                <span className="eyebrow">{t.trip.day} {day.day}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-charcoal">{pick(day.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{pick(day.description)}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {day.locations.map((locId) => {
                    const point = pointsById.get(locId);
                    if (!point) return null;
                    return (
                      <span
                        key={locId}
                        className="inline-flex items-center gap-1 rounded-full bg-saffron-50 px-2.5 py-1 text-xs font-semibold text-saffron-700"
                      >
                        <MapPin className="h-3 w-3" />
                        {pick(point.name)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 rounded-2xl border border-charcoal/10 bg-white p-5 text-sm text-charcoal/60">
          {t.trip.itineraryNote}
        </p>
      </div>
    </section>
  );
}
