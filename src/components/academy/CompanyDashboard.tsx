import { Building2, CircleDollarSign, Percent, ShieldCheck } from "lucide-react";
import { WidgetFrame } from "./primitives";
import { useT } from "@/lib/i18n";

export function CompanyDashboard() {
  const t = useT().widgetsCorp.companyDashboard;

  const metrics = [
    { label: t.metrics.revenueGrowth, value: "+18%", icon: Building2, tone: "text-bull" },
    { label: t.metrics.grossMargin, value: "62%", icon: Percent, tone: "text-data" },
    { label: t.metrics.fcfMargin, value: "21%", icon: CircleDollarSign, tone: "text-forge" },
    { label: t.metrics.netDebtEbitda, value: "0.7x", icon: ShieldCheck, tone: "text-bull" },
  ];

  return (
    <WidgetFrame title={t.title} subtitle={t.subtitle} badge={t.badge}>
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
        {t.diagnostic}
      </div>
    </WidgetFrame>
  );
}
