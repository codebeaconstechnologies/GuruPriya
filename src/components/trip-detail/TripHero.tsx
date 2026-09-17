import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { formatDateRange } from "@/utils/format";

export function TripHero({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${trip.heroImage}')` }} />
      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="container-px relative z-10 mx-auto w-full max-w-7xl pb-14 pt-36">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold backdrop-blur-sm"
        >
          {pick(trip.badge)}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          {pick(trip.title)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg"
        >
          {pick(trip.subtitle)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/85"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold" />
            {formatDateRange(trip.startDate, trip.endDate)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            {pick(trip.departure)}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 font-bold">{pick(trip.duration)}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link to="/contact" className="btn-primary">
            {t.trip.enquireAboutYatra}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#itinerary" className="btn-ghost-light">
            {t.common.seeFullItinerary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
