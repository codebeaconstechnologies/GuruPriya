import { Phone, Mail, MapPin } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { company } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function ContactUs() {
  const { t, language } = useI18n();
  const pick = useLocalized();

  useSeo({
    title: `${t.contact.title} | GuruPriya Tours & Travels`,
    description: t.contact.subtitle
  });

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="GuruPriya Travels" title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="card-premium flex flex-col gap-6 p-7">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-charcoal">{t.contact.officeAddress}</h3>
                  <p className="mt-1 text-sm text-charcoal/60">{pick(company.office)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <h3 className="text-sm font-bold text-charcoal">{t.contact.phoneNumbers}</h3>
                  <ul className="mt-1 space-y-1 text-sm text-charcoal/60">
                    {company.contacts.map((c) => (
                      <li key={pick(c.location)}>
                        <span className="font-semibold text-charcoal/75">{pick(c.location)}:</span> {c.numbers.join(" / ")}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-charcoal">{t.contact.emailUs}</h3>
                  <p className="mt-1 text-sm text-charcoal/60">enquiry@gurupriyatravels.example.com</p>
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
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
