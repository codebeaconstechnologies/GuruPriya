import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Testimonials" title={t.home.testimonialsTitle} subtitle={t.home.testimonialsSubtitle} />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-premium relative flex flex-col gap-4 p-6"
            >
              <Quote className="h-7 w-7 text-gold/50" />
              <blockquote className="text-sm leading-relaxed text-charcoal/70">"{pick(item.quote)}"</blockquote>
              <figcaption className="mt-auto text-sm font-bold text-charcoal">
                {item.name}
                <span className="block text-xs font-medium text-charcoal/45">{pick(item.location)}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-6 text-center text-xs italic text-charcoal/40">{t.home.testimonialsPlaceholderNote}</p>
      </div>
    </section>
  );
}
