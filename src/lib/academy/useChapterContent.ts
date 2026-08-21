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
