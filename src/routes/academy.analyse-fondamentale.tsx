import { Link, createFileRoute } from "@tanstack/react-router";
import { Scale, TrendingUp, BarChart3, Calculator, LineChart, History, CheckCircle2, Award, Activity, Lock } from "lucide-react";
import { CHAPTER } from "@/lib/academy/chapter1";
import { CASE_STUDIES } from "@/lib/academy/market-data";
import { ChapterShell } from "@/components/academy/ChapterShell";
import { ChapterHero } from "@/components/academy/ChapterHero";
import { LessonSection } from "@/components/academy/LessonSection";
import { ConceptCard, KpiTile, Reveal, Eyebrow, VisualLayer } from "@/components/academy/primitives";
import { VisualExplainer, VisualExplainerStacked } from "@/components/academy/VisualExplainer";
import { V2_ASSETS, BACKGROUNDS, v1Asset } from "@/lib/academy/visual-assets";
import { Scenario } from "@/components/academy/Scenario";
import { CandleReplay } from "@/components/academy/CandleReplay";
import { MarketDriverVisualizer } from "@/components/academy/MarketDriverVisualizer";
import { MacroIndicatorLab } from "@/components/academy/MacroIndicatorLab";
import { MacroDashboard } from "@/components/academy/MacroDashboard";
import { CompanyHealthScore } from "@/components/academy/CompanyHealthScore";
import { BalanceSheetExplorer } from "@/components/academy/BalanceSheetExplorer";
import { ValuationLab } from "@/components/academy/ValuationLab";
import { PeerComparisonMatrix } from "@/components/academy/PeerComparisonMatrix";
import { EarningsImpactEngine } from "@/components/academy/EarningsImpactEngine";
import { ForecastScenarioPlanner } from "@/components/academy/ForecastScenarioPlanner";
import { AssessmentModal } from "@/components/academy/AssessmentModal";
import { MissionBriefing, SkillUnlockPreview, VisualHybridLayer } from "@/components/academy/StrategicBriefing";
import { EconomicCycleWheel } from "@/components/academy/EconomicCycleWheel";
import { MacroRelationshipEngine } from "@/components/academy/MacroRelationshipEngine";
import { FedSimulator } from "@/components/academy/FedSimulator";
import { NfpInterpreter } from "@/components/academy/NfpInterpreter";
import { GdpCpiInterpreters } from "@/components/academy/GdpCpiInterpreters";
import { YieldCurveVisualizer } from "@/components/academy/YieldCurveVisualizer";
import { IntermarketCorrelationMap } from "@/components/academy/IntermarketCorrelationMap";
import { CompanyDashboard } from "@/components/academy/CompanyDashboard";
import { FinancialRatios } from "@/components/academy/FinancialRatios";
import { DcfSimulator } from "@/components/academy/DcfSimulator";
import { ScenarioBuilder } from "@/components/academy/ScenarioBuilder";
import { MacroRegimeRadar } from "@/components/academy/MacroRegimeRadar";
import { LessonMiniHero } from "@/components/academy/LessonMiniHero";
import { LessonEvaluationGate } from "@/components/academy/LessonEvaluationGate";
import { ScenarioPlayer } from "@/components/academy/ScenarioPlayer";
import { useChapterProgress } from "@/lib/academy/useChapterProgress";
import { assembleScenario } from "@/lib/academy/scenario-engine";
import { getSpecById } from "@/lib/academy/scenario-library";
import { useT } from "@/lib/i18n";
import { useLessons } from "@/lib/academy/useChapterContent";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/academy/analyse-fondamentale")({
  head: () => ({
    meta: [
      { title: "Analyse Fondamentale — TradForge Academy" },
      {
        name: "description",
        content:
          "Chapitre 1 : maîtrisez l'analyse fondamentale dans un laboratoire interactif. Macro, micro, valorisation, prévisions et 10 cas historiques rejouables.",
      },
      { property: "og:title", content: "Analyse Fondamentale — TradForge Academy" },
      {
        property: "og:description",
        content:
          "Voir, manipuler, décider, comprendre les moteurs des marchés. Niveau institutionnel.",
      },
    ],
  }),
  component: Chapter1Page,
});

