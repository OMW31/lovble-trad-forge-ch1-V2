// Difficulty Engine — decides how many information layers a scenario reveals.
// Standard → few layers, High → more context, Premium → full institutional view.
// See docs/ch1/Difficulty-Scaling-Engine.md.

import type { ScenarioDifficulty, ScenarioSpec } from "@/lib/academy/scenario-library";

export interface RevealedLayers {
  context: string;
  macro: string[];
  technique: string[];
  geopolitique: string[];
  intermarket: string[];
  banquesCentrales: string[];
  /** How strongly answer hints are surfaced (higher = easier). */
  hintStrength: "high" | "mid" | "low";
}

const RULES: Record<ScenarioDifficulty, {
  macro: number;
  technique: number;
  geo: number;
  inter: number;
  banks: number;
  hint: RevealedLayers["hintStrength"];
}> = {
  standard: { macro: 1, technique: 1, geo: 0, inter: 0, banks: 0, hint: "high" },
  high: { macro: 3, technique: 2, geo: 1, inter: 1, banks: 1, hint: "mid" },
  premium: { macro: 99, technique: 99, geo: 99, inter: 99, banks: 99, hint: "low" },
};

const take = (arr: string[] | undefined, n: number) => (arr ?? []).slice(0, n);

/** Filter a full spec down to the layers visible at the requested level. */
export function revealLayers(spec: ScenarioSpec, level: ScenarioDifficulty): RevealedLayers {
  const rule = RULES[level];
  return {
    context: spec.context,
    macro: take(spec.macro, rule.macro),
    technique: take(spec.technique, rule.technique),
    geopolitique: take(spec.geopolitique, rule.geo),
    intermarket: take(spec.intermarket, rule.inter),
    banquesCentrales: take(spec.banquesCentrales, rule.banks),
    hintStrength: rule.hint,
  };
}

/** Adaptive pass threshold + point weighting per level. */
export function difficultyBarem(level: ScenarioDifficulty) {
  return {
    passThreshold: 70,
    weight: level === "premium" ? 1.5 : level === "high" ? 1.2 : 1,
  };
}
