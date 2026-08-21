// ============================================================================
// EN content overrides for Chapter 1 metadata (CHAPTER + LESSONS).
// ----------------------------------------------------------------------------
// FR (src/lib/academy/chapter1.ts) remains the canonical source of structure:
// ids, order, levels and subsection ids are NEVER duplicated here — only the
// human-readable strings are overridden, keyed by their immutable id.
// Register: institutional English (CFA / Financial Times), never literal.
// ============================================================================

export type LessonCopy = {
  title: string;
  subtitle: string;
  subsections: Record<string, string>;
  miniHero?: {
    tier: string;
    duration: string;
    steps: string[];
    objectives: string[];
    keyQuestion: string;
  };
};

export const CHAPTER_EN = {
  num: "Chapter 01",
  title: "Fundamental Analysis",
  tagline: "See · Handle · Decide · Understand",
  description:
    "The interactive lab that turns theory into intuition. Run an institutional-grade macro and micro research environment.",
};

export const LESSONS_EN: Record<string, LessonCopy> = {
  intro: {
    title: "Introduction & Definition",
    subtitle: "Intrinsic value, efficiency, mean reversion",
    subsections: {
      "intro-regimes": "The four macro regimes",
      "intro-concept": "Concept & definition",
      "intro-illustration": "Interactive illustration",
      "intro-scenario": "Applied scenario",
    },
  },
  macro: {
    title: "Macroeconomic Data",
    subtitle: "Indicators, classification, timing",
    miniHero: {
      tier: "Standard → High",
      duration: "25 min",
      steps: ["Concept", "Illustration", "Widget", "Scenario", "Decision", "Feedback"],
      objectives: [
        "Master the 11 institutional macro indicators and how they move markets",
        "Compute and read an NFP surprise (actual vs consensus)",
        "Trace an inflation shock through currencies, bonds and equities",
        "Work real macro events: NFP Jan 2024, Q4 2023 GDP, trade wars",
      ],
      keyQuestion: "\u201cHow can a single 8:30am print move EUR/USD 100+ pips in thirty seconds?\u201d",
    },
    subsections: {
      "macro-concept": "Concept & timing",
      "macro-dashboard": "Command centre — 11 indicators",
      "macro-widgets": "Advanced macro widgets",
      "macro-lab": "Surprise laboratory",
      "macro-cas": "Historical cases",
    },
  },
  micro: {
    title: "Microeconomic Data",
    subtitle: "Financial statements, margins, leverage, cash flow",
    miniHero: {
      tier: "High",
      duration: "20 min",
      steps: ["Concept", "Statements", "Widget", "Scenario", "Decision", "Feedback"],
      objectives: [
        "Decode an income statement, a balance sheet and a cash-flow statement",
        "Measure profitability (ROE/ROA), leverage (D/E) and cash generation",
        "Score the financial health of a company on a single synthetic gauge",
        "Connect micro fundamentals to the share-price reaction",
      ],
      keyQuestion: "\u201cWhy can a profitable company still go bust for lack of cash?\u201d",
    },
    subsections: {
      "micro-concept": "Concept & financial statements",
      "micro-widgets": "Drive the fundamentals",
      "micro-cas": "Historical cases",
    },
  },
  outils: {
    title: "Analytical Toolkit",
    subtitle: "Ratios, DCF, sector, peers, SWOT",
    miniHero: {
      tier: "High → Premium",
      duration: "25 min",
      steps: ["Concept", "Toolkit", "Widget", "Scenario", "Decision", "Feedback"],
      objectives: [
        "Read and compare multiples (P/E, P/B, D/E, ROE) in context",
        "Build a DCF valuation and stress its sensitivity",
        "Benchmark a company against its peers and its sector",
        "Anticipate how an earnings release lands on valuation",
      ],
      keyQuestion: "\u201cIs a 40x P/E expensive? Exactly what does the answer depend on?\u201d",
    },
    subsections: {
      "outils-concept": "Concept & methods",
      "outils-widgets": "Interactive toolkit",
      "outils-cas": "Historical cases",
    },
  },
  previsions: {
    title: "Financial Forecasting",
    subtitle: "Trends, scenarios, guidance",
    miniHero: {
      tier: "Premium",
      duration: "20 min",
      steps: ["Concept", "Scenarios", "Widget", "Decision", "Feedback"],
      objectives: [
        "Project from historical trends and probability-weighted scenarios",
        "Understand why guidance outweighs the last reported quarter",
        "Build a coherent bull / base / bear thesis",
        "Turn a forecast into an allocation decision",
      ],
      keyQuestion: "\u201cWhy can a company that beats consensus still fall 10%?\u201d",
    },
    subsections: {
      "previsions-concept": "Concept & guidance",
      "previsions-planner": "Scenario planner",
      "previsions-cas": "Historical cases",
    },
  },
  "cas-pratiques": {
    title: "Case Studies",
    subtitle: "10 replayable historical cases",
    subsections: {
      "cas-pratiques-index": "Case index",
    },
  },
};
