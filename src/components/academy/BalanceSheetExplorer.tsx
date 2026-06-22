import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { cn } from "@/lib/utils";

interface Item {
  label: string;
  value: number;
}

const ASSETS: Item[] = [
  { label: "Trésorerie & équivalents", value: 62 },
  { label: "Créances clients", value: 30 },
  { label: "Stocks", value: 14 },
  { label: "Immobilisations", value: 44 },
  { label: "Goodwill & incorporels", value: 22 },
];
const LIABILITIES: Item[] = [
  { label: "Dettes fournisseurs", value: 28 },
  { label: "Dette court terme", value: 18 },
  { label: "Dette long terme", value: 58 },
];
const EQUITY: Item[] = [
  { label: "Capital & primes", value: 24 },
  { label: "Réserves & report", value: 44 },
];

const sum = (arr: Item[]) => arr.reduce((a, b) => a + b.value, 0);

type Section = "assets" | "liabilities" | "equity";

export function BalanceSheetExplorer() {
  const [open, setOpen] = useState<Section | null>("assets");
  const totalAssets = sum(ASSETS);
  const totalLiab = sum(LIABILITIES);
  const totalEquity = sum(EQUITY);

  const Bar = ({ items, color }: { items: Item[]; color: string }) => {
    const t = sum(items);
    return (
      <div className="flex h-9 w-full overflow-hidden rounded-md border">
        {items.map((it, i) => (
          <div
            key={i}
            className="group relative h-full"
            style={{ width: `${(it.value / t) * 100}%`, background: color, opacity: 0.55 + (i % 3) * 0.15 }}
            title={`${it.label} : ${it.value} Md$`}
          />
        ))}
      </div>
    );
  };

  const Detail = ({ items, total }: { items: Item[]; total: number }) => (
    <div className="mt-2 space-y-1.5">
      {items.map((it, i) => (
        <div key={i} className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{it.label}</span>
          <span className="font-mono tabular-nums text-foreground">
            {it.value} Md$ · {Math.round((it.value / total) * 100)}%
          </span>
        </div>
      ))}
    </div>
  );

  const Row = ({
    id,
    label,
    items,
    total,
    color,
  }: {
    id: Section;
    label: string;
    items: Item[];
    total: number;
    color: string;
  }) => (
    <div className="rounded-lg border bg-surface p-3">
      <button onClick={() => setOpen(open === id ? null : id)} className="flex w-full items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", open === id && "rotate-90")} />
          {label}
        </span>
        <span className="font-mono text-sm font-semibold tabular-nums" style={{ color }}>
          {total} Md$
        </span>
      </button>
      <div className="mt-3">
        <Bar items={items} color={color} />
      </div>
      {open === id && <Detail items={items} total={total} />}
    </div>
  );

  return (
    <WidgetFrame
      title="Balance Sheet Explorer"
      subtitle="Actif = Passif + Capitaux propres. Cliquez pour explorer chaque poste."
      badge="Drill-down"
    >
      <div className="space-y-3">
        <Row id="assets" label="Actif (Assets)" items={ASSETS} total={totalAssets} color="var(--data)" />
        <div className="flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground">=</span>
        </div>
        <Row id="liabilities" label="Passif / Dettes (Liabilities)" items={LIABILITIES} total={totalLiab} color="var(--bear)" />
        <div className="flex items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground">+</span>
        </div>
        <Row id="equity" label="Capitaux propres (Equity)" items={EQUITY} total={totalEquity} color="var(--bull)" />
      </div>
      <div
        className={cn(
          "mt-4 rounded-lg border p-3 text-center text-xs",
          totalAssets === totalLiab + totalEquity ? "border-bull/40 bg-bull/5 text-bull" : "border-bear/40 text-bear",
        )}
      >
        Équilibre du bilan : {totalAssets} = {totalLiab} + {totalEquity} ✓
      </div>
    </WidgetFrame>
  );
}
