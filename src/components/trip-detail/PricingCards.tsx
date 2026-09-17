import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Train, Bus as BusIcon, Plane, Check } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { formatCurrency } from "@/utils/format";
import { SectionHeading } from "@/components/ui/SectionHeading";

const modeIcons = { railway: Train, bus: BusIcon, flight: Plane };

export function PricingCards({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();
  const cheapestAmount = Math.min(...trip.prices.map((p) => p.amount));

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.common.price} title={t.trip.packagePricing} />

        <div className="grid gap-6 md:grid-cols-3">
          {trip.prices.map((price, i) => {
            const Icon = modeIcons[price.mode];
            const isBest = price.amount === cheapestAmount;
            return (
              <motion.div
                key={price.mode}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col gap-4 rounded-2xl border p-7 ${
                  isBest ? "border-gold bg-white shadow-premium" : "border-charcoal/10 bg-white shadow-card"
                }`}
              >
                {isBest && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-white">
                    {t.common.startingFrom}
                  </span>
                )}
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-50 text-saffron-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-charcoal">{pick(price.name)}</h3>
                {price.duration && <p className="text-sm text-charcoal/50">{pick(price.duration)}</p>}
                <p className="font-display text-3xl font-extrabold text-saffron-700">
                  {formatCurrency(price.amount)}
                  <span className="ml-1 text-sm font-medium text-charcoal/45">/ {t.common.perPerson}</span>
                </p>
                <Link to="/contact" className="btn-primary mt-2 justify-center">
                  {t.trip.bookThisYatra}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {trip.advanceRegistration.map((reg, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-charcoal/10 bg-white p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-temple-red/10 text-temple-red">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-charcoal">
                  {pick(reg.mode)} — {formatCurrency(reg.amount)}
                </p>
                <p className="text-xs text-charcoal/50">{t.trip.nonRefundable}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
