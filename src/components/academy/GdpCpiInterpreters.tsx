import { useMemo, useState } from "react";
import { BarChart3, Flame } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

export function GdpCpiInterpreters() {
  const [gdp, setGdp] = useState(2.8);
  const [cpi, setCpi] = useState(3.6);

  const regime = useMemo(() => {
    if (gdp >= 2.5 && cpi < 3) return { label: "Goldilocks", asset: "Equities ↑ · USD mixed", tone: "bull" as const };
    if (gdp >= 2.5 && cpi >= 3) return { label: "Hot growth", asset: "Rates ↑ · USD ↑ · multiples sous pression", tone: "forge" as const };
    if (gdp < 1 && cpi >= 3) return { label: "Stagflation", asset: "Risk assets ↓ · gold/commodities ↑", tone: "bear" as const };
    return { label: "Disinflation slowdown", asset: "Bonds ↑ · défensives ↑", tone: "data" as const };
  }, [gdp, cpi]);

  return (
    <WidgetFrame title="GDP / CPI Interpreters" subtitle="Croisez croissance et inflation pour qualifier le régime macro." badge="Regime map">
      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          <Slider label="GDP annualized" value={gdp} set={setGdp} min={-2} max={6} step={0.1} unit="%" />
          <Slider label="CPI YoY" value={cpi} set={setCpi} min={0} max={8} step={0.1} unit="%" />
          <div className="relative h-52 rounded-xl border bg-gradient-surface p-4">
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-border" />
            <div className="absolute left-4 right-4 top-1/2 h-px bg-border" />
            <div className="absolute" style={{ left: `${Math.min(92, Math.max(8, ((gdp + 2) / 8) * 100))}%`, top: `${Math.min(88, Math.max(8, 100 - (cpi / 8) * 100))}%` }}>
              <div className="h-3 w-3 rounded-full bg-forge shadow-glow" />
            </div>
            <span className="absolute left-4 top-3 text-xs text-muted-foreground">Inflation haute</span>
            <span className="absolute bottom-3 right-4 text-xs text-muted-foreground">Croissance forte</span>
          </div>
        </div>
        <div className="rounded-2xl border bg-surface p-5">
          {regime.tone === "bear" ? <Flame className="h-5 w-5 text-bear" /> : <BarChart3 className="h-5 w-5 text-data" />}
          <div className="mt-3 font-display text-xl font-semibold text-foreground">{regime.label}</div>
          <div className={cn("mt-3 rounded-lg border p-3 text-sm font-semibold", regime.tone === "bull" && "border-bull/40 bg-bull/10 text-bull", regime.tone === "forge" && "border-forge/40 bg-forge/10 text-forge", regime.tone === "bear" && "border-bear/40 bg-bear/10 text-bear", regime.tone === "data" && "border-data/40 bg-data/10 text-data")}>{regime.asset}</div>
        </div>
      </div>
    </WidgetFrame>
  );
}

function Slider({ label, value, set, min, max, step, unit }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; unit: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm"><span className="text-foreground">{label}</span><span className="font-mono text-forge">{value}{unit}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--forge)]" />
    </div>
  );
}