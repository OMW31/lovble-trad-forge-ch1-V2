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
    <section
      id={id}
      className="scroll-mt-24 pb-20 pt-16 first:pt-6 lg:pb-28 lg:pt-24"
    >
      {/* Premium lesson divider — gives each lesson room to breathe. */}
      <div
        aria-hidden
        className="mb-12 flex items-center gap-4 lg:mb-16"
      >
        <span className="font-display text-[3.25rem] font-black leading-none text-foreground/[0.06] tabular-nums sm:text-[4rem]">
          {num}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-forge/50 via-border to-transparent" />
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-forge/80">
          Section {num}
        </span>
      </div>

      <Reveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 lg:mb-10">
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
      <div className="space-y-8 lg:space-y-12">{children}</div>
    </section>
  );
}
