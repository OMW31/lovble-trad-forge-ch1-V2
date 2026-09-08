// ============================================================================
// EN overrides for scenario layer descriptions.
// The scenario library builds specs from CASE_STUDIES; the structural fields
// (id, difficulty, volatility, params) never change. Only the layer text
// arrays and the per-scenario context/title need translation — title and
// context come from CASE_STUDIES_EN, layer text comes from here.
// ============================================================================

export const SCENARIO_LAYERS_EN = {
  technique: ["Key context levels", "Dominant trend structure", "Invalidation zone"],
  geopolitiqueEven: ["Trade tensions", "Regional political risk"],
  intermarketEven: ["DXY correlation", "Bond flows", "Linked commodities"],
  centralBanks: ["Policy rate trajectory", "Guidance / dot plot"],
} as const;

export function getTechniqueLayers(): string[] {
  return [...SCENARIO_LAYERS_EN.technique];
}

export function getGeopolitiqueLayers(): string[] {
  return [...SCENARIO_LAYERS_EN.geopolitiqueEven];
}

export function getIntermarketLayers(): string[] {
  return [...SCENARIO_LAYERS_EN.intermarketEven];
}

export function getCentralBanksLayers(): string[] {
  return [...SCENARIO_LAYERS_EN.centralBanks];
}
