import { useState } from "react";
import { ArrowRight, Network } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

const shocks = {
  growthBeat: {
    label: "Growth beat",
    nodes: ["PIB ↑", "Taux attendus ↑", "USD ↑", "Equities qualité ↑", "Gold ↓"],
    thesis: "La croissance supérieure au consensus repousse l’assouplissement et soutient la devise domestique.",
  },
  inflationBeat: {
    label: "Inflation beat",
    nodes: ["IPC ↑", "Banque centrale hawkish", "Bonds ↓", "Devise ↑", "Actions duration ↓"],
    thesis: "La surprise inflation force un repricing des taux; le marché vend la duration et réévalue les multiples.",
  },
  riskOff: {
    label: "Risk-off",
    nodes: ["Volatilité ↑", "Liquidité USD ↑", "Carry ↓", "JPY/CHF ↑", "Commodities ↓"],
    thesis: "En stress systémique, la liquidité prime: les flux reviennent vers les devises refuges et actifs défensifs.",
  },
} as const;

type ShockKey = keyof typeof shocks;

export function MacroRelationshipEngine() {
  const [active, setActive] = useState<ShockKey>("inflationBeat");
  const shock = shocks[active];

  return (
    <WidgetFrame title="Macro Relationship Engine" subtitle="Visualisez la chaîne de transmission entre données, taux et actifs." badge="Intermarket">
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(shocks) as ShockKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={cn("rounded-full border px-3 py-1 text-xs transition-all", active === key ? "border-data bg-data/10 text-data" : "border-border text-muted-foreground hover:border-data/40")}
          >
            {shocks[key].label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border bg-gradient-surface p-4">
        <div className="flex min-w-[680px] items-center gap-2">
          {shock.nodes.map((node, index) => (
            <div key={node} className="contents">
              <div className="premium-hover flex min-h-20 flex-1 flex-col justify-center rounded-xl border bg-card p-3 text-center">
                <Network className="mx-auto mb-2 h-4 w-4 text-forge" />
                <span className="font-mono text-xs font-semibold text-foreground">{node}</span>
              </div>
              {index < shock.nodes.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 rounded-lg border border-data/30 bg-data/5 p-3 text-sm leading-relaxed text-muted-foreground">{shock.thesis}</p>
    </WidgetFrame>
  );
}