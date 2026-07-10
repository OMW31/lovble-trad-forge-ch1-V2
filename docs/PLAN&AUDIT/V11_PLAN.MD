# CH1 — Run-up Final avant ouverture grand public

## PARTIE 1 — Audit de l'existant (livré vs documenté)

### ✅ Effectivement implémenté
- Marquee hero, sidebar overlay (`LearningNavigationEngine`), logout, dashboard « Cockpit RPG ».
- `ScenarioPlayer` (learning/evaluation) + moteur `assembleScenario` / `difficulty-engine`.
- Route certification dédiée + verrou 5/5.
- `VisualLightbox` + `VisualQuestion` ; a1–a17 référencés dans les questions Partie B.
- Banque d'évaluation A/B par leçon dans `evaluation-bank.ts`.

### ❌ Écarts confirmés (documenté mais NON implémenté)
1. **Modal d'évaluation de leçon montre encore Standard/High/Premium** (`AssessmentModal.tsx`). Attendu : 2 onglets **Partie A / Partie B** + score total ; niveaux exclusifs à la certification.
2. **Pondération 30/70 absente** (`scoreQuestions` = ratio brut).
3. **Guides d'utilisation des widgets INEXISTANTS** (aucun carrousel « GUIDE D'UTILISATION » type Bo1/Bo2/Bo3).
4. **Visuels non placés dans le corps des leçons** (a3,a5,a6,a7,a9,a10,a11,a13,a14,a15,a16 « RÉSERVÉ »).
5. **Rotation scénarios non appliquée** (aucun historique côté `ScenarioPlayer`).
6. **Pas d'encyclopédie widgets** ni de couche **notes i18n**.

---

## PARTIE 2 — Plan final (A, N, O, Q, W, X + additions)

### Sprint F1 — Refonte du modal d'évaluation de leçon (W)
- Supprimer les onglets `standard/high/premium` ; nouveaux onglets **Partie A (QCM/enrichis)** et **Partie B (Widgets/Interprétation)**.
- Volume : **7 à 15 questions** par leçon.
- `scoreQuestions` repondéré **30 % A + 70 % B** (cœur = analyse), seuil global 70 %, détail par partie dans le Score Engine.
- Conserver sauvegarde backend + boîte d'échec « Revoir la leçon ». Ne PAS toucher au moteur de certification.

### Sprint F2 — Guides d'utilisation par widget (A, X)
- Composant `WidgetGuide` (carrousel modal type Bo1/Bo2/Bo3 : titres numérotés, corps, encart Astuce/Institutionnel, dots, Suivant/Compris).
- Bouton d'aide `?` dans `WidgetFrame`.
- Source `src/lib/academy/widget-guides.ts` couvrant **les 21 widgets**. Standard = Market Driver Visualizer.

### Sprint F3 — Encyclopédie widgets + manuel d'implémentation (A, X)
- `docs/ch1/WIDGET_ENCYCLOPEDIA.md` : Description, Logique, Données, Interactions, Animations, UX, Implémentation par widget.
- `docs/ch1/IMPLEMENTATION_MANUAL.md` : manuel pour futurs agents.
- MAJ (append-only) `Widget-Interaction-Guide.md`.

### Sprint F4 — Placement des visuels dans les leçons (O, N)
- Monter tous les visuels manquants aux emplacements `INDEX.md` via `VisualLayer` + Lightbox.
- **Couche notes i18n** : visuels en anglais ; notes d'application/illustration traduisibles (prop `note`/`caption`).
- MAJ `INDEX.md` (RÉSERVÉ → INTÉGRÉ).

### Sprint F5 — Valorisation visuelle premium (O)
- Révélations séquencées, timelines animées, effets cinématiques (parallax léger, mask reveal), `prefers-reduced-motion`.

### Sprint F6 — Rotation intelligente des scénarios (Q)
- Mémoire d'historique (localStorage) empêchant le retour d'un scénario avant **≥5 itérations** ; `pickScenario(level, exclude)` en learning ET certification.

### Sprint F7 — Documentation, anti-régression & QA
- Append-only : `CHANGELOG.md`, `SENTINEL.md`, `TASKS_CH1_IMPLEMENTATION.md`, `Scenario_Inventory.md`, `CH1_ASSET_MAP.md`.
- QA Playwright 390/834/1280 ; relecture SENTINEL avant/après chaque sprint.

---

## PARTIE 3 — Additions (débrief complémentaire)

