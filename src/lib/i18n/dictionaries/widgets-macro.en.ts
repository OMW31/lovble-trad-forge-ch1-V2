// ============================================================================
// Namespace `widgetsMacro` (EN — editorial adaptation, CFA/FT register).
// Mirrors widgets-macro.fr.ts key-for-key. Never a literal translation.
// ============================================================================

import type { WidgetsMacroDictionary } from "./widgets-macro.fr";

export const widgetsMacroEn: WidgetsMacroDictionary = {
  macroDashboard: {
    title: "Institutional Macro Dashboard",
    subtitle: "11 key indicators — click through for the full institutional read.",
    badge: "Command Center",
    categoryLabels: {
      Tous: "All",
      Croissance: "Growth",
      Inflation: "Inflation",
      Emploi: "Employment",
      "Pol. Monétaire": "Monetary Policy",
    },
    impactLevelLabels: {
      "Très Fort": "Very Strong",
      Fort: "Strong",
      Modéré: "Moderate",
      Faible: "Weak",
    },
    indicators: {
      gdp: {
        name: "GDP",
        cadence: "Quarterly",
        unit: "% annualized",
        description:
          "Gross Domestic Product: the broadest gauge of economic output. The ultimate growth benchmark, though released with a lag and subject to revisions.",
        above: "Strong growth → confidence → equities up, USD up (rate-hike repricing)",
        below: "Weak growth → recession fears → equities down, flight to Treasuries",
      },
      cpi: {
        name: "CPI Inflation",
        cadence: "Monthly",
        unit: "% y/y",
        description:
          "Consumer Price Index: the inflation households actually feel. The most closely watched print for anticipating the path of policy rates.",
        above: "Hot inflation → hawkish Fed → rates up → USD up, equities down, bonds down",
        below: "Cooling inflation → rate-cut hopes → equities up, bonds up",
      },
      ppi: {
        name: "PPI Inflation",
        cadence: "Monthly",
        unit: "% m/m",
        description:
          "Producer Price Index: inflation at the factory-gate level. A leading indicator for CPI — cost pressures eventually pass through to consumers.",
        above: "Cost pressures build → CPI risk skewed higher → hawkish repricing",
        below: "Producer-level disinflation → relief on the rate outlook",
      },
      rates: {
        name: "Interest Rates",
        cadence: "Per FOMC/ECB meeting",
        unit: "target range",
        description:
          "Central bank policy rates: the price of money. The most powerful lever in macro — the tone (dovish/hawkish) often moves markets more than the decision itself.",
        above: "Hike / hawkish tone → USD up, bonds down, equities under pressure",
        below: "Cut / dovish tone → USD down, equities up, gold up",
      },
      nfp: {
        name: "NFP / Unemployment",
        cadence: "Monthly (first Friday)",
        unit: "K jobs",
        description:
          "US Non-Farm Payrolls: net job creation. The most volatile release on the economic calendar, with an immediate impact on the dollar.",
        above: "Strong hiring → USD spikes → hawkish Fed repricing",
        below: "Weak hiring → USD sells off → dovish Fed repricing",
      },
      trade: {
        name: "Trade Balance",
        cadence: "Monthly",
        unit: "USD bn",
        description:
          "Exports minus imports. A widening deficit is a structural drag on the currency; a surplus is structurally supportive.",
        above: "Narrowing deficit / surplus → currency supported",
        below: "Widening deficit → bearish pressure on the currency",
      },
      pmi: {
        name: "Confidence Indices",
        cadence: "Monthly",
        unit: "index (50 = neutral)",
        description:
          "Purchasing Managers' Index: a survey of purchasing executives. Above 50 signals expansion, below 50 contraction. An excellent leading indicator of the cycle.",
        above: "Confirmed expansion → risk appetite builds → equities up",
        below: "Contraction → risk aversion → rotation into defensives",
      },
      retail: {
        name: "Retail Sales",
        cadence: "Monthly",
        unit: "% m/m",
        description:
          "Household retail spending. Consumption drives roughly 70% of US GDP — a direct barometer of domestic demand.",
        above: "Resilient consumer → growth stays supported → equities up",
        below: "Soft spending → slowdown concerns build",
      },
      ip: {
        name: "Industrial Production",
        cadence: "Monthly",
        unit: "% m/m",
        description:
          "Output volume from factories, mines and utilities. A coincident read on the manufacturing cycle, sensitive to industrial turning points.",
        above: "Solid industrial activity → healthy cycle",
        below: "Slowing output → cyclical fragility",
      },
      durables: {
        name: "Durable Goods Orders",
        cadence: "Monthly",
        unit: "% m/m",
        description:
          "Orders for goods with a useful life over 3 years (machinery, aircraft, equipment). A leading signal for corporate capex.",
        above: "Rising investment → corporate confidence intact",
        below: "Orders retreat → caution on capex spending",
      },
      ahe: {
        name: "Wages (AHE)",
        cadence: "Monthly (with NFP)",
        unit: "% y/y",
        description:
          "Average Hourly Earnings: wage growth. Watched for wage-price spiral risk — hot wages feed persistent inflation.",
        above: "Hot wages → sticky inflation → hawkish Fed",
        below: "Moderating wages → disinflation → relief on rates",
      },
    },
    impactSectionTitle: "Market impact",
    aboveConsensus: "Above consensus",
    belowConsensus: "Below consensus",
    actualLabel: "Actual",
    consensusLabel: "Consensus",
    unitLabel: "Unit",
    estPrefix: "est.",
    beatLegend: "beat",
    missLegend: "miss",
    legend: {
      lead: "Lead · leading",
      coincident: "Coin · coincident",
      lag: "Lag · lagging",
    },
    dialogFallbackTitle: "Indicator",
  },

  macroIndicatorLab: {
    title: "Macro Indicator Lab",
    subtitle: "Sort the indicators, then simulate a surprise and read the FX impact.",
    badge: "Interactive",
    categoryFilterLabel: "Category",
    timingFilterLabel: "Timing",
    categories: {
      Tous: "All",
      Croissance: "Growth",
      Inflation: "Inflation",
      "Politique monétaire": "Monetary policy",
    },
    timings: {
      Tous: "All",
      Avancé: "Leading",
      Coïncident: "Coincident",
      Retardé: "Lagging",
    },
    indicators: {
      nfp: "NFP (payrolls)",
      gdp: "GDP (annualized)",
      cpi: "CPI (inflation)",
      retail: "Retail sales",
      pmi: "Manufacturing PMI",
      unemp: "Unemployment rate",
      rate: "Rate decision",
      confidence: "Consumer confidence",
    },
    simulatorTitle: (name: string) => `Surprise Simulator — ${name}`,
    higherIsBullishHint: "↑ = currency up",
    higherIsBearishHint: "↑ = currency down",
    consensusLabel: "Consensus",
    publishedLabel: "Actual",
    surpriseLabel: "Surprise:",
    currencyUp: "Currency ↑",
    currencyDown: "Currency ↓",
    neutral: "Neutral",
  },

  macroRegimeRadar: {
    title: "Macro Radar — Market Regimes",
    subtitle: "Visualize the four institutional macro regimes and their implications.",
    badge: "Radar view",
    axes: {
      croissance: "Growth",
      emploi: "Employment",
      inflation: "Inflation",
      banquesCentrales: "Central Banks",
      liquidite: "Liquidity",
      sentiment: "Sentiment",
    },
    regimes: {
      goldilocks: {
        label: "Goldilocks",
        thesis: "Strong growth + contained inflation + full employment → the optimal risk-on regime.",
        longs: ["Long Equities", "Long Risk Currencies"],
        shorts: ["Short Gold", "Short Bonds"],
      },
      stagflation: {
        label: "Stagflation",
        thesis: "Weak growth + persistent inflation → central banks remain boxed in.",
        longs: ["Long Commodities", "Long Gold"],
        shorts: ["Short Long-Duration Bonds", "Short Cyclical Equities"],
      },
      recession: {
        label: "Recession",
        thesis: "Contracting activity → flight to quality and aggressive monetary easing.",
        longs: ["Long Bonds", "Long USD / Gold"],
        shorts: ["Short Equities", "Short Cyclicals"],
      },
      expansion: {
        label: "Expansion",
        thesis: "Self-sustaining recovery → risk appetite returns and rotation into cyclicals.",
        longs: ["Long Cyclicals", "Long Credit"],
        shorts: ["Short Duration", "Short Defensives"],
      },
    },
    implicationsLabel: "Implications",
    footerNote:
      "Every macro configuration produces a distinct market regime — call the regime, and you call the allocation.",
  },

  macroRelationshipEngine: {
    title: "Macro Relationship Engine",
    subtitle: "Trace the transmission chain from data releases to rates and asset prices.",
    badge: "Intermarket",
    shocks: {
      growthBeat: {
        label: "Growth beat",
        nodes: ["GDP ↑", "Rate expectations ↑", "USD ↑", "Quality equities ↑", "Gold ↓"],
        thesis: "Growth beating consensus pushes back easing bets and supports the domestic currency.",
      },
      inflationBeat: {
        label: "Inflation beat",
        nodes: ["CPI ↑", "Hawkish central bank", "Bonds ↓", "Currency ↑", "Duration-sensitive equities ↓"],
        thesis: "An inflation surprise forces a rate repricing; the market sells duration and compresses multiples.",
      },
      riskOff: {
        label: "Risk-off",
        nodes: ["Volatility ↑", "USD liquidity demand ↑", "Carry ↓", "JPY/CHF ↑", "Commodities ↓"],
        thesis: "In systemic stress, liquidity dominates: flows rotate into safe-haven currencies and defensive assets.",
      },
    },
  },

  marketDriverVisualizer: {
    title: "Market Driver Visualizer",
    subtitle: "Pick a fundamental driver and follow its transmission through to price.",
    badge: "Interactive",
    drivers: {
      rates: {
        label: "Interest rates ↑",
        chain: ["Policy rates ↑", "More attractive yields", "Foreign capital inflows", "Currency demand ↑"],
        resultLabel: "Currency ↑",
        note: "Rate-hike expectations often matter more than the hike itself.",
      },
      growth: {
        label: "Growth (GDP) ↑",
        chain: ["GDP beats consensus", "Resilient economy", "Room for higher rates", "Asset appeal ↑"],
        resultLabel: "Currency ↑",
        note: "Strong growth strengthens the currency via investment flows and the rate differential.",
      },
      inflation: {
        label: "Inflation runs hot",
        chain: ["Prices ↑↑", "Purchasing power erodes", "Monetary credibility in question", "Capital flight"],
        resultLabel: "Currency ↓",
        note: "Moderate inflation is healthy; uncontrolled inflation without a credible response weakens the currency.",
      },
      risk: {
        label: "Risk aversion",
        chain: ["Market panic", "Flight to quality", "Rush into USD / safe havens", "Risk currencies ↓"],
        resultLabel: "Risk currency ↓",
        note: "In extreme stress, investors liquidate risk into the most liquid assets (USD).",
      },
      trade: {
        label: "Trade surplus",
        chain: ["Exports > Imports", "Demand for domestic currency", "Positive balance", "Appreciation"],
        resultLabel: "Currency ↑",
        note: "A surplus creates structural demand for the currency; a deficit does the opposite.",
      },
    },
  },

  economicCycleWheel: {
    title: "Economic Cycle Wheel",
    subtitle: "Position the cycle stage and read the consistent asset regime.",
    badge: "Macro cycle",
    phases: {
      Expansion: {
        label: "Expansion",
        policy: "Neutral → restrictive",
        assets: "Cyclical equities, credit",
      },
      Pic: {
        label: "Peak",
        policy: "Restrictive",
        assets: "USD, energy, short duration",
      },
      Ralentissement: {
        label: "Slowdown",
        policy: "Pause → easing",
        assets: "Quality names, bonds",
      },
      Récession: {
        label: "Recession",
        policy: "Aggressive easing",
        assets: "Bonds, gold, defensives",
      },
    },
    regimeGaugeLabel: "REGIME",
    deskReadLabel: "Desk read",
    policyLabel: "Policy:",
    allocationLabel: "Allocation:",
    growthMetricLabel: "Growth",
    inflationMetricLabel: "Inflation",
  },

  fedSimulator: {
    title: "Fed Reaction Simulator",
    subtitle: "Adjust inflation, employment and unemployment to read the Fed's reaction function.",
    badge: "Rates",
    fomcReadLabel: "FOMC read",
    decisions: {
      hawkishHold: { label: "Hawkish hold", ratePath: "+25 bps risk", usd: "USD ↑" },
      dataDependentHold: { label: "Data-dependent hold", ratePath: "Higher for longer", usd: "USD ↔/↑" },
      dovishPivot: { label: "Dovish pivot", ratePath: "Cuts repriced", usd: "USD ↓" },
    },
    marketSummary: (ratePath: string, prob: number) => `Market: ${ratePath} · confidence ${prob}%`,
    cpiLabel: "CPI YoY",
    nfpLabel: "NFP",
    unemploymentLabel: "Unemployment",
  },

  nfpInterpreter: {
    title: "NFP Calculator / Interpreter",
    subtitle: "Combine payrolls, wages and unemployment to read the Fed/FX signal.",
    badge: "NFP",
    reads: {
      laborHot: { label: "Labor hot", usd: "USD bullish", rates: "2Y yield ↑" },
      mixed: { label: "Mixed", usd: "USD choppy", rates: "Curve repricing" },
      laborCooling: { label: "Labor cooling", usd: "USD bearish", rates: "Cuts priced" },
    },
    jobsLabel: "Jobs created",
    wagesLabel: "Hourly earnings m/m",
    unemploymentLabel: "Unemployment",
    transmission: (rates: string) => `Transmission: ${rates} → rate differential → currency.`,
  },

  gdpCpiInterpreters: {
    title: "GDP / CPI Interpreters",
    subtitle: "Cross growth and inflation to qualify the macro regime.",
    badge: "Regime map",
    regimes: {
      goldilocks: { label: "Goldilocks", asset: "Equities ↑ · USD mixed" },
      hotGrowth: { label: "Hot growth", asset: "Rates ↑ · USD ↑ · multiples under pressure" },
      stagflation: { label: "Stagflation", asset: "Risk assets ↓ · gold/commodities ↑" },
      disinflationSlowdown: { label: "Disinflation slowdown", asset: "Bonds ↑ · defensives ↑" },
    },
    gdpLabel: "GDP annualized",
    cpiLabel: "CPI YoY",
    highInflationHint: "High inflation",
    strongGrowthHint: "Strong growth",
  },

  yieldCurveVisualizer: {
    title: "Yield Curve Visualizer",
    subtitle: "Drive the front-end and long-end to understand inversion, steepening and cycle risk.",
    badge: "Rates curve",
    regimeLabels: {
      inversion: "Inversion",
      steepening: "Steepening",
      normalization: "Normalization",
    },
    spreadLabel: (spread: string) => `10Y-3M: ${spread}%`,
    note: "An inverted curve signals restrictive policy and a heightened risk of a future slowdown.",
    frontEndLabel: "Front-end 3M",
    longEndLabel: "Long-end 10Y",
  },

  intermarketCorrelationMap: {
    title: "Intermarket Correlation Map",
    subtitle: "Compare asset reactions across the dominant regime.",
    badge: "Cross-asset",
    regimes: {
      disinflation: "Disinflation",
      inflation: "Inflation shock",
      stress: "Risk-off stress",
    },
    betaLabel: (value: string) => `${value} beta`,
  },

  candleReplay: {
    chartAriaLabel: (instrument: string) => `${instrument} chart`,
    play: "Play",
    pause: "Pause",
    playbackPositionAriaLabel: "Playback position",
  },
};
