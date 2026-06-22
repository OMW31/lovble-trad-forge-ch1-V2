import { type ReactNode } from "react";
import { Reveal, LevelBadge } from "./primitives";

export function LessonSection({
  id,
  num,
  title,
  subtitle,
  children,
  level,
}: {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  level: number;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border/60 py-12 first:border-t-0 first:pt-8">
      <Reveal>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-forge">{num}</span>
              <span className="h-px w-8 bg-border" />
              <LevelBadge level={level} />
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </Reveal>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
