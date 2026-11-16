import { Link } from "react-router-dom";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { useLocalized } from "@/i18n/I18nContext";
import { company } from "@/data/trips";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { photo } from "@/utils/images";
import S from "@/i18n/strings";

/** Conversion band used at the end of most pages. */
export function CtaBand({
  title,
  text,
  image = "kerala-backwaters",
  ctaLabel,
  ctaTo = "/contact",
  whatsappMessage = "Hello, I would like help planning a trip."
}: {
  title: string;
  text?: string;
  image?: string;
  ctaLabel?: string;
  ctaTo?: string;
  whatsappMessage?: string;
}) {
  const pick = useLocalized();
  const phone = company.founder.phones[0];
  return (
    <section className="container-site py-16 sm:py-20">
      <div className="relative isolate overflow-hidden rounded-4xl bg-navy-900 px-6 py-14 text-center sm:px-14 sm:py-20">
        <img src={photo(image, 1600)} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950/90 via-navy-900/75 to-saffron-800/50" />
        <h2 className="mx-auto max-w-3xl text-display-md font-extrabold !text-white">{title}</h2>
        {text && <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{text}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to={ctaTo} className="btn-primary">
            {ctaLabel ?? pick(S.enquireNow)} <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={buildWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
            <MessageCircle className="h-4 w-4" /> {pick(S.whatsapp)}
          </a>
          <a href={`tel:+91${phone}`} className="btn-ghost-light">
            <Phone className="h-4 w-4" /> {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
