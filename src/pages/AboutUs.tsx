import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company, founderStory } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { splitParagraphs } from "@/utils/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Philosophy } from "@/components/home/Philosophy";

export default function AboutUs() {
  const { t } = useI18n();
  const pick = useLocalized();
  const founderParagraphs = splitParagraphs(pick(founderStory.founderMessage));

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
            className="card-premium flex flex-col items-center gap-8 p-8 text-center sm:p-12 md:flex-row md:items-start md:text-left"
          >
            <img
              src={company.founder.photo}
              alt={pick(company.founder.name)}
              width={160}
              height={160}
              className="h-32 w-32 shrink-0 rounded-full object-cover ring-4 ring-gold/20 sm:h-40 sm:w-40"
            />
            <div>
              <Quote className="mx-auto mb-3 h-7 w-7 text-gold/50 md:mx-0" />
              <div className="space-y-4 text-base leading-relaxed text-charcoal/75 sm:text-lg">
                {founderParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-5">
                <p className="font-display text-lg font-bold text-charcoal">{pick(company.founder.name)}</p>
                <p className="text-sm text-saffron-600">{pick(company.founder.title)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Philosophy />
    </>
  );
}
