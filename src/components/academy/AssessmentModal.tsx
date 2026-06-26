import { useMemo, useState } from "react";
import { Award, BarChart3, BrainCircuit, CheckCircle2, Gauge, Sparkles, Target } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { saveEvaluationAttempt } from "@/lib/academy/progress.functions";
import { cn } from "@/lib/utils";

const LEVELS = {
  standard: {
    label: "Standard",
    icon: Target,
    summary: "Validation des concepts, logique de lecture, prise de décision simple.",
    parts: [
      { title: "Partie A — QCM", detail: "Quiz de validation des concepts clés du chapitre." },
      { title: "Partie B — Widgets", detail: "Lecture dirigée d’indicateurs et tableaux de bord." },
      { title: "Partie C — TradingView", detail: "Scénario guidé avec décision unique." },
    ],
    tone: "text-bull border-bull/30 bg-bull/10",
  },
  high: {
    label: "High",
    icon: Gauge,
    summary: "Combinaison d’indicateurs, multi-facteurs et arbitrages plus exigeants.",
    parts: [
      { title: "Partie A — Analyse", detail: "Questions de synthèse macro / micro croisées." },
      { title: "Partie B — Dashboards", detail: "Interprétation de modules combinés et lecture de signaux contradictoires." },
      { title: "Partie C — TradingView", detail: "Scénario à variables multiples avec justification." },
    ],
    tone: "text-data border-data/30 bg-data/10",
  },
  premium: {
    label: "Premium",
    icon: Award,
    summary: "Raisonnement institutionnel, hiérarchisation des drivers, lecture de cas premium.",
    parts: [
      { title: "Partie A — Institutionnel", detail: "QCM et arbitrages de niveau desk macro/fundamental." },
      { title: "Partie B — Command Center", detail: "Widgets, dashboards et scénarios croisés avec scoring." },
      { title: "Partie C — TradingView", detail: "Replay scénarisé avec débrief structuré." },
    ],
    tone: "text-forge border-forge/30 bg-forge/10",
  },
} as const;

type LevelKey = keyof typeof LEVELS;

export function AssessmentModal({
  chapterId,
  lessonId,
  signedIn,
  progressPercent,
}: {
  chapterId: string;
  lessonId?: string;
  signedIn: boolean;
  progressPercent: number;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LevelKey>("standard");
  const saveAttempt = useServerFn(saveEvaluationAttempt);
  const mutation = useMutation({
    mutationFn: saveAttempt,
  });

  const available = useMemo(() => {
    if (progressPercent >= 100) return ["standard", "high", "premium"] as LevelKey[];
    if (progressPercent >= 65) return ["standard", "high"] as LevelKey[];
    return ["standard"] as LevelKey[];
  }, [progressPercent]);

  const current = LEVELS[active];
  const CurrentIcon = current.icon;

  const handleStart = async () => {
    if (!signedIn) return;
    await mutation.mutateAsync({
      data: {
        chapterId,
        lessonId,
        level: active,
        status: "in_progress",
        partAAnswers: [],
        partBAnswers: [],
        partCAnswers: [],
        feedback: {
          launcher: "assessment_modal",
          prototype: true,
        },
      },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95">
          <BrainCircuit className="h-4 w-4" />
          Évaluation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-border bg-background p-0 sm:rounded-2xl">
        <div className="border-b border-border bg-gradient-hero p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">Nouveau système d’évaluation</DialogTitle>
            <DialogDescription className="max-w-2xl text-sm text-muted-foreground">
              Modal indépendante du flux de lecture, structurée en 3 niveaux. Chaque niveau combine QCM, widgets/dashboards et replay scénarisé.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <Tabs value={active} onValueChange={(value) => setActive(value as LevelKey)}>
            <TabsList className="grid h-auto w-full grid-cols-3 gap-2 bg-transparent p-0">
              {(Object.keys(LEVELS) as LevelKey[]).map((level) => {
                const item = LEVELS[level];
                const Icon = item.icon;
                const locked = !available.includes(level);
                return (
                  <TabsTrigger
                    key={level}
                    value={level}
                    disabled={locked}
                    className={cn(
                      "h-auto rounded-xl border px-4 py-3 data-[state=active]:shadow-none",
                      locked ? "border-border bg-surface text-muted-foreground opacity-50" : "border-border bg-card text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {(Object.keys(LEVELS) as LevelKey[]).map((level) => {
              const item = LEVELS[level];
              const Icon = item.icon;
              const locked = !available.includes(level);
              return (
                <TabsContent key={level} value={level} className="mt-6">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="space-y-4">
                      <div className={cn("rounded-2xl border p-5", item.tone)}>
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-lg border border-current/20 bg-background/30">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-display text-xl font-semibold">{item.label}</div>
                            <p className="text-sm text-foreground/80">{item.summary}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        {item.parts.map((part, index) => (
                          <div key={part.title} className="rounded-xl border bg-card p-4 shadow-elegant">
                            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                              <Sparkles className="h-3.5 w-3.5 text-forge" />
                              Bloc {index + 1}
                            </div>
                            <h4 className="font-display text-base font-semibold text-foreground">{part.title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{part.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <aside className="rounded-2xl border bg-card p-5 shadow-elegant">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        <BarChart3 className="h-3.5 w-3.5 text-data" />
                        Readiness
                      </div>
                      <div className="mt-3 text-3xl font-semibold text-foreground">{progressPercent}%</div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {locked
                          ? "Niveau verrouillé: augmente la progression du chapitre pour débloquer ce palier."
                          : "Niveau disponible: prêt à être branché sur le scoring persistant et les cas scénarisés."}
                      </p>

                      <div className="mt-5 space-y-3">
                        {[
                          "Partie A — QCM",
                          "Partie B — Widgets / dashboards",
                          "Partie C — TradingView scénarisé",
                        ].map((label) => (
                          <div key={label} className="flex items-center gap-3 rounded-lg border bg-surface p-3 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-bull" />
                            {label}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-col gap-3">
                        <Button
                          disabled={locked || !signedIn || mutation.isPending}
                          onClick={handleStart}
                          className="bg-gradient-forge text-forge-foreground shadow-glow hover:opacity-95"
                        >
                          <CurrentIcon className="h-4 w-4" />
                          {signedIn ? "Démarrer ce niveau" : "Connexion requise"}
                        </Button>
                        {!signedIn && (
                          <p className="text-xs text-muted-foreground">
                            Connecte-toi pour sauvegarder tes tentatives, ton score et ta reprise exacte.
                          </p>
                        )}
                      </div>
                    </aside>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
