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
