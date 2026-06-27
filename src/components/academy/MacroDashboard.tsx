import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";
import {
  MACRO_CATEGORIES,
  MACRO_INDICATORS,
  type ImpactLevel,
  type MacroCategory,
  type MacroIndicator,
  type MacroTiming,
  type ValueTone,
} from "@/lib/academy/macro-indicators";

const timingStyle: Record<MacroTiming, string> = {
  Lead: "border-forge/40 bg-forge/10 text-forge",
  Lag: "border-bear/40 bg-bear/10 text-bear",
  Coin: "border-data/40 bg-data/10 text-data",
};

const timingLabel: Record<MacroTiming, string> = {
  Lead: "Lead",
  Lag: "Lag",
  Coin: "Coin",
};

const codeTone: Record<MacroCategory, string> = {
  Croissance: "text-bull",
  Inflation: "text-bear",
  Emploi: "text-data",
  "Pol. Monétaire": "text-forge",
};

const valueTone: Record<ValueTone, string> = {
  bull: "text-bull",
  bear: "text-bear",
  neutral: "text-data",
};

const impactTone: Record<ImpactLevel, string> = {
  "Très Fort": "text-bear",
  Fort: "text-forge",
  Modéré: "text-data",
  Faible: "text-muted-foreground",
};

function IndicatorCard({ indicator, onOpen }: { indicator: MacroIndicator; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group flex flex-col rounded-xl border border-border bg-surface p-4 text-left transition-all hover:border-forge/50 hover:bg-surface-2 hover:shadow-glow"
    >
      <div className="flex items-center justify-between">
        <span className={cn("font-mono text-[11px] font-bold uppercase tracking-wider", codeTone[indicator.category])}>
          {indicator.code}
        </span>
        <span className={cn("rounded-md border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider", timingStyle[indicator.timing])}>
          {timingLabel[indicator.timing]}
        </span>
      </div>
      <div className="mt-2 text-sm font-semibold text-foreground">{indicator.name}</div>
      <div className="text-[11px] text-muted-foreground">{indicator.cadence}</div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <span className={cn("font-mono text-xl font-semibold tabular-nums", valueTone[indicator.valueTone])}>
          {indicator.actual}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">est. {indicator.consensus}</span>
      </div>
    </button>
  );
}

function ImpactRow({ label, level }: { label: string; level: ImpactLevel }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("text-sm font-semibold", impactTone[level])}>{level}</span>
    </div>
  );
}

function IndicatorDetail({ indicator }: { indicator: MacroIndicator }) {
  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <span className={cn("inline-flex rounded-md border border-current/30 bg-current/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider", codeTone[indicator.category])}>
          {indicator.code}
        </span>
        <DialogTitle className="mt-3 font-display text-2xl text-foreground">{indicator.name}</DialogTitle>
        <DialogDescription className="mt-1 font-mono text-xs text-muted-foreground">
          {indicator.category} • {indicator.cadence}
        </DialogDescription>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{indicator.description}</p>

      <div>
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Impact sur les marchés
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ImpactRow label="Forex" level={indicator.impact.forex} />
          <ImpactRow label="Equities" level={indicator.impact.equities} />
          <ImpactRow label="Bonds" level={indicator.impact.bonds} />
          <ImpactRow label="Gold" level={indicator.impact.gold} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2 rounded-xl border border-bull/30 bg-bull/10 p-3">
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
          <div>
            <div className="text-sm font-semibold text-bull">Supérieur aux attentes</div>
            <div className="text-sm text-foreground/80">{indicator.above}</div>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-xl border border-bear/30 bg-bear/10 p-3">
          <ArrowDownRight className="mt-0.5 h-4 w-4 shrink-0 text-bear" />
          <div>
            <div className="text-sm font-semibold text-bear">Inférieur aux attentes</div>
            <div className="text-sm text-foreground/80">{indicator.below}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Actuel</div>
          <div className={cn("mt-1 font-mono text-lg font-semibold tabular-nums", valueTone[indicator.valueTone])}>
            {indicator.actual}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Consensus</div>
          <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-muted-foreground">
            {indicator.consensus}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Unité</div>
          <div className="mt-1 font-mono text-sm text-foreground">{indicator.unit}</div>
        </div>
      </div>
    </div>
  );
}

export function MacroDashboard() {
  const [cat, setCat] = useState<MacroCategory | "Tous">("Tous");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    cat === "Tous" ? MACRO_INDICATORS : MACRO_INDICATORS.filter((i) => i.category === cat);
  const active = MACRO_INDICATORS.find((i) => i.id === openId) ?? null;

  return (
    <WidgetFrame
      title="Dashboard Macro Institutionnel"
      subtitle="11 indicateurs clés — cliquez pour l'analyse institutionnelle complète."
      badge="Command Center"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {MACRO_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-all",
              cat === c
                ? "border-forge bg-forge/15 text-forge"
                : "border-border text-muted-foreground hover:border-forge/40",
            )}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <TrendingUp className="h-3 w-3 text-bull" /> beat
          <TrendingDown className="ml-2 h-3 w-3 text-bear" /> miss
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {filtered.map((indicator) => (
          <IndicatorCard key={indicator.id} indicator={indicator} onOpen={() => setOpenId(indicator.id)} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[10px] uppercase tracking-wider">
        <span className="rounded-md border border-forge/30 bg-forge/5 py-1.5 text-forge">Lead · avancé</span>
        <span className="rounded-md border border-data/30 bg-data/5 py-1.5 text-data">Coin · coïncident</span>
        <span className="rounded-md border border-bear/30 bg-bear/5 py-1.5 text-bear">Lag · retardé</span>
      </div>

      <Dialog open={openId !== null} onOpenChange={(open) => !open && setOpenId(null)}>
        <DialogContent className="max-w-lg border-border bg-card">
          <DialogHeader className="sr-only">
            <DialogTitle>{active?.name ?? "Indicateur"}</DialogTitle>
          </DialogHeader>
          {active && <IndicatorDetail indicator={active} />}
        </DialogContent>
      </Dialog>
    </WidgetFrame>
  );
}
