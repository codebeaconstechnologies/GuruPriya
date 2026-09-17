import { useEffect, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";

export const busIcon = L.divIcon({
  className: "",
  html: `<div style="background:#211C1A;border:2px solid #C89A3C;border-radius:9999px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,0.35)">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C89A3C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg>
  </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

export function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, { padding: [30, 30] });
    }
  }, [map, positions]);
  return null;
}

/**
 * Decorative bus marker that glides through the given positions in order,
 * looping back to the start. Purely illustrative — not a live GPS tracker.
 */
export function AnimatedBus({ positions, speed = 0.004 }: { positions: [number, number][]; speed?: number }) {
  const [pos, setPos] = useState<[number, number]>(positions[0]);
  const frame = useRef<number>();

  useEffect(() => {
    if (positions.length < 2) return;
    let segment = 0;
    let t = 0;

    const step = () => {
      const from = positions[segment];
      const to = positions[(segment + 1) % positions.length];
      t += speed;
      if (t >= 1) {
        t = 0;
        segment = (segment + 1) % positions.length;
      }
      const lat = from[0] + (to[0] - from[0]) * t;
      const lng = from[1] + (to[1] - from[1]) * t;
      setPos([lat, lng]);
      frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [positions, speed]);

  return <Marker position={pos} icon={busIcon} />;
}
