import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle, Send, ArrowRight } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company } from "@/data/trips";
import { categories } from "@/data/catalog/categories";
import { destinations } from "@/data/catalog/destinations";
import { SOCIAL_PROFILES } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { RoadStrip } from "@/components/bus/RoadStrip";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import S from "@/i18n/strings";

const POPULAR = ["kashmir", "kerala", "goa", "rajasthan", "uttarakhand", "dubai", "thailand", "bali"];

export function Footer() {
  const { t } = useI18n();
  const pick = useLocalized();
  const year = new Date().getFullYear();

  const companyLinks = [
    { to: "/about", label: S.nav.about },
    { to: "/packages", label: { en: "All Tour Packages", mr: "सर्व टूर पॅकेजेस" } },
    { to: "/upcoming-yatras", label: { en: "Upcoming Yatras", mr: "आगामी यात्रा" } },
    { to: "/services", label: S.nav.services },
    { to: "/gallery", label: S.nav.gallery },
    { to: "/blog", label: S.nav.blog },
    { to: "/faq", label: { en: "FAQ", mr: "प्रश्नोत्तरे" } },
    { to: "/contact", label: S.nav.contact }
  ];

  const linkCls = "text-sm text-navy-900/70 transition hover:text-saffron-700";

  return (
    <footer className="relative mt-auto bg-sand">
      {/* Final journey: the coach heads off to the next trip */}
      <div className="relative border-t border-navy-900/5 bg-gradient-to-b from-white to-sand pt-10">
        <div className="container-site flex flex-col items-start justify-between gap-4 pb-6 sm:flex-row sm:items-end">
          <p className="font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">{pick(S.footer.nextJourney)}</p>
          <Link to="/contact" className="btn-primary">
            {pick(S.planTrip)} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <RoadStrip hills duration={30} className="h-[100px] sm:h-[120px]" />
      </div>

      <div className="container-site grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-block" aria-label="GuruPriya Tours & Travels — home">
            <Logo size={128} />
          </Link>
          <p className="mt-4 max-w-sm font-display text-base font-bold text-navy-900">{pick(S.footer.tagline)}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-900/70">{t.footer.description}</p>

          <ul className="mt-6 space-y-3 text-sm text-navy-900/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
              <span className="min-w-0 break-words">{pick(company.office)}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
              <span className="min-w-0">
                {company.founder.phones.map((p, i) => (
                  <span key={p}>
                    {i > 0 && " / "}
                    <a href={`tel:+91${p}`} className="font-semibold hover:text-saffron-700">
                      {p}
                    </a>
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
              <a href={buildWhatsAppLink("Hello, I would like help planning a trip.")} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-saffron-700">
                {pick(S.whatsapp)}: {company.whatsapp.slice(2)}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Send className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
              <Link to="/contact#enquiry" className="font-semibold hover:text-saffron-700">
                {t.contact.formTitle}
              </Link>
            </li>
          </ul>

          {SOCIAL_PROFILES.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {SOCIAL_PROFILES.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="chip">
                    {new URL(url).hostname.replace("www.", "")}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-saffron-700">{pick(S.footer.tourTypes)}</h2>
          <ul className="space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/tours/${c.slug}`} className={linkCls}>
                  {pick(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-saffron-700">{pick(S.footer.popular)}</h2>
          <ul className="space-y-2.5">
            {POPULAR.map((slug) => {
              const d = destinations.find((x) => x.slug === slug)!;
              return (
                <li key={slug}>
                  <Link to={`/destinations/${slug}`} className={linkCls}>
                    {d.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link to="/destinations" className="btn-link">
                {pick(S.home.allDestinations)} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-saffron-700">{pick(S.footer.company)}</h2>
          <ul className="space-y-2.5">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>
                  {pick(l.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-900/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-900/70 sm:flex-row">
          <p>
            © {year} {pick(company.name)}. {t.footer.rightsReserved}
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-saffron-700">
              {t.footer.privacyPolicy}
            </Link>
            <Link to="/terms" className="hover:text-saffron-700">
              {t.footer.termsConditions}
            </Link>
            <Link to="/image-credits" className="hover:text-saffron-700">
              {pick(S.footer.credits)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
