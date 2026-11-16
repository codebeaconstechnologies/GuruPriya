import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, MapPin } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { photo } from "@/utils/images";
import { PageHero } from "@/components/ui/PageHero";

type Theme = "Mountains" | "Beaches" | "Road Trips" | "Pilgrimage" | "Family Holidays" | "International" | "Nature & Wildlife";

// Destination photography (free-licensed, see /image-credits). This is not
// presented as GuruPriya's own trip photos; replace with real yatra photos
// as they become available.
const PHOTOS: { id: string; place: string; themes: Theme[] }[] = [
  { id: "himachal-manali", place: "Manali, Himachal Pradesh", themes: ["Mountains", "Family Holidays"] },
  { id: "hero-spiti-road", place: "Spiti, Himachal Pradesh", themes: ["Road Trips", "Mountains"] },
  { id: "kashmir-dal-lake", place: "Dal Lake, Kashmir", themes: ["Family Holidays", "Nature & Wildlife"] },
  { id: "thailand-phi-phi", place: "Phi Phi Islands, Thailand", themes: ["Beaches", "International"] },
  { id: "kedarnath-temple-in-rainy-season", place: "Kedarnath, Uttarakhand", themes: ["Pilgrimage", "Mountains"] },
  { id: "goa-palolem", place: "Palolem, Goa", themes: ["Beaches", "Family Holidays"] },
  { id: "switzerland-lauterbrunnen", place: "Lauterbrunnen, Switzerland", themes: ["International", "Mountains"] },
  { id: "varanasi-aarti", place: "Varanasi, Uttar Pradesh", themes: ["Pilgrimage"] },
  { id: "kerala-backwaters", place: "Alleppey, Kerala", themes: ["Nature & Wildlife", "Family Holidays"] },
  { id: "maldives-water-villas", place: "Maldives", themes: ["Beaches", "International"] },
  { id: "spiti-valley", place: "Spiti Valley", themes: ["Road Trips", "Mountains"] },
  { id: "meghalaya-root-bridge", place: "Nongriat, Meghalaya", themes: ["Nature & Wildlife"] },
  { id: "rajasthan-hawa-mahal", place: "Jaipur, Rajasthan", themes: ["Family Holidays"] },
  { id: "dubai-skyline", place: "Dubai", themes: ["International"] },
  { id: "badrinath-temple-uttarakhand", place: "Badrinath, Uttarakhand", themes: ["Pilgrimage"] },
  { id: "andaman-radhanagar", place: "Havelock, Andaman", themes: ["Beaches"] },
  { id: "maharashtra-malshej", place: "Malshej Ghat, Maharashtra", themes: ["Road Trips", "Nature & Wildlife"] },
  { id: "bali-rice-terraces", place: "Bali, Indonesia", themes: ["International", "Nature & Wildlife"] },
  { id: "tamilnadu-meenakshi", place: "Madurai, Tamil Nadu", themes: ["Pilgrimage"] },
  { id: "nilgiri-railway", place: "Nilgiri Mountain Railway", themes: ["Family Holidays", "Road Trips"] },
  { id: "sikkim-tsomgo", place: "Tsomgo Lake, Sikkim", themes: ["Mountains", "Nature & Wildlife"] },
  { id: "singapore-skyline", place: "Singapore", themes: ["International"] },
  { id: "early-morning-glimpse-of-kainchi-dham-nainital-2023", place: "Kainchi Dham, Uttarakhand", themes: ["Pilgrimage"] },
  { id: "vietnam-ha-long", place: "Ha Long Bay, Vietnam", themes: ["International", "Beaches"] },
  { id: "bir-paragliding", place: "Bir Billing, Himachal Pradesh", themes: ["Mountains", "Nature & Wildlife"] },
  { id: "gujarat-rann", place: "Rann of Kutch, Gujarat", themes: ["Road Trips"] }
];

const THEMES: ("All" | Theme)[] = ["All", "Mountains", "Beaches", "Road Trips", "Pilgrimage", "Family Holidays", "International", "Nature & Wildlife"];

export default function Gallery() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const list = useMemo(() => PHOTOS.filter((p) => theme === "All" || p.themes.includes(theme)), [theme]);

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index !== null ? list[index] : null;

  return (
    <>
      <PageHero image="maldives-water-villas" imageAlt="Maldives lagoon" eyebrow={t.galleryPage.title} title="A world of journeys" subtitle="Mountains, beaches, road trips, sacred places and cities abroad: a glimpse of where we can take you." mood="ocean" size="sm" />
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar" role="group" aria-label="Photo themes">
            {THEMES.map((th) => (
              <button
                key={th}
                type="button"
                aria-pressed={theme === th}
                onClick={() => setTheme(th)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${theme === th ? "bg-navy-800 text-white" : "bg-sand text-navy-900/75 hover:text-navy-900"}`}
              >
                {th}
              </button>
            ))}
          </div>

          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
            {list.map((p, i) => (
              <button key={p.id} type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-2xl" aria-label={`View photo: ${p.place}`}>
                <img src={photo(p.id, 800)} alt={p.place} loading="lazy" className={`w-full object-cover transition duration-700 ease-brand group-hover:scale-105 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-navy-950/80 to-transparent p-3 pt-8 text-left text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <MapPin className="h-3.5 w-3.5" /> {p.place}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-navy-900/70">
            Destination photography is used under free licences.{" "}
            <Link to="/image-credits" className="font-semibold underline">
              See image credits
            </Link>
            .
          </p>
        </div>
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.place}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-navy-950/95 p-4"
          onClick={() => setIndex(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button type="button" aria-label={t.common.close} onClick={() => setIndex(null)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
            <X className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex">
            <ChevronRight className="h-6 w-6" />
          </button>
          <img src={photo(current.id, 1600)} alt={current.place} onClick={(e) => e.stopPropagation()} className="max-h-[80vh] max-w-full rounded-2xl object-contain" />
          <p className="mt-4 text-sm font-semibold text-white">
            {current.place} <span className="text-white/60">· {(index ?? 0) + 1} / {list.length}</span>
          </p>
        </div>
      )}
    </>
  );
}
