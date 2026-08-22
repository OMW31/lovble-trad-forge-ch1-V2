// ============================================================================
// Namespace `widgetsCorp` (EN) — editorial adaptation, institutional register
// (CFA / Financial Times style) of the Corporate / Valuation / Forecasting
// widgets in Chapter 1.
// ============================================================================

import type { WidgetsCorpDictionary } from "./widgets-corp.fr";

export const widgetsCorpEn: WidgetsCorpDictionary = {
  companyDashboard: {
    subtitle: "A company at a glance: growth, profitability, cash generation and financial risk.",
    metrics: {
      revenueGrowth: "Revenue growth",
      grossMargin: "Gross margin",
      fcfMargin: "Free cash flow margin",
      netDebtEbitda: "Net debt / EBITDA",
    },
    diagnostic: "Read: profitable growth, strong cash conversion, a lightly levered balance sheet. A quality-compounder profile, provided the valuation stays disciplined.",
  },

  companyHealthScore: {
    title: "Company Health Score",
    subtitle: "Move the fundamentals and watch the health score reprice in real time.",
    factors: {
      growth: { label: "Sales growth", hint: "Sustained growth points to strong demand and a durable competitive edge." },
      margin: { label: "Net margin", hint: "Net margin captures profitability after every cost line." },
      roe: { label: "Return on equity (ROE)", hint: "ROE measures the return generated on shareholders' capital." },
      debt: { label: "Debt / equity (D/E)", hint: "High leverage raises financial risk; too little debt can signal under-investment." },
      fcf: { label: "Free cash flow (% of sales)", hint: "FCF is the cash actually available — the fuel of a healthy business." },
    },
    grades: {
      excellent: "Excellent",
      solid: "Solid",
      correct: "Adequate",
      fragile: "Fragile",
      atRisk: "At risk",
    },
  },

  balanceSheetExplorer: {
    title: "Balance Sheet Explorer",
    subtitle: "Assets = Liabilities + Equity. Click a section to drill into each line item.",
    unit: "$bn",
    sections: {
      assets: "Assets",
      liabilities: "Liabilities",
      equity: "Equity",
    },
    items: {
      cash: "Cash & equivalents",
      receivables: "Accounts receivable",
      inventory: "Inventory",
      fixedAssets: "Property, plant & equipment",
      goodwill: "Goodwill & intangibles",
      payables: "Accounts payable",
      shortTermDebt: "Short-term debt",
      longTermDebt: "Long-term debt",
      capital: "Share capital & paid-in surplus",
      reserves: "Retained earnings",
    },
    tooltip: (label: string, value: number) => `${label}: $${value}bn`,
    detailLine: (value: number, pct: number) => `$${value}bn · ${pct}%`,
    balanceCheck: (assets: number, liab: number, equity: number) => `Balance sheet identity: ${assets} = ${liab} + ${equity} ✓`,
  },

  financialRatios: {
    title: "Financial Ratios",
    subtitle: "Read the same ratios through three lenses: quality, value and risk.",
    modes: {
      quality: "Quality",
      value: "Value",
      risk: "Risk",
    },
    rows: {
      pe: { metric: "P/E", reading: "28x", quality: "Neutral", value: "Rich vs. the market", risk: "Multiple sensitive to rates" },
      roe: { metric: "ROE", reading: "31%", quality: "Excellent", value: "Warrants a premium", risk: "Durability to confirm" },
      de: { metric: "D/E", reading: "0.7x", quality: "Solid", value: "Balance-sheet flexibility", risk: "Low leverage risk" },
      fcfYield: { metric: "FCF yield", reading: "4.8%", quality: "Genuine cash generation", value: "Reasonable", risk: "Partial downside cushion" },
    },
  },

  valuationLab: {
    title: "Valuation Lab",
    subtitle: "Flex the valuation multiples and compare fair value against the market price.",
    badge: "Interactive",
    stats: {
      price: "Price",
      eps: "EPS",
      salesPerShare: "Sales / share",
      ebitdaPerShare: "EBITDA / share",
    },
    sliders: {
      pe: "P/E (price / earnings)",
      ps: "P/S (price / sales)",
      evEbitda: "EV/EBITDA",
    },
    methods: {
      pe: "Via P/E",
      ps: "Via P/S",
      evEbitda: "Via EV/EBITDA",
    },
    fairValueLabel: "Estimated fair value",
    verdicts: {
      undervalued: "Undervalued",
      overvalued: "Overvalued",
      fair: "Close to fair value",
    },
    vsPrice: "vs. price",
  },

  dcfSimulator: {
    title: "DCF Simulator",
    subtitle: "Discount future cash flows and stress-test the sensitivity to WACC and terminal growth.",
    badge: "Intrinsic value",
    sliders: {
      growth: "Revenue growth",
      margin: "Free cash flow margin",
      wacc: "WACC (weighted average cost of capital)",
      terminal: "Terminal growth",
    },
    enterpriseValueIndex: "Enterprise value index",
    verdicts: {
      robust: "Robust valuation",
      severe: "Severe compression",
      middle: "Mid-range",
    },
    yearShort: (n: number) => `Y${n}`,
  },

  peerComparisonMatrix: {
    title: "Peer Comparison Matrix",
    subtitle: "Benchmark the sector leaders on the metric of your choice.",
    badge: "Benchmark",
    metrics: {
      growth: "Sales growth",
      margin: "Net margin",
      roe: "ROE",
      pe: "P/E (valuation)",
    },
    leader: "Leader",
    footnoteHigherBetter: "On this metric, higher is better.",
    footnotePeLower: "On the P/E, a lower multiple can reflect a more conservative valuation — read it alongside growth.",
  },

  earningsImpactEngine: {
    title: "Earnings Impact Engine",
    subtitle: "Expected vs. reported EPS plus guidance → the estimated price reaction.",
    badge: "Simulation",
    epsExpected: "Consensus EPS",
    epsPublished: "Reported EPS",
    surprise: (pct: string) => `surprise ${pct}%`,
    guidanceLabel: "Guidance (forward outlook)",
    guidanceLevels: {
      strongCut: "Sharp downward revision",
      cut: "Downward revision",
      confirmed: "Reaffirmed",
      raise: "Upward revision",
      strongRaise: "Sharp upward revision",
    },
    reactionTitle: "Estimated price reaction",
    footnote: "Guidance often outweighs the headline print: a beat paired with lowered guidance can still send the stock lower.",
  },

  forecastScenarioPlanner: {
    title: "Forecast Scenario Planner",
    subtitle: "Project revenue over five years under three macro scenarios.",
    badge: "Forecasts",
    scenarios: {
      bear: "Bear case",
      base: "Base case",
      bull: "Bull case",
    },
    perYear: (pct: number) => `+${pct}%/yr`,
    yearShort: (n: number) => `Y${n}`,
    revenueProjected: "Projected revenue (Y5)",
    cagr: "CAGR",
  },

  scenarioBuilder: {
    title: "Scenario Builder",
    subtitle: "Combine driver, asset, horizon and invalidation into a tradeable scenario.",
    badge: "Decision",
    pickers: {
      driver: "Driver",
      asset: "Asset",
      horizon: "Horizon",
    },
    ticketLabel: "Scenario ticket",
    thesis: {
      ratesHigher: "a higher-for-longer rates regime",
      durationReprice: "a duration repricing",
      safeHaven: "a flight to safe-haven liquidity",
    },
    direction: {
      conditional: "conditional directional bias",
      cautious: "cautious stance",
    },
    invalidation: "a print running counter to consensus plus a break of the confirmation level",
    sentence: (asset: string, driver: string, thesis: string, horizon: string, direction: string, invalidation: string) =>
      `On ${asset}, the ${driver} driver sets up ${thesis} over a ${horizon} horizon. Call: ${direction}. Invalidation: ${invalidation}.`,
  },

  primitives: {
    levelBadge: (level: number) => `Level ${level}`,
    visualLightbox: {
      expand: (title: string) => `Expand ${title}`,
      dialogDescription: "Enlarged view of the chapter's visual.",
    },
    visualExplainer: {
      reading: "Reading",
    },
  },

  visualQuestion: {
    supportAlt: (visualId: string, widget: string) => `Visual reference ${visualId} — ${widget}`,
    evaluationFallback: "evaluation",
    supportLabel: (visualId: string) => `Reference ${visualId}`,
  },
};
