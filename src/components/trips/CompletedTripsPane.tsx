import { withWidth } from "@/utils/images";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, CalendarDays } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { getCompletedTrips } from "@/data/trips";
import { getReviewsForTrip, averageRating } from "@/data/reviews";
import { formatDateRange } from "@/utils/format";
import { ReviewCard, Stars } from "@/components/reviews/ReviewCard";

/** Right-hand pane on the Yatras page: completed yatras and participant reviews. */
export function CompletedTripsPane() {
  const { t } = useI18n();
  const pick = useLocalized();
  const completed = getCompletedTrips();
  const hasSamples = completed.some((trip) => getReviewsForTrip(trip.id).some((r) => r.isSample));

  return (
    <aside className="rounded-3xl border border-charcoal/8 bg-white p-5 shadow-card sm:p-6 lg:sticky lg:top-28">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-charcoal">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        {t.yatrasPage.completedTitle}
      </h2>
      <p className="mt-1 text-sm text-charcoal/70">{t.yatrasPage.completedSubtitle}</p>

      {completed.length === 0 && (
        <p className="mt-5 rounded-2xl bg-ivory p-5 text-sm text-charcoal/70">{t.yatrasPage.noCompleted}</p>
      )}

      <div className="mt-5 flex flex-col gap-6">
        {completed.map((trip) => {
          const reviews = getReviewsForTrip(trip.id);
          const avg = averageRating(reviews);
          return (
            <div key={trip.id} className="flex flex-col gap-3">
              <Link to={`/yatras/${trip.slug}#reviews`} className="group flex gap-3">
                <img src={withWidth(trip.heroImage, 330)} alt="" loading="lazy" width={64} height={64} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-bold leading-snug text-charcoal group-hover:text-saffron-700">
                    {pick(trip.title)}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-charcoal/70">
                    <CalendarDays className="h-3 w-3" />
                    {formatDateRange(trip.startDate, trip.endDate)}
                  </p>
                  {reviews.length > 0 && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-charcoal/70">
                      <Stars rating={avg} size="h-3 w-3" />
                      {avg.toFixed(1)} · {reviews.length} {t.yatrasPage.reviewsCount}
                    </p>
                  )}
                </div>
              </Link>

              {reviews.slice(0, 2).map((review) => (
                <ReviewCard key={review.id} review={review} compact />
              ))}

              <Link
                to={`/yatras/${trip.slug}#reviews`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-saffron-600 hover:text-saffron-700"
              >
                {t.common.readReviews}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}
      </div>

      {hasSamples && (
        <p className="mt-5 border-t border-charcoal/10 pt-4 text-[11px] italic text-charcoal/65">{t.trip.reviewsSampleNote}</p>
      )}
    </aside>
  );
}
