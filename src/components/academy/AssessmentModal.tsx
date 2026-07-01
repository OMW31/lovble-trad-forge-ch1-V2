import { useMemo, useState } from "react";
import { Award, BarChart3, BrainCircuit, CheckCircle2, Gauge, Lock, Sparkles, Target, XCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CandleReplay } from "@/components/academy/CandleReplay";
import { CASE_STUDIES } from "@/lib/academy/market-data";
import { EVALUATION_BANK, getEvaluationCase, scoreEvaluation, type EvaluationLevel, type EvaluationPart } from "@/lib/academy/evaluation-bank";
import { saveEvaluationAttempt } from "@/lib/academy/progress.functions";
import { cn } from "@/lib/utils";

const LEVEL_META = {
  standard: {
    label: "Standard",
    icon: Target,
    summary: "Validation solide des concepts, surprise vs consensus, décision simple.",
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
} as const;

const PART_LABEL: Record<EvaluationPart, string> = {
  A: "Partie A · QCM",
  B: "Partie B · Widgets / dashboards",
  C: "Partie C · TradingView scénarisé",
};

type Result = ReturnType<typeof scoreEvaluation> | null;

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
  /** Called with the level whenever an evaluation is passed (≥70 %). */
  onPassed?: (level: EvaluationLevel) => void;
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActiveState] = useState<EvaluationLevel>("standard");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result>(null);
  const saveAttempt = useServerFn(saveEvaluationAttempt);
  const mutation = useMutation({ mutationFn: saveAttempt });

  const available = useMemo(() => {
    if (progressPercent >= 100) return ["standard", "high", "premium"] as EvaluationLevel[];
    if (progressPercent >= 65) return ["standard", "high"] as EvaluationLevel[];
    return ["standard"] as EvaluationLevel[];
  }, [progressPercent]);

  const questions = EVALUATION_BANK[active];
  const meta = LEVEL_META[active];
  const Icon = meta.icon;
  const replayCase = getEvaluationCase(active, CASE_STUDIES);
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const canSubmit = answeredCount === questions.length && !mutation.isPending;

  const setActive = (level: EvaluationLevel) => {
    setActiveState(level);
    setAnswers({});
    setResult(null);
  };

  const submit = async () => {
    if (!canSubmit) return;
    const computed = scoreEvaluation(active, answers);
    setResult(computed);

    if (computed.passed) onPassed?.(active);



    if (signedIn) {
      await mutation.mutateAsync({
        data: {
          chapterId,
          lessonId,
          level: active,
          status: "graded",
          score: computed.score,
          maxScore: computed.maxScore,
          passed: computed.passed,
          partAAnswers: questions.filter((q) => q.part === "A").map((q) => ({ questionId: q.id, answer: answers[q.id], correct: answers[q.id] === q.correctId })),
          partBAnswers: questions.filter((q) => q.part === "B").map((q) => ({ questionId: q.id, answer: answers[q.id], correct: answers[q.id] === q.correctId, widget: q.widget })),
          partCAnswers: questions.filter((q) => q.part === "C").map((q) => ({ questionId: q.id, answer: answers[q.id], correct: answers[q.id] === q.correctId, caseId: q.caseId })),
          feedback: {
            engine: "chapter_1_assessment_v2",
            partScores: computed.parts,
            unlockRule: "70/70/70",
          },
        },
      });
    }
  };

  return (
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
              Système indépendant en 3 niveaux: QCM, widgets/dashboards et replay TradingView scénarisé. Seuil de validation: 70%.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <Tabs value={active} onValueChange={(value) => setActive(value as EvaluationLevel)}>
            <TabsList className="grid h-auto w-full grid-cols-3 gap-2 bg-transparent p-0">
              {(Object.keys(LEVEL_META) as EvaluationLevel[]).map((level) => {
                const item = LEVEL_META[level];
                const LevelIcon = item.icon;
                const locked = !available.includes(level);
                return (
                  <TabsTrigger
                    key={level}
                    value={level}
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

            <TabsContent value={active} className="mt-6">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-5">
                  <div className={cn("rounded-2xl border p-5", meta.tone)}>
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-lg border border-current/20 bg-background/30">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-display text-xl font-semibold">{meta.label}</div>
                        <p className="text-sm text-foreground/80">{meta.summary}</p>
                      </div>
                    </div>
                  </div>

                  {(["A", "B", "C"] as EvaluationPart[]).map((part) => (
                    <section key={part} className="rounded-2xl border bg-card p-4 shadow-elegant">
                      <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-forge" /> {PART_LABEL[part]}
                      </div>
                      {part === "C" && (
                        <div className="mb-4 overflow-hidden rounded-xl border bg-surface">
                          <CandleReplay caseStudy={replayCase} />
                        </div>
                      )}
                      <div className="space-y-4">
                        {questions.filter((q) => q.part === part).map((question) => {
                          const selected = answers[question.id];
                          const reveal = result !== null;
                          return (
                            <div key={question.id} className="rounded-xl border bg-surface p-4">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <h4 className="max-w-2xl text-sm font-semibold leading-relaxed text-foreground">{question.prompt}</h4>
                                {question.widget && (
                                  <span className="rounded-full border border-data/30 bg-data/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-data">
                                    {question.widget}
                                  </span>
                                )}
                              </div>
                              <div className="mt-3 grid gap-2">
                                {question.choices.map((choice) => {
                                  const picked = selected === choice.id;
                                  const correct = question.correctId === choice.id;
                                  return (
                                    <button
                                      key={choice.id}
                                      onClick={() => !result && setAnswers((prev) => ({ ...prev, [question.id]: choice.id }))}
                                      className={cn(
                                        "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                                        picked && !reveal && "border-forge bg-forge/10",
                                        !picked && !reveal && "border-border hover:border-forge/40 hover:bg-surface-2",
                                        reveal && correct && "border-bull/50 bg-bull/10",
                                        reveal && picked && !correct && "border-bear/50 bg-bear/10",
                                        reveal && !picked && !correct && "opacity-55",
                                      )}
                                    >
                                      <span className="text-foreground">{choice.label}</span>
                                      {reveal && correct && <CheckCircle2 className="h-4 w-4 shrink-0 text-bull" />}
                                      {reveal && picked && !correct && <XCircle className="h-4 w-4 shrink-0 text-bear" />}
                                    </button>
                                  );
                                })}
                              </div>
                              {reveal && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{question.explanation}</p>}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>

                <aside className="sticky top-20 h-fit rounded-2xl border bg-card p-5 shadow-elegant">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <BarChart3 className="h-3.5 w-3.5 text-data" /> Score engine
                  </div>
                  <div className="mt-4 text-3xl font-semibold text-foreground">{result ? `${result.score}%` : `${answeredCount}/${questions.length}`}</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {result
                      ? result.passed
                        ? "Niveau validé. La tentative est sauvegardée si le compte est connecté."
                        : "Niveau non validé: le seuil 70% n’est pas atteint."
                      : "Répondez aux trois parties pour lancer le scoring."}
                  </p>

                  <div className="mt-5 space-y-3">
                    {(result?.parts ?? (["A", "B", "C"] as EvaluationPart[]).map((part) => ({ part, score: 0, correct: 0, total: questions.filter((q) => q.part === part).length }))).map((part) => (
                      <div key={part.part} className="rounded-lg border bg-surface p-3">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          <span>{PART_LABEL[part.part]}</span>
                          <span>{result ? `${part.score}%` : `${part.total} item(s)`}</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                          <div className={cn("h-full rounded-full", result && part.score >= 70 ? "bg-bull" : "bg-forge")} style={{ width: `${result ? part.score : 0}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button disabled={!canSubmit} onClick={submit} className="mt-5 w-full bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
                    <BrainCircuit className="h-4 w-4" />
                    {mutation.isPending ? "Sauvegarde..." : "Calculer le score"}
                  </Button>
                  {!signedIn && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Connecte-toi pour sauvegarder les tentatives et débloquer la continuité premium.</p>}
                </aside>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}