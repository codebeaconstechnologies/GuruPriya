import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";
import { comingSoonTrips } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { ComingSoonCard } from "@/components/trips/ComingSoonCard";

export default function ComingSoon() {
  const { t } = useI18n();

  useSeo({
    title: `${t.comingSoonPage.heroTitle} | GuruPriya Tours & Travels`,
    description: t.comingSoonPage.heroSubtitle
  });

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-24 text-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #C89A3C 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px"
          }}
        />
        <div className="container-px relative mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-extrabold text-white sm:text-5xl"
          >
            {t.comingSoonPage.heroTitle}
          </motion.h1>
          <p className="mt-4 text-white/70">{t.comingSoonPage.heroSubtitle}</p>
        </div>
      </section>

      <section className="section-py bg-ivory">
        <div className="container-px mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {comingSoonTrips.map((trip, i) => (
            <ComingSoonCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
