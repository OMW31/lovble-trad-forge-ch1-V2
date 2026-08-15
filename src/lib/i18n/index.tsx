// ============================================================================
// TradForge i18n — architecture extensible à N langues.
// ----------------------------------------------------------------------------
// - FR = langue de référence, EN = adaptation éditoriale (registre CFA/FT).
// - La locale est persistée en localStorage et, si l'utilisateur est connecté,
//   synchronisée sur profiles.locale (colonne déjà existante).
// - Les questions d'évaluation sont traduites côté base
//   (question_translations) via question-bank-loader.
// - Ajouter une langue = un fichier dans dictionaries/ + une entrée ici.
// ============================================================================

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { hydrateQuestionBanks } from "@/lib/academy/question-bank-loader";

export type Locale = "fr" | "en";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
];

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

const STORAGE_KEY = "tradforge:locale";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nValue>({ locale: "fr", setLocale: () => {}, t: fr });

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "fr" ? stored : "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Lecture après hydratation : évite tout mismatch SSR.
  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== locale) setLocaleState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hydrateQuestionBanks(locale);
    if (typeof document !== "undefined") document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Raccourci : `const t = useT();` puis `t.nav.academy`. */
export function useT(): Dictionary {
  return useContext(I18nContext).t;
}
