import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, PanelLeftOpen, X, Award } from "lucide-react";
import type { LessonMeta } from "@/lib/academy/chapter1";
import { cn } from "@/lib/utils";

/**
 * Learning Navigation Engine — discreet arrow (top-left) that opens a Sidebar
 * Overlay. MOBILE / TABLET ONLY (< lg): desktop already has the sticky sidebar.
 * Mirrors the desktop tree: lessons + sub-sections, visited/active/done states,
 * global progress, validated lessons, and resume position.
 */
export function LearningNavigationEngine({
  lessons,
  active,
  activeSub,
  visited,
  completedSections,
  lessonPasses,
  certificationPercent,
}: {
  lessons: LessonMeta[];
  active: string;
  activeSub: string;
  visited: Set<string>;
  completedSections: Set<string>;
  lessonPasses: Set<string>;
  certificationPercent: number;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const validatedCount = lessonPasses.size;

  return (
    <>
      {/* Discreet trigger — mobile / tablet only. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la navigation du chapitre"
        className="fixed left-3 top-16 z-40 grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-background/90 text-foreground shadow-elegant backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 lg:hidden"
      >
        <PanelLeftOpen className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col border-r border-border bg-background shadow-glow"
              initial={reduce ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-forge">Navigation</div>
                  <div className="mt-0.5 font-display text-sm font-semibold text-foreground">Plan du chapitre</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Certification progress */}
              <div className="border-b border-border px-4 py-3">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-forge" /> Certification</span>
                  <span className="tabular-nums">{validatedCount}/5 leçons</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-gradient-forge transition-all duration-500" style={{ width: `${certificationPercent}%` }} />
                </div>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {lessons.map((l) => {
                  const isActive = active === l.id;
                  const done = completedSections.has(l.id);
                  const validated = lessonPasses.has(l.id);
                  return (
                    <div key={l.id}>
                      <button
                        type="button"
                        onClick={() => go(l.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-all",
                          isActive ? "border-border bg-surface" : "hover:bg-surface/60",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]",
                            validated || done
                              ? "border-bull/50 bg-bull/15 text-bull"
                              : isActive
                                ? "border-forge bg-forge/15 text-forge"
                                : "border-border text-muted-foreground",
                          )}
                        >
                          {validated || done ? <Check className="h-3 w-3" /> : l.num.split(".")[1]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block truncate text-sm font-medium leading-tight", isActive ? "text-foreground" : "text-muted-foreground")}>
                            {l.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] text-muted-foreground/70">{l.subtitle}</span>
                        </span>
                      </button>

                      {isActive && (
                        <ul className="ml-[1.45rem] mt-1 space-y-0.5 border-l border-border/70 pl-3">
                          {l.subsections.map((s) => {
                            const subActive = activeSub === s.id;
                            const subDone = visited.has(s.id);
                            return (
                              <li key={s.id}>
                                <button
                                  type="button"
                                  onClick={() => go(s.id)}
                                  className={cn(
                                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors",
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
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
