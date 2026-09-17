import { motion } from "framer-motion";
import { Stethoscope, Gem, Sparkles, BedDouble, Utensils, ShieldCheck } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, typeof Stethoscope> = {
  doctor: Stethoscope,
  rudraksha: Gem,
  spiritual: Sparkles,
  hotel: BedDouble,
  food: Utensils,
  transparent: ShieldCheck
};

export function Features({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Highlights" title={t.trip.whySpecial} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trip.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-premium flex flex-col gap-3 p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold-dark">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-base font-bold text-charcoal">{pick(feature.title)}</h3>
                <p className="text-sm leading-relaxed text-charcoal/60">{pick(feature.description)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
