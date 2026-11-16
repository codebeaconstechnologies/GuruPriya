import { useEffect, useRef, useState } from "react";
import { TouristBus } from "./TouristBus";
import { useInView } from "./usePauseOffscreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * "The GuruPriya Journey": an illustrated landscape from home (Latur)
 * through hills and the Himalaya to the backwaters, the coast and the world.
 * The coach follows the winding road as the visitor scrolls through the
 * section (scroll-linked, rAF-throttled, only while on screen).
 * Under prefers-reduced-motion the coach is parked mid-journey.
 */

const ROAD =
  "M -30 352 C 70 350 120 300 210 300 S 340 352 440 330 S 560 236 660 236 S 790 300 880 318 S 1010 300 1080 268 S 1170 236 1240 240";

export const JOURNEY_STOPS = [
  { at: 0.05, label: "Home · Latur" },
  { at: 0.22, label: "Hills & forts" },
  { at: 0.5, label: "The Himalaya" },
  { at: 0.7, label: "Backwaters" },
  { at: 0.86, label: "Beaches" },
  { at: 0.985, label: "The world" }
];

interface Pt {
  x: number;
  y: number;
}

export function JourneyScene() {
  const reduced = useReducedMotion();
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>("200px");
  const pathRef = useRef<SVGPathElement>(null);
  const busRef = useRef<SVGGElement>(null);
  const [stops, setStops] = useState<Pt[]>([]);

  // Place stop pins along the road once the path exists.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setStops(JOURNEY_STOPS.map((s) => path.getPointAtLength(s.at * len)));
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const bus = busRef.current;
    const section = sectionRef.current;
    if (!path || !bus || !section) return;
    const len = path.getTotalLength();

    const place = (p: number) => {
      const d = Math.min(Math.max(p, 0.02), 0.98) * len;
      const a = path.getPointAtLength(d);
      const b = path.getPointAtLength(Math.min(d + 6, len));
      const angle = Math.max(-16, Math.min(16, (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI));
      bus.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${angle}) translate(-56 -46)`);
    };

    if (reduced) {
      place(0.47);
      return;
    }
    if (!inView) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top enters the bottom of the viewport,
      // 1 when its bottom reaches the top third of the viewport.
      const p = (vh - r.top) / (r.height + vh * 0.66);
      place(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [inView, reduced, sectionRef]);

  return (
    <div ref={sectionRef} className="relative">
      <svg viewBox="0 0 1200 420" className="block h-auto w-full" role="img" aria-label="Illustration: the GuruPriya coach travelling from Latur through hills and mountains to the backwaters, the coast and beyond">
        <defs>
          <linearGradient id="js-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF4EC" />
            <stop offset="0.6" stopColor="#FDF6EE" />
            <stop offset="1" stopColor="#EEF4FB" />
          </linearGradient>
          <radialGradient id="js-sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FAD27A" />
            <stop offset="0.7" stopColor="#F5A524" />
            <stop offset="1" stopColor="#F26A1B" />
          </radialGradient>
          <linearGradient id="js-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6CCDF0" />
            <stop offset="1" stopColor="#12A3DD" />
          </linearGradient>
        </defs>

        <rect width="1200" height="420" fill="url(#js-sky)" />
        <circle cx="880" cy="118" r="62" fill="url(#js-sun)" opacity="0.9" />

        {/* clouds */}
        <g fill="#FFFFFF" opacity="0.9" className={reduced ? "" : "animate-drift-slow"}>
          <path d="M120 92 a18 18 0 0 1 34 -6 a14 14 0 0 1 22 10 a12 12 0 0 1 -2 24 h-52 a14 14 0 0 1 -2 -28 z" />
          <path d="M560 70 a16 16 0 0 1 30 -5 a12 12 0 0 1 20 9 a10 10 0 0 1 -2 21 h-46 a12 12 0 0 1 -2 -25 z" />
        </g>

        {/* far Himalaya with snow caps */}
        <path d="M300 300 L400 190 L450 228 L530 128 L590 196 L640 150 L720 232 L780 186 L860 290 Z" fill="#B6CCEB" />
        <path d="M530 128 L556 158 L540 154 L526 166 L512 150 Z M640 150 L660 174 L646 170 L634 180 L622 168 Z M400 190 L418 210 L404 206 L392 214 Z" fill="#FFFFFF" />

        {/* mid hills */}
        <path d="M0 330 Q90 250 190 286 T380 270 Q470 236 560 270 T760 260 Q860 236 960 276 L960 420 L0 420 Z" fill="#A7D3B0" />
        {/* sea on the right */}
        <path d="M880 310 Q1000 280 1200 286 L1200 420 L880 420 Z" fill="url(#js-sea)" />
        <path d="M940 330 q14 -6 28 0 t28 0 M1040 318 q14 -6 28 0 t28 0 M1110 348 q14 -6 28 0 t28 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
        {/* near meadow */}
        <path d="M0 360 Q160 320 320 352 T640 340 Q760 320 900 352 Q980 372 1060 360 L1060 420 L0 420 Z" fill="#7BBE8A" />
        <path d="M1000 368 Q1100 352 1200 360 L1200 420 L1000 420 Z" fill="#F6E3B8" />

        {/* home town (Latur) */}
        <g transform="translate(40 300)">
          <rect x="0" y="18" width="26" height="22" fill="#FFFFFF" stroke="#0F2B57" strokeWidth="1.2" />
          <path d="M-3 20 L13 6 L29 20 Z" fill="#F26A1B" />
          <rect x="32" y="10" width="20" height="30" fill="#FFFFFF" stroke="#0F2B57" strokeWidth="1.2" />
          <path d="M30 12 L42 0 L54 12 Z" fill="#0F2B57" />
        </g>
        {/* fort on the hills */}
        <path d="M228 262 h46 v-14 h-6 v6 h-6 v-6 h-6 v6 h-6 v-6 h-6 v6 h-6 v-6 h-10 z" fill="#C44A0C" opacity="0.85" />
        {/* temple in the mountains */}
        <g transform="translate(600 196)" fill="#F26A1B">
          <rect x="-10" y="20" width="20" height="10" />
          <path d="M-7 20 L0 2 L7 20 Z" />
          <rect x="-0.6" y="-6" width="1.2" height="8" fill="#0F2B57" />
        </g>
        {/* palms by the coast */}
        {[1010, 1050].map((x, i) => (
          <g key={x} transform={`translate(${x} ${300 - i * 10})`}>
            <path d="M0 70 Q4 40 0 10" stroke="#6B4423" strokeWidth="4" fill="none" />
            <path d="M0 10 q-22 -6 -34 8 M0 10 q22 -8 34 6 M0 10 q-10 -18 -28 -18 M0 10 q12 -18 30 -14" stroke="#2E8B3E" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        ))}
        {/* plane — the international leg */}
        <g transform="translate(1110 120) rotate(-14)" fill="#0F2B57">
          <path d="M0 0 L34 0 Q42 0 42 3 Q42 6 34 6 L0 6 Z" />
          <path d="M14 3 L4 -12 L10 -12 L24 3 Z M14 3 L4 18 L10 18 L24 3 Z M2 3 L-4 -6 L0 -6 L6 3 Z" />
        </g>
        <path d="M900 150 Q1000 150 1100 124" stroke="#F26A1B" strokeWidth="2" strokeDasharray="6 7" fill="none" opacity="0.7" />

        {/* road */}
        <path d={ROAD} stroke="#F8F6F2" strokeWidth="40" fill="none" strokeLinecap="round" />
        <path ref={pathRef} d={ROAD} stroke="#33415C" strokeWidth="30" fill="none" strokeLinecap="round" />
        <path d={ROAD} stroke="#FAD27A" strokeWidth="2.6" strokeDasharray="16 14" fill="none" />

        {/* stops */}
        {stops.map((p, i) => (
          <g key={JOURNEY_STOPS[i].label} transform={`translate(${p.x} ${p.y})`} className="hidden sm:block">
            <circle r="9" fill="#FFFFFF" stroke="#F26A1B" strokeWidth="3" />
            <circle r="3" fill="#0F2B57" />
            <g transform={`translate(0 ${i % 2 === 0 ? 34 : -30})`}>
              <rect x={-JOURNEY_STOPS[i].label.length * 4.1 - 12} y="-14" width={JOURNEY_STOPS[i].label.length * 8.2 + 24} height="26" rx="13" fill="#0F2B57" />
              <text textAnchor="middle" y="4" fontSize="13" fontWeight="700" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, Inter, sans-serif">
                {JOURNEY_STOPS[i].label}
              </text>
            </g>
          </g>
        ))}

        {/* the coach (positioned by script) */}
        <g ref={busRef} transform="translate(160 300)">
          <TouristBus moving={inView && !reduced} width={112} height={49} />
        </g>
      </svg>
    </div>
  );
}
