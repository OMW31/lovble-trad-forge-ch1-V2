# CHANGELOG

## 2026-06-26
### Foundations
- Lovable Cloud activé pour supporter auth, profils, progression persistée, reprise exacte et évaluations.
- Auth sécurisée configurée avec email/mot de passe et Google.
- Nouveau schéma backend créé:
  - `profiles`
  - `user_roles`
  - `chapter_progress`
  - `chapter_resume_state`
  - `evaluation_attempts`
- Fonctions et triggers de bootstrap profil créés.
- Warnings de sécurité backend corrigés immédiatement après migration.
- Première route `/auth` ajoutée pour activer la synchronisation utilisateur.
- Première modal d’évaluation indépendante ajoutée comme base du système Standard / High / Premium.
- Premier breadcrumb mobile inférieur ajouté pour la navigation CH1.
- Couche documentaire CH1 initialisée dans `docs/ch1/`.

### Rationale
- La persistance fiable ne doit plus dépendre du navigateur seul.
- Le chapitre peut rester public, mais la valeur premium doit être liée à un compte.
- Les docs deviennent la source de vérité opérationnelle avant implémentation massive.

## 2026-06-27
### Sprint progression — Foundations branchées + premier widget premium livré
- Route `/auth` désormais visible et branchée dans l’expérience CH1 via CTA header.
- Persistance CH1 reliée à la page avec chargement/sauvegarde de progression et reprise exacte pour utilisateurs connectés.
- Shell chapitre enrichi avec état connecté, bouton compte, indicateur de synchronisation et continuité de progression.
- Nouveau `MacroDashboard` livré dans la leçon 1.2 avec 11 indicateurs clés, filtres par catégorie et modal d’analyse institutionnelle.
- Nouveau dataset `macro-indicators.ts` ajouté pour structurer les indicateurs, impacts marchés et lectures beat/miss.
- Validation visuelle effectuée dans le preview: dashboard rendu, modal NFP rendue, aucun bloc cassé constaté sur la section macro.

### Rationale
- Le shell devait enfin refléter la réalité produit: compte, sync, progression persistée.
- Le bloc macro avait besoin d’un vrai command center pour atteindre le niveau institutionnel des prototypes fournis.
- La modal détaillée permet de garder une page dense sans sacrifier la profondeur pédagogique.

## 2026-06-28
### Sprint order override — S3 → S6 → S5 → S2 → S4 → S7 terminé
- Sprint 3 livré: Mission Briefing, Macro Radar, Skill Unlock Preview, progression avancée et redistribution des 10 cas dans les sections 1.2 → 1.5.
- Le bloc final “cas pratiques” ne concentre plus les replays: il devient un index de navigation anti-silo.
- Sprint 6 livré: `AssessmentModal` V2 avec banques Standard / High / Premium, Partie A QCM, Partie B widgets/dashboards, Partie C replay TradingView, score engine et seuil de validation 70%.
- Sprint 5 livré: Economic Cycle Wheel, Macro Relationship Engine, FED Reaction Simulator, NFP Interpreter, GDP/CPI Interpreters, Yield Curve Visualizer, Intermarket Correlation Map, Company Dashboard, Financial Ratios, DCF Simulator et Scenario Builder.
- Sprint 2 consolidé: mapping codebase, gaps, distribution scénarios et mapping visuels mis à jour post-build.
- Sprint 4 livré: conversion des assets `A*.png` fournis en WebP sous `public/academy/ch1/visuals/`, intégration hybride et reconstruction native des schémas prioritaires.
- Sprint 7 livré: hover premium, animations de feedback, fallback `prefers-reduced-motion`, audits desktop/tablet/mobile et optimisation Lighthouse-oriented.

### Rationale
- Le chapitre devait sortir du rendu “bonne base” pour devenir un vrai desk d’apprentissage institutionnel.
- La redistribution des scénarios évite l’effet annexe final et force l’application immédiate après chaque bloc pédagogique.
- Les visuels 4K restent exploités sans injecter de texte corrompu: image en référence immersive, contenu pédagogique en HTML/SVG natif.
- Le système d’évaluation devient un produit autonome et persistant, au lieu d’un simple bouton placeholder.

## 2026-06-30
### Round A — Corrections world-class (chirurgical, aucune feature supprimée)
- **Bug navigation inférieure corrigé** (`MobileLessonBreadcrumb`) : la cible de navigation est désormais déterministe (état `targetId`) et découplée du scroll-spy asynchrone ; scroll programmatique idempotent. Fin du « fonctionne 1 fois sur 2 ». Design conservé.
- **Responsive corrigé** sur les 2 widgets récents :
  - `EconomicCycleWheel` : roue SVG fluide (`aspect-square` + `max-w`), grille `grid-cols-1` jusqu'à `lg`, typo/paddings responsives.
  - `MacroRelationshipEngine` : chaîne verticale empilée < `sm`, horizontale scrollable avec masque de fondu ≥ `sm` ; suppression du débordement `min-w-[680px]`.
  - Audit Playwright : 0 overflow horizontal sur 390 / 834 / 1280.
