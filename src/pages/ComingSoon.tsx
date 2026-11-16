import { useI18n } from "@/i18n/I18nContext";
import { comingSoonTrips } from "@/data/trips";
import { ComingSoonCard } from "@/components/trips/ComingSoonCard";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

export default function ComingSoon() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        image="tamilnadu-meenakshi"
        imageAlt="Gopuram of the Meenakshi Amman Temple, Madurai"
        eyebrow="Upcoming yatras"
        title={t.comingSoonPage.heroTitle}
        subtitle={t.comingSoonPage.heroSubtitle}
        mood="calm"
        size="sm"
      />
      <section className="section-py bg-sand">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {comingSoonTrips.map((trip, i) => (
            <ComingSoonCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </section>
      <CtaBand title="Be the first to know" text="Register your interest and we'll call you as soon as dates are announced." image="varanasi-aarti" ctaTo="/contact?category=pilgrimage#enquiry" ctaLabel="Register interest" />
    </>
  );
}
