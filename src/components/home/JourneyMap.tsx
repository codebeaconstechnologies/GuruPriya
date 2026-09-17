import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from "react-leaflet";
import { ArrowRight, CalendarRange, MapPinned, Landmark } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { featuredTrip, type RoutePoint } from "@/data/trips";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FitBounds, AnimatedBus } from "@/components/map/RouteMapPrimitives";

export function JourneyMap() {
  const { t } = useI18n();
  const pick = useLocalized();
  const reduced = useReducedMotion();
  const trip = featuredTrip;

  const mappablePoints = useMemo(
    () => trip.routePoints.filter((rp): rp is RoutePoint & { lat: number; lng: number } => typeof rp.lat === "number" && typeof rp.lng === "number"),
    [trip.routePoints]
  );
  const positions: [number, number][] = mappablePoints.map((p) => [p.lat, p.lng]);

  const stats = [
    { icon: CalendarRange, value: trip.itinerary.length, label: t.home.journeyStatDays },
    { icon: MapPinned, value: mappablePoints.length, label: t.home.journeyStatStops },
    { icon: Landmark, value: 4, label: t.home.journeyStatStates }
  ];

  return (
    <section className="section-py relative overflow-hidden bg-charcoal">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle, #C89A3C 1.5px, transparent 1.5px)", backgroundSize: "34px 34px" }}
      />

      <div className="container-px relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-5 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <span className="eyebrow">{t.home.journeyMapEyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {t.home.journeyMapTitle}
          </h2>
          <p className="mt-4 text-white/70">{t.home.journeyMapSubtitle}</p>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <stat.icon className="mx-auto h-5 w-5 text-gold" />
                <span className="mt-2 block font-display text-2xl font-extrabold text-white">{stat.value}</span>
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>

          <Link to={`/yatras/${trip.slug}`} className="btn-primary mt-8">
            {t.home.journeyMapCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="overflow-hidden rounded-3xl border-2 border-gold/30 bg-white shadow-premium">
            <MapContainer
              center={positions[Math.floor(positions.length / 2)]}
              zoom={5}
              scrollWheelZoom={false}
              style={{ height: "440px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FitBounds positions={positions} />
              <Polyline positions={positions} pathOptions={{ color: "#D3671A", weight: 3, dashArray: "6 8" }} />

              {mappablePoints.map((point) => (
                <CircleMarker
                  key={point.id}
                  center={[point.lat, point.lng]}
                  radius={4}
                  pathOptions={{ color: "#7A1F2B", fillColor: "#C89A3C", fillOpacity: 1, weight: 1.5 }}
                >
                  <Popup>
                    <strong>{pick(point.name)}</strong>
                  </Popup>
                </CircleMarker>
              ))}

              {!reduced && <AnimatedBus positions={positions} speed={0.0025} />}
            </MapContainer>
          </div>
          <p className="mt-3 text-center text-xs italic text-white/40">{t.trip.animatedRouteNote}</p>
        </motion.div>
      </div>
    </section>
  );
}
