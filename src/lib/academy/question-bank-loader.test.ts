import { beforeEach, describe, expect, it, vi } from "vitest";
import { PART_A_BANK } from "./part-a-bank";
import { PART_B_BANK } from "./part-b-bank";
import { QUESTION_TRANSLATIONS_EN } from "./question-translations.en";

const backend = vi.hoisted(() => ({ read: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: (table: string) => ({ select: () => ({ eq: (_field: string, value: unknown) => backend.read(table, value) }) }) },
}));

describe("CH1 bilingual question banks", () => {
  beforeEach(() => { vi.resetModules(); backend.read.mockReset(); });

  it("covers exactly 134 questions: 75 A and 59 B, preserving answer and visual identifiers", async () => {
    const { getPartABank, getPartBBank } = await import("./question-bank-loader");
    expect(Object.keys(QUESTION_TRANSLATIONS_EN)).toHaveLength(134);
    expect(Object.values(PART_A_BANK).flat()).toHaveLength(75);
    expect(Object.values(PART_B_BANK).flat()).toHaveLength(59);
    for (const lesson of Object.keys(PART_A_BANK) as (keyof typeof PART_A_BANK)[]) {
      for (const [part, source, translated] of [
        ["A", PART_A_BANK[lesson], getPartABank(lesson, "en")],
        ["B", PART_B_BANK[lesson], getPartBBank(lesson, "en")],
      ] as const) {
        source.forEach((item, index) => {
          expect(translated[index]).toEqual({ ...item, ...QUESTION_TRANSLATIONS_EN[`${part}:${item.id}`] });
          expect(translated[index].choices.map((choice) => choice.id)).toEqual(item.choices.map((choice) => choice.id));
          expect(translated[index].choices.some((choice) => choice.id === item.correctId)).toBe(true);
        });
      }
      expect(getPartABank(lesson, "fr")).toEqual(PART_A_BANK[lesson]);
      expect(getPartBBank(lesson, "fr")).toEqual(PART_B_BANK[lesson]);
    }
  });

  it("keeps English available when the backend is unreachable", async () => {
    backend.read.mockRejectedValue(new Error("offline"));
    const loader = await import("./question-bank-loader");
    await loader.hydrateQuestionBanks("en");
    expect(loader.isRemoteBankLoaded()).toBe(false);
    expect(loader.getPartABank("intro")[0].prompt).toBe(QUESTION_TRANSLATIONS_EN["A:1.1-Q1"].prompt);
  });

  it("does not let a stale French response overwrite a newer English request", async () => {
    const pending: ((value: { data: unknown[]; error: null }) => void)[] = [];
    backend.read.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));
    const loader = await import("./question-bank-loader");
    const french = loader.hydrateQuestionBanks("fr");
    const english = loader.hydrateQuestionBanks("en");
    pending.slice(2).forEach((resolve) => resolve({ data: [], error: null }));
    await english;
    pending.slice(0, 2).forEach((resolve) => resolve({ data: [], error: null }));
    await french;
    expect(loader.getPartABank("intro")[0].prompt).toBe(QUESTION_TRANSLATIONS_EN["A:1.1-Q1"].prompt);
  });

  it("selects 7 questions per part for every lesson and preserves 30/70 grading", async () => {
    const { getLessonAssessmentQuestions, LESSON_PART_WEIGHTS, scoreQuestions } = await import("./evaluation-bank");
    for (const lesson of Object.keys(PART_A_BANK)) {
      const questions = getLessonAssessmentQuestions(lesson, { rotate: false, locale: "en" });
      expect(questions.filter((question) => question.part === "A")).toHaveLength(7);
      expect(questions.filter((question) => question.part === "B")).toHaveLength(7);
      const onlyB = Object.fromEntries(questions.filter((question) => question.part === "B").map((question) => [question.id, question.correctId]));
      expect(scoreQuestions(questions, onlyB, ["A", "B"], LESSON_PART_WEIGHTS)).toMatchObject({ score: 70, passed: true });
      const onlyA = Object.fromEntries(questions.filter((question) => question.part === "A").map((question) => [question.id, question.correctId]));
      expect(scoreQuestions(questions, onlyA, ["A", "B"], LESSON_PART_WEIGHTS)).toMatchObject({ score: 30, passed: false });
    }
  });
});