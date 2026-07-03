# Chapitre 1 — Run-up final : Audit → Correctifs → Complétion

## Résultat de l'audit (confirmation V7.5)
- **Priorités 1–4** (Responsive mobile, Doc TradingView, Audit UX mobile, Prototype) : **faites** et vérifiées dans le code.
- **Priorités 5, 7, 8** (évaluations scénarisées, refonte évals A/B/C, Scenario Library Engine) : **fondation data présente** (`scenario-engine.ts`, `scenario-library.ts`, `difficulty-engine.ts`, banque d'évaluation) mais **non branchée à l'UI** → à finir.
- **Priorité 6** (doc widgets) : fichier présent, fiches à compléter.

### Bugs/écarts confirmés
1. Sidebar mobile (`LearningNavigationEngine`) se **ferme au clic sur une leçon** (`setOpen(false)` systématique) au lieu de déplier.
2. Hero : bandeau en scroll statique, **pas de marquee infini**.
3. Progression incohérente : 3 métriques divergentes (vues / complétées / validées), pas de résumé, pas d'explication, **pas de logout**.
4. Évaluations sous-dimensionnées (4 questions/niveau), leçon et certification mélangées dans un seul modal.
5. Bloc « Passer l'évaluation » cassé en mobile.
6. Index scénarios pointe vers la leçon, **pas vers le cas exact**.
7. Certification ouvre un modal (attendu : **page dédiée**).
8. 17 visuels présents mais **~5 montés**, aucune Lightbox.

---

## Sprint 1 — Correctifs UX chirurgicaux
- **Sidebar** : clic leçon = déplier + scroll, **reste ouverte** ; clic sous-section = scroll + fermeture ; sinon fermeture uniquement via ✕ / backdrop.
- **Hero marquee infini** : piste dupliquée, keyframe `marquee-x` dans `styles.css`, masque de fondu, pause au survol, `prefers-reduced-motion`, responsive.
- **Bloc « Passer l'évaluation »** : empilage vertical < sm, bouton pleine largeur, hiérarchie/espacements alignés.
- **Index scénarios** : `id="case-N"` par cas + regroupement par leçon (Macro 1–3, Micro 4–5, Outils 6–8, Prévisions 9–10) + carte → cas exact.
- **Logout complet** : `AcademyAccountButton` → menu (Profil, Progression, Déconnexion) via `supabase.auth.signOut()` (cancelQueries → clear → signOut → navigate `/auth`), présent aussi dans la sidebar.

## Sprint 2 — Tableau de bord de progression « Cockpit RPG »
- **Métrique unifiée** dans `useChapterProgress` : objet `dashboard` unique { leçonsValidées / échouées / restantes, scénarios réussis/restants, %chapitre, %certification, score moyen }.
- **HUD** permanent (mini-résumé + bouton « Voir ma progression ») dans la sidebar desktop et mobile.
- **Cockpit RPG** : anneau de certification 5 segments, cartes-badges par leçon (médailles bronze/argent/or selon score), radar de compétences (réutilise `MacroRegimeRadar`), streak et objectifs. Modal premium desktop / sheet mobile.
- Explication intégrée de la logique de validation (20 % par leçon à ≥70 %, certification à 5/5).

## Sprint 3 — Refonte des évaluations de leçon (Partie A + B)
- `LessonEvaluationGate` n'ouvre plus que **Partie A + Partie B** (la Partie C sort vers la certification).
- Banque par `lessonId` : **7–15 items**, Partie A = **QCM enrichis** (choix multiples, vrai/faux justifié, associations — pas de texte libre), Partie B = lecture d'indicateurs/graphiques/**visuels a1…a17**/widgets.
- Scoring par partie, seuil 70 %, sauvegarde backend, feedback premium, **boîte de dialogue si échec** (renvoi au bloc concerné).
- Composant `VisualQuestion` (image + Lightbox + choix) standardisé.

## Sprint 4 — Certification finale (page dédiée)
- Nouvelle route `academy.analyse-fondamentale.certification.tsx` (**page, pas modal**).
- Verrou : inaccessible tant que 5/5 leçons non validées → écran explicatif listant précisément les leçons restantes.
- Contenu = **Partie C uniquement**, ≥10 scénarios scriptés. Structure/slots préparés pour le futur agent.
- `CompletionPanel` → CTA vers la page.

## Sprint 5 — Scenario Library Engine + mode Evaluation (branchement UI)
- Composant `ScenarioPlayer` unifié (Learning / Evaluation) consommant `assembleScenario` : contexte → bougies → **pause pédagogique** → publication → question → 4 réponses → feedback → reprise → débrief → outcome (réutilise `CandleReplay`).
- Random Selection Engine (non-répétition) + révélation par difficulté branchés.

## Sprint 6 — Visuels : Lightbox + audit positionnement
- **Lightbox universelle** (agrandissement au clic) sur **chaque** visuel du chapitre, standardisée.
- Audit des 17 visuels vs `CH1_VISUAL_DNA.md` / `CH1_ASSET_MAP.md` : monter les visuels manquants aux bons emplacements, corriger positions/opacités.

## Sprint 7 — Documentation & anti-régression
- Compléter `Widget-Interaction-Guide.md` (1 fiche/widget), MAJ `CHANGELOG.md`, `SENTINEL.md`, `TASKS_CH1_IMPLEMENTATION.md`, `Scenario_Inventory.md`.
- Audit Playwright multi-breakpoints (390/834/1280) + relecture SENTINEL.

---

## Détails techniques
- Stack : TanStack Start + Tailwind v4 (tokens `styles.css`) + shadcn/ui + framer-motion/GSAP. Aucune couleur en dur, `prefers-reduced-motion` respecté.
- Nouveaux fichiers : `academy.analyse-fondamentale.certification.tsx`, `ProgressDashboard.tsx` (Cockpit RPG), `ScenarioPlayer.tsx`, `VisualQuestion.tsx`, `VisualLightbox.tsx` ; extension `useChapterProgress.ts`, `evaluation-bank.ts`, `AssessmentModal.tsx`, `AcademyAccountButton.tsx`, `ChapterShell.tsx`, `LearningNavigationEngine.tsx`, `ChapterHero.tsx`, `LessonEvaluationGate.tsx`, route principale.
- Backend : réutilise `evaluation_attempts` / `chapter_progress` existants (aucune migration destructive ; ajout de colonnes seulement si strictement nécessaire, avec GRANT + RLS `auth.uid()`).
- Auth : logout via `supabase.auth.signOut()`, affordance pilotée par la session.

## Anti-régression
Routes publiques, leçons 1.1→1.6, tous les widgets, sidebar/scroll-spy, persistance invité + connectée, navigation libre (verrou seulement sur la certification). SENTINEL relu avant/après chaque sprint. Exécution **des 7 sprints d'affilée** sans arrêt intermédiaire.
