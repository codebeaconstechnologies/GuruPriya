import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { featuredTrip, type Trip } from "@/data/trips";
import { getReviewsForTrip, averageRating } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard, Stars } from "@/components/reviews/ReviewCard";

/** Shown on a completed yatra's page in place of the booking sections. */
export function TripReviews({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const reviews = getReviewsForTrip(trip.id);
  const avg = averageRating(reviews);

  return (
    <section id="reviews" className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.trip.reviewsEyebrow} title={t.trip.reviewsTitle} />

        <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 sm:flex-row">
          <p className="flex items-start gap-2 text-sm text-green-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {t.trip.completedNote}
          </p>
          {featuredTrip.id !== trip.id && (
            <Link to={`/yatras/${featuredTrip.slug}`} className="btn-primary shrink-0">
              {t.trip.viewNextYatra}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {reviews.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-center gap-3">
              <Stars rating={avg} size="h-5 w-5" />
              <span className="font-display text-lg font-bold text-charcoal">{avg.toFixed(1)}</span>
              <span className="text-sm text-charcoal/70">
                ({reviews.length} {t.yatrasPage.reviewsCount})
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {reviews.some((r) => r.isSample) && (
              <p className="mt-6 text-center text-xs italic text-charcoal/65">{t.trip.reviewsSampleNote}</p>
            )}
          </>
        ) : (
          <p className="rounded-2xl bg-white p-8 text-center text-charcoal/70">{t.yatrasPage.noCompleted}</p>
        )}
      </div>
    </section>
  );
}
