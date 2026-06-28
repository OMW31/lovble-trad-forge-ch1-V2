import { useMemo, useState } from "react";
import { BriefcaseBusiness, TrendingDown, TrendingUp } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

export function NfpInterpreter() {
  const [jobs, setJobs] = useState(260);
  const [wages, setWages] = useState(0.4);
  const [unemployment, setUnemployment] = useState(3.7);

  const read = useMemo(() => {
    const hotJobs = jobs > 220;
    const hotWages = wages >= 0.4;
    const tight = unemployment <= 3.8;
    const score = [hotJobs, hotWages, tight].filter(Boolean).length;
    if (score >= 2) return { label: "Labor hot", usd: "USD bullish", rates: "2Y yield ↑", tone: "bull" as const };
    if (score === 1) return { label: "Mixed", usd: "USD choppy", rates: "Curve repricing", tone: "forge" as const };
    return { label: "Labor cooling", usd: "USD bearish", rates: "Cuts priced", tone: "bear" as const };
  }, [jobs, wages, unemployment]);

  return (
    <WidgetFrame title="NFP Calculator / Interpreter" subtitle="Combinez créations d’emplois, salaires et chômage pour lire le signal Fed/FX." badge="NFP">
      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          <Slider label="Jobs created" value={jobs} set={setJobs} min={-100} max={500} step={5} unit="k" />
          <Slider label="Hourly earnings m/m" value={wages} set={setWages} min={-0.2} max={1} step={0.1} unit="%" />
          <Slider label="Unemployment" value={unemployment} set={setUnemployment} min={3} max={6} step={0.1} unit="%" />
        </div>
        <div className="rounded-2xl border bg-surface p-5">
          <BriefcaseBusiness className="h-5 w-5 text-forge" />
          <div className="mt-3 font-display text-xl font-semibold text-foreground">{read.label}</div>
          <div className={cn("mt-3 flex items-center gap-2 rounded-lg border p-3 text-sm font-semibold", read.tone === "bull" && "border-bull/40 bg-bull/10 text-bull", read.tone === "bear" && "border-bear/40 bg-bear/10 text-bear", read.tone === "forge" && "border-forge/40 bg-forge/10 text-forge")}>
            {read.tone === "bear" ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />} {read.usd}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Transmission: {read.rates} → différentiel de taux → devise.</p>
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