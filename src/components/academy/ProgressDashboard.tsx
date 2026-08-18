import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  Crown,
  Flame,
  Lock,
  Medal,
  Sparkles,
  Target,
  Trophy,
  Unlock,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ChapterDashboard, ChapterProfile } from "@/lib/academy/useChapterProgress";
import { useT } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

/* ------------------------------------------------------------------ */
/*  Rank system — RPG flavour driven by validated lessons + avg score  */
/* ------------------------------------------------------------------ */
function computeRank(d: ChapterDashboard, t: Dictionary) {
  const ranks = [
    { min: 0, name: t.dashboard.ranks.recruit, icon: Flame, color: "text-muted-foreground" },
    { min: 1, name: t.dashboard.ranks.apprentice, icon: BarChart3, color: "text-data" },
    { min: 2, name: t.dashboard.ranks.confirmed, icon: Target, color: "text-data" },
    { min: 3, name: t.dashboard.ranks.strategist, icon: Award, color: "text-forge" },
    { min: 4, name: t.dashboard.ranks.elite, icon: Trophy, color: "text-forge" },
    { min: 5, name: t.dashboard.ranks.master, icon: Crown, color: "text-forge" },
  ];
  const r = [...ranks].reverse().find((x) => d.lessonsValidated >= x.min) ?? ranks[0];
  const nextIndex = ranks.findIndex((x) => x.name === r.name) + 1;
  const next = ranks[nextIndex] ?? null;
  return { current: r, next };
}

/* ------------------------------------------------------------------ */
/*  Radial ring                                                        */
/* ------------------------------------------------------------------ */
function RadialRing({
  percent,
  size = 132,
  stroke = 10,
  children,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-forge)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ring-forge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--forge))" />
            <stop offset="100%" stopColor="hsl(var(--data))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

