import { useMemo, useState } from "react";
import { Gauge, RotateCw } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

type Phase = "Expansion" | "Pic" | "Ralentissement" | "Récession";

const phases: Record<Phase, { growth: number; inflation: number; policy: string; assets: string; tone: string }> = {
  Expansion: { growth: 82, inflation: 48, policy: "Neutre → restrictive", assets: "Actions cycliques, crédit", tone: "text-bull" },
  Pic: { growth: 58, inflation: 78, policy: "Restrictive", assets: "USD, énergie, duration courte", tone: "text-forge" },
  Ralentissement: { growth: 32, inflation: 55, policy: "Pause → easing", assets: "Qualité, obligations", tone: "text-data" },
  Récession: { growth: 18, inflation: 28, policy: "Easing agressif", assets: "Bonds, or, défensives", tone: "text-bear" },
};

const order = Object.keys(phases) as Phase[];

export function EconomicCycleWheel() {
  const [phase, setPhase] = useState<Phase>("Expansion");
  const current = phases[phase];
  const index = order.indexOf(phase);

  const coordinates = useMemo(() => {
    const angle = (index / order.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 90 + Math.cos(angle) * 58, y: 90 + Math.sin(angle) * 58 };
  }, [index]);

  return (
    <WidgetFrame title="Economic Cycle Wheel" subtitle="Positionnez le cycle et lisez le régime d’actifs cohérent." badge="Cycle macro">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,200px)_1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[200px]">
          <svg viewBox="0 0 180 180" className="h-full w-full">
            <circle cx="90" cy="90" r="72" fill="var(--surface)" stroke="var(--border)" />
            <path d="M90 18 A72 72 0 0 1 162 90" fill="none" stroke="var(--bull)" strokeWidth="14" opacity="0.45" />
            <path d="M162 90 A72 72 0 0 1 90 162" fill="none" stroke="var(--forge)" strokeWidth="14" opacity="0.45" />
            <path d="M90 162 A72 72 0 0 1 18 90" fill="none" stroke="var(--data)" strokeWidth="14" opacity="0.45" />
            <path d="M18 90 A72 72 0 0 1 90 18" fill="none" stroke="var(--bear)" strokeWidth="14" opacity="0.45" />
            <circle cx={coordinates.x} cy={coordinates.y} r="8" fill="var(--forge)" className="transition-all duration-500" />
            <text x="90" y="86" textAnchor="middle" className="font-mono" fontSize="10" fill="var(--muted-foreground)">RÉGIME</text>
            <text x="90" y="104" textAnchor="middle" className="font-mono" fontSize="13" fontWeight="700" fill="var(--foreground)">{phase}</text>
          </svg>
        </div>
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-2">
            {order.map((item) => (
              <button
                key={item}
                onClick={() => setPhase(item)}
                className={cn(
                  "rounded-lg border p-2.5 text-left transition-all premium-hover sm:p-3",
                  phase === item ? "border-forge bg-forge/10" : "border-border bg-surface hover:border-forge/40",
                )}
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground sm:gap-2 sm:text-sm">
                  <RotateCw className="h-3.5 w-3.5 shrink-0 text-forge" />
                  <span className="truncate">{item}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Metric label="Croissance" value={current.growth} />
            <Metric label="Inflation" value={current.inflation} />
          </div>
          <div className="mt-4 rounded-xl border bg-surface p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><Gauge className="h-3.5 w-3.5 text-data" /> Lecture desk</div>
            <p className="mt-2 text-sm text-muted-foreground">Politique: <span className="text-foreground">{current.policy}</span></p>
            <p className={cn("mt-1 text-sm font-semibold", current.tone)}>Allocation: {current.assets}</p>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-surface p-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span><span>{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-gradient-forge" style={{ width: `${value}%` }} /></div>
    </div>
  );
}
