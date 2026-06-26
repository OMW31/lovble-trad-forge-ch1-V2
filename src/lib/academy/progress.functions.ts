import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Json } from "@/integrations/supabase/types";

const chapterIdSchema = z.object({
  chapterId: z.string().min(1),
});

const evaluationLevelSchema = z.enum(["standard", "high", "premium"]);
const learningStatusSchema = z.enum(["not_started", "in_progress", "completed"]);
const attemptStatusSchema = z.enum(["in_progress", "submitted", "graded"]);

const chapterSnapshotSchema = z.object({
  chapterId: z.string().min(1),
  progressPercent: z.number().min(0).max(100),
  overallStatus: learningStatusSchema,
  sectionsCompleted: z.array(z.string()).default([]),
  casesCompleted: z.array(z.string()).default([]),
  unlockedLevels: z.array(evaluationLevelSchema).default(["standard"]),
  lastSectionId: z.string().nullable().optional(),
  lessonId: z.string().nullable().optional(),
  sectionId: z.string().nullable().optional(),
  widgetId: z.string().nullable().optional(),
  scenarioId: z.string().nullable().optional(),
  evaluationLevel: evaluationLevelSchema.nullable().optional(),
  scrollAnchor: z.string().nullable().optional(),
  lastRoute: z.string().nullable().optional(),
  uiState: z.record(z.string(), z.any()).optional(),
});

const evaluationAttemptSchema = z.object({
  id: z.string().uuid().optional(),
  chapterId: z.string().min(1),
  lessonId: z.string().nullable().optional(),
  level: evaluationLevelSchema,
  status: attemptStatusSchema.default("in_progress"),
  score: z.number().min(0).max(100).nullable().optional(),
  maxScore: z.number().min(0).nullable().optional(),
  passed: z.boolean().nullable().optional(),
  partAAnswers: z.array(z.any()).default([]),
  partBAnswers: z.array(z.any()).default([]),
  partCAnswers: z.array(z.any()).default([]),
  feedback: z.record(z.string(), z.any()).default({}),
});

export type ChapterSnapshotInput = z.infer<typeof chapterSnapshotSchema>;
export type EvaluationAttemptInput = z.infer<typeof evaluationAttemptSchema>;

export const getChapterSnapshot = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => chapterIdSchema.parse(data))
  .handler(async ({ data, context }) => {
    const [{ data: profile, error: profileError }, { data: progress, error: progressError }, { data: resume, error: resumeError }, { data: attempts, error: attemptsError }] = await Promise.all([
      context.supabase
        .from("profiles")
        .select("id, email, username, display_name, avatar_url, bio, locale, theme, onboarding_completed, preferences")
        .eq("id", context.userId)
        .maybeSingle(),
      context.supabase
        .from("chapter_progress")
        .select("*")
        .eq("user_id", context.userId)
        .eq("chapter_id", data.chapterId)
        .maybeSingle(),
      context.supabase
        .from("chapter_resume_state")
        .select("*")
        .eq("user_id", context.userId)
        .eq("chapter_id", data.chapterId)
        .maybeSingle(),
      context.supabase
        .from("evaluation_attempts")
        .select("id, chapter_id, lesson_id, level, status, score, max_score, passed, started_at, submitted_at, updated_at")
        .eq("user_id", context.userId)
        .eq("chapter_id", data.chapterId)
        .order("updated_at", { ascending: false }),
    ]);

    if (profileError) throw profileError;
    if (progressError) throw progressError;
    if (resumeError) throw resumeError;
    if (attemptsError) throw attemptsError;

    return {
      profile,
      progress,
      resume,
      attempts: attempts ?? [],
    };
  });

export const upsertChapterSnapshot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => chapterSnapshotSchema.parse(data))
  .handler(async ({ data, context }) => {
    const now = new Date().toISOString();
    const startedAt = data.progressPercent > 0 ? now : null;
    const completedAt = data.overallStatus === "completed" ? now : null;

    const progressPayload = {
      user_id: context.userId,
      chapter_id: data.chapterId,
      overall_status: data.overallStatus,
      progress_percent: data.progressPercent,
      sections_completed: data.sectionsCompleted,
      cases_completed: data.casesCompleted,
      unlocked_levels: data.unlockedLevels,
      last_section_id: data.lastSectionId ?? data.sectionId ?? null,
      started_at: startedAt,
      completed_at: completedAt,
      last_seen_at: now,
    };

    const resumePayload = {
      user_id: context.userId,
      chapter_id: data.chapterId,
      lesson_id: data.lessonId ?? null,
      section_id: data.sectionId ?? null,
      widget_id: data.widgetId ?? null,
      scenario_id: data.scenarioId ?? null,
      evaluation_level: data.evaluationLevel ?? null,
      scroll_anchor: data.scrollAnchor ?? null,
      ui_state: (data.uiState ?? {}) as Json,
      last_route: data.lastRoute ?? null,
      resumed_at: now,
    };

    const [{ data: progress, error: progressError }, { data: resume, error: resumeError }] = await Promise.all([
      context.supabase
        .from("chapter_progress")
        .upsert(progressPayload, { onConflict: "user_id,chapter_id" })
        .select("*")
        .single(),
      context.supabase
        .from("chapter_resume_state")
        .upsert(resumePayload, { onConflict: "user_id,chapter_id" })
        .select("*")
        .single(),
    ]);

    if (progressError) throw progressError;
    if (resumeError) throw resumeError;

    return { progress, resume };
  });

export const saveEvaluationAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => evaluationAttemptSchema.parse(data))
  .handler(async ({ data, context }) => {
    const payload = {
      id: data.id,
      user_id: context.userId,
      chapter_id: data.chapterId,
      lesson_id: data.lessonId ?? null,
      level: data.level,
      status: data.status,
      score: data.score ?? null,
      max_score: data.maxScore ?? null,
      passed: data.passed ?? null,
      part_a_answers: data.partAAnswers as unknown as Json,
      part_b_answers: data.partBAnswers as unknown as Json,
      part_c_answers: data.partCAnswers as unknown as Json,
      feedback: data.feedback as unknown as Json,
      submitted_at: data.status === "submitted" || data.status === "graded" ? new Date().toISOString() : null,
    };

    const query = data.id
      ? context.supabase.from("evaluation_attempts").update(payload).eq("id", data.id)
      : context.supabase.from("evaluation_attempts").insert(payload);

    const { data: attempt, error } = await query.select("*").single();
    if (error) throw error;
    return attempt;
  });

export const getLatestEvaluationAttempts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => chapterIdSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: attempts, error } = await context.supabase
      .from("evaluation_attempts")
      .select("id, chapter_id, lesson_id, level, status, score, max_score, passed, started_at, submitted_at, updated_at")
      .eq("user_id", context.userId)
      .eq("chapter_id", data.chapterId)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return attempts ?? [];
  });
