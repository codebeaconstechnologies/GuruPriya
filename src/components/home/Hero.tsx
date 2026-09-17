import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { homePage, featuredTrip } from "@/data/trips";

export function Hero() {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${featuredTrip.heroImage}')` }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-8 top-28 hidden h-24 w-24 rounded-full border border-gold/30 sm:block"
        aria-hidden
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-1/3 hidden h-16 w-16 rounded-full border border-gold/20 sm:block"
        aria-hidden
      />

      <div className="container-px relative z-10 mx-auto w-full max-w-7xl pb-16 pt-40 sm:pb-24">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold backdrop-blur-sm"
        >
          {t.home.heroKicker}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
        >
          {pick(homePage.hero.title)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-lg font-medium text-gold/90"
        >
          {t.home.heroTagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-3 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          {pick(homePage.hero.subtitle)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link to={`/yatras/${featuredTrip.slug}`} className="btn-primary">
            {pick(homePage.hero.primaryCTA)}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-ghost-light">
            <MessageCircle className="h-4 w-4" />
            {pick(homePage.hero.secondaryCTA)}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
