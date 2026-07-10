# Widget Encyclopedia — CH1

**Version** : 2026-07-10  
**Statut** : Production-ready reference

---

## Objectif

Documentation exhaustive des 25 widgets du Chapitre 1. Chaque widget est décrit selon le gabarit : Description, Logique, Données, Interactions, Animations, UX, Implémentation.

---

## MarketDriverVisualizer

**Description** : Visualiseur de transmission macro. Affiche la chaîne causale : driver macro → canal de transmission → actifs impactés → invalidation.

**Logique** : Sélection driver → affichage flèches transmission → impacts différenciés par actif selon régime (croissance vs inflation).

**Données** : Drivers prédéfinis (PIB, IPC, Taux Fed, NFP), canaux (politique monétaire, taux réels, sentiment), actifs (actions, obligations, USD, commodités).

**Interactions** : Sélection driver (dropdown ou tuiles), hover flèches (explication canal), clic actif (détail impact).

**Animations** : Apparition flèches séquencée (stagger), pulse sur driver actif, fade actifs secondaires.

**UX** : Lecture causale (pas couleur isolée). Invalidation affichée explicitement (condition de sortie).

**Implémentation** : `MarketDriverVisualizer.tsx`, état local driver sélectionné, SVG flèches dynamiques, `prefers-reduced-motion` (skip animations).

---

## MacroIndicatorLab

**Description** : Laboratoire de simulation macro. Sliders surprise (réel vs consensus) → calcul impact multi-actifs instantané.

**Logique** : Surprise = Réel - Consensus. Impact proportionnel magnitude surprise (sigma).

**Données** : Indicateurs (NFP, CPI, PIB), consensus historiques, sensibilités actifs par indicateur.

**Interactions** : Sliders réel/consensus, reset scénario, comparaison beat/miss.

**Animations** : Mise à jour impact temps réel (spring transition), feedback couleur (beat=vert, miss=rouge).

**UX** : Focus sur surprise (pas chiffre absolu). Lecture croisée taux + actions + USD.

**Implémentation** : `MacroIndicatorLab.tsx`, `<Slider>` shadcn, calculs inline, tone sémantique (bull/bear).

---

## MacroDashboard

**Description** : Command center 11 indicateurs macro. Vue synthèse Réel | Consensus | Précédent + filtres catégorie + modal détail institutionnel.

**Logique** : Agrégation indicateurs clés, filtrage par catégorie (croissance, inflation, politique monétaire), modal détail sur clic.

**Données** : `macro-indicators.ts` (11 indicateurs, consensus, impacts marchés, lectures beat/miss).

**Interactions** : Filtres catégorie (croissance, inflation, taux), clic indicateur (modal détail), scroll tuiles.

**Animations** : Stagger apparition tuiles, modal slide-in, hover tile (scale subtil).

**UX** : Cockpit (pas silo). Lecture cohérence inter-catégories. Consensus = attente marché (pas vérité).

**Implémentation** : `MacroDashboard.tsx`, `<Dialog>` modal, grid responsive (1 col mobile, 2-3 desktop), `macro-indicators.ts` dataset.

---

## MacroRegimeRadar

**Description** : Radar polygone 4 régimes macro. Affiche axes croissance/inflation/taux/liquidité + implications Long/Short par régime.

**Logique** : Régimes = Goldilocks, Stagflation, Récession, Expansion. Polygone = score 6 axes (PIB, IPC, Taux, Liquidité, Sentiment, Crédit).

**Données** : Scores axes (0-10), seuils régimes, implications actifs par régime.

**Interactions** : Sélection régime, hover axes (définition), rotation polygone (si temps réel).

**Animations** : Draw polygone (path animation), transition régime (morph), `prefers-reduced-motion` (skip).

**UX** : Lecture multi-dimensionnelle (pas mono-variable). Transition régime = signal macro majeur.

**Implémentation** : `MacroRegimeRadar.tsx`, SVG polygone, calcul centroid, tone par régime.

---

## EconomicCycleWheel

**Description** : Roue 4 phases cycle économique. Expansion → Ralentissement → Récession → Reprise + actifs favorisés par phase.

**Logique** : Phase sélectionnée → affichage implications + actifs Long/Short.

**Données** : 4 phases prédéfinies, actifs favorisés (expansion=actions, ralentissement=bonds, récession=cash/or, reprise=cycliques).

**Interactions** : Sélection phase (clic secteur roue), navigation séquentielle (flèches).

**Animations** : Rotation roue (smooth transition), highlight secteur actif, fade implications.

**UX** : Distinction cycle (phases macro) vs tendance (direction prix). Rotation non linéaire (sauts possibles).

**Implémentation** : `EconomicCycleWheel.tsx`, SVG roue 4 secteurs, `aspect-square`, responsive (mobile=vertical stack, desktop=roue).

---

