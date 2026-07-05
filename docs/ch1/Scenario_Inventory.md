# Scenario_Inventory

| Scenario | Position actuelle | Position future |
| -------- | ----------------- | --------------- |
| Scenario 1 | 1.1 | 1.1 |
| Scenario 2 | 1.2 | 1.2 |
| Scenario 3 | bloc final | 1.2 |
| Scenario 4 | bloc final | 1.3 |
| Scenario 5 | bloc final | 1.3 |
| Scenario 6 | bloc final | 1.4 |
| Scenario 7 | bloc final | 1.4 |
| Scenario 8 | bloc final | 1.4 |
| Scenario 9 | bloc final | 1.5 |
| Scenario 10 | bloc final | 1.5 |

## Check-out 2026-07-05
- Les cas 1→10 sont branchés via `ScenarioPlayer` en mode Learning dans les leçons ciblées.
- La certification finale réutilise les mêmes specs via `assembleScenario(..., "evaluation")` en page dédiée.
- L’index final conserve son rôle d’index navigable et pointe vers `#case-N` pour chaque cas exact.
