// ============================================================================
// EN dictionary — editorial ADAPTATION of the French reference, written for a
// financial reader (CFA / FT register). Never a literal translation.
// ============================================================================

import type { Dictionary } from "./fr";

export const en: Dictionary = {
  nav: {
    academy: "Academy",
    chapters: "Chapters",
    chapter1: "Fundamental Analysis",
    certification: "Certification",
    account: "Account",
    signIn: "Sign in",
    signOut: "Sign out",
    backToHub: "Back to chapters",
    replayGuide: "Replay the guide",
    language: "Language",
  },
  hub: {
    eyebrow: "Certification track",
    title: "Learn markets by working them, not by reading about them.",
    lead: "An institutional-grade interactive lab. Every concept is seen, handled, decided on, and understood.",
    lessons: "lessons",
    open: "Available",
    locked: "Coming soon",
    start: "Start",
  },
  system: {
    loading: "Loading…",
    empty: "Nothing to display yet.",
    error: "Something went wrong. Please try again.",
    retry: "Try again",
    success: "Saved.",
    locked: "Locked content",
    lockedHint: "Clear the prerequisites to unlock this step.",
    authRequired: "Create an account to sit the assessment and keep your progress.",
    offlineBank: "Using the local question bank — your progress is still recorded.",
    notFound: "Page not found",
    notFoundHint: "This content does not exist or has been moved.",
  },
  preflight: {
    skip: "Skip",
    next: "Continue",
    back: "Back",
    start: "Enter the Academy",
    step: "Step",
    of: "of",
    steps: [
      {
        kicker: "Welcome",
        title: "TradForge Academy",
        body: "A research desk, not a course. You handle the same objects an institutional analyst does: indicators, cycles, valuations, scenarios.",
      },
      {
        kicker: "Structure",
        title: "Five chapters, one progression",
        body: "Chapter 1 — Fundamental Analysis — is open. Six lessons, a ten-case capstone, and a final certification.",
      },
      {
        kicker: "Method",
        title: "See · Handle · Decide · Understand",
        body: "Every section pairs a visual, an interactive widget, and a call you must make before the outcome is revealed.",
      },
      {
        kicker: "Assessment",
        title: "Part A · Part B — weighted 30 / 70",
        body: "Theory carries 30%; reading the widgets and visuals carries 70%. A lesson is cleared at 70% overall.",
      },
      {
        kicker: "Certification",
        title: "Unlocked once five lessons are cleared",
        body: "Final certification opens after lessons 1.1 to 1.5 are cleared. Questions rotate — every attempt is a fresh set.",
      },
      {
        kicker: "Navigation",
        title: "You stay in control",
        body: "No section is locked for reading. Progress is saved locally, and synced when you are signed in.",
      },
    ],
  },
  eval: {
    partA: "Part A · Theory",
    partB: "Part B · Interpretation",
    weightA: "30%",
    weightB: "70%",
    threshold: "Pass mark: 70%",
    newSeries: "New set",
    submit: "Submit",
    passed: "Lesson cleared",
    failed: "Not cleared — retry with a fresh set",
  },
};
