import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { generateSeries, type CaseStudy } from "@/lib/academy/market-data";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const W = 920;
const H = 380;
const PAD = { top: 24, right: 70, bottom: 28, left: 12 };

interface Props {
  caseStudy: CaseStudy;
  className?: string;
  autoPlayOnView?: boolean;
}

export function CandleReplay({ caseStudy, className, autoPlayOnView = true }: Props) {
  const t = useT().widgetsMacro.candleReplay;
  const candles = useMemo(() => generateSeries(caseStudy.series), [caseStudy]);
  const total = candles.length;
  const [visible, setVisible] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (!autoPlayOnView || started) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          setPlaying(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [autoPlayOnView, started]);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const stepMs = 70;
    const tick = (time: number) => {
      if (!lastRef.current) lastRef.current = time;
      if (time - lastRef.current >= stepMs) {
        lastRef.current = time;
        setVisible((v) => {
          if (v >= total) {
            setPlaying(false);
            return v;
          }
          return v + 1;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = 0;
    };
  }, [playing, total]);

  const shown = candles.slice(0, visible);
  const { min, max } = useMemo(() => {
    let lo = Infinity;
    let hi = -Infinity;
    for (const c of candles) {
      lo = Math.min(lo, c.l);
      hi = Math.max(hi, c.h);
    }
    if (caseStudy.refLevel) {
      lo = Math.min(lo, caseStudy.refLevel.value);
      hi = Math.max(hi, caseStudy.refLevel.value);
    }
    const pad = (hi - lo) * 0.08;
    return { min: lo - pad, max: hi + pad };
  }, [candles, caseStudy]);

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const colW = plotW / total;
  const bodyW = Math.max(2, colW * 0.62);

  const x = (i: number) => PAD.left + colW * i + colW / 2;
  const y = (price: number) => PAD.top + (1 - (price - min) / (max - min)) * plotH;

  const last = shown[shown.length - 1];
  const first = candles[0];
  const change = last ? ((last.c - first.o) / first.o) * 100 : 0;
  const dec = caseStudy.series.decimals;

  const markerRevealed = visible > caseStudy.marker.at;

  const restart = () => {
    setVisible(1);
    setPlaying(true);
  };

  const gridLines = 4;

  return (
    <div ref={containerRef} className={cn("rounded-xl border bg-card overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
            {caseStudy.instrument}
          </span>
          <span className="text-xs text-muted-foreground">{caseStudy.period}</span>
        </div>
        <div className="flex items-center gap-3">
          {last && (
            <span className="font-mono text-sm tabular-nums text-foreground">
              {last.c.toFixed(dec)}
            </span>
          )}
          <span
            className={cn(
              "font-mono text-xs tabular-nums font-semibold",
              change >= 0 ? "text-bull" : "text-bear",
            )}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="relative bg-gradient-surface">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.chartAriaLabel(caseStudy.instrument)}>
          {Array.from({ length: gridLines + 1 }).map((_, g) => {
            const price = min + ((max - min) * g) / gridLines;
            const yy = y(price);
            return (
              <g key={g}>
                <line x1={PAD.left} x2={W - PAD.right} y1={yy} y2={yy} stroke="var(--grid)" strokeWidth={1} />
                <text
                  x={W - PAD.right + 8}
                  y={yy + 3}
                  className="font-mono"
                  fontSize={10}
                  fill="var(--muted-foreground)"
                >
                  {price.toFixed(dec)}
                </text>
              </g>
            );
          })}

          {caseStudy.refLevel && (
            <g>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(caseStudy.refLevel.value)}
                y2={y(caseStudy.refLevel.value)}
                stroke="var(--data)"
                strokeWidth={1.2}
                strokeDasharray="5 5"
                opacity={0.7}
              />
              <text
                x={PAD.left + 6}
                y={y(caseStudy.refLevel.value) - 6}
                fontSize={10}
                className="font-mono"
                fill="var(--data)"
              >
                {caseStudy.refLevel.label}
              </text>
            </g>
          )}

          {markerRevealed && (
            <g>
              <line
                x1={x(caseStudy.marker.at)}
                x2={x(caseStudy.marker.at)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="var(--forge)"
                strokeWidth={1.2}
                strokeDasharray="3 4"
                opacity={0.8}
              />
              <circle cx={x(caseStudy.marker.at)} cy={PAD.top} r="3.5" fill="var(--forge)" />
              <text
                x={Math.min(x(caseStudy.marker.at) + 8, W - PAD.right - 4)}
                y={PAD.top + 12}
                fontSize={10}
                fontWeight={600}
                className="font-mono"
                fill="var(--forge)"
                textAnchor={x(caseStudy.marker.at) > W * 0.6 ? "end" : "start"}
              >
                {caseStudy.marker.label}
              </text>
            </g>
          )}

          {shown.map((c) => {
            const up = c.c >= c.o;
            const color = up ? "var(--bull)" : "var(--bear)";
            const bodyTop = y(Math.max(c.o, c.c));
            const bodyBottom = y(Math.min(c.o, c.c));
            const bodyH = Math.max(1, bodyBottom - bodyTop);
            return (
              <g key={c.i}>
                <line x1={x(c.i)} x2={x(c.i)} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={1} />
                <rect
                  x={x(c.i) - bodyW / 2}
                  y={bodyTop}
                  width={bodyW}
                  height={bodyH}
                  fill={color}
                  rx={0.5}
                />
              </g>
            );
          })}

          {last && (
            <g>
              <circle cx={x(last.i)} cy={y(last.c)} r="3" fill={last.c >= last.o ? "var(--bull)" : "var(--bear)"} />
              <line
                x1={x(last.i)}
                x2={W - PAD.right}
                y1={y(last.c)}
                y2={y(last.c)}
                stroke={last.c >= last.o ? "var(--bull)" : "var(--bear)"}
                strokeWidth={0.8}
                strokeDasharray="2 3"
                opacity={0.6}
              />
            </g>
          )}
        </svg>
      </div>

      {/* controls */}
      <div className="flex items-center gap-3 border-t px-4 py-2.5">
        <button
          onClick={() => {
            if (visible >= total) restart();
            else setPlaying((p) => !p);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-forge text-forge-foreground transition-transform hover:scale-105"
          aria-label={playing ? t.pause : t.play}
        >
          {visible >= total ? <RotateCcw className="h-4 w-4" /> : playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <input
          type="range"
          min={1}
          max={total}
          value={visible}
          onChange={(e) => {
            setPlaying(false);
            setVisible(Number(e.target.value));
          }}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-[var(--forge)]"
          aria-label={t.playbackPositionAriaLabel}
        />
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {visible}/{total}
        </span>
      </div>
    </div>
  );
}
