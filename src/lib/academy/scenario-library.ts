// Scenario Library — scenarios described as composable layers (not hard-coded content).
// A single ScenarioSpec produces multiple playable variants via the Difficulty Engine.
// See docs/ch1/Scenario-Library-Architecture.md.

import { CASE_STUDIES, type CaseStudy } from "@/lib/academy/market-data";

export type ScenarioDifficulty = "standard" | "high" | "premium";
export type ScenarioVolatility = "low" | "mid" | "high";

export interface ScenarioSpec {
  id: string;
  /** Human title. */
  title: string;
  /** Background narration. */
  context: string;
  /** Macro drivers, ordered by importance (first = primary). */
  macro: string[];
  /** Technical structure: supports / resistances / patterns. */
  technique: string[];
  geopolitique?: string[];
  intermarket?: string[];
  banquesCentrales?: string[];
  volatilite: ScenarioVolatility;
  difficulte: ScenarioDifficulty;
  /** Tunable engine params: candles, pauses, thresholds. */
  parametres: Record<string, number>;
  /** Optional link to an existing historical case for the candle replay. */
  caseId?: string;
}

/**
 * Base library. First source = existing historical CASE_STUDIES (never removed,
 * only referenced), enriched with layered descriptions the engine reveals
 * progressively by difficulty.
 */
export const SCENARIO_LIBRARY: ScenarioSpec[] = CASE_STUDIES.map((cs): ScenarioSpec => ({
  id: `spec-${cs.id}`,
  title: cs.title,
  context: cs.context,
  macro: cs.driver.split("·").map((d) => d.trim()).filter(Boolean),
  technique: ["Niveaux clés du contexte", "Structure de tendance dominante", "Zone d'invalidation"],
  geopolitique: cs.index % 3 === 0 ? ["Tensions commerciales", "Risque politique régional"] : undefined,
  intermarket: cs.index % 2 === 0 ? ["Corrélation DXY", "Flux obligataires", "Commodités liées"] : undefined,
  banquesCentrales: cs.driver.toLowerCase().includes("taux") || cs.driver.toLowerCase().includes("monétaire")
    ? ["Trajectoire des taux directeurs", "Guidance / dot plot"]
    : undefined,
  volatilite: cs.level >= 4 ? "high" : cs.level >= 3 ? "mid" : "low",
  difficulte: cs.level >= 4 ? "premium" : cs.level >= 3 ? "high" : "standard",
  parametres: { bougies: 60 + cs.level * 8, pauses: 1, seuilDecision: 70 },
  caseId: cs.id,
}));

export function getSpecById(id: string): ScenarioSpec | undefined {
  return SCENARIO_LIBRARY.find((s) => s.id === id);
}

export function getCaseForSpec(spec: ScenarioSpec): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.id === spec.caseId);
}
