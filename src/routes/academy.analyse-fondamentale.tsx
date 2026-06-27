import { createFileRoute } from "@tanstack/react-router";
import { Scale, TrendingUp, BarChart3, Calculator, LineChart, History, CheckCircle2, Award } from "lucide-react";
import { CHAPTER, LESSONS } from "@/lib/academy/chapter1";
import { CASE_STUDIES } from "@/lib/academy/market-data";
import { ChapterShell } from "@/components/academy/ChapterShell";
import { ChapterHero } from "@/components/academy/ChapterHero";
import { LessonSection } from "@/components/academy/LessonSection";
import { ConceptCard, KpiTile, Reveal, Eyebrow } from "@/components/academy/primitives";
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
import { useChapterProgress } from "@/lib/academy/useChapterProgress";

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
  } = useChapterProgress(CHAPTER.id, CASE_STUDIES.length);

  const meta = (id: string) => LESSONS.find((l) => l.id === id)!;

  return (
    <ChapterShell
      completedSections={completed}
      signedIn={signedIn}
      profile={profile}
      headerActions={<AssessmentModal chapterId={CHAPTER.id} signedIn={signedIn} progressPercent={progressPercent} />}
    >

      <Reveal>
        <ChapterHero />
      </Reveal>


      {/* 1.1 — Introduction & Définition */}
      <LessonSection {...meta("intro")}>
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

        <Reveal>
          <SubHead icon={TrendingUp}>Illustration interactive</SubHead>
        </Reveal>
        <Reveal>
          <MarketDriverVisualizer />
        </Reveal>

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
      </LessonSection>

      {/* 1.2 — Macroéconomie */}
      <LessonSection {...meta("macro")}>
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Reveal delay={0}><KpiTile label="PIB" value="croissance" hint="activité globale" tone="bull" /></Reveal>
          <Reveal delay={40}><KpiTile label="IPC" value="inflation" hint="prix & taux" tone="forge" /></Reveal>
          <Reveal delay={80}><KpiTile label="Taux" value="directeurs" hint="coût du capital" tone="data" /></Reveal>
          <Reveal delay={120}><KpiTile label="NFP" value="emploi" hint="marché du travail" tone="bull" /></Reveal>
          <Reveal delay={160}><KpiTile label="Balance" value="commerce" hint="export − import" /></Reveal>
          <Reveal delay={200}><KpiTile label="PMI" value="confiance" hint="indicateur avancé" tone="data" /></Reveal>
        </div>

        <Reveal>
          <SubHead icon={BarChart3}>Command center — 11 indicateurs clés</SubHead>
        </Reveal>
        <Reveal>
          <MacroDashboard />
        </Reveal>

        <Reveal>
          <SubHead icon={BarChart3}>Laboratoire interactif — simulez une surprise</SubHead>
        </Reveal>
        <Reveal>
          <MacroIndicatorLab />
        </Reveal>

        <Reveal>
          <Scenario
            title={CASE_STUDIES[0].title}
            level={2}
            context={CASE_STUDIES[0].context}
            visual={<CandleReplay caseStudy={CASE_STUDIES[0]} />}
            prompt={CASE_STUDIES[0].decision.prompt}
            choices={CASE_STUDIES[0].decision.choices}
            correctId={CASE_STUDIES[0].decision.correctId}
            explanation={CASE_STUDIES[0].decision.explanation}
            outcome={CASE_STUDIES[0].outcome}
            onComplete={() => markSection("macro")}
          />
        </Reveal>
      </LessonSection>

      {/* 1.3 — Microéconomie */}
      <LessonSection {...meta("micro")}>
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

        <Reveal>
          <SubHead icon={Calculator}>Widgets — pilotez les fondamentaux</SubHead>
        </Reveal>
        <div className="grid gap-6 xl:grid-cols-2">
          <Reveal><CompanyHealthScore /></Reveal>
          <Reveal delay={80}><BalanceSheetExplorer /></Reveal>
        </div>

        <Reveal>
          <Scenario
            title="Scénario #3 — Lire la qualité d'une entreprise"
            level={3}
            context={
              <>
                Une société affiche une <strong className="text-foreground">forte croissance des ventes (+30 %)</strong>,
                mais sa marge nette devient négative, son ratio dette/capitaux passe à{" "}
                <strong className="text-foreground">2,8x</strong> et son free cash-flow est négatif depuis deux ans.
              </>
            }
            prompt="Quel diagnostic fondamental est le plus rigoureux ?"
            choices={[
              { id: "a", label: "Croissance forte = entreprise saine, rien à signaler" },
              { id: "b", label: "Qualité fragile : croissance non rentable financée par la dette, FCF négatif" },
              { id: "c", label: "Seule la croissance compte, la dette est neutre" },
            ]}
            correctId="b"
            explanation="La croissance ne vaut que si elle est rentable et financée sainement. Marge négative + endettement élevé + FCF négatif = profil à risque, malgré la croissance affichée."
            onComplete={() => markSection("micro")}
          />
        </Reveal>
      </LessonSection>

      {/* 1.4 — Outils d'analyse */}
      <LessonSection {...meta("outils")}>
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

        <Reveal>
          <SubHead icon={Calculator}>Boîte à outils interactive</SubHead>
        </Reveal>
        <div className="grid gap-6 xl:grid-cols-2">
          <Reveal><ValuationLab /></Reveal>
          <Reveal delay={80}><PeerComparisonMatrix /></Reveal>
        </div>
        <Reveal><EarningsImpactEngine /></Reveal>

        <Reveal>
          <Scenario
            title="Scénario #4 — Multiple élevé, est-ce cher ?"
            level={4}
            context={
              <>
                Une entreprise se paie <strong className="text-foreground">P/E 58x</strong>, bien au-dessus du marché
                (~20x). Mais sa croissance des ventes est de <strong className="text-foreground">+120 %</strong> avec une
                marge nette de 49 % et un ROE de 91 %.
              </>
            }
            prompt="Comment interpréter ce P/E élevé avec rigueur ?"
            choices={[
              { id: "a", label: "P/E 58x = trop cher, à éviter automatiquement" },
              { id: "b", label: "Un P/E élevé peut être justifié par une croissance et une rentabilité exceptionnelles (PEG)" },
              { id: "c", label: "Le P/E ne dépend jamais de la croissance" },
            ]}
            correctId="b"
            explanation="Un multiple se lit relativement à la croissance (logique du PEG) et à la qualité. Une croissance et une rentabilité hors normes peuvent justifier un P/E élevé — sans jamais l'évaluer isolément."
            onComplete={() => markSection("outils")}
          />
        </Reveal>
      </LessonSection>

      {/* 1.5 — Prévisions */}
      <LessonSection {...meta("previsions")}>
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

        <Reveal>
          <SubHead icon={LineChart}>Planificateur de scénarios</SubHead>
        </Reveal>
        <Reveal><ForecastScenarioPlanner /></Reveal>

        <Reveal>
          <Scenario
            title="Scénario #5 — Le piège de la guidance"
            level={5}
            context={
              <>
                Une entreprise publie un <strong className="text-foreground">BPA supérieur</strong> aux attentes (+8 %).
                Pourtant, la direction <strong className="text-foreground">abaisse fortement sa guidance</strong> pour
                les trimestres à venir, invoquant un ralentissement de la demande.
              </>
            }
            prompt="Quelle réaction du cours est la plus probable, et pourquoi ?"
            choices={[
              { id: "a", label: "Le cours monte : le résultat publié est meilleur que prévu" },
              { id: "b", label: "Le cours baisse : le marché valorise l'avenir, et la guidance abaissée prime" },
              { id: "c", label: "Aucune réaction : seul le passé compte" },
            ]}
            correctId="b"
            explanation="Le marché est tourné vers l'avenir. Une bonne surprise sur le passé ne compense pas une guidance dégradée : les anticipations de bénéfices futurs sont revues à la baisse, et le cours suit."
            onComplete={() => markSection("previsions")}
          />
        </Reveal>
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

        <div className="space-y-6">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.id} delay={i % 2 === 0 ? 0 : 60}>
              <Scenario
                title={`Cas ${cs.index} — ${cs.title}`}
                level={cs.level}
                context={
                  <>
                    <span className="mb-2 inline-block rounded-full border border-data/30 bg-data/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-data">
                      {cs.driver}
                    </span>
                    <br />
                    {cs.context}
                  </>
                }
                visual={<CandleReplay caseStudy={cs} />}
                prompt={cs.decision.prompt}
                choices={cs.decision.choices}
                correctId={cs.decision.correctId}
                explanation={cs.decision.explanation}
                outcome={cs.outcome}
                onComplete={() => markCase(cs.id)}
              />
            </Reveal>
          ))}
        </div>
      </LessonSection>

      {/* Completion */}
      <Reveal>
        <CompletionPanel completed={completed.size} cases={cases.size} />
      </Reveal>
    </ChapterShell>
  );
}

function CompletionPanel({ completed, cases }: { completed: number; cases: number }) {
  const total = LESSONS.length;
  const done = completed >= total;
  return (
    <section className="mt-8 overflow-hidden rounded-3xl border bg-gradient-hero p-8 text-center">
      <div className="mx-auto flex max-w-lg flex-col items-center">
        {done ? (
          <Award className="h-10 w-10 text-forge" />
        ) : (
          <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
        )}
        <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
          {done ? "Chapitre 1 maîtrisé" : "Continuez votre progression"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {done
            ? "Vous avez complété les 6 sections. Le Chapitre 2 — Banques Centrales — est débloqué."
            : `Complétez chaque section en répondant à son scénario. ${completed}/${total} sections · ${cases}/10 cas.`}
        </p>
        <div className="mt-5 h-2 w-full max-w-sm overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-gradient-forge transition-all duration-700"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
