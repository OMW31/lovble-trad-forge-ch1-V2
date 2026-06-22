import { useState } from "react";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

interface Driver {
  id: string;
  label: string;
  chain: string[];
  result: "up" | "down";
  resultLabel: string;
  note: string;
}

const DRIVERS: Driver[] = [
  {
    id: "rates",
    label: "Taux d'intérêt ↑",
    chain: ["Taux directeurs ↑", "Rendements plus attractifs", "Afflux de capitaux étrangers", "Demande de devise ↑"],
    result: "up",
    resultLabel: "Devise ↑",
    note: "Les anticipations de hausse comptent souvent plus que la hausse elle-même.",
  },
  {
    id: "growth",
    label: "Croissance (PIB) ↑",
    chain: ["PIB > consensus", "Économie résiliente", "Marge pour des taux élevés", "Attrait des actifs ↑"],
    result: "up",
    resultLabel: "Devise ↑",
    note: "Une croissance forte renforce la devise via l'investissement et le différentiel de taux.",
  },
  {
    id: "inflation",
    label: "Inflation hors contrôle",
    chain: ["Prix ↑↑", "Pouvoir d'achat érodé", "Crédibilité monétaire ?", "Capitaux fuient"],
    result: "down",
    resultLabel: "Devise ↓",
    note: "Inflation modérée = sain ; inflation incontrôlée sans réponse crédible = devise fragilisée.",
  },
  {
    id: "risk",
    label: "Aversion au risque",
    chain: ["Panique de marché", "Fuite vers la qualité", "Ruée vers USD / refuges", "Devises risquées ↓"],
    result: "down",
    resultLabel: "Devise risquée ↓",
    note: "En stress extrême, les investisseurs liquident le risque vers les actifs les plus liquides (USD).",
  },
  {
    id: "trade",
    label: "Excédent commercial",
    chain: ["Exports > Imports", "Demande de devise nationale", "Balance positive", "Appréciation"],
    result: "up",
    resultLabel: "Devise ↑",
    note: "Un excédent crée une demande structurelle pour la devise ; un déficit fait l'inverse.",
  },
];

export function MarketDriverVisualizer() {
  const [active, setActive] = useState(DRIVERS[0].id);
  const driver = DRIVERS.find((d) => d.id === active)!;
  const up = driver.result === "up";

  return (
    <WidgetFrame
      title="Market Driver Visualizer"
      subtitle="Choisissez un moteur fondamental et suivez sa transmission jusqu'au prix."
      badge="Interactif"
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {DRIVERS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              active === d.id
                ? "border-forge bg-forge/15 text-forge"
                : "border-border bg-surface text-muted-foreground hover:border-forge/40",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {driver.chain.map((step, idx) => (
          <div key={idx} className="flex flex-1 items-center gap-3 lg:flex-col">
            <div
              className="flex w-full flex-1 animate-rise-in items-center rounded-lg border bg-surface p-3 text-center text-xs font-medium text-foreground lg:justify-center"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {step}
            </div>
            {idx < driver.chain.length - 1 && (
              <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-forge lg:rotate-0" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border bg-surface-2 p-4 sm:flex-row sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">{driver.note}</p>
        <div
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 font-semibold",
            up ? "bg-bull/15 text-bull" : "bg-bear/15 text-bear",
          )}
        >
          {up ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
          {driver.resultLabel}
        </div>
      </div>
    </WidgetFrame>
  );
}
