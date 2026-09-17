import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { generalFaqs } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TripFAQ() {
  const { t } = useI18n();
  const pick = useLocalized();
  const [openId, setOpenId] = useState<string | null>(generalFaqs[0]?.id ?? null);

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={t.trip.faqTitle} />
        <div className="flex flex-col gap-3">
          {generalFaqs.map((faq) => {
            const open = openId === faq.id;
            return (
              <div key={faq.id} className="overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-charcoal">{pick(faq.question)}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-saffron-600 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal/65">{pick(faq.answer)}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
