import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import type { LessonMeta } from "@/lib/academy/chapter1";

/** Reliable, idempotent scroll to a section id (re-scrolls even if already active). */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function MobileLessonBreadcrumb({
  lessons,
  activeId,
}: {
  lessons: LessonMeta[];
  activeId: string;
}) {
  // Deterministic navigation target, decoupled from the async scroll-spy.
  // The scroll-spy only *syncs* the display; clicks always advance from the
  // latest target, which fixes the "works 1 time out of 2" race.
  const [targetId, setTargetId] = useState(activeId);

  useEffect(() => {
    setTargetId(activeId);
  }, [activeId]);

  const index = Math.max(0, lessons.findIndex((lesson) => lesson.id === targetId));
  const current = lessons[index] ?? lessons[0];
  const previous = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;

  const go = useCallback((id: string) => {
    setTargetId(id);
    // Defer so the state-driven label updates before the smooth scroll starts.
    requestAnimationFrame(() => scrollToSection(id));
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-3 py-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="shrink-0"
            disabled={!previous}
            aria-label={previous ? `Aller à ${previous.title}` : "Section précédente indisponible"}
            onClick={() => previous && go(previous.id)}
          >
            <ChevronLeft className={previous ? "h-4 w-4" : "h-4 w-4 opacity-30"} />
          </Button>

          <div className="min-w-0 rounded-xl border bg-card px-3 py-2">
            <Breadcrumb>
              <BreadcrumbList className="min-w-0 flex-nowrap gap-1.5 text-xs">
                <BreadcrumbItem>
                  <Link to="/academy" className="truncate transition-colors hover:text-foreground">
                    Academy
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="min-w-0 flex-1">
                  <BreadcrumbPage className="block truncate text-sm font-medium text-foreground">
                    {current.num} · {current.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Compass className="h-3 w-3 text-forge" />
              <span className="truncate">{current.subtitle}</span>
            </div>
          </div>

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="shrink-0"
            disabled={!next}
            aria-label={next ? `Aller à ${next.title}` : "Section suivante indisponible"}
            onClick={() => next && go(next.id)}
          >
            <ChevronRight className={next ? "h-4 w-4" : "h-4 w-4 opacity-30"} />
          </Button>
        </div>
      </div>
    </div>
  );
}
