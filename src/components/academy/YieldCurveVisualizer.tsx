import { useMemo, useState } from "react";
import { Activity } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const tenors = ["3M", "2Y", "5Y", "10Y", "30Y"];

export function YieldCurveVisualizer() {
  const t = useT().widgetsMacro.yieldCurveVisualizer;
  const [front, setFront] = useState(5.25);
  const [long, setLong] = useState(4.15);
  const values = useMemo(() => [front, front - 0.25, (front + long) / 2, long, long + 0.25], [front, long]);
  const spread = long - front;
  const regimeKey = spread < -0.5 ? "inversion" : spread > 0.7 ? "steepening" : "normalization";
  const regime = t.regimeLabels[regimeKey];
  const W = 420;
  const H = 170;
  const min = 2;
  const max = 6;
  const x = (i: number) => 26 + (i / (values.length - 1)) * (W - 52);
  const y = (v: number) => 16 + (1 - (v - min) / (max - min)) * (H - 42);
  const path = values.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");

  return (
    <WidgetFrame title={t.title} subtitle={t.subtitle} badge={t.badge}>
      <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
        <div>
          <div className="rounded-xl border bg-gradient-surface p-3">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
              {[0, 0.25, 0.5, 0.75, 1].map((g) => <line key={g} x1="20" x2={W - 20} y1={18 + g * (H - 44)} y2={18 + g * (H - 44)} stroke="var(--grid)" />)}
              <path d={path} fill="none" stroke="var(--forge)" strokeWidth="3" strokeLinecap="round" />
              {values.map((v, i) => <circle key={tenors[i]} cx={x(i)} cy={y(v)} r="4" fill="var(--data)" />)}
              {tenors.map((tm, i) => <text key={tm} x={x(i)} y={H - 8} textAnchor="middle" className="font-mono" fontSize="10" fill="var(--muted-foreground)">{tm}</text>)}
            </svg>
          </div>
          <div className="mt-4 space-y-4">
            <Slider label={t.frontEndLabel} value={front} set={setFront} />
            <Slider label={t.longEndLabel} value={long} set={setLong} />
          </div>
        </div>
        <div className="rounded-2xl border bg-surface p-5">
          <Activity className="h-5 w-5 text-forge" />
          <div className="mt-3 font-display text-xl font-semibold text-foreground">{regime}</div>
          <div className={cn("mt-3 rounded-lg border p-3 font-mono text-sm", spread < 0 ? "border-bear/40 bg-bear/10 text-bear" : "border-bull/40 bg-bull/10 text-bull")}>{t.spreadLabel(spread.toFixed(2))}</div>
          <p className="mt-3 text-sm text-muted-foreground">{t.note}</p>
        </div>
      </div>
    </WidgetFrame>
  );
}

function Slider({ label, value, set }: { label: string; value: number; set: (n: number) => void }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm"><span className="text-foreground">{label}</span><span className="font-mono text-forge">{value.toFixed(2)}%</span></div>
      <input type="range" min="2" max="6" step="0.05" value={value} onChange={(e) => set(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--forge)]" />
    </div>
  );
}