- **Macro Radar polygone** (`MacroRegimeRadar`) ajouté en section dédiée 1.1 : 4 régimes (Goldilocks/Stagflation/Récession/Expansion) + implications Long/Short, radar SVG 6 axes. L'aside barres du Mission Briefing est conservé.
- **Mini-heroes** (`LessonMiniHero`) ajoutés en tête des leçons 1.2 → 1.5 (1.1 introductive exclue) : badge, tier, durée, fil d'étapes, Mission Briefing (Objectifs + Question clé).
- **Sidebar desktop enrichie** : accordéon des sous-sections + tracking précis (visité / actif / à faire) par sous-section, leçon et chapitre (`useSubsectionSpy`). Sticky desktop conservée.
- **Scroll bidirectionnel** : `Reveal` migré sur Framer Motion (entrée + sortie douce, `prefers-reduced-motion` respecté).
- **Intégration visuels (1re passe)** : nouvelle couche `VisualLayer` (opacité, fondu mask, gradient, animation) ; a4/a8/a12 intégrés en fond de groupes widgets, a17 en figure (hybrid layer). Aucun visuel « posé ».
- **Stack animation** : `framer-motion`, `gsap`, `@gsap/react` installés.

### Documentation produite
- `CH1_VISUAL_SPECS/` : 1 markdown par visuel (a4 → a17) + INDEX + 3 emplacements réservés documentés.
- Nouveaux docs d'architecture : `TradingView-Scenarisee-World-Class.md`, `Widget-Interaction-Guide.md`, `Learning-Navigation-Engine.md`, `Evaluation-System-Architecture.md`, `Scenario-Library-Architecture.md`, `Difficulty-Scaling-Engine.md`.

### Rationale
- Restaurer le niveau premium de responsive altéré par les 2 derniers widgets.
- Fiabiliser la navigation mobile/tablette sans toucher au design.
- Remettre en place les éléments documentés mais absents (mini-heroes, radar régimes, sous-sections sidebar, scroll bidirectionnel).
- Préparer le Round B (upscaling) avec une documentation globale opérable.

## 2026-07-01 · Round B (Upscaling) livré
### Comportement d'exécution
- Règle intégrée dans `AGENTS.md` : après planification, exécuter TOUS les sprints/tâches sans s'arrêter après un seul incrément (boucle d'itération jusqu'à la dernière tâche).

### Respiration entre leçons
- `LessonSection` : rythme vertical généreux (`pt-16/pb-20` → `lg:pt-24/pb-28`), diviseur premium par leçon (grand numéro fantôme + filet dégradé + « Section 1.x »), espacement interne `space-y-8 → lg:space-y-12`. Inspiré du prototype partagé (image-6).

### Learning Navigation Engine (mobile/tablette)
- Nouveau `LearningNavigationEngine` : flèche discrète haut-gauche → Sidebar Overlay (< lg uniquement, desktop conserve sa sticky). Arbre leçons + sous-sections, états visité/actif/validé, progression certification, resume par scrollIntoView. Fermeture clic extérieur / Échap.

### Progression V7 (5 × 20 %, gatée par évaluation)
- `useChapterProgress` étendu (additif) : `lessonPasses`, `certifiedLessons`, `certificationPercent`, `certificationReady`, `markLessonPassed`. Les validations sont dérivées des `evaluation_attempts` existants (aucune migration requise).
- `LessonEvaluationGate` en fin de leçons 1.1 → 1.5 : crédite les 20 % uniquement si évaluation ≥ 70 %.
- `AssessmentModal` enrichi (non remplacé) : `onPassed`, `triggerLabel`, `triggerClassName`. La logique d'évaluation existante est conservée intégralement.
- `CompletionPanel` → panneau de certification finale gaté à 100 % (5 leçons validées), sinon verrouillé avec pourcentage.

### Moteur de scénarios unique + Library + Difficulty
- Nouveaux libs : `scenario-library.ts` (ScenarioSpec par composants, source = `CASE_STUDIES`), `difficulty-engine.ts` (révélation des couches Standard/High/Premium), `scenario-engine.ts` (modes Learning/Evaluation, Random Selection anti-répétition). Zéro duplication de contenu.

### Visuels manquants intégrés
- Les 3 visuels manquants (a1/a2/a3) convertis en WebP depuis les références et intégrés via `VisualLayer` (figure) dans 1.2 — jamais posés en `<img>` brut.

### Anti-régression
- Aucune leçon/widget supprimé. Typecheck OK. Sidebar desktop, scroll-spy, nav inférieure, modal d'évaluation, accès public et persistance invité conservés.

## 2026-07-05 · Run-up final Sprints 3→7 complété
### Production-ready completion
- `ScenarioPlayer` ajouté et branché : mode Learning dans les cas 1→10, mode Evaluation pour la certification.
- Nouvelle route `/academy/analyse-fondamentale/certification` : page dédiée Partie C, verrouillée tant que 5/5 leçons ne sont pas validées.
- `CompletionPanel` pointe désormais vers la page de certification au lieu d’ouvrir un modal.
- Banque d’évaluation A+B étendue : toutes les questions restent QCM enrichis ; les visuels a1→a17 sont référencés en Partie B.
- `AssessmentModal` affiche une boîte de dialogue d’échec avec retour vers la leçon concernée.
- Progression invité rendue persistante localement, progression connectée toujours synchronisée backend via les fonctions existantes.
- `VisualLightbox` standardisée sur les figures et questions visuelles ; A1/A2/A3 documentés ; index visuel passé à 17/17.

### Documentation / anti-régression
- `Widget-Interaction-Guide.md`, `Scenario_Inventory.md`, `CH1_ASSET_MAP.md`, `CH1_VISUAL_SPECS/INDEX.md`, `SENTINEL.md`, `TASKS_CH1_IMPLEMENTATION.md` mis à jour en append-only.
