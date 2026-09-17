import { motion } from "framer-motion";
import { Compass, HeartHandshake, ShieldCheck, Eye } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { homePage } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Compass, HeartHandshake, ShieldCheck, Eye];

export function WhyTravelWithUs() {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="GuruPriya Travels" title={t.home.whyUsTitle} subtitle={t.home.whyUsSubtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homePage.whyUs.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-premium flex flex-col gap-4 p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-50 text-saffron-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-charcoal">{pick(item.title)}</h3>
                <p className="text-sm leading-relaxed text-charcoal/60">{pick(item.description)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
