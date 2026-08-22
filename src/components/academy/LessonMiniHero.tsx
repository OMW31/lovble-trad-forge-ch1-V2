import { ChevronRight, Clock, Sparkles, Target, Zap } from "lucide-react";
import type { LessonMeta } from "@/lib/academy/chapter1";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function LessonMiniHero({ lesson }: { lesson: LessonMeta }) {
  const t = useT();
  const hero = lesson.miniHero;
  if (!hero) return null;

  const order = Number(lesson.num.split(".")[1] ?? "0");

  return (
    <div className="space-y-5">
      {/* Hero band */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative p-5 sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-bull/40 bg-bull/10 font-mono text-sm font-bold text-bull tabular-nums">
                  {String(order).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-bull/40 bg-bull/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bull">
                  {t.chrome.lesson.sectionOf(lesson.num)}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {hero.duration}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{lesson.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">{lesson.subtitle}</p>
            </div>
            <span className="hidden shrink-0 rounded-lg border border-border bg-surface/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground sm:inline-block">
              {hero.tier}
            </span>
          </div>

          {/* Step flow */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {hero.steps.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <span className="rounded-lg border border-border bg-surface/60 px-2.5 py-1 text-xs text-muted-foreground">{step}</span>
                {i < hero.steps.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission briefing */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-elegant">
        <div className="flex items-center gap-2 border-b border-bull/20 bg-bull/5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bull">
          <span className="h-1.5 w-1.5 rounded-full bg-bull animate-ticker-pulse" /> {t.chrome.lesson.missionBriefing}
        </div>
        <div className="grid gap-5 p-5 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Target className="h-3.5 w-3.5 text-forge" /> {t.chrome.lesson.objectivesShort}
            </div>
            <ul className="mt-3 space-y-2.5">
              {hero.objectives.map((obj, i) => (
                <li key={obj} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-0.5 font-mono text-xs font-semibold text-bull tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={cn("rounded-xl border border-data/30 bg-data/5 p-4")}>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-data">
              <Zap className="h-3.5 w-3.5" /> {t.chrome.lesson.keyQuestion}
            </div>
            <p className="mt-3 text-base font-semibold leading-relaxed text-foreground">{hero.keyQuestion}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-forge" /> {t.chrome.lesson.answerHint}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
