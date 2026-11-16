import { useI18n } from "@/i18n/I18nContext";

export function LanguageToggle({ compact, onDark }: { compact?: boolean; onDark?: boolean }) {
  const { language, setLanguage } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center rounded-full border p-0.5 text-xs font-bold ${onDark ? "border-white/25 bg-white/5" : "border-charcoal/15 bg-white/70"} ${compact || onDark ? "" : "shadow-sm"}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`rounded-full px-3 py-1.5 transition ${
          language === "en" ? (onDark ? "bg-white text-navy-900" : "bg-charcoal text-white") : onDark ? "text-white/80 hover:text-white" : "text-charcoal/75 hover:text-charcoal"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("mr")}
        aria-pressed={language === "mr"}
        className={`rounded-full px-3 py-1.5 font-devanagari transition ${
          language === "mr" ? (onDark ? "bg-white text-navy-900" : "bg-charcoal text-white") : onDark ? "text-white/80 hover:text-white" : "text-charcoal/75 hover:text-charcoal"
        }`}
      >
        मराठी
      </button>
    </div>
  );
}
