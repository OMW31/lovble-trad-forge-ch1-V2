# Visual A14 — Yield curve ambient

| Champ | Valeur |
|---|---|
| **Fichier** | `/academy/ch1/visuals/a14.webp` |
| **Statut** | RÉSERVÉ |
| **Rôle** | Yield curve ambient |
| **Placement** | 1.2 · yield curve (#macro-widgets) |
| **Variant `VisualLayer`** | `band` |
| **Opacité** | 0.08 |
| **Position** | `center` |

## Effet & intégration
- **Animation** : fade-in au scroll.
- **Fondu (mask)** : linear-gradient horizontal (band).
- **Gradient overlay** : `from-background/40 via-background/55 to-background/85` (intégration fond).
- **Jamais posé** : l'asset est toujours fondu dans le fond, jamais un `<img>` brut isolé.

## Accessibilité
- **Alt** : décoratif → `alt=""` + `role="presentation"`.

## Comportement responsive
- Mobile : opacité réduite implicitement par le mask radial, pas de débordement (`overflow-hidden` parent).
- Tablette/Desktop : pleine couverture `object-cover`, position `center`.
- `prefers-reduced-motion` : animation neutralisée (rendu statique).

## Implémentation
```tsx
<VisualLayer src="/academy/ch1/visuals/a14.webp" alt="" variant="band" opacity={0.08} position="center" />
```
