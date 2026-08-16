import { Link, createFileRoute } from "@tanstack/react-router";
import { Scale, TrendingUp, BarChart3, Calculator, LineChart, History, CheckCircle2, Award, Activity, Lock } from "lucide-react";
import { CHAPTER, LESSONS } from "@/lib/academy/chapter1";
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

function Chapter1Page() {
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
            title={`Cas ${cs.index} — ${cs.title}`}
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
      headerActions={<AssessmentModal chapterId={CHAPTER.id} signedIn={signedIn} progressPercent={progressPercent} />}
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
            <SubHead icon={Activity}>Les 4 régimes macro — Vue radar</SubHead>
          </Reveal>
          <Reveal>
            <MacroRegimeRadar />
          </Reveal>
          <Reveal delay={80}>
            <VisualExplainer
              asset={V2_ASSETS.inflationRegimes}
              kicker="1.1 · Mémoire des régimes"
              title="Cinquante ans de régimes d'inflation"
              lead="Chaque régime impose sa hiérarchie d'actifs. Lire le régime avant de lire la donnée : c'est l'ordre institutionnel."
              chain={[
                { label: "Choc d'offre", detail: "1973 · 1979", tone: "bear" },
                { label: "Désinflation", detail: "Volcker", tone: "data" },
                { label: "Grande modération", detail: "1990 → 2007" },
                { label: "Retour inflation", detail: "2021 →", tone: "forge" },
              ]}
              callouts={[
                { label: "Variable pivot", value: "Taux réels", tone: "data" },
                { label: "Réponse", value: "Politique monétaire", tone: "forge" },
              ]}
              reading="Un même chiffre d'IPC n'a pas la même conséquence selon le régime : le marché price la réaction attendue de la banque centrale, pas la donnée brute."
            />
          </Reveal>
        </div>

        <div id="intro-concept" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={Scale}>Concept</SubHead>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              L'analyse fondamentale est la pierre angulaire de l'évaluation des actifs financiers. Elle consiste à
              déterminer la <strong className="text-foreground">valeur intrinsèque</strong> — la « juste valeur » — d'un
              actif en examinant l'ensemble des facteurs économiques, financiers et qualitatifs qui l'influencent.
              Contrairement à l'analyse technique, centrée sur les prix et volumes, elle s'intéresse aux{" "}
              <strong className="text-foreground">causes sous-jacentes</strong> des mouvements de marché.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            <Reveal delay={0}>
              <ConceptCard title="Valeur intrinsèque vs prix" accent>
                Le prix de marché peut différer de la valeur réelle. L'objectif est d'exploiter ces{" "}
                <strong>divergences</strong>.
              </ConceptCard>
            </Reveal>
            <Reveal delay={80}>
              <ConceptCard title="Efficience imparfaite">
                Les marchés ne sont pas toujours efficients : des opportunités existent quand les prix n'intègrent pas
                toute l'information.
              </ConceptCard>
            </Reveal>
            <Reveal delay={160}>
              <ConceptCard title="Retour à la moyenne">
                À long terme, le prix tend à <strong>converger</strong> vers la valeur intrinsèque de l'actif.
              </ConceptCard>
            </Reveal>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Reveal>
              <VisualExplainerStacked
                asset={V2_ASSETS.priceValueIceberg}
                kicker="Principe fondateur"
                title="Le prix est visible, la valeur est immergée"
                lead="Le marché cote en permanence un prix ; la valeur intrinsèque, elle, se déduit des fondamentaux."
                chain={[
                  { label: "Prix", detail: "cotation", tone: "forge" },
                  { label: "Sentiment", detail: "flux, narratif" },
                  { label: "Fondamentaux", detail: "comptes, macro", tone: "data" },
                  { label: "Valeur", detail: "juste valeur", tone: "bull" },
                ]}
                reading="L'écart prix / valeur est l'espace de l'opportunité : il se mesure, il ne se devine pas."
              />
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainerStacked
                asset={V2_ASSETS.realEconomy}
                kicker="Chaîne de valeur"
                title="De l'économie réelle au prix de marché"
                lead="Production, emploi et revenus alimentent les bénéfices, qui alimentent les valorisations."
                chain={[
                  { label: "Production", tone: "data" },
                  { label: "Revenus" },
                  { label: "Bénéfices", tone: "bull" },
                  { label: "Valorisation", tone: "forge" },
                ]}
                reading="Toute thèse fondamentale doit pouvoir se raccrocher à un maillon réel de cette chaîne."
              />
            </Reveal>
          </div>
        </div>

        <div id="intro-illustration" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={TrendingUp}>Illustration interactive</SubHead>
          </Reveal>
          <Reveal>
            <MarketDriverVisualizer />
          </Reveal>
        </div>

        <div id="intro-scenario" className="scroll-mt-24">
          <Reveal>
            <Scenario
              title="Scénario #1 — Pourquoi le prix bouge"
              level={1}
              context={
                <>
                  Une devise se négocie nettement <strong className="text-foreground">sous</strong> ce que ses
                  fondamentaux justifient : croissance solide, comptes publics sains, taux attractifs. Le marché reste
                  pessimiste à court terme à cause d'un titre de presse anxiogène.
                </>
              }
              prompt="Selon le principe de retour à la moyenne, quelle est l'hypothèse de travail la plus cohérente ?"
              choices={[
                { id: "a", label: "Le prix devrait tendre à se rapprocher de la valeur intrinsèque dans le temps" },
                { id: "b", label: "Le prix s'éloignera toujours davantage de sa valeur" },
                { id: "c", label: "La valeur intrinsèque n'a aucune importance" },
              ]}
              correctId="a"
              explanation="L'analyse fondamentale parie qu'à long terme le prix converge vers la valeur intrinsèque. Une sous-évaluation soutenue par des fondamentaux solides est une opportunité potentielle."
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
            <SubHead icon={BarChart3}>Concept</SubHead>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Les indicateurs macroéconomiques reflètent la santé d'une économie et guident les flux de capitaux. On les
              classe par <strong className="text-foreground">nature</strong> (croissance, inflation, politique monétaire)
              et par <strong className="text-foreground">temporalité</strong> (avancés, coïncidents, retardés). Lire la{" "}
              <strong className="text-foreground">surprise</strong> par rapport au consensus est souvent plus important
              que la donnée brute.
            </p>
          </Reveal>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(9.5rem,100%),1fr))] gap-3">
            <Reveal delay={0}><KpiTile label="PIB" value="croissance" hint="activité globale" tone="bull" /></Reveal>
            <Reveal delay={40}><KpiTile label="IPC" value="inflation" hint="prix & taux" tone="forge" /></Reveal>
            <Reveal delay={80}><KpiTile label="Taux" value="directeurs" hint="coût du capital" tone="data" /></Reveal>
            <Reveal delay={120}><KpiTile label="NFP" value="emploi" hint="marché du travail" tone="bull" /></Reveal>
            <Reveal delay={160}><KpiTile label="Balance" value="commerce" hint="export − import" /></Reveal>
            <Reveal delay={200}><KpiTile label="PMI" value="confiance" hint="indicateur avancé" tone="data" /></Reveal>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Reveal>
              <VisualExplainerStacked
                asset={v1Asset(
                  "a1",
                  "Écosystème macroéconomique",
                  "L'écosystème macroéconomique — comment les indicateurs clés pilotent l'économie",
                  { lesson: "macro", section: "macro-concept" },
                )}
                kicker="1.2 · Figure 1"
                title="L'écosystème macroéconomique"
                lead="PIB, inflation, emploi, balance commerciale et taux forment un système bouclé : aucun indicateur ne se lit isolément."
                chain={[
                  { label: "Emploi", tone: "bull" },
                  { label: "Demande" },
                  { label: "Inflation", tone: "forge" },
                  { label: "Taux", tone: "data" },
                ]}
                reading="Le marché arbitre la boucle complète, pas le point de donnée."
              />
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainerStacked
                asset={v1Asset(
                  "a2",
                  "Hiérarchie du signal",
                  "La hiérarchie de l'intelligence — du signal à l'impact (indicateurs avancés, coïncidents, retardés)",
                  { lesson: "macro", section: "macro-concept" },
                )}
                kicker="1.2 · Figure 2"
                title="Avancés, coïncidents, retardés"
                lead="La temporalité d'un indicateur détermine sa valeur décisionnelle : l'avancé anticipe, le retardé confirme."
                chain={[
                  { label: "Avancés", detail: "PMI, permis", tone: "data" },
                  { label: "Coïncidents", detail: "PIB, ventes" },
                  { label: "Retardés", detail: "chômage, IPC core", tone: "forge" },
                ]}
                reading="Se positionner sur un retardé, c'est acheter une information déjà price-ée."
              />
            </Reveal>
          </div>

          <Reveal>
            <VisualExplainer
              asset={V2_ASSETS.productionChain}
              kicker="Transmission"
              title="Production → croissance → capitaux → devise"
              lead="La chaîne de transmission qui relie l'activité industrielle à la valorisation d'une devise."
              chain={[
                { label: "Production", tone: "data" },
                { label: "Croissance", tone: "bull" },
                { label: "Flux de capitaux" },
                { label: "Devise", tone: "forge" },
              ]}
              callouts={[
                { label: "Signal amont", value: "PMI manufacturier", tone: "data" },
                { label: "Signal aval", value: "Taux de change", tone: "forge" },
              ]}
              reading="Un choc de production ne se lit sur la devise qu'après avoir traversé la croissance et les flux : d'où le décalage temporel observé."
            />
          </Reveal>
        </div>

        <div id="macro-dashboard" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={BarChart3}>Command center — 11 indicateurs clés</SubHead>
          </Reveal>
          <Reveal>
            <MacroDashboard />
          </Reveal>
        </div>

        <div id="macro-widgets" className="relative scroll-mt-24 space-y-6 overflow-hidden rounded-3xl">
          <VisualLayer src="/academy/ch1/visuals/a4.webp" alt="" variant="background" opacity={0.14} position="center top" />
          <div className="relative space-y-6 p-px">
            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><EconomicCycleWheel /></Reveal>
              <Reveal delay={80}><MacroRelationshipEngine /></Reveal>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><FedSimulator /></Reveal>
              <Reveal delay={80}><NfpInterpreter /></Reveal>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Reveal><GdpCpiInterpreters /></Reveal>
              <Reveal delay={80}><YieldCurveVisualizer /></Reveal>
            </div>

            <Reveal>
              <IntermarketCorrelationMap />
            </Reveal>
          </div>
        </div>

        <div id="macro-lab" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={BarChart3}>Laboratoire interactif — simulez une surprise</SubHead>
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
              <SubHead icon={BarChart3}>Concept</SubHead>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Au niveau de l'entreprise, l'analyse repose sur les{" "}
                <strong className="text-foreground">états financiers</strong> : compte de résultat (revenus, marges,
                bénéfice), bilan (actif = passif + capitaux propres) et tableau des flux de trésorerie. On y mesure la{" "}
                <strong className="text-foreground">croissance</strong>, la <strong className="text-foreground">rentabilité</strong>{" "}
                (ROE, ROA, marges), l'<strong className="text-foreground">endettement</strong> (D/E) et la génération de{" "}
                <strong className="text-foreground">cash-flow</strong>.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainer
                asset={v1Asset(
                  "a6",
                  "Anatomie financière d'une entreprise",
                  "Vue d'ensemble des états financiers : compte de résultat, bilan et flux de trésorerie",
                  { lesson: "micro", section: "micro-concept" },
                )}
                kicker="1.3 · Anatomie"
                title="Les trois états financiers, un seul récit"
                lead="Résultat, bilan et cash-flow racontent la même entreprise sous trois angles : performance, structure, liquidité."
                chain={[
                  { label: "Résultat", detail: "revenus, marges", tone: "bull" },
                  { label: "Bilan", detail: "actif = passif + CP", tone: "data" },
                  { label: "Cash-flow", detail: "trésorerie réelle", tone: "forge" },
                ]}
                callouts={[
                  { label: "Rentabilité", value: "ROE / ROA", tone: "bull" },
                  { label: "Solidité", value: "D/E", tone: "bear" },
                ]}
                reading="Un bénéfice sans cash-flow associé est un signal d'alerte : la trésorerie ne se manipule pas aussi facilement qu'un résultat comptable."
              />
            </Reveal>
          </div>
        </div>

        <div id="micro-widgets" className="relative scroll-mt-24 overflow-hidden rounded-3xl">
          <VisualLayer src="/academy/ch1/visuals/a8.webp" alt="" variant="background" opacity={0.12} position="center" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <SubHead icon={Calculator}>Widgets — pilotez les fondamentaux</SubHead>
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
              <SubHead icon={Calculator}>Concept</SubHead>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Pour transformer les données en décision, on s'appuie sur des outils : les{" "}
                <strong className="text-foreground">ratios</strong> (P/E, P/B, D/E, ROE), le modèle{" "}
                <strong className="text-foreground">DCF</strong> (actualisation des flux), l'analyse{" "}
                <strong className="text-foreground">sectorielle</strong>, la comparaison entre pairs (
                <strong className="text-foreground">peer comparison</strong>) et l'analyse{" "}
                <strong className="text-foreground">SWOT</strong>. Aucun multiple ne se lit seul : il se compare à la
                croissance, au secteur et à l'historique.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainer
                asset={V2_ASSETS.capitalMachine}
                reverse
                kicker="1.4 · Machine d'allocation"
                title="Des entrées macro aux sorties de marché"
                lead="Les outils d'analyse sont la mécanique qui convertit une lecture macro en allocation explicite."
                chain={[
                  { label: "Entrées", detail: "macro, comptes", tone: "data" },
                  { label: "Modèles", detail: "ratios, DCF" },
                  { label: "Arbitrage", detail: "pairs, secteur" },
                  { label: "Allocation", detail: "FX, taux, actions", tone: "forge" },
                ]}
                callouts={[
                  { label: "Multiple", value: "P/E vs croissance", tone: "data" },
                  { label: "Actualisation", value: "WACC & terminal", tone: "forge" },
                ]}
                reading="Un modèle n'est jamais une vérité : c'est un cadre d'hypothèses dont chaque paramètre doit être défendable."
              />
            </Reveal>
          </div>
        </div>

        <div id="outils-widgets" className="relative scroll-mt-24 overflow-hidden rounded-3xl">
          <VisualLayer src="/academy/ch1/visuals/a12.webp" alt="" variant="background" opacity={0.12} position="center" />
          <div className="relative space-y-6 p-px">
            <Reveal>
              <SubHead icon={Calculator}>Boîte à outils interactive</SubHead>
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
              <SubHead icon={LineChart}>Concept</SubHead>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                Prévoir consiste à projeter l'avenir à partir des{" "}
                <strong className="text-foreground">tendances historiques</strong>, de{" "}
                <strong className="text-foreground">scénarios</strong> (optimiste, neutre, pessimiste) et de la{" "}
                <strong className="text-foreground">guidance</strong> communiquée par les entreprises. La guidance pèse
                souvent plus que le dernier résultat publié : elle oriente les anticipations du marché.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <VisualExplainer
                asset={V2_ASSETS.energyChain}
                kicker="1.5 · Chaîne de prévision"
                title="Anatomie d'un choc : de l'énergie au repricing de l'euro"
                lead="Une prévision institutionnelle n'est pas une opinion : c'est une chaîne causale datée, avec ses points de rupture."
                chain={[
                  { label: "Choc d'offre", detail: "gaz, pétrole", tone: "bear" },
                  { label: "Coûts", detail: "production" },
                  { label: "Inflation", detail: "IPC, core", tone: "forge" },
                  { label: "Réponse BCE", detail: "taux", tone: "data" },
                  { label: "Croissance / EUR", detail: "repricing", tone: "bear" },
                ]}
                callouts={[
                  { label: "Horizon", value: "3 → 12 mois", tone: "data" },
                  { label: "Point de rupture", value: "Taux réels > 0", tone: "forge" },
                ]}
                reading="Chaque maillon est falsifiable : si les coûts refluent avant la réponse monétaire, le scénario devient caduc et se révise."
              />
            </Reveal>
          </div>
        </div>

        <div id="previsions-planner" className="scroll-mt-24 space-y-6">
          <Reveal>
            <SubHead icon={LineChart}>Planificateur de scénarios</SubHead>
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
          <SubHead icon={History}>Capstone — Appliquer l'analyse fondamentale</SubHead>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Dix moments de marché réels, rejouables bougie par bougie. Pour chacun : lisez le contexte, prenez votre
            décision <em>avant</em> la révélation, puis comparez avec ce qui s'est réellement passé. La difficulté
            monte progressivement.
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {cases.size}/10 cas analysés
          </p>
        </Reveal>

        <div id="cas-pratiques-index" className="scroll-mt-24 space-y-6">
          {([
            { lesson: "1.2 · Macroéconomie", anchor: "macro", from: 1, to: 3 },
            { lesson: "1.3 · Microéconomie", anchor: "micro", from: 4, to: 5 },
            { lesson: "1.4 · Outils d'analyse", anchor: "outils", from: 6, to: 8 },
            { lesson: "1.5 · Prévisions", anchor: "previsions", from: 9, to: 10 },
          ] as const).map((group) => {
            const groupCases = CASE_STUDIES.filter((cs) => cs.index >= group.from && cs.index <= group.to);
            return (
              <div key={group.anchor}>
                <div className="mb-2 flex items-center gap-2">
                  <a href={`#${group.anchor}`} className="font-mono text-[11px] uppercase tracking-wider text-forge hover:underline">
                    {group.lesson}
                  </a>
                  <span className="font-mono text-[10px] text-muted-foreground/70">
                    Cas {group.from}–{group.to}
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {groupCases.map((cs) => (
                    <a key={cs.id} href={`#case-${cs.index}`} className="premium-hover rounded-xl border bg-surface p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-data">Cas {cs.index}</div>
                        <span className="rounded-full border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">Niv. {cs.level}</span>
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
          {certificationReady ? "Certification finale débloquée" : "Progressez vers la certification"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {certificationReady
            ? "Les 5 leçons sont validées (≥ 70 %). Lancez la certification finale : 3 niveaux × 10 scénarios institutionnels."
            : `Chaque leçon vaut 20 %, créditée seulement quand son évaluation est réussie. ${certifiedLessons}/${total} leçons validées · ${cases}/10 cas rejoués.`}
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
              Passer la Certification Finale
              <Award className="h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <Lock className="h-4 w-4" /> Certification verrouillée — {certificationPercent}%
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

