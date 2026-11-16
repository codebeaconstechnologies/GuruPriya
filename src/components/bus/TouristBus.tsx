/**
 * GuruPriya's signature tourist coach, an inline SVG in brand colours.
 * Wheels spin and the body bobs gently while `moving` is true; both stop
 * under prefers-reduced-motion (global CSS) and when the parent pauses
 * animations with the `.motion-paused` class.
 */
export function TouristBus({
  moving = true,
  className = "",
  title,
  width,
  height
}: {
  moving?: boolean;
  className?: string;
  title?: string;
  width?: number;
  height?: number;
}) {
  const spin = moving ? "animate-wheel-spin" : "";
  const bob = moving ? "animate-bus-bob" : "";
  return (
    <svg
      viewBox="0 0 164 72"
      width={width}
      height={height}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <defs>
        <linearGradient id="gp-bus-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DFF4FC" />
          <stop offset="1" stopColor="#6CCDF0" />
        </linearGradient>
        <linearGradient id="gp-bus-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EEF4FB" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="82" cy="66" rx="70" ry="4" fill="#06142B" opacity="0.18" />

      <g className={bob} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {/* roof AC unit */}
        <rect x="44" y="3" width="46" height="6" rx="3" fill="#DCE7F6" stroke="#B6CCEB" strokeWidth="1" />
        {/* body */}
        <path
          d="M10 10 Q10 7 13 7 H140 Q147 7 150 13 L158 30 Q160 34 160 38 V52 Q160 56 156 56 H10 Q6 56 6 52 V14 Q6 10 10 10 Z"
          fill="url(#gp-bus-body)"
          stroke="#0F2B57"
          strokeWidth="1.4"
        />
        {/* windscreen */}
        <path d="M141 12 L149 13.5 L157 31 Q157.6 33 156 33 H141 Z" fill="url(#gp-bus-glass)" stroke="#0F2B57" strokeWidth="1" />
        {/* passenger windows */}
        {[14, 36, 58, 80, 102].map((x) => (
          <g key={x}>
            <rect x={x} y="13" width="19" height="17" rx="2.5" fill="url(#gp-bus-glass)" stroke="#0F2B57" strokeWidth="0.9" />
            <path d={`M${x + 3} 27 L${x + 11} 15`} stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        ))}
        {/* door */}
        <rect x="124" y="13" width="13" height="36" rx="2" fill="url(#gp-bus-glass)" stroke="#0F2B57" strokeWidth="0.9" />
        <line x1="130.5" y1="13" x2="130.5" y2="49" stroke="#0F2B57" strokeWidth="0.8" />
        {/* brand stripes */}
        <rect x="6.7" y="34" width="117" height="4" fill="#F26A1B" />
        <rect x="6.7" y="38" width="117" height="1.6" fill="#12A3DD" />
        <path d="M137.6 34 H159.6 V38 H137.6 Z" fill="#F26A1B" />
        {/* navy skirt */}
        <path d="M6.7 42 H123.3 V55.3 H10 Q6.7 55.3 6.7 52 Z" fill="#0F2B57" />
        <path d="M137.7 42 H159.3 V52 Q159.3 55.3 156 55.3 H137.7 Z" fill="#0F2B57" />
        <text x="48" y="51" fontSize="6.6" fontWeight="800" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, Inter, sans-serif" letterSpacing="0.3">
          GuruPriya
        </text>
        <text x="84" y="51" fontSize="6.6" fontWeight="700" fill="#FDA068" fontFamily="Plus Jakarta Sans, Inter, sans-serif">
          Tours
        </text>
        {/* lights */}
        <rect x="153" y="44" width="5" height="4" rx="1.5" fill="#FAD27A" />
        <rect x="6.5" y="44" width="3" height="5" rx="1" fill="#E5484D" />
        {/* mirror */}
        <path d="M156 14 Q162 15 161 22" stroke="#0F2B57" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>

      {/* wheels */}
      {[36, 112].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="56" r="10" fill="#06142B" />
          <g className={spin} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx={cx} cy="56" r="5.8" fill="#CBD5E1" />
            <path d={`M${cx - 5} 56 H${cx + 5} M${cx} 51 V61`} stroke="#64748B" strokeWidth="1.4" />
            <circle cx={cx} cy="56" r="1.8" fill="#0F2B57" />
          </g>
        </g>
      ))}
    </svg>
  );
}
