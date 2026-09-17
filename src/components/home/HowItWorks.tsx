import { motion } from "framer-motion";
import { CalendarCheck, MessageSquareText, BadgeCheck, Plane } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { icon: CalendarCheck, title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { icon: MessageSquareText, title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { icon: BadgeCheck, title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
    { icon: Plane, title: t.howItWorks.step4Title, desc: t.howItWorks.step4Desc }
  ];

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Process" title={t.home.howItWorksTitle} subtitle={t.home.howItWorksSubtitle} />

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent lg:block" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-ivory bg-white shadow-card">
                <step.icon className="h-7 w-7 text-saffron-600" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-[11px] font-bold text-gold">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-1 font-display text-base font-bold text-charcoal">{step.title}</h3>
              <p className="max-w-[220px] text-sm text-charcoal/60">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
