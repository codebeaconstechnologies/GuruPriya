import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { services, getService } from "@/data/catalog/services";
import { getCategory } from "@/data/catalog/categories";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/Cards";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { photo } from "@/utils/images";
import NotFound from "@/pages/NotFound";
import S from "@/i18n/strings";

export function ServicesIndex() {
  return (
    <>
      <PageHero
        image="tourist-bus"
        imageAlt="A sightseeing coach"
        eyebrow="Travel services"
        title="Everything your journey needs"
        subtitle="Coaches, hotels, flights, itineraries and expert advice, arranged by one team you can call."
        mood="sunset"
      />
      <section className="section-py bg-sand">
        <div className="container-site">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Need help with something else?" text="Call or WhatsApp us, and we'll tell you honestly whether we can help." image="mumbai-gateway" />
    </>
  );
}

export function ServiceDetail() {
  const { slug = "" } = useParams();
  const pick = useLocalized();
  const s = getService(slug);
  if (!s) return <NotFound />;
  const cat = s.relatedCategory ? getCategory(s.relatedCategory) : undefined;
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero image={s.image} imageAlt={s.imageAlt} eyebrow="Travel services" title={pick(s.name)} subtitle={s.short} mood="ocean" />
      <section className="section-py bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-lg leading-relaxed text-navy-900/80">{s.intro}</p>
            <ul className="mt-8 space-y-3">
              {s.points.map((p) => (
                <li key={p} className="flex gap-3 rounded-2xl bg-sand p-4 text-sm font-medium">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-navy-900/70">Availability and pricing are confirmed in your written quotation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/contact?service=${encodeURIComponent(s.name.en)}#enquiry`} className="btn-primary">
                {pick(S.enquireNow)} <ArrowRight className="h-4 w-4" />
              </Link>
              {cat && (
                <Link to={`/tours/${cat.slug}`} className="btn-secondary">
                  {pick(cat.name)}
                </Link>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={photo(s.image, 1600)} alt={s.imageAlt} loading="lazy" className="aspect-[4/3] w-full rounded-4xl object-cover shadow-premium" />
          </Reveal>
        </div>
      </section>
      <section className="section-py bg-sand">
        <div className="container-site">
          <SectionHeading eyebrow="More services" title="We can also help with" align="left" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ServiceCard key={o.slug} s={o} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
