// Scenario Engine — assembles a playable scenario from a spec, in two modes.
// Learning: continuous narration, all revealed layers visible.
// Evaluation: pedagogical pause → question → answer → feedback → resume → debrief.
// See docs/ch1/TradingView-Scenarisee-World-Class.md.

import {
  SCENARIO_LIBRARY,
  getCaseForSpec,
  type ScenarioDifficulty,
  type ScenarioSpec,
} from "@/lib/academy/scenario-library";
import { revealLayers, difficultyBarem, type RevealedLayers } from "@/lib/academy/difficulty-engine";
import type { CaseStudy } from "@/lib/academy/market-data";

export type ScenarioMode = "learning" | "evaluation";

export interface PlayableScenario {
  spec: ScenarioSpec;
  mode: ScenarioMode;
  level: ScenarioDifficulty;
  layers: RevealedLayers;
  caseStudy?: CaseStudy;
  barem: ReturnType<typeof difficultyBarem>;
}

/** Build a ready-to-render scenario from a spec at a given level and mode. */
export function assembleScenario(
  spec: ScenarioSpec,
  level: ScenarioDifficulty,
  mode: ScenarioMode,
  caseStudies?: CaseStudy[],
): PlayableScenario {
  const findCase = caseStudies
    ? caseStudies.find((c) => c.id === spec.caseId)
    : getCaseForSpec(spec);
  return {
    spec,
    mode,
    level,
    layers: revealLayers(spec, level),
    caseStudy: findCase,
    barem: difficultyBarem(level),
  };
}

/**
 * Random Selection Engine — avoids replaying the exact same spec back-to-back.
 * `exclude` holds recently played spec ids.
 */
export function pickScenario(
  level: ScenarioDifficulty,
  exclude: string[] = [],
): ScenarioSpec | undefined {
  const pool = SCENARIO_LIBRARY.filter((s) => s.difficulte === level);
  const fresh = pool.filter((s) => !exclude.includes(s.id));
  const candidates = fresh.length > 0 ? fresh : pool;
  if (candidates.length === 0) return undefined;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Convenience: a full playable scenario for a level (learning by default). */
export function nextScenario(
  level: ScenarioDifficulty,
  mode: ScenarioMode = "learning",
  exclude: string[] = [],
): PlayableScenario | undefined {
  const spec = pickScenario(level, exclude);
  if (!spec) return undefined;
  return assembleScenario(spec, level, mode);
}
