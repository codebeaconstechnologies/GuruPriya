import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { getInitialCrumbs, type Crumb } from "@/seo/initialCrumbs";

/**
 * Visible breadcrumb trail for every inner page (the same trail is emitted as
 * BreadcrumbList JSON-LD). On the first page it is prerendered from data
 * embedded in the HTML; after in-app navigation it is looked up in the SEO
 * manifest, which is loaded lazily.
 */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const pick = useLocalized();
  const [state, setState] = useState<{ path: string; crumbs: Crumb[] | null }>(() => ({ path: pathname, crumbs: getInitialCrumbs(pathname) }));

  useEffect(() => {
    if (state.path === pathname && state.crumbs) return;
    let cancelled = false;
    import("@/seo/routes").then(({ findSeoRoute }) => {
      if (!cancelled) setState({ path: pathname, crumbs: findSeoRoute(pathname)?.breadcrumbs ?? [] });
    });
    return () => {
      cancelled = true;
    };
  }, [pathname, state.path, state.crumbs]);

  const crumbs = state.path === pathname ? state.crumbs : null;
  if (pathname === "/" || (crumbs && crumbs.length < 2)) return null;
  const list = crumbs ?? [];
  const last = list.length - 1;

  return (
    <nav aria-label={t.breadcrumb.label} className="h-[38px] border-b border-navy-900/5 bg-white">
      <ol className="container-site flex h-full items-center gap-1.5 overflow-hidden text-xs text-navy-900/75">
        {list.map((crumb, i) => (
          <li key={crumb.path} className={`flex items-center gap-1.5 ${i === last ? "min-w-0" : "shrink-0"}`}>
            {i > 0 && <ChevronRight aria-hidden className="h-3 w-3 shrink-0 text-navy-900/30" />}
            {i === last ? (
              <span aria-current="page" className="truncate font-semibold text-navy-900">
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
