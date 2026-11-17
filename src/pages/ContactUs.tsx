import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company } from "@/data/trips";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import S from "@/i18n/strings";

export default function ContactUs() {
  const { t, language } = useI18n();
  const pick = useLocalized();
  const primary = company.founder.phones[0];
  const mapsHref = company.googleBusinessProfileUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.office.en)}`;

  return (
    <>
      <PageHero
        image="kerala-houseboat"
        imageAlt="A houseboat on the Kerala backwaters"
        eyebrow={t.contact.title}
        title="Let's plan your journey"
        subtitle="Call, WhatsApp or send an enquiry. Tell us where you'd like to go and our team will get back to you personally."
        mood="calm"
        size="sm"
      />

      <section className="section-py bg-sand">
        <div className="container-site grid gap-8 lg:grid-cols-[380px_1fr]">
          <aside data-track-area="contact_page" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:+91${primary}`} className="card-premium flex flex-col items-center gap-2 p-5 text-center hover:-translate-y-0.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold">{pick(S.callUs)}</span>
                <span className="text-xs text-navy-900/70">{primary}</span>
              </a>
              <a
                href={buildWhatsAppLink(language === "mr" ? "नमस्कार, मला सहलीबद्दल माहिती हवी आहे." : "Hello, I would like help planning a trip.")}
                target="_blank"
                rel="noopener noreferrer"
                className="card-premium flex flex-col items-center gap-2 p-5 text-center hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-[#0b2b16]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold">{pick(S.whatsapp)}</span>
                <span className="text-xs text-navy-900/70">{company.whatsapp.slice(2)}</span>
              </a>
            </div>

            <div className="card-premium p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <MapPin className="h-4 w-4 text-saffron-600" /> {t.contact.officeAddress}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/75">{pick(company.office)}</p>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn-link mt-3 text-xs">
                {language === "mr" ? "Google Maps वर पहा" : "View on Google Maps"} →
              </a>
            </div>

            <div className="card-premium p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <Phone className="h-4 w-4 text-saffron-600" /> {t.contact.phoneNumbers}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-navy-900/75">
                {company.contacts.map((c) => (
                  <li key={pick(c.location)} className="flex flex-wrap justify-between gap-x-3">
                    <span className="font-semibold text-navy-900">{pick(c.location)}</span>
                    <span>
                      {c.numbers.map((n, i) => (
                        <span key={n}>
                          {i > 0 && " / "}
                          <a href={`tel:+91${n}`} className="hover:text-saffron-700">
                            {n}
                          </a>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-3 rounded-3xl bg-navy-800 p-6 text-sm text-white/85">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-sun" />
              <p>{t.contact.enquiryNote}</p>
            </div>
          </aside>

          <div id="enquiry" className="scroll-mt-28 rounded-4xl bg-white p-6 shadow-premium sm:p-10">
            <h2 className="font-display text-2xl font-extrabold">{t.contact.formTitle}</h2>
            <p className="mb-8 mt-2 text-sm text-navy-900/70">Only your name and mobile number are required. Everything else helps us plan better.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
