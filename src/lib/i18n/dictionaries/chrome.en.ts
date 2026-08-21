// ============================================================================
// Namespace `chrome` (EN) — editorial adaptation, institutional register.
// ============================================================================

import type { ChromeDictionary } from "./chrome.fr";

export const chromeEn: ChromeDictionary = {
  hero: {
    missionControl: "Mission Control",
    edition: "World-Class Edition",
    startLab: "Enter the lab",
    seeCases: "Browse historical cases",
    statLessons: "Lessons",
    statWidgets: "Interactive widgets",
    statCases: "Redistributed cases",
  },
  briefing: {
    eyebrow: "Mission briefing",
    title: "Fundamental research desk — decision protocol",
    lead: "The chapter runs like an institutional workflow: macro signal, company diagnosis, valuation, scenarios, then execution on a live case. Every block ends in an observable decision, not passive reading.",
    points: [
      {
        label: "Read",
        title: "Identify the dominant driver",
        detail: "Growth, inflation, liquidity, balance sheet, valuation or political risk.",
      },
      {
        label: "Weigh",
        title: "Rank the market impact",
        detail: "Separate raw print, surprise, consensus and second-round reaction.",
      },
      {
        label: "Decide",
        title: "Turn analysis into a scenario",
        detail: "Build a thesis, an invalidation level and a cross-asset read.",
      },
    ],
    radarTitle: "Macro radar",
    radarSignals: {
      growth: "Growth",
      inflation: "Inflation",
      rates: "Rates",
      liquidity: "Liquidity",
    },
    radarBull: "Supportive regime while growth and real rates stay consistent.",
    radarBear: "Fragile regime when inflation and liquidity stress dominate.",
    skillEyebrow: "Skill unlock preview",
    skillTitle: "Skills unlocked section by section",
    skillModules: (done: number, total: number) => `${done}/${total} modules cleared`,
    hybridEyebrow: "Visual hybrid layer",
    hybridTitle: "Schematics rebuilt natively",
    hybridBadge: "4K-safe · no baked-in text",
    hybridAssets: {
      macro: "Macro engine",
      terminal: "Terminal density",
      map: "Institutional map",
    },
    hybridAssetAlt: (label: string) => `${label} visual reference for the Fundamental Analysis chapter`,
    hybridAssetLabel: (label: string) => `${label} · WebP hybrid reference`,
    schemas: [
      { title: "Inflation → rates → currency", left: "CPI", mid: "Central bank", right: "FX / Bonds" },
      { title: "Growth → earnings → multiples", left: "GDP", mid: "Revenue / margins", right: "P/E / DCF" },
      { title: "Energy shock → balance → risk", left: "Gas / oil", mid: "Terms of trade", right: "EUR / AUD" },
    ],
  },
  lesson: {
    objectives: "Lesson objectives",
    keyQuestion: "Key question",
    flow: "Flow",
    duration: "Duration",
    tier: "Tier",
    sectionOf: (num: string) => `Lesson ${num}`,
  },
  scenario: {
    eyebrow: "Case study",
    context: "Context",
    decision: "Your call",
    validate: "Submit my call",
    outcome: "What actually happened",
    explanation: "Institutional read",
    next: "Next case",
    replay: "Replay",
    correct: "Correct call",
    incorrect: "Call to revisit",
  },
  certification: {
    eyebrow: "Final certification",
    title: "Certification — Fundamental Analysis",
    lead: "The chapter's final exam: scripted cases, widget reading and trade-offs under constraint.",
    lockedTitle: "Certification locked",
    lockedBody: "Clear the five lessons of the chapter to open the final exam.",
    readyTitle: "Certification unlocked",
    readyBody: "Every lesson is cleared. You can start the final exam.",
    start: "Start the certification",
    back: "Back to the chapter",
    progress: "Chapter progress",
  },
};
