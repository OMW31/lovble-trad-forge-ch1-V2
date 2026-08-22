// ============================================================================
// Namespace `widgetsMacro` (FR — source) : widgets macro-économiques du
// Chapitre 1 (Dashboard, laboratoires, simulateurs, cartographies).
// Une clé racine par composant, nommée en camelCase du nom du fichier.
// ============================================================================

export const widgetsMacroFr = {
  macroDashboard: {
    title: "Dashboard Macro Institutionnel",
    subtitle: "11 indicateurs clés — cliquez pour l'analyse institutionnelle complète.",
    badge: "Command Center",
    categoryLabels: {
      Tous: "Tous",
      Croissance: "Croissance",
      Inflation: "Inflation",
      Emploi: "Emploi",
      "Pol. Monétaire": "Pol. Monétaire",
    } as Record<string, string>,
    impactLevelLabels: {
      "Très Fort": "Très Fort",
      Fort: "Fort",
      Modéré: "Modéré",
      Faible: "Faible",
    } as Record<string, string>,
    indicators: {
      gdp: {
        name: "PIB",
        cadence: "Trimestriel",
        unit: "% annualisé",
        description:
          "Produit Intérieur Brut : mesure agrégée de l'activité économique. Référence ultime de la croissance, mais publication retardée et révisée.",
        above: "Croissance forte → confiance → actions ↑, USD ↑ (anticipation de taux)",
        below: "Croissance faible → crainte de récession → actions ↓, fuite vers les bons du Trésor",
      },
      cpi: {
        name: "Inflation CPI",
        cadence: "Mensuel",
        unit: "% a/a",
        description:
          "Indice des Prix à la Consommation : l'inflation vécue par les ménages. Donnée la plus surveillée pour anticiper la trajectoire des taux directeurs.",
        above: "Inflation chaude → FED hawkish → taux ↑ → USD ↑, actions ↓, obligations ↓",
        below: "Inflation qui ralentit → espoir de baisse des taux → actions ↑, obligations ↑",
      },
      ppi: {
        name: "Inflation PPI",
        cadence: "Mensuel",
        unit: "% m/m",
        description:
          "Indice des Prix à la Production : l'inflation au niveau des producteurs. Indicateur avancé du CPI — les hausses de coûts finissent par se répercuter sur les consommateurs.",
        above: "Pressions de coûts → CPI futur ↑ → anticipations hawkish",
        below: "Désinflation des producteurs → soulagement sur les taux à venir",
      },
      rates: {
        name: "Taux d'Intérêt",
        cadence: "Par réunion FOMC/BCE",
        unit: "fourchette cible",
        description:
          "Taux directeurs des banques centrales : le prix de l'argent. Le levier de politique monétaire le plus puissant — c'est le ton (dovish/hawkish) qui meut souvent plus que la décision elle-même.",
        above: "Hausse / ton hawkish → USD ↑, obligations ↓, actions sous pression",
        below: "Baisse / ton dovish → USD ↓, actions ↑, or ↑",
      },
      nfp: {
        name: "NFP / Chômage",
        cadence: "Mensuel (1er vendredi)",
        unit: "K emplois",
        description:
          "Créations d'emplois non-agricoles aux USA. Publication la plus volatile du calendrier économique. Impact immédiat sur l'USD.",
        above: "Emploi fort → USD spike → FED hawkish",
        below: "Emploi faible → USD chute → FED dovish",
      },
      trade: {
        name: "Balance Commerciale",
        cadence: "Mensuel",
        unit: "Mds USD",
        description:
          "Exportations moins importations. Un déficit qui se creuse pèse structurellement sur la devise ; un excédent la soutient.",
        above: "Déficit réduit / excédent → devise soutenue",
        below: "Déficit qui se creuse → pression baissière sur la devise",
      },
      pmi: {
        name: "Indices Confiance",
        cadence: "Mensuel",
        unit: "indice (50 = neutre)",
        description:
          "Purchasing Managers' Index : enquête auprès des directeurs d'achats. Au-dessus de 50 = expansion, en-dessous = contraction. Excellent indicateur avancé du cycle.",
        above: "Expansion confirmée → appétit pour le risque → actions ↑",
        below: "Contraction → aversion au risque → actifs défensifs",
      },
      retail: {
        name: "Ventes au Détail",
        cadence: "Mensuel",
        unit: "% m/m",
        description:
          "Dépenses de consommation au détail. La consommation pèse ~70% du PIB américain : un baromètre direct de la demande intérieure.",
        above: "Consommateur résilient → croissance soutenue → actions ↑",
        below: "Consommation en berne → crainte de ralentissement",
      },
      ip: {
        name: "Production Industrielle",
        cadence: "Mensuel",
        unit: "% m/m",
        description:
          "Volume de production des usines, mines et services publics. Coïncident du cycle industriel et sensible aux retournements manufacturiers.",
        above: "Activité industrielle solide → cycle sain",
        below: "Ralentissement de la production → fragilité cyclique",
      },
      durables: {
        name: "Commandes Durables",
        cadence: "Mensuel",
        unit: "% m/m",
        description:
          "Commandes de biens à durée de vie > 3 ans (machines, avions, équipements). Signal avancé de l'investissement des entreprises.",
        above: "Investissement en hausse → confiance des entreprises",
        below: "Repli des commandes → prudence sur le capex",
      },
      ahe: {
        name: "Salaires (AHE)",
        cadence: "Mensuel (avec NFP)",
        unit: "% a/a",
        description:
          "Average Hourly Earnings : croissance des salaires horaires. Surveillée pour la spirale prix-salaires — des salaires chauds alimentent l'inflation.",
        above: "Salaires chauds → inflation persistante → FED hawkish",
        below: "Salaires modérés → désinflation → soulagement sur les taux",
      },
    } as Record<string, { name: string; cadence: string; unit: string; description: string; above: string; below: string }>,
    impactSectionTitle: "Impact sur les marchés",
    aboveConsensus: "Supérieur aux attentes",
    belowConsensus: "Inférieur aux attentes",
    actualLabel: "Actuel",
    consensusLabel: "Consensus",
    unitLabel: "Unité",
    estPrefix: "est.",
    beatLegend: "beat",
    missLegend: "miss",
    legend: {
      lead: "Lead · avancé",
      coincident: "Coin · coïncident",
      lag: "Lag · retardé",
    },
    dialogFallbackTitle: "Indicateur",
  },

  macroIndicatorLab: {
    title: "Macro Indicator Lab",
    subtitle: "Classez les indicateurs, puis simulez une surprise et lisez l'impact sur la devise.",
    badge: "Interactif",
    categoryFilterLabel: "Catégorie",
    timingFilterLabel: "Temporalité",
    categories: {
      Tous: "Tous",
      Croissance: "Croissance",
      Inflation: "Inflation",
      "Politique monétaire": "Politique monétaire",
    } as Record<string, string>,
    timings: {
      Tous: "Tous",
      Avancé: "Avancé",
      Coïncident: "Coïncident",
      Retardé: "Retardé",
    } as Record<string, string>,
    indicators: {
      nfp: "NFP (emplois)",
      gdp: "PIB (annualisé)",
      cpi: "IPC (inflation)",
      retail: "Ventes au détail",
      pmi: "PMI manufacturier",
      unemp: "Taux de chômage",
      rate: "Décision de taux",
      confidence: "Confiance conso.",
    } as Record<string, string>,
    simulatorTitle: (name: string) => `Surprise Simulator — ${name}`,
    higherIsBullishHint: "↑ = devise ↑",
    higherIsBearishHint: "↑ = devise ↓",
    consensusLabel: "Consensus",
    publishedLabel: "Publié",
    surpriseLabel: "Surprise :",
    currencyUp: "Devise ↑",
    currencyDown: "Devise ↓",
    neutral: "Neutre",
  },

  macroRegimeRadar: {
    title: "Macro Radar — Régimes de Marché",
    subtitle: "Visualisez les 4 régimes macro institutionnels et leurs implications.",
    badge: "Vue radar",
    axes: {
      croissance: "Croissance",
      emploi: "Emploi",
      inflation: "Inflation",
      banquesCentrales: "Banques C.",
      liquidite: "Liquidité",
      sentiment: "Sentiment",
    },
    regimes: {
      goldilocks: {
        label: "Goldilocks",
        thesis: "Croissance forte + inflation maîtrisée + emploi plein → Régime Risk-On optimal.",
        longs: ["Long Equities", "Long Risk Currencies"],
        shorts: ["Short Gold", "Short Bonds"],
      },
      stagflation: {
        label: "Stagflation",
        thesis: "Croissance faible + inflation persistante → les banques centrales restent contraintes.",
        longs: ["Long Commodities", "Long Gold"],
        shorts: ["Short Bonds longs", "Short Equities cycliques"],
      },
      recession: {
        label: "Récession",
        thesis: "Contraction de l'activité → fuite vers la qualité et easing monétaire agressif.",
        longs: ["Long Bonds", "Long USD / Gold"],
        shorts: ["Short Equities", "Short Cyclicals"],
      },
      expansion: {
        label: "Expansion",
        thesis: "Reprise auto-entretenue → appétit pour le risque et rotation vers les cycliques.",
        longs: ["Long Cyclicals", "Long Credit"],
        shorts: ["Short Duration", "Short Défensives"],
      },
    },
    implicationsLabel: "Implications",
    footerNote:
      "Chaque configuration macro crée un régime de marché distinct — anticiper le régime, c'est anticiper l'allocation.",
  },

  macroRelationshipEngine: {
    title: "Macro Relationship Engine",
    subtitle: "Visualisez la chaîne de transmission entre données, taux et actifs.",
    badge: "Intermarket",
    shocks: {
      growthBeat: {
        label: "Growth beat",
        nodes: ["PIB ↑", "Taux attendus ↑", "USD ↑", "Equities qualité ↑", "Gold ↓"],
        thesis: "La croissance supérieure au consensus repousse l'assouplissement et soutient la devise domestique.",
      },
      inflationBeat: {
        label: "Inflation beat",
        nodes: ["IPC ↑", "Banque centrale hawkish", "Bonds ↓", "Devise ↑", "Actions duration ↓"],
        thesis: "La surprise inflation force un repricing des taux; le marché vend la duration et réévalue les multiples.",
      },
      riskOff: {
        label: "Risk-off",
        nodes: ["Volatilité ↑", "Liquidité USD ↑", "Carry ↓", "JPY/CHF ↑", "Commodities ↓"],
        thesis: "En stress systémique, la liquidité prime: les flux reviennent vers les devises refuges et actifs défensifs.",
      },
    },
  },

  marketDriverVisualizer: {
    title: "Market Driver Visualizer",
    subtitle: "Choisissez un moteur fondamental et suivez sa transmission jusqu'au prix.",
    badge: "Interactif",
    drivers: {
      rates: {
        label: "Taux d'intérêt ↑",
        chain: ["Taux directeurs ↑", "Rendements plus attractifs", "Afflux de capitaux étrangers", "Demande de devise ↑"],
        resultLabel: "Devise ↑",
        note: "Les anticipations de hausse comptent souvent plus que la hausse elle-même.",
      },
      growth: {
        label: "Croissance (PIB) ↑",
        chain: ["PIB > consensus", "Économie résiliente", "Marge pour des taux élevés", "Attrait des actifs ↑"],
        resultLabel: "Devise ↑",
        note: "Une croissance forte renforce la devise via l'investissement et le différentiel de taux.",
      },
      inflation: {
        label: "Inflation hors contrôle",
        chain: ["Prix ↑↑", "Pouvoir d'achat érodé", "Crédibilité monétaire ?", "Capitaux fuient"],
        resultLabel: "Devise ↓",
        note: "Inflation modérée = sain ; inflation incontrôlée sans réponse crédible = devise fragilisée.",
      },
      risk: {
        label: "Aversion au risque",
        chain: ["Panique de marché", "Fuite vers la qualité", "Ruée vers USD / refuges", "Devises risquées ↓"],
        resultLabel: "Devise risquée ↓",
        note: "En stress extrême, les investisseurs liquident le risque vers les actifs les plus liquides (USD).",
      },
      trade: {
        label: "Excédent commercial",
        chain: ["Exports > Imports", "Demande de devise nationale", "Balance positive", "Appréciation"],
        resultLabel: "Devise ↑",
        note: "Un excédent crée une demande structurelle pour la devise ; un déficit fait l'inverse.",
      },
    },
  },

  economicCycleWheel: {
    title: "Economic Cycle Wheel",
    subtitle: "Positionnez le cycle et lisez le régime d'actifs cohérent.",
    badge: "Cycle macro",
    phases: {
      Expansion: {
        label: "Expansion",
        policy: "Neutre → restrictive",
        assets: "Actions cycliques, crédit",
      },
      Pic: {
        label: "Pic",
        policy: "Restrictive",
        assets: "USD, énergie, duration courte",
      },
      Ralentissement: {
        label: "Ralentissement",
        policy: "Pause → easing",
        assets: "Qualité, obligations",
      },
      Récession: {
        label: "Récession",
        policy: "Easing agressif",
        assets: "Bonds, or, défensives",
      },
    } as Record<string, { label: string; policy: string; assets: string }>,
    regimeGaugeLabel: "RÉGIME",
    deskReadLabel: "Lecture desk",
    policyLabel: "Politique:",
    allocationLabel: "Allocation:",
    growthMetricLabel: "Croissance",
    inflationMetricLabel: "Inflation",
  },

  fedSimulator: {
    title: "FED Reaction Simulator",
    subtitle: "Ajustez inflation, emploi et chômage pour lire la fonction de réaction.",
    badge: "Rates",
    fomcReadLabel: "FOMC read",
    decisions: {
      hawkishHold: { label: "Hawkish hold", ratePath: "+25 bps risk", usd: "USD ↑" },
      dataDependentHold: { label: "Data-dependent hold", ratePath: "Higher for longer", usd: "USD ↔/↑" },
      dovishPivot: { label: "Dovish pivot", ratePath: "Cuts repriced", usd: "USD ↓" },
    },
    marketSummary: (ratePath: string, prob: number) => `Marché: ${ratePath} · confiance ${prob}%`,
    cpiLabel: "CPI YoY",
    nfpLabel: "NFP",
    unemploymentLabel: "Unemployment",
  },

  nfpInterpreter: {
    title: "NFP Calculator / Interpreter",
    subtitle: "Combinez créations d'emplois, salaires et chômage pour lire le signal Fed/FX.",
    badge: "NFP",
    reads: {
      laborHot: { label: "Labor hot", usd: "USD bullish", rates: "2Y yield ↑" },
      mixed: { label: "Mixed", usd: "USD choppy", rates: "Curve repricing" },
      laborCooling: { label: "Labor cooling", usd: "USD bearish", rates: "Cuts priced" },
    },
    jobsLabel: "Jobs created",
    wagesLabel: "Hourly earnings m/m",
    unemploymentLabel: "Unemployment",
    transmission: (rates: string) => `Transmission: ${rates} → différentiel de taux → devise.`,
  },

  gdpCpiInterpreters: {
    title: "GDP / CPI Interpreters",
    subtitle: "Croisez croissance et inflation pour qualifier le régime macro.",
    badge: "Regime map",
    regimes: {
      goldilocks: { label: "Goldilocks", asset: "Equities ↑ · USD mixed" },
      hotGrowth: { label: "Hot growth", asset: "Rates ↑ · USD ↑ · multiples sous pression" },
      stagflation: { label: "Stagflation", asset: "Risk assets ↓ · gold/commodities ↑" },
      disinflationSlowdown: { label: "Disinflation slowdown", asset: "Bonds ↑ · défensives ↑" },
    },
    gdpLabel: "GDP annualized",
    cpiLabel: "CPI YoY",
    highInflationHint: "Inflation haute",
    strongGrowthHint: "Croissance forte",
  },

  yieldCurveVisualizer: {
    title: "Yield Curve Visualizer",
    subtitle: "Pilotez front-end et long-end pour comprendre inversion, steepening et risque cycle.",
    badge: "Rates curve",
    regimeLabels: {
      inversion: "Inversion",
      steepening: "Steepening",
      normalization: "Normalisation",
    },
    spreadLabel: (spread: string) => `10Y-3M: ${spread}%`,
    note: "Une courbe inversée signale une politique restrictive et un risque de ralentissement futur.",
    frontEndLabel: "Front-end 3M",
    longEndLabel: "Long-end 10Y",
  },

  intermarketCorrelationMap: {
    title: "Intermarket Correlation Map",
    subtitle: "Comparez les réactions d'actifs selon le régime dominant.",
    badge: "Cross-asset",
    regimes: {
      disinflation: "Disinflation",
      inflation: "Inflation shock",
      stress: "Risk-off stress",
    },
    betaLabel: (value: string) => `${value} beta`,
  },

  candleReplay: {
    chartAriaLabel: (instrument: string) => `Graphique ${instrument}`,
    play: "Lire",
    pause: "Pause",
    playbackPositionAriaLabel: "Position de la lecture",
  },
};

export type WidgetsMacroDictionary = typeof widgetsMacroFr;
