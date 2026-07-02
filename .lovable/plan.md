# Plan World-Class — Chapitre 1 · Run-up final (Audit → Correctifs → Complétion)

> Approche chirurgicale. On ne réinvente rien. On audite l'existant, on le compare à la doc, on finit les implémentations incomplètes, on corrige les incohérences. Aucune feature réussie supprimée. SENTINEL.md relu avant/après chaque incrément. Docs versionnées.

---

## PARTIE 0 — AUDIT & REVUE COMPLÈTE (état réel du code)

### 0.1 Confirmation des priorités V7.5 (1 → 8)

| # | Priorité | État réel (vérifié dans le code) | Verdict |
|---|----------|----------------------------------|---------|
| 1 | Responsive Mobile | `EconomicCycleWheel` + `MacroRelationshipEngine` refactorés, 0 overflow (audit Playwright 390/834/1280) | ✅ FAIT |
| 2 | Doc World-Class TradingView | `TradingView-Scenarisee-World-Class.md` présent + pipeline documenté | ✅ FAIT (doc), ⚠️ implémentation runtime non branchée |
| 3 | Audit UX Mobile | Breadcrumb corrigé (scroll programmatique), nav engine mobile | ✅ FAIT |
| 4 | Prototype Lovable | Route `academy.analyse-fondamentale.tsx` intégrée bout-en-bout | ✅ FAIT |
| 5 | **Nouveau modèle d'évaluations scénarisées** | `scenario-engine.ts` (assembleScenario/pickScenario/nextScenario) existe mais **n'est branché à AUCUN composant UI** ; pas de mode Evaluation avec pause pédagogique en runtime | ❌ NON IMPLÉMENTÉ (data-layer seul) |
| 6 | **Documentation des widgets** | `Widget-Interaction-Guide.md` existe mais **fiches non remplies exhaustivement** (1 fiche/widget attendue) | ⚠️ PARTIEL |
| 7 | **Refonte complète des évaluations (Partie A/B/C)** | `AssessmentModal` = 3 *niveaux* (standard/high/premium) × parties A/B/C, mais **banque = 4 questions/niveau** (spec : 7–15/partie), pas de questions ouvertes, Partie B ne réutilise pas les visuels, pas de séparation nette leçon vs certification | ❌ NON CONFORME |
| 8 | **Scenario Library Engine** | `scenario-library.ts` + `difficulty-engine.ts` existent (révélation par couches, random selection) mais **non exploités en UI** | ❌ NON IMPLÉMENTÉ (data-layer seul) |

**Conclusion audit V7.5 :** priorités 1–4 ✅. Priorités 5, 7, 8 ont une **fondation data** mais **zéro surface UI** → à brancher. Priorité 6 à compléter.

### 0.2 Constats précis par fichier (bugs & écarts confirmés)

**A. Sidebar mobile (`LearningNavigationEngine.tsx`) — BUG confirmé.**
`go(id)` appelle `setOpen(false)` à CHAQUE clic (ligne 42) → la sidebar se ferme quand on clique une leçon, empêchant le dépliage des sous-sections. **Attendu :** clic leçon = déplier + rester ouvert ; fermeture uniquement via bouton ✕ ou clic extérieur (backdrop déjà OK).

**B. Progression sidebar — incohérente.**
- Mobile (`LearningNavigationEngine`) affiche `certificationPercent` (basé sur leçons validées).
- Desktop (`ChapterShell` aside) affiche `subVisitedCount/subIds` (blocs *vus*, pas validés) + header global `progress = completedSections/6` (sections *complétées* via scénarios).
- **3 métriques de progression divergentes** cohabitent (sections vues, sections complétées, leçons validées) → la barre « ne semble pas fonctionner ». Pas de résumé unifié (leçons validées/restantes, scénarios réussis/restants, % chapitre, % certification), pas d'explication de la logique de validation, pas de Login/Logout.

**C. Hero (`ChapterHero.tsx`) — bandeau non marquee.**
Ligne 69 : `overflow-x-auto` statique (scroll manuel), pas d'animation infinie. **Attendu :** marquee horizontal infini, fluide, responsive, pause au hover, `prefers-reduced-motion`.

**D. Évaluations (`AssessmentModal.tsx` + `evaluation-bank.ts`) — sous-dimensionnées.**
- 4 questions par niveau (spec 7–15/partie). Pas de questions ouvertes (Partie A). Partie B ne réutilise pas les 17 visuels. Le même modal sert leçon ET certification finale.
- `LessonEvaluationGate` réutilise `AssessmentModal` complet (A+B+C) pour une *leçon* → mélange la logique certification (Partie C scénarios) dans l'évaluation de leçon. **Spec :** leçon = Partie A (QCM + ouvertes) + Partie B (widgets/visuels) ; certification finale = Partie C (≥10 scénarios scriptés) sur **page dédiée**.

