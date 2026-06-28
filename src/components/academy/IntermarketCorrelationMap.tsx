import { useState } from "react";
import { GitBranch } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

const assets = ["USD", "US10Y", "S&P", "Gold", "Oil", "JPY"];
const regimes = {
  disinflation: { label: "Disinflation", values: [0.2, -0.4, 0.7, 0.3, -0.2, -0.1] },
  inflation: { label: "Inflation shock", values: [0.6, 0.8, -0.6, 0.2, 0.7, -0.3] },
  stress: { label: "Risk-off stress", values: [0.8, -0.5, -0.9, 0.5, -0.6, 0.7] },
} as const;

type Regime = keyof typeof regimes;

export function IntermarketCorrelationMap() {
  const [regime, setRegime] = useState<Regime>("inflation");
  const current = regimes[regime];
  return (
    <WidgetFrame title="Intermarket Correlation Map" subtitle="Comparez les réactions d’actifs selon le régime dominant." badge="Cross-asset">
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(regimes) as Regime[]).map((key) => (
          <button key={key} onClick={() => setRegime(key)} className={cn("rounded-full border px-3 py-1 text-xs", regime === key ? "border-forge bg-forge/10 text-forge" : "border-border text-muted-foreground hover:border-forge/40")}>{regimes[key].label}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset, i) => {
          const value = current.values[i];
          return (
            <div key={asset} className="premium-hover rounded-xl border bg-surface p-4">
              <div className="flex items-center justify-between"><span className="font-mono text-sm font-semibold text-foreground">{asset}</span><GitBranch className="h-4 w-4 text-data" /></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                <div className={cn("h-full rounded-full", value >= 0 ? "bg-bull" : "bg-bear")} style={{ width: `${Math.abs(value) * 100}%` }} />
              </div>
              <div className={cn("mt-2 font-mono text-xs", value >= 0 ? "text-bull" : "text-bear")}>{value > 0 ? "+" : ""}{value.toFixed(1)} beta</div>
            </div>
          );
        })}
      </div>
    </WidgetFrame>
  );
}