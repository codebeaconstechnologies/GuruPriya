import { useMemo } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from "react-leaflet";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip, RoutePoint } from "@/data/trips";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FitBounds, AnimatedBus } from "@/components/map/RouteMapPrimitives";

export function RouteMap({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();
  const reduced = useReducedMotion();

  const mappablePoints = useMemo(
    () => trip.routePoints.filter((rp): rp is RoutePoint & { lat: number; lng: number } => typeof rp.lat === "number" && typeof rp.lng === "number"),
    [trip.routePoints]
  );

  if (mappablePoints.length < 2) {
    return (
      <section className="section-py bg-white">
        <div className="container-px mx-auto max-w-4xl text-center">
          <SectionHeading eyebrow="Map" title={t.trip.mapTitle} />
          <p className="rounded-2xl bg-ivory p-8 text-charcoal/60">{t.trip.mapUnavailable}</p>
        </div>
      </section>
    );
  }

  const positions: [number, number][] = mappablePoints.map((p) => [p.lat, p.lng]);

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Map" title={t.trip.mapTitle} subtitle={t.trip.animatedRouteNote} />

        <div className="overflow-hidden rounded-3xl border border-charcoal/10 shadow-card">
          <MapContainer
            center={positions[Math.floor(positions.length / 2)]}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: "520px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds positions={positions} />
            <Polyline positions={positions} pathOptions={{ color: "#C89A3C", weight: 3, dashArray: "6 8" }} />

            {mappablePoints.map((point) => (
              <CircleMarker
                key={point.id}
                center={[point.lat, point.lng]}
                radius={6}
                pathOptions={{ color: "#7A1F2B", fillColor: "#D3671A", fillOpacity: 1, weight: 2 }}
              >
                <Popup>
                  <strong>{pick(point.name)}</strong>
                  <br />
                  <span>{pick(point.description)}</span>
                </Popup>
              </CircleMarker>
            ))}

            {!reduced && <AnimatedBus positions={positions} />}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
