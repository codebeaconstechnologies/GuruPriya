import { Star, Quote } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { TripReview } from "@/data/reviews";

export function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  const rounded = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${n <= rounded ? "fill-gold text-gold" : "fill-transparent text-charcoal/20"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function ReviewCard({ review, compact = false }: { review: TripReview; compact?: boolean }) {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <figure className={`flex flex-col gap-3 rounded-2xl border border-charcoal/8 bg-white ${compact ? "p-4" : "p-6 shadow-card"}`}>
      <div className="flex items-center justify-between gap-2">
        <Stars rating={review.rating} size={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        {review.isSample && (
          <span className="rounded-full bg-charcoal/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-charcoal/45">
            {t.trip.sampleReview}
          </span>
        )}
      </div>
      {!compact && <Quote className="h-6 w-6 text-gold/40" />}
      <blockquote className={`leading-relaxed text-charcoal/70 ${compact ? "line-clamp-3 text-xs" : "text-sm"}`}>
        "{pick(review.quote)}"
      </blockquote>
      <figcaption className="mt-auto text-sm font-bold text-charcoal">
        {review.name}
        <span className="font-medium text-charcoal/45"> · {pick(review.location)}</span>
      </figcaption>
    </figure>
  );
}
