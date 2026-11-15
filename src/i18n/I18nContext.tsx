import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en, { type TranslationDictionary } from "./en";
import mr from "./mr";

export type Language = "en" | "mr";

const dictionaries: Record<Language, TranslationDictionary> = { en, mr };

const STORAGE_KEY = "gurupriya-language";

interface I18nContextValue {
  language: Language;
  t: TranslationDictionary;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// English is the default so search engines index the English version.
// Visitors can switch to Marathi; their choice is remembered.
const DEFAULT_LANGUAGE: Language = "en";

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "mr") return stored;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall back silently.
  }
  return DEFAULT_LANGUAGE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore write failures
    }
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === "en" ? "mr" : "en"));

  const value = useMemo<I18nContextValue>(
    () => ({ language, t: dictionaries[language], setLanguage, toggleLanguage }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Picks the localized string from a {en, mr} pair for the active language. */
export function useLocalized() {
  const { language } = useI18n();
  return function pick<T extends { en: string; mr: string }>(text: T): string {
    return text[language];
  };
}