## MacroRelationshipEngine

**Description** : Moteur chaînes causales macro. Affiche transmission choc macro : cause → canal → marché impacté (ex: CPI↗ → Fed hawkish → USD↗).

**Logique** : Chaîne = étapes séquentielles avec mécanisme transmission explicite. Condition invalidation par étape.

**Données** : Bibliothèque chaînes prédéfinies (10-15 scénarios macro classiques).

**Interactions** : Sélection choc initial, clic étape (explication mécanisme), modification choc (reconfiguration chaîne).

**Animations** : Révélation étapes séquencée (stagger), flèches animées (flow), pulse étape active.

**UX** : Validation mécanisme (pas corrélation décorative). Chaîne valide = cause + mécanisme + invalidation.

**Implémentation** : `MacroRelationshipEngine.tsx`, état chaîne courante, SVG flèches horizontales, scroll horizontal mobile (mask fade).

---

## FedSimulator

**Description** : Simulateur réaction Fed. Sliders CPI + NFP → probabilité décision taux (hawkish/dovish/neutre) + guidance.

**Logique** : Matrice décision Fed (CPI × NFP). Inflation chaude + emploi fort = hawkish. Inflation froide + emploi faible = dovish.

**Données** : Seuils CPI/NFP, probabilités décision par combinaison, historique dots Fed.

**Interactions** : Sliders CPI/NFP, reset scénario, affichage probabilités temps réel.

**Animations** : Jauge probabilité (spring), couleur tone (hawkish=rouge, dovish=vert), transition smooth.

**UX** : Guidance > décision immédiate. Bonne donnée ≠ marché hausse (peut = Fed hawkish = baisse).

**Implémentation** : `FedSimulator.tsx`, sliders shadcn, calcul probabilité inline, affichage jauge radial.

---

## NfpInterpreter

**Description** : Interpréteur NFP. Calcul surprise (réel vs consensus) en sigma + lecture institutionnelle (beat/miss/inline) + réaction Fed probable.

**Logique** : Surprise = (Réel - Consensus) / σ historique. >2σ = fort. Croisement salaires horaires (pression inflation).

**Données** : Historique NFP, consensus, salaires horaires, σ (écart-type).

**Interactions** : Inputs réel/consensus, affichage surprise sigma, croisement salaires.

**Animations** : Gauge sigma (spring), couleur tone beat/miss, fade explication.

**UX** : NFP absolu insuffisant. Croiser avec salaires + participation rate + révisions. >2σ = réaction Fed probable.

**Implémentation** : `NfpInterpreter.tsx`, inputs shadcn, calcul sigma, affichage gauge + texte interprétatif.

---

## GdpCpiInterpreters

**Description** : Interpréteurs PIB + CPI. Sliders réel vs consensus → lecture régime (Goldilocks, Stagflation, etc.) + implications marchés.

**Logique** : Matrice PIB × CPI. PIB fort + CPI bas = Goldilocks. PIB faible + CPI fort = Stagflation.

**Données** : Seuils PIB (>2.5%=sain, 1.5-2.5%=plateau, <1%=contraction), CPI (<2.5%=contrôlé, 2.5-4%=chaud, >4%=hors contrôle).

**Interactions** : Sliders PIB/CPI, affichage régime, implications actifs.

**Animations** : Transition régime (fade), couleur tone par régime, spring sliders.

