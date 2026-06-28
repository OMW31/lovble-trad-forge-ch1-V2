import { useMemo, useState } from "react";
import { Sigma } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

export function DcfSimulator() {
  const [growth, setGrowth] = useState(8);
  const [margin, setMargin] = useState(18);
  const [wacc, setWacc] = useState(9);
  const [terminal, setTerminal] = useState(3);

  const dcf = useMemo(() => {
    const revenue = 100;
    const flows = Array.from({ length: 5 }, (_, i) => revenue * Math.pow(1 + growth / 100, i + 1) * (margin / 100));
    const pv = flows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + wacc / 100, i + 1), 0);
    const terminalValue = (flows[4] * (1 + terminal / 100)) / ((wacc - terminal) / 100);
    const pvTerminal = terminalValue / Math.pow(1 + wacc / 100, 5);
    return { value: pv + pvTerminal, flows };
  }, [growth, margin, wacc, terminal]);

  const tone = dcf.value > 320 ? "bull" : dcf.value < 220 ? "bear" : "forge";

  return (
    <WidgetFrame title="DCF Simulator" subtitle="Actualisez les flux futurs et testez la sensibilité au WACC et à la croissance terminale." badge="Intrinsic value">
      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          <Slider label="Revenue growth" value={growth} set={setGrowth} min={0} max={18} step={0.5} unit="%" />
          <Slider label="FCF margin" value={margin} set={setMargin} min={6} max={32} step={0.5} unit="%" />
          <Slider label="WACC" value={wacc} set={setWacc} min={6} max={14} step={0.25} unit="%" />
          <Slider label="Terminal growth" value={terminal} set={setTerminal} min={1} max={5} step={0.25} unit="%" />
        </div>
        <div className="rounded-2xl border bg-surface p-5">
          <Sigma className="h-5 w-5 text-forge" />
          <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Enterprise value index</div>
          <div className="mt-1 font-mono text-4xl font-semibold tabular-nums text-foreground">{dcf.value.toFixed(0)}</div>
          <div className={cn("mt-3 rounded-lg border p-3 text-sm font-semibold", tone === "bull" && "border-bull/40 bg-bull/10 text-bull", tone === "forge" && "border-forge/40 bg-forge/10 text-forge", tone === "bear" && "border-bear/40 bg-bear/10 text-bear")}>{tone === "bull" ? "Valeur robuste" : tone === "bear" ? "Compression sévère" : "Zone médiane"}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {dcf.flows.map((flow, i) => <div key={i} className="rounded-lg border bg-surface p-2 text-center"><div className="font-mono text-[10px] text-muted-foreground">A{i + 1}</div><div className="font-mono text-sm text-foreground">{flow.toFixed(1)}</div></div>)}
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