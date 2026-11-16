import { type ReactNode } from "react";
import { photoSrcSet, photo } from "@/utils/images";
import type { Mood } from "@/data/catalog/categories";

const MOOD_OVERLAY: Record<Mood, string> = {
  sunset: "from-navy-950/85 via-navy-950/45 to-saffron-700/20",
  ocean: "from-navy-950/85 via-navy-900/45 to-sky-700/25",
  calm: "from-navy-950/80 via-navy-950/40 to-sun-dark/15",
  energy: "from-navy-950/85 via-saffron-800/35 to-saffron-500/20",
  romance: "from-navy-950/80 via-[#5b1d3a]/40 to-saffron-400/20",
  forest: "from-navy-950/85 via-[#0f3d26]/40 to-leaf/15"
};

/**
 * Inner-page hero: full-bleed photograph, mood-tinted overlay, title block.
 * `image` is a photo library id or a full URL.
 */
export function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  subtitle,
  mood = "ocean",
  children,
  size = "md"
}: {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  mood?: Mood;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const isUrl = image.startsWith("/") || image.startsWith("http");
  const src = isUrl ? image : photo(image);
  const srcSet = isUrl ? undefined : photoSrcSet(image);
  const height = size === "lg" ? "min-h-[72vh]" : size === "sm" ? "min-h-[40vh]" : "min-h-[56vh]";

  return (
    <section className={`relative isolate flex ${height} items-end overflow-hidden bg-navy-950`}>
      <img src={src} srcSet={srcSet} sizes="100vw" alt={imageAlt} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className={`absolute inset-0 -z-10 bg-gradient-to-t ${MOOD_OVERLAY[mood]}`} />
      <div className="container-site w-full pb-12 pt-28 sm:pb-16">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sun-light backdrop-blur-sm">
              {eyebrow}
            </span>
          )}
          <h1 className="text-display-xl font-extrabold !text-white text-shadow-hero">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{subtitle}</p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
