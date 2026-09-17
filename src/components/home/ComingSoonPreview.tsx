import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { comingSoonTrips } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComingSoonCard } from "@/components/trips/ComingSoonCard";

export function ComingSoonPreview() {
  const { t } = useI18n();

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.common.comingSoon}
          title={t.home.comingSoonTitle}
          subtitle={t.home.comingSoonSubtitle}
          action={
            <Link to="/coming-soon" className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-saffron-600 hover:text-saffron-700">
              {t.common.viewDetails}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-3">
          {comingSoonTrips.map((trip, i) => (
            <ComingSoonCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