function SubHead({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Eyebrow className="text-data">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </Eyebrow>
  );
}

/**
 * Top-bar entry point: single, coherent path toward the dedicated
 * certification route (no legacy Standard / High / Premium diagnostic).
 */
function CertificationEntry({ ready, percent }: { ready: boolean; percent: number }) {
  const t = useT();
  return (
    <Link
      to="/academy/analyse-fondamentale/certification"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
        ready
          ? "border-bull/50 bg-bull/10 text-bull hover:bg-bull/20"
          : "border-forge/40 bg-forge/10 text-forge hover:bg-forge/20",
      )}
    >
      <Award className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{t.gate.certificationCta}</span>
      <span className="font-mono tabular-nums">{percent}%</span>
    </Link>
  );
}


function Chapter1Page() {
  const t = useT();
  const c = t.content;
  const LESSONS = useLessons();
  const {
    signedIn,
    profile,
    completed,
    cases,
    progressPercent,
    markSection,
    markCase,
    lessonPasses,
    certifiedLessons,
    certificationPercent,
    certificationReady,
    markLessonPassed,
    dashboard,
  } = useChapterProgress(CHAPTER.id, CASE_STUDIES.length);

  const meta = (id: string) => LESSONS.find((l) => l.id === id)!;
  const renderCase = (caseIndex: number, sectionId: string) => {
    const cs = CASE_STUDIES[caseIndex];
    const spec = getSpecById(`spec-${cs.id}`);
    return (
      <div id={`case-${cs.index}`} className="scroll-mt-24">
        {spec ? (
          <ScenarioPlayer
            scenario={assembleScenario(spec, spec.difficulte, "learning")}
            onComplete={() => {
              markCase(cs.id);
              markSection(sectionId);
            }}
          />
        ) : (
          <Scenario
            title={c.cas.caseTitle(cs.index, cs.title)}
            level={cs.level}
            context={cs.context}
            visual={<CandleReplay caseStudy={cs} />}
            prompt={cs.decision.prompt}
            choices={cs.decision.choices}
            correctId={cs.decision.correctId}
            explanation={cs.decision.explanation}
            outcome={cs.outcome}
            onComplete={() => {
              markCase(cs.id);
              markSection(sectionId);
            }}
          />
        )}
      </div>
    );
  };

  const renderGate = (lessonId: string) => (
    <Reveal>
      <LessonEvaluationGate
        chapterId={CHAPTER.id}
        lesson={meta(lessonId)}
        signedIn={signedIn}
        progressPercent={progressPercent}
        passed={lessonPasses.has(lessonId)}
        onPassed={markLessonPassed}
      />
    </Reveal>
  );



  return (
    <ChapterShell
      completedSections={completed}
      signedIn={signedIn}
      profile={profile}
      lessonPasses={lessonPasses}
      certificationPercent={certificationPercent}
      dashboard={dashboard}
      headerActions={<CertificationEntry ready={certificationReady} percent={certificationPercent} />}
    >

      <Reveal>
        <ChapterHero />
      </Reveal>

      <Reveal delay={80}>
        <MissionBriefing />
      </Reveal>

      <Reveal delay={120}>
        <SkillUnlockPreview completed={completed} />
      </Reveal>

      <Reveal delay={160}>
        <VisualHybridLayer />
      </Reveal>


      {/* 1.1 — Introduction & Définition */}
      <LessonSection {...meta("intro")}>
        <div id="intro-regimes" className="scroll-mt-24">
          <Reveal>
            <SubHead icon={Activity}>{c.intro.regimesHeading}</SubHead>
          </Reveal>
          <Reveal>
            <MacroRegimeRadar />
          </Reveal>
          <Reveal delay={80}>
            <VisualExplainer
              asset={V2_ASSETS.inflationRegimes}
              kicker={c.intro.regimesVisual.kicker}
              title={c.intro.regimesVisual.title}
              lead={c.intro.regimesVisual.lead}
              chain={[
                { ...c.intro.regimesVisual.chain[0], tone: "bear" },
                { ...c.intro.regimesVisual.chain[1], tone: "data" },
                c.intro.regimesVisual.chain[2],
                { ...c.intro.regimesVisual.chain[3], tone: "forge" },
              ]}
              callouts={[
                { ...c.intro.regimesVisual.callouts[0], tone: "data" },
                { ...c.intro.regimesVisual.callouts[1], tone: "forge" },
              ]}
              reading={c.intro.regimesVisual.reading}
            />
          </Reveal>
        </div>

        <div id="intro-concept" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={Scale}>{c.intro.conceptHeading}</SubHead>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {c.intro.conceptBody}
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            <Reveal delay={0}>
              <ConceptCard title={c.intro.cards.priceValueTitle} accent>
                {c.intro.cards.priceValueBody}
              </ConceptCard>
            </Reveal>
            <Reveal delay={80}>
              <ConceptCard title={c.intro.cards.efficiencyTitle}>
                {c.intro.cards.efficiencyBody}
              </ConceptCard>
            </Reveal>
            <Reveal delay={160}>
              <ConceptCard title={c.intro.cards.meanReversionTitle}>
                {c.intro.cards.meanReversionBody}
              </ConceptCard>
            </Reveal>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Reveal>
              <VisualExplainerStacked
                asset={V2_ASSETS.priceValueIceberg}
                kicker={c.intro.icebergVisual.kicker}
                title={c.intro.icebergVisual.title}
                lead={c.intro.icebergVisual.lead}
                chain={[
                  { ...c.intro.icebergVisual.chain[0], tone: "forge" },
                  c.intro.icebergVisual.chain[1],
                  { ...c.intro.icebergVisual.chain[2], tone: "data" },
                  { ...c.intro.icebergVisual.chain[3], tone: "bull" },
                ]}
                reading={c.intro.icebergVisual.reading}
              />
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainerStacked
                asset={V2_ASSETS.realEconomy}
                kicker={c.intro.realEconomyVisual.kicker}
                title={c.intro.realEconomyVisual.title}
                lead={c.intro.realEconomyVisual.lead}
                chain={[
                  { ...c.intro.realEconomyVisual.chain[0], tone: "data" },
                  c.intro.realEconomyVisual.chain[1],
                  { ...c.intro.realEconomyVisual.chain[2], tone: "bull" },
                  { ...c.intro.realEconomyVisual.chain[3], tone: "forge" },
                ]}
                reading={c.intro.realEconomyVisual.reading}
              />
            </Reveal>
          </div>
        </div>

        <div id="intro-illustration" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={TrendingUp}>{c.intro.illustrationHeading}</SubHead>
          </Reveal>
          <Reveal>
            <MarketDriverVisualizer />
          </Reveal>
        </div>

        <div id="intro-scenario" className="scroll-mt-24">
          <Reveal>
            <Scenario
              title={c.intro.scenario.title}
              level={1}
              context={
                <>
                  {c.intro.scenario.context}
                </>
              }
              prompt={c.intro.scenario.prompt}
              choices={[
                { id: "a", label: c.intro.scenario.choices.a },
                { id: "b", label: c.intro.scenario.choices.b },
                { id: "c", label: c.intro.scenario.choices.c },
              ]}
              correctId="a"
              explanation={c.intro.scenario.explanation}
              onComplete={() => markSection("intro")}
            />
          </Reveal>
        </div>

        {renderGate("intro")}
      </LessonSection>

      {/* 1.2 — Macroéconomie */}
      <LessonSection {...meta("macro")}>
        <Reveal>
          <LessonMiniHero lesson={meta("macro")} />
        </Reveal>

        <div id="macro-concept" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={BarChart3}>{c.macro.conceptHeading}</SubHead>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {c.macro.conceptBody}
            </p>
          </Reveal>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(9.5rem,100%),1fr))] gap-3">
            <Reveal delay={0}><KpiTile {...c.macro.kpis.pib} tone="bull" /></Reveal>
            <Reveal delay={40}><KpiTile {...c.macro.kpis.ipc} tone="forge" /></Reveal>
            <Reveal delay={80}><KpiTile {...c.macro.kpis.taux} tone="data" /></Reveal>
            <Reveal delay={120}><KpiTile {...c.macro.kpis.nfp} tone="bull" /></Reveal>
            <Reveal delay={160}><KpiTile {...c.macro.kpis.balance} /></Reveal>
            <Reveal delay={200}><KpiTile {...c.macro.kpis.pmi} tone="data" /></Reveal>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Reveal>
              <VisualExplainerStacked
                asset={v1Asset(
                  "a1",
                  c.macro.ecosystemVisual.altPrimary,
                  c.macro.ecosystemVisual.altSecondary,
                  { lesson: "macro", section: "macro-concept" },
                )}
                kicker={c.macro.ecosystemVisual.kicker}
                title={c.macro.ecosystemVisual.title}
                lead={c.macro.ecosystemVisual.lead}
                chain={[
                  { ...c.macro.ecosystemVisual.chain[0], tone: "bull" },
                  c.macro.ecosystemVisual.chain[1],
                  { ...c.macro.ecosystemVisual.chain[2], tone: "forge" },
                  { ...c.macro.ecosystemVisual.chain[3], tone: "data" },
                ]}
                reading={c.macro.ecosystemVisual.reading}
              />
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainerStacked
                asset={v1Asset(
                  "a2",
                  c.macro.hierarchyVisual.altPrimary,
                  c.macro.hierarchyVisual.altSecondary,
                  { lesson: "macro", section: "macro-concept" },
                )}
                kicker={c.macro.hierarchyVisual.kicker}
                title={c.macro.hierarchyVisual.title}
                lead={c.macro.hierarchyVisual.lead}
                chain={[
                  { ...c.macro.hierarchyVisual.chain[0], tone: "data" },
                  c.macro.hierarchyVisual.chain[1],
                  { ...c.macro.hierarchyVisual.chain[2], tone: "forge" },
                ]}
                reading={c.macro.hierarchyVisual.reading}
              />
            </Reveal>
          </div>

          <Reveal>
            <VisualExplainer
              asset={V2_ASSETS.productionChain}
              kicker={c.macro.productionChainVisual.kicker}
              title={c.macro.productionChainVisual.title}
              lead={c.macro.productionChainVisual.lead}
              chain={[
                { ...c.macro.productionChainVisual.chain[0], tone: "data" },
                { ...c.macro.productionChainVisual.chain[1], tone: "bull" },
                c.macro.productionChainVisual.chain[2],
                { ...c.macro.productionChainVisual.chain[3], tone: "forge" },
              ]}
              callouts={[
                { ...c.macro.productionChainVisual.callouts[0], tone: "data" },
                { ...c.macro.productionChainVisual.callouts[1], tone: "forge" },
              ]}
              reading={c.macro.productionChainVisual.reading}
            />
          </Reveal>
        </div>

        <div id="macro-dashboard" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={BarChart3}>{c.macro.dashboardHeading}</SubHead>
          </Reveal>
          <Reveal>
            <MacroDashboard />
          </Reveal>
        </div>

        <div id="macro-widgets" className="relative scroll-mt-24 space-y-6 overflow-hidden rounded-3xl">
          <VisualLayer src={BACKGROUNDS.macro} alt="" variant="background" opacity={0.12} position="center top" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <VisualExplainer
                asset={V2_ASSETS.cycleWheel}
                kicker={c.macro.cycleWheelVisual.kicker}
                title={c.macro.cycleWheelVisual.title}
                lead={c.macro.cycleWheelVisual.lead}
                chain={[
                  { ...c.macro.cycleWheelVisual.chain[0], tone: "bull" },
                  { ...c.macro.cycleWheelVisual.chain[1], tone: "forge" },
                  { ...c.macro.cycleWheelVisual.chain[2], tone: "bear" },
                  { ...c.macro.cycleWheelVisual.chain[3], tone: "data" },
                ]}
                reading={c.macro.cycleWheelVisual.reading}
              />
            </Reveal>
            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><EconomicCycleWheel /></Reveal>
              <Reveal delay={80}><MacroRelationshipEngine /></Reveal>
            </div>

            <Reveal>
              <VisualExplainer
                asset={V2_ASSETS.centralBank}
                reverse
                kicker={c.macro.centralBankVisual.kicker}
                title={c.macro.centralBankVisual.title}
                lead={c.macro.centralBankVisual.lead}
                chain={[
                  { ...c.macro.centralBankVisual.chain[0], tone: "forge" },
                  { ...c.macro.centralBankVisual.chain[1], tone: "data" },
                  c.macro.centralBankVisual.chain[2],
                  { ...c.macro.centralBankVisual.chain[3], tone: "bull" },
                ]}
                callouts={[{ ...c.macro.centralBankVisual.callouts[0], tone: "data" }]}
                reading={c.macro.centralBankVisual.reading}
              />
            </Reveal>
            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><FedSimulator /></Reveal>
              <Reveal delay={80}><NfpInterpreter /></Reveal>
            </div>

            <Reveal>
              <VisualExplainer
                asset={V2_ASSETS.nfpRelease}
                kicker={c.macro.nfpVisual.kicker}
                title={c.macro.nfpVisual.title}
                lead={c.macro.nfpVisual.lead}
                chain={[
                  { ...c.macro.nfpVisual.chain[0], tone: "bull" },
                  { ...c.macro.nfpVisual.chain[1], tone: "forge" },
                  { ...c.macro.nfpVisual.chain[2], tone: "data" },
                  c.macro.nfpVisual.chain[3],
                ]}
                reading={c.macro.nfpVisual.reading}
              />
            </Reveal>
            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><GdpCpiInterpreters /></Reveal>
              <Reveal delay={80}><YieldCurveVisualizer /></Reveal>
            </div>

            <Reveal>
              <VisualExplainer
                asset={V2_ASSETS.cpiDrivers}
                reverse
                kicker={c.macro.cpiDriversVisual.kicker}
                title={c.macro.cpiDriversVisual.title}
                lead={c.macro.cpiDriversVisual.lead}
                chain={[
                  { ...c.macro.cpiDriversVisual.chain[0], tone: "forge" },
                  { ...c.macro.cpiDriversVisual.chain[1], tone: "bull" },
                  c.macro.cpiDriversVisual.chain[2],
                  { ...c.macro.cpiDriversVisual.chain[3], tone: "data" },
                ]}
                reading={c.macro.cpiDriversVisual.reading}
              />
            </Reveal>

            <Reveal>
              <VisualExplainer
                asset={V2_ASSETS.commoditiesFx}
                kicker={c.macro.commoditiesFxVisual.kicker}
                title={c.macro.commoditiesFxVisual.title}
                lead={c.macro.commoditiesFxVisual.lead}
                chain={[
                  { ...c.macro.commoditiesFxVisual.chain[0], tone: "forge" },
                  c.macro.commoditiesFxVisual.chain[1],
                  { ...c.macro.commoditiesFxVisual.chain[2], tone: "data" },
                  { ...c.macro.commoditiesFxVisual.chain[3], tone: "bull" },
                ]}
                reading={c.macro.commoditiesFxVisual.reading}
              />
            </Reveal>
            <Reveal>
              <IntermarketCorrelationMap />
            </Reveal>
          </div>
        </div>

        <div id="macro-lab" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={BarChart3}>{c.macro.labHeading}</SubHead>
          </Reveal>
          <Reveal>
            <VisualExplainer
              asset={V2_ASSETS.tradeFlows}
              kicker={c.macro.tradeFlowsVisual.kicker}
              title={c.macro.tradeFlowsVisual.title}
              lead={c.macro.tradeFlowsVisual.lead}
              chain={[
                { ...c.macro.tradeFlowsVisual.chain[0], tone: "bull" },
                c.macro.tradeFlowsVisual.chain[1],
                { ...c.macro.tradeFlowsVisual.chain[2], tone: "data" },
                { ...c.macro.tradeFlowsVisual.chain[3], tone: "forge" },
              ]}
              callouts={[
                { ...c.macro.tradeFlowsVisual.callouts[0], tone: "bull" },
                { ...c.macro.tradeFlowsVisual.callouts[1], tone: "bear" },
              ]}
              reading={c.macro.tradeFlowsVisual.reading}
            />
          </Reveal>
          <Reveal>
            <MacroIndicatorLab />
          </Reveal>
        </div>

        <div id="macro-cas" className="scroll-mt-24 space-y-6">
          <Reveal>
            {renderCase(0, "macro")}
          </Reveal>
          <Reveal delay={80}>
            {renderCase(1, "macro")}
          </Reveal>
          <Reveal delay={120}>
            {renderCase(2, "macro")}
          </Reveal>
        </div>

        {renderGate("macro")}
      </LessonSection>

      {/* 1.3 — Microéconomie */}
      <LessonSection {...meta("micro")}>
        <Reveal>
          <LessonMiniHero lesson={meta("micro")} />
        </Reveal>

        <div id="micro-concept" className="relative scroll-mt-24 space-y-6 overflow-hidden rounded-3xl">
          <VisualLayer src={BACKGROUNDS.micro} alt="" variant="background" opacity={0.1} position="center" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <SubHead icon={BarChart3}>{c.micro.conceptHeading}</SubHead>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {c.micro.conceptBody}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainer
                asset={v1Asset(
                  "a6",
                  c.micro.anatomyVisual.altPrimary,
                  c.micro.anatomyVisual.altSecondary,
                  { lesson: "micro", section: "micro-concept" },
                )}
                kicker={c.micro.anatomyVisual.kicker}
                title={c.micro.anatomyVisual.title}
                lead={c.micro.anatomyVisual.lead}
                chain={[
                  { ...c.micro.anatomyVisual.chain[0], tone: "bull" },
                  { ...c.micro.anatomyVisual.chain[1], tone: "data" },
                  { ...c.micro.anatomyVisual.chain[2], tone: "forge" },
                ]}
                callouts={[
                  { ...c.micro.anatomyVisual.callouts[0], tone: "bull" },
                  { ...c.micro.anatomyVisual.callouts[1], tone: "bear" },
                ]}
                reading={c.micro.anatomyVisual.reading}
              />
            </Reveal>
          </div>
        </div>

        <div id="micro-widgets" className="relative scroll-mt-24 overflow-hidden rounded-3xl">
          <VisualLayer src={v1Asset("a8", "", "").src} alt="" variant="background" opacity={0.12} position="center" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <SubHead icon={Calculator}>{c.micro.widgetsHeading}</SubHead>
            </Reveal>
            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><CompanyHealthScore /></Reveal>
              <Reveal delay={80}><BalanceSheetExplorer /></Reveal>
            </div>
            <Reveal>
              <CompanyDashboard />
            </Reveal>
          </div>
        </div>

        <div id="micro-cas" className="scroll-mt-24 space-y-6">
          <Reveal>
            {renderCase(3, "micro")}
          </Reveal>
          <Reveal delay={80}>
            {renderCase(4, "micro")}
          </Reveal>
        </div>

        {renderGate("micro")}
      </LessonSection>

      {/* 1.4 — Outils d'analyse */}
      <LessonSection {...meta("outils")}>
        <Reveal>
          <LessonMiniHero lesson={meta("outils")} />
        </Reveal>

        <div id="outils-concept" className="relative scroll-mt-24 space-y-6 overflow-hidden rounded-3xl">
          <VisualLayer src={BACKGROUNDS.outils} alt="" variant="background" opacity={0.1} position="center" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <SubHead icon={Calculator}>{c.outils.conceptHeading}</SubHead>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {c.outils.conceptBody}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainer
                asset={V2_ASSETS.capitalMachine}
                reverse
                kicker={c.outils.capitalMachineVisual.kicker}
                title={c.outils.capitalMachineVisual.title}
                lead={c.outils.capitalMachineVisual.lead}
                chain={[
                  { ...c.outils.capitalMachineVisual.chain[0], tone: "data" },
                  c.outils.capitalMachineVisual.chain[1],
                  c.outils.capitalMachineVisual.chain[2],
                  { ...c.outils.capitalMachineVisual.chain[3], tone: "forge" },
                ]}
                callouts={[
                  { ...c.outils.capitalMachineVisual.callouts[0], tone: "data" },
                  { ...c.outils.capitalMachineVisual.callouts[1], tone: "forge" },
                ]}
                reading={c.outils.capitalMachineVisual.reading}
              />
            </Reveal>
          </div>
        </div>

        <div id="outils-widgets" className="relative scroll-mt-24 overflow-hidden rounded-3xl">
          <VisualLayer src={v1Asset("a12", "", "").src} alt="" variant="background" opacity={0.12} position="center" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <SubHead icon={Calculator}>{c.outils.widgetsHeading}</SubHead>
            </Reveal>
            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><ValuationLab /></Reveal>
              <Reveal delay={80}><PeerComparisonMatrix /></Reveal>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><FinancialRatios /></Reveal>
              <Reveal delay={80}><DcfSimulator /></Reveal>
            </div>
            <Reveal><EarningsImpactEngine /></Reveal>
          </div>
        </div>

        <div id="outils-cas" className="scroll-mt-24 space-y-6">
          <Reveal>
            {renderCase(5, "outils")}
          </Reveal>
          <Reveal delay={80}>
            {renderCase(6, "outils")}
          </Reveal>
          <Reveal delay={120}>
            {renderCase(7, "outils")}
          </Reveal>
        </div>

        {renderGate("outils")}
      </LessonSection>

      {/* 1.5 — Prévisions */}
      <LessonSection {...meta("previsions")}>
        <Reveal>
          <LessonMiniHero lesson={meta("previsions")} />
        </Reveal>

        <div id="previsions-concept" className="relative scroll-mt-24 space-y-6 overflow-hidden rounded-3xl">
          <VisualLayer src={BACKGROUNDS.previsions} alt="" variant="background" opacity={0.1} position="center" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <SubHead icon={LineChart}>{c.previsions.conceptHeading}</SubHead>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {c.previsions.conceptBody}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainer
                asset={V2_ASSETS.energyChain}
                kicker={c.previsions.energyChainVisual.kicker}
                title={c.previsions.energyChainVisual.title}
                lead={c.previsions.energyChainVisual.lead}
                chain={[
                  { ...c.previsions.energyChainVisual.chain[0], tone: "bear" },
                  c.previsions.energyChainVisual.chain[1],
                  { ...c.previsions.energyChainVisual.chain[2], tone: "forge" },
                  { ...c.previsions.energyChainVisual.chain[3], tone: "data" },
                  { ...c.previsions.energyChainVisual.chain[4], tone: "bear" },
                ]}
                callouts={[
                  { ...c.previsions.energyChainVisual.callouts[0], tone: "data" },
                  { ...c.previsions.energyChainVisual.callouts[1], tone: "forge" },
                ]}
                reading={c.previsions.energyChainVisual.reading}
              />
            </Reveal>
          </div>
        </div>

        <div id="previsions-planner" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={LineChart}>{c.previsions.plannerHeading}</SubHead>
          </Reveal>
          <Reveal><ForecastScenarioPlanner /></Reveal>
          <Reveal>
            <ScenarioBuilder />
          </Reveal>
        </div>

        <div id="previsions-cas" className="scroll-mt-24 space-y-6">
          <Reveal>
            {renderCase(8, "previsions")}
          </Reveal>
          <Reveal delay={80}>
            {renderCase(9, "previsions")}
          </Reveal>
        </div>

        {renderGate("previsions")}
      </LessonSection>

      {/* 1.6 — Cas pratiques */}
      <LessonSection {...meta("cas-pratiques")}>
        <Reveal>
          <SubHead icon={History}>{c.cas.capstoneHeading}</SubHead>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {c.cas.capstoneBody}
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {c.cas.analyzedCount(cases.size)}
          </p>
        </Reveal>

        <div id="cas-pratiques-index" className="scroll-mt-24 space-y-6">
          {([
            { lesson: c.cas.groups.macro, anchor: "macro", from: 1, to: 3 },
            { lesson: c.cas.groups.micro, anchor: "micro", from: 4, to: 5 },
            { lesson: c.cas.groups.outils, anchor: "outils", from: 6, to: 8 },
            { lesson: c.cas.groups.previsions, anchor: "previsions", from: 9, to: 10 },
          ] as const).map((group) => {
            const groupCases = CASE_STUDIES.filter((cs) => cs.index >= group.from && cs.index <= group.to);
            return (
              <div key={group.anchor}>
                <div className="mb-2 flex items-center gap-2">
                  <a href={`#${group.anchor}`} className="font-mono text-[11px] uppercase tracking-wider text-forge hover:underline">
                    {group.lesson}
                  </a>
                  <span className="font-mono text-[10px] text-muted-foreground/70">
                    {c.cas.casesRange(group.from, group.to)}
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {groupCases.map((cs) => (
                    <a key={cs.id} href={`#case-${cs.index}`} className="premium-hover rounded-xl border bg-surface p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-data">{c.cas.caseIndexLabel(cs.index)}</div>
                        <span className="rounded-full border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">{c.cas.levelLabel(cs.level)}</span>
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-tight text-foreground">{cs.title}</div>
                      <div className="mt-2 text-xs text-muted-foreground">{cs.instrument} · {cs.period}</div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </LessonSection>

      {/* Certification finale — V7 : débloquée à 100 % (5 leçons validées) */}
      <Reveal>
        <CompletionPanel
          chapterId={CHAPTER.id}
          signedIn={signedIn}
          certifiedLessons={certifiedLessons}
          certificationPercent={certificationPercent}
          certificationReady={certificationReady}
          cases={cases.size}
        />
      </Reveal>
    </ChapterShell>
  );
}

function CompletionPanel({
  chapterId,
  signedIn,
  certifiedLessons,
  certificationPercent,
  certificationReady,
  cases,
}: {
  chapterId: string;
  signedIn: boolean;
  certifiedLessons: number;
  certificationPercent: number;
  certificationReady: boolean;
  cases: number;
}) {
  const t = useT();
  const total = 5;
  return (
    <section className="mt-8 overflow-hidden rounded-3xl border bg-gradient-hero p-8 text-center">
      <div className="mx-auto flex max-w-lg flex-col items-center">
        {certificationReady ? (
          <Award className="h-10 w-10 text-forge" />
        ) : (
          <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
        )}
        <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
          {certificationReady ? t.content.completion.titleReady : t.content.completion.titleLocked}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {certificationReady
            ? t.content.completion.bodyReady
            : t.content.completion.bodyLocked(certifiedLessons, total, cases)}
        </p>
        <div className="mt-5 h-2 w-full max-w-sm overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-gradient-forge transition-all duration-700"
            style={{ width: `${certificationPercent}%` }}
          />
        </div>
        <div className="mt-6">
          {certificationReady ? (
            <Link
              to="/academy/analyse-fondamentale/certification"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-forge px-5 py-3 text-sm font-semibold text-forge-foreground shadow-glow transition-opacity hover:opacity-95"
            >
              {t.content.completion.cta}
              <Award className="h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <Lock className="h-4 w-4" /> {t.content.completion.lockedCta(certificationPercent)}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
