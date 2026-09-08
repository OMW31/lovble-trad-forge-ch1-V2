import { useState } from "react";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type DriverId = "rates" | "growth" | "inflation" | "risk" | "trade";

const DRIVER_IDS: DriverId[] = ["rates", "growth", "inflation", "risk", "trade"];

const DRIVER_RESULT: Record<DriverId, "up" | "down"> = {
  rates: "up",
  growth: "up",
  inflation: "down",
  risk: "down",
  trade: "up",
};

export function MarketDriverVisualizer() {
  const t = useT().widgetsMacro.marketDriverVisualizer;
  const [active, setActive] = useState<DriverId>("rates");
  const driver = t.drivers[active];
  const up = DRIVER_RESULT[active] === "up";

  return (
    <WidgetFrame
      title={t.title}
      subtitle={t.subtitle}
      badge={t.badge}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {DRIVER_IDS.map((id) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              active === id
                ? "border-forge bg-forge/15 text-forge"
                : "border-border bg-surface text-muted-foreground hover:border-forge/40",
            )}
          >
            {t.drivers[id].label}
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
