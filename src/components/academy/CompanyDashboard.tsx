import { Building2, CircleDollarSign, Percent, ShieldCheck } from "lucide-react";
import { WidgetFrame } from "./primitives";

const metrics = [
  { label: "Revenue growth", value: "+18%", icon: Building2, tone: "text-bull" },
  { label: "Gross margin", value: "62%", icon: Percent, tone: "text-data" },
  { label: "FCF margin", value: "21%", icon: CircleDollarSign, tone: "text-forge" },
  { label: "Net debt / EBITDA", value: "0.7x", icon: ShieldCheck, tone: "text-bull" },
];

export function CompanyDashboard() {
  return (
    <WidgetFrame title="Company Dashboard" subtitle="Vue synthèse d’une entreprise: croissance, rentabilité, cash-flow et risque financier." badge="Micro">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="premium-hover rounded-xl border bg-surface p-4">
            <metric.icon className={`h-5 w-5 ${metric.tone}`} />
            <div className="mt-4 font-mono text-2xl font-semibold tabular-nums text-foreground">{metric.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-bull/30 bg-bull/5 p-4 text-sm leading-relaxed text-muted-foreground">
        Diagnostic: croissance profitable, conversion cash forte, bilan peu levier. Profil quality compounder si la valorisation reste cohérente.
      </div>
    </WidgetFrame>
  );
}