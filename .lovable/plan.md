# Plan World-Class — Chapitre 1 (corrections + upscaling)

Approche chirurgicale : on ne reconstruit rien, on corrige, on remet en place ce qui était documenté mais absent, puis on industrialise. SENTINEL.md relu avant et après chaque incrément. Aucune feature réussie supprimée (déplacer / factoriser / standardiser). Tous les docs sont versionnés (jamais effacés).

Décisions verrouillées avec toi :
- Specs des 14 visuels conçues par moi (effet/position/animation/opacité/fondu/gradient), 1 markdown par visuel, emplacements réservés documentés pour les 3 manquants.
- Flèche + Sidebar Overlay = uniquement écrans sans sticky (mobile/tablette). Desktop garde sa sticky, mais on lui AJOUTE les sous-sections + tracking de progression précis.
- Macro Radar polygone (4 régimes Goldilocks/Stagflation/Récession/Expansion + implications) = nouvelle section dédiée pleine largeur dans 1.1. L'aside briefing actuel reste.
- Livraison en 2 rounds d'implémentation : Round A = corrections, Round B = upscaling. Ce plan couvre les deux + la doc globale.

---

## PHASE 1 — Corrections (Round A)

### 1. Bug navigation inférieure (1 fois sur 2)
Cause : `MobileLessonBreadcrumb` calcule prev/next à partir du `activeId` issu du scroll-spy asynchrone (IntersectionObserver + rootMargin) et navigue par `#hash` brut → course entre l'état observé et le clic.
Fix (logique seulement, design conservé) :
- Découpler la cible de navigation du scroll-spy : maintenir un index courant déterministe dans un état dédié, mis à jour au clic immédiatement, réconcilié ensuite par le scroll-spy.
- Remplacer le `href="#id"` brut par un scroll programmatique fiable (`scrollIntoView` + offset header) qui fonctionne même si le hash est identique.
- Garantir l'idempotence (re-tap sur même cible re-scrolle).

### 2. Responsive des 2 widgets récents (sélectionnés)
- `EconomicCycleWheel` : la roue SVG `h-52 w-52` + grille `lg:grid-cols-[220px_1fr]` déborde sur mobile/tablette. Fix : conteneur SVG fluide (`max-w` + `aspect-square`), grille `grid-cols-1` jusqu'à `lg`, paddings/typo responsives.
- `MacroRelationshipEngine` : `min-w-[680px]` force un scroll-x qui casse le premium. Fix : layout adaptatif (chaîne verticale empilée < `md`, horizontale scrollable ≥ `md` avec masque de fondu), suppression du débordement.
- Audit Playwright mobile (390), tablette (834), desktop (1280) avant/après.

### 3. Macro Radar — section dédiée 1.1
- Nouveau composant `MacroRegimeRadar` : radar SVG polygone (axes Croissance, Emploi, Inflation, Banques C., Liquidité, Sentiment) + toggles 4 régimes + panneau implications (Long/Short) comme Ba1.png.
- Inséré en section pleine largeur dans 1.1, l'aside barres du `MissionBriefing` conservé.

### 4. Mini-heroes (dès 1.2)
- Nouveau composant `LessonMiniHero` (réf image-5) : badge n°, « LEÇON 1.x », durée, titre, sous-titre, fil d'étapes (Concept→…→Feedback), bloc Mission Briefing (Objectifs + Question clé).
- Intégré au début des leçons 1.2 → 1.5 (1.1 = intro, exclue). Données portées dans `chapter1.ts`.

### 5. Intégration des 14 visuels (aucun visuel « posé »)
- Couche `VisualLayer` réutilisable : chaque visuel reçoit position, animation d'entrée, opacité, fondu (mask-image), gradient overlay, intégration background.
- Répartition des `a4`→`a17` dans les sections selon le Visual DNA (backgrounds atmosphériques + figures contextuelles), jamais en simple `<img>` brut.
- Emplacements réservés documentés pour les 3 visuels manquants.

### 6. Sidebar desktop — sous-sections + tracking précis
- Étendre la sticky desktop : accordéon des sous-sections par leçon, état (✓ / en cours / à faire) par sous-section, section, leçon, chapitre.
- Tracking hiérarchique : sous-section → section → leçon (20%) → chapitre (100%).

