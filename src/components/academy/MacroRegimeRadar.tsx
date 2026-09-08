import { useMemo, useState } from "react";
import { Radar } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type RegimeId = "goldilocks" | "stagflation" | "recession" | "expansion";

const AXE_KEYS = ["croissance", "emploi", "inflation", "banquesCentrales", "liquidite", "sentiment"] as const;

type Regime = {
  id: RegimeId;
  tone: string;
  ring: string;
  values: number[];
};

const REGIMES: Regime[] = [
  { id: "goldilocks", tone: "text-bull", ring: "var(--bull)", values: [85, 88, 30, 45, 75, 82] },
  { id: "stagflation", tone: "text-bear", ring: "var(--bear)", values: [25, 40, 92, 82, 30, 28] },
  { id: "recession", tone: "text-data", ring: "var(--data)", values: [12, 22, 35, 28, 42, 18] },
  { id: "expansion", tone: "text-forge", ring: "var(--forge)", values: [78, 72, 55, 60, 68, 70] },
];

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = 92;

function point(axisIndex: number, ratio: number) {
  const angle = (axisIndex / AXE_KEYS.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
}

export function MacroRegimeRadar() {
  const t = useT().widgetsMacro.macroRegimeRadar;
  const [activeId, setActiveId] = useState<RegimeId>("goldilocks");
  const regime = REGIMES.find((r) => r.id === activeId)!;
  const regimeLabel = t.regimes[activeId].label;
  const regimeThesis = t.regimes[activeId].thesis;
  const regimeLongs = t.regimes[activeId].longs;
  const regimeShorts = t.regimes[activeId].shorts;

  const polygon = useMemo(
    () =>
      regime.values
        .map((v, i) => {
          const p = point(i, v / 100);
          return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        })
        .join(" "),
    [regime],
  );

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <WidgetFrame
      title={t.title}
      subtitle={t.subtitle}
      badge={t.badge}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {REGIMES.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveId(r.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all premium-hover",
              activeId === r.id
                ? cn("bg-surface-2", r.tone)
                : "border-border text-muted-foreground hover:border-forge/40",
            )}
            style={activeId === r.id ? { borderColor: r.ring } : undefined}
          >
            {t.regimes[r.id].label}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="mx-auto aspect-square w-full max-w-[340px]">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible">
            {rings.map((ratio) => (
              <polygon
                key={ratio}
                points={AXE_KEYS.map((_, i) => {
                  const p = point(i, ratio);
                  return `${p.x},${p.y}`;
                }).join(" ")}
                fill="none"
                stroke="var(--border)"
                strokeWidth={0.75}
                opacity={0.6}
              />
            ))}
            {AXE_KEYS.map((axeKey, i) => {
              const edge = point(i, 1);
              const label = point(i, 1.18);
              return (
                <g key={axeKey}>
                  <line x1={CENTER} y1={CENTER} x2={edge.x} y2={edge.y} stroke="var(--border)" strokeWidth={0.75} opacity={0.5} />
                  <text
                    x={label.x}
                    y={label.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    className="font-mono"
                    fill="var(--muted-foreground)"
                  >
                    {t.axes[axeKey]}
                  </text>
                </g>
              );
            })}
            <polygon
              points={polygon}
              fill={regime.ring}
              fillOpacity={0.18}
              stroke={regime.ring}
              strokeWidth={2}
              className="transition-all duration-500"
            />
            {regime.values.map((v, i) => {
              const p = point(i, v / 100);
              return <circle key={i} cx={p.x} cy={p.y} r={2.6} fill={regime.ring} className="transition-all duration-500" />;
            })}
          </svg>
        </div>

        <aside className="min-w-0">
          <span
            className={cn("inline-flex rounded-full border bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wider", regime.tone)}
            style={{ borderColor: regime.ring }}
          >
            {regimeLabel}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{regimeThesis}</p>

          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t.implicationsLabel}</div>
          <div className="mt-2 space-y-2">
            {regimeLongs.map((l) => (
              <div key={l} className="flex items-center gap-2 rounded-lg border border-bull/30 bg-bull/5 px-3 py-2 text-sm text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-bull" /> {l}
              </div>
            ))}
            {regimeShorts.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-lg border border-bear/30 bg-bear/5 px-3 py-2 text-sm text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-bear" /> {s}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t pt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <Radar className="h-3.5 w-3.5 text-forge" />
        {t.footerNote}
      </div>
    </WidgetFrame>
  );
}
