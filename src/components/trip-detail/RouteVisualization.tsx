import { useEffect, useRef } from "react";
import { Bus, MapPin } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip, RoutePoint } from "@/data/trips";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SCROLL_SPEED_PX_PER_SEC = 55;

function RouteStrip({ stops, reduced }: { stops: RoutePoint[]; reduced: boolean }) {
  const pick = useLocalized();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // Auto-scrolls the strip so the bus (fixed at the viewport centre) stays
  // visible for the whole animation, however many stops a route has —
  // a percentage-of-track-width animation would leave it off-screen for
  // most of the cycle on long routes like Route 2.
  useEffect(() => {
    if (reduced) return;
    const el = scrollerRef.current;
    if (!el) return;

    let direction: 1 | -1 = 1;
    let last = performance.now();
    let frame: number;

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const max = el.scrollWidth - el.clientWidth;
      if (max > 0 && !pausedRef.current) {
        el.scrollLeft += direction * SCROLL_SPEED_PX_PER_SEC * dt;
        if (el.scrollLeft >= max) {
          el.scrollLeft = max;
          direction = -1;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft = 0;
          direction = 1;
        }
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div className="relative">
      {!reduced && (
        <div className="pointer-events-none absolute left-1/2 top-[38px] z-20 -translate-x-1/2 text-saffron-500">
          <Bus className="h-6 w-6 drop-shadow" />
        </div>
      )}

      <div
        ref={scrollerRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onPointerDown={pause}
        className="relative overflow-x-auto pb-6"
      >
        <div className="relative flex min-w-max items-center gap-0 px-2 pt-10">
          <div className="absolute left-2 right-2 top-[52px] h-1 rounded-full bg-gradient-to-r from-saffron-200 via-gold to-saffron-200" />

          {stops.map((stop, i) => (
            <div key={`${stop.id}-${i}`} className="flex w-36 shrink-0 flex-col items-center text-center">
              <span className="relative z-10 mb-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold bg-white text-saffron-600">
                <MapPin className="h-3 w-3" />
              </span>
              <span className="text-xs font-bold leading-snug text-charcoal">{pick(stop.name)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RouteVisualization({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();
  const reduced = useReducedMotion();

  const pointsById = new Map(trip.routePoints.map((rp) => [rp.id, rp]));

  return (
    <section className="section-py bg-charcoal">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading light eyebrow={t.trip.majorDestinations} title={t.trip.routeTitle} subtitle={t.trip.routeSubtitle} />

        <div className="flex flex-col gap-10">
          {trip.routeSections.map((section) => {
            const stops = section.stops.map((id) => pointsById.get(id)).filter((s): s is RoutePoint => !!s);
            return (
              <div key={section.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8">
                <h3 className="font-display text-lg font-bold text-white">{pick(section.title)}</h3>
                <p className="mt-1 max-w-2xl text-sm text-white/60">{pick(section.description)}</p>
                <RouteStrip stops={stops} reduced={reduced} />
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs italic text-white/40">{t.trip.animatedRouteNote}</p>
      </div>
    </section>
  );
}
