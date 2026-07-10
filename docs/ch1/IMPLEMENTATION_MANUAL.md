# Implementation Manual — TradForge CH1

**Version** : 2026-07-10  
**Audience** : Futurs agents, contributeurs techniques  
**Prérequis** : Avoir lu `AGENTS.md`, `Elite_Behavior.md`, `docs/INDEX.md`

---

## 1. Philosophie d'implémentation

### Règles d'or
1. **Lire SENTINEL.md avant/après** chaque modification
2. **Append-only docs** (PRD, TASKS, CHANGELOG, SENTINEL)
3. **Chirurgical** : améliorer sans casser (`extend`, pas `replace`)
4. **Type safety** : TS strict, zéro `any`, discriminated unions
5. **Composition** : factoriser patterns (WidgetFrame, VisualLayer, Reveal)
6. **Accessibility** : `prefers-reduced-motion`, ARIA, keyboard nav

### Anti-patterns à éviter
- ❌ Supprimer features existantes (régression SENTINEL)
- ❌ Couleurs en dur (utiliser tokens Tailwind v4)
- ❌ Animations sans `prefers-reduced-motion` fallback
- ❌ `<img>` brut (toujours wrapper `VisualLayer`)
- ❌ Copier-coller code (factoriser composant réutilisable)
- ❌ Types `any` (utiliser generics ou discriminated unions)

---

## 2. Stack technique

### Core
- **Framework** : TanStack Start v1.167+ (React SSR)
- **Router** : TanStack Router (file-based, type-safe)
- **Styling** : Tailwind v4 (tokens CSS natifs OKLCH)
- **UI** : shadcn/ui (46 primitives Radix headless)
- **Animation** : Framer Motion v12 + GSAP v3.15
- **Backend** : Supabase (auth, progression, RLS)
- **State** : TanStack Query + hooks custom

### Outils build
- **Build** : Vite v8
- **TypeScript** : v5.8 strict mode
- **Linter** : ESLint v9
- **Formatter** : Prettier v3

---

## 3. Architecture projet

### Structure fichiers
```
src/
├── components/
│   ├── ui/              46 primitives shadcn (Button, Dialog, Slider...)
│   └── academy/         38 composants métier (widgets + shell + navigation)
├── lib/
│   └── academy/         10 modules business logic (3056 lignes)
├── routes/              5 routes (file-based routing)
├── integrations/
│   └── supabase/        Auth + types générés
└── hooks/               Custom hooks React
```

### Conventions nommage
- **Composants** : PascalCase (`MacroDashboard`, `VisualLayer`)
- **Fonctions** : camelCase (`assembleScenario`, `scoreQuestions`)
- **Constantes** : UPPER_SNAKE_CASE (`LESSON_PART_WEIGHTS`, `MACRO_INDICATORS`)
- **Fichiers** : kebab-case (`scenario-engine.ts`, `visual-question-bank.ts`)

---

## 4. Patterns de composition

### WidgetFrame (wrapper universel)
```typescript
<WidgetFrame
  title="Market Driver Visualizer"
  subtitle="Chaîne de transmission macro"
  badge="Premium"
  onHelpClick={() => setGuideOpen(true)}
>
  {/* Contenu widget */}
</WidgetFrame>
```

**Règle** : Tous les widgets doivent utiliser `WidgetFrame`. Pas de carte custom.

### VisualLayer (intégration assets)
```typescript
// Background (fond section)
<VisualLayer
  src="/academy/ch1/visuals/a4.webp"
  alt="Macro Dashboard"
  variant="background"
  opacity={0.3}
/>

// Figure (illustration inline)
<VisualLayer
  src="/academy/ch1/visuals/a12.webp"
  alt="Yield Curve"
  variant="figure"
  label="Courbe inversée 2Y>10Y"
  className="max-w-3xl mx-auto"
/>
```

**Règle** : Jamais `<img>` brut. Toujours wrapper `VisualLayer` (opacity, mask, gradient, animation).

### Reveal (scroll animations)
```typescript
<Reveal delay={100}>
  <ConceptCard title="Driver macro">...</ConceptCard>
</Reveal>
```