**E. Bloc « Passer l'évaluation » (`LessonEvaluationGate.tsx`) — responsive cassé.**
Grille `grid-cols-[minmax(0,1fr)_auto]` fixe : sur mobile, le bouton `AssessmentModal` (label long) écrase la colonne texte → hiérarchie/espacements à revoir (empilage vertical < sm).

**F. Certification finale (`CompletionPanel`) — ouvre un modal, pas une page.**
Spec : page dédiée `/academy/analyse-fondamentale/certification`, verrouillée tant que les 5 leçons ne sont pas validées, préparée pour le futur agent. Actuellement `AssessmentModal` inline.

**G. Index des scénarios (`academy.analyse-fondamentale.tsx` l.487-495) — navigation imprécise.**
Chaque carte `Cas N` pointe vers `#macro/#micro/#outils/#previsions` (l'ancre de la LEÇON), pas vers le scénario exact. Les `renderCase` n'ont pas d'`id` par cas. **Attendu :** clic → scénario exact + regroupement par leçon + cartographie claire.

**H. Logout — absent.**
`AcademyAccountButton.tsx` : membre connecté → lien vers `/auth` uniquement. Aucun `supabase.auth.signOut()`. Pas de menu utilisateur (dropdown dispo : `src/components/ui/dropdown-menu.tsx`).

**I. Visuels — sous-exploités.**
Les 17 `.webp` (`a1…a17`) sont bien présents dans `public/academy/ch1/visuals/`. **Mais** seuls ~5 sont réellement montés dans la route (`a1`, `a2` en figure ; `a4`, `a8`, `a12` en background). Pas de Lightbox (agrandissement au clic), pas de réutilisation dans la Partie B, positionnement à confronter à `CH1_VISUAL_DNA.md` / `CH1_ASSET_MAP.md`.

**J. Liberté de navigation — OK mais à confirmer.**
Aucune leçon n'est verrouillée (navigation libre déjà possible). Seule la certification doit verrouiller. ✅ conforme dans l'esprit, à re-tester après refonte.

---

## PARTIE 1 — PLAN D'ATTAQUE MIS À JOUR (par sprints)

> Ordre = valeur/risque. Chaque sprint est atomique, testé, doc + SENTINEL mis à jour. On enchaîne tous les sprints (pas d'arrêt mi-parcours).

### SPRINT 1 — Correctifs UX chirurgicaux (faible risque, fort impact)
1. **Sidebar : ne plus fermer au clic leçon** (`LearningNavigationEngine`). Clic leçon = toggle dépliage + scroll, **reste ouverte**. Clic sous-section (feuille) = scroll + fermeture. Fermeture sinon uniquement ✕ / backdrop. Ajouter un état `expanded` découplé du scroll-spy.
2. **Hero marquee infini** (`ChapterHero` + `styles.css`). Track dupliqué (×2) animé `translateX(-50%)`, keyframe `marquee-x`, `.marquee-mask` (fondu bords), pause hover, `prefers-reduced-motion`. Responsive (vitesse via `--marquee-duration`).
3. **Responsive bloc « Passer l'évaluation »** (`LessonEvaluationGate`). Empilage vertical < sm, bouton pleine largeur mobile, hiérarchie/espacements alignés design system.
4. **Index scénarios → navigation précise** (route + `renderCase`). Ajouter `id="case-{index}"` (scroll-mt) à chaque cas ; regrouper l'index par leçon (Macro 1–3, Micro 4–5, Outils 6–8, Prévisions 9–10) ; carte → `#case-N` exact.
5. **Logout complet** (`AcademyAccountButton` → dropdown-menu). Avatar haut-droite → menu (Profil, Progression, Déconnexion) via `supabase.auth.signOut()` + invalidation. Présent aussi dans la sidebar.

### SPRINT 2 — Tableau de bord de progression (HUD + vue détaillée)
6. **Métrique unifiée** dans `useChapterProgress` : exposer un objet `dashboard` unique { leçonsValidées, leçonsRestantes, leçonsÉchouées, scénariosRéussis/restants, %chapitre, %certification, score moyen }. Éliminer les 3 métriques divergentes (garder l'usage interne, mais **une seule source affichée**).
7. **HUD sidebar (mobile + desktop)** : mini-résumé toujours visible (leçons validées x/5, % certification) + bouton « Voir ma progression » → **modal premium** (desktop) / sheet (mobile).
8. **Dashboard premium (modal/page)** inspiré Duolingo / FIFA Ultimate Team / RPG : anneaux de progression, badges par leçon, série (streak), objectifs, radar de compétences (réutilise `MacroRegimeRadar` visuel), scénarios réussis. **3 concepts desktop proposés ci-dessous (§ Partie 2) → décision requise.**
9. **Explication de la logique de validation** intégrée au HUD (« chaque leçon = 20 %, créditée à ≥70 % ; certification déverrouillée à 5/5 »).

### SPRINT 3 — Refonte des évaluations de leçon (Partie A + B)
10. **Séparer leçon vs certification.** `LessonEvaluationGate` n'ouvre plus que **Partie A + Partie B** (le modal reste le support). Partie C (scénarios) sort de l'évaluation de leçon.
11. **Banque de questions par leçon** (`evaluation-bank.ts` → structure par `lessonId`) : 7–15 items, Partie A (QCM + **questions ouvertes** auto-évaluées par mots-clés/rubrique), Partie B (lecture d'indicateurs, **graphiques + visuels a1…a17**, widgets). Scoring par partie, seuil 70 %, sauvegarde backend (`saveEvaluationAttempt` déjà en place), feedback premium, **boîte de dialogue si échec** (revoir tel bloc).
12. **Réutilisation des visuels en Partie B** : composant `VisualQuestion` (image + Lightbox + choix). Standardisé.

### SPRINT 4 — Certification finale (page dédiée, Partie C)
13. **Nouvelle route** `academy.analyse-fondamentale.certification.tsx` (page, pas modal). Verrou : inaccessible tant que 5/5 leçons non validées → écran explicatif listant précisément les leçons restantes.
14. **Partie C uniquement** : ≥10 scénarios scriptés (branche le `scenario-engine` + `scenario-library` existants, mode Evaluation avec pause pédagogique). Page **préparée pour le futur agent** (structure + slots + doc `Evaluation-System-Architecture.md`).
15. `CompletionPanel` → CTA vers la page (au lieu du modal).

### SPRINT 5 — Scenario Library Engine + mode Evaluation (branchement UI) [Prio 5 & 8]
16. Composant `ScenarioPlayer` unifié (Learning / Evaluation) consommant `assembleScenario` : Contexte → bougies → **pause pédagogique** → publication → question → 4 réponses → feedback → reprise → débrief → outcome. Réutilise `CandleReplay`.
17. Random Selection Engine branché (non-répétition), révélation par difficulté (`difficulty-engine`).

### SPRINT 6 — Visuels : Lightbox + audit positionnement [Prio visuels]
18. **Lightbox universelle** (`VisualLayer`/`VisualFigure` + Dialog) : agrandissement au clic sur **chaque** visuel du chapitre. Standardisé.
19. **Audit des 17 visuels** vs `CH1_VISUAL_DNA.md` + `CH1_ASSET_MAP.md` : monter les visuels manquants aux bons emplacements (actuellement ~5/17 en UI), corriger positions/opacités.

### SPRINT 7 — Documentation & anti-régression [Prio 6]
20. Compléter `Widget-Interaction-Guide.md` (1 fiche exhaustive/widget : rôle, inputs, lecture, piège, question-type). MAJ `CHANGELOG.md`, `SENTINEL.md`, `TASKS_CH1_IMPLEMENTATION.md`, `Scenario_Inventory.md` (repositionnement scénarios 1.1→1.5).
21. Audit Playwright multi-breakpoints final + relecture SENTINEL.

---

## PARTIE 2 — Dashboard desktop : 3 concepts UX (décision requise)

**Concept A — « Cockpit RPG » (recommandé ✅).**
Modal plein écran type fiche de personnage : à gauche un **anneau de certification** (5 segments = 5 leçons, remplis quand validés), au centre des **cartes-badges** par leçon (état, score, médaille bronze/argent/or selon %), à droite un **radar de compétences** (Macro/Micro/Outils/Prévisions/Scénarios) + **streak** et objectifs du jour. Réutilise `MacroRegimeRadar` (déjà premium) → cohérence maximale, coût faible.
*Pourquoi :* lisible d'un coup d'œil, gamifié sans surcharge, réutilise l'existant, scalable aux futurs chapitres.

**Concept B — « FIFA Ultimate Team ».**
Cartes-joueur (une par leçon) avec note globale (OVR), stats détaillées, effets de rareté selon score. Très spectaculaire mais lourd à produire et moins lisible pour la progression réelle.

**Concept C — « Duolingo Path ».**
Chemin vertical à nœuds (leçon = nœud, validé/actif/verrouillé), couronnes, ligue hebdo. Excellent pour la motivation continue mais oriente « parcours linéaire » alors que la nav est libre → léger conflit conceptuel.

**Recommandation : Concept A** (impact/effort optimal, réutilise `MacroRegimeRadar`, gamification mesurée, extensible). Mobile = même données condensées dans un sheet depuis le HUD sidebar.

---

## Anti-régression (inchangé, re-vérifié à chaque sprint)
Routes publiques ; leçons 1.1→1.6 ; tous les widgets ; sidebar/scroll-spy ; persistance invité + connectée ; accès public ; aucune couleur en dur (tokens `styles.css`) ; `prefers-reduced-motion`.

---

## Décisions à confirmer avant build
1. **Concept dashboard desktop** : valider A (recommandé) ou choisir B/C.
2. **Questions ouvertes (Partie A)** : auto-notation par mots-clés/rubrique (sans IA) — OK ?
3. **Portée immédiate** : je bascule en build mode et j'exécute Sprints 1→7 d'affilée (aucun arrêt mi-parcours), ou tu veux valider sprint par sprint ?
