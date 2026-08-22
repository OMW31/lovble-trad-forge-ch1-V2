import { useState } from "react";
import { Calculator } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

type Mode = "quality" | "value" | "risk";

export function FinancialRatios() {
  const t = useT().widgetsCorp.financialRatios;
  const [mode, setMode] = useState<Mode>("quality");
  const rows = Object.values(t.rows);
  return (
    <WidgetFrame title={t.title} subtitle={t.subtitle} badge="Ratios">
      <div className="mb-4 flex gap-2">
        {(["quality", "value", "risk"] as Mode[]).map((item) => (
          <button key={item} onClick={() => setMode(item)} className={cn("rounded-full border px-3 py-1 text-xs", mode === item ? "border-forge bg-forge/10 text-forge" : "border-border text-muted-foreground hover:border-forge/40")}>{t.modes[item]}</button>
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
