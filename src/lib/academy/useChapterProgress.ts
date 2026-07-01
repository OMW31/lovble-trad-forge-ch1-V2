import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getChapterSnapshot, upsertChapterSnapshot } from "@/lib/academy/progress.functions";
import { LESSONS } from "@/lib/academy/chapter1";

export type EvaluationLevel = "standard" | "high" | "premium";

export interface ChapterProfile {
  id: string;
  email: string | null;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

/** Levels unlocked from a section-progress percentage. */
function computeUnlockedLevels(progressPercent: number): EvaluationLevel[] {
  if (progressPercent >= 100) return ["standard", "high", "premium"];
  if (progressPercent >= 65) return ["standard", "high"];
  return ["standard"];
}

/**
 * Owns Chapter 1 progression state with exact-resume persistence.
 *
 * - Anonymous users: state lives in memory only (still fully interactive).
 * - Signed-in users: state hydrates from Lovable Cloud on mount and is
 *   persisted (debounced) on every change, so the chapter resumes exactly.
 */
/** The 5 core lessons (excludes the 1.6 capstone index) — V7: 5 × 20 %. */
export const CORE_LESSON_IDS = ["intro", "macro", "micro", "outils", "previsions"] as const;

export function useChapterProgress(chapterId: string, totalCases: number) {
  const [signedIn, setSignedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [cases, setCases] = useState<Set<string>>(new Set());
  const [profile, setProfile] = useState<ChapterProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);
  // V7: a lesson is officially credited (20 %) only once its evaluation passes (≥70 %).
  const [lessonPasses, setLessonPasses] = useState<Set<string>>(new Set());

  const loadSnapshot = useServerFn(getChapterSnapshot);
  const saveSnapshot = useServerFn(upsertChapterSnapshot);

  // Track auth state.
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setSignedIn(Boolean(data.user));
      setAuthReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
      setAuthReady(true);
    });
    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  // Hydrate from Cloud for signed-in users.
  const snapshotQuery = useQuery({
    queryKey: ["chapter-snapshot", chapterId, signedIn],
    enabled: authReady && signedIn,
    staleTime: 30_000,
    queryFn: () => loadSnapshot({ data: { chapterId } }),
  });

  useEffect(() => {
    if (!snapshotQuery.data || hydrated) return;
    const { profile: p, progress } = snapshotQuery.data;
    if (p) {
      setProfile({
        id: p.id,
        email: p.email ?? null,
        username: p.username ?? null,
        display_name: p.display_name ?? null,
        avatar_url: p.avatar_url ?? null,
      });
    }
    if (progress) {
      setCompleted(new Set(progress.sections_completed ?? []));
      setCases(new Set(progress.cases_completed ?? []));
    }
    setHydrated(true);
  }, [snapshotQuery.data, hydrated]);

  const progressPercent = useMemo(
    () => Math.round((completed.size / LESSONS.length) * 100),
    [completed],
  );

  const overallStatus = useMemo<"not_started" | "in_progress" | "completed">(() => {
    if (completed.size === 0) return "not_started";
    if (completed.size >= LESSONS.length) return "completed";
    return "in_progress";
  }, [completed]);

  const unlockedLevels = useMemo(() => computeUnlockedLevels(progressPercent), [progressPercent]);

  // Debounced persistence for signed-in users.
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSectionRef = useRef<string | null>(null);

  useEffect(() => {
    if (!signedIn || !hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void saveSnapshot({
        data: {
          chapterId,
          progressPercent,
          overallStatus,
          sectionsCompleted: Array.from(completed),
          casesCompleted: Array.from(cases),
          unlockedLevels,
          lastSectionId: lastSectionRef.current,
          sectionId: lastSectionRef.current,
          lastRoute: typeof window !== "undefined" ? window.location.pathname : null,
        },
      }).catch((err) => console.error("Failed to persist chapter progress", err));
    }, 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [signedIn, hydrated, chapterId, progressPercent, overallStatus, completed, cases, unlockedLevels, saveSnapshot]);

  const markSection = useCallback((id: string) => {
    lastSectionRef.current = id;
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const markCase = useCallback(
    (id: string) => {
      lastSectionRef.current = "cas-pratiques";
      setCases((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        if (next.size >= Math.min(3, totalCases)) {
          setCompleted((c) => {
            if (c.has("cas-pratiques")) return c;
            return new Set(c).add("cas-pratiques");
          });
        }
        return next;
      });
    },
    [totalCases],
  );

  return {
    signedIn,
    authReady,
    profile,
    completed,
    cases,
    progressPercent,
    overallStatus,
    unlockedLevels,
    markSection,
    markCase,
    isSyncing: snapshotQuery.isFetching,
  };
}
