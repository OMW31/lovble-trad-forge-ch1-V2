# SENTINEL

## Rôle
Registre anti-régression du Chapitre 1. Toute implémentation future doit relire ce document avant livraison.

## Features à ne jamais casser
### Architecture actuelle
- [x] Route home `/`
- [x] Route academy `/academy`
- [x] Route chapitre `/academy/analyse-fondamentale`
- [x] Shell chapitre avec sidebar sticky
- [x] Scroll-spy des sections
- [x] Hero chapitre présent
- [x] Completion panel final

### Pédagogie actuelle
- [x] Leçons 1.1 → 1.6 présentes
- [x] Scénarios interactifs avec feedback immédiat
- [x] Replays candles synthétiques
- [x] Case studies historiques pilotés par `market-data.ts`

### Widgets existants
- [x] MarketDriverVisualizer
- [x] MacroIndicatorLab
- [x] MacroDashboard (11 indicateurs + filtres + modal détail)
- [x] EconomicCycleWheel
- [x] MacroRelationshipEngine
- [x] FedSimulator
- [x] NfpInterpreter
- [x] GdpCpiInterpreters
- [x] YieldCurveVisualizer
- [x] IntermarketCorrelationMap
- [x] CompanyHealthScore
- [x] BalanceSheetExplorer
- [x] CompanyDashboard
- [x] FinancialRatios
- [x] ValuationLab
- [x] DcfSimulator
- [x] PeerComparisonMatrix
- [x] EarningsImpactEngine
- [x] ForecastScenarioPlanner
- [x] ScenarioBuilder

### Fondations nouvelles
- [x] Profils complets backend
- [x] Rôles séparés backend
- [x] Progression persistée backend
- [x] Resume state exact backend
- [x] Tentatives d’évaluation backend
- [x] Auth page `/auth`
- [x] CTA compte dans le header CH1
- [x] Indicateur de synchronisation utilisateur dans le shell
- [x] Modal d’évaluation indépendante
- [x] AssessmentModal V2 avec banques Standard / High / Premium
- [x] Evaluation Part A/QCM, Part B/widgets, Part C/TradingView
- [x] Score engine 70% et sauvegarde tentative si connecté
- [x] Mobile breadcrumb inférieur
- [x] Mission Briefing
- [x] Macro Radar
- [x] Skill Unlock Preview
- [x] Visual Hybrid Layer avec WebP + schémas natifs

### Distribution scénarios verrouillée
- [x] Cas 1, 2, 3 dans macro
- [x] Cas 4, 5 dans micro
- [x] Cas 6, 7, 8 dans outils
- [x] Cas 9, 10 dans prévisions
- [x] Section cas pratiques final maintenue comme index navigable, pas comme silo principal

## Procédure de contrôle après chaque incrément
1. Vérifier que les routes publiques répondent encore.
2. Vérifier qu’aucune leçon n’a disparu.
3. Vérifier que tous les widgets listés ci-dessus existent toujours.
4. Vérifier que la sidebar et le scroll-spy fonctionnent toujours.
5. Vérifier que la modal d’évaluation s’ouvre toujours.
6. Vérifier que l’auth ne casse pas l’accès public au chapitre.
7. Vérifier que la persistance n’introduit pas d’erreur pour un visiteur non connecté.
8. Mettre à jour ce document si une feature nouvelle devient structurelle.
9. Vérifier que `AssessmentModal` affiche les 3 niveaux, accepte les réponses et calcule un score.
10. Vérifier que les visuels WebP sous `/academy/ch1/visuals/` restent disponibles.

## Check-out 2026-06-28
- Routes publiques et structure CH1 conservées.
- Toutes les leçons 1.1 → 1.6 sont maintenues.
- Widgets historiques conservés + nouveaux widgets Sprint 5 ajoutés.
- Modal évaluation indépendante enrichie, non intégrée directement dans le flux leçon.
- Accès public au chapitre conservé; persistance seulement si utilisateur connecté.

