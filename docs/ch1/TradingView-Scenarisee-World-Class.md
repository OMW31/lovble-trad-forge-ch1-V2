# TradingView-Scenarisee-World-Class

Documentation exhaustive pour reconstruire les scénarios TradingView « au pixel près » avec n'importe quel agent.

## 1. Architecture
- Source de vérité : `ScenarioSpec` (voir `Scenario-Library-Architecture.md`).
- Rendu : `CandleReplay` (bougies synthétiques) piloté par `market-data.ts`.
- Deux modes : **Learning** (narration continue) et **Evaluation** (pause pédagogique).

## 2. Pipeline scénarisé
```
Contexte → Bougies → Pause → Publication économique → Question → 4 réponses →
Choix utilisateur → Feedback immédiat → Animation reprend → Débrief → Outcome réel
```

## 3. Placement des éléments graphiques
- **Supports / résistances** : niveaux horizontaux ancrés sur des prix clés de la spec (`parametres.support`, `parametres.resistance`).
- **Lignes de tendance** : 2 points d'ancrage minimum, pente documentée.
- **Indicateurs** : liste réutilisable (EMA, RSI, volume) avec périodes paramétrées.

## 4. Rythme d'animation
- **Nombre de bougies** : `parametres.candles` (défaut 30).
- **Cadence** : 1 bougie / 120-180 ms en Learning ; pause à `parametres.pauseAt`.
- **Synchronisation texte/chart** : chaque segment de narration est lié à un index de bougie.
- **Pauses** : pause automatique avant la publication économique (mode Evaluation).

## 5. Narration
- Contexte (pré-roll) → événement → débrief (post-roll).
- Ton institutionnel, phrases courtes, focus décision.

## 6. Paramètres réutilisables
```ts
{ candles: 30, speedMs: 150, pauseAt: 18, support: number, resistance: number,
  trendline: [{i,price},{i,price}], indicators: ["ema20","rsi14"] }
```

## 7. Règles & variantes
- Une spec → plusieurs niveaux via le Difficulty Engine.
- Ne jamais révéler l'outcome avant la décision utilisateur.

## 8. Checklist de production
- [ ] Contexte clair < 3 phrases.
- [ ] Support/résistance ancrés sur prix réels.
- [ ] Pause positionnée avant la donnée.
- [ ] 1 question, 4 réponses, 1 correcte argumentée.
- [ ] Feedback + débrief + outcome.

## 9. Erreurs à éviter
- Bougies sans logique de prix cohérente.
- Pause après la donnée (spoil).
- Narration désynchronisée du chart.
- Indicateurs décoratifs sans conséquence.

## État
- [x] Base `CandleReplay` + cas existants.
- [ ] Pause pédagogique + mode Evaluation unifié (Round B).
