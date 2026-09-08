import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Award, CheckCircle2, Lock, ShieldCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChapterShell } from "@/components/academy/ChapterShell";
import { ScenarioPlayer } from "@/components/academy/ScenarioPlayer";
import { CHAPTER } from "@/lib/academy/chapter1";
import { useCaseStudies, useScenarioLibrary } from "@/lib/academy/useChapterContent";
import { saveEvaluationAttempt } from "@/lib/academy/progress.functions";
import { assembleScenario } from "@/lib/academy/scenario-engine";
import { useChapterProgress } from "@/lib/academy/useChapterProgress";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/academy/analyse-fondamentale/certification")({
  head: () => ({
    meta: [
      { title: "Certification Analyse Fondamentale — TradForge" },
      { name: "description", content: "Certification finale du Chapitre 1 : Partie C, dix scénarios scriptés avec pause pédagogique." },
      { property: "og:title", content: "Certification Analyse Fondamentale — TradForge" },
      { property: "og:description", content: "Partie C : dix scénarios de marché scriptés pour valider le raisonnement fondamental." },
    ],
  }),
  component: CertificationPage,
});

function CertificationPage() {
  const t = useT();
  const { signedIn, profile, completed, lessonPasses, certificationPercent, certificationReady, dashboard } = useChapterProgress(CHAPTER.id, useCaseStudies().length);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);
  const saveAttempt = useServerFn(saveEvaluationAttempt);
  const mutation = useMutation({ mutationFn: saveAttempt });
  const scenarioLibrary = useScenarioLibrary();
  const caseStudies = useCaseStudies();
  const scenarios = useMemo(() => scenarioLibrary.map((spec) => assembleScenario(spec, spec.difficulte, "evaluation", caseStudies)), [scenarioLibrary, caseStudies]);
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;
  const score = Math.round((correct / Math.max(1, scenarios.length)) * 100);
  const passed = answered === scenarios.length && score >= 70;
  const remaining = dashboard.lessons.filter((lesson) => !lesson.validated);

  const saveCertification = async () => {
    if (!signedIn || answered !== scenarios.length) return;
    await mutation.mutateAsync({
      data: {
        chapterId: CHAPTER.id,
        lessonId: null,
        level: "premium",
        status: "graded",
        score,
        maxScore: 100,
        passed,
        partAAnswers: [],
        partBAnswers: [],
        partCAnswers: scenarios.map((scenario) => ({ scenarioId: scenario.spec.id, correct: Boolean(results[scenario.spec.id]) })),
        feedback: { engine: "chapter_1_certification_part_c_v1", scenarioCount: scenarios.length, threshold: 70 },
      },
    });
    setSaved(true);
  };

  return (
    <ChapterShell completedSections={completed} signedIn={signedIn} profile={profile} lessonPasses={lessonPasses} certificationPercent={certificationPercent} dashboard={dashboard}>
      <div className="space-y-8">
        <Link to="/academy/analyse-fondamentale" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t.chrome.certification.back}
        </Link>

        <section className="overflow-hidden rounded-3xl border bg-gradient-hero p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-forge"><Award className="h-3.5 w-3.5" /> {t.chrome.certification.eyebrow}</div>
              <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-foreground sm:text-5xl">{t.chrome.certification.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.chrome.certification.lead}</p>
            </div>
            <div className="rounded-2xl border bg-surface p-4 text-center">
              <div className="font-display text-3xl font-bold tabular-nums text-foreground">{answered}/{scenarios.length}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.chrome.certification.scoredScenarios}</div>
              <div className="mt-2 text-sm font-semibold text-forge">{t.chrome.certification.scoreLabel(score)}</div>
            </div>
          </div>
        </section>

        {!certificationReady ? (
          <section className="rounded-2xl border border-forge/30 bg-card p-6 shadow-elegant">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-forge"><Lock className="h-3.5 w-3.5" /> {t.chrome.certification.lockedTitle(certificationPercent)}</div>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">{t.chrome.certification.lockedHeading}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {remaining.map((lesson) => (
                <a key={lesson.id} href={`/academy/analyse-fondamentale#${lesson.id}`} className="premium-hover rounded-xl border bg-surface p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{lesson.num}</div>
                  <div className="mt-1 font-semibold text-foreground">{lesson.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{t.chrome.certification.lockedLessonHint}</p>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <>
            <div className="space-y-6">
              {scenarios.map((scenario) => (
                <ScenarioPlayer key={scenario.spec.id} scenario={scenario} onComplete={(isCorrect) => setResults((prev) => ({ ...prev, [scenario.spec.id]: isCorrect }))} />
              ))}
            </div>
            <section className="rounded-3xl border bg-gradient-hero p-6 text-center shadow-elegant sm:p-8">
              {passed ? <Trophy className="mx-auto h-10 w-10 text-forge" /> : <CheckCircle2 className="mx-auto h-10 w-10 text-muted-foreground" />}
              <h2 className="mt-4 font-display text-2xl font-bold text-foreground">{answered === scenarios.length ? (passed ? t.chrome.certification.resultPassed : t.chrome.certification.resultFailed) : t.chrome.certification.resultPending}</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{answered === scenarios.length ? t.chrome.certification.resultSummary(correct, scenarios.length, score) : t.chrome.certification.resultPendingBody}</p>
              {signedIn ? (
                <Button disabled={answered !== scenarios.length || mutation.isPending || saved} onClick={saveCertification} className="mt-6 bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
                  <ShieldCheck className="h-4 w-4" /> {saved ? t.chrome.certification.saved : mutation.isPending ? t.chrome.certification.saving : t.chrome.certification.saveAttempt}
                </Button>
              ) : (
                <p className="mt-6 text-xs text-muted-foreground">{t.chrome.certification.signInToSave}</p>
              )}
            </section>
          </>
        )}
      </div>
    </ChapterShell>
  );
}