// ============================================================================
// EN overrides for CASE_STUDIES in market-data.ts.
// IDs and structural fields (instrument, period, level, series, refLevel,
// marker.at, decision.correctId, index) are immutable — only the copy is
// translated. Consumers merge this over the FR source at render time.
// ============================================================================

export const CASE_STUDIES_EN: Record<string, {
  title: string;
  driver: string;
  context: string;
  markerLabel: string;
  refLevelLabel?: string;
  decision: {
    prompt: string;
    choices: { id: string; label: string }[];
    explanation: string;
  };
  outcome: string;
}> = {
  "ch1-pib-us-q4-2023": {
    title: "US GDP Q4 2023 — Upside Surprise",
    driver: "Growth · Rate Differential",
    context:
      "The market expects annualized US GDP growth of 2.0%. The Fed remains data-dependent: a robust print would delay 2024 rate cuts. The BEA ultimately reports +3.3%, well above expectations.",
    markerLabel: "BEA: GDP +3.3% (exp. +2.0%)",
    refLevelLabel: "Short-term support 1.0850",
    decision: {
      prompt:
        "US growth well above consensus, Fed data-dependent. What is the most likely fundamental effect on USD?",
      choices: [
        { id: "a", label: "USD strengthens (rates higher for longer)" },
        { id: "b", label: "USD weakens (Fed will cut faster)" },
        { id: "c", label: "No impact, data already priced in" },
      ],
      explanation:
        "Resilient growth gives the Fed room to keep rates elevated longer. The rate differential favors USD: EUR/USD falls (USD up).",
    },
    outcome:
      "EUR/USD slips from ~1.0880 to 1.0850 in the hours following; USD/JPY rises from 147.50 to 148.00. The relative appeal of USD-denominated assets increases.",
  },

  "ch1-inflation-eu-2022-2024": {
    title: "Eurozone Inflation & ECB Response",
    driver: "Inflation · Monetary Policy",
    context:
      "After the energy crisis, Eurozone inflation exceeds 10%. The ECB begins an unprecedented rate-hiking cycle from July 2022, exiting negative rates.",
    markerLabel: "ECB: start of hiking cycle",
    refLevelLabel: "EUR/USD parity",
    decision: {
      prompt:
        "Inflation out of control, ECB suddenly determined to tighten aggressively. Medium-term effect on EUR?",
      choices: [
        { id: "a", label: "EUR supported: tightening narrows the unfavorable differential" },
        { id: "b", label: "EUR collapses durably despite hikes" },
        { id: "c", label: "EUR unresponsive to ECB rates" },
      ],
      explanation:
        "Initially EUR/USD drops below parity (recession + US rate differential). But the ECB's determination narrows the policy gap and supports a rebound toward 1.10-1.12 in 2023.",
    },
    outcome:
      "EUR/USD breaks below parity in 2022 (~0.95) then rebounds to 1.10-1.12 in 2023 as the ECB tightens, before stabilizing in early 2024.",
  },

  "ch1-china-trade-2023-2024": {
    title: "China Trade Balance & AUD",
    driver: "Trade Balance · Commodities",
    context:
      "China's post-COVID reopening raises hopes of strong demand for Australian commodities (iron ore, coal, LNG). The recovery proves more muted than expected, especially in real estate.",
    markerLabel: "Disappointing Chinese imports",
    refLevelLabel: "Weakness zone 0.6400",
    decision: {
      prompt:
        "Chinese iron imports disappoint and real estate slows. What is the most likely impact on AUD?",
      choices: [
        { id: "a", label: "AUD weakens (lower commodity demand)" },
        { id: "b", label: "AUD strengthens (regional safe haven)" },
        { id: "c", label: "AUD ignores Chinese data" },
      ],
      explanation:
        "AUD is a commodity currency highly sensitive to China, its largest trading partner. Weaker demand weighs on Australian exports and thus on AUD.",
    },
    outcome:
      "AUD/USD shows clear sensitivity: disappointing figures coincide with weakness phases; Beijing stimulus provides occasional support.",
  },

  "ch1-trade-war-2018-2020": {
    title: "US–China Trade War",
    driver: "Geopolitical Trade · Risk",
    context:
      "From 2018, Washington imposes tariffs on hundreds of billions of Chinese goods; Beijing retaliates. Supply chains and global growth are threatened.",
    markerLabel: "Major tariff escalation",
    refLevelLabel: "Psychological threshold 7.00",
    decision: {
      prompt:
        "Tariff escalation and fears for the Chinese economy. Most likely direction for USD/CNH?",
      choices: [
        { id: "a", label: "USD/CNH rises (pressure + competitive devaluation)" },
        { id: "b", label: "USD/CNH falls (China defends yuan at all costs)" },
        { id: "c", label: "Stable, the issue is purely political" },
      ],
      explanation:
        "Pressure on the Chinese economy and competitive devaluation push USD/CNH higher; USD also acts as a safe haven during peak tension.",
    },
    outcome:
      "USD/CNH rises from roughly 6.30 in early 2018 to over 7.15 in 2019. Increased equity volatility, supply chain disruptions.",
  },

  "ch1-covid-march-2020": {
    title: "COVID-19 — Flight to Quality",
    driver: "Systemic Risk · Liquidity",
    context:
      "In March 2020, global lockdowns trigger panic. Massive demand for USD as reserve and liquidity currency. Commodity currencies collapse.",
    markerLabel: "Global panic · risk liquidation",
    refLevelLabel: "Crisis low 0.5500",
    decision: {
      prompt:
        "Extreme risk aversion, dash for liquidity. What does AUD/USD do?",
      choices: [
        { id: "a", label: "Sharp drop (selling risky assets into USD)" },
        { id: "b", label: "Rise (Australia is a safe haven)" },
        { id: "c", label: "Stable, market too uncertain to move" },
      ],
      explanation:
        "In extreme risk aversion, investors liquidate risky assets (AUD) for the most liquid and safest (USD). AUD plunges violently.",
    },
    outcome:
      "AUD/USD dives from ~0.66 to ~0.55 in weeks. DXY surges; JPY and CHF also benefit from safe-haven status, but USD dominates.",
  },

  "ch1-energy-crisis-eu-2022": {
    title: "European Energy Crisis",
    driver: "Supply Shock · Imported Inflation",
    context:
      "After the invasion of Ukraine, Russian gas deliveries to Europe are drastically cut. Gas prices (TTF) explode; risk of shortages and severe recession.",
    markerLabel: "Gas price surge · Russian cutoffs",
    refLevelLabel: "EUR/USD parity",
    decision: {
      prompt:
        "Energy supply shock hitting Europe directly. Impact on EUR/USD?",
      choices: [
        { id: "a", label: "EUR/USD drops below parity" },
        { id: "b", label: "EUR/USD rises (inflation supports EUR)" },
        { id: "c", label: "No link between energy and FX" },
      ],
      explanation:
        "The crisis worsens the trade balance and Eurozone outlook, making EUR less attractive — especially as the Fed was tightening more aggressively. EUR/USD breaks below parity.",
    },
    outcome:
      "EUR/USD drops below parity for the first time in 20 years, reaching ~0.95 in September 2022.",
  },

  "ch1-nfp-jan-2024": {
    title: "US NFP — Surprise (Jan. 2024)",
    driver: "Employment · Rate Expectations",
    context:
      "Consensus: 180k job creations. Print: 353k. Unemployment stable at 3.7% (exp. 3.8%). Hourly earnings +0.6% m/m (exp. +0.3%).",
    markerLabel: "NFP: 353k (exp. 180k)",
    refLevelLabel: "Resistance 148.50",
    decision: {
      prompt:
        "Red-hot US labor market, wages surging. Effect on USD/JPY?",
      choices: [
        { id: "a", label: "USD/JPY rises (Fed stays restrictive longer)" },
        { id: "b", label: "USD/JPY falls (market ignores employment)" },
        { id: "c", label: "USD/JPY stable, JPY too strong" },
      ],
      explanation:
        "Very strong employment and rising wages delay Fed rate cuts and fuel inflation. The already-wide US-Japan rate differential favors USD: USD/JPY rises.",
    },
    outcome:
      "USD strengthens sharply on the print; USD/JPY accelerates higher, the rate differential dominating the dynamic.",
  },

  "ch1-try-depreciation-2021-2024": {
    title: "Turkish Lira Depreciation",
    driver: "Monetary Credibility · Negative Real Rates",
    context:
      "Despite runaway inflation, the Turkish central bank cuts rates under political pressure. Deeply negative real rates destroy confidence in the lira.",
    markerLabel: "Rate cuts despite inflation",
    decision: {
      prompt:
        "Very high inflation but policy rates lowered (negative real rates). What happens to USD/TRY?",
      choices: [
        { id: "a", label: "USD/TRY explodes higher (TRY collapses)" },
        { id: "b", label: "USD/TRY falls (low rates = growth = strong TRY)" },
        { id: "c", label: "Stable, inflation is already known" },
      ],
      explanation:
        "Negative real rates destroy the appeal of holding the currency: capital flight and loss of monetary credibility collapse the TRY. USD/TRY surges massively.",
    },
    outcome:
      "USD/TRY sets successive records, the lira losing a large share of its value — an extreme illustration of the monetary credibility / FX link.",
  },

  "ch1-brexit-2016": {
    title: "Brexit — 2016 Referendum",
    driver: "Political Risk · Uncertainty",
    context:
      "Polls indicate a close referendum. Markets position for a Remain vote. The Leave result catches the market off guard.",
    markerLabel: "Result: Leave wins",
    refLevelLabel: "Collapse toward 1.3200",
    decision: {
      prompt:
        "Surprise vote to leave the EU, maximum uncertainty. Reaction of GBP/USD?",
      choices: [
        { id: "a", label: "Violent drop (political risk + uncertainty)" },
        { id: "b", label: "Rise (regained sovereignty = strong pound)" },
        { id: "c", label: "No notable movement" },
      ],
      explanation:
        "Extreme political and economic uncertainty triggers a flight from the pound. GBP/USD collapses in hours, one of the largest intraday moves in its history.",
    },
    outcome:
      "GBP/USD drops from about 1.50 to 1.32 on the night of the result — a textbook political shock.",
  },

  "ch1-us-election-2016": {
    title: "2016 US Elections",
    driver: "Political Risk · Reflation",
    context:
      "The market expects one outcome, then the result surprises. The Mexican peso becomes the barometer for trade risk tied to the new US economic program.",
    markerLabel: "Election result",
    refLevelLabel: "Symbolic cap 20.00",
    decision: {
      prompt:
        "Surprise result, fears for Mexico–US trade. What does USD/MXN do?",
      choices: [
        { id: "a", label: "USD/MXN surges (peso penalized by trade risk)" },
        { id: "b", label: "USD/MXN falls (Mexico benefits)" },
        { id: "c", label: "Market indifferent to politics" },
      ],
      explanation:
        "The peso, highly exposed to trade with the US, becomes the vehicle for political risk: USD/MXN surges. USD also strengthens on the reflation theme.",
    },
    outcome:
      "USD/MXN spikes sharply on the results announcement; the peso absorbs the uncertainty over the trade relationship.",
  },
};
