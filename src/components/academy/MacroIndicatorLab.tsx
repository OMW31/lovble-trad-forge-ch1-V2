import { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Category = "Croissance" | "Inflation" | "Politique monétaire";
type Timing = "Avancé" | "Coïncident" | "Retardé";

interface Indicator {
  id: string;
  category: Category;
  timing: Timing;
  higherIsBullish: boolean;
  unit: string;
  expected: number;
  step: number;
  range: [number, number];
}

const INDICATORS: Indicator[] = [
  { id: "nfp", category: "Croissance", timing: "Coïncident", higherIsBullish: true, unit: "k", expected: 180, step: 5, range: [-200, 600] },
  { id: "gdp", category: "Croissance", timing: "Coïncident", higherIsBullish: true, unit: "%", expected: 2.0, step: 0.1, range: [-2, 6] },
  { id: "cpi", category: "Inflation", timing: "Retardé", higherIsBullish: true, unit: "%", expected: 3.1, step: 0.1, range: [0, 10] },
  { id: "retail", category: "Croissance", timing: "Coïncident", higherIsBullish: true, unit: "%", expected: 0.3, step: 0.1, range: [-3, 3] },
  { id: "pmi", category: "Croissance", timing: "Avancé", higherIsBullish: true, unit: "", expected: 50, step: 0.5, range: [35, 65] },
  { id: "unemp", category: "Croissance", timing: "Retardé", higherIsBullish: false, unit: "%", expected: 3.8, step: 0.1, range: [2, 12] },
  { id: "rate", category: "Politique monétaire", timing: "Avancé", higherIsBullish: true, unit: "%", expected: 5.25, step: 0.25, range: [0, 8] },
  { id: "confidence", category: "Croissance", timing: "Avancé", higherIsBullish: true, unit: "", expected: 102, step: 1, range: [60, 140] },
];

const CATEGORIES: (Category | "Tous")[] = ["Tous", "Croissance", "Inflation", "Politique monétaire"];
const TIMINGS: (Timing | "Tous")[] = ["Tous", "Avancé", "Coïncident", "Retardé"];

const catColor: Record<Category, string> = {
  Croissance: "text-bull border-bull/40 bg-bull/10",
  Inflation: "text-forge border-forge/40 bg-forge/10",
  "Politique monétaire": "text-data border-data/40 bg-data/10",
};

export function MacroIndicatorLab() {
  const t = useT().widgetsMacro.macroIndicatorLab;
  const [cat, setCat] = useState<Category | "Tous">("Tous");
  const [timing, setTiming] = useState<Timing | "Tous">("Tous");
  const [simId, setSimId] = useState("nfp");
  const sim = INDICATORS.find((i) => i.id === simId)!;
  const [actual, setActual] = useState(sim.expected);

  const filtered = INDICATORS.filter(
    (i) => (cat === "Tous" || i.category === cat) && (timing === "Tous" || i.timing === timing),
  );

  const onPick = (id: string) => {
    const ind = INDICATORS.find((i) => i.id === id)!;
    setSimId(id);
    setActual(ind.expected);
  };

  const surprise = actual - sim.expected;
  const beats = surprise > 0.0001;
  const misses = surprise < -0.0001;
  const bullish = (beats && sim.higherIsBullish) || (misses && !sim.higherIsBullish);
  const bearish = (beats && !sim.higherIsBullish) || (misses && sim.higherIsBullish);
  const magnitude = Math.min(100, (Math.abs(surprise) / Math.abs(sim.expected || 1)) * 120);

  return (
    <WidgetFrame
      title={t.title}
      subtitle={t.subtitle}
      badge={t.badge}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.categoryFilterLabel}</span>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition-all",
              cat === c ? "border-forge bg-forge/15 text-forge" : "border-border text-muted-foreground hover:border-forge/40",
            )}
          >
            {t.categories[c]}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.timingFilterLabel}</span>
        {TIMINGS.map((tm) => (
          <button
            key={tm}
            onClick={() => setTiming(tm)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition-all",
              timing === tm ? "border-data bg-data/15 text-data" : "border-border text-muted-foreground hover:border-data/40",
            )}
          >
            {t.timings[tm]}
          </button>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {filtered.map((i) => (
          <button
            key={i.id}
            onClick={() => onPick(i.id)}
            className={cn(
              "flex items-center justify-between gap-2 rounded-lg border bg-surface p-3 text-left transition-all hover:border-forge/40",
              simId === i.id && "border-forge/60 bg-surface-2",
            )}
          >
            <div>
              <div className="text-sm font-medium text-foreground">{t.indicators[i.id]}</div>
              <div className="mt-1 flex gap-1.5">
                <span className={cn("rounded border px-1.5 py-0.5 text-[10px]", catColor[i.category])}>
                  {t.categories[i.category]}
                </span>
                <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {t.timings[i.timing]}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Surprise simulator */}
      <div className="mt-5 rounded-xl border border-forge/30 bg-surface-2 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h5 className="font-display text-sm font-semibold text-foreground">{t.simulatorTitle(t.indicators[sim.id])}</h5>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {sim.higherIsBullish ? t.higherIsBullishHint : t.higherIsBearishHint}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg border bg-surface p-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.consensusLabel}</div>
            <div className="font-mono text-lg font-semibold tabular-nums text-foreground">
              {sim.expected}
              {sim.unit}
            </div>
          </div>
          <div className="rounded-lg border bg-surface p-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.publishedLabel}</div>
            <div className="font-mono text-lg font-semibold tabular-nums text-forge">
              {actual.toFixed(sim.step < 1 ? 1 : 0)}
              {sim.unit}
            </div>
          </div>
        </div>
        <input
          type="range"
          min={sim.range[0]}
          max={sim.range[1]}
          step={sim.step}
          value={actual}
          onChange={(e) => setActual(Number(e.target.value))}
          className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--forge)]"
        />
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border bg-surface p-3">
          <div className="text-xs text-muted-foreground">
            {t.surpriseLabel}{" "}
            <span className={cn("font-mono font-semibold", beats ? "text-bull" : misses ? "text-bear" : "text-muted-foreground")}>
              {surprise > 0 ? "+" : ""}
              {surprise.toFixed(sim.step < 1 ? 1 : 0)}
              {sim.unit}
            </span>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold",
              bullish && "bg-bull/15 text-bull",
              bearish && "bg-bear/15 text-bear",
              !bullish && !bearish && "bg-muted text-muted-foreground",
            )}
          >
            {bullish ? <TrendingUp className="h-4 w-4" /> : bearish ? <TrendingDown className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
            {bullish ? t.currencyUp : bearish ? t.currencyDown : t.neutral}
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className={cn("h-full rounded-full transition-all", bullish ? "bg-bull" : bearish ? "bg-bear" : "bg-muted-foreground")}
            style={{ width: `${magnitude}%` }}
          />
        </div>
      </div>
    </WidgetFrame>
  );
}
