import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company, founderStory } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FounderMessage() {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading eyebrow="संस्थापक" title={t.home.founderTitle} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="card-premium relative flex flex-col items-center gap-6 p-8 text-center sm:p-12 md:flex-row md:text-left"
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
      </div>
    </section>
  );
}
