import { useState } from "react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

const PRICE = 190;
const EPS = 6.4;
const SPS = 24.5; // sales per share
const EBITDA_PS = 9.2;
const NET_DEBT_PS = 3;

export function ValuationLab() {
  const [pe, setPe] = useState(26);
  const [ps, setPs] = useState(7);
  const [evEbitda, setEvEbitda] = useState(20);

  const vPe = EPS * pe;
  const vPs = SPS * ps;
  const vEv = EBITDA_PS * evEbitda - NET_DEBT_PS;
  const fair = (vPe + vPs + vEv) / 3;
  const upside = ((fair - PRICE) / PRICE) * 100;
  const verdict = upside > 8 ? "Sous-évaluée" : upside < -8 ? "Surévaluée" : "Proche du juste prix";
  const tone = upside > 8 ? "bull" : upside < -8 ? "bear" : "forge";

  const Method = ({ label, value }: { label: string; value: number }) => (
    <div className="rounded-lg border bg-surface p-3 text-center">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">${value.toFixed(0)}</div>
    </div>
  );

  const Slider = ({ label, value, set, min, max, step }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number }) => (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="font-mono tabular-nums text-forge">{value}x</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--forge)]"
      />
    </div>
  );

  return (
    <WidgetFrame
      title="Valuation Lab"
      subtitle="Manipulez les multiples de valorisation et comparez la juste valeur au prix de marché."
      badge="Interactif"
    >
      <div className="mb-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <div className="rounded border bg-surface px-2 py-1.5 text-center"><span className="text-muted-foreground">Prix</span> <span className="font-mono text-foreground">${PRICE}</span></div>
        <div className="rounded border bg-surface px-2 py-1.5 text-center"><span className="text-muted-foreground">BPA</span> <span className="font-mono text-foreground">${EPS}</span></div>
        <div className="rounded border bg-surface px-2 py-1.5 text-center"><span className="text-muted-foreground">Ventes/action</span> <span className="font-mono text-foreground">${SPS}</span></div>
        <div className="rounded border bg-surface px-2 py-1.5 text-center"><span className="text-muted-foreground">EBITDA/action</span> <span className="font-mono text-foreground">${EBITDA_PS}</span></div>
      </div>

      <div className="space-y-4">
        <Slider label="P/E (cours / bénéfice)" value={pe} set={setPe} min={8} max={50} step={1} />
        <Slider label="P/S (cours / ventes)" value={ps} set={setPs} min={2} max={18} step={0.5} />
        <Slider label="EV/EBITDA" value={evEbitda} set={setEvEbitda} min={6} max={40} step={1} />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Method label="Via P/E" value={vPe} />
        <Method label="Via P/S" value={vPs} />
        <Method label="Via EV/EBITDA" value={vEv} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-forge/30 bg-surface-2 p-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Juste valeur estimée</div>
          <div className="font-mono text-2xl font-semibold tabular-nums text-foreground">${fair.toFixed(0)}</div>
        </div>
        <div className="text-right">
          <div
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-semibold",
              tone === "bull" && "bg-bull/15 text-bull",
              tone === "bear" && "bg-bear/15 text-bear",
              tone === "forge" && "bg-forge/15 text-forge",
            )}
          >
            {verdict}
          </div>
          <div className={cn("mt-1 font-mono text-xs tabular-nums", upside >= 0 ? "text-bull" : "text-bear")}>
            {upside >= 0 ? "+" : ""}
            {upside.toFixed(1)}% vs prix
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}
