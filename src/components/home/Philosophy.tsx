import { motion } from "framer-motion";
import { Flame, HandHeart, Users, ShieldCheck, Clock, Home } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Philosophy() {
  const { t } = useI18n();

  const values = [
    { icon: Flame, ...t.philosophy.faith },
    { icon: HandHeart, ...t.philosophy.trust },
    { icon: Users, ...t.philosophy.seva },
    { icon: ShieldCheck, ...t.philosophy.safety },
    { icon: Clock, ...t.philosophy.punctual },
    { icon: Home, ...t.philosophy.warmth }
  ];

  return (
    <section className="section-py relative overflow-hidden bg-charcoal">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C89A3C 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px"
        }}
      />
      <div className="container-px relative mx-auto max-w-7xl">
        <SectionHeading
          light
          eyebrow="मूल्ये"
          title={t.home.philosophyTitle}
          subtitle={t.home.philosophySubtitle}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mb-1.5 font-display text-lg font-bold text-white">{v.title}</h3>
              <p className="text-sm text-white/60">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
