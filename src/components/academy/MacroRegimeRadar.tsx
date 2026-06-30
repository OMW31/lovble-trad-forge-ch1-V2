import { useMemo, useState } from "react";
import { Radar } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

const AXES = ["Croissance", "Emploi", "Inflation", "Banques C.", "Liquidité", "Sentiment"] as const;

type Regime = {
  id: string;
  label: string;
  tone: string;
  ring: string;
  values: number[]; // aligned with AXES, 0..100
  thesis: string;
  longs: string[];
  shorts: string[];
};

const REGIMES: Regime[] = [
  {
    id: "goldilocks",
    label: "Goldilocks",
    tone: "text-bull",
    ring: "var(--bull)",
    values: [85, 88, 30, 45, 75, 82],
    thesis: "Croissance forte + inflation maîtrisée + emploi plein → Régime Risk-On optimal.",
    longs: ["Long Equities", "Long Risk Currencies"],
    shorts: ["Short Gold", "Short Bonds"],
  },
  {
    id: "stagflation",
    label: "Stagflation",
    tone: "text-bear",
    ring: "var(--bear)",
    values: [25, 40, 92, 82, 30, 28],
    thesis: "Croissance faible + inflation persistante → les banques centrales restent contraintes.",
    longs: ["Long Commodities", "Long Gold"],
    shorts: ["Short Bonds longs", "Short Equities cycliques"],
  },
  {
    id: "recession",
    label: "Récession",
    tone: "text-data",
    ring: "var(--data)",
    values: [12, 22, 35, 28, 42, 18],
    thesis: "Contraction de l'activité → fuite vers la qualité et easing monétaire agressif.",
    longs: ["Long Bonds", "Long USD / Gold"],
    shorts: ["Short Equities", "Short Cyclicals"],
  },
  {
    id: "expansion",
    label: "Expansion",
    tone: "text-forge",
    ring: "var(--forge)",
    values: [78, 72, 55, 60, 68, 70],
    thesis: "Reprise auto-entretenue → appétit pour le risque et rotation vers les cycliques.",
    longs: ["Long Cyclicals", "Long Credit"],
    shorts: ["Short Duration", "Short Défensives"],
  },
];

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = 92;

function point(axisIndex: number, ratio: number) {
  const angle = (axisIndex / AXES.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
}

export function MacroRegimeRadar() {
  const [activeId, setActiveId] = useState(REGIMES[0].id);
  const regime = REGIMES.find((r) => r.id === activeId)!;

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
      title="Macro Radar — Régimes de Marché"
      subtitle="Visualisez les 4 régimes macro institutionnels et leurs implications."
      badge="Vue radar"
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
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="mx-auto aspect-square w-full max-w-[340px]">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible">
            {/* grid rings */}
            {rings.map((ratio) => (
              <polygon
                key={ratio}
                points={AXES.map((_, i) => {
                  const p = point(i, ratio);
                  return `${p.x},${p.y}`;
                }).join(" ")}
                fill="none"
                stroke="var(--border)"
                strokeWidth={0.75}
                opacity={0.6}
              />
            ))}
            {/* axes spokes + labels */}
            {AXES.map((axis, i) => {
              const edge = point(i, 1);
              const label = point(i, 1.18);
              return (
                <g key={axis}>
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
                    {axis}
                  </text>
                </g>
              );
            })}
            {/* active regime polygon */}
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
            {regime.label}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{regime.thesis}</p>

          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Implications</div>
          <div className="mt-2 space-y-2">
            {regime.longs.map((l) => (
              <div key={l} className="flex items-center gap-2 rounded-lg border border-bull/30 bg-bull/5 px-3 py-2 text-sm text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-bull" /> {l}
              </div>
            ))}
            {regime.shorts.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-lg border border-bear/30 bg-bear/5 px-3 py-2 text-sm text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-bear" /> {s}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t pt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <Radar className="h-3.5 w-3.5 text-forge" />
        Chaque configuration macro crée un régime de marché distinct — anticiper le régime, c'est anticiper l'allocation.
      </div>
    </WidgetFrame>
  );
}