**UX** : Toujours croiser PIB + CPI (pas isolés). Régime pilote actifs (pas l'inverse).

**Implémentation** : `GdpCpiInterpreters.tsx`, 2 sliders, matrice régime 2×2, affichage implications texte.

---

## YieldCurveVisualizer

**Description** : Visualiseur courbe des taux US Treasury (2Y, 5Y, 10Y, 30Y). Affiche forme (normale/inversée/plate) + régime + implications.

**Logique** : Courbe normale = pente positive. Inversée = 2Y > 10Y (récession probable 12-18 mois). Plate = transition.

**Données** : Taux US Treasury temps réel ou snapshot, spread 2Y-10Y, régimes historiques.

**Interactions** : Affichage courbe temps réel, hover points (taux exact), historique spread.

**Animations** : Draw courbe (path animation), transition forme (morph), `prefers-reduced-motion`.

**UX** : Inversion 2Y/10Y = signal récession (timing variable 6-24 mois). Croiser avec actions (ATH + inversion = tardif).

**Implémentation** : `YieldCurveVisualizer.tsx`, SVG path, recharts ou custom, calcul spread, tone par régime.

---

## IntermarketCorrelationMap

**Description** : Carte corrélations croisées. Matrice SPX/DXY, Bonds/Gold, Oil/USD, etc. + déclencheurs cassure corrélation.

**Logique** : Corrélations historiques (rolling 60j). Vert = positive, Rouge = négative, Gris = décorrélation.

**Données** : Matrice corrélations 6×6 actifs, seuils cassure, déclencheurs (crise, choc).

**Interactions** : Hover paire (corrélation + interprétation), clic (historique corrélation).

**Animations** : Fade-in matrice, pulse anomalies, transition couleurs.

**UX** : Corrélation historique ≠ garantie. Valider avec régime macro actuel. Confirmation = cohérence multi-actifs.

**Implémentation** : `IntermarketCorrelationMap.tsx`, grid 6×6, calcul corrélation inline ou dataset, tone sémantique.

---

## CompanyHealthScore

**Description** : Score santé entreprise 0-100. Sliders 4 dimensions (Croissance, Marges, Dette, Liquidité) → score agrégé + jauge.

**Logique** : Score = pondération dimensions (Croissance 30%, Marges 25%, Dette 25%, Liquidité 20%). >75 = institutionnel.

**Données** : Pondérations fixes, seuils critiques (<50=red flag, 50-75=neutre, >75=qualité).

**Interactions** : Sliders 4 dimensions, affichage score temps réel, jauge circulaire.

**Animations** : Jauge (spring progress), couleur tone score (rouge<50, jaune 50-75, vert>75).

**UX** : Résultat net isolé insuffisant. Croiser toujours 4 dimensions. Profitable + surendetté = fragile.

**Implémentation** : `CompanyHealthScore.tsx`, 4 sliders shadcn, calcul pondéré inline, jauge circulaire SVG.

---

## BalanceSheetExplorer

**Description** : Explorateur bilan interactif. Accordéon Actif/Passif/Equity + détail ligne par ligne + totaux + équilibre fondamental.

**Logique** : Actif = Passif + Equity (toujours). Si Actif < Passif, insolvabilité technique.

**Données** : Bilan entreprise (lignes actif, passif, equity), année N vs N-1.

**Interactions** : Accordéon sections, expansion lignes, comparaison N vs N-1.

**Animations** : Accordéon slide, highlight totaux, fade lignes secondaires.

**UX** : Liquidité = current ratio (actifs courants / dettes courantes). <1 = risque défaut. Comparer tendance N vs N-1 vs N-2.

**Implémentation** : `BalanceSheetExplorer.tsx`, `<Accordion>` shadcn, tableau lignes, calcul totaux inline.

---

## CompanyDashboard

**Description** : Vue synthèse entreprise. Tuiles KPI (Revenus, EBITDA, Marge nette, D/E, Cash, ROE, ROA) + lecture croisée.

**Logique** : Agrégation KPI principaux. Marges élevées + dette faible + ROE >15% = qualité.

**Données** : KPI entreprise, médianes sectorielles, historique N-1.

**Interactions** : Affichage tuiles, hover KPI (définition), comparaison secteur.

**Animations** : Stagger tuiles, pulse valeurs, transition smooth.

**UX** : Un seul KPI ne raconte rien. Toujours croiser Croissance + Marges + Dette + Cash.

**Implémentation** : `CompanyDashboard.tsx`, grid tuiles responsive, `<KpiTile>`, tone sémantique.

---

## FinancialRatios

**Description** : Grille ratios financiers comparatifs. ROE, ROA, D/E, Current Ratio, Quick Ratio vs médiane sectorielle + seuils institutionnels.

**Logique** : ROE >15% = qualité. D/E <1 = santé. Current >1.5 = liquidité. Quick >1 = solvabilité court terme.

**Données** : Ratios entreprise, médianes secteur, seuils institutionnels.

**Interactions** : Tableau comparatif, highlight écarts, tendance N vs N-1 vs N-2.

**Animations** : Fade-in lignes, pulse écarts significatifs.

**UX** : Ratio seul peut mentir. ROE élevé via levier (dette) = fragile. Toujours croiser avec D/E.

**Implémentation** : `FinancialRatios.tsx`, tableau shadcn, calcul écarts inline, tone par seuil.

---

## ValuationLab

**Description** : Laboratoire valorisation multiples. Sliders P/E, P/S, P/B → valorisation implicite vs médiane sectorielle + prime/décote.

**Logique** : Multiple > médiane = prime (croissance ou qualité). < médiane = décote (risque ou sous-évaluation).

**Données** : Multiples entreprise, médianes secteur, sensibilité EPS.

**Interactions** : Sliders multiples, affichage prime/décote %, test sensibilité EPS ±10%.

**Animations** : Spring sliders, fade valorisation, couleur tone prime/décote.

**UX** : Éviter multiple absolu. P/E 30 = cher (utility) vs normal (tech croissance). Tester sensibilité EPS.

**Implémentation** : `ValuationLab.tsx`, sliders shadcn, calcul valorisation inline, affichage % prime/décote.

---

## DcfSimulator

**Description** : Simulateur DCF temps réel. Sliders Croissance, Marge EBITDA, WACC → valorisation intrinsèque + sensibilité WACC + terminal value.

**Logique** : DCF = flux futurs actualisés + valeur terminale. WACC = paramètre le plus sensible (+1% WACC = -15-20% valorisation).

**Données** : Inputs croissance/marge/WACC, formule DCF standard, terminal value (taux perpétuel 2-4%).

**Interactions** : Sliders 3 paramètres, affichage valorisation temps réel, analyse sensibilité WACC.

**Animations** : Spring valorisation, fade formule, couleur tone sur/sous-valorisation.

**UX** : WACC monte (taux élevés) → valorisations baissent. Terminal value = 60-80% DCF (tester 2-4% perpétuel).

**Implémentation** : `DcfSimulator.tsx`, 3 sliders, calcul DCF inline (flux 5Y + terminal), affichage valorisation + sensibilité.

---

## PeerComparisonMatrix

**Description** : Matrice comparative pairs secteur. Tableau 5-10 pairs avec P/E, P/S, ROE, Marge nette, D/E + identification leaders/laggards.

**Logique** : Leaders = ROE élevé + marges supérieures + dette contrôlée. Laggards = multiples bas + marges compressées.

**Données** : Pairs secteur (5-10 entreprises), multiples, ratios, tri par métrique.

**Interactions** : Tri colonne, highlight entreprise focus, comparaison ligne.

**Animations** : Fade-in lignes, pulse leader/laggard, transition tri.

**UX** : Pair sous-valorisé (P/E bas) peut = value trap (problèmes structurels). Valider avec croissance + qualité. Convergence valorisation (écart persistant = différentiel qualité).

**Implémentation** : `PeerComparisonMatrix.tsx`, tableau shadcn sortable, highlight conditional, tone par métrique.

---

## EarningsImpactEngine

**Description** : Moteur impact résultats. Sliders EPS réel vs consensus + Guidance (raised/lowered/maintained) → réaction cours attendue.

**Logique** : Beat + guidance confirmée = positif. Miss = négatif. Beat + guidance lowered = souvent baisse. Guidance > beat/miss actuel.

**Données** : Historique réactions post-earnings, seuils beat/miss (1-2%=faible, >5%=fort, miss >3%=red flag).

**Interactions** : Sliders EPS + guidance, affichage réaction attendue, magnitude surprise.

**Animations** : Spring réaction cours, couleur tone beat/miss, fade guidance.

**UX** : Guidance est plus importante que beat/miss actuel. Beat de 1-2% = faible (bruit). >5% = fort signal.

**Implémentation** : `EarningsImpactEngine.tsx`, sliders EPS + dropdown guidance, calcul réaction inline, affichage ±% attendu.

---

## ForecastScenarioPlanner

**Description** : Planificateur scénarios pondérés. 3 scénarios (Optimiste, Neutre, Pessimiste) + probabilités (total 100%) + trajectoires EPS → valeur espérée.

**Logique** : Valeur espérée = Σ(probabilité × valorisation scénario). Si ≠ cours actuel, identifier asymétrie.

**Données** : 3 scénarios, trajectoires EPS par scénario, pondération probabilités.

**Interactions** : Inputs probabilités (sliders total 100%), définition trajectoires EPS, affichage valeur espérée.

**Animations** : Spring sliders, fade scénarios, couleur tone probabilités.

**UX** : Éviter prévision sans risque. Scénario unique = pas de plan. Toujours préparer 3 trajectoires. Valeur espérée ≠ cours = asymétrie (upside/downside).

**Implémentation** : `ForecastScenarioPlanner.tsx`, 3 colonnes scénarios, sliders probabilités (contrainte sum=100%), calcul valeur espérée inline.

---

## ScenarioBuilder

**Description** : Constructeur scénario multi-étapes. Guide création scénario complet : contexte macro → drivers → technique → catalyseurs → invalidation → validation → export.

**Logique** : Scénario valide = thèse (pourquoi) + mécanisme (comment) + catalyseur (quand) + invalidation (sortie).

**Données** : Formulaire guidé, validation étapes, export JSON/texte.

**Interactions** : Wizard multi-étapes, validation inline, navigation étapes, export scénario.

**Animations** : Transition étapes (slide), validation feedback (check), progress bar.

**UX** : Scénario sans invalidation = biais (pas scénario). Toujours définir sortie avant entrée. Export pour suivi journal trading.

**Implémentation** : `ScenarioBuilder.tsx`, `<Tabs>` ou wizard custom, formulaire shadcn, validation zod, export fonction.

---

## Conclusion

Cette encyclopédie est la **référence technique complète** des widgets CH1. Chaque widget est documenté avec sa logique, ses données, ses interactions, et son implémentation. Futurs agents doivent consulter ce document avant modification/extension de widget.

**Prochaine mise à jour** : Après ajout nouveaux widgets CH2-CHN.
