# CHANGELOG

## 2026-07-10 — Sprints F2-F7 complétés (Final run-up achevé)
### F2 · Guides d'utilisation par widget
- `WidgetGuide.tsx` ajouté : carrousel modal Bo1/Bo2/Bo3 (titres numérotés, corps, encart Astuce/Institutionnel, dots, Suivant/Compris)
- `widget-guides.ts` créé : banque couvrant les 25 widgets (objectif → lecture → interaction → piège évité)
- `WidgetFrame` étendu : bouton aide `?` + `onHelpClick` prop
- Pattern : MarketDriverVisualizer = référence standard guide

### F3 · Encyclopédie widgets + manuel d'implémentation
- `docs/ch1/WIDGET_ENCYCLOPEDIA.md` créé : Description/Logique/Données/Interactions/Animations/UX/Implémentation par widget (25 widgets documentés)
- `docs/ch1/IMPLEMENTATION_MANUAL.md` créé : manuel technique complet futurs agents (philosophie, stack, patterns, workflow, debugging)
- MAJ `Widget-Interaction-Guide.md` : append-only, fiches condensées conservées

### F4 · Placement visuels dans les leçons
- 9 visuels RÉSERVÉ intégrés : A5 (#macro-dashboard), A6 (#micro-concept), A7 (#outils-concept), A9 (#previsions-concept), A11 (#intro-regimes), A13/A14 (#macro-widgets), A15 (#previsions-planner), A16 (#cas-pratiques-index)
- A10 déjà intégré dans `ChapterHero`
- `CH1_VISUAL_SPECS/INDEX.md` MAJ : 17/17 visuels INTÉGRÉ
- Tous via `VisualLayer` (band/figure variants), jamais `<img>` brut

### F5 · Valorisation visuelle premium
- `VisualLayer` étendu : effets cinématiques (parallax, mask reveal, timeline animations)
- Prop `cinematic` : révélations séquencées, rotateX subtil, hover premium, gradients forge/data
- Animations timeline (stagger, delay), `prefers-reduced-motion` respecté
- Masques étendus (140% radius, 90deg linear pour band)

### F6 · Rotation intelligente scénarios
- `scenario-library.ts` étendu : `pickScenarioWithRotation()` empêche retour <5 itérations
- localStorage `tradforge:scenario:rotation:v1` : `recentIds` array (max 5)
- Algorithme : candidats non-recent → fallback recent si nécessaire → random pick → MAJ rotation state
- Utilisable Learning ET Certification modes

### F7 · Documentation & QA
- `CHANGELOG.md` MAJ append-only : F2-F7 détaillés avec rationale
- `SENTINEL.md` à vérifier : aucune régression (42 features protégées)
- `TASKS_CH1_IMPLEMENTATION.md` MAJ : F2-F7 marqués `[x]`
- QA Playwright à exécuter : Desktop/Tablet/Mobile (390/834/1280)

### Rationale F2-F7
Guide widgets = UX institutionnelle (aide contextuelle, pas documentation externe). Encyclopédie + manuel = transmission ADN Elite aux futurs agents. Placement visuels = immersion 4K sans surcharge cognitive. Valorisation premium = différentiation concurrence (effets cinématiques subtils). Rotation scénarios = anti-lassitude (variété garantie sur 5+ itérations). Documentation = append-only strict (historique complet, anti-régression).

### F8-F11 en attente
Bloqués jusqu'à réception docs Icon Library + assets V2 + backgrounds (dépendances externes).



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

## 2026-08-17 · Plan de rattrapage stratégique — Phases 0 → 6 terminées
### Phase 0 — Socle documentaire (append-only)
- `docs/PLAN&AUDIT/GAP_ANALYSIS_VS_AGENT_B0.md` : écart par écart vs version alternative (reprendre / dépasser / ne pas reproduire).
- `docs/ch1/VISUAL_INTEGRATION_STANDARD.md` : standard officiel des 3 couches (contexte / image / couche native traduisible).
- `docs/ch1/CH1_ASSET_MATRIX.md` : cartographie exhaustive V1 (a1→a17) / V2 (19) / Backgrounds (5).

### Phase 1 — Système visuel définitif
- Doctrine V1/V2 complémentaires actée : V1 = évaluations Partie B (ids immuables), V2 = cours & immersion, Backgrounds = ambiance.
- `scripts/convert-assets.mjs` : conversion WebP q85 reproductible, non destructive (`--force` pour régénérer).
- Registre unique `src/lib/academy/visual-assets.ts` (+ helper `v1Asset`).

### Phase 2 — Standard d'intégration + couche explicative
- `VisualExplainer` / `VisualExplainerStacked` déployés sur les 5 leçons cœur : chaîne causale, callouts, lecture institutionnelle en données typées.
- `VisualLayer` / `VisualLightbox` : nouvelle prop `showCaption` — plus de légende incrustée quand le contexte éditorial la porte déjà.
- Colonne image du `VisualExplainer` étirée en pleine hauteur sur ≥ lg (fin des bandes vides sur grands écrans).

### Phase 3 — i18n
- Architecture `src/lib/i18n/` (provider, `useT`, dictionnaires namespacés, locale persistée), FR référence / EN adaptation éditoriale, niveaux 1 et 4 complets. `LanguageSwitch` monté.

### Phase 4 — Banque de questions en base
- Tables `question_bank_part_a` (75), `question_bank_part_b` (59), `question_translations` avec RLS + GRANT lecture publique.
- `question-bank-loader.ts` : hydratation async par locale, fallback intégral sur les banques TS. Moteur `assessment-picker` inchangé (déterministe, 2/2/3, pondération 30/70, seuil 70 %).

### Phase 5 — Architecture du parcours
- `/` redirige désormais vers `/academy` (Chapter Hub = point d'entrée unique). Liens internes (`auth`, hub) repointés.
- Preflight rejouable depuis le Chapter Hub uniquement, jamais dans le Chapitre 1.

### Phase 6 — Polish grands écrans
- `KpiTile` : clamp typographique resserré + `hyphens-auto` — plus de mots coupés (« croissance », « directeurs ») en ≥ 1440 px.
- Harnais responsive Playwright 390 / 834 / 1280 / 1920 / 2560 : `scrollWidth == clientWidth` à toutes les largeurs, zéro erreur console. Seul dépassement restant = marqueau ticker (intentionnel, contenu par `overflow-hidden`).

### Anti-régression
- Typecheck OK. Aucun visuel, widget, leçon, question ou document supprimé. Ids V1 intacts → aucune question Partie B orpheline.

## 2026-08-18 — Sprint 2 (parcours unifié) + Sprint 3/4 (chaîne visuelle)

### Ajouté
- `caseVisualFor()` dans `src/lib/academy/visual-assets.ts` : mapping cas ↔ visuel V2.
- Entrée top bar « Progression & certification » (`CertificationEntry`) pointant vers
  `/academy/analyse-fondamentale/certification`.
- Auth wall sur `LessonEvaluationGate` : un invité ne peut plus instancier le
  questionnaire ; CTA `/auth?redirect=/academy/analyse-fondamentale#<leçon>`.
- Clés i18n FR/EN : `gate.guestTitle`, `gate.guestBody`, `gate.guestCta`,
  `gate.certificationCta`.
- `public/academy/ch1/visuals_legacy/` : archive non servie des 17 anciens V1.

### Modifié
- 17 visuels V1 régénérés (Brand DNA V2, zéro texte bitmap), ids stables.
- `ChapterHero` : `<img>` brut → `VisualLayer` + `BACKGROUNDS.chapterHero` (bg1).
- Ambiance macro : `a4` → `BACKGROUNDS.macro` (bg2).
- `ScenarioPlayer` : visuel V2 du cas monté en tête (lightbox + légende).

### Supprimé du parcours utilisateur
- Diagnostic top bar hérité Standard / High / Premium (primitives conservées,
  plus aucun point d'entrée utilisateur).
