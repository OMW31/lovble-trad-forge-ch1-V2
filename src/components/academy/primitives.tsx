import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VisualLightbox } from "./VisualLightbox";
import { useT } from "@/lib/i18n";

/**
 * Fade/rise on scroll — bidirectional (plays on the way down AND back up).
 * Honors prefers-reduced-motion by rendering static content.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      viewport={{ once: false, amount: 0.18, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type VisualVariant = "background" | "figure" | "band";

/**
 * Premium visual integration layer. No visual is ever "posé" (raw <img>):
 * every asset gets opacity, fade (mask), gradient overlay and an entrance
 * animation. `background` blends behind content; `figure` is a contextual
 * inline illustration; `band` is a wide atmospheric strip.
 */
export function VisualLayer({
  src,
  alt,
  variant = "background",
  className,
  opacity = 0.5,
  position = "center",
  label,
  showCaption = true,
}: {
  src: string;
  alt: string;
  variant?: VisualVariant;
  className?: string;
  opacity?: number;
  position?: string;
  label?: string;
  showCaption?: boolean;
}) {
  const reduce = useReducedMotion();

  if (variant === "figure") {
    return (
      <motion.figure
        className={cn("group relative overflow-hidden rounded-xl border bg-surface", className)}
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <VisualLightbox
          src={src}
          alt={alt}
          label={label}
          showCaption={showCaption}
          className="border-0"
          imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
      </motion.figure>
    );
  }

  const isBand = variant === "band";

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={reduce ? undefined : { opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      <img
        src={src}
        alt=""
        role="presentation"
        loading="lazy"
        className="h-full w-full object-cover"
        style={{
          opacity,
          objectPosition: position,
          maskImage: isBand
            ? "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)"
            : "radial-gradient(120% 120% at 50% 30%, #000 35%, transparent 78%)",
          WebkitMaskImage: isBand
            ? "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)"
            : "radial-gradient(120% 120% at 50% 30%, #000 35%, transparent 78%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background/85" />
    </motion.div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-forge",
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-forge animate-ticker-pulse" />
      {children}
    </span>
  );
}

export function LevelBadge({ level }: { level: number }) {
  const t = useT().widgetsCorp.primitives;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-2.5 w-0.5 rounded-full", i < level ? "bg-forge" : "bg-border")}
          />
        ))}
      </span>
      {t.levelBadge(level)}
    </span>
  );
}

export function ConceptCard({
  title,
  children,
  className,
  accent,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 shadow-elegant",
        accent && "border-forge/40",
        className,
      )}
    >
      {title && <h4 className="mb-2 text-base font-semibold text-foreground">{title}</h4>}
      <div className="text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}

export function KpiTile({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "neutral" | "bull" | "bear" | "forge" | "data";
}) {
  return (
    <div className="min-w-0 rounded-lg border bg-surface p-4">
      <div className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1.5 hyphens-auto break-words font-mono text-[clamp(0.85rem,0.55vw+0.62rem,1.2rem)] font-semibold leading-tight tabular-nums",
          tone === "bull" && "text-bull",
          tone === "bear" && "text-bear",
          tone === "forge" && "text-forge",
          tone === "data" && "text-data",
          tone === "neutral" && "text-foreground",
        )}
      >
        {value}
      </div>
      {hint && <div className="mt-1 text-pretty text-xs leading-snug text-muted-foreground">{hint}</div>}
    </div>
  );
}


export function WidgetFrame({
  title,
  subtitle,
  badge,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border bg-card shadow-elegant", className)}>
      <div className="flex items-start justify-between gap-3 border-b px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-display text-base font-semibold text-foreground">{title}</h4>
          </div>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-forge/40 bg-forge/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-forge">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
