# Visual A16 — Historical tape

| Champ | Valeur |
|---|---|
| **Fichier** | `/academy/ch1/visuals/a16.webp` |
| **Statut** | RÉSERVÉ |
| **Rôle** | Historical tape |
| **Placement** | 1.6 · index cas (#cas-pratiques-index) |
| **Variant `VisualLayer`** | `band` |
| **Opacité** | 0.1 |
| **Position** | `center` |

## Effet & intégration
- **Animation** : mask horizontal, fade-in.
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
<VisualLayer src="/academy/ch1/visuals/a16.webp" alt="" variant="band" opacity={0.1} position="center" />
```
