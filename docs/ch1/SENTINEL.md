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
- [x] CompanyHealthScore
- [x] BalanceSheetExplorer
- [x] ValuationLab
- [x] PeerComparisonMatrix
- [x] EarningsImpactEngine
- [x] ForecastScenarioPlanner

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
- [x] Mobile breadcrumb inférieur

## Procédure de contrôle après chaque incrément
1. Vérifier que les routes publiques répondent encore.
2. Vérifier qu’aucune leçon n’a disparu.
3. Vérifier que tous les widgets listés ci-dessus existent toujours.
4. Vérifier que la sidebar et le scroll-spy fonctionnent toujours.
5. Vérifier que la modal d’évaluation s’ouvre toujours.
6. Vérifier que l’auth ne casse pas l’accès public au chapitre.
7. Vérifier que la persistance n’introduit pas d’erreur pour un visiteur non connecté.
8. Mettre à jour ce document si une feature nouvelle devient structurelle.
