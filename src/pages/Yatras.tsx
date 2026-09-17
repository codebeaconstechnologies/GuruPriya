import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { trips } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { TripCard } from "@/components/trips/TripCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FilterKey = "all" | "upcoming" | "pilgrimage" | "southIndia" | "northIndia" | "maharashtra" | "multiState";

export default function Yatras() {
  const { t } = useI18n();
  const pick = useLocalized();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  useSeo({
    title: `${t.yatrasPage.title} | GuruPriya Tours & Travels`,
    description: t.yatrasPage.subtitle
  });

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.yatrasPage.filters.all },
    { key: "upcoming", label: t.yatrasPage.filters.upcoming },
    { key: "pilgrimage", label: t.yatrasPage.filters.pilgrimage },
    { key: "northIndia", label: t.yatrasPage.filters.northIndia },
    { key: "maharashtra", label: t.yatrasPage.filters.maharashtra },
    { key: "multiState", label: t.yatrasPage.filters.multiState }
  ];

  const filtered = useMemo(() => {
    return trips.filter((trip) => {
      const haystack = [
        pick(trip.title),
        pick(trip.subtitle),
        ...trip.routePoints.map((rp) => pick(rp.name)),
        pick(trip.departure)
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = query.trim() === "" || haystack.includes(query.trim().toLowerCase());

      if (!matchesQuery) return false;
      if (filter === "all") return true;
      if (filter === "upcoming") return true;
      if (filter === "multiState") return true;
      if (filter === "northIndia") return trip.routePoints.some((rp) => rp.id === "haridwar" || rp.id === "kedarnath");
      if (filter === "maharashtra") return trip.routePoints.some((rp) => rp.id === "latur" || rp.id === "mahur");
      if (filter === "pilgrimage") return true;
      return true;
    });
  }, [query, filter, pick]);

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="GuruPriya Travels" title={t.yatrasPage.title} subtitle={t.yatrasPage.subtitle} />

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.yatrasPage.searchPlaceholder}
              className="w-full rounded-full border border-charcoal/15 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gold"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  filter === f.key ? "bg-charcoal text-white" : "bg-white text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-10 text-center text-charcoal/60">{t.yatrasPage.noResults}</p>
        )}
      </div>
    </section>
  );
}
