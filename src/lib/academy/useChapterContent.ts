// ============================================================================
// Localised access to Chapter 1 metadata.
// ----------------------------------------------------------------------------
// FR (chapter1.ts) is the structural source of truth: ids, order, levels and
// subsection ids never change across locales — only the copy is swapped.
// Consumers use `useLessons()` / `useChapter()` instead of importing the raw
// FR constants so a locale switch retranslates the whole chapter shell.
// ============================================================================

import { useMemo } from "react";
import { CHAPTER, LESSONS, type LessonMeta } from "@/lib/academy/chapter1";
import { CHAPTER_EN, LESSONS_EN } from "@/lib/i18n/content/chapter1.en";
import { CASE_STUDIES_EN } from "@/lib/i18n/content/case-studies.en";
import { CASE_STUDIES, type CaseStudy } from "@/lib/academy/market-data";
import { SCENARIO_LIBRARY, type ScenarioSpec } from "@/lib/academy/scenario-library";
import { getTechniqueLayers, getGeopolitiqueLayers, getIntermarketLayers, getCentralBanksLayers } from "@/lib/i18n/content/scenario-layers.en";
import { useI18n, type Locale } from "@/lib/i18n";

export function localizeChapter(locale: Locale) {
  if (locale !== "en") return CHAPTER;
  return { ...CHAPTER, ...CHAPTER_EN };
}

export function localizeLessons(locale: Locale): LessonMeta[] {
  if (locale !== "en") return LESSONS;
  return LESSONS.map((lesson) => {
    const copy = LESSONS_EN[lesson.id];
    if (!copy) return lesson;
    return {
      ...lesson,
      title: copy.title,
      subtitle: copy.subtitle,
      subsections: lesson.subsections.map((s) => ({ ...s, label: copy.subsections[s.id] ?? s.label })),
      miniHero: lesson.miniHero && copy.miniHero ? { ...lesson.miniHero, ...copy.miniHero } : lesson.miniHero,
    };
  });
}

export function useChapter() {
  const { locale } = useI18n();
  return useMemo(() => localizeChapter(locale), [locale]);
}

export function useLessons(): LessonMeta[] {
  const { locale } = useI18n();
  return useMemo(() => localizeLessons(locale), [locale]);
}

export function localizeCaseStudies(locale: Locale): CaseStudy[] {
  if (locale !== "en") return CASE_STUDIES;
  return CASE_STUDIES.map((cs) => {
    const en = CASE_STUDIES_EN[cs.id];
    if (!en) return cs;
    return {
      ...cs,
      title: en.title,
      driver: en.driver,
      context: en.context,
      marker: { ...cs.marker, label: en.markerLabel },
      refLevel: cs.refLevel ? { ...cs.refLevel, label: en.refLevelLabel ?? cs.refLevel.label } : cs.refLevel,
      decision: {
        prompt: en.decision.prompt,
        choices: en.decision.choices,
        correctId: cs.decision.correctId,
        explanation: en.decision.explanation,
      },
      outcome: en.outcome,
    };
  });
}

export function useCaseStudies(): CaseStudy[] {
  const { locale } = useI18n();
  return useMemo(() => localizeCaseStudies(locale), [locale]);
}

export function localizeScenarioLibrary(locale: Locale): ScenarioSpec[] {
  if (locale !== "en") return SCENARIO_LIBRARY;
  const enCases = CASE_STUDIES_EN;
  return SCENARIO_LIBRARY.map((spec) => {
    const caseId = spec.caseId ?? spec.id.replace("spec-", "");
    const en = enCases[caseId];
    if (!en) return spec;
    return {
      ...spec,
      title: en.title,
      context: en.context,
      macro: en.driver.split("·").map((d) => d.trim()).filter(Boolean),
      technique: getTechniqueLayers(),
      geopolitique: spec.geopolitique ? getGeopolitiqueLayers() : undefined,
      intermarket: spec.intermarket ? getIntermarketLayers() : undefined,
      banquesCentrales: spec.banquesCentrales ? getCentralBanksLayers() : undefined,
    };
  });
}

export function useScenarioLibrary(): ScenarioSpec[] {
  const { locale } = useI18n();
  return useMemo(() => localizeScenarioLibrary(locale), [locale]);
}

export function useGetSpecById() {
  const library = useScenarioLibrary();
  return useMemo(() => (id: string) => library.find((s) => s.id === id), [library]);
}
