/**
 * TradForge — Registre unique des assets visuels du Chapitre 1.
 *
 * Doctrine (cf. docs/ch1/VISUAL_INTEGRATION_STANDARD.md) :
 *  - V2  → cours, leçons, hero, immersion. Épurés, brandés, premium.
 *  - V1  → évaluations Partie B (densité pédagogique) + usage cours ponctuel.
 *  - BG  → fonds d'ambiance de section, jamais porteurs d'information.
 *
 * Aucun asset n'est supprimé : V1 et V2 coexistent, les questions Partie B
 * restent adossées aux identifiants V1 (a1 → a17).
 */

export type VisualVersion = "v1" | "v2" | "bg";

export type VisualAsset = {
  /** identifiant stable, jamais renommé (référencé par les banques de questions) */
  id: string;
  version: VisualVersion;
  src: string;
  /** leçon d'ancrage (id de LESSONS) ou "chapter" pour les usages transverses */
  lesson: string;
  /** ancre de section dans le chapitre */
  section?: string;
  /** rôle d'intégration */
  role: "figure" | "background" | "band" | "hero" | "brand";
  /** libellé court affiché sous le visuel */
  label: string;
  /** texte alternatif (FR de référence) */
  alt: string;
};

const V2 = "/academy/ch1/v2";
const V1 = "/academy/ch1/visuals";
const BG = "/academy/ch1/backgrounds";

/** ---------- V2 : cours & immersion ---------- */
export const V2_ASSETS = {
  macroDesk: {
    id: "v2-macro-command-desk",
    version: "v2",
    src: `${V2}/macro-command-desk.webp`,
    lesson: "chapter",
    role: "hero",
    label: "Global macro view",
    alt: "Poste d'analyse institutionnel affichant taux, actions, FX et matières premières",
  },
  brandLogo: {
    id: "v2-brand-logo",
    version: "v2",
    src: `${V2}/brand-logo.webp`,
    lesson: "chapter",
    role: "brand",
    label: "TradForge",
    alt: "Logo TradForge",
  },
  productionChain: {
    id: "v2-production-growth-currency-chain",
    version: "v2",
    src: `${V2}/production-growth-currency-chain.webp`,
    lesson: "macro",
    section: "macro-concept",
    role: "figure",
    label: "Production → croissance → capitaux → devise",
    alt: "Chaîne de transmission : production, croissance du PIB, flux de capitaux, appréciation de la devise",
  },
  realEconomy: {
    id: "v2-real-economy-global-value",
    version: "v2",
    src: `${V2}/real-economy-global-value.webp`,
    lesson: "intro",
    section: "intro-concept",
    role: "figure",
    label: "Économie réelle & valeur globale",
    alt: "Industrie, activité réelle et circulation de la valeur vers les marchés financiers mondiaux",
  },
  priceValueIceberg: {
    id: "v2-price-vs-value-iceberg",
    version: "v2",
    src: `${V2}/price-vs-value-iceberg.webp`,
    lesson: "intro",
    section: "intro-concept",
    role: "figure",
    label: "Prix visible, valeur immergée",
    alt: "Iceberg : le prix au-dessus de l'eau, sentiment, fondamentaux, valeur intrinsèque et réalité économique en dessous",
  },
  inflationRegimes: {
    id: "v2-global-inflation-regimes-timeline",
    version: "v2",
    src: `${V2}/global-inflation-regimes-timeline.webp`,
    lesson: "intro",
    section: "intro-regimes",
    role: "figure",
    label: "Régimes d'inflation — 1970 → aujourd'hui",
    alt: "Frise historique des régimes d'inflation mondiaux et des réponses de politique monétaire associées",
  },
  cycleWheel: {
    id: "v2-economic-cycle-wheel",
    version: "v2",
    src: `${V2}/economic-cycle-wheel.webp`,
    lesson: "macro",
    section: "macro-widgets",
    role: "figure",
    label: "Cycle économique",
    alt: "Roue du cycle économique : expansion, ralentissement, contraction, reprise",
  },
  cpiDrivers: {
    id: "v2-inflation-cpi-drivers",
    version: "v2",
    src: `${V2}/inflation-cpi-drivers.webp`,
    lesson: "macro",
    section: "macro-widgets",
    role: "figure",
    label: "Moteurs de l'IPC",
    alt: "Matières premières, salaires, prix à la consommation et réponse de la banque centrale autour de l'IPC",
  },
  centralBank: {
    id: "v2-central-bank-policy-room",
    version: "v2",
    src: `${V2}/central-bank-policy-room.webp`,
    lesson: "macro",
    section: "macro-widgets",
    role: "figure",
    label: "Salle de décision monétaire",
    alt: "Comité de politique monétaire : taux directeur, inflation, rendements souverains et flux de capitaux",
  },
  nfpRelease: {
    id: "v2-nfp-release-reaction",
    version: "v2",
    src: `${V2}/nfp-release-reaction.webp`,
    lesson: "macro",
    section: "macro-widgets",
    role: "figure",
    label: "Publication NFP",
    alt: "Publication des Non-Farm Payrolls et réaction institutionnelle sur les rendements et le dollar",
  },
  commoditiesFx: {
    id: "v2-commodities-currency-transmission",
    version: "v2",
    src: `${V2}/commodities-currency-transmission.webp`,
    lesson: "macro",
    section: "macro-widgets",
    role: "figure",
    label: "Matières premières → devises",
    alt: "Pétrole, or et cuivre transmettant leur impact aux anticipations d'inflation, aux rendements et aux devises",
  },
  tradeFlows: {
    id: "v2-global-trade-flows",
    version: "v2",
    src: `${V2}/global-trade-flows.webp`,
    lesson: "macro",
    section: "macro-lab",
    role: "figure",
    label: "Flux commerciaux mondiaux",
    alt: "Carte des flux commerciaux mondiaux et impact de la balance commerciale sur la valorisation des devises",
  },
  capitalMachine: {
    id: "v2-global-capital-flow-machine",
    version: "v2",
    src: `${V2}/global-capital-flow-machine.webp`,
    lesson: "outils",
    section: "outils-concept",
    role: "figure",
    label: "Machine à flux de capitaux",
    alt: "Moteur d'allocation : entrées macro d'un côté, sorties marché (devises, obligations, actions, matières premières) de l'autre",
  },
  energyChain: {
    id: "v2-energy-crisis-macro-chain",
    version: "v2",
    src: `${V2}/energy-crisis-macro-chain.webp`,
    lesson: "previsions",
    section: "previsions-concept",
    role: "figure",
    label: "Chaîne macro d'un choc énergétique",
    alt: "Chaîne complète : choc d'offre énergétique, coûts de production, inflation, réponse BCE, croissance et repricing de l'euro",
  },
} as const satisfies Record<string, VisualAsset>;