> **Dépendances bloquantes** : F8 nécessite la **doc « Icon Library / Brand DNA »** ; F9–F11 nécessitent la **livraison des assets V2 (PNG) + backgrounds**. Rien n'est produit sans ces docs/assets ; les sprints attendent la fourniture avant exécution.

### Sprint F8 — Bibliothèque d'icônes TradForge (Brand DNA)
- Construire une bibliothèque d'icônes 100 % TradForge **strictement selon la doc fournie** (contours, échelle, conventions).
- Rien avant réception de la doc ; documenter le système (naming, tokens, variants, tailles, usage) dans `docs/ch1/ICON_LIBRARY.md`.

### Sprint F9 — Flux 1 : Migration complète des visuels V2 (chapitres, priorité immédiate)
- **Conversion batch PNG → WebP** (même pipeline que les premiers assets).
- **Remplacement de tous les visuels V1** des leçons/chapitres par les V2 ; suppression des anciennes références une fois validé.
- Validation Desktop/Tablette/Mobile + optimisation poids/qualité + contrôle responsive.
- Objectif : plus aucun ancien visuel dans les chapitres.

### Sprint F10 — Déploiement des backgrounds + doc de placement
- Intégrer la nouvelle famille de backgrounds partout où prévu : Hero, Mission Briefing, Sections, Widgets, Dashboards, Popups, Modales, Évaluations, Certification, Sidebar, Footer, Loading, TradingView, Workspace.
- `docs/ch1/BACKGROUNDS_PLACEMENT.md` : par background → emplacement, intensité, overlay, animation, opacité, blur éventuel, règles d'utilisation.

### Sprint F11 — Flux 2 : Évaluations Partie B (migration progressive hybride)
- **Conserver temporairement** les anciens visuels d'évaluation (Partie B) tant que les V2 n'existent pas.
- Le moteur d'évaluation doit fonctionner en **phase hybride** (V1 + V2 coexistants).
- Remplacement progressif dès que chaque équivalent V2 est produit ; indépendant de F9.

### Sprint F12 — Visual Question Bank Engine (Partie B)
- Pour chaque visuel utilisé en Partie B : banque de **20 à 50 questions** (formulations, distracteurs, niveaux Standard/High/Premium, concepts, angles d'interprétation).
- Sélection non répétitive : à réapparition d'un visuel, la question diffère quasi systématiquement.
- Extension de `evaluation-bank.ts` (structure par `visualId` → pool de questions) + intégration au modal Partie B.
- `docs/ch1/VISUAL_QUESTION_BANK.md` : par visuel → concepts évalués, indicateurs, widgets associés, erreurs fréquentes, objectifs pédagogiques, banque de questions, difficulté, liens scénarios.

### Sprint F13 — Backend/Storage : LAIS finalisation
- Vérifier et finaliser la logique **backend + stockage** des tentatives Partie A et B (table `evaluation_attempts` existante : partAAnswers/partBAnswers/partScores/pondération 30/70).
- Implémenter/valider le **Lesson Assessment Intelligence System** décrit dans la doc partagée (leçon → compétences → objets pédagogiques → banques → évaluation générée).
- `docs/ch1/LESSON_ASSESSMENT_INTELLIGENCE_SYSTEM.md` comme document de référence transversal (CH1 → Academy).
- RLS/GRANT scoping `auth.uid()` ; aucune migration destructive (ajout de colonnes uniquement si strictement nécessaire).

---

## Détails techniques
- Stack inchangée (TanStack Start + Tailwind v4 tokens + shadcn + framer-motion). Aucune couleur en dur, `prefers-reduced-motion` respecté.
- Nouveaux fichiers : `WidgetGuide.tsx`, `widget-guides.ts`, `ICON_LIBRARY.md`, `BACKGROUNDS_PLACEMENT.md`, `VISUAL_QUESTION_BANK.md`, `LESSON_ASSESSMENT_INTELLIGENCE_SYSTEM.md`, `WIDGET_ENCYCLOPEDIA.md`, `IMPLEMENTATION_MANUAL.md`. Extensions : `AssessmentModal.tsx`, `evaluation-bank.ts`, `primitives.tsx`, `ScenarioPlayer.tsx`, route principale.
- Backend : réutilise `evaluation_attempts` (aucune migration destructive).

## Anti-régression (SENTINEL)
Certification et ses niveaux Standard/High/Premium intacts ; leçons 1.1→1.6 et widgets conservés ; navigation libre ; persistance invité/connecté. On améliore, on ne supprime pas. Docs versionnées (append-only). Exécution des sprints d'affilée sans arrêt intermédiaire ; F8–F11 démarrent à réception des docs/assets fournis.
