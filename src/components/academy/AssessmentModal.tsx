import { useCallback, useEffect, useMemo, useState } from "react";
import type { ElementType } from "react";
import { ChartBar as BarChart3, BrainCircuit, CircleCheck as CheckCircle2, ChevronDown, CircleX as XCircle, Layers, Lock, ScrollText, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VisualQuestion } from "@/components/academy/VisualQuestion";
import {
  getChapterDiagnosticQuestions,
  getLessonAssessmentQuestions,
  scoreQuestions,
  LESSON_PART_WEIGHTS,
  type EvaluationLevel,
  type EvaluationPart,
  type EvaluationQuestion,
} from "@/lib/academy/evaluation-bank";
import { saveEvaluationAttempt } from "@/lib/academy/progress.functions";
import { useT } from "@/lib/i18n/useT";
import { cn } from "@/lib/utils";

const PART_META: Record<"A" | "B", { labelKey: string; shortKey: string; icon: ElementType; weight: number; tone: string; hintKey: string }> = {
  A: {
    labelKey: "eval.partA",
    shortKey: "eval.partAShort",
    icon: ScrollText,
    weight: 30,
    tone: "text-data border-data/30 bg-data/10",
    hintKey: "eval.partAHint",
  },
  B: {
    labelKey: "eval.partB",
    shortKey: "eval.partBShort",
    icon: Layers,
    weight: 70,
    tone: "text-forge border-forge/30 bg-forge/10",
    hintKey: "eval.partBHint",
  },
};

type Result = ReturnType<typeof scoreQuestions> | null;