**Règle** : Tous blocs pédagogiques wrapped dans `<Reveal>` (bidirectionnel, `prefers-reduced-motion`).

---

## 5. Design System Forge

### Tokens sémantiques (OKLCH)
```css
/* Couleurs primaires */
--forge: oklch(0.8 0.15 75);      /* Ambre Bloomberg signature */
--bull: oklch(0.7 0.15 145);      /* Vert marchés haussiers */
--bear: oklch(0.65 0.18 25);      /* Rouge marchés baissiers */
--data: oklch(0.75 0.17 195);     /* Cyan accent technique */

/* Surfaces */
--background: oklch(0.13 0.01 75);
--surface: oklch(0.16 0.01 75);
--surface-2: oklch(0.19 0.01 75);

/* Texte */
--foreground: oklch(0.95 0.01 75);
--muted-foreground: oklch(0.58 0.02 75);
```

**Règle** : Aucune couleur en dur. Utiliser tokens sémantiques uniquement.

### Typography
- **Display** : Space Grotesk (titres, widgets)
- **Body** : Manrope (paragraphes, UI)
- **Code** : JetBrains Mono (valeurs, tickers)

### Shadows
```css
shadow-elegant: 0 2px 8px oklch(0 0 0 / 0.08), 0 1px 4px oklch(0 0 0 / 0.04);
shadow-glow: 0 0 24px oklch(0.8 0.15 75 / 0.25);
```

---

## 6. Animations

### Framer Motion (standard)
```typescript
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.18 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.div>
```

### Prefers-reduced-motion (obligatoire)
```typescript
const reduce = useReducedMotion();

if (reduce) {
  return <div>{children}</div>; // Statique
}

return <motion.div {...animations}>{children}</motion.div>;
```

**Règle** : Toute animation doit respecter `prefers-reduced-motion`. Utilisateurs avec motion sickness ne voient aucun mouvement.

### GSAP (animations complexes)
Utilisé pour timelines, parallax, ticker. Installer `@gsap/react` pour hooks React.

---

## 7. Gestion d'état

### TanStack Query (server state)
```typescript
const { data, isLoading } = useQuery({
  queryKey: ["chapter-progress", chapterId],
  queryFn: () => fetchProgress(chapterId),
});
```

### Local State (React hooks)
```typescript
const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
const [guideOpen, setGuideOpen] = useState(false);
```

### Persistence
- **Invité** : localStorage (`tradforge:progress:v7`, `tradforge:visualbank:rotation:v1`)
- **Connecté** : Supabase (`chapter_progress`, `evaluation_attempts`)

---

## 8. Backend Supabase

### Tables principales
- `profiles` : profils utilisateurs
- `chapter_progress` : progression par chapitre
- `chapter_resume_state` : reprise exacte (lesson_id, section_id, scroll_anchor)
- `evaluation_attempts` : tentatives évaluations (partA/B/C_answers, scores)

### RLS (Row Level Security)
Toutes les tables utilisent `auth.uid()` scoping. Exemple :
```sql
CREATE POLICY "Users can read own progress"
ON chapter_progress FOR SELECT
USING (auth.uid() = user_id);
```

### Types générés
```typescript
// Généré par Supabase CLI
import type { Database } from "@/integrations/supabase/types";
type Progress = Database["public"]["Tables"]["chapter_progress"]["Row"];
```

---

## 9. Responsive strategy

### Breakpoints
```typescript
// Mobile: < 640px (sm)
// Tablet: 640-1024px (md, lg)
// Desktop: ≥ 1024px (lg, xl, 2xl)
```

### Patterns adaptatifs
```tsx
// Navigation
<div className="hidden lg:block">{/* Sidebar sticky desktop */}</div>
<div className="lg:hidden">{/* Sidebar overlay mobile */}</div>

// Widgets
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {widgets.map(...)}
</div>

// Typography
<h1 className="text-2xl sm:text-3xl lg:text-4xl">Titre</h1>
```

---

## 10. Workflow développement

### 1. Avant implémentation
- [ ] Lire `SENTINEL.md` (features protégées)
- [ ] Lire `.lovable/plan.md` ou `TASKS` (sprints actifs)
- [ ] Analyser composants impactés
- [ ] Produire plan d'exécution

