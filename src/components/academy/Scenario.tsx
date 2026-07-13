import { useState, type ReactNode } from "react";
import { Check, X, ArrowRight, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LevelBadge } from "./primitives";

export interface ScenarioChoice {
  id: string;
  label: string;
}

export interface ScenarioProps {
  title: string;
  level: number;
  context: ReactNode;
  prompt: string;
  choices: ScenarioChoice[];
  correctId: string;
  explanation: ReactNode;
  explanationDirect?: ReactNode;
  explanationDetail?: ReactNode;
  outcome?: ReactNode;
  /** optional visual (e.g. <CandleReplay/>) shown above the decision */
  visual?: ReactNode;
  onComplete?: (correct: boolean) => void;
}

export function Scenario({
  title,
  level,
  context,
  prompt,
  choices,
  correctId,
  explanation,
  explanationDirect,
  explanationDetail,
  outcome,
  visual,
  onComplete,
}: ScenarioProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const correct = selected === correctId;

  const choose = (id: string) => {
    if (answered) return;
    setSelected(id);
    onComplete?.(id === correctId);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-forge/30 bg-card shadow-elegant">
      <div className="flex items-center justify-between gap-3 bg-forge/10 px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-forge">
          <Target className="h-3.5 w-3.5" />
          Scénario · Décision
        </div>
        <LevelBadge level={level} />
      </div>

      <div className="space-y-4 p-5">
        <h4 className="font-display text-lg font-semibold text-foreground">{title}</h4>
        <div className="rounded-lg border bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
          {context}
        </div>

        {visual}

        <p className="pt-1 text-sm font-medium text-foreground">{prompt}</p>

        <div className="grid gap-2.5">
          {choices.map((ch) => {
            const isCorrect = ch.id === correctId;
            const isPicked = ch.id === selected;
            return (
              <button
                key={ch.id}
                onClick={() => choose(ch.id)}
                disabled={answered}
                className={cn(
                  "group flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
                  !answered && "hover:border-forge/60 hover:bg-surface-2",
                  answered && isCorrect && "border-bull/60 bg-bull/10",
                  answered && isPicked && !isCorrect && "border-bear/60 bg-bear/10",
                  answered && !isCorrect && !isPicked && "opacity-50",
                )}
              >
                <span className={cn("text-foreground", answered && isCorrect && "font-medium")}>
                  {ch.label}
                </span>
                {answered && isCorrect && <Check className="h-4 w-4 shrink-0 text-bull" />}
                {answered && isPicked && !isCorrect && <X className="h-4 w-4 shrink-0 text-bear" />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="animate-rise-in space-y-3">
            <div
              className={cn(
                "rounded-lg border p-4",
                correct ? "border-bull/40 bg-bull/5" : "border-bear/40 bg-bear/5",
              )}
            >
              <div
                className={cn(
                  "mb-1.5 flex items-center gap-2 text-sm font-semibold",
                  correct ? "text-bull" : "text-bear",
                )}
              >
                {correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                {correct ? "Analyse correcte" : "Pas tout à fait"}
              </div>
              <Tabs defaultValue="direct" className="mt-3">
                <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-transparent p-0">
                  <TabsTrigger value="direct" className="h-auto rounded-lg border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:border-forge/50">
                    Réponse directe
                  </TabsTrigger>
                  <TabsTrigger value="complete" className="h-auto rounded-lg border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:border-forge/50">
                    Réponse complète
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="direct" className="mt-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{explanationDirect ?? explanation}</p>
                </TabsContent>
                <TabsContent value="complete" className="mt-3 space-y-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">{explanationDetail ?? explanation}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{explanation}</p>
                </TabsContent>
              </Tabs>
            </div>
            {outcome && (
              <div className="flex items-start gap-2 rounded-lg border border-data/30 bg-data/5 p-4">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-data" />
                <div>
                  <div className="mb-0.5 font-mono text-[10px] uppercase tracking-wider text-data">
                    Ce qui s'est réellement passé
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{outcome}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
