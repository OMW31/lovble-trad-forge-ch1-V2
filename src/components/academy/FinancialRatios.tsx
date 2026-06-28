import { useState } from "react";
import { Calculator } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

type Mode = "quality" | "value" | "risk";

const rows = [
  { metric: "P/E", reading: "28x", quality: "Neutre", value: "Cher vs marché", risk: "Multiple sensible aux taux" },
  { metric: "ROE", reading: "31%", quality: "Excellent", value: "Justifie prime", risk: "Durabilité à vérifier" },
  { metric: "D/E", reading: "0.7x", quality: "Solide", value: "Bilan flexible", risk: "Risque dette faible" },
  { metric: "FCF yield", reading: "4.8%", quality: "Cash réel", value: "Correct", risk: "Protection partielle" },
];

export function FinancialRatios() {
  const [mode, setMode] = useState<Mode>("quality");
  return (
    <WidgetFrame title="Financial Ratios" subtitle="Lisez les ratios selon trois prismes: qualité, value et risque." badge="Ratios">
      <div className="mb-4 flex gap-2">
        {(["quality", "value", "risk"] as Mode[]).map((item) => (
          <button key={item} onClick={() => setMode(item)} className={cn("rounded-full border px-3 py-1 text-xs capitalize", mode === item ? "border-forge bg-forge/10 text-forge" : "border-border text-muted-foreground hover:border-forge/40")}>{item}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border">
        {rows.map((row) => (
          <div key={row.metric} className="grid grid-cols-[90px_80px_1fr] items-center gap-3 border-b bg-surface p-3 last:border-b-0">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground"><Calculator className="h-3.5 w-3.5 text-data" />{row.metric}</div>
            <div className="font-mono text-sm text-forge">{row.reading}</div>
            <div className="text-sm text-muted-foreground">{row[mode]}</div>
          </div>
        ))}
      </div>
    </WidgetFrame>
  );
}