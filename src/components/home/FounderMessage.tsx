import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company, founderStory } from "@/data/trips";
import { splitParagraphs } from "@/utils/format";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FounderMessage() {
  const { t } = useI18n();
  const pick = useLocalized();
  const paragraphs = splitParagraphs(pick(founderStory.founderMessage));

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading eyebrow="संस्थापक" title={t.home.founderTitle} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="card-premium relative flex flex-col items-center gap-8 p-8 text-center sm:p-12 md:flex-row md:items-start md:text-left"
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
              {paragraphs.map((para, i) => (
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
  );
}
