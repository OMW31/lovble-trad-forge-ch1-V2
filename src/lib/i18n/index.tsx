// ============================================================================
// TradForge i18n — architecture extensible à N langues.
// ----------------------------------------------------------------------------
// - FR = langue de référence, EN = adaptation éditoriale (registre CFA/FT).
// - La locale est persistée en localStorage et, si l'utilisateur est connecté,
//   synchronisée sur profiles.locale (colonne déjà existante). Priorité au
//   choix local le plus récent (localStorage) au montage ; toute écriture
//   ultérieure vers profiles.locale est best-effort et ne bloque jamais l'UI.
// - Les questions d'évaluation sont traduites côté base
//   (question_translations) via question-bank-loader.
// - Ajouter une langue = un fichier dans dictionaries/ + une entrée ici.
// ============================================================================

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { hydrateQuestionBanks } from "@/lib/academy/question-bank-loader";
import { supabase } from "@/integrations/supabase/client";

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

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "fr";
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Lecture après hydratation : évite tout mismatch SSR.
  // Priorité : localStorage (choix le plus récent de l'utilisateur sur cet
  // appareil) ; à défaut, si une session existe, profiles.locale.
  useEffect(() => {
    let cancelled = false;

    const applyStoredThenRemote = async () => {
      const stored = readStoredLocale();
      if (stored) {
        if (!cancelled) setLocaleState(stored);
        return;
      }

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user?.id;
        if (!userId || cancelled) return;
        const { data, error } = await supabase.from("profiles").select("locale").eq("id", userId).maybeSingle();
        if (error || cancelled) return;
        if (isLocale(data?.locale)) {
          setLocaleState(data.locale);
        }
      } catch {
        /* ignore — best effort, never block the UI */
      }
    };

    void applyStoredThenRemote();
    return () => {
      cancelled = true;
    };
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

    // Best-effort sync to the backend — never blocks or throws into the UI.
    void (async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user?.id;
        if (!userId) return;
        await supabase.from("profiles").update({ locale: next }).eq("id", userId);
      } catch {
        /* ignore — persistence to profiles.locale is a nice-to-have */
      }
    })();
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
