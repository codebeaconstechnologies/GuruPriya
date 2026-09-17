import { Suspense, lazy } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { MapPin, Quote, ArrowRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { trips, founderStory, company } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { splitParagraphs } from "@/utils/format";
import { TripHero } from "@/components/trip-detail/TripHero";
import { QuickInfo } from "@/components/trip-detail/QuickInfo";
import { PricingCards } from "@/components/trip-detail/PricingCards";
import { Features } from "@/components/trip-detail/Features";
import { RouteVisualization } from "@/components/trip-detail/RouteVisualization";
import { ItineraryTimeline } from "@/components/trip-detail/ItineraryTimeline";
import { InclusionsExclusions } from "@/components/trip-detail/InclusionsExclusions";
import { RegistrationInfo } from "@/components/trip-detail/RegistrationInfo";
import { SpiritualGuidance } from "@/components/trip-detail/SpiritualGuidance";
import { TripGallery } from "@/components/trip-detail/TripGallery";
import { TripFAQ } from "@/components/trip-detail/TripFAQ";
import { EnquiryCTA } from "@/components/trip-detail/EnquiryCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";

const RouteMap = lazy(() => import("@/components/trip-detail/RouteMap").then((m) => ({ default: m.RouteMap })));

export default function TripDetail() {
  const { slug } = useParams();
  const { t } = useI18n();
  const pick = useLocalized();

  const trip = trips.find((tr) => tr.slug === slug);
  const founderExcerpt = splitParagraphs(pick(founderStory.founderMessage))[0];

  useSeo({
    title: trip ? pick(trip.seo.title) : "Yatra Not Found",
    description: trip ? pick(trip.seo.description) : "",
    keywords: trip?.seo.keywords,
    image: trip?.heroImage
  });

  if (!trip) {
    return <Navigate to="/yatras" replace />;
  }

  return (
    <>
      <TripHero trip={trip} />
      <QuickInfo trip={trip} />
      <PricingCards trip={trip} />
      <Features trip={trip} />

      <section className="bg-ivory py-10 sm:py-14">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Destinations" title={t.trip.majorDestinations} />
          <div className="flex flex-wrap gap-2.5">
            {trip.routePoints
              .filter((rp) => rp.category === "temple" || rp.category === "pilgrimage")
              .map((rp) => (
                <span
                  key={rp.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-charcoal shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-saffron-600" />
                  {pick(rp.name)}
                </span>
              ))}
          </div>
        </div>
      </section>

      <RouteVisualization trip={trip} />

      <Suspense
        fallback={
          <div className="section-py bg-white text-center text-charcoal/50">{t.common.loading}</div>
        }
      >
        <RouteMap trip={trip} />
      </Suspense>

      <ItineraryTimeline trip={trip} />
      <InclusionsExclusions trip={trip} />
      <RegistrationInfo trip={trip} />
      <SpiritualGuidance trip={trip} />

      <section className="bg-ivory py-10 sm:py-14">
        <div className="container-px mx-auto max-w-4xl">
          <div className="card-premium flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
            <img
              src={company.founder.photo}
              alt={pick(trip.organizer.name)}
              width={80}
              height={80}
              className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-gold/20"
            />
            <div>
              <Quote className="mx-auto mb-2 h-5 w-5 text-gold/50 sm:mx-0" />
              <p className="text-sm leading-relaxed text-charcoal/70">{founderExcerpt}</p>
              <p className="mt-3 font-display text-sm font-bold text-charcoal">
                {pick(trip.organizer.name)} <span className="font-normal text-charcoal/50">— {pick(trip.organizer.title)}</span>
              </p>
              <Link to="/about" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-saffron-600 hover:text-saffron-700">
                {t.common.readMore}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TripGallery trip={trip} />
      <TripFAQ />
      <EnquiryCTA trip={trip} />
    </>
  );
}
