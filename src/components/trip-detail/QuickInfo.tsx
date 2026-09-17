import { CalendarDays, MapPin, Bus, Hotel, Utensils, Users } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";

export function QuickInfo({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();

  const items = [
    { icon: CalendarDays, label: t.common.duration, value: pick(trip.duration) },
    { icon: MapPin, label: t.trip.startingPoint, value: pick(trip.departure) },
    { icon: Bus, label: t.common.travelMode, value: trip.prices.map((p) => pick(p.name)).join(" / ") },
    { icon: Hotel, label: t.trip.accommodation, value: t.common.detailsShared },
    { icon: Utensils, label: t.trip.meals, value: "Tea, Breakfast & Pure Vegetarian Meals" },
    { icon: Users, label: t.trip.tripType, value: t.trip.tripTypeValue }
  ];

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-px mx-auto max-w-7xl">
        <h2 className="mb-6 font-display text-xl font-bold text-charcoal">{t.trip.quickInfo}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-charcoal/8 bg-ivory p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-600">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-charcoal/45">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-charcoal">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
