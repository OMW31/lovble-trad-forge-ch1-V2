# Architecture pédagogique & gamification

## Structure d'un chapitre (référence CH1)
- Hub `/academy` → route chapitre `/academy/<slug>` (`ChapterShell` : sidebar sticky, scroll-spy, `SidebarProgressHUD`, `LearningNavigationEngine`, breadcrumb mobile).
- `ChapterHero` + `PreflightGuide` (guide de départ deux-pane, rejouable, clavier, reduced-motion) + `StrategicBriefing`.
- Chaque leçon : `LessonMiniHero` → sections (`LessonSection`) → explications + `VisualExplainer` → widgets → scénario (`ScenarioPlayer`) → `LessonEvaluationGate`.
- Contenu séparé de l'UI : `src/lib/academy/chapterN.ts` (FR) + `chapterN.en.ts`, consommé via `useChapterContent`.

## Boucle d'apprentissage par leçon
Comprendre (texte + visuel) → Manipuler (widget) → Décider (scénario Learning) → Prouver (évaluation).

## Widgets
- Toujours enveloppés dans `WidgetFrame` (header + badge + body).
- Fiche par widget dans la Widget Encyclopedia : objectif → lecture → interaction → piège (4 lignes).
- Données dans des modules dédiés (`market-data.ts`, `macro-indicators.ts`) — jamais en dur dans le composant.
- Concevoir les widgets propres au chapitre ; réutiliser seulement les primitives.

## Scénarios
- Specs réutilisables dans `scenario-library.ts`, assemblées par `scenario-engine.ts`.
- Union discriminée : `Learning` (continu) | `Evaluation` (pause avant décision).
- Rotation intelligente anti-répétition ; cas historiques chiffrés et sourcés.

## Évaluation de leçon (standard actuel)
- Modal unique, Partie A (QCM/QRO, compréhension) puis Partie B (visuel/widget + interprétation).
- 7 questions par partie (plage admise 7–15), tirées par `assessment-picker` avec rotation de difficulté (`difficulty-engine`).
- Pondération `LESSON_PART_WEIGHTS = { A: 0.3, B: 0.7 }` ; validation si score pondéré ≥ 70 %.
- Banques : statiques versionnées + tables `question_bank_part_a/b` + `question_translations`.
- Partie B : chaque question référence un visuel via le registry (`getPartBAsset`) par ID stable.
- Mode diagnostic legacy (Standard/High/Premium) conservé, distinct du mode leçon.

## Progression & déblocage
- 5 leçons × 20 % ; crédit uniquement sur évaluation réussie (anti-gaming).
- Persistance backend (progression, resume state, tentatives, poids) + cache local.
- 100 % → bouton vers la certification externe → réussite → déblocage du chapitre suivant.

## Améliorations à évaluer à chaque chapitre (ne pas imposer sans validation)
- Pondération configurable par chapitre (`chapterConfig.weights`) si la nature du chapitre l'exige (ex. chapitre très pratique → B 80 %).
- Poids de leçon non uniformes si une leçon est plus dense — exposer dans la config, garder 100 % total.
- Seuil adaptatif ou deuxième chance avec questions différentes (rotation déjà disponible).
- Médailles/score par leçon déjà présents : étendre (séries, maîtrise) sans casser le schéma.
Toute amélioration → proposée dans le plan avec rationale, test unitaire sur la règle chiffrée.
