import { CheckCircle2, XCircle } from "lucide-react";
import type { EvaluationQuestion } from "@/lib/academy/evaluation-bank";
import { cn } from "@/lib/utils";
import { VisualLightbox } from "./VisualLightbox";

export function VisualQuestion({
  question,
  selected,
  reveal,
  onSelect,
}: {
  question: EvaluationQuestion;
  selected?: string;
  reveal: boolean;
  onSelect: (choiceId: string) => void;
}) {
  const visualSrc = question.visualId ? `/academy/ch1/visuals/${question.visualId}.webp` : null;
  return (
    <div className="rounded-xl border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="max-w-2xl text-sm font-semibold leading-relaxed text-foreground">{question.prompt}</h4>
        {question.widget && (
          <span className="rounded-full border border-data/30 bg-data/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-data">
            {question.widget}
          </span>
        )}
      </div>
      {visualSrc && (
        <div className="mt-3">
          <VisualLightbox src={visualSrc} alt={`Support visuel ${question.visualId} — ${question.widget ?? "évaluation"}`} label={`Support ${question.visualId}`} />
        </div>
      )}
      <div className="mt-3 grid gap-2">
        {question.choices.map((choice) => {
          const picked = selected === choice.id;
          const correct = question.correctId === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => !reveal && onSelect(choice.id)}
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
}
