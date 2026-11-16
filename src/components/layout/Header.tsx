import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Phone, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { useLocalized, useI18n } from "@/i18n/I18nContext";
import { useScrolled } from "@/hooks/useScrollPosition";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Logo } from "@/components/ui/Logo";
import { mainNav, type NavItem } from "@/data/navigation";
import { company, getUpcomingTrips } from "@/data/trips";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { formatDateRange } from "@/utils/format";
import { photo } from "@/utils/images";
import { destinations } from "@/data/catalog/destinations";
import S from "@/i18n/strings";

const phone = company.founder.phones[0];

function isActive(item: NavItem, pathname: string) {
  if (item.to === "/") return pathname === "/";
  const prefixes = [item.to, ...(item.groups ?? []).flatMap((g) => g.links.map((l) => l.to.split("#")[0]))];
  if (item.to === "/packages") prefixes.push("/tours", "/yatras", "/upcoming-yatras");
  return prefixes.some((p) => p !== "/" && pathname.startsWith(p));
}

/* ---------------------------- Utility bar ---------------------------- */

function UtilityBar() {
  const pick = useLocalized();
  const { t } = useI18n();
  const next = getUpcomingTrips()[0];
  return (
    <div className="bg-navy-900 text-white">
      <div className="container-site flex h-10 items-center justify-between gap-4 text-xs">
        {next ? (
          <Link to={`/yatras/${next.slug}`} className="flex min-w-0 items-center gap-2 font-semibold hover:text-sun-light">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-sun" />
            <span className="truncate">
              {t.common.bookingsOpen} · {pick(next.title)}
              <span className="hidden md:inline"> · {formatDateRange(next.startDate, next.endDate)}</span>
            </span>
          </Link>
        ) : (
          <span className="truncate font-semibold">{pick(S.footer.tagline)}</span>
        )}
        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <a href={`tel:+91${phone}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-sun-light">
            <Phone className="h-3.5 w-3.5" /> {phone}
          </a>
          <a
            href={buildWhatsAppLink("Hello, I would like help planning a trip.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold hover:text-sun-light"
          >
            <MessageCircle className="h-3.5 w-3.5" /> {pick(S.whatsapp)}
          </a>
          <LanguageToggle onDark compact />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Desktop ------------------------------ */

function DesktopItem({ item, open, setOpen }: { item: NavItem; open: boolean; setOpen: (v: boolean) => void }) {
  const pick = useLocalized();
  const { pathname } = useLocation();
  const active = isActive(item, pathname);
  const closeTimer = useRef<number>();
  const base = `relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13.5px] font-semibold transition ${
    active ? "text-saffron-700" : "text-navy-900/80 hover:text-navy-900"
  }`;
  const underline = active ? <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-saffron-500" /> : null;

  if (!item.groups) {
    return (
      <NavLink to={item.to} end={item.to === "/"} className={base}>
        {pick(item.label)}
        {underline}
      </NavLink>
    );
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div
      className={item.mega ? "" : "relative"}
      onMouseEnter={() => {
        window.clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 140);
      }}
      onKeyDown={onKey}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button type="button" className={base} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        {pick(item.label)}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {underline}
      </button>

      <div
        className={`absolute z-50 pt-3 transition duration-200 ease-brand ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        } ${item.mega ? "inset-x-0 top-full" : "left-0 top-full"}`}
      >
        {item.mega ? <MegaPanel item={item} /> : <SimplePanel item={item} />}
      </div>
    </div>
  );
}

function SimplePanel({ item }: { item: NavItem }) {
  const pick = useLocalized();
  return (
    <div className="w-64 rounded-2xl border border-navy-900/5 bg-white p-2 shadow-premium">
      {item.groups!.flatMap((g) => g.links).map((l) => (
        <Link key={l.to} to={l.to} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-navy-900/80 transition hover:bg-navy-50 hover:text-navy-900">
          {pick(l.label)}
        </Link>
      ))}
      <Link to={item.to} className="mt-1 flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-saffron-700 hover:bg-saffron-50">
        {pick(S.viewAll)} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function MegaPanel({ item }: { item: NavItem }) {
  const pick = useLocalized();
  const isDest = item.to === "/destinations";
  return (
    <div className="container-site">
      <div className="grid gap-8 rounded-3xl border border-navy-900/5 bg-white p-8 shadow-lift lg:grid-cols-[1fr_260px]">
        <div className={`grid gap-6 ${item.groups!.length > 3 ? "grid-cols-5" : "grid-cols-3"}`}>
          {item.groups!.map((g, i) => (
            <div key={i}>
              {g.title && <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-saffron-600">{pick(g.title)}</p>}
              <ul className="space-y-1">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="-mx-2 block rounded-lg px-2 py-1.5 text-sm font-medium text-navy-900/80 transition hover:bg-navy-50 hover:text-navy-900">
                      {pick(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link to={isDest ? "/destinations" : "/tours/customized"} className="group relative overflow-hidden rounded-2xl">
          <img
            src={photo(isDest ? "switzerland-lauterbrunnen" : "spiti-valley", 800)}
            alt=""
            loading="lazy"
            className="h-full min-h-[220px] w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="font-display text-lg font-bold leading-tight text-white">
              {isDest ? `${destinations.length} destinations, India and abroad` : "Can't find it? We'll tailor it."}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-sun-light">
              {isDest ? pick(S.home.allDestinations) : pick(S.home.customCta)} <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------- Mobile ------------------------------ */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const pick = useLocalized();
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] xl:hidden" role="dialog" aria-modal="true" aria-label={pick(S.menu)}>
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={onClose} />
      <div ref={panelRef} className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-navy-900/5 px-5 py-3">
          <Logo size={56} />
          <button type="button" onClick={onClose} aria-label={pick(S.close)} className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-900">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {mainNav.map((item) => {
            const key = item.to;
            const isOpen = expanded === key;
            if (!item.groups) {
              return (
                <NavLink
                  key={key}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) => `block rounded-xl px-4 py-3.5 text-[15px] font-semibold ${isActive ? "bg-navy-50 text-saffron-700" : "text-navy-900"}`}
                >
                  {pick(item.label)}
                </NavLink>
              );
            }
            return (
              <div key={key}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : key)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-semibold text-navy-900"
                >
                  {pick(item.label)}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="mb-2 ml-4 border-l-2 border-saffron-200 pl-3">
                    {item.groups.map((g, i) => (
                      <div key={i} className="py-1">
                        {g.title && <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-saffron-600">{pick(g.title)}</p>}
                        {g.links.map((l) => (
                          <Link key={l.to} to={l.to} onClick={onClose} className="block rounded-lg px-3 py-2.5 text-sm text-navy-900/80 hover:bg-navy-50">
                            {pick(l.label)}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link to={item.to} onClick={onClose} className="block px-3 py-2.5 text-sm font-bold text-saffron-700">
                      {pick(S.viewAll)} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="space-y-3 border-t border-navy-900/5 p-5">
          <Link to="/contact" onClick={onClose} className="btn-primary w-full">
            {pick(S.planTrip)}
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a href={`tel:+91${phone}`} className="btn-secondary">
              <Phone className="h-4 w-4" /> {pick(S.callUs)}
            </a>
            <a href={buildWhatsAppLink("Hello, I would like help planning a trip.")} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <MessageCircle className="h-4 w-4" /> {pick(S.whatsapp)}
            </a>
          </div>
          <div className="flex justify-center pt-1">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Header ------------------------------ */

export function Header() {
  const pick = useLocalized();
  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { pathname } = useLocation();

  // Close menus on navigation.
  useEffect(() => {
    setOpenItem(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <UtilityBar />
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-navy-900/5 bg-white/95 shadow-card backdrop-blur-md" : "border-transparent bg-white"
        }`}
      >
        <div className="container-site relative flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0 py-1.5" aria-label="GuruPriya Tours & Travels — home">
            <Logo size={scrolled ? 60 : 78} priority className="transition-all duration-300 ease-brand max-sm:!h-[58px] max-sm:!w-[58px]" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {mainNav.map((item) => (
              <DesktopItem
                key={item.to}
                item={item}
                open={openItem === item.to}
                setOpen={(v) => setOpenItem(v ? item.to : openItem === item.to ? null : openItem)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn-primary hidden !px-5 sm:inline-flex">
              {pick(S.planTrip)}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={pick(S.menu)}
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 text-navy-900 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
