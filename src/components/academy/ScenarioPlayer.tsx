import { useMemo, useState } from "react";
import { ArrowRight, Check, CheckCircle2, Layers3, PauseCircle, Play, Radar, RotateCcw, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CandleReplay } from "@/components/academy/CandleReplay";
import type { PlayableScenario } from "@/lib/academy/scenario-engine";
import { cn } from "@/lib/utils";

type ScenarioStage = "context" | "publication" | "decision" | "debrief";

const STAGES: { id: ScenarioStage; label: string }[] = [
  { id: "context", label: "Contexte" },
  { id: "publication", label: "Pause" },
  { id: "decision", label: "Décision" },
  { id: "debrief", label: "Débrief" },
];

export function ScenarioPlayer({
  scenario,
  onComplete,
  className,
}: {
  scenario: PlayableScenario;
  onComplete?: (correct: boolean, scenario: PlayableScenario) => void;
  className?: string;
}) {
  const [stage, setStage] = useState<ScenarioStage>(scenario.mode === "evaluation" ? "context" : "decision");
  const [selected, setSelected] = useState<string | null>(null);
  const [reported, setReported] = useState(false);
  const caseStudy = scenario.caseStudy;
  const answered = selected !== null;
  const correctId = caseStudy?.decision.correctId ?? "a";
  const correct = selected === correctId;

  const choices = useMemo(() => {
    const base = caseStudy?.decision.choices ?? [
      { id: "a", label: "Le driver dominant valide la thèse principale" },
      { id: "b", label: "Le marché doit ignorer la publication" },
      { id: "c", label: "Le signal technique suffit sans contexte" },
    ];
    return base.length >= 4 ? base : [...base, { id: "d", label: "Attendre sans thèse : signal impossible à hiérarchiser" }];
  }, [caseStudy]);

  const layerGroups = [
    { label: "Macro", values: scenario.layers.macro, icon: Radar },
    { label: "Technique", values: scenario.layers.technique, icon: Layers3 },
    { label: "Intermarket", values: scenario.layers.intermarket, icon: ArrowRight },
    { label: "Banques centrales", values: scenario.layers.banquesCentrales, icon: ShieldAlert },
    { label: "Géopolitique", values: scenario.layers.geopolitique, icon: ShieldAlert },
  ].filter((group) => group.values.length > 0);

  const choose = (id: string) => {
    if (answered) return;
    setSelected(id);
    setStage("debrief");
    if (!reported) {
      setReported(true);
      onComplete?.(id === correctId, scenario);
    }
  };

  const reset = () => {
    setSelected(null);
    setReported(false);
    setStage(scenario.mode === "evaluation" ? "context" : "decision");
  };

  return (
    <article className={cn("overflow-hidden rounded-2xl border border-forge/30 bg-card shadow-elegant", className)}>
      <div className="border-b bg-forge/10 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-forge">
              <Play className="h-3.5 w-3.5" /> Scenario Player · {scenario.mode === "evaluation" ? "Evaluation" : "Learning"}
            </div>
            <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{scenario.spec.title}</h3>
          </div>
          <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {scenario.level} · volatilité {scenario.spec.volatilite}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {STAGES.map((item, index) => {
            const activeIndex = STAGES.findIndex((s) => s.id === stage);
            const done = index < activeIndex || (item.id === "debrief" && answered);
            const active = item.id === stage;
            return (
              <div key={item.id} className="min-w-0">
                <div className={cn("h-1.5 rounded-full", done ? "bg-bull" : active ? "bg-forge" : "bg-border")} />
                <div className="mt-1 truncate font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {caseStudy && <CandleReplay caseStudy={caseStudy} autoPlayOnView={scenario.mode === "learning"} />}
          <div className="rounded-xl border bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-data">Contexte</div>
            {scenario.layers.context}
          </div>

          {stage === "context" && scenario.mode === "evaluation" && (
            <Button onClick={() => setStage("publication")} className="w-full bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95 sm:w-auto">
              <PauseCircle className="h-4 w-4" /> Ouvrir la pause pédagogique
            </Button>
          )}

          {(stage === "publication" || stage === "decision" || stage === "debrief") && (
            <div className="rounded-xl border border-data/30 bg-data/5 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-data">
                <PauseCircle className="h-3.5 w-3.5" /> Pause pédagogique — publication
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {caseStudy?.driver ?? scenario.spec.macro[0]} · hiérarchisez driver, transmission et invalidation avant l'outcome.
              </p>
              {stage === "publication" && (
                <Button onClick={() => setStage("decision")} className="mt-3 bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
                  Passer à la décision <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {(stage === "decision" || stage === "debrief") && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">{caseStudy?.decision.prompt ?? "Quelle décision respecte le mieux la chaîne de causalité ?"}</p>
              <div className="grid gap-2.5">
                {choices.map((choice) => {
                  const isCorrect = choice.id === correctId;
                  const picked = selected === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => choose(choice.id)}
                      disabled={answered}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
                        !answered && "hover:border-forge/60 hover:bg-surface-2",
                        answered && isCorrect && "border-bull/60 bg-bull/10",
                        answered && picked && !isCorrect && "border-bear/60 bg-bear/10",
                        answered && !isCorrect && !picked && "opacity-50",
                      )}
                    >
                      <span className="text-foreground">{choice.label}</span>
                      {answered && isCorrect && <Check className="h-4 w-4 shrink-0 text-bull" />}
                      {answered && picked && !isCorrect && <X className="h-4 w-4 shrink-0 text-bear" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {answered && (
            <div className="animate-rise-in space-y-3">
              <div className={cn("rounded-xl border p-4", correct ? "border-bull/40 bg-bull/5" : "border-bear/40 bg-bear/5")}>
                <div className={cn("mb-1.5 flex items-center gap-2 text-sm font-semibold", correct ? "text-bull" : "text-bear")}>
                  {correct ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {correct ? "Décision correcte" : "Décision à recalibrer"}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{caseStudy?.decision.explanation ?? "La bonne réponse respecte la hiérarchie driver → transmission → actif → invalidation."}</p>
              </div>
              {caseStudy?.outcome && (
                <div className="rounded-xl border border-forge/30 bg-forge/5 p-4">
                  <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-forge">Outcome réel</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{caseStudy.outcome}</p>
                </div>
              )}
              <Button type="button" variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" /> Rejouer ce scénario
              </Button>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-xl border bg-surface p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Couches révélées</div>
          <div className="mt-3 space-y-3">
            {layerGroups.map((group) => (
              <div key={group.label} className="rounded-lg border bg-card p-3">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-data">
                  <group.icon className="h-3.5 w-3.5" /> {group.label}
                </div>
                <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                  {group.values.map((value) => <li key={value}>• {value}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-forge/30 bg-forge/5 p-3 font-mono text-[10px] uppercase tracking-wider text-forge">
            Seuil {scenario.barem.passThreshold}% · poids ×{scenario.barem.weight}
          </div>
        </aside>
      </div>
    </article>
  );
}