# VISUAL_INTEGRATION_STANDARD — Standard officiel d'intégration visuelle (CH1)

**Version** : 2026-08-17 — append-only, ne jamais supprimer les sections antérieures.
**Statut** : contraignant. Tout nouveau visuel intégré au produit passe par ce standard.

## 1. Doctrine V1 / V2 / Backgrounds

| Famille | Dossier | Rôle | Interdit |
|---|---|---|---|
| **V1** (`a1` → `a17`) | `public/academy/ch1/visuals/` | Évaluations **Partie B** (densité pédagogique) + usage cours ponctuel quand la densité sert la leçon | Renommer ou supprimer un id (les questions y sont adossées) |
| **V2** (nommage sémantique) | `public/academy/ch1/v2/` | Cours, leçons, hero, immersion premium | Remplacer un V1 utilisé par une question |
| **Backgrounds** (`bg1` → `bg5`) | `public/academy/ch1/backgrounds/` | Ambiance de section, opacité ≤ 0.14 | Porter de l'information |

V1 et V2 sont **complémentaires**, jamais concurrents. Aucun asset n'est supprimé.

## 2. Les trois couches obligatoires

Tout visuel porteur de sens est monté via `VisualExplainer` (`src/components/academy/VisualExplainer.tsx`) :

1. **Contexte éditorial** — `kicker` + `title` + `lead`.
2. **Image** — montée via `VisualLayer` / `VisualLightbox`, **jamais un `<img>` brut**.
3. **Couche native traduisible** — `chain` (chaîne causale), `callouts` (métriques), `reading` (lecture institutionnelle).

Règle cardinale : **le texte pédagogique ne vit jamais dans l'image**. Il vit en données typées → traduisible, responsive, accessible, indexable.

## 3. Règles techniques

- Tokens sémantiques uniquement (`text-forge`, `text-data`, `bull`, `bear`) — zéro couleur en dur.
- `min-w-0`, `text-balance`, `break-words` sur toute cellule de grille contenant du texte.
- Grilles fluides : `grid-cols-[repeat(auto-fit,minmax(min(Xrem,100%),1fr))]` plutôt que `grid-cols-N` figé.
- `prefers-reduced-motion` respecté (géré par `Reveal` / `VisualLayer`).
- Backgrounds : `variant="background"`, parent `relative overflow-hidden rounded-3xl`, contenu dans un wrapper `relative`.

## 4. Registre unique

`src/lib/academy/visual-assets.ts` est la **seule** source de vérité :
- `V2_ASSETS` — visuels de cours,
- `V2_CASE_ASSETS` — cas pratiques,
- `BACKGROUNDS` — ambiances,
- `v1Asset(id, label, alt, opts)` — fabrique un `VisualAsset` V1 sans jamais renommer l'id.

Aucun chemin d'image en dur dans une route à partir de ce standard, hors backgrounds hérités déjà documentés.
