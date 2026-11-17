import { Link } from "react-router-dom";
import { Phone, MessageCircle, Send } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { company } from "@/data/trips";
import { buildWhatsAppLink } from "@/utils/whatsapp";

/** Sticky Call / WhatsApp / Enquire bar on small screens (replaces the floating button there). */
export function MobileCtaBar({ whatsappMessage }: { whatsappMessage: string }) {
  const { t } = useI18n();
  const phone = company.founder.phones[0];

  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-bold";

  return (
    <div data-track-area="mobile_bar" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-charcoal/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-premium backdrop-blur lg:hidden">
      <a href={`tel:+91${phone}`} className={`${item} text-charcoal`}>
        <Phone className="h-5 w-5 text-saffron-600" />
        {t.mobileCta.call}
      </a>
      <a href={buildWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className={`${item} text-charcoal`}>
        <MessageCircle className="h-5 w-5 text-[#1DA851]" />
        {t.mobileCta.whatsapp}
      </a>
      <Link to="/contact" className={`${item} bg-saffron-600 text-white`}>
        <Send className="h-5 w-5" />
        {t.mobileCta.enquire}
      </Link>
    </div>
  );
}
