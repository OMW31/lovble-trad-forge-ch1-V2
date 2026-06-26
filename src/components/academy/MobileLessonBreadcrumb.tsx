import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import type { LessonMeta } from "@/lib/academy/chapter1";

export function MobileLessonBreadcrumb({
  lessons,
  activeId,
}: {
  lessons: LessonMeta[];
  activeId: string;
}) {
  const index = Math.max(0, lessons.findIndex((lesson) => lesson.id === activeId));
  const current = lessons[index] ?? lessons[0];
  const previous = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-3 py-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <Button asChild size="icon" variant="outline" className="shrink-0">
            {previous ? (
              <a href={`#${previous.id}`} aria-label={`Aller à ${previous.title}`}>
                <ChevronLeft className="h-4 w-4" />
              </a>
            ) : (
              <span aria-hidden="true">
                <ChevronLeft className="h-4 w-4 opacity-30" />
              </span>
            )}
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
              {current.subtitle}
            </div>
          </div>

          <Button asChild size="icon" variant="outline" className="shrink-0">
            {next ? (
              <a href={`#${next.id}`} aria-label={`Aller à ${next.title}`}>
                <ChevronRight className="h-4 w-4" />
              </a>
            ) : (
              <span aria-hidden="true">
                <ChevronRight className="h-4 w-4 opacity-30" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
