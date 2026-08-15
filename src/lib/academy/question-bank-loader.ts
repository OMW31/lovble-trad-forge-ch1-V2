// ============================================================================
// Question Bank Loader — banque en base + fallback TypeScript
// ----------------------------------------------------------------------------
// La banque de référence vit désormais dans Lovable Cloud
// (question_bank_part_a / question_bank_part_b / question_translations).
// Les banques TypeScript restent en place comme filet de sécurité : si la base
// est injoignable ou vide, l'évaluation fonctionne exactement comme avant.
// Le moteur de piochage (assessment-picker) est inchangé et 100 % déterministe.
// ============================================================================

import { supabase } from "@/integrations/supabase/client";
import type { BankItem, Difficulty } from "./assessment-picker";
import { PART_A_BANK } from "./part-a-bank";
import { PART_B_BANK } from "./part-b-bank";
import type { CoreLessonId } from "./evaluation-bank";

type Bank = Record<CoreLessonId, BankItem[]>;

const EMPTY: Bank = { intro: [], macro: [], micro: [], outils: [], previsions: [] };

/** Cache runtime alimenté par la base ; vide = on sert le fallback TS. */
const remote: { a: Bank; b: Bank; locale: string; loaded: boolean } = {
  a: { ...EMPTY },
  b: { ...EMPTY },
  locale: "fr",
  loaded: false,
};

export function getPartABank(lesson: CoreLessonId): BankItem[] {
  const rows = remote.loaded ? remote.a[lesson] : [];
  return rows.length > 0 ? rows : PART_A_BANK[lesson];
}

export function getPartBBank(lesson: CoreLessonId): BankItem[] {
  const rows = remote.loaded ? remote.b[lesson] : [];
  return rows.length > 0 ? rows : PART_B_BANK[lesson];
}

export function isRemoteBankLoaded() {
  return remote.loaded;
}

type Row = {
  question_key: string;
  lesson_id: string;
  difficulty: number;
  prompt: string;
  choices: { id: string; label: string }[];
  correct_id: string;
  explanation: string;
  widget?: string | null;
  visual_id?: string | null;
};

type TranslationRow = {
  question_key: string;
  part: "A" | "B";
  prompt: string;
  choices: { id: string; label: string }[];
  explanation: string;
};

function toItem(row: Row, tr?: TranslationRow): BankItem {
  return {
    id: row.question_key,
    difficulty: Math.min(3, Math.max(1, row.difficulty)) as Difficulty,
    prompt: tr?.prompt ?? row.prompt,
    choices: tr?.choices?.length ? tr.choices : row.choices,
    correctId: row.correct_id,
    explanation: tr?.explanation || row.explanation,
    ...(row.widget ? { widget: row.widget } : {}),
    ...(row.visual_id ? { visualId: row.visual_id } : {}),
  };
}

function group(rows: Row[], translations: Map<string, TranslationRow>, part: "A" | "B"): Bank {
  const bank: Bank = { intro: [], macro: [], micro: [], outils: [], previsions: [] };
  for (const row of rows) {
    const lesson = row.lesson_id as CoreLessonId;
    if (!(lesson in bank)) continue;
    bank[lesson].push(toItem(row, translations.get(`${part}:${row.question_key}`)));
  }
  return bank;
}

let inflight: Promise<void> | null = null;

/**
 * Hydrate la banque depuis la base pour une locale donnée.
 * Idempotent, silencieux en cas d'échec (le fallback TS prend le relais).
 */
export function hydrateQuestionBanks(locale = "fr"): Promise<void> {
  if (remote.loaded && remote.locale === locale) return Promise.resolve();
  if (inflight && remote.locale === locale) return inflight;
  remote.locale = locale;

  inflight = (async () => {
    try {
      const [a, b, tr] = await Promise.all([
        supabase.from("question_bank_part_a").select("*").eq("is_active", true),
        supabase.from("question_bank_part_b").select("*").eq("is_active", true),
        locale === "fr"
          ? Promise.resolve({ data: [] as TranslationRow[], error: null })
          : supabase.from("question_translations").select("*").eq("locale", locale),
      ]);

      if (a.error || b.error) return;

      const translations = new Map<string, TranslationRow>();
      for (const row of ((tr as { data: TranslationRow[] | null }).data ?? [])) {
        translations.set(`${row.part}:${row.question_key}`, row);
      }

      remote.a = group((a.data ?? []) as unknown as Row[], translations, "A");
      remote.b = group((b.data ?? []) as unknown as Row[], translations, "B");
      remote.loaded = true;
    } catch {
      /* fallback TS */
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
