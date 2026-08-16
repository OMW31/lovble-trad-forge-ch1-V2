import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, ArrowRight, Lock, CheckCircle2, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/academy/primitives";
import { LanguageSwitch } from "@/components/academy/LanguageSwitch";
import { PreflightGuide, hasSeenPreflight } from "@/components/academy/PreflightGuide";
import { useT } from "@/lib/i18n";

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
  const t = useT();
  const [preflight, setPreflight] = useState(false);

  useEffect(() => {
    if (!hasSeenPreflight()) setPreflight(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PreflightGuide open={preflight} onClose={() => setPreflight(false)} />
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid h-14 max-w-[1100px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
          <Link to="/academy" className="flex min-w-0 items-center gap-2 font-display font-semibold text-foreground">
            <Flame className="h-5 w-5 shrink-0 text-forge" />
            <span className="truncate">TradForge</span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitch />
            <button
              type="button"
              onClick={() => setPreflight(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <Compass className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{t.nav.replayGuide}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 sm:py-16">
        <Eyebrow>{t.hub.eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t.hub.title}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">{t.hub.lead}</p>

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
