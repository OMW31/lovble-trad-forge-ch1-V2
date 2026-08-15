// ============================================================================
// PreflightGuide — onboarding d'entrée de parcours (positionné sur /academy,
// avant le hub des chapitres). Affiché une seule fois par navigateur, rejouable
// à la demande via le bouton « Revoir le guide » du hub.
// 100 % tokens de design, motion respectant prefers-reduced-motion.
// ============================================================================

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Flame, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SEEN_KEY = "tradforge:preflight:v1";

export function hasSeenPreflight() {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(SEEN_KEY) === "done";
  } catch {
    return true;
  }
}

export function markPreflightSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, "done");
  } catch {
    /* ignore */
  }
}

export function PreflightGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const steps = t.preflight.steps;
  const last = index === steps.length - 1;

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const finish = useCallback(() => {
    markPreflightSeen();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, steps.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, finish, steps.length]);

  const step = steps[index];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Preflight"
        >
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
          <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-9">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="flex min-w-0 items-center gap-2">
                <Flame className="h-4 w-4 shrink-0 text-forge" aria-hidden />
                <span className="truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {t.preflight.step} {index + 1} {t.preflight.of} {steps.length}
                </span>
              </div>
              <button
                type="button"
                onClick={finish}
                className="shrink-0 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="hidden sm:inline">{t.preflight.skip}</span>
                <X className="h-3.5 w-3.5 sm:hidden" aria-hidden />
              </button>
            </div>

            <div className="mt-5 flex gap-1.5" aria-hidden>
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-500",
                    i <= index ? "bg-forge" : "bg-border",
                  )}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 min-h-[168px]"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forge">{step.kicker}</p>
                <h2 className="mt-3 text-balance font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                disabled={index === 0}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">{t.preflight.back}</span>
              </button>
              <button
                type="button"
                onClick={() => (last ? finish() : setIndex((i) => i + 1))}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-forge px-5 py-2.5 text-sm font-semibold text-forge-foreground shadow-glow transition-transform hover:scale-[1.01]"
              >
                {last ? t.preflight.start : t.preflight.next}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
