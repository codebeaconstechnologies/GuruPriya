import { Link } from "react-router-dom";
import { ArrowRight, Compass, Eye, HeartHandshake, ShieldCheck, Clock, Smile, Mountain } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company, founderStory } from "@/data/trips";
import { splitParagraphs } from "@/utils/format";
import { photo, commonsImage } from "@/utils/images";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/ui/CtaBand";
import S from "@/i18n/strings";

export default function AboutUs() {
  const { t } = useI18n();
  const pick = useLocalized();
  const message = splitParagraphs(pick(founderStory.founderMessage));

  const beliefs = [t.philosophy.faith, t.philosophy.trust, t.philosophy.seva, t.philosophy.safety, t.philosophy.punctual, t.philosophy.warmth];
  const commitments = [
    { icon: ShieldCheck, title: "Honest information", text: "Inclusions, stays and timings are confirmed in writing before you pay. No surprises." },
    { icon: Clock, title: "Realistic planning", text: "Itineraries built around real travel times, rest and weather, not brochure promises." },
    { icon: HeartHandshake, title: "Care on the journey", text: "A team you can reach by phone or WhatsApp, before and during your trip." },
    { icon: Smile, title: "Every traveller welcome", text: "Families, couples, friends, pilgrims, seniors and groups, each with a plan that fits." }
  ];

  return (
    <>
      <PageHero
        image="uttarakhand-nainital"
        imageAlt="Nainital lake in the hills of Uttarakhand"
        eyebrow={pick(S.nav.about)}
        title="Every great journey begins with a story"
        subtitle="GuruPriya Tours grew out of one traveller's years on the mountain roads of Uttarakhand, and a wish to make memorable journeys possible for everyone."
        mood="sunset"
      />

      {/* Our story */}
      <section id="story" className="section-py bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-saffron-500" /> {pick(S.about.story)}
            </span>
            <h2 className="mt-3 text-display-md font-extrabold">A personal passion for the road</h2>
            <div className="prose-brand">
              <p>{pick(founderStory.introduction)}</p>
              <p>{pick(founderStory.story)}</p>
              <p>
                From that experience came GuruPriya Tours, based in Latur, Maharashtra. We started with carefully planned group yatras and now plan journeys of every kind: family holidays, honeymoons, weekend breaks, adventure trips and international escapes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <img src={commonsImage("Kedarnath Temple in Rainy season.jpg", 800)} alt="Kedarnath in the Himalaya" loading="lazy" className="aspect-[3/4] w-full rounded-3xl object-cover shadow-card" />
            <img src={photo("rishikesh-rafting", 800)} alt="The Ganga near Rishikesh" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-3xl object-cover shadow-card" />
          </Reveal>
        </div>
      </section>

      {/* The inspiration */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
        <img src={photo("hero-spiti-road", 1600)} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/30" />
        <div className="container-site max-w-3xl">
          <Mountain className="h-9 w-9 text-sun" />
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-sun-light">The inspiration</p>
          <blockquote className="mt-3 font-display text-2xl font-bold leading-snug !text-white sm:text-3xl">
            “Every temple bell at Kedarnath, every sunrise over Badrinath, and every quiet moment on the banks of the Ganga at Rishikesh has shaped how I understand faith, patience and service.”
          </blockquote>
          <p className="mt-3 text-sm font-semibold text-sun-light">— {company.founder.name.en}</p>
          <p className="mt-5 max-w-2xl text-white/80">
            Years of mountain journeys taught our founder what makes travel go well: preparation, respect for the place and genuine care for the people you travel with. Those lessons shape every itinerary we plan today, wherever it goes.
          </p>
        </div>
      </section>

      {/* Vision & mission */}
      <section id="philosophy" className="section-py bg-sand">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="card-premium h-full p-8 sm:p-10">
              <Eye className="h-8 w-8 text-saffron-600" />
              <h2 className="mt-4 font-display text-2xl font-extrabold">Our vision</h2>
              <p className="mt-3 leading-relaxed text-navy-900/75">
                To make meaningful, well-planned journeys accessible to every kind of traveller, from a family's first holiday to a grandparent's long-awaited yatra or a couple's first trip abroad.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="card-premium h-full p-8 sm:p-10">
              <Compass className="h-8 w-8 text-saffron-600" />
              <h2 className="mt-4 font-display text-2xl font-extrabold">Our mission</h2>
              <p className="mt-3 leading-relaxed text-navy-900/75">{pick(founderStory.mission)}</p>
            </Reveal>
          </div>

          <h2 className="mt-20 text-center text-display-md font-extrabold">{pick(S.about.philosophy)}</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {beliefs.map((b) => (
              <Reveal key={b.title} className="rounded-3xl bg-white p-6 shadow-card">
                <p className="font-display text-base font-bold">{b.title}</p>
                <p className="mt-2 text-sm text-navy-900/70">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment / why choose */}
      <section id="why" className="section-py bg-white">
        <div className="container-site">
          <SectionHeading eyebrow={pick(S.about.why)} title="Our commitment to travellers" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="h-full rounded-3xl border border-navy-900/10 p-7">
                <c.icon className="h-7 w-7 text-sky-600" />
                <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-navy-900/70">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the founder */}
      <section id="founder" className="section-py bg-sand">
        <div className="container-site grid gap-12 lg:grid-cols-[360px_1fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <img
              src={company.founder.photo}
              alt={pick(company.founder.name)}
              width={360}
              height={440}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-4xl object-cover object-[50%_15%] shadow-premium"
            />
            <p className="mt-5 font-display text-xl font-extrabold">{pick(company.founder.name)}</p>
            <p className="text-sm text-navy-900/70">{pick(company.founder.title)}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="eyebrow">
              <span className="h-px w-6 bg-saffron-500" /> {pick(S.about.founder)}
            </span>
            <h2 className="mt-3 text-display-md font-extrabold">{t.about.founderMessage}</h2>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-navy-900/80">
              {message.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link to="/contact" className="btn-primary mt-8">
              {pick(S.planTrip)} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Let's plan your next journey together" text="Tell us where you'd like to go. We'll take care of the rest." image="kashmir-dal-lake" />
    </>
  );
}
