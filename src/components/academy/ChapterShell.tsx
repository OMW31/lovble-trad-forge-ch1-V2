import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronRight, CloudCheck, Flame, Lock } from "lucide-react";
import { LESSONS, CHAPTER } from "@/lib/academy/chapter1";
import { cn } from "@/lib/utils";
import { MobileLessonBreadcrumb } from "./MobileLessonBreadcrumb";
import { LearningNavigationEngine } from "./LearningNavigationEngine";
import { AcademyAccountButton } from "./AcademyAccountButton";
import { ProgressDashboard, SidebarProgressHUD } from "./ProgressDashboard";
import type { ChapterDashboard, ChapterProfile } from "@/lib/academy/useChapterProgress";

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => visible.set(id, e.isIntersecting ? e.intersectionRatio : 0));
          let top = "";
          let max = 0;
          visible.forEach((ratio, key) => {
            if (ratio > max) {
              max = ratio;
              top = key;
            }
          });
          if (max > 0 && top) setActive(top);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);
  return active;
}

/** Tracks which sub-sections have been seen (precise position + visited set). */
function useSubsectionSpy(ids: string[]) {
  const [activeSub, setActiveSub] = useState<string>("");
  const [visited, setVisited] = useState<Set<string>>(new Set());
  useEffect(() => {
    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            visible.set(id, e.isIntersecting ? e.intersectionRatio : 0);
            if (e.isIntersecting) {
              setVisited((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
            }
          });
          let top = "";
          let max = 0;
          visible.forEach((ratio, key) => {
            if (ratio > max) {
              max = ratio;
              top = key;
            }
          });
          if (max > 0 && top) setActiveSub(top);
        },
        { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.5, 1] },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);
  return { activeSub, visited };
}

export function ChapterShell({
  children,
  completedSections,
  headerActions,
  signedIn = false,
  profile = null,
  lessonPasses = new Set<string>(),
  certificationPercent = 0,
}: {
  children: ReactNode;
  completedSections: Set<string>;
  headerActions?: ReactNode;
  signedIn?: boolean;
  profile?: ChapterProfile | null;
  lessonPasses?: Set<string>;
  certificationPercent?: number;
}) {
  const ids = LESSONS.map((l) => l.id);
  const subIds = useMemo(() => LESSONS.flatMap((l) => l.subsections.map((s) => s.id)), []);
  const active = useScrollSpy(ids);
  const { activeSub, visited } = useSubsectionSpy(subIds);
  const progress = Math.round((completedSections.size / LESSONS.length) * 100);
  const subVisitedCount = visited.size;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/academy" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Academy</span>
            </Link>
            <span className="text-border">/</span>
            <span className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <Flame className="h-4 w-4 text-forge" />
              {CHAPTER.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-gradient-forge transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">{progress}%</span>
              {signedIn && (
                <span className="hidden items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-bull md:inline-flex" title="Progression synchronisée">
                  <CloudCheck className="h-3.5 w-3.5" />
                  Sync
                </span>
              )}
            </div>
            {headerActions}
            <AcademyAccountButton signedIn={signedIn} profile={profile} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 sm:px-6">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 overflow-y-auto py-8 lg:block">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{CHAPTER.num}</span>
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{subVisitedCount}/{subIds.length} blocs</span>
          </div>
          <nav className="space-y-1">
            {LESSONS.map((l) => {
              const isActive = active === l.id;
              const done = completedSections.has(l.id);
              const lessonVisited = l.subsections.filter((s) => visited.has(s.id)).length;
              return (
                <div key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-all",
                      isActive ? "border-border bg-surface" : "hover:bg-surface/60",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]",
                        done
                          ? "border-bull/50 bg-bull/15 text-bull"
                          : isActive
                            ? "border-forge bg-forge/15 text-forge"
                            : "border-border text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="h-3 w-3" /> : l.num.split(".")[1]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("flex items-center justify-between gap-2 text-sm font-medium leading-tight", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                        <span className="truncate">{l.title}</span>
                        <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground/70">{lessonVisited}/{l.subsections.length}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground/70">{l.subtitle}</span>
                    </span>
                  </a>

                  {/* Sub-sections accordion — expanded for the active lesson */}
                  {isActive && (
                    <ul className="ml-[1.45rem] mt-1 space-y-0.5 border-l border-border/70 pl-3">
                      {l.subsections.map((s) => {
                        const subActive = activeSub === s.id;
                        const subDone = visited.has(s.id);
                        return (
                          <li key={s.id}>
                            <a
                              href={`#${s.id}`}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
                                subActive ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              <span
                                className={cn(
                                  "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border",
                                  subDone ? "border-bull/50 bg-bull/15 text-bull" : subActive ? "border-forge bg-forge/15 text-forge" : "border-border",
                                )}
                              >
                                {subDone ? <Check className="h-2.5 w-2.5" /> : subActive ? <ChevronRight className="h-2.5 w-2.5" /> : null}
                              </span>
                              <span className="truncate">{s.label}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-6 rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Chapitre suivant
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">Banques Centrales</div>
            <div className="mt-2 font-mono text-[10px] text-muted-foreground">
              Débloqué à 100% du Chapitre 1
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-8 pb-28 lg:py-12 lg:pb-12">{children}</main>
      </div>

      <LearningNavigationEngine
        lessons={LESSONS}
        active={active}
        activeSub={activeSub}
        visited={visited}
        completedSections={completedSections}
        lessonPasses={lessonPasses}
        certificationPercent={certificationPercent}
      />

      <MobileLessonBreadcrumb lessons={LESSONS} activeId={active} />
    </div>
  );
}
