import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function CTASection() {
  const { t, language } = useI18n();

  return (
    <section className="relative overflow-hidden bg-temple-maroon py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #E0C577 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px"
        }}
      />
      <div className="container-px relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-extrabold text-white sm:text-4xl"
        >
          {t.home.ctaTitle}
        </motion.h2>
        <p className="max-w-xl text-white/75">{t.home.ctaSubtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            {t.home.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <WhatsAppButton
            message={
              language === "mr"
                ? "नमस्कार, मला यात्रेबद्दल अधिक माहिती हवी आहे."
                : "Hello, I would like more information about your yatras."
            }
          />
        </div>
      </div>
    </section>
  );
}
