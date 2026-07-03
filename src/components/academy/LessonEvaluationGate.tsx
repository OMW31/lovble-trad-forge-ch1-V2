import { Award, CheckCircle2, Lock } from "lucide-react";
import { AssessmentModal } from "@/components/academy/AssessmentModal";
import type { LessonMeta } from "@/lib/academy/chapter1";
import { cn } from "@/lib/utils";

/**
 * V7 progression gate shown at the end of each core lesson (1.1 → 1.5).
 * The lesson's 20 % is credited only once its evaluation passes (≥70 %).
 * Reuses the existing (excellent) AssessmentModal — nothing is removed.
 */
export function LessonEvaluationGate({
  chapterId,
  lesson,
  signedIn,
  progressPercent,
  passed,
  onPassed,
}: {
  chapterId: string;
  lesson: LessonMeta;
  signedIn: boolean;
  progressPercent: number;
  passed: boolean;
  onPassed: (lessonId: string, score?: number) => void;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 shadow-elegant sm:p-6",
        passed ? "border-bull/40 bg-bull/5" : "border-forge/30 bg-gradient-hero",
      )}
    >
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-forge">
            {passed ? <CheckCircle2 className="h-3.5 w-3.5 text-bull" /> : <Award className="h-3.5 w-3.5" />}
            Évaluation de leçon · {lesson.num}
          </div>
          <h3 className="mt-2 font-display text-lg font-bold text-foreground sm:text-xl">
            {passed ? "Leçon validée — 20 % crédités" : `Validez la leçon ${lesson.num}`}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {passed
              ? "Votre progression officielle a été créditée. La certification finale se débloque à 100 %."
              : "Réussissez l'évaluation (seuil 70 %) pour créditer les 20 % de cette leçon et progresser vers la certification finale."}
          </p>
        </div>
        <div className="shrink-0">
          {passed ? (
            <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-bull/40 bg-bull/10 px-3 py-2 font-mono text-xs uppercase tracking-wider text-bull sm:w-auto">
              <CheckCircle2 className="h-4 w-4" /> Validée
            </span>
          ) : (
            <AssessmentModal
              chapterId={chapterId}
              lessonId={lesson.id}
              signedIn={signedIn}
              progressPercent={progressPercent}
              triggerLabel="Passer l'évaluation"
              triggerClassName="w-full sm:w-auto"
              onPassed={(_level, score) => onPassed(lesson.id, score)}
            />
          )}
        </div>
      </div>
      {!signedIn && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Connectez-vous pour sauvegarder durablement la validation.
        </p>
      )}
    </div>
  );
}
