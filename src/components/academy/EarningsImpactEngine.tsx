import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const EXPECTED_EPS = 2.1;

export function EarningsImpactEngine() {
  const t = useT().widgetsCorp.earningsImpactEngine;
  const [actual, setActual] = useState(2.1);
  const [guidance, setGuidance] = useState(0); // -2 cut .. +2 raise

  const surprisePct = ((actual - EXPECTED_EPS) / EXPECTED_EPS) * 100;
  // Stylised price reaction model: earnings surprise + guidance dominate
  const move = surprisePct * 1.4 + guidance * 3.2;
  const up = move >= 0;
  const guidanceLabels = [
    t.guidanceLevels.strongCut,
    t.guidanceLevels.cut,
    t.guidanceLevels.confirmed,
    t.guidanceLevels.raise,
    t.guidanceLevels.strongRaise,
  ];
  const guidanceLabel = guidanceLabels[guidance + 2];

  return (
    <WidgetFrame
      title={t.title}
      subtitle={t.subtitle}
      badge={t.badge}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-surface p-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.epsExpected}</div>
          <div className="font-mono text-xl font-semibold tabular-nums text-foreground">${EXPECTED_EPS.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border bg-surface p-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.epsPublished}</div>
          <div className="font-mono text-xl font-semibold tabular-nums text-forge">${actual.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-foreground">{t.epsPublished}</span>
          <span className={cn("font-mono tabular-nums", surprisePct >= 0 ? "text-bull" : "text-bear")}>
            {t.surprise(`${surprisePct >= 0 ? "+" : ""}${surprisePct.toFixed(1)}`)}
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
          <span className="text-foreground">{t.guidanceLabel}</span>
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
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.reactionTitle}</div>
        <div className={cn("flex items-center gap-2 text-2xl font-semibold tabular-nums", up ? "text-bull" : "text-bear")}>
          {up ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
          {up ? "+" : ""}
          {move.toFixed(1)}%
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {t.footnote}
      </p>
    </WidgetFrame>
  );
}
