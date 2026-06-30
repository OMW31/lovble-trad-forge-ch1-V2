# Difficulty-Scaling-Engine

Moteur de mise à l'échelle de la difficulté pour les scénarios (couplé à `Scenario-Library-Architecture`).

## Entrée
- Une `ScenarioSpec` complète (toutes les couches d'information disponibles).
- Un niveau cible : `standard | high | premium`.

## Règle de révélation des couches
| Couche | Standard | High | Premium |
|---|---|---|---|
| Contexte narratif | ✔ (court) | ✔ | ✔ (complet) |
| Macro | 1 driver | 2-3 drivers | tous |
| Technique | niveaux clés | + structure | + invalidation |
| Géopolitique | — | partiel | complet |
| Intermarket | — | partiel | complet |
| Banques centrales | — | partiel | complet |
| Indices de réponse | élevés | moyens | faibles |

## Sortie
- Un scénario jouable filtré, + barème adapté.
- Même base, plusieurs niveaux → zéro duplication.

## Mode Learning vs Evaluation
- **Learning** : toutes les couches visibles + narration continue.
- **Evaluation** : couches selon le niveau + pause pédagogique avant décision.

## État
- [ ] Implémentation Round B.
