import { useI18n } from "@/i18n/I18nContext";

export function LanguageToggle({ compact }: { compact?: boolean }) {
  const { language, setLanguage } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center rounded-full border border-charcoal/15 bg-white/70 p-0.5 text-xs font-bold ${compact ? "" : "shadow-sm"}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`rounded-full px-3 py-1.5 transition ${
          language === "en" ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("mr")}
        aria-pressed={language === "mr"}
        className={`rounded-full px-3 py-1.5 font-devanagari transition ${
          language === "mr" ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
        }`}
      >
        मराठी
      </button>
    </div>
  );
}
