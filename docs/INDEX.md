# TradForge CH1 V2 — Index Documentation

**Version** : Production-ready (post run-up final 2026-07-09)  
**Branche** : AgentZ  
**Dernière mise à jour** : 2026-07-10

---

## Orientation générale

Cette documentation est la **source de vérité opérationnelle** du projet TradForge Academy Chapitre 1. Chaque fichier a un rôle précis. Tout agent doit savoir **où regarder** et **pourquoi**.

---

## 📂 Structure par dossier

### `docs/IMPLEMENTATION/` — Sources de vérité opérationnelles

| Fichier | Rôle | Quand le lire |
|---------|------|---------------|
| **PRD_CH1_WORLD_CLASS.md** | Vision produit, objectifs, périmètre, contraintes | Avant toute implémentation massive |
| **TASKS_CH1_IMPLEMENTATION.md** | Plan d'exécution séquentiel (S1-S7, F1-F13), statuts | Vérifier sprints restants/complétés |
| **SENTINEL.md** | Registre anti-régression (42 features protégées) | **OBLIGATOIRE avant/après chaque incrément** |
| **CHANGELOG.md** | Historique complet (2026-06-26 → 2026-07-09) | Comprendre évolution projet |
| **IMPLEMENTATION_ROADMAP.md** | Roadmap long terme | Planifier futures phases |

**Pertinence** : Ces fichiers définissent **quoi faire**, **pourquoi** et **comment vérifier** qu'on ne casse rien.

---

### `docs/STANDARDS/` — Architectures réutilisables cross-chapitres

| Fichier | Rôle | Quand le lire |
|---------|------|---------------|
| **Scenario-Library-Architecture.md** | Système de specs assemblables (pas de duplication) | Avant modifier `scenario-library.ts` |
| **Difficulty-Scaling-Engine.md** | Révélation couches Standard/High/Premium | Avant toucher `difficulty-engine.ts` |
| **Evaluation-System-Architecture.md** | Évaluation leçon (A+B) vs certification (C) | Avant modifier modal ou progression |
| **Learning-Navigation-Engine.md** | Sidebar Overlay + breadcrumb | Avant toucher navigation |
| **TradingView-Scenarisee-World-Class.md** | Intégration TradingView | Avant ajouter cas pratiques |
| **Scenario_Inventory.md** | Inventaire 10 cas historiques | Référence données scénarios |

**Pertinence** : Ces patterns doivent être **réutilisés** dans CH2, CH3... CHN. Ne pas réinventer.

---

### `docs/ch1/` — Spécificités Chapitre 1

| Fichier | Rôle | Quand le lire |
|---------|------|---------------|
| **CH1_ASSET_MAP.md** | Inventaire routes/composants/widgets/visuels/backend | Comprendre structure projet |
| **CH1_WIDGET_SYSTEM.md** | Philosophie widgets (objectif, driver, manipulation) | Avant créer/modifier widget |
| **CH1_COMPONENT_LIBRARY.md** | Primitives réutilisables (Reveal, VisualLayer, WidgetFrame) | Avant créer composant |
| **CH1_VISUAL_DNA.md** | Design system Forge (tokens, shadows, typography) | Avant ajouter styles |
| **CH1_ANIMATION_SYSTEM.md** | Standards animations (Framer Motion, GSAP, reduced-motion) | Avant animer |
| **CH1_INTERACTION_SYSTEM.md** | Règles feedback/hover/transitions | Avant ajouter interactions |
| **CH1_AUDIT_VISUAL_4K.md** | Pipeline WebP, intégration assets | Avant ajouter visuels |
| **CH1_SCENARIO_DISTRIBUTION.md** | Répartition 10 cas dans leçons 1.2-1.5 | Vérifier placement scénarios |
| **CH1_GAP_ANALYSIS.md** | Audit existant vs cible (Round A/B) | Comprendre itérations passées |
| **Widget-Interaction-Guide.md** | Fiches par widget (objectif/lecture/interaction/piège) | Comprendre usage widget |

**Pertinence** : Ces docs définissent **l'identité visuelle et fonctionnelle** du chapitre.

---

### `docs/ch1/CH1_VISUAL_SPECS/` — Spécifications par visuel

| Fichier | Rôle |
|---------|------|
| **INDEX.md** | Table des matières A1-A17 + statuts (intégré/réservé) |
| **A1.md → A17.md** | Spec par visuel (nom, type, taille, emplacement, objectif pédagogique) |

**Pertinence** : Avant intégrer/modifier un visuel, lire sa spec pour comprendre **où**, **pourquoi** et **comment**.

---

### `docs/PLAN&AUDIT/` — Rapports planification et audit

