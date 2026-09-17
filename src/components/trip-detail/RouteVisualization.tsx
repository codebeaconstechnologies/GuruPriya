import { motion } from "framer-motion";
import { Bus, MapPin } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip, RoutePoint } from "@/data/trips";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";

function RouteStrip({ stops, reduced }: { stops: RoutePoint[]; reduced: boolean }) {
  const pick = useLocalized();

  return (
    <div className="relative overflow-x-auto pb-6">
      <div className="relative flex min-w-max items-center gap-0 px-2 pt-10">
        <div className="absolute left-2 right-2 top-[52px] h-1 rounded-full bg-gradient-to-r from-saffron-200 via-gold to-saffron-200" />

        {!reduced && (
          <motion.div
            className="absolute top-[38px] z-10 text-saffron-600"
            animate={{ left: ["2%", "96%"] }}
            transition={{ duration: Math.max(stops.length * 1.6, 6), repeat: Infinity, ease: "linear" }}
          >
            <Bus className="h-6 w-6 drop-shadow" />
          </motion.div>
        )}

        {stops.map((stop, i) => (
          <div key={`${stop.id}-${i}`} className="flex w-36 shrink-0 flex-col items-center text-center">
            <span className="relative z-10 mb-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold bg-white text-saffron-600">
              <MapPin className="h-3 w-3" />
            </span>
            <span className="text-xs font-bold leading-snug text-charcoal">{pick(stop.name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RouteVisualization({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();
  const reduced = useReducedMotion();

  const pointsById = new Map(trip.routePoints.map((rp) => [rp.id, rp]));

  return (
    <section className="section-py bg-charcoal">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading light eyebrow={t.trip.majorDestinations} title={t.trip.routeTitle} subtitle={t.trip.routeSubtitle} />

        <div className="flex flex-col gap-10">
          {trip.routeSections.map((section) => {
            const stops = section.stops.map((id) => pointsById.get(id)).filter((s): s is RoutePoint => !!s);
            return (
              <div key={section.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">{pick(section.title)}</h3>
                <p className="mt-1 max-w-2xl text-sm text-white/60">{pick(section.description)}</p>
                <RouteStrip stops={stops} reduced={reduced} />
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs italic text-white/40">{t.trip.animatedRouteNote}</p>
      </div>
    </section>
  );
}
