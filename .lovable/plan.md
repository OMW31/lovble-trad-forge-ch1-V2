# CH1 — Sprint Unique Final (Prototype Grand Public)

## Résultat de l'audit (état réel du code)

| Élément | État actuel | Cible sprint |
|---|---|---|
| Modal éval leçon (A/B, 30/70) | ✅ En place | Densifier à 7Q/partie |
| Pondération 30/70 + scoring | ✅ En place (`scoreQuestions`) | Conserver |
| Nb questions par partie | ❌ ~4 (banques courtes) | **7 par partie** |
| Répartition difficulté (2 facile/2 moyen/3 dur) | ❌ Absente | À implémenter |
| Banque Partie A dense (≥25/leçon) | ❌ Absente | Intégrer depuis doc LAIS |
| Banque Partie B (10/visuel-widget) | ⚠️ 3 seeds/visuel | Porter à 10, piocher 7 |
| Modal **diagnostic** (chapitre) | ❌ Encore Standard/High/Premium | Refonte en **A/B** |
| Gate certification (5/5 leçons) | ⚠️ Partiel | Bouton « Évaluation » top-bar conditionné |
| Auth pseudo + profil initial | ❌ Absent | Ajouter à l'inscription |
| Éval réservée aux comptes | ⚠️ Sauvegarde seule | **Éval = connexion requise** |
| Backend LAIS (Part A/B storage) | ✅ Table `evaluation_attempts` OK | Finaliser payload (difficulté, rotation, partScores) |
| Migration visuels V2 + backgrounds | ⛔ **Bloqué** (doc prompts non fournie) | En attente de ta doc |

## Décisions verrouillées (tes réponses)
- **Visuels V2** : la migration attend ta doc de prompts/mapping. On **ne devine pas** le mapping (19 fichiers → 17 slots). Tant que la doc n'est pas là, les chapitres gardent V1 ; dès réception, swap strict A1→A17 + branding/logo vérifiés. Aucune régression premium.
- **Profil initial** : `Investisseur`, `Trader indépendant`, `Analyste financier/macro`, `Étudiant avancé en économie` **+ « Autre » (texte libre)**. Stocké dans `profiles.preferences` (jsonb) — **aucune migration destructive**.

---

## Sprint F-FINAL (exécuté d'un bloc, sans arrêt intermédiaire)

### 1. Banque de questions Partie A (moteur dense)
- Nouveau `src/lib/academy/part-a-bank.ts` : intégrer les QCM+QRO de la doc LAIS (leçons 1.1→1.5), chaque item typé `{ id, lesson, difficulty(1-3), prompt, choices, correctId, explanation }`. QRO converties en QCM à distracteurs (format déjà supporté).
- Cible MVP : ≥25 items/leçon Partie A.
- `pickPartA(lessonId)` : tire **7 questions** — 2 (diff.1) + 2 (diff.2) + 3 (diff.3) — avec **rotation anti-répétition** (localStorage, même mécanisme que `visual-question-bank`).

### 2. Banque Partie B (widgets/visuels, densifiée)
- Étendre `visual-question-bank.ts` : porter chaque pool à **10 seeds** en injectant les banques widgets de la doc LAIS (mappées visuel↔widget↔leçon), avec champ `difficulty`.
- `pickPartB(lessonId)` : tire **7 questions** sur les visuels/widgets de la leçon, même répartition 2/2/3 + rotation.
- Les visuels d'évaluation **restent V1** (conservation temporaire explicitement demandée jusqu'aux équivalents V2).

### 3. Moteur d'évaluation
- `getLessonAssessmentQuestions()` : brancher `pickPartA` + `pickPartB` (7+7 = 14). Conserver `scoreQuestions` + `LESSON_PART_WEIGHTS` (30/70, seuil global 70 %).
- **Refonte du diagnostic chapitre** (`getChapterDiagnosticQuestions`) : passer en logique **A/B** (suppression Standard/High/Premium du modal), en piochant transversalement dans les banques.

