import { Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { getCategory } from "@/data/catalog/categories";
import { categoryDetails } from "@/data/catalog/categoryDetails";
import { destinations } from "@/data/catalog/destinations";
import { packagesForCategory } from "@/data/catalog/packages";
import { comingSoonTrips } from "@/data/trips";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/FaqList";
import { CtaBand } from "@/components/ui/CtaBand";
import { DestinationCard, PackageCard } from "@/components/cards/Cards";
import { ComingSoonCard } from "@/components/trips/ComingSoonCard";
import NotFound from "@/pages/NotFound";
import { ClientOnly } from "@/components/ui/ClientOnly";
import S from "@/i18n/strings";

const JourneyMap = lazy(() => import("@/components/home/JourneyMap").then((m) => ({ default: m.JourneyMap })));

export default function Category() {
  const { slug = "" } = useParams();
  const pick = useLocalized();
  const base = getCategory(slug);
  if (!base) return <NotFound />;
  const c = { ...base, ...categoryDetails[base.slug] };

  const dests = destinations.filter((d) => d.categories.includes(c.slug)).slice(0, 8);
  const packages = packagesForCategory(c.slug);
  const isPilgrimage = c.slug === "pilgrimage";

  return (
    <>
      <PageHero image={c.image} imageAlt={c.imageAlt} eyebrow={pick(c.name)} title={c.tagline} subtitle={c.short} mood={c.mood} size="lg">
        <div className="flex flex-wrap gap-3">
          <Link to={`/contact?category=${c.slug}#enquiry`} className="btn-primary">
            {pick(S.enquireNow)} <ArrowRight className="h-4 w-4" />
          </Link>
          {packages.length > 0 && (
            <a href="#packages" className="btn-ghost-light">
              See packages
            </a>
          )}
        </div>
      </PageHero>

      <section className="section-py bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-saffron-500" /> {pick(c.name)}
            </span>
            <h2 className="mt-3 text-display-md font-extrabold">{pick(c.name)} with GuruPriya</h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-900/75">{c.intro}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05} className="rounded-3xl bg-sand p-6">
                <CheckCircle2 className="h-6 w-6 text-leaf" />
                <h3 className="mt-3 font-display text-base font-bold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-navy-900/70">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {packages.length > 0 && (
        <section id="packages" className="section-py bg-sand">
          <div className="container-site">
            <SectionHeading eyebrow="Tour packages" title={isPilgrimage ? "Our yatras" : `${pick(c.name)} we can plan`} align="left" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => (
                <PackageCard key={p.key} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {isPilgrimage && (
        <>
          <section className="section-py bg-white">
            <div className="container-site">
              <SectionHeading
                eyebrow="Coming next"
                title="Upcoming yatras"
                subtitle="Register your interest and we'll share dates as soon as they are fixed."
                align="left"
                action={
                  <Link to="/upcoming-yatras" className="btn-link">
                    {pick(S.viewAll)} <ArrowRight className="h-4 w-4" />
                  </Link>
                }
              />
              <div className="grid gap-6 md:grid-cols-3">
                {comingSoonTrips.map((trip, i) => (
                  <ComingSoonCard key={trip.id} trip={trip} index={i} />
                ))}
              </div>
            </div>
          </section>
          <ClientOnly fallback={<div className="h-[520px] bg-navy-900" aria-hidden />}>
            <Suspense fallback={<div className="h-[520px] bg-navy-900" aria-hidden />}>
              <JourneyMap />
            </Suspense>
          </ClientOnly>
        </>
      )}

      {dests.length > 0 && (
        <section className="section-py bg-white">
          <div className="container-site">
            <SectionHeading eyebrow="Featured destinations" title="Where to go" align="left" />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {dests.map((d) => (
                <DestinationCard key={d.slug} d={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-py bg-sand">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-saffron-500" /> Planning tips
            </span>
            <h2 className="mt-3 text-display-md font-extrabold">Before you travel</h2>
            <ul className="mt-6 space-y-4">
              {c.planning.map((p) => (
                <li key={p} className="flex gap-3 rounded-2xl bg-white p-5 shadow-card">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-sun-dark" />
                  <span className="text-sm leading-relaxed text-navy-900/80">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-saffron-500" /> FAQ
            </span>
            <h2 className="mb-6 mt-3 text-display-md font-extrabold">Common questions</h2>
            <FaqList items={c.faqs} />
          </div>
        </div>
      </section>

      <CtaBand title={`Plan your ${pick(c.name).toLowerCase()}`} text="Share your dates, group and budget, and we'll suggest the best options." image={c.image} ctaTo={`/contact?category=${c.slug}#enquiry`} />
    </>
  );
}
