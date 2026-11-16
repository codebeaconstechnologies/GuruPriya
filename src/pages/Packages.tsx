import { useMemo, useState } from "react";
import { useLocalized } from "@/i18n/I18nContext";
import { categories, type CategorySlug } from "@/data/catalog/categories";
import { allPackageCards } from "@/data/catalog/packages";
import { PageHero } from "@/components/ui/PageHero";
import { PackageCard } from "@/components/cards/Cards";
import { CtaBand } from "@/components/ui/CtaBand";
import { SlidersHorizontal } from "lucide-react";

type Filter = "all" | CategorySlug;

export default function Packages() {
  const pick = useLocalized();
  const [filter, setFilter] = useState<Filter>("all");
  const [kind, setKind] = useState<"all" | "scheduled" | "tailor-made">("all");
  const cards = useMemo(
    () =>
      allPackageCards().filter(
        (c) =>
          (filter === "all" || c.categories.includes(filter)) &&
          (kind === "all" || (kind === "scheduled" ? c.kind !== "tailor-made" : c.kind === "tailor-made"))
      ),
    [filter, kind]
  );

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-navy-800 text-white shadow-card" : "bg-white text-navy-900/75 hover:text-navy-900"}`;

  return (
    <>
      <PageHero
        image="thailand-phi-phi"
        imageAlt="Phi Phi Islands, Thailand"
        eyebrow="Tours & packages"
        title="Find your next journey"
        subtitle="Scheduled group departures and tailor-made itineraries in India and abroad, each planned around you. Package details are shared personally on enquiry."
        mood="ocean"
      />
      <section className="section-py bg-sand">
        <div className="container-site">
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <SlidersHorizontal className="h-4 w-4 text-saffron-600" /> Filter
            </div>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar" role="group" aria-label="Tour type">
              <button type="button" aria-pressed={filter === "all"} className={chip(filter === "all")} onClick={() => setFilter("all")}>
                All tours
              </button>
              {categories.map((c) => (
                <button key={c.slug} type="button" aria-pressed={filter === c.slug} className={chip(filter === c.slug)} onClick={() => setFilter(c.slug)}>
                  {pick(c.name)}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Departure type">
              {(
                [
                  ["all", "All"],
                  ["scheduled", "Scheduled departures"],
                  ["tailor-made", "Tailor-made itineraries"]
                ] as const
              ).map(([k, label]) => (
                <button key={k} type="button" aria-pressed={kind === k} className={`${chip(kind === k)} !py-1.5 text-xs`} onClick={() => setKind(k)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-6 text-sm text-navy-900/70" aria-live="polite">
            {cards.length} {cards.length === 1 ? "journey" : "journeys"}
          </p>
          {cards.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((p) => (
                <PackageCard key={p.key} p={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center text-navy-900/70">
              No packages in this category yet, but we can tailor one for you.{" "}
              <a href="/contact#enquiry" className="font-bold text-saffron-700 underline">
                Send an enquiry
              </a>
              .
            </div>
          )}
          <p className="mt-8 text-xs text-navy-900/70">
            Tailor-made itineraries are suggested plans that we adjust to your dates, group and budget. Scheduled departures are fixed-date group journeys.
          </p>
        </div>
      </section>
      <CtaBand title="Don't see what you're looking for?" text="Tell us your destination and dates, and we'll design an itinerary around you." image="spiti-valley" ctaTo="/contact?category=customized#enquiry" ctaLabel="Create My Trip" />
    </>
  );
}