### 2. Implémentation
- [ ] Créer/modifier fichiers (respect conventions nommage)
- [ ] Utiliser patterns existants (WidgetFrame, VisualLayer, Reveal)
- [ ] Type safety strict (zéro `any`)
- [ ] Accessibility (prefers-reduced-motion, ARIA, keyboard nav)
- [ ] Responsive (mobile first, breakpoints Tailwind)

### 3. Vérification
- [ ] Typecheck : `npm run build` (ou `tsc --noEmit`)
- [ ] Linter : `npm run lint`
- [ ] QA visuelle : Desktop / Tablet / Mobile
- [ ] Tests SENTINEL (9 vérifications procédure)
- [ ] Relecture SENTINEL après modification

### 4. Documentation
- [ ] MAJ `CHANGELOG.md` (append-only, date + rationale)
- [ ] MAJ `SENTINEL.md` (si nouvelle feature structurelle)
- [ ] MAJ `TASKS_CH1_IMPLEMENTATION.md` (statuts `[x]`)
- [ ] MAJ docs spécifiques si nécessaire

---

## 11. Exemples patterns avancés

### Discriminated unions (états complexes)
```typescript
type ScenarioMode =
  | { type: "Learning"; continuous: true }
  | { type: "Evaluation"; pauseBefore: "decision" };

function playScenario(mode: ScenarioMode) {
  if (mode.type === "Learning") {
    // TS sait que mode.continuous existe
  } else {
    // TS sait que mode.pauseBefore existe
  }
}
```

### Function composition
```typescript
// Scenario Engine
const assembleScenario = (spec: ScenarioSpec, level: DifficultyLevel) => {
  const layers = revealLayers(spec, level);      // Difficulty Engine
  const barem = difficultyBarem(level);          // Paramètres
  return { ...spec, layers, barem };
};
```

### Inversion of control (callbacks)
```typescript
<AssessmentModal
  onPassed={() => markLessonPassed(lessonId)}
  onClose={() => setModalOpen(false)}
/>
```

---

## 12. Debugging

### Console errors
- Typecheck : `tsc --noEmit` (ou build)
- Linter : `npm run lint`
- Runtime : Ouvrir DevTools, vérifier console

### SENTINEL check
Si une feature listée ne marche plus :
1. Lire derniers commits (`git log`)
2. Identifier changement responsable
3. Corriger dans le même run (anti-régression)
4. MAJ `CHANGELOG.md` avec correction

### Performance
- Lighthouse DevTools (>90 cible)
- React DevTools Profiler (re-renders excessifs)
- Network tab (assets lourds)

---

## 13. Contribution guidelines

### Pull requests
- Branche : `feature/nom-feature` ou `fix/nom-bug`
- Commit : `feat: ajout WidgetGuide carrousel (F2)` (conventional commits)
- Description : Référencer sprint/task (`F2 — Guides widgets`)

### Review checklist
- [ ] SENTINEL lu avant/après
- [ ] Typecheck OK
- [ ] Linter OK
- [ ] QA Desktop/Tablet/Mobile OK
- [ ] Docs MAJ (CHANGELOG, SENTINEL si nécessaire)
- [ ] Aucune régression détectée

---

## 14. Resources

### Documentation interne
- `AGENTS.md` : Gouvernance projet
- `Elite_Behavior.md` : ADN agents fondateurs
- `docs/INDEX.md` : Orientation documentation
- `SENTINEL.md` : Anti-régression
- `CHANGELOG.md` : Historique releases
- `WIDGET_ENCYCLOPEDIA.md` : Référence widgets (ce document)

### Documentation externe
- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind v4](https://tailwindcss.com/docs/v4-beta)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/docs)

---

## Conclusion

Ce manuel est la **référence technique complète** pour tout agent travaillant sur TradForge. Respecter ces patterns garantit maintenabilité, scalabilité et qualité production.

**Contact** : Pour questions techniques ou clarifications vision, consulter `.lovable/plan.md` ou AGENTS.md (règle 3 : ≥97% compréhension avant agir).
