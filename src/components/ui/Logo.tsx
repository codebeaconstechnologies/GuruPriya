/**
 * The official GuruPriya logo (stacked, transparent), from brand/logo-pack.
 * Served as optimised square WebP renditions in /public/brand; transparency
 * and aspect ratio are preserved — never place it in a box or stretch it.
 * The pack has no dark-background or horizontal variant, so it is always
 * used on light surfaces.
 */
const SRCSET = [96, 160, 240, 320, 480].map((w) => `/brand/gurupriya-logo-${w}.webp ${w}w`).join(", ");

export function Logo({ size, className = "", priority = false }: { size: number; className?: string; priority?: boolean }) {
  return (
    <img
      src="/brand/gurupriya-logo-240.webp"
      srcSet={SRCSET}
      sizes={`${size}px`}
      width={size}
      height={size}
      alt="GuruPriya Tours & Travels"
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={`block aspect-square object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
