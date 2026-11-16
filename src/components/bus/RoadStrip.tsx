import { TouristBus } from "./TouristBus";
import { useInView } from "./usePauseOffscreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A slim road with the GuruPriya coach driving across it on a loop.
 * Pure CSS transform animation (GPU-composited), paused when off-screen,
 * static under prefers-reduced-motion. Decorative: aria-hidden.
 *
 * variant "dark" sits on photography (hero); "light" on pale backgrounds.
 */
export function RoadStrip({
  variant = "light",
  duration = 26,
  className = "",
  hills = false
}: {
  variant?: "light" | "dark";
  duration?: number;
  className?: string;
  hills?: boolean;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const running = inView && !reduced;
  const dark = variant === "dark";

  return (
    <div ref={ref} aria-hidden className={`relative w-full overflow-hidden ${className}`}>
      {hills && (
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[14px] h-10 w-full sm:h-14">
          <path d="M0 60 L0 38 Q80 12 170 30 T340 26 Q430 4 520 28 T700 22 Q790 6 880 30 T1060 24 Q1130 14 1200 30 L1200 60 Z" fill={dark ? "rgba(255,255,255,0.08)" : "#DCE7F6"} />
          <path d="M0 60 L0 46 Q120 30 240 44 T480 40 Q600 28 720 44 T960 40 Q1080 30 1200 44 L1200 60 Z" fill={dark ? "rgba(255,255,255,0.12)" : "#C9ECFA"} />
        </svg>
      )}

      {/* road */}
      <div className={`absolute inset-x-0 bottom-0 h-[14px] ${dark ? "bg-navy-950/70" : "bg-navy-800"}`}>
        <div
          className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #FAD27A 0 18px, transparent 18px 34px)" }}
        />
      </div>

      {/* the coach: a full-width track translated by its own width */}
      <div
        className="gp-drive relative h-[46px] w-full sm:h-[54px]"
        style={{
          animation: reduced ? "none" : `gp-drive ${duration}s linear infinite`,
          animationPlayState: running ? "running" : "paused",
          transform: reduced ? "translateX(38%)" : undefined
        }}
      >
        <div className="absolute bottom-[3px] left-0 w-[96px] sm:w-[118px]">
          <TouristBus moving={running} className="h-auto w-full drop-shadow-md" />
        </div>
      </div>
    </div>
  );
}
