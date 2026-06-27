/**
 * Institutional macro indicator dataset for Chapter 1 — Lesson 1.2.
 * Mirrors the "Données Macro" command-center prototype: 11 key indicators,
 * each with a market-impact matrix and an above/below-consensus reaction.
 */

export type MacroCategory = "Croissance" | "Inflation" | "Emploi" | "Pol. Monétaire";
export type MacroTiming = "Lead" | "Lag" | "Coin";
export type ImpactLevel = "Très Fort" | "Fort" | "Modéré" | "Faible";
export type ValueTone = "bull" | "bear" | "neutral";

export interface MarketImpact {
  forex: ImpactLevel;
  equities: ImpactLevel;
  bonds: ImpactLevel;
  gold: ImpactLevel;
}

export interface MacroIndicator {
  id: string;
  code: string;
  name: string;
  cadence: string;
  category: MacroCategory;
  timing: MacroTiming;
  actual: string;
  consensus: string;
  unit: string;
  valueTone: ValueTone;
  description: string;
  impact: MarketImpact;
  /** Reaction when the release beats the consensus. */
  above: string;
  /** Reaction when the release misses the consensus. */
  below: string;
}

export const MACRO_INDICATORS: MacroIndicator[] = [
  {
    id: "gdp",
    code: "GDP",
    name: "PIB",
    cadence: "Trimestriel",
    category: "Croissance",
    timing: "Coin",
    actual: "3.3%",
    consensus: "2.6%",
    unit: "% annualisé",
    valueTone: "bull",
    description:
      "Produit Intérieur Brut : mesure agrégée de l'activité économique. Référence ultime de la croissance, mais publication retardée et révisée.",
    impact: { forex: "Fort", equities: "Très Fort", bonds: "Fort", gold: "Modéré" },
    above: "Croissance forte → confiance → actions ↑, USD ↑ (anticipation de taux)",
    below: "Croissance faible → crainte de récession → actions ↓, fuite vers les bons du Trésor",
  },
  {
    id: "cpi",
    code: "CPI",
    name: "Inflation CPI",
    cadence: "Mensuel",
    category: "Inflation",
    timing: "Lag",
    actual: "3.4%",
    consensus: "3.2%",
    unit: "% a/a",
    valueTone: "bear",
    description:
      "Indice des Prix à la Consommation : l'inflation vécue par les ménages. Donnée la plus surveillée pour anticiper la trajectoire des taux directeurs.",
    impact: { forex: "Très Fort", equities: "Très Fort", bonds: "Très Fort", gold: "Fort" },
    above: "Inflation chaude → FED hawkish → taux ↑ → USD ↑, actions ↓, obligations ↓",
    below: "Inflation qui ralentit → espoir de baisse des taux → actions ↑, obligations ↑",
  },
  {
    id: "ppi",
    code: "PPI",
    name: "Inflation PPI",
    cadence: "Mensuel",
    category: "Inflation",
    timing: "Lead",
    actual: "0.2%",
    consensus: "0.1%",
    unit: "% m/m",
    valueTone: "bear",
    description:
      "Indice des Prix à la Production : l'inflation au niveau des producteurs. Indicateur avancé du CPI — les hausses de coûts finissent par se répercuter sur les consommateurs.",
    impact: { forex: "Fort", equities: "Fort", bonds: "Fort", gold: "Modéré" },
    above: "Pressions de coûts → CPI futur ↑ → anticipations hawkish",
    below: "Désinflation des producteurs → soulagement sur les taux à venir",
  },
  {
    id: "rates",
    code: "RATES",
    name: "Taux d'Intérêt",
    cadence: "Par réunion FOMC/BCE",
    category: "Pol. Monétaire",
    timing: "Lag",
    actual: "5.25–5.50%",
    consensus: "Pause",
    unit: "fourchette cible",
    valueTone: "neutral",
    description:
      "Taux directeurs des banques centrales : le prix de l'argent. Le levier de politique monétaire le plus puissant — c'est le ton (dovish/hawkish) qui meut souvent plus que la décision elle-même.",
    impact: { forex: "Très Fort", equities: "Très Fort", bonds: "Très Fort", gold: "Très Fort" },
    above: "Hausse / ton hawkish → USD ↑, obligations ↓, actions sous pression",
    below: "Baisse / ton dovish → USD ↓, actions ↑, or ↑",
  },
  {
    id: "nfp",
    code: "NFP",
    name: "NFP / Chômage",
    cadence: "Mensuel (1er vendredi)",
    category: "Emploi",
    timing: "Lag",
    actual: "353K",
    consensus: "185K",
    unit: "K emplois",
    valueTone: "bull",
    description:
      "Créations d'emplois non-agricoles aux USA. Publication la plus volatile du calendrier économique. Impact immédiat sur l'USD.",
    impact: { forex: "Très Fort", equities: "Fort", bonds: "Fort", gold: "Modéré" },
    above: "Emploi fort → USD spike → FED hawkish",
    below: "Emploi faible → USD chute → FED dovish",
  },
  {
    id: "trade",
    code: "TRADE",
    name: "Balance Commerciale",
    cadence: "Mensuel",
    category: "Croissance",
    timing: "Lag",
    actual: "-$78.8B",
    consensus: "-$76.0B",
    unit: "Mds USD",
    valueTone: "bear",
    description:
      "Exportations moins importations. Un déficit qui se creuse pèse structurellement sur la devise ; un excédent la soutient.",
    impact: { forex: "Fort", equities: "Modéré", bonds: "Modéré", gold: "Faible" },
    above: "Déficit réduit / excédent → devise soutenue",
    below: "Déficit qui se creuse → pression baissière sur la devise",
  },
  {
    id: "pmi",
    code: "PMI",
    name: "Indices Confiance",
    cadence: "Mensuel",
    category: "Croissance",
    timing: "Lead",
    actual: "51.4",
    consensus: "50.8",
    unit: "indice (50 = neutre)",
    valueTone: "bull",
    description:
      "Purchasing Managers' Index : enquête auprès des directeurs d'achats. Au-dessus de 50 = expansion, en-dessous = contraction. Excellent indicateur avancé du cycle.",
    impact: { forex: "Fort", equities: "Fort", bonds: "Modéré", gold: "Modéré" },
    above: "Expansion confirmée → appétit pour le risque → actions ↑",
    below: "Contraction → aversion au risque → actifs défensifs",
  },
  {
    id: "retail",
    code: "RETAIL",
    name: "Ventes au Détail",
    cadence: "Mensuel",
    category: "Croissance",
    timing: "Coin",
    actual: "+0.6%",
    consensus: "+0.3%",
    unit: "% m/m",
    valueTone: "bull",
    description:
      "Dépenses de consommation au détail. La consommation pèse ~70% du PIB américain : un baromètre direct de la demande intérieure.",
    impact: { forex: "Fort", equities: "Fort", bonds: "Modéré", gold: "Faible" },
    above: "Consommateur résilient → croissance soutenue → actions ↑",
    below: "Consommation en berne → crainte de ralentissement",
  },
  {
    id: "ip",
    code: "IP",
    name: "Production Industrielle",
    cadence: "Mensuel",
    category: "Croissance",
    timing: "Coin",
    actual: "+0.1%",
    consensus: "+0.3%",
    unit: "% m/m",
    valueTone: "bull",
    description:
      "Volume de production des usines, mines et services publics. Coïncident du cycle industriel et sensible aux retournements manufacturiers.",
    impact: { forex: "Modéré", equities: "Modéré", bonds: "Modéré", gold: "Faible" },
    above: "Activité industrielle solide → cycle sain",
    below: "Ralentissement de la production → fragilité cyclique",
  },
  {
    id: "durables",
    code: "DURABLES",
    name: "Commandes Durables",
    cadence: "Mensuel",
    category: "Croissance",
    timing: "Lead",
    actual: "+0.7%",
    consensus: "-0.5%",
    unit: "% m/m",
    valueTone: "bull",
    description:
      "Commandes de biens à durée de vie > 3 ans (machines, avions, équipements). Signal avancé de l'investissement des entreprises.",
    impact: { forex: "Modéré", equities: "Fort", bonds: "Modéré", gold: "Faible" },
    above: "Investissement en hausse → confiance des entreprises",
    below: "Repli des commandes → prudence sur le capex",
  },
  {
    id: "ahe",
    code: "AHE",
    name: "Salaires (AHE)",
    cadence: "Mensuel (avec NFP)",
    category: "Emploi",
    timing: "Lag",
    actual: "+4.5%",
    consensus: "+4.1%",
    unit: "% a/a",
    valueTone: "bear",
    description:
      "Average Hourly Earnings : croissance des salaires horaires. Surveillée pour la spirale prix-salaires — des salaires chauds alimentent l'inflation.",
    impact: { forex: "Fort", equities: "Fort", bonds: "Fort", gold: "Modéré" },
    above: "Salaires chauds → inflation persistante → FED hawkish",
    below: "Salaires modérés → désinflation → soulagement sur les taux",
  },
];

export const MACRO_CATEGORIES: (MacroCategory | "Tous")[] = [
  "Tous",
  "Croissance",
  "Inflation",
  "Emploi",
  "Pol. Monétaire",
];
