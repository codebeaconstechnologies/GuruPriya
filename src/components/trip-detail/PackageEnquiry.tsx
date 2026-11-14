import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Train, Bus, Plane, Phone, Send } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { getTravelOptions, type Trip } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { tripEnquiryMessage } from "@/utils/whatsapp";

const modeIcons = { railway: Train, bus: Bus, flight: Plane };

/**
 * Replaces the old pricing table. The website deliberately shows no package
 * amounts — pilgrims are directed to call / WhatsApp / enquire instead.
 */
export function PackageEnquiry({ trip }: { trip: Trip }) {
  const { t, language } = useI18n();
  const pick = useLocalized();
  const [primaryPhone, ...otherPhones] = trip.organizer.phones;
  const travelOptions = getTravelOptions(trip);

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-5 lg:items-start">
        <div className="lg:col-span-3">
          <SectionHeading eyebrow={t.trip.packageDetailsEyebrow} title={t.trip.packageDetailsTitle} subtitle={t.trip.packageDetailsBody} align="left" />

          <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal/50">{t.trip.travelOptions}</h3>
          <p className="mb-4 mt-1 text-sm text-charcoal/60">{t.trip.travelOptionsNote}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {travelOptions.map((option, i) => {
              const Icon = modeIcons[option.mode];
              return (
                <motion.div
                  key={option.mode}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/contact?yatra=${trip.slug}&mode=${option.mode}`}
                    title={t.trip.chooseThisMode}
                    className="flex h-full items-center gap-3 rounded-2xl border border-charcoal/10 bg-white p-4 shadow-card transition hover:border-gold"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-charcoal">{pick(option.name)}</p>
                      <p className="text-xs text-charcoal/50">
                        {option.duration ? pick(option.duration) : t.trip.chooseThisMode}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-temple-maroon p-7 text-white shadow-premium sm:p-8 lg:col-span-2"
        >
          <p className="eyebrow">{t.nav.enquireNow}</p>
          <h3 className="mt-2 font-display text-xl font-bold leading-snug">{pick(trip.title)}</h3>

          <div className="mt-6 flex flex-col gap-3">
            {primaryPhone && (
              <a href={`tel:+91${primaryPhone}`} className="btn-primary w-full">
                <Phone className="h-4 w-4" />
                {t.common.call} {primaryPhone}
              </a>
            )}
            <WhatsAppButton message={tripEnquiryMessage(pick(trip.title), language)} />
            <Link
              to={`/contact?yatra=${trip.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Send className="h-4 w-4" />
              {t.contact.formTitle}
            </Link>
          </div>

          {otherPhones.length > 0 && (
            <p className="mt-6 border-t border-white/15 pt-4 text-sm text-white/70">
              {otherPhones.map((phone, i) => (
                <span key={phone}>
                  {i > 0 && " / "}
                  <a href={`tel:+91${phone}`} className="font-semibold text-white hover:text-gold">
                    {phone}
                  </a>
                </span>
              ))}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
