import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "@/components/academy/primitives";

export const Route = createFileRoute("/academy/")({
  head: () => ({
    meta: [
      { title: "Academy — TradForge" },
      {
        name: "description",
        content:
          "Le parcours TradForge Academy : analyse fondamentale, banques centrales, géopolitique, corrélations et cycles. Apprendre en manipulant.",
      },
      { property: "og:title", content: "Academy — TradForge" },
      { property: "og:description", content: "Apprendre les marchés en manipulant, pas en lisant." },
    ],
  }),
  component: AcademyIndex,
});

const CHAPTERS = [
  {
    num: "01",
    title: "Analyse Fondamentale",
    desc: "Valeur intrinsèque, macro & micro, valorisation, prévisions, 10 cas historiques.",
    to: "/academy/analyse-fondamentale" as const,
    status: "open" as const,
    lessons: 6,
  },
  { num: "02", title: "Banques Centrales", desc: "Taux, QE/QT, forward guidance, hawkish vs dovish.", status: "locked" as const, lessons: 5 },
  { num: "03", title: "Géopolitique & Crises", desc: "Risque politique, refuges, chocs d'offre.", status: "locked" as const, lessons: 5 },
  { num: "04", title: "Corrélations de Marché", desc: "Intermarket, diversification, régimes.", status: "locked" as const, lessons: 4 },
  { num: "05", title: "Cycles Financiers", desc: "Expansion, pic, récession, reprise.", status: "locked" as const, lessons: 4 },
];

function AcademyIndex() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-foreground">
            <Flame className="h-5 w-5 text-forge" />
            TradForge
          </Link>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Academy</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 sm:py-16">
        <Eyebrow>Parcours certifiant</Eyebrow>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Apprenez les marchés en <span className="text-gradient-forge">manipulant</span>, pas en lisant.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Un laboratoire interactif de niveau institutionnel. Chaque concept se voit, se manipule, se décide et se
          comprend.
        </p>

        <div className="mt-12 grid gap-4">
          {CHAPTERS.map((c) => {
            const open = c.status === "open";
            const Card = (
              <div
                className={`group flex items-center gap-5 rounded-2xl border bg-card p-5 shadow-elegant transition-all ${
                  open ? "hover:border-forge/50 hover:shadow-glow" : "opacity-60"
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-surface-2 font-display text-xl font-bold text-forge">
                  {c.num}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
                    {open ? (
                      <CheckCircle2 className="h-4 w-4 text-bull" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{c.desc}</p>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                    {c.lessons} leçons
                  </p>
                </div>
                {open && (
                  <ArrowRight className="h-5 w-5 shrink-0 text-forge transition-transform group-hover:translate-x-1" />
                )}
              </div>
            );
            return open && c.to ? (
              <Link key={c.num} to={c.to}>
                {Card}
              </Link>
            ) : (
              <div key={c.num}>{Card}</div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
