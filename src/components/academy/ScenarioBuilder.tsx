import { useMemo, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const drivers = ["Growth beat", "Inflation shock", "Policy pivot", "Risk-off"] as const;
const assets = ["EUR/USD", "USD/JPY", "S&P 500", "Gold"] as const;
const horizons = ["Intraday", "1-4 weeks", "3-6 months"] as const;

export function ScenarioBuilder() {
  const t = useT().widgetsCorp.scenarioBuilder;
  const [driver, setDriver] = useState<(typeof drivers)[number]>("Inflation shock");
  const [asset, setAsset] = useState<(typeof assets)[number]>("USD/JPY");
  const [horizon, setHorizon] = useState<(typeof horizons)[number]>("1-4 weeks");

  const scenario = useMemo(() => {
    const thesis = driver === "Inflation shock" || driver === "Growth beat" ? t.thesis.ratesHigher : driver === "Policy pivot" ? t.thesis.durationReprice : t.thesis.safeHaven;
    const direction = asset.includes("USD") || asset === "Gold" ? t.direction.conditional : t.direction.cautious;
    return { thesis, direction, invalidation: t.invalidation };
  }, [driver, asset, t]);

  return (
    <WidgetFrame title={t.title} subtitle={t.subtitle} badge={t.badge}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Picker label={t.pickers.driver} items={drivers} value={driver} set={setDriver} />
        <Picker label={t.pickers.asset} items={assets} value={asset} set={setAsset} />
        <Picker label={t.pickers.horizon} items={horizons} value={horizon} set={setHorizon} />
      </div>
      <div className="mt-5 rounded-2xl border border-forge/30 bg-forge/5 p-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-forge"><ClipboardCheck className="h-3.5 w-3.5" /> {t.ticketLabel}</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t.sentence(asset, driver, scenario.thesis, horizon, scenario.direction, scenario.invalidation)}
        </p>
      </div>
    </WidgetFrame>
  );
}

function Picker<T extends string>({ label, items, value, set }: { label: string; items: readonly T[]; value: T; set: (v: T) => void }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="space-y-2">
        {items.map((item) => <button key={item} onClick={() => set(item)} className={cn("w-full rounded-lg border px-3 py-2 text-left text-sm", value === item ? "border-forge bg-forge/10 text-forge" : "border-border bg-surface text-muted-foreground hover:border-forge/40")}>{item}</button>)}
      </div>
    </div>
  );
}
