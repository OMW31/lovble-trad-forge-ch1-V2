# Visual A10 — Mission control atmosphere

| Champ | Valeur |
|---|---|
| **Fichier** | `/academy/ch1/visuals/a10.webp` |
| **Statut** | RÉSERVÉ |
| **Rôle** | Mission control atmosphere |
| **Placement** | Hero chapitre (ChapterHero) |
| **Variant `VisualLayer`** | `background` |
| **Opacité** | 0.12 |
| **Position** | `center top` |

## Effet & intégration
- **Animation** : fade-in au mount + grid overlay.
- **Fondu (mask)** : radial-gradient (background).
- **Gradient overlay** : `from-background/40 via-background/55 to-background/85` (intégration fond).
- **Jamais posé** : l'asset est toujours fondu dans le fond, jamais un `<img>` brut isolé.

## Accessibilité
- **Alt** : décoratif → `alt=""` + `role="presentation"`.

## Comportement responsive
- Mobile : opacité réduite implicitement par le mask radial, pas de débordement (`overflow-hidden` parent).
- Tablette/Desktop : pleine couverture `object-cover`, position `center top`.
- `prefers-reduced-motion` : animation neutralisée (rendu statique).

## Implémentation
```tsx
<VisualLayer src="/academy/ch1/visuals/a10.webp" alt="" variant="background" opacity={0.12} position="center top" />
```
