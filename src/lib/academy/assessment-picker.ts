// ============================================================================
// Assessment Picker (Sprint F-FINAL)
// ----------------------------------------------------------------------------
// Sélection pondérée par difficulté + rotation anti-répétition pour les
// évaluations de leçon (Partie A / Partie B). À chaque tentative, le moteur
// pioche 7 questions par partie : 2 (facile) + 2 (moyen) + 3 (difficile),
// en avançant un curseur de rotation (localStorage) pour ne pas rejouer les
// mêmes questions avant d'avoir parcouru le pool.
// ============================================================================

import type { EvaluationPart, EvaluationQuestion } from "./evaluation-bank";

export type Difficulty = 1 | 2 | 3;

export interface BankItem {
  id: string;
  difficulty: Difficulty;
  prompt: string;
  choices: { id: string; label: string }[];
  correctId: string;
  explanation: string;
  widget?: string;
  visualId?: string;
}

/** Distribution officielle : 2 faciles + 2 moyens + 3 difficiles = 7. */
export const DEFAULT_DISTRIBUTION: Record<Difficulty, number> = { 1: 2, 2: 2, 3: 3 };

export function distributionTotal(distribution: Record<Difficulty, number>): number {
  return distribution[1] + distribution[2] + distribution[3];
}

// -------- Rotation memory (localStorage, anti-répétition) --------------------

const ROTATION_KEY = "tradforge:assessment:rotation:v1";

function readRotation(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(ROTATION_KEY) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

function writeRotation(state: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ROTATION_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

/** Renvoie le curseur de rotation courant pour une clé puis l'avance. */
function bumpRotation(key: string): number {
  const state = readRotation();
  const current = state[key] ?? 0;
  state[key] = current + 1;
  writeRotation(state);
  return current;
}

/**
 * Pioche des items d'une banque selon la distribution de difficulté, avec
 * rotation. Si un niveau de difficulté est trop mince, on complète depuis les
 * items restants pour toujours atteindre le total visé.
 */
export function pickBankItems(
  items: BankItem[],
  rotationKey: string,
  options: { rotate?: boolean; distribution?: Record<Difficulty, number> } = {},
): BankItem[] {
  const distribution = options.distribution ?? DEFAULT_DISTRIBUTION;
  const target = Math.min(distributionTotal(distribution), items.length);
  const offset = options.rotate === false ? 0 : bumpRotation(rotationKey);

  const byDiff: Record<Difficulty, BankItem[]> = { 1: [], 2: [], 3: [] };
  for (const item of items) byDiff[item.difficulty].push(item);

  const picked: BankItem[] = [];
  const used = new Set<string>();

  ([1, 2, 3] as const).forEach((d) => {
    const bucket = byDiff[d];
    const n = distribution[d];
    if (bucket.length === 0) return;
    for (let k = 0; k < n; k++) {
      const idx = (offset * n + k) % bucket.length;
      const item = bucket[idx];
      if (!used.has(item.id)) {
        picked.push(item);
        used.add(item.id);
      }
    }
  });

  // Complète depuis les items restants (rotation-aware) si un niveau manquait.
  if (picked.length < target) {
    const rest = items.filter((i) => !used.has(i.id));
    let j = rest.length > 0 ? offset % rest.length : 0;
    let guard = 0;
    while (picked.length < target && rest.length > 0 && guard < rest.length) {
      const item = rest[j % rest.length];
      if (!used.has(item.id)) {
        picked.push(item);
        used.add(item.id);
      }
      j++;
      guard++;
    }
  }

  return picked;
}

/** Transforme un item de banque en question d'évaluation. */
export function toEvaluationQuestion(item: BankItem, part: EvaluationPart, idPrefix: string): EvaluationQuestion {
  return {
    id: `${idPrefix}-${item.id}`,
    part,
    prompt: item.prompt,
    choices: item.choices,
    correctId: item.correctId,
    explanation: item.explanation,
    widget: item.widget,
    visualId: item.visualId,
    difficulty: item.difficulty,
  };
}