| Fichier | Rôle |
|---------|------|
| **2026-07-10_AUDIT_CODEBASE_DEEPSCAN.md** | Audit complet post-restructuration docs |
| *Futurs audits...* | Rapports par run-up |

**Pertinence** : Historique des audits garantit traçabilité décisions techniques.

---

### `.lovable/plan.md` — Plan actif

**Rôle** : Sprints F1-F13 en cours/à venir. Dépendances F8-F11 bloquées (attente docs/assets).

**Quand le lire** : Avant démarrer nouveau sprint. Vérifier statuts et dépendances.

---

## 📄 Fichiers racine

| Fichier | Rôle | Quand le lire |
|---------|------|---------------|
| **AGENTS.md** | Gouvernance projet (règles exécution, conventions, philosophie Elite) | **OBLIGATOIRE avant tout travail** |
| **Elite_Behavior.md** | ADN agents fondateurs (méthode, pragmatisme, signatures) | Comprendre façon de penser/agir |
| **README.md** | Point d'entrée projet (à créer si absent) | Onboarding nouveaux contributeurs |

---

## 🎯 Workflows recommandés

### Avant implémentation massive
1. Lire `AGENTS.md` (gouvernance)
2. Lire `Elite_Behavior.md` (méthode)
3. Lire `PRD_CH1_WORLD_CLASS.md` (vision)
4. Lire `SENTINEL.md` (anti-régression)
5. Lire `.lovable/plan.md` (sprints actifs)
6. Produire analyse impact + plan d'exécution

### Avant modifier un widget
1. Lire `CH1_WIDGET_SYSTEM.md` (philosophie)
2. Lire `Widget-Interaction-Guide.md` (fiche widget)
3. Lire `CH1_COMPONENT_LIBRARY.md` (primitives réutilisables)
4. Vérifier `SENTINEL.md` (widget listé = protégé)

### Avant ajouter un visuel
1. Lire `CH1_VISUAL_SPECS/INDEX.md` (statuts)
2. Lire spec visuel (ex: `A5.md`)
3. Lire `CH1_AUDIT_VISUAL_4K.md` (pipeline WebP)
4. Utiliser `VisualLayer` (jamais `<img>` brut)

### Avant modifier scénarios
1. Lire `Scenario-Library-Architecture.md` (système specs)
2. Lire `Difficulty-Scaling-Engine.md` (couches)
3. Lire `CH1_SCENARIO_DISTRIBUTION.md` (répartition)
4. Vérifier `scenario-library.ts` (specs existantes)

### Avant modifier évaluations
1. Lire `Evaluation-System-Architecture.md` (leçon vs certification)
2. Vérifier `evaluation-bank.ts` (banques existantes)
3. Vérifier `visual-question-bank.ts` (questions visuels)
4. Tester pondération 30/70 (leçon) et 70/70/70 (certification)

### Après chaque incrément
1. Relire `SENTINEL.md` (vérifier 42 features intactes)
2. Mettre à jour `CHANGELOG.md` (append-only, date + rationale)
3. Mettre à jour `TASKS_CH1_IMPLEMENTATION.md` (statuts `[x]`)
4. Typecheck (`tsc --noEmit`)
5. QA Desktop/Tablet/Mobile

---

## 🚨 Règles absolues

1. **SENTINEL.md lu avant/après chaque incrément** (non négociable)
2. **Docs append-only** (jamais supprimer historique)
3. **Ne pas dévier du plan** (si non planifié, demander validation)
4. **Chirurgical** (améliorer sans casser, extend pas replace)
5. **Type safety** (TS strict, zéro any)
6. **Accessibility** (prefers-reduced-motion, ARIA, keyboard nav)

---

## 📊 Métriques projet (état actuel)

- **116 fichiers** TS/TSX
- **46 composants** UI (shadcn)
- **38 composants** academy
- **25 widgets** interactifs
- **17 visuels** 4K WebP
- **10 modules** business logic (3056 lignes)
- **42 features** protégées (SENTINEL)
- **7 releases** majeures (2026-06-26 → 2026-07-09)

---

## 🎓 Pour nouveaux agents

**Ordre de lecture recommandé** :
1. `AGENTS.md` — gouvernance
2. `Elite_Behavior.md` — méthode
3. `docs/INDEX.md` — ce fichier
4. `PRD_CH1_WORLD_CLASS.md` — vision
5. `SENTINEL.md` — anti-régression
6. `.lovable/plan.md` — sprints actifs
7. `CH1_ASSET_MAP.md` — structure projet

**Puis** : docs spécifiques selon tâche (widgets, visuels, scénarios, évaluations).

---

**Index maintenu par** : Agents TradForge  
**Prochaine mise à jour** : Après exécution F2-F7
