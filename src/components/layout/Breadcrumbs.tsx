import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { findSeoRoute } from "@/seo/routes";

/**
 * Visible breadcrumb trail for every inner page, driven by the central route
 * manifest — the same trail is emitted as BreadcrumbList JSON-LD.
 */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const pick = useLocalized();
  const route = findSeoRoute(pathname);

  if (!route || route.breadcrumbs.length < 2) return null;
  const last = route.breadcrumbs.length - 1;

  return (
    <nav aria-label={t.breadcrumb.label} className="border-b border-charcoal/5 bg-ivory">
      <ol className="container-px mx-auto flex max-w-7xl items-center gap-1.5 overflow-hidden py-2.5 text-xs text-charcoal/75">
        {route.breadcrumbs.map((crumb, i) => (
          <li key={crumb.path} className={`flex items-center gap-1.5 ${i === last ? "min-w-0" : "shrink-0"}`}>
            {i > 0 && <ChevronRight aria-hidden className="h-3 w-3 shrink-0 text-charcoal/30" />}
            {i === last ? (
              <span aria-current="page" className="truncate font-semibold text-charcoal/80">
                {pick(crumb.label)}
              </span>
            ) : (
              <Link to={crumb.path} className="hover:text-saffron-700">
                {pick(crumb.label)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
