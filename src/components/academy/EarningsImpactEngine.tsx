import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

const EXPECTED_EPS = 2.1;

export function EarningsImpactEngine() {
  const [actual, setActual] = useState(2.1);
  const [guidance, setGuidance] = useState(0); // -2 cut .. +2 raise

  const surprisePct = ((actual - EXPECTED_EPS) / EXPECTED_EPS) * 100;
  // Stylised price reaction model: earnings surprise + guidance dominate
  const move = surprisePct * 1.4 + guidance * 3.2;
  const up = move >= 0;
  const guidanceLabel = ["Forte révision en baisse", "Révision en baisse", "Confirmée", "Révision en hausse", "Forte révision en hausse"][guidance + 2];

  return (
    <WidgetFrame
      title="Earnings Impact Engine"
      subtitle="BPA attendu vs publié + guidance → réaction estimée du cours."
      badge="Simulation"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-surface p-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">BPA attendu</div>
          <div className="font-mono text-xl font-semibold tabular-nums text-foreground">${EXPECTED_EPS.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border bg-surface p-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">BPA publié</div>
          <div className="font-mono text-xl font-semibold tabular-nums text-forge">${actual.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-foreground">BPA publié</span>
          <span className={cn("font-mono tabular-nums", surprisePct >= 0 ? "text-bull" : "text-bear")}>
            surprise {surprisePct >= 0 ? "+" : ""}
            {surprisePct.toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min={1.2}
          max={3}
          step={0.05}
          value={actual}
          onChange={(e) => setActual(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--forge)]"
        />
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-foreground">Guidance (prévisions futures)</span>
          <span className="font-mono text-xs text-data">{guidanceLabel}</span>
        </div>
        <input
          type="range"
          min={-2}
          max={2}
          step={1}
          value={guidance}
          onChange={(e) => setGuidance(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--data)]"
        />
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-forge/30 bg-surface-2 p-4">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Réaction estimée du cours</div>
        <div className={cn("flex items-center gap-2 text-2xl font-semibold tabular-nums", up ? "text-bull" : "text-bear")}>
          {up ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
          {up ? "+" : ""}
          {move.toFixed(1)}%
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Souvent, la guidance pèse plus lourd que le résultat publié : une bonne surprise assortie d'une guidance abaissée
        peut faire chuter le titre.
      </p>
    </WidgetFrame>
  );
}
