import { useState } from "react";
import { GitBranch } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const assets = ["USD", "US10Y", "S&P", "Gold", "Oil", "JPY"];

type RegimeKey = "disinflation" | "inflation" | "stress";

const REGIME_VALUES: Record<RegimeKey, number[]> = {
  disinflation: [0.2, -0.4, 0.7, 0.3, -0.2, -0.1],
  inflation: [0.6, 0.8, -0.6, 0.2, 0.7, -0.3],
  stress: [0.8, -0.5, -0.9, 0.5, -0.6, 0.7],
};

const REGIME_KEYS: RegimeKey[] = ["disinflation", "inflation", "stress"];

export function IntermarketCorrelationMap() {
  const t = useT().widgetsMacro.intermarketCorrelationMap;
  const [regime, setRegime] = useState<RegimeKey>("inflation");
  const values = REGIME_VALUES[regime];

  return (
    <WidgetFrame title={t.title} subtitle={t.subtitle} badge={t.badge}>
      <div className="mb-4 flex flex-wrap gap-2">
        {REGIME_KEYS.map((key) => (
          <button key={key} onClick={() => setRegime(key)} className={cn("rounded-full border px-3 py-1 text-xs", regime === key ? "border-forge bg-forge/10 text-forge" : "border-border text-muted-foreground hover:border-forge/40")}>{t.regimes[key]}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset, i) => {
          const value = values[i];
          return (
            <div key={asset} className="premium-hover rounded-xl border bg-surface p-4">
              <div className="flex items-center justify-between"><span className="font-mono text-sm font-semibold text-foreground">{asset}</span><GitBranch className="h-4 w-4 text-data" /></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                <div className={cn("h-full rounded-full", value >= 0 ? "bg-bull" : "bg-bear")} style={{ width: `${Math.abs(value) * 100}%` }} />
              </div>
              <div className={cn("mt-2 font-mono text-xs", value >= 0 ? "text-bull" : "text-bear")}>{t.betaLabel((value > 0 ? "+" : "") + value.toFixed(1))}</div>
            </div>
          );
        })}
      </div>
    </WidgetFrame>
  );
}
