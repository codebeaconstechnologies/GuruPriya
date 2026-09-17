import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company, featuredTrip } from "@/data/trips";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export function Footer() {
  const { t } = useI18n();
  const pick = useLocalized();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/85">
      <div className="container-px mx-auto grid max-w-7xl gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center">
            <span className="block h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
              <img
                src="/images/logo.png"
                alt={`${company.shortName.en} logo`}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.description}</p>
          <div className="mt-5">
            <LanguageToggle compact />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.quickLinks}</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-white/70 hover:text-white">{t.nav.home}</Link></li>
            <li><Link to="/yatras" className="text-white/70 hover:text-white">{t.nav.yatras}</Link></li>
            <li><Link to="/coming-soon" className="text-white/70 hover:text-white">{t.nav.comingSoon}</Link></li>
            <li><Link to="/about" className="text-white/70 hover:text-white">{t.nav.about}</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-white">{t.nav.contact}</Link></li>
            <li><Link to="/gallery" className="text-white/70 hover:text-white">{t.nav.gallery}</Link></li>
            <li><Link to="/faq" className="text-white/70 hover:text-white">{t.nav.faq}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.popularYatras}</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to={`/yatras/${featuredTrip.slug}`} className="text-white/70 hover:text-white">
                {pick(featuredTrip.title)}
              </Link>
            </li>
            <li><Link to="/coming-soon" className="text-white/70 hover:text-white">{t.common.comingSoon}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gold">{t.footer.contactInfo}</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{pick(company.office)}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{company.founder.phones.join(" / ")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>enquiry@gurupriyatravels.example.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {pick(company.name)}. {t.footer.rightsReserved}
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">{t.footer.privacyPolicy}</Link>
            <Link to="/terms" className="hover:text-white">{t.footer.termsConditions}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
