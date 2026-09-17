import { Link } from "react-router-dom";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { homePage } from "@/data/trips";
import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <Link
      to="/yatras/premium-uttarakhand-char-dham-ancient-devasthan-darshan-yatra-2026"
      className="block bg-charcoal text-white"
    >
      <div className="container-px mx-auto flex max-w-7xl items-center justify-center gap-2 py-2 text-center text-xs font-semibold sm:text-sm">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" />
        <span className="truncate">{pick(homePage.announcement)}</span>
        <span className="hidden shrink-0 underline decoration-gold underline-offset-2 sm:inline">{t.common.viewDetails}</span>
      </div>
    </Link>
  );
}
