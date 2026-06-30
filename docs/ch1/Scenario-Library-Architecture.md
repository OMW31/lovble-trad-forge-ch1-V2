# Scenario-Library-Architecture

## Principe : le scénario comme langage de description (pas du contenu figé)
Au lieu de coder N scénarios en dur, chaque scénario est décrit par des **composants** assemblés par un moteur.

## Schéma d'un scénario (composants)
```ts
interface ScenarioSpec {
  id: string;
  context: string;          // narration de fond
  macro: string[];          // drivers macro
  technique: string[];      // supports/résistances/structure
  geopolitique?: string[];
  intermarket?: string[];
  banquesCentrales?: string[];
  volatilite: "low" | "mid" | "high";
  difficulte: "standard" | "high" | "premium";
  parametres: Record<string, number>; // bougies, pauses, seuils
}
```

## Moteurs
1. **Scenario Library** — catalogue de `ScenarioSpec`.
2. **Scenario Engine** — assemble un scénario jouable depuis une spec.
3. **Difficulty Engine** — décide du nombre de couches révélées :
   - Standard → peu de couches.
   - High → davantage de contexte.
   - Premium → contexte institutionnel complet.
4. **Random Selection Engine** — évite la répétition exacte entre tentatives.

## Bénéfices
- Un même scénario produit plusieurs variantes sans duplication.
- Maintenance centralisée, montée en charge vers des centaines de scénarios.

## État
- [ ] Library + Engine + Difficulty + Random (Round B).
- Réutilise `CASE_STUDIES` / `CandleReplay` existants comme première source.
