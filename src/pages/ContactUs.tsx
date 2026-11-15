import { Phone, Send, MapPin } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function ContactUs() {
  const { t, language } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading as="h1" eyebrow="GuruPriya Travels" title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="card-premium flex flex-col gap-6 p-7">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-charcoal">{t.contact.officeAddress}</h2>
                  <p className="mt-1 text-sm text-charcoal/75 break-words">{pick(company.office)}</p>
                  <a
                    href={company.googleBusinessProfileUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.office.en)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-xs font-bold text-saffron-700 hover:text-saffron-800"
                  >
                    {language === "mr" ? "Google Maps वर पहा" : "View on Google Maps"} →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="w-full min-w-0">
                  <h2 className="text-sm font-bold text-charcoal">{t.contact.phoneNumbers}</h2>
                  <ul className="mt-1 space-y-1 text-sm text-charcoal/75">
                    {company.contacts.map((c) => (
                      <li key={pick(c.location)}>
                        <span className="font-semibold text-charcoal/75">{pick(c.location)}:</span>{" "}
                        {c.numbers.map((n, i) => (
                          <span key={n}>
                            {i > 0 && " / "}
                            <a href={`tel:+91${n}`} className="hover:text-saffron-700">{n}</a>
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <Send className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-charcoal">{t.contact.formTitle}</h2>
                  <p className="mt-1 text-sm text-charcoal/75">{t.contact.enquiryNote}</p>
                  <a href="#enquiry" className="mt-1.5 inline-block text-xs font-bold text-saffron-700 hover:text-saffron-800">
                    {t.contact.enquiryLink} →
                  </a>
                </div>
              </div>

              <div className="border-t border-charcoal/10 pt-5">
                <WhatsAppButton
                  message={
                    language === "mr"
                      ? "नमस्कार, मला यात्रेबद्दल अधिक माहिती हवी आहे."
                      : "Hello, I would like more information about your yatras."
                  }
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card-premium p-7 sm:p-8">
              <h2 className="mb-6 font-display text-xl font-bold text-charcoal">{t.contact.formTitle}</h2>
              <div id="enquiry" className="scroll-mt-28">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
