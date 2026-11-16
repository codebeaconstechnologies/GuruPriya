import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Search, Users, CalendarDays, Compass } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { photo, photoSrcSet } from "@/utils/images";
import { categories } from "@/data/catalog/categories";
import { destinations } from "@/data/catalog/destinations";
import { RoadStrip } from "@/components/bus/RoadStrip";
import S from "@/i18n/strings";

export const HERO_SLIDES = [
  { id: "switzerland-lauterbrunnen", place: "Swiss Alps", alt: "The Lauterbrunnen valley in the Swiss Alps" },
  { id: "thailand-phi-phi", place: "Phi Phi Islands, Thailand", alt: "Turquoise lagoon at the Phi Phi Islands" },
  { id: "kashmir-dal-lake", place: "Dal Lake, Kashmir", alt: "Shikaras on Dal Lake, Srinagar" }
];

function TripPlanner() {
  const pick = useLocalized();
  const navigate = useNavigate();
  const [where, setWhere] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState("2");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (where.trim()) q.set("destination", where.trim());
    if (category) q.set("category", category);
    if (month) q.set("month", month);
    if (travellers) q.set("travellers", travellers);
    navigate(`/contact?${q.toString()}#enquiry`);
  };

  const field = "w-full border-0 bg-transparent p-0 text-sm font-semibold text-navy-900 outline-none placeholder:font-medium placeholder:text-navy-900/40 focus:ring-0";
  const label = "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-900/70";

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-2 shadow-lift" aria-label={pick(S.hero.searchTitle)}>
      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_auto]">
        <label className="rounded-2xl px-4 py-3 transition focus-within:bg-navy-50 hover:bg-navy-50/60">
          <span className={label}>
            <MapPin className="h-3.5 w-3.5 text-saffron-600" /> {pick(S.hero.where)}
          </span>
          <input list="gp-destinations" value={where} onChange={(e) => setWhere(e.target.value)} placeholder={pick(S.hero.wherePh)} className={`${field} mt-1`} />
          <datalist id="gp-destinations">
            {destinations.map((d) => (
              <option key={d.slug} value={d.name} />
            ))}
            <option value="Char Dham Yatra" />
            <option value="Kainchi Dham" />
          </datalist>
        </label>
        <label className="rounded-2xl px-4 py-3 transition focus-within:bg-navy-50 hover:bg-navy-50/60">
          <span className={label}>
            <Compass className="h-3.5 w-3.5 text-saffron-600" /> {pick(S.hero.category)}
          </span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${field} mt-1 cursor-pointer`}>
            <option value="">{pick(S.hero.anyCategory)}</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {pick(c.name)}
              </option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl px-4 py-3 transition focus-within:bg-navy-50 hover:bg-navy-50/60">
          <span className={label}>
            <CalendarDays className="h-3.5 w-3.5 text-saffron-600" /> {pick(S.hero.month)}
          </span>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className={`${field} mt-1`} />
        </label>
        <label className="rounded-2xl px-4 py-3 transition focus-within:bg-navy-50 hover:bg-navy-50/60">
          <span className={label}>
            <Users className="h-3.5 w-3.5 text-saffron-600" /> {pick(S.hero.travellers)}
          </span>
          <input type="number" min={1} max={200} inputMode="numeric" value={travellers} onChange={(e) => setTravellers(e.target.value)} className={`${field} mt-1`} />
        </label>
        <button type="submit" className="btn-primary m-1 !rounded-2xl !px-7 sm:col-span-2 lg:col-span-1">
          <Search className="h-4 w-4" /> {pick(S.hero.submit)}
        </button>
      </div>
    </form>
  );
}

export function HomeHero() {
  const pick = useLocalized();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Slides 2+ are added only after the page has loaded (plus a pause), so
  // they never compete with the first image — the LCP element.
  const [extraSlides, setExtraSlides] = useState(false);

  useEffect(() => {
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setExtraSlides(true), 2500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  useEffect(() => {
    if (reduced || !extraSlides) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 7000);
    return () => window.clearInterval(id);
  }, [reduced, extraSlides]);

  const slides = extraSlides ? HERO_SLIDES : HERO_SLIDES.slice(0, 1);

  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {slides.map((s, i) => (
        <img
          key={s.id}
          src={photo(s.id, 1600)}
          srcSet={photoSrcSet(s.id)}
          sizes="100vw"
          alt={i === index ? s.alt : ""}
          aria-hidden={i !== index}
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-[opacity,transform] duration-[1600ms] ease-brand ${
            i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/70 via-navy-950/20 to-transparent" />

      <div className="container-site flex min-h-[calc(100svh-120px)] flex-col justify-end pb-10 pt-20 sm:min-h-[640px] lg:min-h-[720px]">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sun-light backdrop-blur-sm">
            {pick(S.hero.eyebrow)}
          </span>
          <h1 className="mt-5 text-display-xl font-extrabold !text-white text-shadow-hero">{pick(S.hero.title)}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{pick(S.hero.subtitle)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/packages" className="btn-primary">
              {pick(S.hero.primary)} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/tours/customized" className="btn-ghost-light">
              {pick(S.hero.secondary)}
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <TripPlanner />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Hero images">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.place}
                onClick={() => {
                  setExtraSlides(true);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-10 bg-sun" : "w-5 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
            <MapPin className="h-3.5 w-3.5" /> {HERO_SLIDES[index].place}
          </p>
        </div>
      </div>

      <RoadStrip variant="dark" duration={22} className="h-[60px] sm:h-[68px]" />
    </section>
  );
}
