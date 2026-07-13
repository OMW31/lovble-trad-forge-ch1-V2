// ============================================================================
// useT — i18n hook for TradForge Academy
// ----------------------------------------------------------------------------
// Provides `t(key)` translation function and `lang`/`setLang` for toggling.
// Language is auto-detected from navigator.language and persisted to
// localStorage. Defaults to French.
// ============================================================================

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { TRANSLATIONS, detectLanguage, type Language, type TranslationKey } from "./translations";

const LANG_KEY = "tradforge:i18n:lang";

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY) as Language | null;
      if (stored === "fr" || stored === "en") {
        setLangState(stored);
      } else {
        setLangState(detectLanguage());
      }
    } catch {
      setLangState(detectLanguage());
    }
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try { localStorage.setItem(LANG_KEY, next); } catch { /* ignore */ }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "fr" ? "en" : "fr");
  }, [lang, setLang]);

  const t = useCallback(
    (key: TranslationKey) => {
      const entry = TRANSLATIONS[key];
      if (!entry) return key;
      return entry[lang] ?? entry.fr;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, setLang, toggleLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      lang: "fr",
      setLang: () => {},
      toggleLang: () => {},
      t: (key: TranslationKey) => TRANSLATIONS[key]?.fr ?? key,
    };
  }
  return ctx;
}
