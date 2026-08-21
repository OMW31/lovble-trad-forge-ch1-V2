# Run-up final — Internationalisation de bout en bout + doc visuelle

Objectif : plus une seule chaîne non traduite dans le Chapitre 1, du hub à la certification,
puis clôture documentaire des visuels et du parcours de progression.

## Constat vérifié (lectures faites)

- Seuls 10 fichiers sur ~129 consomment le dictionnaire (`useT()`) : shell, navigation, dashboard,
  preflight, gates, hub. Les ~30 widgets pédagogiques, `chapter1.ts` (titres, sous-sections,
  mini-héros, objectifs), les 909 lignes de contenu inline de la route chapitre, la page
  certification, `market-data.ts`, `macro-indicators.ts` et `scenario-library.ts` sont en français
  en dur.
- La table `question_translations` contient **0 ligne** : la traduction des 134 questions
  (Partie A + Partie B) n'est donc pas effective en runtime, malgré le loader déjà en place.
- Le sélecteur FR/EN existe et fonctionne (image partagée) mais ne peut traduire que la coquille.

## Sprints

### S1 — Socle de contenu i18n (fondation)
- Étendre l'architecture dictionnaire par namespaces de contenu : `chapter`, `lessons`,
  `widgets`, `scenarios`, `certification`, `briefing`.
- Externaliser `chapter1.ts` : titres, sous-titres, labels de sous-sections, mini-héros
  (tier, durée, étapes, objectifs, question clé) deviennent des clés résolues à l'affichage.
  Les **ids restent immuables** (tracking de progression et banque Partie B intacts).
- Aucune suppression de donnée : les valeurs FR actuelles deviennent la source du dictionnaire FR.

### S2 — Contenu du chapitre et de la certification
- Traduire l'intégralité du contenu inline de `academy.analyse-fondamentale.tsx`
  (leçons 1.1 → 1.6, callouts, légendes de visuels, textes des cas pratiques).
- Traduire la route certification, `StrategicBriefing`, `ScenarioPlayer`, `LessonSection`,
  `LessonMiniHero`, `ChapterHero`.
- Registre EN = adaptation éditoriale registre CFA/FT, jamais du mot-à-mot.

### S3 — Widgets (les ~30 composants académie)
- Passe systématique widget par widget : labels, axes, légendes, boutons, verdicts, feedbacks,
  descriptifs d'interaction. Namespace `widgets.<widgetId>.*`.
- Formatage locale-aware des nombres, pourcentages et dates (`Intl.NumberFormat`).

### S4 — Banque de questions traduite (backend)
- Migration versionnée insérant les 134 questions × 2 locales dans `question_translations`
  (FR canonique + EN adapté), avec GRANT/RLS déjà en place respectés.
- Vérification runtime : bascule EN dans une évaluation → questions, choix et explications en EN.

### S5 — Parcours utilisateur (conforme à la description)
- Landing → hub chapitres → consultation libre → validation par sous-section (20 % / leçon)
  → à 100 % activation du bouton vers la codebase Certification existante (pas de recréation)
  → réussite certification = déverrouillage du chapitre suivant.
- Vérifier chaque transition, corriger les états de verrouillage/déverrouillage, sans régression.

### S6 — Documentation (append-only, versionnée)
- `docs/ch1/VISUAL_INTEGRATION_STANDARD.md` et `CH1_ASSET_MATRIX.md` : ajouter la section
  d'emplacement final de chaque visuel V1/V2/background (route, section, composant, opacité).
- Nouveau `docs/ch1/I18N_STRING_MAP.md` : cartographie namespace → fichier → composant.
- Mise à jour append-only de `CHANGELOG.md`, `TASKS_CH1_IMPLEMENTATION.md`, `SENTINEL.md`.

### S7 — QA production
- Balayage Playwright FR puis EN sur hub, chapitre (6 leçons), évaluation, certification,
  aux largeurs 390 / 768 / 1116 / 1440 / 2560.
- Critère de sortie : zéro chaîne française détectée en mode EN, zéro overflow, build vert.

## Détails techniques

- Le dictionnaire reste typé depuis `fr.ts` (`type Dictionary`) : toute clé manquante en EN
  casse le typecheck — filet anti-oubli.
- Les listes de contenu long (leçons, cas) passent par des tableaux clés-indexés pour éviter
  la duplication de structure entre locales.
- Aucune suppression de fichier, aucun id de visuel ou de question renommé.
