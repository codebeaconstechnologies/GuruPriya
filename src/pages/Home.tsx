import { Suspense, lazy } from "react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { Hero } from "@/components/home/Hero";
import { FeaturedYatra } from "@/components/home/FeaturedYatra";
import { ComingSoonPreview } from "@/components/home/ComingSoonPreview";
import { WhyTravelWithUs } from "@/components/home/WhyTravelWithUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Philosophy } from "@/components/home/Philosophy";
import { Testimonials } from "@/components/home/Testimonials";
import { FounderMessage } from "@/components/home/FounderMessage";
import { CTASection } from "@/components/home/CTASection";

const JourneyMap = lazy(() => import("@/components/home/JourneyMap").then((m) => ({ default: m.JourneyMap })));

export default function Home() {
  const pick = useLocalized();
  const { t } = useI18n();

  useSeo({
    title: `${pick(company.name)} | ${pick(company.tagline)}`,
    description: pick(company.description)
  });

  return (
    <>
      <Hero />
      <FeaturedYatra />
      <Suspense fallback={<div className="section-py bg-charcoal text-center text-white/40">{t.common.loading}</div>}>
        <JourneyMap />
      </Suspense>
      <ComingSoonPreview />
      <WhyTravelWithUs />
      <HowItWorks />
      <Philosophy />
      <Testimonials />
      <FounderMessage />
      <CTASection />
    </>
  );
}