const scoreColor = (score: number) => (score >= 90 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-rose-400");
const scoreBg = (score: number) =>
  score >= 90 ? "from-emerald-500/20 to-emerald-500/5" : score >= 70 ? "from-amber-500/20 to-amber-500/5" : "from-rose-500/20 to-rose-500/5";
const feedbackMessageKey = (score: number, passed: boolean) => {
  if (score >= 90) return "feedback.excellent";
  if (passed) return "feedback.solid";
  if (score >= 50) return "feedback.rework";
  return "feedback.failed";
};

export function AssessmentModal({
  chapterId,
  lessonId,
  signedIn,
  progressPercent,
  onPassed,
  triggerLabel,
  triggerClassName,
}: {
  chapterId: string;
  lessonId?: string;
  signedIn: boolean;
  progressPercent: number;
  onPassed?: (level: EvaluationLevel, score: number) => void;
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result>(null);
  const [stage, setStage] = useState<"questions" | "results">("questions");
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const saveAttempt = useServerFn(saveEvaluationAttempt);
  const mutation = useMutation({ mutationFn: saveAttempt });

  const isLesson = Boolean(lessonId);
  const [rollKey, setRollKey] = useState(0);
  const [activePart, setActivePart] = useState<"A" | "B">("A");

  const questions: EvaluationQuestion[] = useMemo(() => {
    if (isLesson) return getLessonAssessmentQuestions(lessonId, { rotate: true });
    return getChapterDiagnosticQuestions("standard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLesson, lessonId, rollKey]);

  const parts = ["A", "B"] as EvaluationPart[];
  const partAQuestions = questions.filter((q) => q.part === "A");
  const partBQuestions = questions.filter((q) => q.part === "B");
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const canSubmit = answeredCount === questions.length && questions.length > 0 && !mutation.isPending;

  const resetAttempt = useCallback((reroll = false) => {
    setAnswers({});
    setResult(null);
    setStage("questions");
    setExpandedReview(null);
    setActivePart("A");
    if (reroll) setRollKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (open) resetAttempt(true);
  }, [open, resetAttempt]);

  const submit = async () => {
    if (!canSubmit) return;
    const computed = isLesson
      ? scoreQuestions(questions, answers, parts, LESSON_PART_WEIGHTS)
      : scoreQuestions(questions, answers, parts);
    setResult(computed);
    setStage("results");
    if (computed.passed) onPassed?.("standard", computed.score);

    if (signedIn) {
      await mutation.mutateAsync({
        data: {
          chapterId,
          lessonId,
          level: "standard",
          status: "graded",
          score: computed.score,
          maxScore: computed.maxScore,
          passed: computed.passed,
          partAAnswers: questions
            .filter((q) => q.part === "A")
            .map((q) => ({ questionId: q.id, answer: answers[q.id], correct: answers[q.id] === q.correctId })),
          partBAnswers: questions
            .filter((q) => q.part === "B")
            .map((q) => ({ questionId: q.id, answer: answers[q.id], correct: answers[q.id] === q.correctId, widget: q.widget, visualId: q.visualId })),
          partCAnswers: [],
          feedback: {
            engine: isLesson ? "chapter_1_lesson_ab_v4_weighted" : "chapter_1_diagnostic_ab_v1",
            partScores: computed.parts,
            weighting: isLesson ? "A30_B70" : "equal",
            unlockRule: isLesson ? "global>=70 (0.3A+0.7B)" : "A>=70 && B>=70",
          },
        },
      });
    }
  };

  const partSummaries =
    result?.parts ?? parts.map((part) => ({ part, score: 0, correct: 0, total: questions.filter((q) => q.part === part).length }));

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setTimeout(() => resetAttempt(true), 200); }}>
      <DialogTrigger asChild>
        <Button className={cn("bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95", triggerClassName)}>
          <BrainCircuit className="h-4 w-4" />
          {triggerLabel ?? t("eval.trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-y-auto border-border bg-background p-0 sm:rounded-2xl">
        <div className="border-b border-border bg-gradient-hero p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">{t("eval.title")}</DialogTitle>
            <DialogDescription className="max-w-2xl text-sm text-muted-foreground">
              {isLesson ? t("eval.lessonDesc") : t("eval.diagnosticDesc")}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {stage === "questions" && !signedIn && (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <Lock className="h-10 w-10 text-forge" />
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t("auth.createToEval")}</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {t("auth.createToEvalDesc")}
                </p>
              </div>
              <Button asChild className="bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
                <a href="/auth">{t("auth.createAccount")}</a>
              </Button>
            </div>
          )}

          {stage === "questions" && signedIn && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
              <Tabs value={activePart} onValueChange={(value) => setActivePart(value as "A" | "B")}>
                <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0">
                  {(["A", "B"] as const).map((part) => {
                    const item = PART_META[part];
                    const PartIcon = item.icon;
                    const partQuestions = part === "A" ? partAQuestions : partBQuestions;
                    const done = partQuestions.filter((q) => answers[q.id]).length;
                    return (
                      <TabsTrigger
                        key={part}
                        value={part}
                        className="h-auto flex-col items-start gap-1 rounded-xl border border-border bg-card px-3 py-3 text-left data-[state=active]:border-forge/50 data-[state=active]:shadow-none"
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <PartIcon className="h-4 w-4" /> {t(item.shortKey)}
                          <span className="rounded-full border border-current/20 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{item.weight}%</span>
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {done}/{partQuestions.length} {t("eval.answered")}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {(["A", "B"] as const).map((part) => {
                  const item = PART_META[part];
                  const partQuestions = part === "A" ? partAQuestions : partBQuestions;
                  return (
                    <TabsContent key={part} value={part} className="mt-6 space-y-4">
                      <div className={cn("rounded-2xl border p-4", item.tone)}>
                        <div className="flex items-center gap-2 font-display text-lg font-semibold">
                          <item.icon className="h-5 w-5" /> {t(item.labelKey)}
                        </div>
                        <p className="mt-1 text-sm text-foreground/80">{t(item.hintKey)}</p>
                      </div>
                      <div className="space-y-4">
                        {partQuestions.map((question) => (
                          <VisualQuestion
                            key={question.id}
                            question={question}
                            selected={answers[question.id]}
                            reveal={result !== null}
                            onSelect={(choiceId) => setAnswers((prev) => ({ ...prev, [question.id]: choiceId }))}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>

              <aside className="sticky top-20 h-fit rounded-2xl border bg-card p-5 shadow-elegant">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <BarChart3 className="h-3.5 w-3.5 text-data" /> {t("eval.scoreEngine")} {isLesson ? t("eval.weightedSuffix") : ""}
                </div>
                <div className="mt-4 text-3xl font-semibold text-foreground">{result ? `${result.score}%` : `${answeredCount}/${questions.length}`}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {result
                    ? result.passed
                      ? isLesson
                        ? t("eval.lessonPassedSaved")
                        : t("eval.diagnosticPassedSaved")
                      : isLesson
                        ? t("eval.lessonFailedHint")
                        : t("eval.diagnosticFailedHint")
                    : isLesson
                      ? t("eval.answerPromptLesson")
                      : t("eval.answerPromptDiagnostic")}
                </p>

                <div className="mt-5 space-y-3">
                  {partSummaries.map((p) => {
                    const meta = PART_META[p.part as "A" | "B"];
                    return (
                      <div key={p.part} className="rounded-lg border bg-surface p-3">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          <span>{meta?.short ?? p.part} {isLesson ? `· ${meta?.weight ?? 0}%` : ""}</span>
                          <span>{result ? `${p.score}%` : `${p.total} ${t("eval.items")}`}</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                          <div className={cn("h-full rounded-full transition-all", result && p.score >= 70 ? "bg-bull" : "bg-forge")} style={{ width: `${result ? p.score : 0}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button disabled={!canSubmit} onClick={submit} className="mt-5 w-full bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
                  <BrainCircuit className="h-4 w-4" />
                  {mutation.isPending ? t("eval.saving") : t("eval.calculate")}
                </Button>
              </aside>
            </div>
          )}

          {stage === "results" && result && (
            <div className="space-y-6">
              <div className={cn("rounded-2xl border bg-gradient-to-br p-6", scoreBg(result.score))}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("eval.scoreGlobal")}</div>
                    <div className={cn("mt-1 text-5xl font-bold font-display", scoreColor(result.score))}>
                      {result.score}%
                    </div>
                  </div>
                  {result.passed ? (
                    <div className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">{t("eval.passed")}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-full bg-rose-500/15 px-4 py-2">
                      <XCircle className="h-5 w-5 text-rose-400" />
                      <span className="font-mono text-xs uppercase tracking-wider text-rose-400">{t("eval.failed")}</span>
                    </div>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{t(feedbackMessageKey(result.score, result.passed))}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {partSummaries.map((part) => {
                  const meta = PART_META[part.part as "A" | "B"];
                  return (
                    <div key={part.part} className="rounded-xl border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {meta ? t(meta.shortKey) : part.part}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {part.correct}/{part.total} {t("eval.correct")}
                        </span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className={cn("text-2xl font-bold", scoreColor(part.score))}>{part.score}%</span>
                        {isLesson && (
                          <span className="text-xs text-muted-foreground">
                            {t("eval.weight")} {meta?.weight ?? 0}%
                          </span>
                        )}
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn("h-full rounded-full transition-all", part.score >= 70 ? "bg-emerald-400" : "bg-rose-400")}
                          style={{ width: `${part.score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("eval.detailedReview")}
                </div>
                {questions.map((question) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correctId;
                  const isExpanded = expandedReview === question.id;
                  return (
                    <div key={question.id} className="rounded-xl border bg-card overflow-hidden">
                      <button
                        onClick={() => setExpandedReview(isExpanded ? null : question.id)}
                        className="flex w-full items-start gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-rose-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground line-clamp-2">{question.prompt}</div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className={cn("rounded px-1.5 py-0.5 font-mono uppercase", question.part === "A" ? "bg-amber-500/10 text-amber-400" : "bg-sky-500/10 text-sky-400")}>
                              {question.part}
                            </span>
                            {!isCorrect && userAnswer && (
                              <span className="text-rose-400">{t("eval.yourAnswer")}: {question.choices.find((c) => c.id === userAnswer)?.label ?? "—"}</span>
                            )}
                            {!userAnswer && <span className="text-rose-400">{t("eval.noAnswer")}</span>}
                          </div>
                        </div>
                        <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform", isExpanded && "rotate-180")} />
                      </button>
                      {isExpanded && (
                        <div className="space-y-2 border-t px-4 py-3 text-sm">
                          {question.choices.map((choice) => (
                            <div
                              key={choice.id}
                              className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-1.5",
                                choice.id === question.correctId && "bg-emerald-500/10 text-emerald-400",
                                choice.id === userAnswer && choice.id !== question.correctId && "bg-rose-500/10 text-rose-400",
                              )}
                            >
                              {choice.id === question.correctId && <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />}
                              {choice.id === userAnswer && choice.id !== question.correctId && <XCircle className="h-3.5 w-3.5 shrink-0" />}
                              <span>{choice.label}</span>
                            </div>
                          ))}
                          <div className="pt-2 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{t("eval.justification")}: </span>
                            {question.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                {!result.passed && lessonId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => document.getElementById(lessonId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                    }}
                  >
                    <ScrollText className="h-4 w-4" />
                    {t("eval.reviewLesson")}
                  </Button>
                )}
                <Button variant="outline" onClick={() => resetAttempt(true)}>
                  <Sparkles className="h-4 w-4" />
                  {t("eval.newSet")}
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  className={result.passed ? "bg-gradient-forge text-forge-foreground hover:opacity-95" : ""}
                >
                  {t("eval.close")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
