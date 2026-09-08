import { useMemo, useState } from "react";
import { Landmark } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function FedSimulator() {
  const t = useT().widgetsMacro.fedSimulator;
  const [cpi, setCpi] = useState(3.4);
  const [nfp, setNfp] = useState(240);
  const [unemployment, setUnemployment] = useState(3.8);

  const decision = useMemo(() => {
    const inflationPressure = cpi > 3 ? 2 : cpi > 2.3 ? 1 : 0;
    const laborPressure = nfp > 220 && unemployment < 4 ? 2 : nfp > 120 ? 1 : 0;
    const score = inflationPressure + laborPressure;
    if (score >= 3) return { key: "hawkishHold" as const, tone: "bull" as const, prob: 72 };
    if (score === 2) return { key: "dataDependentHold" as const, tone: "forge" as const, prob: 56 };
    return { key: "dovishPivot" as const, tone: "bear" as const, prob: 68 };
  }, [cpi, nfp, unemployment]);

  const dec = t.decisions[decision.key];

  return (
    <WidgetFrame title={t.title} subtitle={t.subtitle} badge={t.badge}>
      <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
        <div className="space-y-4">
          <Slider label={t.cpiLabel} value={cpi} set={setCpi} min={1.4} max={6.5} step={0.1} unit="%" />
          <Slider label={t.nfpLabel} value={nfp} set={setNfp} min={-100} max={500} step={10} unit="k" />
          <Slider label={t.unemploymentLabel} value={unemployment} set={setUnemployment} min={3} max={7} step={0.1} unit="%" />
        </div>
        <div className="rounded-2xl border bg-surface p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><Landmark className="h-3.5 w-3.5 text-forge" /> {t.fomcReadLabel}</div>
          <div className="mt-4 font-display text-xl font-semibold text-foreground">{dec.label}</div>
          <div className={cn("mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold", decision.tone === "bull" && "bg-bull/15 text-bull", decision.tone === "forge" && "bg-forge/15 text-forge", decision.tone === "bear" && "bg-bear/15 text-bear")}>{dec.usd}</div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-gradient-forge" style={{ width: `${decision.prob}%` }} /></div>
          <p className="mt-3 text-sm text-muted-foreground">{t.marketSummary(dec.ratePath, decision.prob)}</p>
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
