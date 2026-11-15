import { withWidth } from "@/utils/images";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { featuredTrip, getDeparture } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDateRange } from "@/utils/format";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { tripEnquiryMessage } from "@/utils/whatsapp";

export function FeaturedYatra() {
  const { t, language } = useI18n();
  const pick = useLocalized();
  const trip = featuredTrip;

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow={pick(trip.badge)} title={t.home.featuredYatraTitle} subtitle={t.home.featuredYatraSubtitle} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid overflow-hidden rounded-3xl bg-white shadow-premium lg:grid-cols-2"
        >
          <div className="relative min-h-[280px] lg:min-h-full">
            <img
              src={withWidth(trip.heroImage, 960)}
              alt={pick(trip.title)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-saffron-700">
              {pick(trip.duration)}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
            <h3 className="font-display text-2xl font-extrabold leading-tight text-charcoal sm:text-3xl">
              {pick(trip.title)}
            </h3>
            <p className="text-charcoal/65">{pick(trip.subtitle)}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
                <span className="text-charcoal/75">{formatDateRange(trip.startDate, trip.endDate)}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
                <span className="text-charcoal/75">{pick(getDeparture(trip))}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
                <span className="text-charcoal/75">{pick(trip.duration)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {trip.highlights.slice(0, 4).map((h, i) => (
                <span key={i} className="rounded-full bg-saffron-50 px-3 py-1 text-xs font-semibold text-saffron-700">
                  {pick(h)}
                </span>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-charcoal/10 pt-5">
              <Link to={`/yatras/${trip.slug}`} className="btn-primary">
                {t.common.viewYatra}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppButton message={tripEnquiryMessage(pick(trip.title), language)} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