### 4. Modal (`AssessmentModal.tsx`)
- Supprimer le rendu à 3 niveaux du mode diagnostic → réutiliser l'UI A/B (déjà soignée) pour leçon **et** diagnostic.
- Score engine : afficher répartition difficulté + partScores. Garder « Nouvelle série » (rotation).

### 5. Gate certification + top-bar
- Bouton « Évaluation » de la barre supérieure : ouvre la **certification finale** uniquement si les 5 leçons sont validées (`useChapterProgress`), sinon état verrouillé + message de prérequis (règles `Evaluation-System-Architecture`).

### 6. Auth & profil (CRITIQUE scale)
- `auth.tsx` (onglet inscription) : champ **pseudo** (→ `username` + `display_name`, respect contrainte 3–32) + sélecteur **profil initial** (4 + Autre libre) → `preferences.profileType`.
- Gating : ouverture d'une évaluation (leçon ou certification) exige une session → sinon CTA « Créer un compte pour passer l'évaluation et sauvegarder ta progression ». Sauvegarde progression conservée.
- Vérifier flux login/logout complet (déjà présent) ; pas de page paramètres profil (reportée).

### 7. Backend / Storage LAIS
- `progress.functions.ts` : `saveEvaluationAttempt` enrichit `feedback` (difficultés servies, rotation, partScores 30/70) et `part_a_answers`/`part_b_answers` (id, difficulté, correct). Aucune colonne nouvelle nécessaire → **aucune migration** (réutilise `evaluation_attempts`).
- Confirmer RLS/GRANT `auth.uid()` sur les 5 tables (audit rapide, pas de changement destructif).

### 8. Anti-régression & QA
- Playwright 390 / 834 / 1280 : parcours leçon → éval A/B (14Q) → score → sauvegarde connecté ; diagnostic A/B ; gate certif verrouillé/déverrouillé ; inscription pseudo+profil ; responsive widgets signalés (EconomicCycleWheel, MacroRelationshipEngine).
- Relecture `SENTINEL.md` avant/après.
- Docs **append-only** : `CHANGELOG.md`, `TASKS_CH1_IMPLEMENTATION.md`, `SENTINEL.md`, `CH1_ASSET_MAP.md`.

---

## En attente de ta livraison (non exécuté ce sprint)
- **Doc prompts + visuels V2 finaux (branding/logo intégrés)** → déclenche : renommage strict A1→A17, conversion batch PNG→WebP (pipeline existant), swap chapitres, intégration backgrounds + `BACKGROUNDS_PLACEMENT.md`, migration progressive Partie B vers V2.
- Bibliothèque d'icônes Brand DNA (attend la doc dédiée).
- Encyclopédie widgets / guides Bo1-Bo3 / moteur `lesson-assessment-intelligence.ts` : reportés (hors périmètre sortie publique).

## Détails techniques
- Stack inchangée (TanStack Start + Tailwind v4 tokens + shadcn + framer-motion). Zéro couleur en dur, `prefers-reduced-motion` respecté.
- Nouveau fichier : `src/lib/academy/part-a-bank.ts`. Extensions : `visual-question-bank.ts`, `evaluation-bank.ts`, `AssessmentModal.tsx`, `auth.tsx`, `progress.functions.ts`, route chapitre + `LearningNavigationEngine.tsx` (top-bar gate), `useChapterProgress.ts`.
- Backend : réutilise `evaluation_attempts` (part_a/b/c_answers + feedback jsonb), aucune migration destructive.

## Anti-régression (SENTINEL)
Certification et sa logique intactes ; leçons 1.1→1.6 et widgets conservés ; navigation libre ; persistance invité/connecté (avec éval désormais réservée aux comptes). On améliore, on ne supprime pas. Docs versionnées (append-only). V2/backgrounds strictement bloqués jusqu'à réception de la doc pour préserver le rendu premium.
