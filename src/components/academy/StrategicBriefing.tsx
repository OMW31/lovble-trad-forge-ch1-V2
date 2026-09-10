import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, Layers3, Lock, Radar, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConceptCard, Eyebrow, VisualLayer } from "./primitives";
import { useLessons } from "@/lib/academy/useChapterContent";
import { useT } from "@/lib/i18n";
import { getV1Asset } from "@/lib/academy/visual-assets";

const POINT_ICONS = [Radar, Layers3, Target];

const VISUAL_ASSETS = [
  { id: "a4", key: "macro" as const },
  { id: "a8", key: "terminal" as const },
  { id: "a17", key: "map" as const },
];

const RADAR_SIGNALS = [
  { key: "growth" as const, value: 74, tone: "bg-bull" },
  { key: "inflation" as const, value: 61, tone: "bg-bear" },
  { key: "rates" as const, value: 82, tone: "bg-forge" },
  { key: "liquidity" as const, value: 48, tone: "bg-data" },
];

const SCHEMA_TONES = ["text-bear", "text-bull", "text-forge"];

export function MissionBriefing() {
  const t = useT();
  const b = t.chrome.briefing;

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-2xl border bg-card p-6 shadow-elegant">
        <Eyebrow className="text-data">{b.eyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-2xl font-bold text-foreground">{b.title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{b.lead}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {b.points.map((point, index) => {
            const Icon = POINT_ICONS[index] ?? Radar;
            return (
              <ConceptCard key={point.label} className="group premium-hover" accent={index === 0}>
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg border border-forge/30 bg-forge/10 text-forge">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{point.label}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.detail}</p>
              </ConceptCard>
            );
          })}
        </div>
      </div>

      <aside className="rounded-2xl border bg-gradient-surface p-5 shadow-elegant">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-forge" /> {b.radarTitle}
        </div>
        <div className="mt-5 space-y-4">
          {RADAR_SIGNALS.map((signal) => (
            <div key={signal.key}>
              <div className="mb-1 flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground">{b.radarSignals[signal.key]}</span>
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
            <ArrowUpRight className="mb-1 h-4 w-4" /> {b.radarBull}
          </div>
          <div className="rounded-lg border border-bear/30 bg-bear/10 p-3 text-bear">
            <ArrowDownRight className="mb-1 h-4 w-4" /> {b.radarBear}
          </div>
        </div>
      </aside>
    </section>
  );
}

export function SkillUnlockPreview({ completed }: { completed: Set<string> }) {
  const t = useT();
  const b = t.chrome.briefing;
  const lessons = useLessons();

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-elegant">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Eyebrow>{b.skillEyebrow}</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-foreground">{b.skillTitle}</h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{b.skillModules(completed.size, lessons.length)}</span>
      </div>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(11rem,100%),1fr))] gap-3">
        {lessons.map((lesson) => {
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
  const t = useT();
  const b = t.chrome.briefing;

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-elegant">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow className="text-data">{b.hybridEyebrow}</Eyebrow>
          <h2 className="mt-2 font-display text-xl font-semibold text-foreground">{b.hybridTitle}</h2>
        </div>
        <span className="rounded-full border border-data/30 bg-data/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-data">
          {b.hybridBadge}
        </span>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {VISUAL_ASSETS.map((asset) => {
          const visual = getV1Asset(asset.id);
          if (!visual) return null;
          const label = b.hybridAssets[asset.key];
          return (
            <div key={visual.id}>
              <VisualLayer
                src={visual.src}
                alt={b.hybridAssetAlt(label)}
                variant="figure"
                label={b.hybridAssetLabel(label)}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {b.schemas.map((schema, index) => (
          <div key={schema.title} className="premium-hover min-w-0 rounded-xl border bg-surface p-4">
            <div className={cn("text-balance font-display text-base font-semibold leading-snug", SCHEMA_TONES[index] ?? "text-foreground")}>
              {schema.title}
            </div>
            <ol className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              {[schema.left, schema.mid, schema.right].map((label, i) => (
                <li key={label} className="flex min-w-0 items-center gap-2">
                  <span className="min-w-0 break-words rounded-lg border bg-card px-3 py-2 text-center font-mono text-foreground">
                    {label}
                  </span>
                  {i < 2 && <span aria-hidden className="shrink-0 text-muted-foreground">→</span>}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

    </section>
  );
}
