import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { getUpcomingTrips } from "@/data/trips";
import { formatDateRange } from "@/utils/format";

/**
 * Always announces the next upcoming yatra, so the banner can never point at
 * a completed trip. Hidden when no yatra is upcoming.
 */
export function AnnouncementBar() {
  const { t } = useI18n();
  const pick = useLocalized();
  const next = getUpcomingTrips()[0];

  if (!next) return null;

  const dates = formatDateRange(next.startDate, next.endDate);

  return (
    <Link to={`/yatras/${next.slug}`} className="block bg-charcoal text-white">
      <div className="container-px mx-auto flex max-w-7xl items-center justify-center gap-2 py-2 text-center text-xs font-semibold sm:text-sm">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" />
        <span className="truncate">
          {t.common.bookingsOpen} • {pick(next.title)}
          {dates && ` • ${dates}`}
        </span>
        <span className="hidden shrink-0 underline decoration-gold underline-offset-2 sm:inline">{t.common.viewDetails}</span>
      </div>
    </Link>
  );
}
