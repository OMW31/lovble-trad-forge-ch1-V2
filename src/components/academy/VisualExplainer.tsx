import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, VisualLayer } from "./primitives";
import type { VisualAsset } from "@/lib/academy/visual-assets";

export type ExplainerNode = {
  label: string;
  detail?: string;
  tone?: "neutral" | "bull" | "bear" | "forge" | "data";
};

export type ExplainerCallout = {
  label: string;
  value: string;
  tone?: "neutral" | "bull" | "bear" | "forge" | "data";
};

const toneText: Record<string, string> = {
  neutral: "text-foreground",
  bull: "text-bull",
  bear: "text-bear",
  forge: "text-forge",
  data: "text-data",
};

const toneBorder: Record<string, string> = {
  neutral: "border-border",
  bull: "border-bull/40",
  bear: "border-bear/40",
  forge: "border-forge/40",
  data: "border-data/40",
};

/**
 * Standard officiel d'intégration visuelle (docs/ch1/VISUAL_INTEGRATION_STANDARD.md).
 *
 * Trois couches, toujours dans cet ordre :
 *  1. contexte éditorial (kicker + titre + lead)
 *  2. l'image, montée via VisualLayer/VisualLightbox — jamais en <img> brut
 *  3. la couche native traduisible : chaîne causale + callouts + lecture
 *
 * Le texte pédagogique n'est JAMAIS lu depuis l'image : il vit ici, en données
 * typées, donc traduisible, responsive et accessible.
 */
export function VisualExplainer({
  asset,
  kicker,
  title,
  lead,
  chain,
  callouts,
  reading,
  className,
  reverse = false,
  children,
}: {
  asset: VisualAsset;
  kicker?: string;
  title: string;
  lead?: ReactNode;
  chain?: ExplainerNode[];
  callouts?: ExplainerCallout[];
  reading?: ReactNode;
  className?: string;
  reverse?: boolean;
  children?: ReactNode;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border bg-card shadow-elegant",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div className="min-w-0 border-b lg:border-b-0 lg:border-r">
          <VisualLayer
            src={asset.src}
            alt={asset.alt}
            variant="figure"
            label={asset.label}
            className="rounded-none border-0"
          />
        </div>

        <figcaption className="min-w-0 space-y-4 p-5 sm:p-6">
          {kicker && (
            <span className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-forge">
              {kicker}
            </span>
          )}
          <h3 className="text-balance font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {title}
          </h3>
          {lead && (
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{lead}</p>
          )}

          {chain && chain.length > 0 && (
            <ol className="flex flex-wrap items-stretch gap-2">
              {chain.map((node, i) => (
                <li key={node.label} className="flex min-w-0 items-center gap-2">
                  <div
                    className={cn(
                      "min-w-0 rounded-lg border bg-surface px-3 py-2",
                      toneBorder[node.tone ?? "neutral"],
                    )}
                  >
                    <div
                      className={cn(
                        "break-words font-mono text-[11px] font-medium uppercase tracking-wider",
                        toneText[node.tone ?? "neutral"],
                      )}
                    >
                      {node.label}
                    </div>
                    {node.detail && (
                      <div className="mt-0.5 text-pretty text-[11px] leading-snug text-muted-foreground">
                        {node.detail}
                      </div>
                    )}
                  </div>
                  {i < chain.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          )}

          {callouts && callouts.length > 0 && (
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(9rem,100%),1fr))] gap-2">
              {callouts.map((c) => (
                <div key={c.label} className="min-w-0 rounded-lg border bg-surface p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </dt>
                  <dd
                    className={cn(
                      "mt-1 break-words font-mono text-sm font-semibold tabular-nums",
                      toneText[c.tone ?? "neutral"],
                    )}
                  >
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {reading && (
            <div className="rounded-lg border border-data/30 bg-data/5 p-3 text-xs leading-relaxed text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-wider text-data">Lecture</span>
              <p className="mt-1 text-pretty">{reading}</p>
            </div>
          )}

          {children}
        </figcaption>
      </div>
    </figure>
  );
}

/** Variante compacte : visuel pleine largeur + couche explicative en dessous. */
export function VisualExplainerStacked(props: Parameters<typeof VisualExplainer>[0]) {
  return (
    <Reveal>
      <VisualExplainer {...props} className={cn("lg:[&>div]:grid-cols-1", props.className)} />
    </Reveal>
  );
}
