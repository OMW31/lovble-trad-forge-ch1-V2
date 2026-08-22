import { useMemo, useState } from "react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

type ScenarioKey = "bear" | "base" | "bull";

const SCENARIO_GROWTH: Record<ScenarioKey, { growth: number; color: string }> = {
  bear: { growth: 2, color: "var(--bear)" },
  base: { growth: 9, color: "var(--forge)" },
  bull: { growth: 18, color: "var(--bull)" },
};

const BASE_REVENUE = 100; // index, year 0
const YEARS = 5;
const W = 520;
const HGT = 200;
const PAD = 28;

export function ForecastScenarioPlanner() {
  const t = useT().widgetsCorp.forecastScenarioPlanner;
  const [active, setActive] = useState<ScenarioKey>("base");

  const lines = useMemo(() => {
    const out: Record<ScenarioKey, number[]> = { bear: [], base: [], bull: [] };
    (Object.keys(SCENARIO_GROWTH) as ScenarioKey[]).forEach((k) => {
      const g = SCENARIO_GROWTH[k].growth / 100;
      for (let y = 0; y <= YEARS; y++) out[k].push(BASE_REVENUE * Math.pow(1 + g, y));
    });
    return out;
  }, []);

  const allVals = Object.values(lines).flat();
  const max = Math.max(...allVals);
  const min = Math.min(...allVals);

  const roundCoord = (v: number) => Math.round(v * 1000) / 1000;
  const x = (y: number) => roundCoord(PAD + (y / YEARS) * (W - PAD * 2));
  const yScale = (v: number) => roundCoord(PAD + (1 - (v - min) / (max - min)) * (HGT - PAD * 2));

  const path = (vals: number[]) => vals.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${yScale(v)}`).join(" ");

  const finalVal = lines[active][YEARS];
  const cagr = SCENARIO_GROWTH[active].growth;

  return (
    <WidgetFrame
      title={t.title}
      subtitle={t.subtitle}
      badge={t.badge}
    >
      <div className="mb-4 flex gap-2">
        {(Object.keys(SCENARIO_GROWTH) as ScenarioKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={cn(
              "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
              active === k ? "border-forge bg-surface-2 text-foreground" : "border-border text-muted-foreground hover:border-forge/40",
            )}
          >
            <span className="block">{t.scenarios[k]}</span>
            <span className="font-mono text-xs" style={{ color: SCENARIO_GROWTH[k].color }}>
              {t.perYear(SCENARIO_GROWTH[k].growth)}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-gradient-surface p-2">
        <svg viewBox={`0 0 ${W} ${HGT}`} className="w-full">
          {[0, 0.25, 0.5, 0.75, 1].map((g) => (
            <line key={g} x1={PAD} x2={W - PAD} y1={PAD + g * (HGT - PAD * 2)} y2={PAD + g * (HGT - PAD * 2)} stroke="var(--grid)" />
          ))}
          {(Object.keys(SCENARIO_GROWTH) as ScenarioKey[]).map((k) => (
            <path
              key={k}
              d={path(lines[k])}
              fill="none"
              stroke={SCENARIO_GROWTH[k].color}
              strokeWidth={k === active ? 2.6 : 1.2}
              opacity={k === active ? 1 : 0.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {lines[active].map((v, i) => (
            <circle key={i} cx={x(i)} cy={yScale(v)} r={2.6} fill={SCENARIO_GROWTH[active].color} />
          ))}
          {Array.from({ length: YEARS + 1 }).map((_, i) => (
            <text key={i} x={x(i)} y={HGT - 6} textAnchor="middle" fontSize={9} className="font-mono" fill="var(--muted-foreground)">
              {t.yearShort(i)}
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-surface p-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.revenueProjected}</div>
          <div className="font-mono text-xl font-semibold tabular-nums text-foreground">{finalVal.toFixed(0)}</div>
        </div>
        <div className="rounded-lg border bg-surface p-3 text-center">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.cagr}</div>
          <div className="font-mono text-xl font-semibold tabular-nums" style={{ color: SCENARIO_GROWTH[active].color }}>
            +{cagr}%
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}
