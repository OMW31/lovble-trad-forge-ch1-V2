import { useMemo, useState } from "react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

interface Factor {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  weight: number;
  /** map a raw value to a 0..1 quality score */
  score: (v: number) => number;
  hint: string;
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const INITIAL: Factor[] = [
  {
    id: "growth",
    label: "Croissance des ventes",
    unit: "%",
    min: -10,
    max: 40,
    step: 1,
    value: 12,
    weight: 0.25,
    score: (v) => clamp01((v + 5) / 30),
    hint: "Une croissance soutenue signale une demande forte et un avantage concurrentiel.",
  },
  {
    id: "margin",
    label: "Marge nette",
    unit: "%",
    min: -5,
    max: 40,
    step: 1,
    value: 18,
    weight: 0.22,
    score: (v) => clamp01(v / 30),
    hint: "La marge nette mesure la rentabilité finale après toutes charges.",
  },
  {
    id: "roe",
    label: "ROE (rentabilité capitaux)",
    unit: "%",
    min: -10,
    max: 50,
    step: 1,
    value: 22,
    weight: 0.2,
    score: (v) => clamp01(v / 35),
    hint: "Le ROE mesure le rendement généré sur les capitaux propres.",
  },
  {
    id: "debt",
    label: "Dette / Capitaux (D/E)",
    unit: "x",
    min: 0,
    max: 4,
    step: 0.1,
    value: 0.8,
    weight: 0.18,
    score: (v) => clamp01(1 - v / 3),
    hint: "Un endettement élevé augmente le risque financier ; trop bas peut signaler un sous-investissement.",
  },
  {
    id: "fcf",
    label: "Free Cash Flow (% ventes)",
    unit: "%",
    min: -10,
    max: 35,
    step: 1,
    value: 15,
    weight: 0.15,
    score: (v) => clamp01((v + 5) / 30),
    hint: "Le FCF est le cash réellement disponible — le carburant d'une entreprise saine.",
  },
];

export function CompanyHealthScore() {
  const [factors, setFactors] = useState(INITIAL);

  const score = useMemo(() => {
    const s = factors.reduce((acc, f) => acc + f.score(f.value) * f.weight, 0);
    return Math.round(s * 100);
  }, [factors]);

  const setValue = (id: string, v: number) =>
    setFactors((prev) => prev.map((f) => (f.id === id ? { ...f, value: v } : f)));

  const grade = score >= 80 ? "Excellente" : score >= 65 ? "Solide" : score >= 50 ? "Correcte" : score >= 35 ? "Fragile" : "À risque";
  const tone = score >= 65 ? "bull" : score >= 50 ? "forge" : "bear";

  // gauge arc
  const R = 70;
  const C = Math.PI * R; // half circle
  const filled = (score / 100) * C;

  const toneStroke = tone === "bull" ? "var(--bull)" : tone === "forge" ? "var(--forge)" : "var(--bear)";

  return (
    <WidgetFrame
      title="Company Health Score"
      subtitle="Modifiez les fondamentaux et observez la note de santé s'ajuster en temps réel."
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
            return (
              <div key={f.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{f.label}</span>
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
