import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, MapPin, CalendarDays, Bus, Hotel, Plane, Route, Users, Briefcase, MessagesSquare } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { photo, withWidth } from "@/utils/images";
import { formatDateRange } from "@/utils/format";
import type { Destination } from "@/data/catalog/destinations";
import type { Category } from "@/data/catalog/categories";
import type { PackageCardData } from "@/data/catalog/packages";
import type { Service } from "@/data/catalog/services";
import S from "@/i18n/strings";

/* --------------------------- Destination card --------------------------- */

export function DestinationCard({ d, tall = false }: { d: Destination; tall?: boolean }) {
  return (
    <Link
      to={`/destinations/${d.slug}`}
      className={`group relative block overflow-hidden rounded-3xl bg-navy-900 shadow-card ${tall ? "aspect-[3/4] sm:aspect-auto sm:h-full" : "aspect-[4/5]"}`}
    >
      <img
        src={photo(d.image, 800)}
        srcSet={`${photo(d.image, 800)} 800w, ${photo(d.image, 1600)} 1600w`}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        alt={d.imageAlt}
        loading="lazy"
        width={800}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-brand group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-sun-light">
          <MapPin className="h-3 w-3" /> {d.country === "India" ? "India" : d.country}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-extrabold !text-white">{d.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/80">{d.tagline}</p>
      </div>
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

/* ----------------------------- Package card ----------------------------- */

export function PackageCard({ p }: { p: PackageCardData }) {
  const pick = useLocalized();
  const badge =
    p.kind === "scheduled"
      ? { text: pick(S.card.scheduled), cls: "bg-saffron-600 text-white" }
      : p.kind === "completed"
        ? { text: pick(S.card.completed), cls: "bg-navy-800 text-white" }
        : { text: pick(S.card.tailorMade), cls: "bg-white text-navy-900" };
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/5 bg-white shadow-card transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-premium">
      <Link to={p.href} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
        <img
          src={withWidth(p.image, 800)}
          alt=""
          loading="lazy"
          width={800}
          height={500}
          className="h-full w-full object-cover transition duration-700 ease-brand group-hover:scale-[1.05]"
        />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold shadow ${badge.cls}`}>{badge.text}</span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-navy-950/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Clock className="h-3.5 w-3.5" /> {p.duration}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-navy-900/75">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-saffron-600" />
          <span className="line-clamp-1">{p.location}</span>
        </p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug">
          <Link to={p.href} className="hover:text-saffron-700">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-navy-900/70">{p.summary}</p>
        <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-navy-900/70">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-sky-600" />
          {p.startDate ? formatDateRange(p.startDate, p.endDate) : pick(S.card.onEnquiry)}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-5">
          <Link to={p.href} className="btn-secondary !px-4 !py-2.5 text-xs">
            {pick(S.viewItinerary)}
          </Link>
          <Link to={`/contact?package=${encodeURIComponent(p.title)}`} className="btn-link text-xs">
            {pick(S.enquireNow)} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------- Category card ---------------------------- */

export function CategoryCard({ c }: { c: Category }) {
  const pick = useLocalized();
  return (
    <Link to={`/tours/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-navy-900 shadow-card sm:aspect-[3/4]">
      <img
        src={photo(c.image, 800)}
        alt={c.imageAlt}
        loading="lazy"
        width={800}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-brand group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent transition duration-500 group-hover:from-navy-950" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-display text-lg font-extrabold !text-white sm:text-xl">{pick(c.name)}</h3>
        <p className="mt-1.5 text-sm text-white/80">{c.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-sun-light transition-all group-hover:gap-2.5">
          {pick(S.explore)} <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------ Service card ---------------------------- */

const SERVICE_ICONS = { bus: Bus, hotel: Hotel, plane: Plane, route: Route, users: Users, briefcase: Briefcase, messages: MessagesSquare };

export function ServiceCard({ s }: { s: Service }) {
  const pick = useLocalized();
  const Icon = SERVICE_ICONS[s.icon];
  return (
    <Link to={`/services/${s.slug}`} className="card-premium group flex h-full flex-col p-7 hover:-translate-y-1">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-50 to-sky-50 text-saffron-600 transition group-hover:from-saffron-600 group-hover:to-saffron-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold">{pick(s.name)}</h3>
      <p className="mt-2 flex-1 text-sm text-navy-900/70">{s.short}</p>
      <span className="btn-link mt-5">
        {pick(S.viewDetails)} <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
