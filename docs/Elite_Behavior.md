# Elite Behavior — Signature Agents Fondateurs

## Origine
Ce document capture la méthode, le pragmatisme et la façon de penser des agents qui ont construit TradForge CH1 V2 de zéro jusqu'à production-ready en 14 jours (2026-06-26 → 2026-07-09).

## Principe cardinal : Dire plus avec peu de mots

### Dans le code
- Nommage explicite : `MacroDashboard`, `assembleScenario`, `LESSON_PART_WEIGHTS`
- Zéro commentaire inutile ; le code self-documented par types/noms
- Composition > duplication : `WidgetFrame` wrap 25 widgets, `VisualLayer` wrap 17 assets
- Discriminated unions : `mode: "Learning" | "Evaluation"` (pas de flag booléen ambigu)

### Dans la doc
- CHANGELOG : date + bullets + rationale (3-5 lignes max/release)
- SENTINEL : checklist pure (verbes d'action, zéro prose)
- TASKS : `[x]` + description 1 ligne
- Widget Guides : objectif → lecture → interaction → piège (4 lignes/widget)

## Anti-répétition systématique

### Architecture
- **Scenario Library** : specs réutilisables (pas 30 scénarios dupliqués, mais 30 specs assemblées)
- **Evaluation Bank** : banques partagées avec rotation (pas de copier-coller questions)
- **VisualLayer** : composant unique pour 17 assets 4K (pas 17 implémentations `<img>`)
- **WidgetFrame** : wrapper universel (header + badge + body) réutilisé partout

### Docs
- Append-only strict : ajouter révisions datées, jamais réécrire historique
- Cross-références : `CH1_VISUAL_SPECS/INDEX.md` → A1.md → A17.md (single source of truth)
- Standards réutilisables : `docs/STANDARDS/` pour patterns cross-chapitres

## Prototypage + Itération continue

### Rythme
- 7 releases majeures en 14 jours
- Sprints atomiques numérotés (S1-S7, F1-F13)
- Corrections chirurgicales (Round A/B) sans casser existant
- Features additives : `extend useChapterProgress`, pas `replace`

### Méthode
1. Plan détaillé avant implémentation (analyse impact + risques régression)
2. Exécution complète sans arrêt intermédiaire (boucle proactive)
3. Anti-régression systématique (SENTINEL avant/après)
4. Documentation immédiate (CHANGELOG + SENTINEL + TASKS mis à jour dans le même commit)

## Rigueur WORLD-CLASS

### Type Safety
- TypeScript strict mode, zéro `any`
- Types générés Supabase (schema → TS automatique)
- Discriminated unions pour états complexes
- Generics exhaustifs : `ScenarioSpec<T>`, `QuestionBank<K>`

### Accessibilité
- `prefers-reduced-motion` respecté partout (Reveal, VisualLayer, hover)
- ARIA labels complets (modals, tabs, accordions)
- Focus rings customisés (`ring-forge`)
- Keyboard navigation (Escape, Tab, Enter)
- Touch targets ≥ 44px

### Performance
- Lazy loading routes (`React.lazy`)
- Viewport detection (`IntersectionObserver` via Framer Motion)
- Memoization stratégique (`useMemo`, `useCallback`)
- Asset optimization (WebP + lazy + preconnect fonts)
- Lighthouse >90 maintenu

## SOTA & Premium

### Design System
- Tokens CSS natifs Tailwind v4 (OKLCH, aucune couleur en dur)
- Animations physiques (Framer Motion spring)
- Visuels 4K WebP (pipeline conversion batch)
- Terminologie finance institutionnelle (beat/miss, surprise consensus, invalidation)

### Architecture
- TanStack Start (SSR React) + Router (file-based type-safe)
- Supabase (auth + progression + RLS scoping)
- shadcn/ui (46 primitives Radix headless)
- Separation of concerns : UI / Logic / Data

## Anti-régression obsessionnelle

### SENTINEL.md
- 42 features protégées listées
- Checklist relue avant/après chaque incrément
- Procédure de contrôle post-implémentation (9 vérifications)
- MAJ immédiate si nouvelle feature structurelle

### Tests empiriques
- Typecheck strict (`tsc --noEmit`)
- Audit Playwright (390/834/1280, zéro overflow)
- Lighthouse-oriented (fonts preconnect, lazy loading)
- QA manuelle Desktop/Tablet/Mobile

## Philosophie décisionnelle

### Vision produit
- Ne jamais supposer : poser questions jusqu'à ≥97 % clarté
- Si ambiguïté >3 %, bloquer et demander précision
- Rationale explicite dans CHANGELOG pour chaque pivot

### Technique
- Benchmark + best practices + concurrence avant décision structurante
- Préférer standards éprouvés (Radix, TanStack, Tailwind) aux solutions custom
- Extension progressive : valider MVP avant features avancées

### Exécution
- Chirurgical : améliorer sans casser (`extend`, pas `replace`)
- Atomique : 1 sprint = 1 objectif clair = 1 commit
- Proactif : boucle d'itération jusqu'au dernier sprint planifié

## Signature reconnaissable

### Dans les commits
```
2026-07-09 — Run-up final (F1 + F12)
### F1 · Refonte évaluation de leçon (pondération 30/70)
- `evaluation-bank.ts` : `LESSON_PART_WEIGHTS` (A=30 %, B=70 %)
- Seuil pondéré : score global ≥ 70 %

### F12 · Visual Question Bank Engine
- Nouveau `visual-question-bank.ts` : rotation anti-répétition
- Fondation prête à scaler vers 20-50 questions/visuel
```

### Dans le code
```typescript
// Pattern composition avancée
export const WidgetFrame = ({ badge, children }: WidgetFrameProps) => (
  <div className="border-border/50 bg-surface rounded-lg border p-4">
    {badge && <span className="text-xs">{badge}</span>}
    {children}
  </div>
);

// Type safety discriminated union
type ScenarioMode = 
  | { type: "Learning"; continuous: true }
  | { type: "Evaluation"; pauseBefore: "decision" };
```

### Dans la doc
```md
## 2026-07-01 · Round B (Upscaling) livré
- [x] Learning Navigation Engine : flèche + Sidebar Overlay (< lg)
- [x] Progression V7 : 5 leçons × 20 %, gatée par évaluation ≥ 70 %
- [x] Moteur de scénarios unique (Learning + Evaluation)

### Rationale
Navigation mobile exigeait overlay non bloquant. Progression créditée uniquement sur validation réelle (anti-gaming).
```

## Transmission aux futurs agents

Ce document est le **manuel d'ADN Elite**. Tout agent travaillant sur TradForge doit :

1. **Lire ce fichier en premier** (avant toute implémentation massive)
2. **Respecter les patterns** (composition, type safety, anti-répétition)
3. **Écrire dans le même style** (concis, précis, opérable)
4. **Maintenir la rigueur** (SENTINEL, append-only, anti-régression)
5. **Continuer l'excellence** (SOTA, premium, institutionnel)

La signature Elite n'est pas négociable. Elle garantit maintenabilité, scalabilité et qualité production.
