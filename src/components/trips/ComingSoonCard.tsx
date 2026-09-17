import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Bell } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { ComingSoonTrip } from "@/data/trips";

export function ComingSoonCard({ trip, index = 0 }: { trip: ComingSoonTrip; index?: number }) {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-premium group relative flex flex-col overflow-hidden"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={trip.image}
          alt={pick(trip.title)}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[15%] transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-charcoal/90 px-3 py-1 text-xs font-bold text-gold">
          <Clock className="h-3 w-3" />
          {pick(trip.badge)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-charcoal">{pick(trip.title)}</h3>
        <p className="text-sm text-charcoal/60">{pick(trip.subtitle)}</p>
        <p className="text-sm italic text-charcoal/50">{pick(trip.description)}</p>

        <div className="mt-auto flex items-center gap-3 border-t border-charcoal/10 pt-4">
          <Link
            to={`/contact?yatra=${trip.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-bold text-white hover:bg-charcoal/85"
          >
            <Bell className="h-3.5 w-3.5" />
            {t.common.notifyMe}
          </Link>
          <Link
            to={`/contact?yatra=${trip.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/20 px-4 py-2 text-xs font-bold text-charcoal hover:border-gold hover:text-saffron-600"
          >
            {t.common.enquire}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
