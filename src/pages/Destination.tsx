import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CalendarRange, Clock, MapPin, Sparkles, Info, X } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { getDestination, destinations, regionLabels } from "@/data/catalog/destinations";
import { destinationDetails } from "@/data/catalog/destinationDetails";
import { categories } from "@/data/catalog/categories";
import { packagesForDestination } from "@/data/catalog/packages";
import { photo } from "@/utils/images";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/FaqList";
import { CtaBand } from "@/components/ui/CtaBand";
import { DestinationCard, PackageCard } from "@/components/cards/Cards";
import NotFound from "@/pages/NotFound";
import S from "@/i18n/strings";

export default function Destination() {
  const { slug = "" } = useParams();
  const pick = useLocalized();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const base = getDestination(slug);
  if (!base) return <NotFound />;
  const d = { ...base, ...destinationDetails[base.slug] };

  const packages = packagesForDestination(d.slug);
  const gallery = [{ src: photo(d.image), alt: d.imageAlt }, ...(d.gallery ?? [])];
  const related = destinations.filter((x) => x.region === d.region && x.slug !== d.slug).slice(0, 4);
  const cats = categories.filter((c) => d.categories.includes(c.slug));

  return (
    <>
      <PageHero image={d.image} imageAlt={d.imageAlt} eyebrow={`${pick(regionLabels[d.region])} · ${d.country}`} title={d.name} subtitle={d.tagline} mood={d.region === "international" ? "ocean" : "sunset"} size="lg">
        <Link to={`/contact?destination=${encodeURIComponent(d.name)}#enquiry`} className="btn-primary">
          Plan a trip to {d.name} <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      {/* Quick facts */}
      <div className="container-site relative z-10 -mt-10">
        <div className="grid gap-px overflow-hidden rounded-3xl bg-navy-900/10 shadow-premium sm:grid-cols-3">
          {[
            { icon: CalendarRange, label: pick(S.card.bestTime), value: d.bestTime },
            { icon: Clock, label: pick(S.card.duration), value: d.idealDuration },
            { icon: MapPin, label: "Ideal for", value: cats.slice(0, 3).map((c) => pick(c.name)).join(" · ") }
          ].map((f) => (
            <div key={f.label} className="flex gap-4 bg-white p-6">
              <f.icon className="mt-0.5 h-6 w-6 shrink-0 text-saffron-600" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-900/70">{f.label}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-navy-900">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intro + attractions */}
      <section className="section-py bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-saffron-500" /> About {d.name}
            </span>
            <h2 className="mt-3 text-display-md font-extrabold">Discover {d.name}</h2>
            <div className="prose-brand">
              {d.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="mt-10 font-display text-lg font-bold">Experiences to enjoy</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {d.experiences.map((e) => (
                <li key={e} className="chip !bg-saffron-50 !text-saffron-800">
                  <Sparkles className="h-3.5 w-3.5" /> {e}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-extrabold">Top attractions</h2>
            <ol className="mt-6 space-y-3">
              {d.attractions.map((a, i) => (
                <li key={a.name} className="flex gap-4 rounded-2xl border border-navy-900/10 p-5 transition hover:border-saffron-300 hover:bg-saffron-50/40">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display text-sm font-extrabold text-white">{i + 1}</span>
                  <div>
                    <p className="font-display font-bold">{a.name}</p>
                    <p className="mt-0.5 text-sm text-navy-900/70">{a.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 1 && (
        <section className="bg-sand py-14">
          <div className="container-site">
            <h2 className="mb-6 font-display text-2xl font-extrabold">Photo gallery</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g, i) => (
                <button key={g.src} type="button" onClick={() => setLightbox(i)} className={`group overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`} aria-label={`View photo: ${g.alt}`}>
                  <img src={g.src.replace("-1600.webp", "-800.webp")} alt={g.alt} loading="lazy" className="aspect-square h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </button>
              ))}
            </div>
          </div>
          {lightbox !== null && (
            <div role="dialog" aria-modal="true" aria-label={gallery[lightbox].alt} className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/90 p-4" onClick={() => setLightbox(null)}>
              <button type="button" aria-label={pick(S.close)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <X className="h-5 w-5" />
              </button>
              <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
            </div>
          )}
        </section>
      )}

      {/* Packages */}
      {packages.length > 0 && (
        <section className="section-py bg-white">
          <div className="container-site">
            <SectionHeading eyebrow="Tour packages" title={`${d.name} journeys`} align="left" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => (
                <PackageCard key={p.key} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tips + FAQ */}
      <section className="section-py bg-sand">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Travel tips</h2>
            <ul className="mt-6 space-y-3">
              {d.tips.map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-white p-5 shadow-card">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                  <span className="text-sm leading-relaxed text-navy-900/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 font-display text-2xl font-extrabold">Frequently asked questions</h2>
            <FaqList items={d.faqs} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-py bg-white">
          <div className="container-site">
            <SectionHeading eyebrow="Explore more" title={`More in ${pick(regionLabels[d.region])}`} align="left" />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((x) => (
                <DestinationCard key={x.slug} d={x} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={`Ready for ${d.name}?`} text="Tell us your dates and who's travelling, and we'll plan the rest." image={d.image} ctaTo={`/contact?destination=${encodeURIComponent(d.name)}#enquiry`} whatsappMessage={`Hello, I would like to plan a trip to ${d.name}.`} />
    </>
  );
}
