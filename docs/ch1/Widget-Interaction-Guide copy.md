# Widget-Interaction-Guide

Chaque widget du chapitre doit être compréhensible en quelques secondes. Gabarit de documentation par widget.

## Gabarit obligatoire
- **Description** — ce que c'est.
- **Objectif** — à quoi il sert.
- **Pourquoi il existe** — la décision qu'il aide à prendre.
- **Comment le lire** — axes, couleurs, échelles.
- **Comment l'utiliser** — interactions disponibles.
- **Ce qu'il apprend** — la compétence visée.
- **Comment l'interpréter** — lecture experte.
- **Erreurs fréquentes** — pièges.
- **Cas d'usage** — exemple concret.

## Standards d'interaction (rappel `CH1_INTERACTION_SYSTEM.md`)
- Toute interaction produit un changement perceptible.
- Pas de contrôle décoratif sans conséquence.
- Feedback succès/erreur clair.

## Widgets couverts (à documenter individuellement en Round B)
MarketDriverVisualizer, MacroIndicatorLab, MacroDashboard, MacroRegimeRadar,
EconomicCycleWheel, MacroRelationshipEngine, FedSimulator, NfpInterpreter,
GdpCpiInterpreters, YieldCurveVisualizer, IntermarketCorrelationMap,
CompanyHealthScore, BalanceSheetExplorer, CompanyDashboard, FinancialRatios,
ValuationLab, DcfSimulator, PeerComparisonMatrix, EarningsImpactEngine,
ForecastScenarioPlanner, ScenarioBuilder.

## État
- [x] Gabarit défini.
- [x] Fiche par widget (Round final condensé).

## Fiches widgets — run-up final 2026-07-05
> Format condensé: objectif → lecture → interaction → piège évité.

### MarketDriverVisualizer
- Visualiser driver → transmission → actif impacté → invalidation ; lire les liens causaux, pas la couleur isolée ; choix de driver ; évite la décision sans mécanisme.

### MacroIndicatorLab
- Simuler une surprise macro ; comparer réel vs consensus ; inputs/scénarios ; évite la lecture du chiffre absolu.

### MacroDashboard
- Command center 11 indicateurs ; lire catégorie, consensus, impact multi-actifs ; filtres + détail ; évite le silo macro.

### MacroRegimeRadar
- Identifier régime dominant ; lire axes croissance/inflation/taux/liquidité ; radar + implications ; évite le diagnostic mono-variable.

### EconomicCycleWheel
- Situer expansion/ralentissement/récession/reprise ; rotation de cycle ; sélection d’état ; évite la confusion cycle/tendance.

### MacroRelationshipEngine
- Comprendre chaînes macro ; lire cause → canal → marché ; étapes interactives ; évite les corrélations décoratives.

### FedSimulator / NfpInterpreter / GdpCpiInterpreters
- Traduire publication en politique monétaire ; lire surprise, salaires, inflation, croissance ; simulations ; évite “bonne nouvelle = marché hausse” systématique.

### YieldCurveVisualizer / IntermarketCorrelationMap
- Valider le signal par taux et flux croisés ; lire pente, DXY, commodities, risque ; interactions de courbe/carte ; évite le ticker isolé.

### CompanyHealthScore / BalanceSheetExplorer / CompanyDashboard
- Diagnostiquer santé micro ; lire croissance, marges, dette, liquidité, cash ; exploration score/bilan/dashboard ; évite résultat net isolé.

### FinancialRatios / ValuationLab / DcfSimulator / PeerComparisonMatrix
- Transformer ratios et DCF en décision ; lire sensibilité, WACC, pairs, prime/décote ; sliders/comparaisons ; évite le multiple absolu.

### EarningsImpactEngine / ForecastScenarioPlanner / ScenarioBuilder
- Relier publication, guidance et scénarios ; lire beat/miss, trajectoires, probabilités, invalidation ; choix de scénarios ; évite la prévision sans risque.
