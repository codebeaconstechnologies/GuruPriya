import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, X, Clock, MapPin, MessageCircle, Phone, Sparkles, ChevronDown, Info } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { getTailorMadePackage, tailorMadeCards } from "@/data/catalog/packages";
import { packageDetails } from "@/data/catalog/packageDetails";
import { getDestination } from "@/data/catalog/destinations";
import { categories } from "@/data/catalog/categories";
import { company } from "@/data/trips";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { PageHero } from "@/components/ui/PageHero";
import { FaqList } from "@/components/ui/FaqList";
import { PackageCard } from "@/components/cards/Cards";
import NotFound from "@/pages/NotFound";
import S from "@/i18n/strings";

export default function PackageDetail() {
  const { slug = "" } = useParams();
  const pick = useLocalized();
  const [openDay, setOpenDay] = useState<number | null>(0);
  const base = getTailorMadePackage(slug);
  if (!base) return <NotFound />;
  const p = { ...base, ...packageDetails[base.slug] };

  const dest = getDestination(p.destination);
  const related = tailorMadeCards().filter((c) => c.key !== p.slug && c.categories.some((x) => p.categories.includes(x))).slice(0, 3);
  const phone = company.founder.phones[0];
  const waMsg = `Hello, I'm interested in the "${p.title}" (${p.nights}N/${p.days}D) itinerary.`;
  const enquireHref = `/contact?package=${encodeURIComponent(`${p.title} (${p.nights}N/${p.days}D)`)}&destination=${encodeURIComponent(dest?.name ?? "")}#enquiry`;

  const faqs = [
    { q: "Can this itinerary be changed?", a: "Yes. This is a suggested plan. We adjust days, hotels and sightseeing to your dates, group and budget." },
    { q: "How do I get the price?", a: "Package details and pricing depend on your dates, hotel category and group size. Send an enquiry or WhatsApp us and we'll share a written quotation." },
    { q: "Can we start from our own city?", a: "Yes. We can add train or flight tickets from Latur, Pune, Mumbai or any other city." }
  ];

  return (
    <>
      <PageHero image={p.image} imageAlt={dest?.imageAlt} eyebrow={pick(S.card.tailorMade)} title={p.title} subtitle={p.summary} mood={dest?.region === "international" ? "ocean" : "sunset"} size="lg">
        <div className="flex flex-wrap gap-2 text-sm font-semibold text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
            <Clock className="h-4 w-4" /> {p.nights} Nights / {p.days} Days
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
            <MapPin className="h-4 w-4" /> {p.route}
          </span>
        </div>
      </PageHero>

      <section className="section-py bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="flex gap-3 rounded-2xl border border-sky-100 bg-sky-50 p-5 text-sm text-navy-900/80">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
              <p>
                <strong>Tailor-made itinerary.</strong> This is a suggested plan with no fixed departure dates. We customise it to your dates, group and budget, and confirm inclusions in your written quotation.
              </p>
            </div>

            <h2 className="mt-10 font-display text-2xl font-extrabold">Overview</h2>
            <p className="mt-3 leading-relaxed text-navy-900/75">{p.summary}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 rounded-2xl bg-sand p-4 text-sm font-medium">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" /> {h}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-extrabold">Day-wise itinerary</h2>
            <ol className="mt-5 space-y-3">
              {p.itinerary.map((day, i) => {
                const isOpen = openDay === i;
                return (
                  <li key={i} className="overflow-hidden rounded-2xl border border-navy-900/10">
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpenDay(isOpen ? null : i)} className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-navy-50/60">
                      <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-800 text-white">
                        <span className="text-[9px] font-bold uppercase leading-none">Day</span>
                        <span className="font-display text-base font-extrabold leading-none">{i + 1}</span>
                      </span>
                      <span className="flex-1 font-display font-bold">{day.title}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && <p className="px-4 pb-5 pl-[76px] text-sm leading-relaxed text-navy-900/75">{day.text}</p>}
                  </li>
                );
              })}
            </ol>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-leaf-light/60 p-6">
                <h2 className="font-display text-lg font-extrabold">Typically included</h2>
                <ul className="mt-4 space-y-2.5">
                  {p.inclusions.map((x) => (
                    <li key={x} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-sand p-6">
                <h2 className="font-display text-lg font-extrabold">Not included</h2>
                <ul className="mt-4 space-y-2.5">
                  {p.exclusions.map((x) => (
                    <li key={x} className="flex gap-2.5 text-sm">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-saffron-700" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="mt-12 font-display text-2xl font-extrabold">Accommodation & transport</h2>
            <p className="mt-3 leading-relaxed text-navy-900/75">
              We suggest hotels in your preferred category (budget, comfort or premium) and confirm them by name in your quotation. Transfers and sightseeing are by private vehicle unless you choose otherwise. Train or air travel to the starting point can be added from Latur, Pune or any city.
            </p>

            <h2 className="mb-5 mt-12 font-display text-2xl font-extrabold">Good to know</h2>
            <FaqList items={faqs} />

            {dest && (
              <Link to={`/destinations/${dest.slug}`} className="btn-link mt-8">
                Read our {dest.name} travel guide <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-navy-900/10 bg-white p-6 shadow-premium">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-saffron-600">{pick(S.card.tailorMade)}</p>
              <p className="mt-2 font-display text-xl font-extrabold">{p.title}</p>
              <p className="mt-1 text-sm text-navy-900/70">
                {p.nights}N / {p.days}D · {pick(S.card.onEnquiry)}
              </p>
              <div className="mt-6 space-y-3">
                <Link to={enquireHref} className="btn-primary w-full">
                  {pick(S.enquireNow)} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={buildWhatsAppLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn w-full bg-[#25D366] text-[#0b2b16] hover:brightness-95">
                  <MessageCircle className="h-4 w-4" /> {pick(S.whatsapp)}
                </a>
                <a href={`tel:+91${phone}`} className="btn-secondary w-full">
                  <Phone className="h-4 w-4" /> {phone}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-navy-900/10 pt-5">
                {categories
                  .filter((c) => p.categories.includes(c.slug))
                  .map((c) => (
                    <Link key={c.slug} to={`/tours/${c.slug}`} className="chip hover:bg-navy-100">
                      {pick(c.name)}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-py bg-sand">
          <div className="container-site">
            <h2 className="mb-8 text-display-md font-extrabold">You may also like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PackageCard key={r.key} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