### 7. Scroll up/down bidirectionnel
- `Reveal` actuel ne se joue qu'une fois (montée). Ajouter variante bidirectionnelle (entrée + sortie douce) via Framer Motion, avec fallback `prefers-reduced-motion`.

### 8. Animation stack
- `bun add framer-motion gsap` (+ `@gsap/react`). Standardiser : Framer Motion pour overlays/reveal/interactions, GSAP pour séquences scroll premium. Espaces de respiration documentés entre leçons.

---

## PHASE 2 — Upscaling (Round B)

### 9. Learning Navigation Engine (composant réutilisable)
- Flèche discrète haut-gauche → Sidebar Overlay (mobile/tablette uniquement) : 5 leçons, accordéon sous-sections, états, progression globale, validées/restantes, sauvegarde auto. Fermeture clic extérieur / flèche.
- Nav inférieure conservée (déjà corrigée en Phase 1).

### 10. Modèle de progression V7 (5 × 20%)
- Réaligner sur la spec : 5 leçons, progression officielle créditée seulement si évaluation de leçon ≥70%. Navigation libre maintenue.
- Évaluation par leçon (Partie A QCM/ouvertes + Partie B widgets/interprétation, 7–15 questions). 1.6 devient l'index/capstone.
- Certification finale déverrouillée à 100% (5 leçons validées), 3 niveaux × 10 scénarios.
- Persistance étendue (sous-section/section/leçon) dans le backend existant.

### 11. Moteur de scénarios unique (2 modes)
- Une seule base : Mode Learning (narration continue) + Mode Evaluation (pause pédagogique → publication → question → 4 réponses → feedback → reprise → débrief).
- Réutilise `CandleReplay`/`Scenario` existants (non supprimés, factorisés).

### 12. Scenario Library Engine
- Scénario = description par composants (contexte, macro, technique, géopolitique, intermarket, banques centrales, volatilité, difficulté, paramètres). Difficulty Engine révèle plus/moins de couches selon Standard/High/Premium. Random Selection Engine pour non-répétition.

---

## Documentation à produire (versionnée, jamais effacée)
Nouveaux : `TradingView-Scenarisee-World-Class.md`, `Widget-Interaction-Guide.md`, `Learning-Navigation-Engine.md`, `Evaluation-System-Architecture.md`, `Scenario-Library-Architecture.md`, `Difficulty-Scaling-Engine.md`, `CH1_VISUAL_SPECS/` (1 .md par visuel).
Mises à jour : `PRD_CH1_WORLD_CLASS.md`, `TASKS_CH1_IMPLEMENTATION.md`, `CHANGELOG.md`, `SENTINEL.md`, `IMPLEMENTATION_ROADMAP.md` (ajout des deux rounds, sans suppression).

---

## Détails techniques
- Stack : TanStack Start + Tailwind v4 (tokens `src/styles.css`) + shadcn/ui. Ajout `framer-motion`, `gsap`, `@gsap/react`.
- Fichiers Phase 1 : `MobileLessonBreadcrumb.tsx`, `EconomicCycleWheel.tsx`, `MacroRelationshipEngine.tsx`, `primitives.tsx` (Reveal bidirectionnel + `VisualLayer`), `ChapterShell.tsx` (sous-sections sticky), `chapter1.ts` (sous-sections + métadonnées mini-hero), nouveaux `MacroRegimeRadar.tsx`, `LessonMiniHero.tsx`, route `academy.analyse-fondamentale.tsx`.
- Fichiers Phase 2 : nouveaux `LearningNavigationEngine.tsx`, `LessonAssessment.tsx`, `scenario-engine.ts`, `scenario-library.ts`, `difficulty-engine.ts` ; extension `useChapterProgress.ts` + `progress.functions.ts` + migration backend pour le tracking sous-section et évaluations par leçon (GRANT + RLS scoping `auth.uid()`).
- Qualité : aucune couleur en dur (tokens uniquement), `prefers-reduced-motion`, audits Playwright multi-breakpoints, relecture SENTINEL après chaque incrément.
- Anti-régression : routes publiques, leçons 1.1→1.6, widgets listés, sidebar/scroll-spy, modal d'évaluation, accès public, persistance invité — tous re-vérifiés.

Après approbation, j'exécute le Round A (corrections) intégralement, je mets à jour la doc + SENTINEL, puis j'enchaîne le Round B (upscaling).