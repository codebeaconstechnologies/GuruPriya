import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Route, CalendarCheck, Sofa, MessageSquareText, Headset, Users, Quote, MapPin, Star } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { categories, featuredCategorySlugs } from "@/data/catalog/categories";
import { destinations } from "@/data/catalog/destinations";
import { allPackageCards } from "@/data/catalog/packages";
import { company, founderStory } from "@/data/trips";
import { tripReviews } from "@/data/reviews";
import { getVisiblePosts } from "@/data/blog";
import { IS_PRODUCTION } from "@/config/site";
import { photo } from "@/utils/images";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryCard, DestinationCard, PackageCard } from "@/components/cards/Cards";
import { JourneyScene, JOURNEY_STOPS } from "@/components/bus/JourneyScene";
import S from "@/i18n/strings";

/* 2 ─ Travel experiences */
export function Experiences() {
  const pick = useLocalized();
  const list = featuredCategorySlugs.map((s) => categories.find((c) => c.slug === s)!);
  return (
    <section className="section-py bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow={pick(S.home.experiencesEyebrow)}
          title={pick(S.home.experiencesTitle)}
          align="left"
          action={
            <Link to="/packages" className="btn-link">
              {pick(S.home.allPackages)} <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.06}>
              <CategoryCard c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 3 ─ Featured destinations */
export function FeaturedDestinations() {
  const pick = useLocalized();
  const [tab, setTab] = useState<"india" | "world">("india");
  const list = destinations.filter((d) => (tab === "india" ? d.region !== "international" : d.region === "international")).slice(0, tab === "india" ? 10 : 9);
  const [first, ...rest] = list;
  return (
    <section className="section-py bg-sand">
      <div className="container-site">
        <SectionHeading
          eyebrow={pick(S.home.destinationsEyebrow)}
          title={pick(S.home.destinationsTitle)}
          align="left"
          action={
            <div role="tablist" aria-label={pick(S.home.destinationsTitle)} className="inline-flex rounded-full bg-white p-1 shadow-card">
              {(["india", "world"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  onClick={() => setTab(k)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${tab === k ? "bg-navy-800 text-white" : "text-navy-900/70 hover:text-navy-900"}`}
                >
                  {k === "india" ? pick(S.home.india) : pick(S.home.world)}
                </button>
              ))}
            </div>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2">
          <div className="col-span-2 row-span-2">
            <DestinationCard d={first} tall />
          </div>
          {rest.slice(0, 4).map((d) => (
            <DestinationCard key={d.slug} d={d} />
          ))}
        </div>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {rest.slice(4).map((d) => (
            <Link key={d.slug} to={`/destinations/${d.slug}`} className="chip shrink-0 !bg-white !px-4 !py-2 shadow-sm hover:!bg-navy-800 hover:!text-white">
              <MapPin className="h-3.5 w-3.5" /> {d.name}
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/destinations" className="btn-navy">
            {pick(S.home.allDestinations)} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 4 ─ Featured tour packages */
export function FeaturedPackages() {
  const pick = useLocalized();
  const cards = allPackageCards().filter((c) => c.kind !== "completed").slice(0, 6);
  return (
    <section className="section-py bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow={pick(S.home.packagesEyebrow)}
          title={pick(S.home.packagesTitle)}
          align="left"
          action={
            <Link to="/packages" className="btn-link">
              {pick(S.home.allPackages)} <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {cards.map((p) => (
            <div key={p.key} className="w-[82%] shrink-0 snap-start sm:w-auto">
              <PackageCard p={p} />
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-navy-900/70">
          <strong className="font-semibold">Tailor-made</strong> itineraries are suggested plans we customise to your dates and budget.{" "}
          <strong className="font-semibold">Scheduled departures</strong> are fixed-date group journeys.
        </p>
      </div>
    </section>
  );
}

/* 5 ─ Signature road trip: the GuruPriya journey */
export function SignatureJourney() {
  const pick = useLocalized();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FFF7F0] to-white py-16 sm:py-24">
      <div className="container-site">
        <SectionHeading eyebrow={pick(S.home.journeyEyebrow)} title={pick(S.home.journeyTitle)} subtitle={pick(S.home.journeyText)} />
      </div>
      <div className="mx-auto max-w-[1400px] px-0 sm:px-6">
        <div className="overflow-hidden rounded-none border-y border-navy-900/5 bg-white shadow-card sm:rounded-4xl sm:border">
          <JourneyScene />
        </div>
      </div>
      <ol className="container-site mt-6 flex flex-wrap justify-center gap-2 sm:hidden">
        {JOURNEY_STOPS.map((s, i) => (
          <li key={s.label} className="chip">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-saffron-600 text-[9px] font-bold text-white">{i + 1}</span>
            {s.label}
          </li>
        ))}
      </ol>
      <div className="container-site mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/services/bus-coach-tours" className="btn-navy">
          Coach & road journeys <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/tours/group" className="btn-secondary">
          Group tours
        </Link>
      </div>
    </section>
  );
}

/* 6 ─ Why GuruPriya */
const WHY = [
  { icon: Route, title: "Personalised travel planning", text: "Every plan starts with a conversation about who is travelling, your pace and your budget." },
  { icon: CalendarCheck, title: "Carefully planned itineraries", text: "Realistic travel times and sensible overnight stops, with no rushed days." },
  { icon: Sofa, title: "Comfortable travel", text: "Rail, coach or flight, with stays chosen for comfort and location." },
  { icon: MessageSquareText, title: "Transparent communication", text: "Inclusions, hotels and timings are confirmed in writing before you pay." },
  { icon: Headset, title: "Dedicated assistance", text: "Our team is a call or WhatsApp message away, before and during your trip." },
  { icon: Users, title: "Memorable group journeys", text: "From family groups to full-coach yatras, we handle the logistics so everyone can enjoy the trip." }
];

export function WhyGuruPriya() {
  const pick = useLocalized();
  return (
    <section className="section-py bg-navy-900 text-white">
      <div className="container-site">
        <SectionHeading light eyebrow={pick(S.home.whyEyebrow)} title={pick(S.home.whyTitle)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.07}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-sun/40 hover:bg-white/[0.07]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sunset text-white">
                  <w.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold !text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 7 ─ Domestic vs international */
export function IndiaWorldSplit() {
  const pick = useLocalized();
  const halves = [
    { to: "/tours/domestic", img: "himachal-manali", title: pick(S.home.splitIndiaTitle), text: pick(S.home.splitIndiaText), tag: pick(S.home.india) },
    { to: "/tours/international", img: "singapore-skyline", title: pick(S.home.splitWorldTitle), text: pick(S.home.splitWorldText), tag: pick(S.home.world) }
  ];
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-site grid gap-5 md:grid-cols-2">
        {halves.map((h) => (
          <Link key={h.to} to={h.to} className="group relative isolate block min-h-[380px] overflow-hidden rounded-4xl sm:min-h-[460px]">
            <img src={photo(h.img, 1600)} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-1000 ease-brand group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
            <div className="flex h-full min-h-[inherit] flex-col justify-end p-8 sm:p-10">
              <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sun-light backdrop-blur-sm">{h.tag}</span>
              <h2 className="mt-3 text-display-md font-extrabold !text-white">{h.title}</h2>
              <p className="mt-2 max-w-md text-white/80">{h.text}</p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy-900 transition group-hover:gap-3">
                {pick(S.explore)} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* 8 ─ Customised planning */
export function CustomTripBand() {
  const pick = useLocalized();
  return (
    <section className="bg-white pb-4">
      <div className="container-site">
        <div className="relative isolate grid items-center gap-10 overflow-hidden rounded-4xl bg-brand-sunset p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Customized tours</p>
            <h2 className="mt-3 text-display-md font-extrabold !text-white">{pick(S.home.customTitle)}</h2>
            <p className="mt-4 max-w-xl text-white/90">{pick(S.home.customText)}</p>
            <Link to="/contact?category=customized#enquiry" className="btn mt-8 bg-navy-900 text-white hover:bg-navy-950">
              {pick(S.home.customCta)} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3 text-sm font-semibold text-navy-950">
            {["Tell us where, when and who's travelling", "Get a day-by-day plan with stays and transport", "Refine it until it's right, then travel"].map((step, i) => (
              <li key={step} className="flex items-center gap-4 rounded-2xl bg-white/90 p-4 shadow-card">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-extrabold text-white">{i + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* 9 ─ About intro */
export function AboutIntro() {
  const pick = useLocalized();
  return (
    <section className="section-py bg-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={photo("uttarakhand-nainital", 1600)} alt="Nainital in Uttarakhand" loading="lazy" className="aspect-[4/3] w-full rounded-4xl object-cover shadow-premium" />
          <div className="absolute -bottom-6 right-4 flex items-center gap-4 rounded-3xl bg-white p-4 pr-6 shadow-lift sm:right-8">
            <img src={company.founder.photo} alt={company.founder.name.en} width={64} height={64} loading="lazy" className="h-16 w-16 rounded-2xl object-cover object-[50%_12%]" />
            <div>
              <p className="font-display text-sm font-bold">{pick(company.founder.name)}</p>
              <p className="text-xs text-navy-900/70">{pick(company.founder.title)}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="eyebrow">
            <span className="h-px w-6 bg-saffron-500" /> {pick(S.home.aboutEyebrow)}
          </span>
          <h2 className="mt-3 text-display-md font-extrabold">{pick(S.home.aboutTitle)}</h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-900/75">{pick(S.home.aboutText)}</p>
          <p className="mt-4 leading-relaxed text-navy-900/70">{pick(founderStory.mission)}</p>
          <Link to="/about" className="btn-navy mt-8">
            {pick(S.home.readStory)} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* 10 ─ Testimonials (genuine only in production) */
export function Testimonials() {
  const pick = useLocalized();
  const real = tripReviews.filter((r) => !r.isSample);
  const showDemo = !IS_PRODUCTION && real.length === 0;
  const list = real.length ? real : showDemo ? tripReviews : [];
  return (
    <section className="section-py bg-sand">
      <div className="container-site">
        <SectionHeading eyebrow={pick(S.home.storiesEyebrow)} title={pick(S.home.storiesTitle)} />
        {list.length > 0 ? (
          <>
            {showDemo && (
              <p className="mb-6 text-center text-xs font-bold uppercase tracking-wide text-red-700">Development preview: sample reviews, never shown on the live site</p>
            )}
            <div className="grid gap-5 md:grid-cols-3">
              {list.slice(0, 3).map((r) => (
                <figure key={r.id} className="card-premium flex h-full flex-col p-7">
                  <Quote className="h-7 w-7 text-saffron-500" />
                  <div className="mt-3 flex gap-0.5" role="img" aria-label={`${r.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-sun text-sun" : "text-navy-900/20"}`} />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 leading-relaxed text-navy-900/80">{pick(r.quote)}</blockquote>
                  <figcaption className="mt-5 text-sm font-bold">
                    {r.name} <span className="font-normal text-navy-900/70">· {pick(r.location)}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-4xl border border-dashed border-navy-900/20 bg-white p-10 text-center">
            <Quote className="mx-auto h-8 w-8 text-saffron-500" />
            <p className="mt-4 leading-relaxed text-navy-900/75">{pick(S.home.storiesEmpty)}</p>
            <a
              href={buildWhatsAppLink("Hello, I travelled with GuruPriya and would like to share my experience.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-6"
            >
              {pick(S.home.shareStory)}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* 11 ─ Travel inspiration: published guides, else destination guides */
export function Inspiration() {
  const pick = useLocalized();
  const posts = getVisiblePosts().filter((p) => p.status === "published" || !IS_PRODUCTION);
  const items =
    posts.length > 0
      ? posts.slice(0, 3).map((p) => ({ to: `/blog/${p.slug}`, img: p.image.src, kicker: "Travel guide", title: p.title, text: p.description }))
      : ["kerala", "kashmir", "dubai"].map((slug) => {
          const d = destinations.find((x) => x.slug === slug)!;
          return { to: `/destinations/${slug}`, img: photo(d.image, 800), kicker: "Destination guide", title: `${d.name}: ${d.tagline}`, text: `Best time: ${d.bestTime}. Ideal duration: ${d.idealDuration}.` };
        });
  return (
    <section className="section-py bg-white">
      <div className="container-site">
        <SectionHeading
          eyebrow={pick(S.home.inspirationEyebrow)}
          title={pick(S.home.inspirationTitle)}
          align="left"
          action={
            <Link to={posts.length ? "/blog" : "/destinations"} className="btn-link">
              {pick(S.viewAll)} <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.to} delay={i * 0.08}>
              <Link to={it.to} className="group block">
                <div className="overflow-hidden rounded-3xl">
                  <img src={it.img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 ease-brand group-hover:scale-105" />
                </div>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-saffron-600">{it.kicker}</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug transition group-hover:text-saffron-700">{it.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-navy-900/70">{it.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
