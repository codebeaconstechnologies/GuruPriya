import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company, founderStory } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Philosophy } from "@/components/home/Philosophy";

export default function AboutUs() {
  const { t } = useI18n();
  const pick = useLocalized();

  useSeo({
    title: `${t.about.title} | GuruPriya Tours & Travels`,
    description: pick(company.description)
  });

  return (
    <>
      <section className="section-py bg-ivory">
        <div className="container-px mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="eyebrow"
          >
            {pick(founderStory.title)}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-3 font-display text-3xl font-extrabold text-charcoal sm:text-4xl"
          >
            {t.about.title}
          </motion.h1>
        </div>

        <div className="container-px mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-premium p-8"
          >
            <h2 className="mb-3 font-display text-xl font-bold text-charcoal">{t.about.whyWeStarted}</h2>
            <p className="leading-relaxed text-charcoal/65">{pick(founderStory.introduction)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-premium p-8"
          >
            <h2 className="mb-3 font-display text-xl font-bold text-charcoal">{t.about.ourStory}</h2>
            <p className="leading-relaxed text-charcoal/65">{pick(founderStory.story)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-premium p-8 md:col-span-2"
          >
            <h2 className="mb-3 font-display text-xl font-bold text-charcoal">{t.about.mission}</h2>
            <p className="leading-relaxed text-charcoal/65">{pick(founderStory.mission)}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-px mx-auto max-w-4xl">
          <SectionHeading eyebrow="संदेश" title={t.about.founderMessage} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium flex flex-col items-center gap-6 p-8 text-center sm:p-12 md:flex-row md:text-left"
          >
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-saffron-50 ring-4 ring-gold/20">
              <User className="h-14 w-14 text-saffron-500" />
            </div>
            <div>
              <Quote className="mx-auto mb-3 h-7 w-7 text-gold/50 md:mx-0" />
              <p className="text-lg leading-relaxed text-charcoal/75">{pick(founderStory.founderMessage)}</p>
              <div className="mt-5">
                <p className="font-display text-lg font-bold text-charcoal">{pick(company.founder.name)}</p>
                <p className="text-sm text-saffron-600">{pick(company.founder.title)}</p>
              </div>
            </div>
          </motion.div>
          <p className="mt-4 text-center text-xs italic text-charcoal/40">{t.about.placeholderNote}</p>
        </div>
      </section>

      <Philosophy />
    </>
  );
}
