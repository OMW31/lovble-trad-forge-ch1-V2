import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, ArrowRight, Eye, MousePointerClick, Target, Brain } from "lucide-react";
import { Eyebrow } from "@/components/academy/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TradeForge - See the invisible forces that move every market" },
      {
        name: "description",
        content:
          "An institutional-grade macro lab for traders, investors, and analysts. Six chapters, 100+ widgets, 1000+ scenarios, and the twice daily macro signal coming next",
      },
      { property: "og:title", content: "TradeForge - See the invisible forces that move every market" },
      {
        property: "og:description",
        content: "An institutional-grade macro lab for traders, investors, and analysts. Six chapters, 100+ widgets, 1000+ scenarios, and the twice daily macro signal coming next",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  { icon: Eye, title: "Voir", desc: "Des visualisations vivantes qui rendent l'abstrait concret." },
  { icon: MousePointerClick, title: "Manipuler", desc: "Des widgets interactifs : touchez aux variables, lisez l'impact." },
  { icon: Target, title: "Décider", desc: "Des scénarios réels où vous prenez position avant la révélation." },
  { icon: Brain, title: "Comprendre", desc: "Un feedback immédiat qui ancre durablement l'intuition." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6">
          <span className="flex items-center gap-2 font-display font-semibold text-foreground">
            <Flame className="h-5 w-5 text-forge" />
            TradForge
          </span>
          <Link
            to="/academy"
            className="rounded-lg border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            Academy
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
          <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-[1100px] px-4 py-20 text-center sm:px-6 sm:py-28">
            <Eyebrow className="justify-center">TradForge Academy</Eyebrow>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              L'analyse des marchés, <span className="text-gradient-forge">forgée</span> par la pratique.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Arrêtez de lire des cours. Pilotez un environnement d'analyse macro et micro-économique de niveau
              institutionnel — McKinsey & BlackRock comme boussole.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/academy/analyse-fondamentale"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-forge px-6 py-3.5 text-sm font-semibold text-forge-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Commencer le Chapitre 1
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl border bg-card p-5 shadow-elegant">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forge/15">
                  <p.icon className="h-5 w-5 text-forge" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-[1100px] px-4 text-center font-mono text-xs text-muted-foreground sm:px-6">
          TradForge Academy — apprendre les marchés en manipulant.
        </div>
      </footer>
    </div>
  );
}
