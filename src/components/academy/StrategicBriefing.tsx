import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, Layers3, Lock, Radar, Target } from "lucide-react";
import { LESSONS } from "@/lib/academy/chapter1";
import { cn } from "@/lib/utils";
import { ConceptCard, Eyebrow, VisualLayer } from "./primitives";

const visualAssets = [
  { src: "/academy/ch1/visuals/a4.webp", label: "Macro engine" },
  { src: "/academy/ch1/visuals/a8.webp", label: "Terminal density" },
  { src: "/academy/ch1/visuals/a17.webp", label: "Institutional map" },
];

const missionPoints = [
  {
    label: "Lire",
    title: "Identifier le driver dominant",
    detail: "Croissance, inflation, liquidité, bilan, valorisation ou risque politique.",
    icon: Radar,
  },
  {
    label: "Pondérer",
    title: "Hiérarchiser l’impact marché",
    detail: "Différencier donnée brute, surprise, consensus et réaction de deuxième tour.",
    icon: Layers3,
  },
  {
    label: "Décider",
    title: "Transformer l’analyse en scénario",
    detail: "Construire une thèse, une invalidation et une lecture inter-marchés.",
    icon: Target,
  },
];

const radarSignals = [
  { label: "Growth", value: 74, tone: "bg-bull" },
  { label: "Inflation", value: 61, tone: "bg-bear" },
  { label: "Rates", value: 82, tone: "bg-forge" },
  { label: "Liquidity", value: 48, tone: "bg-data" },
];

export function MissionBriefing() {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-2xl border bg-card p-6 shadow-elegant">
        <Eyebrow className="text-data">Mission briefing</Eyebrow>
        <h2 className="mt-3 font-display text-2xl font-bold text-foreground">Desk d’analyse fondamentale — protocole de décision</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Le chapitre est restructuré comme un workflow institutionnel: signal macro, diagnostic entreprise, valorisation,
          scénarios et exécution d’un cas. Chaque bloc produit une décision observable, pas une simple lecture passive.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {missionPoints.map((point, index) => (
            <ConceptCard key={point.label} className="group premium-hover" accent={index === 0}>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-forge/30 bg-forge/10 text-forge">
                  <point.icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{point.label}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.detail}</p>
            </ConceptCard>
          ))}
        </div>
      </div>

      <aside className="rounded-2xl border bg-gradient-surface p-5 shadow-elegant">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-forge" /> Macro radar
        </div>
        <div className="mt-5 space-y-4">
          {radarSignals.map((signal) => (
            <div key={signal.label}>
              <div className="mb-1 flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground">{signal.label}</span>
                <span className="tabular-nums text-foreground">{signal.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div className={cn("h-full rounded-full transition-all duration-700", signal.tone)} style={{ width: `${signal.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-bull/30 bg-bull/10 p-3 text-bull">
            <ArrowUpRight className="mb-1 h-4 w-4" /> Régime porteur si croissance + taux réels cohérents.
          </div>
          <div className="rounded-lg border border-bear/30 bg-bear/10 p-3 text-bear">
            <ArrowDownRight className="mb-1 h-4 w-4" /> Régime fragile si inflation + stress liquidité dominent.
          </div>
        </div>
      </aside>
    </section>
  );
}

export function SkillUnlockPreview({ completed }: { completed: Set<string> }) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-elegant">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Eyebrow>Skill unlock preview</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-foreground">Compétences débloquées par section</h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{completed.size}/{LESSONS.length} modules validés</span>
      </div>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(11rem,100%),1fr))] gap-3">
        {LESSONS.map((lesson) => {
          const done = completed.has(lesson.id);
          return (
            <a
              key={lesson.id}
              href={`#${lesson.id}`}
              className={cn(
                "premium-hover min-w-0 rounded-xl border bg-surface p-3 transition-all",
                done ? "border-bull/40 bg-bull/5" : "border-border",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{lesson.num}</span>
                {done ? <CheckCircle2 className="h-4 w-4 shrink-0 text-bull" /> : <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </div>
              <div className="mt-3 text-balance text-sm font-semibold leading-tight text-foreground">{lesson.title}</div>
              <p className="mt-1 line-clamp-2 text-pretty text-xs leading-relaxed text-muted-foreground">{lesson.subtitle}</p>
            </a>
          );
        })}
      </div>

    </section>
  );
}

export function VisualHybridLayer() {
  const schemas = [
    { title: "Inflation → taux → devise", left: "IPC", mid: "Banque centrale", right: "FX / Bonds", tone: "text-bear" },
    { title: "Croissance → earnings → multiples", left: "PIB", mid: "CA / marges", right: "P/E / DCF", tone: "text-bull" },
    { title: "Choc énergie → balance → risque", left: "Gaz / pétrole", mid: "Terms of trade", right: "EUR / AUD", tone: "text-forge" },
  ];

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-elegant">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow className="text-data">Visual hybrid layer</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-foreground">Schémas reconstruits en natif</h2>
        </div>
        <span className="rounded-full border border-data/30 bg-data/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-data">
          4K-safe · no corrupted text
        </span>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {visualAssets.map((asset) => (
          <div key={asset.src}>
            <VisualLayer src={asset.src} alt={`Référence visuelle ${asset.label} pour le chapitre Analyse Fondamentale`} variant="figure" label={`${asset.label} · WebP hybrid reference`} />
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {schemas.map((schema) => (
          <div key={schema.title} className="premium-hover min-w-0 rounded-xl border bg-surface p-4">
            <div className={cn("text-balance font-display text-base font-semibold leading-snug", schema.tone)}>{schema.title}</div>
            <ol className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              {[schema.left, schema.mid, schema.right].map((label, index) => (
                <li key={label} className="flex min-w-0 items-center gap-2">
                  <span className="min-w-0 break-words rounded-lg border bg-card px-3 py-2 text-center font-mono text-foreground">
                    {label}
                  </span>
                  {index < 2 && <span aria-hidden className="shrink-0 text-muted-foreground">→</span>}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

    </section>
  );
}