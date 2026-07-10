import { useCallback, useEffect, useMemo, useState } from "react";
import type { ElementType } from "react";
import { Award, BarChart3, BrainCircuit, Gauge, Layers, Lock, ScrollText, Sparkles, Target } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { cn } from "@/lib/utils";

const LEVEL_META: Record<EvaluationLevel, { label: string; icon: ElementType; summary: string; tone: string }> = {
  standard: {
    label: "Standard",
    icon: Target,
    summary: "Validation solide des concepts et des transmissions principales.",
    tone: "text-bull border-bull/30 bg-bull/10",
  },
  high: {
    label: "High",
    icon: Gauge,
    summary: "Lecture multifactorielle, arbitrages macro/micro et dashboards croisés.",
    tone: "text-data border-data/30 bg-data/10",
  },
  premium: {
    label: "Premium",
    icon: Award,
    summary: "Raisonnement institutionnel: drivers hiérarchisés, scénario, invalidation.",
    tone: "text-forge border-forge/30 bg-forge/10",
  },
};

const PART_META: Record<"A" | "B", { label: string; short: string; icon: ElementType; weight: number; tone: string; hint: string }> = {
  A: {
    label: "Partie A · QCM enrichis",
    short: "Partie A",
    icon: ScrollText,
    weight: 30,
    tone: "text-data border-data/30 bg-data/10",
    hint: "Concepts, mécanismes et transmissions clés de la leçon.",
  },
  B: {
    label: "Partie B · Widgets & visuels",
    short: "Partie B",
    icon: Layers,
    weight: 70,
    tone: "text-forge border-forge/30 bg-forge/10",
    hint: "Interprétation des widgets et infographies — le cœur analytique de TradForge.",
  },
};

type Result = ReturnType<typeof scoreQuestions> | null;