function medalStyles(t: Dictionary): Record<string, { ring: string; text: string; label: string }> {
  return {
    gold: { ring: "border-forge/60 bg-forge/15", text: "text-forge", label: t.dashboard.medals.gold },
    silver: { ring: "border-muted-foreground/40 bg-muted-foreground/10", text: "text-muted-foreground", label: t.dashboard.medals.silver },
    bronze: { ring: "border-data/50 bg-data/10", text: "text-data", label: t.dashboard.medals.bronze },
  };
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className={cn("h-3.5 w-3.5", accent)} />
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-bold tabular-nums text-foreground">{value}</div>
      {sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

/* ================================================================== */
/*  Full Cockpit modal                                                 */
/* ================================================================== */
export function ProgressDashboard({
  open,
  onOpenChange,
  dashboard,
  profile,
  signedIn,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  dashboard: ChapterDashboard;
  profile: ChapterProfile | null;
  signedIn: boolean;
}) {
  const t = useT();
  const d = dashboard;
  const { current, next } = computeRank(d, t);
  const RankIcon = current.icon;
  const name = profile?.display_name || profile?.username || profile?.email?.split("@")[0] || "Trader";
  const MEDAL_STYLES = medalStyles(t);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border bg-gradient-hero px-5 py-4 sm:px-6">
          <DialogTitle className="flex items-center gap-2 font-display">
            <Sparkles className="h-4 w-4 text-forge" />
            {t.dashboard.cockpitTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
          {/* Identity + rank + cert ring */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={name} className="h-14 w-14 rounded-2xl object-cover" />
              ) : (
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-forge font-display text-xl font-bold text-forge-foreground">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <div className="font-display text-lg font-bold text-foreground">{name}</div>
                <div className={cn("mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold", current.color)}>
                  <RankIcon className="h-4 w-4" />
                  {current.name}
                </div>
                {next && (
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t.dashboard.nextRank(next.name)}
                  </div>
                )}
              </div>
            </div>

            <RadialRing percent={d.certificationPercent}>
              <div>
                <div className="font-display text-2xl font-bold tabular-nums text-foreground">{d.certificationPercent}%</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{t.dashboard.certification}</div>
              </div>
            </RadialRing>
          </div>

          {/* Stat tiles */}
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile icon={Award} label={t.dashboard.lessonsValidated} value={`${d.lessonsValidated}/${d.lessonsTotal}`} sub={t.dashboard.remaining(d.lessonsRemaining)} accent="text-forge" />
            <StatTile icon={Target} label={t.dashboard.scenarios} value={`${d.scenariosPassed}/${d.scenariosTotal}`} sub={t.dashboard.scenariosRemaining(d.scenariosRemaining)} accent="text-data" />
            <StatTile icon={BarChart3} label={t.dashboard.averageScore} value={d.averageScore ? `${d.averageScore}%` : "—"} sub={t.dashboard.averageScoreSub} accent="text-bull" />
            <StatTile icon={Trophy} label={t.dashboard.chapter} value={`${d.chapterPercent}%`} sub={t.dashboard.chapterSub} accent="text-forge" />
          </div>

          {/* Lesson medals */}
          <div className="mt-6">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Medal className="h-3.5 w-3.5 text-forge" />
              {t.dashboard.medalsByLesson}
            </div>
            <div className="space-y-2">
              {d.lessons.map((l) => {
                const m = l.medal ? MEDAL_STYLES[l.medal] : null;
                return (
                  <div key={l.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{l.num}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{l.title}</span>
                    {l.validated ? (
                      <>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">{l.score ?? "—"}%</span>
                        <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase", m?.ring, m?.text)}>
                          <Medal className="h-3 w-3" />
                          {m?.label}
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        {t.dashboard.toValidate}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certification status */}
          <div
            className={cn(
              "mt-6 rounded-2xl border p-4 sm:p-5",
              d.certificationReady ? "border-bull/40 bg-bull/5" : "border-forge/30 bg-gradient-hero",
            )}
          >
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-forge">
              {d.certificationReady ? <Unlock className="h-3.5 w-3.5 text-bull" /> : <Lock className="h-3.5 w-3.5" />}
              {t.dashboard.finalCertification}
            </div>
            {d.certificationReady ? (
              <p className="mt-2 text-sm text-foreground">
                {t.dashboard.certificationReadyLead} <strong>{t.dashboard.certificationReadyStrong}</strong> {t.dashboard.certificationReadyTail}
              </p>
            ) : (
              <div className="mt-2 text-sm text-muted-foreground">
                {t.dashboard.certificationLockedBody}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {d.lessons.filter((l) => !l.validated).map((l) => (
                    <span key={l.id} className="rounded-full border border-forge/30 bg-forge/10 px-2 py-0.5 font-mono text-[10px] text-forge">
                      {l.num} · {l.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!signedIn && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t.dashboard.signInHint}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ================================================================== */
/*  Compact HUD (sidebar desktop + mobile drawer)                      */
/* ================================================================== */
export function SidebarProgressHUD({
  dashboard,
  onOpen,
}: {
  dashboard: ChapterDashboard;
  onOpen: () => void;
}) {
  const t = useT();
  const d = dashboard;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="premium-hover w-full rounded-xl border border-border bg-surface p-4 text-left"
    >
      <div className="flex items-center gap-3">
        <RadialRing percent={d.certificationPercent} size={56} stroke={6}>
          <span className="font-display text-xs font-bold tabular-nums text-foreground">{d.certificationPercent}%</span>
        </RadialRing>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-forge">
            <BarChart3 className="h-3.5 w-3.5" />
            {t.progressHud.myProgress}
          </div>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Award className="h-3 w-3 text-forge" />{d.lessonsValidated}/{d.lessonsTotal}</span>
            <span className="inline-flex items-center gap-1"><Target className="h-3 w-3 text-data" />{d.scenariosPassed}/{d.scenariosTotal}</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-muted-foreground/70">{t.progressHud.seeCockpit}</div>
        </div>
      </div>
    </button>
  );
}
