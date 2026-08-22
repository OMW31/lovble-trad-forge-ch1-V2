import { useMemo, useState } from "react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

interface Factor {
  id: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  weight: number;
  /** map a raw value to a 0..1 quality score */
  score: (v: number) => number;
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const INITIAL: Factor[] = [
  { id: "growth", unit: "%", min: -10, max: 40, step: 1, value: 12, weight: 0.25, score: (v) => clamp01((v + 5) / 30) },
  { id: "margin", unit: "%", min: -5, max: 40, step: 1, value: 18, weight: 0.22, score: (v) => clamp01(v / 30) },
  { id: "roe", unit: "%", min: -10, max: 50, step: 1, value: 22, weight: 0.2, score: (v) => clamp01(v / 35) },
  { id: "debt", unit: "x", min: 0, max: 4, step: 0.1, value: 0.8, weight: 0.18, score: (v) => clamp01(1 - v / 3) },
  { id: "fcf", unit: "%", min: -10, max: 35, step: 1, value: 15, weight: 0.15, score: (v) => clamp01((v + 5) / 30) },
];

export function CompanyHealthScore() {
  const t = useT().widgetsCorp.companyHealthScore;
  const [factors, setFactors] = useState(INITIAL);

  const score = useMemo(() => {
    const s = factors.reduce((acc, f) => acc + f.score(f.value) * f.weight, 0);
    return Math.round(s * 100);
  }, [factors]);

  const setValue = (id: string, v: number) =>
    setFactors((prev) => prev.map((f) => (f.id === id ? { ...f, value: v } : f)));

  const grade = score >= 80 ? t.grades.excellent : score >= 65 ? t.grades.solid : score >= 50 ? t.grades.correct : score >= 35 ? t.grades.fragile : t.grades.atRisk;
  const tone = score >= 65 ? "bull" : score >= 50 ? "forge" : "bear";

  // gauge arc
  const R = 70;
  const C = Math.PI * R; // half circle
  const filled = (score / 100) * C;

  const toneStroke = tone === "bull" ? "var(--bull)" : tone === "forge" ? "var(--forge)" : "var(--bear)";

  const factorMeta: Record<string, { label: string; hint: string }> = t.factors;

  return (
    <WidgetFrame
      title={t.title}
      subtitle={t.subtitle}
      badge="0 → 100"
    >
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 180 110" className="w-44">
            <path d="M 20 100 A 70 70 0 0 1 160 100" fill="none" stroke="var(--border)" strokeWidth={12} strokeLinecap="round" />
            <path
              d="M 20 100 A 70 70 0 0 1 160 100"
              fill="none"
              stroke={toneStroke}
              strokeWidth={12}
              strokeLinecap="round"
              strokeDasharray={`${filled} ${C}`}
              className="transition-all duration-500"
            />
            <text x="90" y="88" textAnchor="middle" className="font-mono" fontSize={34} fontWeight={700} fill="var(--foreground)">
              {score}
            </text>
          </svg>
          <span
            className={cn(
              "mt-1 rounded-full px-3 py-1 text-xs font-semibold",
              tone === "bull" && "bg-bull/15 text-bull",
              tone === "forge" && "bg-forge/15 text-forge",
              tone === "bear" && "bg-bear/15 text-bear",
            )}
          >
            {grade}
          </span>
        </div>

        <div className="space-y-4">
          {factors.map((f) => {
            const q = f.score(f.value);
            const meta = factorMeta[f.id];
            return (
              <div key={f.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{meta.label}</span>
                  <span className="font-mono tabular-nums text-forge">
                    {f.value}
                    {f.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={f.value}
                  onChange={(e) => setValue(f.id, Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--forge)]"
                />
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-border">
                  <div
                    className={cn("h-full rounded-full transition-all", q >= 0.6 ? "bg-bull" : q >= 0.4 ? "bg-forge" : "bg-bear")}
                    style={{ width: `${q * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </WidgetFrame>
  );
}
