import { ArrowDown, Activity, Layers, Target, Sparkles } from "lucide-react";
import { Eyebrow, VisualLayer } from "./primitives";
import { BACKGROUNDS } from "@/lib/academy/visual-assets";
import { useChapter } from "@/lib/academy/useChapterContent";
import { useT } from "@/lib/i18n";


const TICKERS = [
  { sym: "EUR/USD", val: "1.0852", chg: "-0.28%", up: false },
  { sym: "USD/JPY", val: "148.02", chg: "+0.34%", up: true },
  { sym: "GBP/USD", val: "1.2641", chg: "-0.12%", up: false },
  { sym: "XAU/USD", val: "2 042.5", chg: "+0.61%", up: true },
  { sym: "DXY", val: "104.18", chg: "+0.22%", up: true },
  { sym: "US10Y", val: "4.18%", chg: "+0.03", up: true },
  { sym: "WTI", val: "78.34", chg: "-0.44%", up: false },
];

export function ChapterHero() {
  const chapter = useChapter();
  const t = useT();
  const stats = [
    { icon: Layers, label: t.chrome.hero.statLessons, value: "6" },
    { icon: Activity, label: t.chrome.hero.statWidgets, value: "20+" },
    { icon: Target, label: t.chrome.hero.statCases, value: "10" },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <VisualLayer
        src={BACKGROUNDS.chapterHero}
        alt=""
        variant="background"
        opacity={0.12}
        className="[mask-image:radial-gradient(90%_90%_at_72%_35%,#000_0%,transparent_72%)]"
      />


      <div className="relative px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>{chapter.num} · {t.chrome.hero.missionControl}</Eyebrow>
          <span className="hidden items-center gap-1.5 rounded-full border border-forge/40 bg-forge/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-forge sm:inline-flex">
            <Sparkles className="h-3 w-3" /> {t.chrome.hero.edition}
          </span>
        </div>

        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          {chapter.title}
        </h1>
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-forge">{chapter.tagline}</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{chapter.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#intro"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-forge px-5 py-3 text-sm font-semibold text-forge-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            {t.chrome.hero.startLab}
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#cas-pratiques"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            {t.chrome.hero.seeCases}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-md">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border/70 bg-surface/60 p-3 backdrop-blur-sm">
              <s.icon className="h-4 w-4 text-forge" />
              <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-foreground">{s.value}</div>
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Live ticker strip — infinite marquee */}
      <div className="group/marquee relative border-t border-border/70 bg-background/40 backdrop-blur-sm">
        <div className="marquee-mask overflow-hidden py-2.5">
          <div className="flex w-max animate-marquee items-center" style={{ ["--marquee-duration" as string]: "38s" }} aria-hidden>
            {[...TICKERS, ...TICKERS].map((t, i) => (
              <div key={`${t.sym}-${i}`} className="flex shrink-0 items-baseline gap-2 px-6 font-mono text-xs">
                <span className="text-muted-foreground">{t.sym}</span>
                <span className="tabular-nums text-foreground">{t.val}</span>
                <span className={t.up ? "text-bull" : "text-bear"}>{t.chg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