export function AssessmentModal({
  chapterId,
  lessonId,
  signedIn,
  progressPercent,
  onPassed,
  triggerLabel = "Évaluation",
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
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result>(null);
  const [failureOpen, setFailureOpen] = useState(false);
  const saveAttempt = useServerFn(saveEvaluationAttempt);
  const mutation = useMutation({ mutationFn: saveAttempt });

  const isLesson = Boolean(lessonId);

  // ---- Diagnostic (no lessonId): keep level-based behaviour ----------------
  const [level, setLevelState] = useState<EvaluationLevel>("standard");
  const availableLevels = useMemo(() => {
    if (progressPercent >= 100) return ["standard", "high", "premium"] as EvaluationLevel[];
    if (progressPercent >= 65) return ["standard", "high"] as EvaluationLevel[];
    return ["standard"] as EvaluationLevel[];
  }, [progressPercent]);

  // ---- Lesson (A/B): regenerate rotated questions on open / retry ----------
  const [rollKey, setRollKey] = useState(0);
  const [activePart, setActivePart] = useState<"A" | "B">("A");

  const questions: EvaluationQuestion[] = useMemo(() => {
    if (isLesson) return getLessonAssessmentQuestions(lessonId, { rotate: true });
    return getChapterDiagnosticQuestions(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLesson, lessonId, level, rollKey]);

  const parts = ["A", "B"] as EvaluationPart[];
  const partAQuestions = questions.filter((q) => q.part === "A");
  const partBQuestions = questions.filter((q) => q.part === "B");
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const canSubmit = answeredCount === questions.length && questions.length > 0 && !mutation.isPending;

  const resetAttempt = useCallback((reroll = false) => {
    setAnswers({});
    setResult(null);
    setActivePart("A");
    if (reroll) setRollKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (open) resetAttempt(true);
  }, [open, resetAttempt]);

  const setLevel = (next: EvaluationLevel) => {
    setLevelState(next);
    resetAttempt();
  };

  const submit = async () => {
    if (!canSubmit) return;
    const computed = isLesson
      ? scoreQuestions(questions, answers, parts, LESSON_PART_WEIGHTS)
      : scoreQuestions(questions, answers, parts);
    setResult(computed);
    if (computed.passed) onPassed?.(isLesson ? "standard" : level, computed.score);
    else setFailureOpen(true);

    if (signedIn) {
      await mutation.mutateAsync({
        data: {
          chapterId,
          lessonId,
          level: isLesson ? "standard" : level,
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
            engine: isLesson ? "chapter_1_lesson_ab_v4_weighted" : "chapter_1_diagnostic_v3",
            partScores: computed.parts,
            weighting: isLesson ? "A30_B70" : "equal",
            unlockRule: isLesson ? "global>=70 (0.3A+0.7B)" : "A>=70 && B>=70",
          },
        },
      });
    }
  };

  const partSummaries = result?.parts ?? parts.map((part) => ({ part, score: 0, correct: 0, total: questions.filter((q) => q.part === part).length }));

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={cn("bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95", triggerClassName)}>
            <BrainCircuit className="h-4 w-4" />
            {triggerLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[92vh] max-w-6xl overflow-y-auto border-border bg-background p-0 sm:rounded-2xl">
          <div className="border-b border-border bg-gradient-hero p-6">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-foreground">Evaluation Command Center</DialogTitle>
              <DialogDescription className="max-w-2xl text-sm text-muted-foreground">
                {isLesson
                  ? "Évaluation de leçon en deux volets : Partie A (QCM, 30 %) puis Partie B (widgets & visuels, 70 %). Seuil de validation : 70 % au score global pondéré."
                  : "Diagnostic de chapitre. Seuil de validation : 70 % par partie."}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6">
            {isLesson ? (
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
                            <PartIcon className="h-4 w-4" /> {item.short}
                            <span className="rounded-full border border-current/20 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{item.weight}%</span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                            {done}/{partQuestions.length} répondu(s)
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
                            <item.icon className="h-5 w-5" /> {item.label}
                          </div>
                          <p className="mt-1 text-sm text-foreground/80">{item.hint}</p>
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
                    <BarChart3 className="h-3.5 w-3.5 text-data" /> Score engine · 30 / 70
                  </div>
                  <div className="mt-4 text-3xl font-semibold text-foreground">{result ? `${result.score}%` : `${answeredCount}/${questions.length}`}</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {result
                      ? result.passed
                        ? "Leçon validée. La tentative est sauvegardée si le compte est connecté."
                        : "Leçon non validée : le score global pondéré doit atteindre 70 %."
                      : "Répondez aux parties A et B, puis lancez le scoring pondéré."}
                  </p>

                  <div className="mt-5 space-y-3">
                    {partSummaries.map((p) => {
                      const meta = PART_META[p.part as "A" | "B"];
                      return (
                        <div key={p.part} className="rounded-lg border bg-surface p-3">
                          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                            <span>{meta?.short ?? p.part} · {meta?.weight ?? 0}%</span>
                            <span>{result ? `${p.score}%` : `${p.total} item(s)`}</span>
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
                    {mutation.isPending ? "Sauvegarde..." : result ? "Recalculer" : "Calculer le score"}
                  </Button>
                  {result && (
                    <Button variant="outline" onClick={() => resetAttempt(true)} className="mt-2 w-full">
                      Nouvelle série de questions
                    </Button>
                  )}
                  {!signedIn && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Connectez-vous pour sauvegarder les tentatives et débloquer la continuité premium.</p>}
                </aside>
              </div>
            ) : (
              <Tabs value={level} onValueChange={(value) => setLevel(value as EvaluationLevel)}>
                <TabsList className="grid h-auto w-full grid-cols-3 gap-2 bg-transparent p-0">
                  {(Object.keys(LEVEL_META) as EvaluationLevel[]).map((lvl) => {
                    const item = LEVEL_META[lvl];
                    const LevelIcon = item.icon;
                    const locked = !availableLevels.includes(lvl);
                    return (
                      <TabsTrigger
                        key={lvl}
                        value={lvl}
                        disabled={locked}
                        className={cn(
                          "h-auto rounded-xl border px-3 py-3 data-[state=active]:shadow-none",
                          locked ? "border-border bg-surface text-muted-foreground opacity-50" : "border-border bg-card text-foreground",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {locked ? <Lock className="h-4 w-4" /> : <LevelIcon className="h-4 w-4" />}
                          {item.label}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value={level} className="mt-6">
                  <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="space-y-5">
                      <div className={cn("rounded-2xl border p-5", LEVEL_META[level].tone)}>
                        <div className="font-display text-xl font-semibold">{LEVEL_META[level].label}</div>
                        <p className="text-sm text-foreground/80">{LEVEL_META[level].summary}</p>
                      </div>
                      {parts.map((part) => (
                        <section key={part} className="rounded-2xl border bg-card p-4 shadow-elegant">
                          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            <Sparkles className="h-3.5 w-3.5 text-forge" /> {PART_META[part as "A" | "B"]?.label ?? part}
                          </div>
                          <div className="space-y-4">
                            {questions
                              .filter((q) => q.part === part)
                              .map((question) => (
                                <VisualQuestion
                                  key={question.id}
                                  question={question}
                                  selected={answers[question.id]}
                                  reveal={result !== null}
                                  onSelect={(choiceId) => setAnswers((prev) => ({ ...prev, [question.id]: choiceId }))}
                                />
                              ))}
                          </div>
                        </section>
                      ))}
                    </div>

                    <aside className="sticky top-20 h-fit rounded-2xl border bg-card p-5 shadow-elegant">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        <BarChart3 className="h-3.5 w-3.5 text-data" /> Score engine
                      </div>
                      <div className="mt-4 text-3xl font-semibold text-foreground">{result ? `${result.score}%` : `${answeredCount}/${questions.length}`}</div>
                      <Button disabled={!canSubmit} onClick={submit} className="mt-5 w-full bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
                        <BrainCircuit className="h-4 w-4" />
                        {mutation.isPending ? "Sauvegarde..." : "Calculer le score"}
                      </Button>
                    </aside>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={failureOpen} onOpenChange={setFailureOpen}>
        <AlertDialogContent className="border-border bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">Validation non obtenue</AlertDialogTitle>
            <AlertDialogDescription>
              {isLesson
                ? "Le score global pondéré (30 % Partie A + 70 % Partie B) doit atteindre 70 %. Revenez au bloc de leçon, relisez les widgets/visuels concernés, puis relancez l'évaluation."
                : "Chaque partie doit atteindre 70 %. Revoyez les leçons concernées puis relancez le diagnostic."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuer ici</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (lessonId) {
                  setOpen(false);
                  window.setTimeout(() => document.getElementById(lessonId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                }
              }}
              className="bg-gradient-forge text-forge-foreground hover:opacity-95"
            >
              Revoir la leçon
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
