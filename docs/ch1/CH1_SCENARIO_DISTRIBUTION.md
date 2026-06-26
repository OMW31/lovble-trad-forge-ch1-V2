# CH1_SCENARIO_DISTRIBUTION

## Objectif
Redistribuer les cas pour éviter le silo final et faire monter la pédagogie section par section.

## Mapping cible
- 1.1 → Scénario 1
- 1.2 → Scénario 2 + 3
- 1.3 → Scénario 4 + 5
- 1.4 → Scénario 6 + 7 + 8
- 1.5 → Scénario 9 + 10

## État actuel
- Scénario 1 déjà placé en 1.1
- Scénario 2 déjà utilisé en 1.2
- Bloc `cas-pratiques` final concentre encore l’essentiel des cas historiques

## Règle de placement
Chaque scénario doit suivre la structure:
1. Contexte
2. Observation
3. Question
4. Décision
5. Réponse
6. Explication

## Intention pédagogique
- 1.1: ancrer la logique valeur/prix
- 1.2: macro surprises et lecture des indicateurs
- 1.3: qualité d’entreprise / micro
- 1.4: interprétation d’outils et multiples
- 1.5: projection, régime, guidance, scénarios

## Action suivante
Refactorer `academy.analyse-fondamentale.tsx` pour éclater progressivement les cas 4 → 10 hors du bloc final.
