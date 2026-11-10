# Production bilingue FR/EN (parité réelle)

## Leçons tirées du CH1
- L'i18n déclarée « faite » ne l'était pas : seul un widget utilisait vraiment `useT()`. → Vérifier par recherche de littéraux, pas par déclaration.
- Traductions automatiques bas de gamme (API gratuites, lots d'un autre agent) = mix FR/EN → rejetées. Ne jamais insérer avant validation.
- Une réponse réseau FR tardive a pu écraser l'EN → latest-request-wins obligatoire.

## Architecture
- UI : dictionnaires `src/lib/i18n/dictionaries/{fr,en}.ts`, `I18nProvider`, `useT()`, `LanguageSwitch` visible dans le shell chapitre ET le hub.
- Contenu : `chapterN.ts` + `chapterN.en.ts` mêmes clés/IDs.
- Questions : catalogue versionné `question-translations.en.ts` clé `${part}:${question_key}` + table `question_translations` (idempotent `ON CONFLICT DO UPDATE`).
- La locale est passée explicitement à la sélection d'évaluation ; changer de langue ne change que le texte (mêmes questions, réponses, rotation).

## Pipeline de traduction par lots (token-efficient, réutilisable pour d'autres langues)
1. Extraire la source FR canonique (base + statique) → JSON `{key, part, prompt, choices[{id,text}], explanation}`.
2. Lots de ~8 items vers la passerelle IA (modèle fort), prompt « traducteur financier senior », glossaire (CFA, bps, beat/miss…), règles : zéro mot FR, décimales en point, IDs et ordre des choix conservés.
3. Validation automatique : résidus FR (liste de mots), IDs identiques, nombres identiques, ponctuation.
4. Relecture par un second modèle indépendant ; appliquer corrections.
5. Écrire catalogue TS + SQL idempotent dans `docs/chN/i18n/` ; insérer via migration.
6. Test vitest : couverture 100 %, fallback hors ligne, concurrence FR/EN.
7. QA Playwright authentifiée : toutes les évaluations en FR puis EN, contenu navigateur = catalogue.

## Gate linguistique
`rg` des accents/mots FR fréquents dans les fichiers EN et composants (hors dictionnaire FR) = 0 ; capture EN de chaque leçon relue.
