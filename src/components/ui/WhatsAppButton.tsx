import { MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export function WhatsAppButton({ message, floating = false }: { message: string; floating?: boolean }) {
  const { t } = useI18n();
  const href = buildWhatsAppLink(message);

  if (floating) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.common.whatsappCta}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-95 active:scale-[0.98]"
    >
      <MessageCircle className="h-4 w-4" fill="white" strokeWidth={0} />
      {t.common.whatsappCta}
    </a>
  );
}
