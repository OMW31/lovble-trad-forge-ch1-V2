// ============================================================================
// Question Bank — English translations (CH1, 134 items: 75 Part A / 59 Part B)
// ----------------------------------------------------------------------------
// Versioned source of truth for EN question copy. Mirrored into Lovable Cloud
// table question_translations (locale 'en') via
// docs/ch1/i18n/question_translations_en.sql. Also used as the offline
// fallback when the remote bank or its translations are unavailable.
// Keys: `${part}:${question_key}`. Choice ids/order identical to FR source.
// Generated 2026-10-30, dual-reviewed (translation + finance editor pass),
// validated: 0 French residue, 134/134 choice-id parity, numeric parity.
// ============================================================================

export type QuestionTranslation = {
  prompt: string;
  choices: { id: string; label: string }[];
  explanation: string;
};

export const QUESTION_TRANSLATIONS_EN: Record<string, QuestionTranslation> = {
  "A:1.1-Q1": {
    "prompt": "Fundamental analysis seeks to determine:",
    "choices": [
      {
        "id": "a",
        "label": "The technical trend of the market"
      },
      {
        "id": "b",
        "label": "The intrinsic value of an asset"
      },
      {
        "id": "c",
        "label": "Trading volumes"
      },
      {
        "id": "d",
        "label": "Future volatility"
      }
    ],
    "explanation": "It relies on economic and financial factors to estimate \"fair value.\""
  },
  "A:1.1-Q10": {
    "prompt": "An investor who uses fundamental analysis aims to:",
    "choices": [
      {
        "id": "a",
        "label": "Profit from ultra-short-term fluctuations"
      },
      {
        "id": "b",
        "label": "Exploit divergences between market price and intrinsic value"
      },
      {
        "id": "c",
        "label": "Follow chart trends"
      },
      {
        "id": "d",
        "label": "Ignore economic data"
      }
    ],
    "explanation": "The objective is to buy undervalued assets and sell overvalued ones."
  },
  "A:1.1-Q11": {
    "prompt": "The \"intrinsic value\" of a currency depends notably on:",
    "choices": [
      {
        "id": "a",
        "label": "Market orders"
      },
      {
        "id": "b",
        "label": "The economic health of the issuing country"
      },
      {
        "id": "c",
        "label": "The number of transactions"
      },
      {
        "id": "d",
        "label": "The weather"
      }
    ],
    "explanation": "Economic health (GDP, inflation, etc.) determines the value of a currency."
  },
  "A:1.1-Q12": {
    "prompt": "Why is fundamental analysis important for risk management?",
    "choices": [
      {
        "id": "a",
        "label": "It eliminates all risk of loss"
      },
      {
        "id": "b",
        "label": "It identifies assets supported by solid fundamentals"
      },
      {
        "id": "c",
        "label": "It guarantees high returns"
      },
      {
        "id": "d",
        "label": "It is risk-free"
      }
    ],
    "explanation": "Knowing the strength of the fundamentals allows for a better assessment of risk."
  },
  "A:1.1-Q13": {
    "prompt": "Fundamental analysis is particularly well suited to markets:",
    "choices": [
      {
        "id": "a",
        "label": "Illiquid markets"
      },
      {
        "id": "b",
        "label": "Markets where prices are always fair"
      },
      {
        "id": "c",
        "label": "Markets where inefficiencies can exist"
      },
      {
        "id": "d",
        "label": "Markets where information is perfect"
      }
    ],
    "explanation": "Market inefficiencies create opportunities for fundamental analysis."
  },
  "A:1.1-Q14": {
    "prompt": "The intrinsic value of a company is often estimated using:",
    "choices": [
      {
        "id": "a",
        "label": "Market prices"
      },
      {
        "id": "b",
        "label": "Discounted future cash flows"
      },
      {
        "id": "c",
        "label": "Trading volumes"
      },
      {
        "id": "d",
        "label": "Market rumors"
      }
    ],
    "explanation": "The DCF model is one of the most widely used valuation methods."
  },
  "A:1.1-Q15": {
    "prompt": "In fundamental analysis, \"convergence toward intrinsic value\":",
    "choices": [
      {
        "id": "a",
        "label": "Is instantaneous"
      },
      {
        "id": "b",
        "label": "Can take time"
      },
      {
        "id": "c",
        "label": "Never happens"
      },
      {
        "id": "d",
        "label": "Depends on algorithms"
      }
    ],
    "explanation": "Markets can remain irrational for an extended period."
  },
  "A:1.1-Q2": {
    "prompt": "According to fundamental analysis, the market price:",
    "choices": [
      {
        "id": "a",
        "label": "Always coincides with intrinsic value"
      },
      {
        "id": "b",
        "label": "Can temporarily deviate from intrinsic value"
      },
      {
        "id": "c",
        "label": "Is independent of fundamentals"
      },
      {
        "id": "d",
        "label": "Determines intrinsic value"
      }
    ],
    "explanation": "Markets are not perfectly efficient; divergences arise."
  },
  "A:1.1-Q3": {
    "prompt": "One of the key principles of fundamental analysis is:",
    "choices": [
      {
        "id": "a",
        "label": "Absolute market efficiency"
      },
      {
        "id": "b",
        "label": "Long-term mean reversion"
      },
      {
        "id": "c",
        "label": "The absence of risk"
      },
      {
        "id": "d",
        "label": "Analyzing chart patterns alone"
      }
    ],
    "explanation": "The market price is expected to converge toward intrinsic value over the long term."
  },
  "A:1.1-Q4": {
    "prompt": "Fundamental analysis is particularly useful for:",
    "choices": [
      {
        "id": "a",
        "label": "High-frequency trading"
      },
      {
        "id": "b",
        "label": "Long-term investment strategies"
      },
      {
        "id": "c",
        "label": "Identifying support/resistance levels"
      },
      {
        "id": "d",
        "label": "Candlestick pattern analysis"
      }
    ],
    "explanation": "It focuses on drivers of value over time."
  },
  "A:1.1-Q5": {
    "prompt": "Which of the following is NOT an objective of fundamental analysis?",
    "choices": [
      {
        "id": "a",
        "label": "Identifying overvalued assets"
      },
      {
        "id": "b",
        "label": "Understanding market drivers"
      },
      {
        "id": "c",
        "label": "Predicting the price in 5 minutes"
      },
      {
        "id": "d",
        "label": "Managing risks"
      }
    ],
    "explanation": "Fundamental analysis is not designed to forecast ultra-short-term price fluctuations."
  },
  "A:1.1-Q6": {
    "prompt": "Intrinsic value is based on:",
    "choices": [
      {
        "id": "a",
        "label": "Market rumors"
      },
      {
        "id": "b",
        "label": "Economic, financial, and qualitative factors"
      },
      {
        "id": "c",
        "label": "Investor sentiment"
      },
      {
        "id": "d",
        "label": "Market orders"
      }
    ],
    "explanation": "It is grounded in an in-depth analysis of fundamentals."
  },
  "A:1.1-Q7": {
    "prompt": "The efficient market hypothesis is:",
    "choices": [
      {
        "id": "a",
        "label": "Entirely true in all cases"
      },
      {
        "id": "b",
        "label": "Challenged by fundamental analysis"
      },
      {
        "id": "c",
        "label": "Irrelevant to the investor"
      },
      {
        "id": "d",
        "label": "A mathematical law"
      }
    ],
    "explanation": "Fundamental analysis posits that markets are not always efficient."
  },
  "A:1.1-Q8": {
    "prompt": "The principle of \"mean reversion\" implies that:",
    "choices": [
      {
        "id": "a",
        "label": "Prices never return to their average"
      },
      {
        "id": "b",
        "label": "Prices tend to revert toward their intrinsic value"
      },
      {
        "id": "c",
        "label": "The average is always below the price"
      },
      {
        "id": "d",
        "label": "The average price is the only benchmark"
      }
    ],
    "explanation": "This is one of the core pillars of fundamental analysis."
  },
  "A:1.1-Q9": {
    "prompt": "Fundamental analysis differs from technical analysis because:",
    "choices": [
      {
        "id": "a",
        "label": "It uses charts"
      },
      {
        "id": "b",
        "label": "It focuses on underlying causes"
      },
      {
        "id": "c",
        "label": "It is less reliable"
      },
      {
        "id": "d",
        "label": "It applies only to equities"
      }
    ],
    "explanation": "Technical analysis focuses on prices and volumes, whereas fundamental analysis examines economic and financial fundamentals."
  },
  "A:1.2-Q1": {
    "prompt": "An upside surprise in US GDP is generally:",
    "choices": [
      {
        "id": "a",
        "label": "Bearish for the USD"
      },
      {
        "id": "b",
        "label": "Bullish for the USD"
      },
      {
        "id": "c",
        "label": "Neutral"
      },
      {
        "id": "d",
        "label": "Impossible to anticipate"
      }
    ],
    "explanation": "Robust growth attracts capital flows and can keep policy rates elevated."
  },
  "A:1.2-Q10": {
    "prompt": "A rise in oil prices generally benefits the:",
    "choices": [
      {
        "id": "a",
        "label": "JPY"
      },
      {
        "id": "b",
        "label": "CAD (Canada)"
      },
      {
        "id": "c",
        "label": "EUR"
      },
      {
        "id": "d",
        "label": "CHF"
      }
    ],
    "explanation": "Canada is a net oil exporter; higher oil prices improve its trade balance."
  },
  "A:1.2-Q11": {
    "prompt": "In the US, \"Average Hourly Earnings\" measures:",
    "choices": [
      {
        "id": "a",
        "label": "Total number of jobs"
      },
      {
        "id": "b",
        "label": "Growth in wage earnings"
      },
      {
        "id": "c",
        "label": "Labor force participation rate"
      },
      {
        "id": "d",
        "label": "Productivity"
      }
    ],
    "explanation": "Strong wage growth can fuel inflation (wage-price spiral)."
  },
  "A:1.2-Q12": {
    "prompt": "Purchasing Managers' Index (PMI) data are closely monitored because:",
    "choices": [
      {
        "id": "a",
        "label": "They measure past inflation"
      },
      {
        "id": "b",
        "label": "They provide an early indication of sectoral health"
      },
      {
        "id": "c",
        "label": "They replace GDP"
      },
      {
        "id": "d",
        "label": "They are published annually"
      }
    ],
    "explanation": "PMIs are leading indicators of economic activity."
  },
  "A:1.2-Q13": {
    "prompt": "Which category of indicators includes interest rate decisions and forward guidance?",
    "choices": [
      {
        "id": "a",
        "label": "Growth indicators"
      },
      {
        "id": "b",
        "label": "Inflation indicators"
      },
      {
        "id": "c",
        "label": "Monetary policy indicators"
      },
      {
        "id": "d",
        "label": "Sentiment indicators"
      }
    ],
    "explanation": "These are events and communications that carry major fundamental market impact."
  },
  "A:1.2-Q14": {
    "prompt": "A yield curve inversion (2Y > 10Y) is often interpreted as:",
    "choices": [
      {
        "id": "a",
        "label": "A signal of strong economic growth"
      },
      {
        "id": "b",
        "label": "A harbinger of recession"
      },
      {
        "id": "c",
        "label": "An expansionary monetary policy"
      },
      {
        "id": "d",
        "label": "A coincident indicator"
      }
    ],
    "explanation": "Yield curve inversion is a classic leading indicator of recession."
  },
  "A:1.2-Q15": {
    "prompt": "Why are rate change expectations often more important than the actual rate decisions themselves?",
    "choices": [
      {
        "id": "a",
        "label": "Because markets anticipate and price in changes in advance"
      },
      {
        "id": "b",
        "label": "Because central banks never change interest rates"
      },
      {
        "id": "c",
        "label": "Because interest rates are fixed"
      },
      {
        "id": "d",
        "label": "Because expectations have no market impact"
      }
    ],
    "explanation": "Markets operate on expectations; being \"priced in\" is central."
  },
  "A:1.2-Q2": {
    "prompt": "The indicator that measures changes in consumer prices is:",
    "choices": [
      {
        "id": "a",
        "label": "GDP"
      },
      {
        "id": "b",
        "label": "NFP"
      },
      {
        "id": "c",
        "label": "CPI"
      },
      {
        "id": "d",
        "label": "PMI"
      }
    ],
    "explanation": "The Consumer Price Index is the standard measure of headline consumer inflation."
  },
  "A:1.2-Q3": {
    "prompt": "Higher interest rates tend to:",
    "choices": [
      {
        "id": "a",
        "label": "Drive away foreign capital"
      },
      {
        "id": "b",
        "label": "Attract foreign capital"
      },
      {
        "id": "c",
        "label": "Have no impact on the currency"
      },
      {
        "id": "d",
        "label": "Reduce inflation immediately"
      }
    ],
    "explanation": "Investors seek higher yields, increasing demand for the domestic currency."
  },
  "A:1.2-Q4": {
    "prompt": "A trade surplus (exports > imports) means:",
    "choices": [
      {
        "id": "a",
        "label": "Weaker demand for the domestic currency"
      },
      {
        "id": "b",
        "label": "Stronger demand for the domestic currency"
      },
      {
        "id": "c",
        "label": "An automatic depreciation"
      },
      {
        "id": "d",
        "label": "No impact on forex"
      }
    ],
    "explanation": "Foreign buyers need the domestic currency to pay for exports."
  },
  "A:1.2-Q5": {
    "prompt": "Non-Farm Payrolls (NFP) measure:",
    "choices": [
      {
        "id": "a",
        "label": "The number of agricultural jobs"
      },
      {
        "id": "b",
        "label": "The number of non-farm jobs created"
      },
      {
        "id": "c",
        "label": "The unemployment rate only"
      },
      {
        "id": "d",
        "label": "Average hourly earnings"
      }
    ],
    "explanation": "NFP measures the net number of non-farm jobs added or lost."
  },
  "A:1.2-Q6": {
    "prompt": "High and persistent inflation can lead the central bank to:",
    "choices": [
      {
        "id": "a",
        "label": "Lower its policy rates"
      },
      {
        "id": "b",
        "label": "Raise its policy rates"
      },
      {
        "id": "c",
        "label": "Make no change"
      },
      {
        "id": "d",
        "label": "Purchase bonds"
      }
    ],
    "explanation": "A restrictive monetary policy (rate hikes) aims to curb inflation."
  },
  "A:1.2-Q7": {
    "prompt": "Which of the following is a leading indicator?",
    "choices": [
      {
        "id": "a",
        "label": "Unemployment rate"
      },
      {
        "id": "b",
        "label": "GDP"
      },
      {
        "id": "c",
        "label": "Building permits"
      },
      {
        "id": "d",
        "label": "CPI"
      }
    ],
    "explanation": "Building permits turn before the broader economy establishes a trend."
  },
  "A:1.2-Q8": {
    "prompt": "Which of the following is a coincident indicator?",
    "choices": [
      {
        "id": "a",
        "label": "Yield spread (yield curve inversion)"
      },
      {
        "id": "b",
        "label": "Industrial production"
      },
      {
        "id": "c",
        "label": "Unit labor costs"
      },
      {
        "id": "d",
        "label": "New capital goods orders"
      }
    ],
    "explanation": "Industrial production moves roughly at the same time as the broader economy."
  },
  "A:1.2-Q9": {
    "prompt": "The unemployment rate is considered what type of indicator?",
    "choices": [
      {
        "id": "a",
        "label": "Leading"
      },
      {
        "id": "b",
        "label": "Coincident"
      },
      {
        "id": "c",
        "label": "Lagging"
      },
      {
        "id": "d",
        "label": "Unreliable"
      }
    ],
    "explanation": "Firms wait to be confident in an economic recovery before hiring on a large scale."
  },
  "A:1.3-Q1": {
    "prompt": "Microeconomic data primarily focuses on:",
    "choices": [
      {
        "id": "a",
        "label": "Monetary policy"
      },
      {
        "id": "b",
        "label": "Individual company performance"
      },
      {
        "id": "c",
        "label": "Foreign exchange rates"
      },
      {
        "id": "d",
        "label": "Sentiment and confidence indicators"
      }
    ],
    "explanation": "Microeconomics focuses on individual economic units (firms, households)."
  },
  "A:1.3-Q10": {
    "prompt": "The Current Ratio (current assets / current liabilities) measures:",
    "choices": [
      {
        "id": "a",
        "label": "Long-term profitability"
      },
      {
        "id": "b",
        "label": "Liquidity and the ability to meet short-term obligations"
      },
      {
        "id": "c",
        "label": "Operational efficiency"
      },
      {
        "id": "d",
        "label": "Revenue growth"
      }
    ],
    "explanation": "A ratio < 1 indicates short-term default or liquidity risk."
  },
  "A:1.3-Q11": {
    "prompt": "Why can a high ROE driven by financial leverage (debt) be fragile?",
    "choices": [
      {
        "id": "a",
        "label": "Because debt increases financial risk"
      },
      {
        "id": "b",
        "label": "Because debt is always bad"
      },
      {
        "id": "c",
        "label": "Because ROE does not account for debt"
      },
      {
        "id": "d",
        "label": "Because shareholders dislike debt"
      }
    ],
    "explanation": "ROE artificially inflated by debt = increased bankruptcy risk."
  },
  "A:1.3-Q12": {
    "prompt": "In balance sheet analysis, \"Equity\" represents:",
    "choices": [
      {
        "id": "a",
        "label": "Total liabilities"
      },
      {
        "id": "b",
        "label": "The net worth belonging to shareholders"
      },
      {
        "id": "c",
        "label": "Fixed assets"
      },
      {
        "id": "d",
        "label": "Inventory and receivables"
      }
    ],
    "explanation": "Equity = Assets − Liabilities (shareholders' equity)."
  },
  "A:1.3-Q13": {
    "prompt": "A company with revenue up 51% (Tesla 2022) but a P/E of 50 is:",
    "choices": [
      {
        "id": "a",
        "label": "Undervalued"
      },
      {
        "id": "b",
        "label": "Potentially overvalued if growth fails to materialize"
      },
      {
        "id": "c",
        "label": "Always a good investment"
      },
      {
        "id": "d",
        "label": "Risk-free"
      }
    ],
    "explanation": "A high P/E prices in future growth that may not materialize."
  },
  "A:1.3-Q14": {
    "prompt": "The \"Quick Ratio\" differs from the \"Current Ratio\" because it excludes:",
    "choices": [
      {
        "id": "a",
        "label": "Accounts receivable"
      },
      {
        "id": "b",
        "label": "Inventories"
      },
      {
        "id": "c",
        "label": "Cash and cash equivalents"
      },
      {
        "id": "d",
        "label": "Long-term debt"
      }
    ],
    "explanation": "Quick Ratio = (Current Assets − Inventories) / Current Liabilities (more conservative)."
  },
  "A:1.3-Q15": {
    "prompt": "Why should gross and net margins be analyzed together?",
    "choices": [
      {
        "id": "a",
        "label": "Because they measure the same thing"
      },
      {
        "id": "b",
        "label": "Because the spread between the two reveals operating efficiency and overhead costs"
      },
      {
        "id": "c",
        "label": "Because gross margin is sufficient"
      },
      {
        "id": "d",
        "label": "Because net margin does not matter"
      }
    ],
    "explanation": "Gross margin − operating expenses = net margin. An abnormal spread signals an issue."
  },
  "A:1.3-Q2": {
    "prompt": "A company's balance sheet always satisfies the equation:",
    "choices": [
      {
        "id": "a",
        "label": "Assets = Liabilities − Equity"
      },
      {
        "id": "b",
        "label": "Assets = Liabilities + Equity"
      },
      {
        "id": "c",
        "label": "Equity = Liabilities − Assets"
      },
      {
        "id": "d",
        "label": "Liabilities = Assets + Equity"
      }
    ],
    "explanation": "Assets = Liabilities + Equity (the fundamental accounting equation)."
  },
  "A:1.3-Q3": {
    "prompt": "The income statement measures:",
    "choices": [
      {
        "id": "a",
        "label": "Financial health at a specific point in time"
      },
      {
        "id": "b",
        "label": "Performance over a period (revenues, expenses, profits)"
      },
      {
        "id": "c",
        "label": "Cash flows"
      },
      {
        "id": "d",
        "label": "Enterprise value"
      }
    ],
    "explanation": "It reports revenues and expenses over a given period."
  },
  "A:1.3-Q4": {
    "prompt": "A net margin of 25% means that:",
    "choices": [
      {
        "id": "a",
        "label": "The company generates 25% net profit relative to its revenue"
      },
      {
        "id": "b",
        "label": "The company has 25% debt"
      },
      {
        "id": "c",
        "label": "25% of assets are liquid"
      },
      {
        "id": "d",
        "label": "ROE is 25%"
      }
    ],
    "explanation": "Net margin = Net income / Revenue."
  },
  "A:1.3-Q5": {
    "prompt": "The debt-to-equity (D/E) ratio assesses:",
    "choices": [
      {
        "id": "a",
        "label": "Profitability"
      },
      {
        "id": "b",
        "label": "The level of indebtedness"
      },
      {
        "id": "c",
        "label": "Liquidity"
      },
      {
        "id": "d",
        "label": "Sales growth"
      }
    ],
    "explanation": "It indicates the level of debt relative to shareholders' equity."
  },
  "A:1.3-Q6": {
    "prompt": "Return on Equity (ROE) measures:",
    "choices": [
      {
        "id": "a",
        "label": "The return on shareholders' equity"
      },
      {
        "id": "b",
        "label": "The company's liquidity"
      },
      {
        "id": "c",
        "label": "Total indebtedness"
      },
      {
        "id": "d",
        "label": "Revenue growth"
      }
    ],
    "explanation": "ROE = Net Income / Shareholders' Equity."
  },
  "A:1.3-Q7": {
    "prompt": "A high Free Cash Flow indicates:",
    "choices": [
      {
        "id": "a",
        "label": "A strong capacity to generate available cash"
      },
      {
        "id": "b",
        "label": "High debt"
      },
      {
        "id": "c",
        "label": "Low profitability"
      },
      {
        "id": "d",
        "label": "A need for external financing"
      }
    ],
    "explanation": "FCF represents the cash generated after capital expenditures (CapEx)."
  },
  "A:1.3-Q8": {
    "prompt": "In 2023, Apple Inc. posted a net margin of 25% and a P/E of 28. This suggests:",
    "choices": [
      {
        "id": "a",
        "label": "A fair valuation close to intrinsic value"
      },
      {
        "id": "b",
        "label": "A distressed company"
      },
      {
        "id": "c",
        "label": "A high D/E ratio"
      },
      {
        "id": "d",
        "label": "Low growth"
      }
    ],
    "explanation": "High margin + reasonable P/E = valuation aligned with fundamentals."
  },
  "A:1.3-Q9": {
    "prompt": "In 2022, Tesla traded at a P/E of 50+. This primarily reflects:",
    "choices": [
      {
        "id": "a",
        "label": "A discounted valuation"
      },
      {
        "id": "b",
        "label": "Very high future growth expectations"
      },
      {
        "id": "c",
        "label": "Low volatility"
      },
      {
        "id": "d",
        "label": "Zero debt"
      }
    ],
    "explanation": "A high P/E indicates that the market is pricing in strong future growth."
  },
  "A:1.4-Q1": {
    "prompt": "The Price-to-Earnings (P/E) ratio measures:",
    "choices": [
      {
        "id": "a",
        "label": "Valuation relative to earnings"
      },
      {
        "id": "b",
        "label": "Return on equity"
      },
      {
        "id": "c",
        "label": "The level of indebtedness"
      },
      {
        "id": "d",
        "label": "Liquidity"
      }
    ],
    "explanation": "P/E = Price / EPS. It indicates how many years of earnings are being paid."
  },
  "A:1.4-Q10": {
    "prompt": "Peer comparison analysis makes it possible to:",
    "choices": [
      {
        "id": "a",
        "label": "Identify justified or unjustified valuation gaps"
      },
      {
        "id": "b",
        "label": "Forecast foreign exchange rates"
      },
      {
        "id": "c",
        "label": "Measure inflation"
      },
      {
        "id": "d",
        "label": "Calculate GDP"
      }
    ],
    "explanation": "Benchmarking against peers helps detect overvaluation or undervaluation."
  },
  "A:1.4-Q11": {
    "prompt": "Why is the DCF model particularly sensitive to WACC?",
    "choices": [
      {
        "id": "a",
        "label": "Because a +1% shift in WACC = −15% to −20% in valuation"
      },
      {
        "id": "b",
        "label": "Because WACC has no impact"
      },
      {
        "id": "c",
        "label": "Because WACC is fixed"
      },
      {
        "id": "d",
        "label": "Because WACC replaces growth"
      }
    ],
    "explanation": "WACC is the most critical input in a DCF model."
  },
  "A:1.4-Q12": {
    "prompt": "In Netflix's SWOT analysis, \"Global subscriber base\" is a:",
    "choices": [
      {
        "id": "a",
        "label": "Weakness"
      },
      {
        "id": "b",
        "label": "Strength"
      },
      {
        "id": "c",
        "label": "Threat"
      },
      {
        "id": "d",
        "label": "Opportunity"
      }
    ],
    "explanation": "It is a structural competitive advantage."
  },
  "A:1.4-Q13": {
    "prompt": "Why can an absolute multiple (e.g., P/E of 30) be misleading?",
    "choices": [
      {
        "id": "a",
        "label": "Because it depends on the sector and the economic cycle"
      },
      {
        "id": "b",
        "label": "Because 30 is always expensive"
      },
      {
        "id": "c",
        "label": "Because multiples are useless"
      },
      {
        "id": "d",
        "label": "Because the P/E ratio is illegal"
      }
    ],
    "explanation": "P/E 30 = expensive (utility) vs. normal (growth tech). Sector context is critical."
  },
  "A:1.4-Q14": {
    "prompt": "The \"terminal value\" in a DCF model typically represents:",
    "choices": [
      {
        "id": "a",
        "label": "10-20% of the total valuation"
      },
      {
        "id": "b",
        "label": "60-80% of the total valuation"
      },
      {
        "id": "c",
        "label": "0% of the valuation"
      },
      {
        "id": "d",
        "label": "Net debt"
      }
    ],
    "explanation": "Most of the value comes from distant cash flows, hence the sensitivity to assumptions."
  },
  "A:1.4-Q15": {
    "prompt": "Why does the fundamental analysis of a bank differ from that of a tech company?",
    "choices": [
      {
        "id": "a",
        "label": "Because banks do not have a balance sheet"
      },
      {
        "id": "b",
        "label": "Because key metrics differ (NIM, CET1, provisions vs. ARR, churn)"
      },
      {
        "id": "c",
        "label": "Because banks are not publicly traded"
      },
      {
        "id": "d",
        "label": "Because fundamental analysis does not apply to banks"
      }
    ],
    "explanation": "Each sector has its own ratios and value drivers."
  },
  "A:1.4-Q2": {
    "prompt": "The DCF (Discounted Cash Flow) model estimates intrinsic value using:",
    "choices": [
      {
        "id": "a",
        "label": "Discounted future cash flows"
      },
      {
        "id": "b",
        "label": "The average stock price"
      },
      {
        "id": "c",
        "label": "Trading volumes"
      },
      {
        "id": "d",
        "label": "Analyst sentiment"
      }
    ],
    "explanation": "DCF = sum of discounted future FCFs + terminal value."
  },
  "A:1.4-Q3": {
    "prompt": "Sector analysis aims to:",
    "choices": [
      {
        "id": "a",
        "label": "Identify industry-specific trends and challenges"
      },
      {
        "id": "b",
        "label": "Predict the price of oil"
      },
      {
        "id": "c",
        "label": "Measure inflation"
      },
      {
        "id": "d",
        "label": "Calculate GDP"
      }
    ],
    "explanation": "It compares performance within a sector to identify leaders and laggards."
  },
  "A:1.4-Q4": {
    "prompt": "A SWOT analysis examines:",
    "choices": [
      {
        "id": "a",
        "label": "Strengths, weaknesses, opportunities, and threats"
      },
      {
        "id": "b",
        "label": "Salaries and costs"
      },
      {
        "id": "c",
        "label": "Interest rates and inflation"
      },
      {
        "id": "d",
        "label": "Volumes and volatility"
      }
    ],
    "explanation": "SWOT = qualitative strategic assessment tool."
  },
  "A:1.4-Q5": {
    "prompt": "A D/E ratio < 1 is generally interpreted as:",
    "choices": [
      {
        "id": "a",
        "label": "Excessive leverage"
      },
      {
        "id": "b",
        "label": "Reasonable financial health"
      },
      {
        "id": "c",
        "label": "Low profitability"
      },
      {
        "id": "d",
        "label": "Insufficient liquidity"
      }
    ],
    "explanation": "Less debt than equity = conservative capital structure."
  },
  "A:1.4-Q6": {
    "prompt": "The P/B (Price-to-Book) ratio compares:",
    "choices": [
      {
        "id": "a",
        "label": "Share price to book value per share"
      },
      {
        "id": "b",
        "label": "Net income to dividends"
      },
      {
        "id": "c",
        "label": "Debt to revenue"
      },
      {
        "id": "d",
        "label": "Price to cash flow"
      }
    ],
    "explanation": "Useful for valuing asset-intensive companies (banks, industrials)."
  },
  "A:1.4-Q7": {
    "prompt": "In a DCF model, WACC represents:",
    "choices": [
      {
        "id": "a",
        "label": "Revenue growth rate"
      },
      {
        "id": "b",
        "label": "Weighted average cost of capital"
      },
      {
        "id": "c",
        "label": "Earnings per share"
      },
      {
        "id": "d",
        "label": "Country risk discount rate"
      }
    ],
    "explanation": "WACC = weighted average cost of capital, the most sensitive input in a DCF model."
  },
  "A:1.4-Q8": {
    "prompt": "Why might Apple's P/E (28 in 2023) be considered above the sector average?",
    "choices": [
      {
        "id": "a",
        "label": "Because Apple is bankrupt"
      },
      {
        "id": "b",
        "label": "Because the premium reflects quality, ecosystem, and services growth"
      },
      {
        "id": "c",
        "label": "Because the tech sector has an average P/E of 50"
      },
      {
        "id": "d",
        "label": "Because the P/E ratio does not matter"
      }
    ],
    "explanation": "A premium is justified by sustainable competitive advantages."
  },
  "A:1.4-Q9": {
    "prompt": "Comparing Tesla vs. Ford (P/E 50 vs. 10) reflects:",
    "choices": [
      {
        "id": "a",
        "label": "That Ford is always better"
      },
      {
        "id": "b",
        "label": "Different growth prospects and risk profiles"
      },
      {
        "id": "c",
        "label": "That Tesla is undervalued"
      },
      {
        "id": "d",
        "label": "That the P/E ratio is useless"
      }
    ],
    "explanation": "A high P/E = expected growth; a low P/E = maturity or distress."
  },
  "A:1.5-Q1": {
    "prompt": "Financial forecasts combine:",
    "choices": [
      {
        "id": "a",
        "label": "Historical data, sector trends, and economic projections"
      },
      {
        "id": "b",
        "label": "Only historical data"
      },
      {
        "id": "c",
        "label": "Only analyst opinions"
      },
      {
        "id": "d",
        "label": "Technical charts only"
      }
    ],
    "explanation": "Forecasting is a multi-input process."
  },
  "A:1.5-Q10": {
    "prompt": "Why must an invalidation level always be defined prior to entering a position?",
    "choices": [
      {
        "id": "a",
        "label": "Because it is an AMF regulation"
      },
      {
        "id": "b",
        "label": "Because a scenario without an exit leads to confirmation bias"
      },
      {
        "id": "c",
        "label": "Because stop-losses are prohibited"
      },
      {
        "id": "d",
        "label": "Because invalidation is optional"
      }
    ],
    "explanation": "Defining the exit before entering prevents post-hoc rationalization bias."
  },
  "A:1.5-Q11": {
    "prompt": "Forecasting gold at $2,000/oz \"in the event of geopolitical tensions\" is an example of:",
    "choices": [
      {
        "id": "a",
        "label": "Technical analysis"
      },
      {
        "id": "b",
        "label": "A conditional macroeconomic scenario"
      },
      {
        "id": "c",
        "label": "Market manipulation"
      },
      {
        "id": "d",
        "label": "Historical data"
      }
    ],
    "explanation": "This is a forecast contingent upon an external catalyst."
  },
  "A:1.5-Q12": {
    "prompt": "Why do the Fed's interest rate forecasts impact bonds?",
    "choices": [
      {
        "id": "a",
        "label": "Because bonds are sensitive to interest rates (duration)"
      },
      {
        "id": "b",
        "label": "Because the Fed buys bonds"
      },
      {
        "id": "c",
        "label": "Because bonds yield zero return"
      },
      {
        "id": "d",
        "label": "Because rates are fixed"
      }
    ],
    "explanation": "Duration measures the price sensitivity of a bond to interest rate changes."
  },
  "A:1.5-Q13": {
    "prompt": "A pessimistic scenario for the automotive industry (-10% in the event of a recession) illustrates:",
    "choices": [
      {
        "id": "a",
        "label": "The importance of stress testing"
      },
      {
        "id": "b",
        "label": "That the automotive sector is risk-free"
      },
      {
        "id": "c",
        "label": "That recessions do not exist"
      },
      {
        "id": "d",
        "label": "That scenarios are useless"
      }
    ],
    "explanation": "Stress testing assesses resilience to macro shocks."
  },
  "A:1.5-Q14": {
    "prompt": "The total probability of the three scenarios (bull, base, bear) must be:",
    "choices": [
      {
        "id": "a",
        "label": "Greater than 100%"
      },
      {
        "id": "b",
        "label": "Equal to 100%"
      },
      {
        "id": "c",
        "label": "Less than 50%"
      },
      {
        "id": "d",
        "label": "Variable depending on the market"
      }
    ],
    "explanation": "It represents a complete probability distribution."
  },
  "A:1.5-Q15": {
    "prompt": "Why are long-term forecasts (5-10 years) inherently less reliable?",
    "choices": [
      {
        "id": "a",
        "label": "Because the cumulative uncertainty of assumptions compounds exponentially"
      },
      {
        "id": "b",
        "label": "Because analysts are incompetent"
      },
      {
        "id": "c",
        "label": "Because historical data does not exist"
      },
      {
        "id": "d",
        "label": "Because markets are perfect"
      }
    ],
    "explanation": "Small variances in assumptions compound over time."
  },
  "A:1.5-Q2": {
    "prompt": "Historical trend analysis aims to:",
    "choices": [
      {
        "id": "a",
        "label": "Identify patterns in revenue and earnings"
      },
      {
        "id": "b",
        "label": "Predict the weather"
      },
      {
        "id": "c",
        "label": "Calculate GDP"
      },
      {
        "id": "d",
        "label": "Measure inflation"
      }
    ],
    "explanation": "It relies on the continuity of past performance."
  },
  "A:1.5-Q3": {
    "prompt": "\"Raised\" guidance by a company is generally interpreted as:",
    "choices": [
      {
        "id": "a",
        "label": "A negative signal"
      },
      {
        "id": "b",
        "label": "A positive signal regarding future prospects"
      },
      {
        "id": "c",
        "label": "Of no impact"
      },
      {
        "id": "d",
        "label": "Market manipulation"
      }
    ],
    "explanation": "Management confirms better-than-expected performance."
  },
  "A:1.5-Q4": {
    "prompt": "In scenario modeling, analysts typically prepare:",
    "choices": [
      {
        "id": "a",
        "label": "A single optimistic scenario"
      },
      {
        "id": "b",
        "label": "Three scenarios (bull, base, bear)"
      },
      {
        "id": "c",
        "label": "A single risk-free scenario"
      },
      {
        "id": "d",
        "label": "No scenarios"
      }
    ],
    "explanation": "Multi-scenario modeling enables the assessment of risk/reward asymmetry."
  },
  "A:1.5-Q5": {
    "prompt": "The \"expected value\" in a scenario planner is calculated as:",
    "choices": [
      {
        "id": "a",
        "label": "The simple average of the three scenarios"
      },
      {
        "id": "b",
        "label": "Σ(probability × scenario valuation)"
      },
      {
        "id": "c",
        "label": "The most probable scenario only"
      },
      {
        "id": "d",
        "label": "The median of the scenarios"
      }
    ],
    "explanation": "It is the probability-weighted sum of the scenario values."
  },
  "A:1.5-Q6": {
    "prompt": "Why is guidance often more important than the current beat/miss?",
    "choices": [
      {
        "id": "a",
        "label": "Because it shapes the market's forward-looking expectations"
      },
      {
        "id": "b",
        "label": "Because the past does not matter"
      },
      {
        "id": "c",
        "label": "Because current earnings reports are inaccurate"
      },
      {
        "id": "d",
        "label": "Because guidance is mandatory"
      }
    ],
    "explanation": "Markets are forward-looking; lowered guidance can drive down the share price despite an earnings beat."
  },
  "A:1.5-Q7": {
    "prompt": "A \"risk-free\" forecast scenario is:",
    "choices": [
      {
        "id": "a",
        "label": "Ideal for decision-making"
      },
      {
        "id": "b",
        "label": "A dangerous cognitive bias"
      },
      {
        "id": "c",
        "label": "Recommended by central banks"
      },
      {
        "id": "d",
        "label": "Always accurate"
      }
    ],
    "explanation": "Failing to prepare for an adverse scenario means having no exit plan."
  },
  "A:1.5-Q8": {
    "prompt": "If a stock's expected value is higher than its current price, this suggests:",
    "choices": [
      {
        "id": "a",
        "label": "Positive asymmetry (upside)"
      },
      {
        "id": "b",
        "label": "Negative asymmetry (downside)"
      },
      {
        "id": "c",
        "label": "That the market is always right"
      },
      {
        "id": "d",
        "label": "That one should sell immediately"
      }
    ],
    "explanation": "This indicates potential undervaluation based on the model's assumptions."
  },
  "A:1.5-Q9": {
    "prompt": "An EPS beat of 1-2% relative to consensus is generally considered:",
    "choices": [
      {
        "id": "a",
        "label": "A strong signal"
      },
      {
        "id": "b",
        "label": "Minor market noise"
      },
      {
        "id": "c",
        "label": "A catastrophe"
      },
      {
        "id": "d",
        "label": "A dividend"
      }
    ],
    "explanation": "A small deviation may be driven by non-recurring accounting items."
  },
  "B:1.1-WQ1": {
    "prompt": "In the MarketDriverVisualizer, the causal chain is displayed as:",
    "choices": [
      {
        "id": "a",
        "label": "A table of figures"
      },
      {
        "id": "b",
        "label": "Driver → Channel → Impacted Asset → Invalidation"
      },
      {
        "id": "c",
        "label": "A pie chart"
      },
      {
        "id": "d",
        "label": "An alphabetical list"
      }
    ],
    "explanation": "The logic is causal transmission with an explicit exit condition."
  },
  "B:1.1-WQ10": {
    "prompt": "Why is the MacroRegimeRadar more useful than an isolated macro indicator?",
    "choices": [
      {
        "id": "a",
        "label": "Because it is more colorful"
      },
      {
        "id": "b",
        "label": "Because it forces a multidimensional view (combining multiple factors)"
      },
      {
        "id": "c",
        "label": "Because it predicts the exact price"
      },
      {
        "id": "d",
        "label": "Because it replaces technical analysis"
      }
    ],
    "explanation": "Macro is multifactorial; the radar avoids single-variable diagnoses."
  },
  "B:1.1-WQ2": {
    "prompt": "The MacroRegimeRadar displays 4 main regimes. Which one corresponds to \"strong growth + moderate inflation\"?",
    "choices": [
      {
        "id": "a",
        "label": "Stagflation"
      },
      {
        "id": "b",
        "label": "Recession"
      },
      {
        "id": "c",
        "label": "Goldilocks"
      },
      {
        "id": "d",
        "label": "Deflation"
      }
    ],
    "explanation": "Goldilocks = healthy growth + controlled inflation."
  },
  "B:1.1-WQ3": {
    "prompt": "In the MarketDriverVisualizer, \"invalidation\" represents:",
    "choices": [
      {
        "id": "a",
        "label": "A calculation error"
      },
      {
        "id": "b",
        "label": "The exit condition that renders the thesis void"
      },
      {
        "id": "c",
        "label": "A forced buy"
      },
      {
        "id": "d",
        "label": "Positive news"
      }
    ],
    "explanation": "It is the risk management mechanism: when the thesis is invalidated, you exit."
  },
  "B:1.1-WQ4": {
    "prompt": "On the MacroRegimeRadar, the \"Liquidity\" axis primarily measures:",
    "choices": [
      {
        "id": "a",
        "label": "Trading volume"
      },
      {
        "id": "b",
        "label": "Monetary policy (QE/QT, policy rates)"
      },
      {
        "id": "c",
        "label": "The number of employees"
      },
      {
        "id": "d",
        "label": "GDP"
      }
    ],
    "explanation": "Liquidity = monetary policy, credit spreads, financial conditions."
  },
  "B:1.1-WQ5": {
    "prompt": "The \"Stagflation\" regime on the radar generally implies:",
    "choices": [
      {
        "id": "a",
        "label": "Bullish equities + bullish bonds"
      },
      {
        "id": "b",
        "label": "Low growth + high inflation"
      },
      {
        "id": "c",
        "label": "Strong growth + zero inflation"
      },
      {
        "id": "d",
        "label": "Deflation + low unemployment"
      }
    ],
    "explanation": "Stagflation = economic stagnation + persistent inflation."
  },
  "B:1.1-WQ6": {
    "prompt": "In the MarketDriverVisualizer, if the selected driver is \"Strong NFP\", the transmission channel to the USD is:",
    "choices": [
      {
        "id": "a",
        "label": "Fiscal policy"
      },
      {
        "id": "b",
        "label": "Monetary policy (real rates, Fed expectations)"
      },
      {
        "id": "c",
        "label": "Trade balance"
      },
      {
        "id": "d",
        "label": "Nothing, NFP does not impact the USD"
      }
    ],
    "explanation": "Strong NFP → hawkish Fed → rates ↑ → USD ↑."
  },
  "B:1.1-WQ7": {
    "prompt": "The MacroRegimeRadar uses a 6-axis polygon. Which of these axes is NOT displayed?",
    "choices": [
      {
        "id": "a",
        "label": "GDP"
      },
      {
        "id": "b",
        "label": "Inflation"
      },
      {
        "id": "c",
        "label": "Policy rates"
      },
      {
        "id": "d",
        "label": "Dividends"
      }
    ],
    "explanation": "The 6 axes are: GDP, CPI, Rates, Liquidity, Sentiment, Credit."
  },
  "B:1.1-WQ8": {
    "prompt": "If the radar indicates a high score on \"Inflation\" and \"Rates\", but a low score on \"GDP\", the likely regime is:",
    "choices": [
      {
        "id": "a",
        "label": "Expansion"
      },
      {
        "id": "b",
        "label": "Stagflation"
      },
      {
        "id": "c",
        "label": "Goldilocks"
      },
      {
        "id": "d",
        "label": "Pure recession"
      }
    ],
    "explanation": "High inflation + low growth = Stagflation."
  },
  "B:1.1-WQ9": {
    "prompt": "In the MarketDriverVisualizer, the invalidation of a \"Strong GDP\" driver could be:",
    "choices": [
      {
        "id": "a",
        "label": "A downward revision of GDP"
      },
      {
        "id": "b",
        "label": "A rise in wages"
      },
      {
        "id": "c",
        "label": "A drop in unemployment"
      },
      {
        "id": "d",
        "label": "A trade surplus"
      }
    ],
    "explanation": "If GDP is revised downward, the strong growth thesis falls apart."
  },
  "B:1.2-WQ1": {
    "prompt": "The MacroDashboard displays 11 indicators in the form of:",
    "choices": [
      {
        "id": "a",
        "label": "A single line chart"
      },
      {
        "id": "b",
        "label": "Summary tiles (Actual / Consensus / Previous)"
      },
      {
        "id": "c",
        "label": "An Excel spreadsheet"
      },
      {
        "id": "d",
        "label": "A geographic map"
      }
    ],
    "explanation": "It is a command center with category filters and a detail modal."
  },
  "B:1.2-WQ10": {
    "prompt": "On the YieldCurveVisualizer, a \"flat\" curve suggests:",
    "choices": [
      {
        "id": "a",
        "label": "Imminent explosive growth"
      },
      {
        "id": "b",
        "label": "An economic transition or uncertainty"
      },
      {
        "id": "c",
        "label": "Runaway inflation"
      },
      {
        "id": "d",
        "label": "A sovereign default"
      }
    ],
    "explanation": "Flat curve = market uncertain about the future direction."
  },
  "B:1.2-WQ11": {
    "prompt": "In the MacroDashboard, an indicator displaying \"Beat\" with consensus exceeded means:",
    "choices": [
      {
        "id": "a",
        "label": "Actual is below consensus"
      },
      {
        "id": "b",
        "label": "Actual is above consensus"
      },
      {
        "id": "c",
        "label": "Actual equals consensus"
      },
      {
        "id": "d",
        "label": "The indicator is cancelled"
      }
    ],
    "explanation": "Beat = actual > consensus (positive surprise)."
  },
  "B:1.2-WQ12": {
    "prompt": "The EconomicCycleWheel allows distinguishing:",
    "choices": [
      {
        "id": "a",
        "label": "The economic cycle (macro phases) from the price trend (direction)"
      },
      {
        "id": "b",
        "label": "The dishwasher cycle"
      },
      {
        "id": "c",
        "label": "GDP and inflation only"
      },
      {
        "id": "d",
        "label": "Rates and currencies"
      }
    ],
    "explanation": "Cycle ≠ trend. The wheel illustrates macro phases, not price charts."
  },
  "B:1.2-WQ13": {
    "prompt": "In the FedSimulator, the combination of 5% CPI + 300K NFP likely produces a decision that is:",
    "choices": [
      {
        "id": "a",
        "label": "Dovish (rate cut)"
      },
      {
        "id": "b",
        "label": "Hawkish (rate hike or hold)"
      },
      {
        "id": "c",
        "label": "Neutral with no change"
      },
      {
        "id": "d",
        "label": "Unlimited QE"
      }
    ],
    "explanation": "Hot inflation + strong employment = restrictive Fed."
  },
  "B:1.2-WQ14": {
    "prompt": "On the IntermarketCorrelationMap, a breakdown in historical correlation (gray) between gold and the DXY can signal:",
    "choices": [
      {
        "id": "a",
        "label": "A return to normal"
      },
      {
        "id": "b",
        "label": "A systemic shock or a macro regime shift"
      },
      {
        "id": "c",
        "label": "A data error"
      },
      {
        "id": "d",
        "label": "Nothing in particular"
      }
    ],
    "explanation": "Sudden decorrelation = crisis or paradigm shift."
  },
  "B:1.2-WQ15": {
    "prompt": "The NfpInterpreter cross-references NFP with average hourly earnings because:",
    "choices": [
      {
        "id": "a",
        "label": "Wages are merely decorative"
      },
      {
        "id": "b",
        "label": "Wage pressure fuels inflation (wage-price spiral)"
      },
      {
        "id": "c",
        "label": "Wages have no connection to the Fed"
      },
      {
        "id": "d",
        "label": "NFP alone is sufficient"
      }
    ],
    "explanation": "NFP + wages = comprehensive read on the labor market for the Fed."
  },
  "B:1.2-WQ2": {
    "prompt": "In the EconomicCycleWheel, the \"Recession\" phase typically favors:",
    "choices": [
      {
        "id": "a",
        "label": "Cyclical equities"
      },
      {
        "id": "b",
        "label": "Gold and sovereign bonds"
      },
      {
        "id": "c",
        "label": "Emerging market currencies"
      },
      {
        "id": "d",
        "label": "Industrial commodities"
      }
    ],
    "explanation": "Recession = flight to quality (safe havens)."
  },
  "B:1.2-WQ3": {
    "prompt": "The FedSimulator uses two main sliders:",
    "choices": [
      {
        "id": "a",
        "label": "GDP and trade balance"
      },
      {
        "id": "b",
        "label": "CPI and NFP"
      },
      {
        "id": "c",
        "label": "Gold and oil"
      },
      {
        "id": "d",
        "label": "Equities and bonds"
      }
    ],
    "explanation": "The Fed decision matrix crosses inflation and employment."
  },
  "B:1.2-WQ4": {
    "prompt": "In the NfpInterpreter, a +2σ (sigma) surprise is interpreted as:",
    "choices": [
      {
        "id": "a",
        "label": "Statistical noise"
      },
      {
        "id": "b",
        "label": "A strong signal likely to trigger a Fed reaction"
      },
      {
        "id": "c",
        "label": "Having no market impact"
      },
      {
        "id": "d",
        "label": "A lagging indicator"
      }
    ],
    "explanation": ">2σ = exceptional magnitude = probable institutional reaction."
  },
  "B:1.2-WQ5": {
    "prompt": "The YieldCurveVisualizer displays an \"inverted\" curve when:",
    "choices": [
      {
        "id": "a",
        "label": "Long-term rates are higher than short-term rates"
      },
      {
        "id": "b",
        "label": "Short-term rates are higher than long-term rates (e.g., 2Y > 10Y)"
      },
      {
        "id": "c",
        "label": "All rates are zero"
      },
      {
        "id": "d",
        "label": "The Fed cuts rates"
      }
    ],
    "explanation": "2Y/10Y inversion = classic recession signal."
  },
  "B:1.2-WQ6": {
    "prompt": "In the GdpCpiInterpreters, the combination of strong GDP + low CPI corresponds to the regime:",
    "choices": [
      {
        "id": "a",
        "label": "Stagflation"
      },
      {
        "id": "b",
        "label": "Goldilocks"
      },
      {
        "id": "c",
        "label": "Recession"
      },
      {
        "id": "d",
        "label": "Hyperinflation"
      }
    ],
    "explanation": "Healthy growth + controlled inflation = ideal environment."
  },
  "B:1.2-WQ7": {
    "prompt": "The IntermarketCorrelationMap shows a negative (red) correlation between DXY and EUR/USD. This means:",
    "choices": [
      {
        "id": "a",
        "label": "When the dollar rises, the euro tends to fall"
      },
      {
        "id": "b",
        "label": "Both rise together"
      },
      {
        "id": "c",
        "label": "No link between the two"
      },
      {
        "id": "d",
        "label": "The correlation is decorative"
      }
    ],
    "explanation": "Negative correlation = inverse movements."
  },
  "B:1.2-WQ8": {
    "prompt": "In the MacroIndicatorLab, the \"surprise\" is calculated as:",
    "choices": [
      {
        "id": "a",
        "label": "Consensus − Actual"
      },
      {
        "id": "b",
        "label": "Actual − Consensus"
      },
      {
        "id": "c",
        "label": "Actual + Consensus"
      },
      {
        "id": "d",
        "label": "Actual / Consensus"
      }
    ],
    "explanation": "Surprise = Actual − Consensus (beat if > 0, miss if < 0)."
  },
  "B:1.2-WQ9": {
    "prompt": "The MacroRelationshipEngine displays a chain: CPI ↑ → Fed hawkish → USD ↑. The transmission mechanism is:",
    "choices": [
      {
        "id": "a",
        "label": "Contractionary monetary policy strengthens the currency"
      },
      {
        "id": "b",
        "label": "Inflation always weakens the currency"
      },
      {
        "id": "c",
        "label": "The Fed buys currencies"
      },
      {
        "id": "d",
        "label": "The USD rises for no reason"
      }
    ],
    "explanation": "Hawkish = rates ↑ → capital attractiveness → currency ↑."
  },
  "B:1.3-WQ1": {
    "prompt": "The CompanyHealthScore aggregates 4 dimensions. Which one is NOT included?",
    "choices": [
      {
        "id": "a",
        "label": "Growth"
      },
      {
        "id": "b",
        "label": "Margins"
      },
      {
        "id": "c",
        "label": "Debt"
      },
      {
        "id": "d",
        "label": "Dividend"
      }
    ],
    "explanation": "The 4 dimensions are: Growth, Margins, Debt, Liquidity."
  },
  "B:1.3-WQ10": {
    "prompt": "Why is high ROE achieved via leverage (debt) flagged as \"fragile\" in FinancialRatios?",
    "choices": [
      {
        "id": "a",
        "label": "Because debt increases financial risk in the event of a shock"
      },
      {
        "id": "b",
        "label": "Because debt is prohibited"
      },
      {
        "id": "c",
        "label": "Because the ROE is fake"
      },
      {
        "id": "d",
        "label": "Because shareholders prefer cash"
      }
    ],
    "explanation": "Artificially inflated ROE = bankruptcy risk if interest rates rise."
  },
  "B:1.3-WQ11": {
    "prompt": "In BalanceSheetExplorer, a \"Current Ratio\" < 1 specifically means:",
    "choices": [
      {
        "id": "a",
        "label": "The company cannot cover its short-term liabilities with its current assets"
      },
      {
        "id": "b",
        "label": "The company is highly profitable"
      },
      {
        "id": "c",
        "label": "The company has excess cash"
      },
      {
        "id": "d",
        "label": "Nothing in particular"
      }
    ],
    "explanation": "It is a liquidity warning signal."
  },
  "B:1.3-WQ12": {
    "prompt": "Why does the CompanyHealthScore weight \"Growth\" at 30% and \"Liquidity\" at 20%?",
    "choices": [
      {
        "id": "a",
        "label": "Because growth is the best predictor of long-term value creation"
      },
      {
        "id": "b",
        "label": "Because liquidity does not matter"
      },
      {
        "id": "c",
        "label": "Because the weights are random"
      },
      {
        "id": "d",
        "label": "Because debt is more important"
      }
    ],
    "explanation": "Growth is the primary driver, but liquidity remains critical (20%)."
  },
  "B:1.3-WQ2": {
    "prompt": "In the BalanceSheetExplorer, the fundamental equation is:",
    "choices": [
      {
        "id": "a",
        "label": "Assets = Liabilities + Equity"
      },
      {
        "id": "b",
        "label": "Revenue = Earnings + Dividends"
      },
      {
        "id": "c",
        "label": "Debt = Assets − Cash"
      },
      {
        "id": "d",
        "label": "Equity = Debt × ROE"
      }
    ],
    "explanation": "This is the foundation of double-entry bookkeeping."
  },
  "B:1.3-WQ3": {
    "prompt": "The CompanyDashboard displays KPIs as:",
    "choices": [
      {
        "id": "a",
        "label": "Pie chart"
      },
      {
        "id": "b",
        "label": "Summary tiles with cross-analysis"
      },
      {
        "id": "c",
        "label": "Raw Excel spreadsheet"
      },
      {
        "id": "d",
        "label": "Geographic map"
      }
    ],
    "explanation": "This provides a rapid executive summary for micro diagnosis."
  },
  "B:1.3-WQ4": {
    "prompt": "A CompanyHealthScore > 75 is interpreted as:",
    "choices": [
      {
        "id": "a",
        "label": "An immediate red flag"
      },
      {
        "id": "b",
        "label": "Institutional quality"
      },
      {
        "id": "c",
        "label": "An excessive valuation"
      },
      {
        "id": "d",
        "label": "A bankruptcy risk"
      }
    ],
    "explanation": "> 75 indicates a solid company across all 4 dimensions."
  },
  "B:1.3-WQ5": {
    "prompt": "In FinancialRatios, an ROE > 15% is generally considered:",
    "choices": [
      {
        "id": "a",
        "label": "Weak"
      },
      {
        "id": "b",
        "label": "Institutional quality"
      },
      {
        "id": "c",
        "label": "Negative"
      },
      {
        "id": "d",
        "label": "Irrelevant"
      }
    ],
    "explanation": "Classic benchmark threshold for return on equity."
  },
  "B:1.3-WQ6": {
    "prompt": "The Current Ratio in FinancialRatios measures:",
    "choices": [
      {
        "id": "a",
        "label": "Profitability"
      },
      {
        "id": "b",
        "label": "Short-term liquidity (current assets / current liabilities)"
      },
      {
        "id": "c",
        "label": "Total leverage"
      },
      {
        "id": "d",
        "label": "Growth"
      }
    ],
    "explanation": "< 1 indicates short-term default risk."
  },
  "B:1.3-WQ7": {
    "prompt": "In the BalanceSheetExplorer, if Assets < Liabilities, the company is:",
    "choices": [
      {
        "id": "a",
        "label": "Highly profitable"
      },
      {
        "id": "b",
        "label": "Technically insolvent"
      },
      {
        "id": "c",
        "label": "Growing"
      },
      {
        "id": "d",
        "label": "Undervalued"
      }
    ],
    "explanation": "Accounting equilibrium is breached, signaling technical insolvency."
  },
  "B:1.3-WQ8": {
    "prompt": "The CompanyDashboard suggests that a single KPI \"tells no story.\" Why?",
    "choices": [
      {
        "id": "a",
        "label": "Because KPIs are inaccurate"
      },
      {
        "id": "b",
        "label": "Because Growth + Margins + Debt + Cash must be analyzed together"
      },
      {
        "id": "c",
        "label": "Because dashboards are useless"
      },
      {
        "id": "d",
        "label": "Because markets are efficient"
      }
    ],
    "explanation": "Microeconomic analysis requires considering metrics together (e.g., profitable but overleveraged = fragile)."
  },
  "B:1.3-WQ9": {
    "prompt": "A D/E ratio < 1 in FinancialRatios indicates:",
    "choices": [
      {
        "id": "a",
        "label": "More equity than debt"
      },
      {
        "id": "b",
        "label": "More debt than equity"
      },
      {
        "id": "c",
        "label": "Zero debt"
      },
      {
        "id": "d",
        "label": "Imminent bankruptcy"
      }
    ],
    "explanation": "Conservative capital structure."
  },
  "B:1.4-WQ1": {
    "prompt": "The ValuationLab allows you to test:",
    "choices": [
      {
        "id": "a",
        "label": "Liquidity ratios"
      },
      {
        "id": "b",
        "label": "P/E, P/S, and P/B multiples and their sector premium/discount"
      },
      {
        "id": "c",
        "label": "Exchange rates"
      },
      {
        "id": "d",
        "label": "Inflation"
      }
    ],
    "explanation": "It is a multiples-based valuation laboratory."
  },
  "B:1.4-WQ10": {
    "prompt": "In the DcfSimulator, a perpetual growth rate of 6% is:",
    "choices": [
      {
        "id": "a",
        "label": "Conservative"
      },
      {
        "id": "b",
        "label": "Aggressive and likely excessive"
      },
      {
        "id": "c",
        "label": "Standard"
      },
      {
        "id": "d",
        "label": "Prohibited"
      }
    ],
    "explanation": "The perpetual growth rate cannot exceed long-term economic growth (2-4%)."
  },
  "B:1.4-WQ11": {
    "prompt": "The PeerComparisonMatrix can reveal a \"value trap\" when:",
    "choices": [
      {
        "id": "a",
        "label": "The P/E is low but growth is negative and debt is high"
      },
      {
        "id": "b",
        "label": "The P/E is high"
      },
      {
        "id": "c",
        "label": "The company is the market leader"
      },
      {
        "id": "d",
        "label": "The sector is expanding"
      }
    ],
    "explanation": "A low multiple justified by deteriorating fundamentals is not a value opportunity."
  },
  "B:1.4-WQ12": {
    "prompt": "Why does the EarningsImpactEngine cross-reference the beat/miss with guidance?",
    "choices": [
      {
        "id": "a",
        "label": "Because guidance shapes future expectations more than past results"
      },
      {
        "id": "b",
        "label": "Because the past does not matter"
      },
      {
        "id": "c",
        "label": "Because guidance is mandatory"
      },
      {
        "id": "d",
        "label": "Because a beat is always positive"
      }
    ],
    "explanation": "The market is forward-looking. Guidance drives the readjustment of financial models."
  },
  "B:1.4-WQ2": {
    "prompt": "In the DcfSimulator, the most sensitive parameter is:",
    "choices": [
      {
        "id": "a",
        "label": "Revenue growth"
      },
      {
        "id": "b",
        "label": "WACC"
      },
      {
        "id": "c",
        "label": "Net margin"
      },
      {
        "id": "d",
        "label": "Headcount"
      }
    ],
    "explanation": "+1% WACC = -15% to -20% in valuation."
  },
  "B:1.4-WQ3": {
    "prompt": "The PeerComparisonMatrix compares a company to:",
    "choices": [
      {
        "id": "a",
        "label": "Peers within the same sector"
      },
      {
        "id": "b",
        "label": "Random companies"
      },
      {
        "id": "c",
        "label": "Stock market indices"
      },
      {
        "id": "d",
        "label": "Central banks"
      }
    ],
    "explanation": "It provides a peer-group comparison."
  },
  "B:1.4-WQ4": {
    "prompt": "In the EarningsImpactEngine, a \"Beat + Guidance Lowered\" is generally interpreted as:",
    "choices": [
      {
        "id": "a",
        "label": "Highly positive"
      },
      {
        "id": "b",
        "label": "Often negative (the market prioritizes the forward outlook)"
      },
      {
        "id": "c",
        "label": "Neutral"
      },
      {
        "id": "d",
        "label": "No impact"
      }
    ],
    "explanation": "Guidance outweighs the current beat. Lowered guidance signals an expected deterioration."
  },
  "B:1.4-WQ5": {
    "prompt": "The DcfSimulator shows the \"terminal value\" as representing:",
    "choices": [
      {
        "id": "a",
        "label": "5% of the valuation"
      },
      {
        "id": "b",
        "label": "60-80% of total valuation"
      },
      {
        "id": "c",
        "label": "Net debt"
      },
      {
        "id": "d",
        "label": "Dividends"
      }
    ],
    "explanation": "The majority of the intrinsic value comes from distant cash flows."
  },
  "B:1.4-WQ6": {
    "prompt": "In ValuationLab, a multiple above the sector median indicates:",
    "choices": [
      {
        "id": "a",
        "label": "An automatic discount"
      },
      {
        "id": "b",
        "label": "A premium (higher growth or quality)"
      },
      {
        "id": "c",
        "label": "A calculation error"
      },
      {
        "id": "d",
        "label": "A red flag"
      }
    ],
    "explanation": "A premium justified by superior fundamentals."
  },
  "B:1.4-WQ7": {
    "prompt": "PeerComparisonMatrix identifies a \"laggard\" as:",
    "choices": [
      {
        "id": "a",
        "label": "A company with high ROE and superior margins"
      },
      {
        "id": "b",
        "label": "A company with low multiples and compressed margins"
      },
      {
        "id": "c",
        "label": "A high-growth company"
      },
      {
        "id": "d",
        "label": "A debt-free company"
      }
    ],
    "explanation": "Laggard = structural sector underperformer."
  },
  "B:1.4-WQ8": {
    "prompt": "In EarningsImpactEngine, an EPS surprise > 5% is considered:",
    "choices": [
      {
        "id": "a",
        "label": "Market noise"
      },
      {
        "id": "b",
        "label": "A strong signal"
      },
      {
        "id": "c",
        "label": "Irrelevant"
      },
      {
        "id": "d",
        "label": "A special dividend"
      }
    ],
    "explanation": "> 5% = significant magnitude = probable price reaction."
  },
  "B:1.4-WQ9": {
    "prompt": "Why does ValuationLab suggest testing EPS sensitivity by ± 10%?",
    "choices": [
      {
        "id": "a",
        "label": "Because earnings results are always inaccurate"
      },
      {
        "id": "b",
        "label": "To assess valuation robustness against uncertainty"
      },
      {
        "id": "c",
        "label": "Because it is mandatory"
      },
      {
        "id": "d",
        "label": "To increase the P/E ratio"
      }
    ],
    "explanation": "Stress testing assumptions is central to institutional analysis."
  },
  "B:1.5-WQ1": {
    "prompt": "ForecastScenarioPlanner uses:",
    "choices": [
      {
        "id": "a",
        "label": "A single scenario"
      },
      {
        "id": "b",
        "label": "3 scenarios (bull, base, bear) + probabilities"
      },
      {
        "id": "c",
        "label": "10 identical scenarios"
      },
      {
        "id": "d",
        "label": "No scenario"
      }
    ],
    "explanation": "Expected value = Σ(probability × scenario valuation)."
  },
  "B:1.5-WQ10": {
    "prompt": "Why does ScenarioBuilder include an \"export\" step for the scenario?",
    "choices": [
      {
        "id": "a",
        "label": "To share and track it in a trading journal"
      },
      {
        "id": "b",
        "label": "To print it in color"
      },
      {
        "id": "c",
        "label": "Because it is mandatory"
      },
      {
        "id": "d",
        "label": "To sell it"
      }
    ],
    "explanation": "Exporting enables tracking, post-trade review, and refinement of the decision-making process."
  },
  "B:1.5-WQ2": {
    "prompt": "In ScenarioBuilder, a valid scenario must include:",
    "choices": [
      {
        "id": "a",
        "label": "Only a bullish thesis"
      },
      {
        "id": "b",
        "label": "Thesis + transmission mechanism + catalyst + invalidation"
      },
      {
        "id": "c",
        "label": "A technical chart"
      },
      {
        "id": "d",
        "label": "A buy order"
      }
    ],
    "explanation": "Scenario = why + how + when + exit."
  },
  "B:1.5-WQ3": {
    "prompt": "The sum of probabilities across the 3 scenarios in ForecastScenarioPlanner must equal:",
    "choices": [
      {
        "id": "a",
        "label": "50%"
      },
      {
        "id": "b",
        "label": "100%"
      },
      {
        "id": "c",
        "label": "150%"
      },
      {
        "id": "d",
        "label": "Variable"
      }
    ],
    "explanation": "It represents a complete probability distribution."
  },
  "B:1.5-WQ4": {
    "prompt": "The ScenarioBuilder requires defining an \"invalidation\" level because:",
    "choices": [
      {
        "id": "a",
        "label": "It is an AMF regulatory requirement"
      },
      {
        "id": "b",
        "label": "Without invalidation = confirmation bias, not a genuine scenario"
      },
      {
        "id": "c",
        "label": "Stop-losses are mandatory"
      },
      {
        "id": "d",
        "label": "Invalidation is optional"
      }
    ],
    "explanation": "Defining the exit before the entry = institutional discipline."
  },
  "B:1.5-WQ5": {
    "prompt": "If expected value > current price in the ForecastScenarioPlanner, this suggests:",
    "choices": [
      {
        "id": "a",
        "label": "Positive asymmetry (upside)"
      },
      {
        "id": "b",
        "label": "Overvaluation"
      },
      {
        "id": "c",
        "label": "A risk-free scenario"
      },
      {
        "id": "d",
        "label": "A calculation error"
      }
    ],
    "explanation": "The risk/reward asymmetry favors buying."
  },
  "B:1.5-WQ6": {
    "prompt": "In the ScenarioBuilder, the \"catalyst\" corresponds to:",
    "choices": [
      {
        "id": "a",
        "label": "The precise moment when the thesis is triggered"
      },
      {
        "id": "b",
        "label": "The chart's color scheme"
      },
      {
        "id": "c",
        "label": "The dividend"
      },
      {
        "id": "d",
        "label": "The D/E ratio"
      }
    ],
    "explanation": "When = triggering event (earnings release, policy decision)."
  },
  "B:1.5-WQ7": {
    "prompt": "Why does the ForecastScenarioPlanner require 3 scenarios rather than 1?",
    "choices": [
      {
        "id": "a",
        "label": "Because 1 scenario = absence of risk management"
      },
      {
        "id": "b",
        "label": "Because it is required by law"
      },
      {
        "id": "c",
        "label": "Because markets are predictable"
      },
      {
        "id": "d",
        "label": "Because 3 is a magic number"
      }
    ],
    "explanation": "Multi-scenario preparation = anticipating different states of the world."
  },
  "B:1.5-WQ8": {
    "prompt": "In the ScenarioBuilder, scenario \"validation\" corresponds to:",
    "choices": [
      {
        "id": "a",
        "label": "Acceptance by the central bank"
      },
      {
        "id": "b",
        "label": "Conditions confirming that the thesis is materializing"
      },
      {
        "id": "c",
        "label": "An algorithm"
      },
      {
        "id": "d",
        "label": "An analyst consensus"
      }
    ],
    "explanation": "It is the mirror of invalidation: when do I know that I am right?"
  },
  "B:1.5-WQ9": {
    "prompt": "A 70% probability assigned to the neutral scenario and 15% to each extreme in the ForecastScenarioPlanner suggests:",
    "choices": [
      {
        "id": "a",
        "label": "High confidence in the base-case scenario"
      },
      {
        "id": "b",
        "label": "Extreme uncertainty"
      },
      {
        "id": "c",
        "label": "An efficient market"
      },
      {
        "id": "d",
        "label": "A modeling error"
      }
    ],
    "explanation": "Concentrated distribution = low expected volatility, dominant base case."
  }
};
