# CH1_ASSET_MATRIX — Cartographie exhaustive V1 / V2 / Backgrounds

**Version** : 2026-08-17 — append-only. Source de vérité code : `src/lib/academy/visual-assets.ts`.

## 1. V2 — cours & immersion (19 fichiers, `public/academy/ch1/v2/*.webp`)

| Fichier | Rôle | Leçon | Section | Emplacement UI | Statut |
|---|---|---|---|---|---|
| macro-command-desk | hero | chapitre | — | ChapterHero | INTÉGRÉ |
| brand-logo | brand | chapitre | — | Identité / Preflight | INTÉGRÉ |
| real-economy-global-value | figure | 1.1 | intro-concept | VisualExplainerStacked | INTÉGRÉ |
| price-vs-value-iceberg | figure | 1.1 | intro-concept | VisualExplainerStacked | INTÉGRÉ |
| global-inflation-regimes-timeline | figure | 1.1 | intro-regimes | VisualExplainer | INTÉGRÉ |
| production-growth-currency-chain | figure | 1.2 | macro-concept | VisualExplainer | INTÉGRÉ |
| economic-cycle-wheel | figure | 1.2 | macro-widgets | VisualExplainer (contexte widget) | INTÉGRÉ |
| central-bank-policy-room | figure | 1.2 | macro-widgets | VisualExplainer `reverse` | INTÉGRÉ |
| nfp-release-reaction | figure | 1.2 | macro-widgets | VisualExplainer | INTÉGRÉ |
| inflation-cpi-drivers | figure | 1.2 | macro-widgets | VisualExplainer `reverse` | INTÉGRÉ |
| commodities-currency-transmission | figure | 1.2 | macro-widgets | VisualExplainer | INTÉGRÉ |
| global-trade-flows | figure | 1.2 | macro-lab | VisualExplainer | INTÉGRÉ |
| global-capital-flow-machine | figure | 1.4 | outils-concept | VisualExplainer `reverse` | INTÉGRÉ |
| energy-crisis-macro-chain | figure | 1.5 | previsions-concept | VisualExplainer | INTÉGRÉ |
| case-european-energy-crisis | figure | 1.6 | cas | ScenarioPlayer / index cas | REGISTRE |
| case-march-2020-liquidity | figure | 1.6 | cas | idem | REGISTRE |
| case-turkish-lira-collapse | figure | 1.6 | cas | idem | REGISTRE |
| case-brexit-shock | figure | 1.6 | cas | idem | REGISTRE |
| case-election-volatility | figure | 1.6 | cas | idem | REGISTRE |

## 2. Backgrounds (5 fichiers, `public/academy/ch1/backgrounds/*.webp`)

| Fichier | Usage | Opacité | Statut |
|---|---|---|---|
| bg1 | Hero chapitre | 0.12 | REGISTRE |
| bg2 | Ambiance macro | 0.10 | REGISTRE |
| bg3 | micro-concept | 0.10 | INTÉGRÉ |
| bg4 | outils-concept | 0.10 | INTÉGRÉ |
| bg5 | previsions-concept | 0.10 | INTÉGRÉ |

## 3. V1 — a1 → a17 (`public/academy/ch1/visuals/*.webp`)

Ids **immuables** : la banque Partie B (59 questions) y est adossée.

| Id | Usage cours | Usage évaluation |
|---|---|---|
| a1 | 1.2 macro-concept — VisualExplainer | Partie B |
| a2 | 1.2 macro-concept — VisualExplainer | Partie B |
| a3 | — | Partie B |
| a4 | 1.2 macro-widgets — background 0.14 | Partie B |
| a5 | — | Partie B |
| a6 | 1.3 micro-concept — VisualExplainer | Partie B |
| a7 | — | Partie B |
| a8 | 1.3 micro-widgets — background 0.12 | Partie B |
| a9 | — | Partie B |
| a10 | Hero chapitre | Partie B |
| a11 | 1.1 radar | Partie B |
| a12 | 1.4 outils-widgets — background 0.12 | Partie B |
| a13 → a16 | briefing / index cas | Partie B |
| a17 | 1.1 VisualHybridLayer | Partie B |

## 4. Règles
- Aucun fichier supprimé, aucun id renommé.
- Toute nouvelle intégration s'inscrit dans cette matrice **et** dans `docs/ch1/VISUAL_INTEGRATION_STANDARD.md`.

---

## 5. Audit réel & régénération — 2026-08-18 (append-only)

### 5.1 V1 A1 → A17 — régénérés (Brand DNA V2, zéro texte bitmap)
Les 17 fichiers `public/academy/ch1/visuals/a{1..17}.webp` ont été **régénérés** :
composition institutionnelle ultra-sombre, accent forge ambre, data cyan,
sémantique bull/bear, **aucun texte, chiffre ou label incrusté**.
Les **ids sont inchangés** — la banque Partie B (59 questions) reste valide.
Les rendus précédents sont archivés (non servis) dans
`public/academy/ch1/visuals_legacy/a{1..17}.webp`.

### 5.2 Backgrounds — 5/5 montés
| Fichier | Emplacement runtime | Opacité | Statut |
|---|---|---|---|
| bg1 | `ChapterHero` via `VisualLayer` (masque radial) | 0.12 | INTÉGRÉ |
| bg2 | Ambiance 1.2 `macro-widgets` | 0.12 | INTÉGRÉ |
| bg3 | `micro-concept` | 0.10 | INTÉGRÉ |
| bg4 | `outils-concept` | 0.10 | INTÉGRÉ |
| bg5 | `previsions-concept` | 0.10 | INTÉGRÉ |

### 5.3 V2 cas pratiques — montés dans `ScenarioPlayer`
`caseVisualFor(caseId)` (registre `visual-assets.ts`) monte le visuel V2 du cas
en tête du player, en `VisualLayer variant="figure"` (lightbox + légende) :

| Cas (market-data) | Visuel V2 |
|---|---|
| ch1-energy-crisis-eu-2022 | case-european-energy-crisis |
| ch1-covid-march-2020 | case-march-2020-liquidity |
| ch1-try-depreciation-2021-2024 | case-turkish-lira-collapse |
| ch1-brexit-2016 | case-brexit-shock |
| ch1-us-election-2016 | case-election-volatility |

Les 5 autres cas n'ont pas de V2 dédié : fallback propre (aucune image), le
player conserve `CandleReplay` + couches natives.

### 5.4 Chemins bruts éliminés
`ChapterHero` n'utilise plus de `<img>` brut ; les fonds `a4`, `a8`, `a12` de la
route chapitre passent désormais par `BACKGROUNDS` / `v1Asset()`.

### 5.5 Prompts sources
Les fiches de régénération versionnées vivent dans `docs/ch1/CH1_VISUAL_PROMPTS/` (A1 → A17 + INDEX).
