// ============================================================================
// Namespace `content` (EN) — editorial adaptation of the chapter body.
// Institutional register (CFA / Financial Times) — not a literal translation.
// ============================================================================

import type { ContentDictionary } from "./content.fr";

export const contentEn: ContentDictionary = {
  seo: {
    title: "Fundamental Analysis — TradForge Academy",
    description:
      "Chapter 1: master fundamental analysis in an interactive lab. Macro, micro, valuation, forecasting and 10 replayable historical cases.",
    ogDescription: "See, handle, decide and understand what actually moves markets. Institutional grade.",
  },

  intro: {
    regimesHeading: "The four macro regimes — Radar view",
    regimesVisual: {
      kicker: "1.1 · Regime memory",
      title: "Fifty years of inflation regimes",
      lead: "Every regime imposes its own asset hierarchy. Read the regime before reading the data point — that's the institutional order of operations.",
      chain: [
        { label: "Supply shock", detail: "1973 · 1979" },
        { label: "Disinflation", detail: "Volcker" },
        { label: "Great Moderation", detail: "1990 → 2007" },
        { label: "Inflation's return", detail: "2021 →" },
      ],
      callouts: [
        { label: "Pivot variable", value: "Real rates" },
        { label: "Response", value: "Monetary policy" },
      ],
      reading: "The same CPI print carries a different consequence depending on the regime: the market prices the expected central-bank reaction, not the raw figure.",
    },
    conceptHeading: "Concept",
    conceptBody:
      "Fundamental analysis is the cornerstone of asset valuation. It aims to determine an asset's intrinsic value — its 'fair value' — by examining the full set of economic, financial and qualitative drivers behind it. Unlike technical analysis, which focuses on price and volume, it looks for the underlying causes of market moves.",
    conceptBodyStrongs: ["intrinsic value", "underlying causes"],
    cards: {
      priceValueTitle: "Intrinsic value vs. price",
      priceValueBody: "Market price can diverge from real value. The goal is to exploit these divergences.",
      efficiencyTitle: "Imperfect efficiency",
      efficiencyBody: "Markets aren't always efficient: opportunities emerge when prices fail to reflect all available information.",
      meanReversionTitle: "Mean reversion",
      meanReversionBody: "Over the long run, price tends to converge toward the asset's intrinsic value.",
    },
    icebergVisual: {
      kicker: "Founding principle",
      title: "Price is visible, value is submerged",
      lead: "The market continuously quotes a price; intrinsic value, meanwhile, is inferred from fundamentals.",
      chain: [
        { label: "Price", detail: "quote" },
        { label: "Sentiment", detail: "flows, narrative" },
        { label: "Fundamentals", detail: "financials, macro" },
        { label: "Value", detail: "fair value" },
      ],
      reading: "The price/value gap is where opportunity lives — it's measured, not guessed.",
    },
    realEconomyVisual: {
      kicker: "Value chain",
      title: "From the real economy to market price",
      lead: "Output, employment and income feed corporate earnings, which in turn feed valuations.",
      chain: [
        { label: "Output" },
        { label: "Income" },
        { label: "Earnings" },
        { label: "Valuation" },
      ],
      reading: "Every fundamental thesis must trace back to a real link in this chain.",
    },
    illustrationHeading: "Interactive illustration",
    scenario: {
      title: "Scenario #1 — Why price moves",
      context: "A currency is trading well below what its fundamentals justify: solid growth, healthy public accounts, attractive rates. The market stays bearish near-term on the back of an alarming headline.",
      prompt: "Under the mean-reversion principle, which working hypothesis is most consistent?",
      choices: {
        a: "Price should tend to move back toward intrinsic value over time",
        b: "Price will keep drifting further away from its value",
        c: "Intrinsic value doesn't matter",
      },
      explanation: "Fundamental analysis is a bet that price converges to intrinsic value over the long run. A sustained undervaluation backed by solid fundamentals is a potential opportunity.",
    },
  },

  macro: {
    conceptHeading: "Concept",
    conceptBody: "Macroeconomic indicators reflect an economy's health and steer capital flows. They're classified by nature (growth, inflation, monetary policy) and by timing (leading, coincident, lagging). Reading the surprise versus consensus usually matters more than the headline figure itself.",
    kpis: {
      pib: { label: "GDP", value: "growth", hint: "overall activity" },
      ipc: { label: "CPI", value: "inflation", hint: "prices & rates" },
      taux: { label: "Rates", value: "policy rate", hint: "cost of capital" },
      nfp: { label: "NFP", value: "employment", hint: "labor market" },
      balance: { label: "Balance", value: "trade", hint: "exports − imports" },
      pmi: { label: "PMI", value: "confidence", hint: "leading indicator" },
    },
    ecosystemVisual: {
      kicker: "1.2 · Figure 1",
      title: "The macroeconomic ecosystem",
      lead: "GDP, inflation, employment, trade balance and rates form a closed loop: no indicator should be read in isolation.",
      chain: [
        { label: "Employment" },
        { label: "Demand" },
        { label: "Inflation" },
        { label: "Rates" },
      ],
      reading: "The market prices the full loop, not the individual data point.",
      altPrimary: "The macroeconomic ecosystem",
      altSecondary: "The macroeconomic ecosystem — how key indicators drive the economy",
    },
    hierarchyVisual: {
      kicker: "1.2 · Figure 2",
      title: "Leading, coincident, lagging",
      lead: "An indicator's timing determines its decision value: leading indicators anticipate, lagging ones confirm.",
      chain: [
        { label: "Leading", detail: "PMI, permits" },
        { label: "Coincident", detail: "GDP, sales" },
        { label: "Lagging", detail: "unemployment, core CPI" },
      ],
      reading: "Positioning on a lagging indicator means buying information the market has already priced in.",
      altPrimary: "Signal hierarchy",
      altSecondary: "The intelligence hierarchy — from signal to impact (leading, coincident, lagging indicators)",
    },
    productionChainVisual: {
      kicker: "Transmission",
      title: "Output → growth → capital → currency",
      lead: "The transmission chain linking industrial activity to a currency's valuation.",
      chain: [
        { label: "Output" },
        { label: "Growth" },
        { label: "Capital flows" },
        { label: "Currency" },
      ],
      callouts: [
        { label: "Upstream signal", value: "Manufacturing PMI" },
        { label: "Downstream signal", value: "Exchange rate" },
      ],
      reading: "A production shock only shows up in the currency after passing through growth and flows — hence the observed lag.",
    },
    dashboardHeading: "Command center — 11 key indicators",
    cycleWheelVisual: {
      kicker: "Widget · context",
      title: "Where are we in the cycle?",
      lead: "The cycle sets the exposure regime: each phase favors a different asset class.",
      chain: [
        { label: "Expansion" },
        { label: "Slowdown" },
        { label: "Contraction" },
        { label: "Recovery" },
      ],
      reading: "The wheel is interactive: set the phase and read the expected sector rotation.",
    },
    centralBankVisual: {
      kicker: "Widget · context",
      title: "The room where the price of money gets decided",
      lead: "The policy rate is the system's reference price: it reorders yields, currencies and valuations.",
      chain: [
        { label: "Inflation" },
        { label: "Decision", detail: "policy rate" },
        { label: "Yields" },
        { label: "Currency" },
      ],
      callouts: [{ label: "Lever", value: "Real rate" }],
      reading: "The market doesn't react to the decision itself, but to its gap versus what was already priced in.",
    },
    nfpVisual: {
      kicker: "Widget · context",
      title: "8:30am — the mechanics of an NFP release",
      lead: "Employment, wages and participation form a triptych: the headline number often lies on its own.",
      chain: [
        { label: "NFP", detail: "job creation" },
        { label: "Wages", detail: "price pressure" },
        { label: "Rates", detail: "expectations" },
        { label: "USD" },
      ],
      reading: "A strong NFP with weak wages doesn't carry the same monetary implication as a weak NFP with rising wages.",
    },
    cpiDriversVisual: {
      kicker: "Widget · context",
      title: "What actually builds the CPI",
      lead: "Commodities, wages and rents feed the index with different lags.",
      chain: [
        { label: "Commodities" },
        { label: "Wages" },
        { label: "Rents", detail: "slow component" },
        { label: "Core CPI" },
      ],
      reading: "Core, being slower-moving, is what the central bank tracks: it reveals persistence.",
    },
    commoditiesFxVisual: {
      kicker: "Widget · context",
      title: "Commodities → currencies",
      lead: "Oil, gold and copper transmit imported inflation and reprice exporting currencies.",
      chain: [
        { label: "Oil" },
        { label: "Imported inflation" },
        { label: "Yields" },
        { label: "FX" },
      ],
      reading: "Copper is a thermometer for activity; gold, a thermometer for real rates.",
    },
    labHeading: "Interactive lab — simulate a surprise",
    tradeFlowsVisual: {
      kicker: "1.2 · Global flows",
      title: "The trade balance, currencies' silent engine",
      lead: "Physical trade creates structural currency demand, independent of market narrative.",
      chain: [
        { label: "Exports" },
        { label: "Currency demand" },
        { label: "Balance" },
        { label: "Exchange rate" },
      ],
      callouts: [
        { label: "Surplus", value: "Currency support" },
        { label: "Deficit", value: "Reliance on flows" },
      ],
      reading: "A current-account deficit isn't fatal as long as capital flows keep funding it — it's the combination of both that breaks a currency.",
    },
  },

  micro: {
    conceptHeading: "Concept",
    conceptBody: "At the company level, analysis rests on the financial statements: the income statement (revenue, margins, net income), the balance sheet (assets = liabilities + equity) and the cash-flow statement. From these we measure growth, profitability (ROE, ROA, margins), leverage (D/E) and cash generation.",
    anatomyVisual: {
      kicker: "1.3 · Anatomy",
      title: "Three statements, one story",
      lead: "Income, balance sheet and cash flow tell the same company from three angles: performance, structure, liquidity.",
      chain: [
        { label: "Income", detail: "revenue, margins" },
        { label: "Balance sheet", detail: "assets = liabilities + equity" },
        { label: "Cash flow", detail: "actual cash" },
      ],
      callouts: [
        { label: "Profitability", value: "ROE / ROA" },
        { label: "Solidity", value: "D/E" },
      ],
      reading: "Earnings without matching cash flow is a red flag: cash is far harder to manufacture than an accounting result.",
      altPrimary: "A company's financial anatomy",
      altSecondary: "Overview of the financial statements: income statement, balance sheet and cash flow",
    },
    widgetsHeading: "Widgets — steer the fundamentals",
  },

  outils: {
    conceptHeading: "Concept",
    conceptBody: "Turning data into decisions requires tools: ratios (P/E, P/B, D/E, ROE), the DCF model (discounted cash flows), sector analysis, peer comparison and SWOT analysis. No multiple stands on its own — it must be weighed against growth, sector and history.",
    capitalMachineVisual: {
      kicker: "1.4 · Allocation machine",
      title: "From macro inputs to market outputs",
      lead: "Analytical tools are the machinery that converts a macro read into an explicit allocation.",
      chain: [
        { label: "Inputs", detail: "macro, financials" },
        { label: "Models", detail: "ratios, DCF" },
        { label: "Arbitrage", detail: "peers, sector" },
        { label: "Allocation", detail: "FX, rates, equities" },
      ],
      callouts: [
        { label: "Multiple", value: "P/E vs. growth" },
        { label: "Discounting", value: "WACC & terminal value" },
      ],
      reading: "A model is never a truth — it's a framework of assumptions, and every parameter must be defensible.",
    },
    widgetsHeading: "Interactive toolbox",
  },

  previsions: {
    conceptHeading: "Concept",
    conceptBody: "Forecasting means projecting the future from historical trends, scenarios (bull, base, bear) and company-issued guidance. Guidance often weighs more than the last reported result — it shapes the market's forward expectations.",
    energyChainVisual: {
      kicker: "1.5 · Forecast chain",
      title: "Anatomy of a shock: from energy to euro repricing",
      lead: "An institutional forecast isn't an opinion — it's a dated causal chain, complete with its breakpoints.",
      chain: [
        { label: "Supply shock", detail: "gas, oil" },
        { label: "Costs", detail: "production" },
        { label: "Inflation", detail: "CPI, core" },
        { label: "ECB response", detail: "rates" },
        { label: "Growth / EUR", detail: "repricing" },
      ],
      callouts: [
        { label: "Horizon", value: "3 → 12 months" },
        { label: "Breakpoint", value: "Real rates > 0" },
      ],
      reading: "Every link is falsifiable: if costs retreat before the monetary response, the scenario becomes stale and must be revised.",
    },
    plannerHeading: "Scenario planner",
  },

  cas: {
    caseTitle: (i: number, title: string) => `Case ${i} — ${title}`,
    capstoneHeading: "Capstone — Applying fundamental analysis",
    capstoneBody: "Ten real market moments, replayable candle by candle. For each: read the context, make your call before the reveal, then compare against what actually happened. Difficulty ramps up progressively.",
    analyzedCount: (n: number) => `${n}/10 cases analyzed`,
    groups: {
      macro: "1.2 · Macroeconomics",
      micro: "1.3 · Microeconomics",
      outils: "1.4 · Analytical tools",
      previsions: "1.5 · Forecasting",
    },
    casesRange: (from: number, to: number) => `Cases ${from}–${to}`,
    caseIndexLabel: (i: number) => `Case ${i}`,
    levelLabel: (level: number | string) => `Lvl ${level}`,
  },

  completion: {
    titleReady: "Final certification unlocked",
    titleLocked: "Progress toward certification",
    bodyReady: "All 5 lessons are validated (≥ 70%). Launch the final certification: 3 levels × 10 institutional scenarios.",
    bodyLocked: (certifiedLessons: number, total: number, cases: number) =>
      `Each lesson is worth 20%, credited only once its assessment is passed. ${certifiedLessons}/${total} lessons validated · ${cases}/10 cases replayed.`,
    cta: "Take the Final Certification",
    lockedCta: (percent: number) => `Certification locked — ${percent}%`,
  },
};
