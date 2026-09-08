// ============================================================================
// Namespace `widgetsCorp` (FR — source) : widgets Corporate / Valorisation /
// Prévisions du Chapitre 1 (Company Dashboard, DCF, Peer comparison, etc.).
// ============================================================================

export const widgetsCorpFr = {
  companyDashboard: {
    title: "Company Dashboard",
    subtitle: "Vue synthèse d’une entreprise: croissance, rentabilité, cash-flow et risque financier.",
    badge: "Micro",
    metrics: {
      revenueGrowth: "Croissance du chiffre d’affaires",
      grossMargin: "Marge brute",
      fcfMargin: "Marge de free cash flow",
      netDebtEbitda: "Dette nette / EBITDA",
    },
    diagnostic: "Diagnostic: croissance profitable, conversion cash forte, bilan peu levier. Profil quality compounder si la valorisation reste cohérente.",
  },

  companyHealthScore: {
    title: "Company Health Score",
    subtitle: "Modifiez les fondamentaux et observez la note de santé s'ajuster en temps réel.",
    factors: {
      growth: { label: "Croissance des ventes", hint: "Une croissance soutenue signale une demande forte et un avantage concurrentiel." },
      margin: { label: "Marge nette", hint: "La marge nette mesure la rentabilité finale après toutes charges." },
      roe: { label: "ROE (rentabilité capitaux)", hint: "Le ROE mesure le rendement généré sur les capitaux propres." },
      debt: { label: "Dette / Capitaux (D/E)", hint: "Un endettement élevé augmente le risque financier ; trop bas peut signaler un sous-investissement." },
      fcf: { label: "Free Cash Flow (% ventes)", hint: "Le FCF est le cash réellement disponible — le carburant d'une entreprise saine." },
    },
    grades: {
      excellent: "Excellente",
      solid: "Solide",
      correct: "Correcte",
      fragile: "Fragile",
      atRisk: "À risque",
    },
  },

  balanceSheetExplorer: {
    title: "Balance Sheet Explorer",
    subtitle: "Actif = Passif + Capitaux propres. Cliquez pour explorer chaque poste.",
    unit: "Md$",
    sections: {
      assets: "Actif (Assets)",
      liabilities: "Passif / Dettes (Liabilities)",
      equity: "Capitaux propres (Equity)",
    },
    items: {
      cash: "Trésorerie & équivalents",
      receivables: "Créances clients",
      inventory: "Stocks",
      fixedAssets: "Immobilisations",
      goodwill: "Goodwill & incorporels",
      payables: "Dettes fournisseurs",
      shortTermDebt: "Dette court terme",
      longTermDebt: "Dette long terme",
      capital: "Capital & primes",
      reserves: "Réserves & report",
    },
    tooltip: (label: string, value: number) => `${label} : ${value} Md$`,
    detailLine: (value: number, pct: number) => `${value} Md$ · ${pct}%`,
    balanceCheck: (assets: number, liab: number, equity: number) => `Équilibre du bilan : ${assets} = ${liab} + ${equity} ✓`,
  },

  financialRatios: {
    title: "Financial Ratios",
    subtitle: "Lisez les ratios selon trois prismes: qualité, value et risque.",
    modes: {
      quality: "Qualité",
      value: "Value",
      risk: "Risque",
    },
    rows: {
      pe: { metric: "P/E", reading: "28x", quality: "Neutre", value: "Cher vs marché", risk: "Multiple sensible aux taux" },
      roe: { metric: "ROE", reading: "31%", quality: "Excellent", value: "Justifie prime", risk: "Durabilité à vérifier" },
      de: { metric: "D/E", reading: "0.7x", quality: "Solide", value: "Bilan flexible", risk: "Risque dette faible" },
      fcfYield: { metric: "FCF yield", reading: "4.8%", quality: "Cash réel", value: "Correct", risk: "Protection partielle" },
    },
  },

  valuationLab: {
    title: "Valuation Lab",
    subtitle: "Manipulez les multiples de valorisation et comparez la juste valeur au prix de marché.",
    badge: "Interactif",
    stats: {
      price: "Prix",
      eps: "BPA",
      salesPerShare: "Ventes/action",
      ebitdaPerShare: "EBITDA/action",
    },
    sliders: {
      pe: "P/E (cours / bénéfice)",
      ps: "P/S (cours / ventes)",
      evEbitda: "EV/EBITDA",
    },
    methods: {
      pe: "Via P/E",
      ps: "Via P/S",
      evEbitda: "Via EV/EBITDA",
    },
    fairValueLabel: "Juste valeur estimée",
    verdicts: {
      undervalued: "Sous-évaluée",
      overvalued: "Surévaluée",
      fair: "Proche du juste prix",
    },
    vsPrice: "vs prix",
  },

  dcfSimulator: {
    title: "DCF Simulator",
    subtitle: "Actualisez les flux futurs et testez la sensibilité au WACC et à la croissance terminale.",
    badge: "Valeur intrinsèque",
    sliders: {
      growth: "Croissance du chiffre d'affaires",
      margin: "Marge de free cash flow",
      wacc: "WACC (coût moyen pondéré du capital)",
      terminal: "Croissance terminale",
    },
    enterpriseValueIndex: "Indice de valeur d'entreprise",
    verdicts: {
      robust: "Valeur robuste",
      severe: "Compression sévère",
      middle: "Zone médiane",
    },
    yearShort: (n: number) => `A${n}`,
  },

  peerComparisonMatrix: {
    title: "Peer Comparison Matrix",
    subtitle: "Comparez les leaders sur la métrique de votre choix.",
    badge: "Benchmark",
    metrics: {
      growth: "Croissance des ventes",
      margin: "Marge nette",
      roe: "ROE",
      pe: "P/E (valorisation)",
    },
    leader: "Leader",
    footnoteHigherBetter: "Sur cette métrique, plus c'est élevé, mieux c'est.",
    footnotePeLower: "Sur le P/E, un multiple plus bas peut traduire une valorisation plus prudente — à mettre en regard de la croissance.",
  },

  earningsImpactEngine: {
    title: "Earnings Impact Engine",
    subtitle: "BPA attendu vs publié + guidance → réaction estimée du cours.",
    badge: "Simulation",
    epsExpected: "BPA attendu",
    epsPublished: "BPA publié",
    surprise: (pct: string) => `surprise ${pct}%`,
    guidanceLabel: "Guidance (prévisions futures)",
    guidanceLevels: {
      strongCut: "Forte révision en baisse",
      cut: "Révision en baisse",
      confirmed: "Confirmée",
      raise: "Révision en hausse",
      strongRaise: "Forte révision en hausse",
    },
    reactionTitle: "Réaction estimée du cours",
    footnote: "Souvent, la guidance pèse plus lourd que le résultat publié : une bonne surprise assortie d'une guidance abaissée peut faire chuter le titre.",
  },

  forecastScenarioPlanner: {
    title: "Forecast Scenario Planner",
    subtitle: "Projetez le chiffre d'affaires sur 5 ans selon trois scénarios économiques.",
    badge: "Prévisions",
    scenarios: {
      bear: "Pessimiste",
      base: "Neutre",
      bull: "Optimiste",
    },
    perYear: (pct: number) => `+${pct}%/an`,
    yearShort: (n: number) => `A${n}`,
    revenueProjected: "CA projeté (A5)",
    cagr: "TCAC",
  },

  scenarioBuilder: {
    title: "Scenario Builder",
    subtitle: "Assemblez driver, actif, horizon et invalidation en scénario exploitable.",
    badge: "Decision",
    pickers: {
      driver: "Driver",
      asset: "Asset",
      horizon: "Horizon",
    },
    ticketLabel: "Scenario ticket",
    thesis: {
      ratesHigher: "taux attendus plus hauts",
      durationReprice: "duration reprice",
      safeHaven: "liquidité refuge",
    },
    direction: {
      conditional: "biais directionnel conditionnel",
      cautious: "biais prudent",
    },
    invalidation: "publication opposée au consensus + cassure du niveau de confirmation",
    sentence: (asset: string, driver: string, thesis: string, horizon: string, direction: string, invalidation: string) =>
      `Sur ${asset}, le driver ${driver} crée un régime de ${thesis} sur horizon ${horizon}. Décision: ${direction}. Invalidation: ${invalidation}.`,
  },

  primitives: {
    levelBadge: (level: number) => `Niveau ${level}`,
    visualLightbox: {
      expand: (title: string) => `Agrandir ${title}`,
      dialogDescription: "Visualisation agrandie du chapitre.",
    },
    visualExplainer: {
      reading: "Lecture",
    },
  },

  visualQuestion: {
    supportAlt: (visualId: string, widget: string) => `Support visuel ${visualId} — ${widget}`,
    evaluationFallback: "évaluation",
    supportLabel: (visualId: string) => `Support ${visualId}`,
  },
};

export type WidgetsCorpDictionary = typeof widgetsCorpFr;
