import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Flame, Lock } from "lucide-react";
import { LESSONS, CHAPTER } from "@/lib/academy/chapter1";
import { cn } from "@/lib/utils";

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            visible.set(id, e.isIntersecting ? e.intersectionRatio : 0);
          });
          let top = active;
          let max = 0;
          visible.forEach((ratio, key) => {
            if (ratio > max) {
              max = ratio;
              top = key;
            }
          });
          if (max > 0) setActive(top);
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

export function ChapterShell({
  children,
  completedSections,
}: {
  children: ReactNode;
  completedSections: Set<string>;
}) {
  const ids = LESSONS.map((l) => l.id);
  const active = useScrollSpy(ids);
  const progress = Math.round((completedSections.size / LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
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
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 sm:px-6">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto py-8 lg:block">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {CHAPTER.num}
          </div>
          <nav className="space-y-1">
            {LESSONS.map((l) => {
              const isActive = active === l.id;
              const done = completedSections.has(l.id);
              return (
                <a
                  key={l.id}
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
                  <span className="min-w-0">
                    <span className={cn("block text-sm font-medium leading-tight", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                      {l.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted-foreground/70">{l.subtitle}</span>
                  </span>
                </a>
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

        {/* Main content */}
        <main className="min-w-0 flex-1 py-8 lg:py-12">{children}</main>
      </div>
    </div>
  );
}
