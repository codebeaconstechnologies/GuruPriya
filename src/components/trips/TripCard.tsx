import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { formatDateRange } from "@/utils/format";

export function TripCard({ trip, index = 0 }: { trip: Trip; index?: number }) {
  const { t } = useI18n();
  const pick = useLocalized();
  const startingPrice = Math.min(...trip.prices.map((p) => p.amount));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-premium group flex flex-col overflow-hidden"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={trip.heroImage}
          alt={pick(trip.title)}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-saffron-500 px-3 py-1 text-xs font-bold text-white shadow">
          {pick(trip.badge)}
        </span>
        <span className="absolute bottom-4 left-4 text-sm font-bold text-white">{pick(trip.duration)}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-charcoal">{pick(trip.title)}</h3>
        <p className="line-clamp-2 text-sm text-charcoal/60">{pick(trip.subtitle)}</p>

        <div className="mt-1 flex flex-col gap-1.5 text-xs text-charcoal/55">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-saffron-600" />
            {formatDateRange(trip.startDate, trip.endDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-saffron-600" />
            {pick(trip.departure)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-charcoal/10 pt-4">
          <div>
            <span className="block text-[11px] font-semibold uppercase text-charcoal/45">{t.common.startingFrom}</span>
            <span className="font-display text-xl font-extrabold text-saffron-700">
              ₹{startingPrice.toLocaleString("en-IN")}
            </span>
          </div>
          <Link
            to={`/yatras/${trip.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-saffron-600 hover:text-saffron-700"
          >
            {t.common.viewYatra}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
