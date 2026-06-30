export interface LessonSubsection {
  id: string;
  label: string;
}

export interface LessonMiniHero {
  /** e.g. "Standard → High" — progression tier shown top-right of the mini hero. */
  tier: string;
  /** Reading time label, e.g. "25 min". */
  duration: string;
  /** Pedagogical flow chips (Concept → … → Feedback). */
  steps: string[];
  /** Learning objectives shown in the mission briefing block. */
  objectives: string[];
  /** The single "key question" the learner can answer after the lesson. */
  keyQuestion: string;
}

export interface LessonMeta {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  level: number;
  /** Sub-sections used by the sidebar accordion + precise progress tracking. */
  subsections: LessonSubsection[];
  /** Mini hero shown at the top of the lesson (absent for the intro lesson). */
  miniHero?: LessonMiniHero;
}

export const CHAPTER = {
  id: "analyse-fondamentale",
  num: "Chapitre 01",
  title: "Analyse Fondamentale",
  tagline: "Voir · Manipuler · Décider · Comprendre",
  description:
    "Le laboratoire interactif qui transforme la théorie en intuition. Pilotez un environnement d'analyse macro et micro-économique de niveau institutionnel.",
};

export const LESSONS: LessonMeta[] = [
  {
    id: "intro",
    num: "1.1",
    title: "Introduction & Définition",
    subtitle: "Valeur intrinsèque, efficience, retour à la moyenne",
    level: 1,
    subsections: [
      { id: "intro-regimes", label: "Les 4 régimes macro" },
      { id: "intro-concept", label: "Concept & définition" },
      { id: "intro-illustration", label: "Illustration interactive" },
      { id: "intro-scenario", label: "Scénario d'application" },
    ],
  },
  {
    id: "macro",
    num: "1.2",
    title: "Données Macroéconomiques",
    subtitle: "Indicateurs, catégorisation, temporalité",
    level: 2,
    miniHero: {
      tier: "Standard → High",
      duration: "25 min",
      steps: ["Concept", "Illustration", "Widget", "Scénario", "Décision", "Feedback"],
      objectives: [
        "Maîtriser les 11 indicateurs macro institutionnels et leur impact sur les marchés",
        "Calculer et interpréter une surprise NFP (réel vs consensus)",
        "Lire la transmission d'un choc inflationniste sur currencies, bonds et equities",
        "Analyser des événements macro réels : NFP Jan 2024, PIB Q4 2023, Trade Wars",
      ],
      keyQuestion: "« Comment un seul chiffre de 8h30 peut-il déplacer 100+ pips sur l'EUR/USD en 30 secondes ? »",
    },
    subsections: [
      { id: "macro-concept", label: "Concept & temporalité" },
      { id: "macro-dashboard", label: "Command center — 11 indicateurs" },
      { id: "macro-widgets", label: "Widgets macro avancés" },
      { id: "macro-lab", label: "Laboratoire de surprise" },
      { id: "macro-cas", label: "Cas historiques" },
    ],
  },
  {
    id: "micro",
    num: "1.3",
    title: "Données Microéconomiques",
    subtitle: "États financiers, marges, dette, cash-flow",
    level: 3,
    miniHero: {
      tier: "High",
      duration: "20 min",
      steps: ["Concept", "États financiers", "Widget", "Scénario", "Décision", "Feedback"],
      objectives: [
        "Décoder un compte de résultat, un bilan et un tableau de flux de trésorerie",
        "Mesurer rentabilité (ROE/ROA), endettement (D/E) et génération de cash",
        "Évaluer la santé financière d'une entreprise via un score synthétique",
        "Relier les fondamentaux micro à la réaction du cours de bourse",
      ],
      keyQuestion: "« Pourquoi une entreprise rentable peut-elle faire faillite par manque de cash ? »",
    },
    subsections: [
      { id: "micro-concept", label: "Concept & états financiers" },
      { id: "micro-widgets", label: "Pilotez les fondamentaux" },
      { id: "micro-cas", label: "Cas historiques" },
    ],
  },
  {
    id: "outils",
    num: "1.4",
    title: "Outils d'Analyse",
    subtitle: "Ratios, DCF, sectoriel, peer, SWOT",
    level: 4,
    miniHero: {
      tier: "High → Premium",
      duration: "25 min",
      steps: ["Concept", "Boîte à outils", "Widget", "Scénario", "Décision", "Feedback"],
      objectives: [
        "Lire et comparer les multiples (P/E, P/B, D/E, ROE) dans leur contexte",
        "Construire une valorisation DCF et tester sa sensibilité",
        "Comparer une entreprise à ses pairs et son secteur",
        "Anticiper l'impact d'une publication de résultats sur la valorisation",
      ],
      keyQuestion: "« Un P/E de 40 est-il cher ? La réponse dépend de quoi exactement ? »",
    },
    subsections: [
      { id: "outils-concept", label: "Concept & méthodes" },
      { id: "outils-widgets", label: "Boîte à outils interactive" },
      { id: "outils-cas", label: "Cas historiques" },
    ],
  },
  {
    id: "previsions",
    num: "1.5",
    title: "Prévisions Financières",
    subtitle: "Tendances, scénarios, guidance",
    level: 5,
    miniHero: {
      tier: "Premium",
      duration: "20 min",
      steps: ["Concept", "Scénarios", "Widget", "Décision", "Feedback"],
      objectives: [
        "Projeter à partir de tendances historiques et de scénarios pondérés",
        "Comprendre pourquoi la guidance pèse plus que le dernier résultat",
        "Construire une thèse optimiste / neutre / pessimiste cohérente",
        "Transformer une prévision en décision d'allocation",
      ],
      keyQuestion: "« Pourquoi une entreprise qui bat le consensus peut-elle chuter de 10 % ? »",
    },
    subsections: [
      { id: "previsions-concept", label: "Concept & guidance" },
      { id: "previsions-planner", label: "Planificateur de scénarios" },
      { id: "previsions-cas", label: "Cas historiques" },
    ],
  },
  {
    id: "cas-pratiques",
    num: "1.6",
    title: "Exemples Pratiques",
    subtitle: "10 cas historiques rejouables",
    level: 5,
    subsections: [{ id: "cas-pratiques-index", label: "Index des cas" }],
  },
];