/** Visuels V2 dédiés aux cas pratiques (leçon 1.6) */
export const V2_CASE_ASSETS: Record<string, VisualAsset> = {
  "case-european-energy-crisis": {
    id: "v2-case-european-energy-crisis",
    version: "v2",
    src: `${V2}/case-european-energy-crisis.webp`,
    lesson: "cas-pratiques",
    role: "figure",
    label: "Crise énergétique européenne",
    alt: "Chaîne de transmission macroéconomique de la crise énergétique européenne",
  },
  "case-march-2020-liquidity": {
    id: "v2-case-march-2020-liquidity",
    version: "v2",
    src: `${V2}/case-march-2020-liquidity.webp`,
    lesson: "cas-pratiques",
    role: "figure",
    label: "Mars 2020 — crise de liquidité",
    alt: "Fuite vers la qualité de mars 2020 : actions, matières premières, crédit, dollar, or et VIX",
  },
  "case-turkish-lira-collapse": {
    id: "v2-case-turkish-lira-collapse",
    version: "v2",
    src: `${V2}/case-turkish-lira-collapse.webp`,
    lesson: "cas-pratiques",
    role: "figure",
    label: "Effondrement de la livre turque",
    alt: "Chaîne d'échec macroéconomique de la livre turque : inflation, taux réels négatifs, fuite des capitaux",
  },
  "case-brexit-shock": {
    id: "v2-case-brexit-shock",
    version: "v2",
    src: `${V2}/case-brexit-shock.webp`,
    lesson: "cas-pratiques",
    role: "figure",
    label: "Choc Brexit",
    alt: "Du choc politique du Brexit à la réalité de marché : incertitude, réallocation, faiblesse du sterling",
  },
  "case-election-volatility": {
    id: "v2-case-election-volatility",
    version: "v2",
    src: `${V2}/case-election-volatility.webp`,
    lesson: "cas-pratiques",
    role: "figure",
    label: "Volatilité électorale",
    alt: "Scénarios politiques, transmission au marché et trajectoires de résultats possibles",
  },
};

/**
 * Correspondance cas historique (market-data) → visuel V2 dédié.
 * Les cas sans V2 propre retombent proprement sur `undefined` : le
 * ScenarioPlayer affiche alors sa composition native sans image.
 */
const CASE_VISUAL_BY_CASE_ID: Record<string, string> = {
  "ch1-energy-crisis-eu-2022": "case-european-energy-crisis",
  "ch1-covid-march-2020": "case-march-2020-liquidity",
  "ch1-try-depreciation-2021-2024": "case-turkish-lira-collapse",
  "ch1-brexit-2016": "case-brexit-shock",
  "ch1-us-election-2016": "case-election-volatility",
};

export function caseVisualFor(caseId?: string): VisualAsset | undefined {
  if (!caseId) return undefined;
  const key = CASE_VISUAL_BY_CASE_ID[caseId];
  return key ? V2_CASE_ASSETS[key] : undefined;
}

/** ---------- Backgrounds d'ambiance ---------- */

export const BACKGROUNDS = {
  chapterHero: `${BG}/bg1.webp`,
  macro: `${BG}/bg2.webp`,
  micro: `${BG}/bg3.webp`,
  outils: `${BG}/bg4.webp`,
  previsions: `${BG}/bg5.webp`,
} as const;

/** ---------- V1 : conservés pour les évaluations Partie B ---------- */
export const V1_SRC = (id: string) => `${V1}/${id}.webp`;
export const V1_IDS = Array.from({ length: 17 }, (_, i) => `a${i + 1}`);

/**
 * Fabrique un VisualAsset à partir d'un identifiant V1 (a1 → a17).
 * Les V1 restent la référence des questions Partie B : l'id n'est jamais renommé.
 */
export function v1Asset(
  id: string,
  label: string,
  alt: string,
  opts: { lesson?: string; section?: string } = {},
): VisualAsset {
  return {
    id,
    version: "v1",
    src: V1_SRC(id),
    lesson: opts.lesson ?? "chapter",
    ...(opts.section ? { section: opts.section } : {}),
    role: "figure",
    label,
    alt,
  };
}