## Features ajoutées — Round A (2026-06-30)
### Composants nouveaux (ne jamais casser)
- [x] `MacroRegimeRadar` — radar polygone 4 régimes + implications (section 1.1 `#intro-regimes`)
- [x] `LessonMiniHero` — mini hero leçons 1.2 → 1.5 (Objectifs + Question clé)
- [x] `VisualLayer` (primitives) — intégration visuelle non « posée » (background / band / figure)
- [x] `Reveal` bidirectionnel (Framer Motion) — entrée + sortie, `prefers-reduced-motion`
- [x] Sidebar desktop : accordéon sous-sections + tracking (`useSubsectionSpy`)

### Ancres de sous-sections (utilisées par le tracking + nav) — ne pas renommer sans MAJ `chapter1.ts`
- 1.1 : `intro-regimes`, `intro-concept`, `intro-illustration`, `intro-scenario`
- 1.2 : `macro-concept`, `macro-dashboard`, `macro-widgets`, `macro-lab`, `macro-cas`
- 1.3 : `micro-concept`, `micro-widgets`, `micro-cas`
- 1.4 : `outils-concept`, `outils-widgets`, `outils-cas`
- 1.5 : `previsions-concept`, `previsions-planner`, `previsions-cas`
- 1.6 : `cas-pratiques-index`

### Garanties vérifiées (Round A)
- [x] 0 overflow horizontal sur 390 / 834 / 1280 (Playwright)
- [x] Nav inférieure : avance à chaque tap (bug « 1/2 » corrigé), design conservé
- [x] Sidebar sticky desktop conservée + enrichie (non supprimée)
- [x] Aucune leçon / widget supprimé ; tous les widgets historiques présents
- [x] Aucune erreur console au chargement

## Check-out 2026-06-30
- Routes publiques OK, structure CH1 conservée.
- Leçons 1.1 → 1.6 maintenues ; mini-heroes ajoutés 1.2 → 1.5.
- Widgets historiques + `MacroRegimeRadar` présents.
- Visuels a4/a8/a12/a17 intégrés via `VisualLayer` (aucun visuel posé).
- À FAIRE Round B : flèche + Sidebar Overlay (mobile/tablette), progression 5×20 % gatée par évaluation de leçon, certification finale à 100 %, moteur de scénarios unique (pause pédagogique), Scenario Library + Difficulty Engine, fiches par widget, intégration des 3 visuels manquants.

## Features ajoutées — Round B (2026-07-01)
### Composants / libs nouveaux (ne jamais casser)
- [x] `LearningNavigationEngine` — flèche + Sidebar Overlay mobile/tablette (< lg)
- [x] `LessonEvaluationGate` — évaluation de leçon gatée 70 % (1.1 → 1.5)
- [x] `useChapterProgress` étendu — `lessonPasses`, `certificationPercent`, `certificationReady`, `markLessonPassed`
- [x] `AssessmentModal` enrichi — `onPassed` / `triggerLabel` (logique existante intacte)
- [x] `scenario-library.ts` / `difficulty-engine.ts` / `scenario-engine.ts`
- [x] Visuels a1/a2/a3 intégrés (VisualLayer figure)

### Garanties Round B
- [x] Logique d'évaluation existante conservée (améliorée, pas supprimée)
- [x] Progression section existante intacte (V7 ajoutée en parallèle, non destructive)
- [x] Typecheck OK, aucune leçon/widget retiré

## Features ajoutées — Run-up final (2026-07-05)
### Composants / routes nouveaux (ne jamais casser)
- [x] `ScenarioPlayer` — lecteur unifié Learning/Evaluation consommant `assembleScenario`
- [x] Route `/academy/analyse-fondamentale/certification` — certification finale dédiée, pas modal
- [x] `VisualLightbox` / `VisualQuestion` — logique visuelle standardisée pour Partie B
- [x] A1→A17 présents, documentés et référencés dans le chapitre ou les évaluations

### Garanties Run-up final
- [x] Navigation libre conservée ; seul l’accès certification est verrouillé à 5/5 leçons validées
- [x] Partie C sortie du modal de leçon et montée en page dédiée
- [x] Aucun widget/leçon historique supprimé
