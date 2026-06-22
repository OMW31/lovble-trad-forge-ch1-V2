import { useState } from "react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

interface Peer {
  name: string;
  ticker: string;
  growth: number; // %
  margin: number; // net margin %
  roe: number; // %
  pe: number; // P/E
}

const PEERS: Peer[] = [
  { name: "Apple", ticker: "AAPL", growth: 8, margin: 25, roe: 147, pe: 29 },
  { name: "Microsoft", ticker: "MSFT", growth: 16, margin: 36, roe: 39, pe: 35 },
  { name: "Tesla", ticker: "TSLA", growth: 19, margin: 11, roe: 23, pe: 65 },
  { name: "Nvidia", ticker: "NVDA", growth: 126, margin: 49, roe: 91, pe: 58 },
];

type MetricKey = "growth" | "margin" | "roe" | "pe";

const METRICS: { key: MetricKey; label: string; unit: string; betterHigh: boolean }[] = [
  { key: "growth", label: "Croissance des ventes", unit: "%", betterHigh: true },
  { key: "margin", label: "Marge nette", unit: "%", betterHigh: true },
  { key: "roe", label: "ROE", unit: "%", betterHigh: true },
  { key: "pe", label: "P/E (valorisation)", unit: "x", betterHigh: false },
];

export function PeerComparisonMatrix() {
  const [metric, setMetric] = useState<MetricKey>("growth");
  const m = METRICS.find((x) => x.key === metric)!;
  const max = Math.max(...PEERS.map((p) => p[metric]));
  const best = m.betterHigh
    ? PEERS.reduce((a, b) => (b[metric] > a[metric] ? b : a))
    : PEERS.reduce((a, b) => (b[metric] < a[metric] ? b : a));

  return (
    <WidgetFrame
      title="Peer Comparison Matrix"
      subtitle="Comparez les leaders sur la métrique de votre choix."
      badge="Benchmark"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {METRICS.map((x) => (
          <button
            key={x.key}
            onClick={() => setMetric(x.key)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              metric === x.key ? "border-forge bg-forge/15 text-forge" : "border-border text-muted-foreground hover:border-forge/40",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {PEERS.map((p) => {
          const v = p[metric];
          const isBest = p.ticker === best.ticker;
          return (
            <div key={p.ticker}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{p.ticker}</span>
                  {isBest && (
                    <span className="rounded-full bg-forge/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-forge">
                      Leader
                    </span>
                  )}
                </span>
                <span className="font-mono tabular-nums text-foreground">
                  {v}
                  {m.unit}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-border">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", isBest ? "bg-gradient-forge" : "bg-data/60")}
                  style={{ width: `${(v / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {m.betterHigh
          ? "Sur cette métrique, plus c'est élevé, mieux c'est."
          : "Sur le P/E, un multiple plus bas peut traduire une valorisation plus prudente — à mettre en regard de la croissance."}
      </p>
    </WidgetFrame>
  );
}
