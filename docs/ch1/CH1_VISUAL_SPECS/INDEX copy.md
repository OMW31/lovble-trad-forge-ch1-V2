# CH1_VISUAL_SPECS — Index des visuels

Spécification détaillée par visuel (effet, position, animation, opacité, fondu, gradient, alt, responsive).
Tous les visuels passent par le composant `VisualLayer` (`src/components/academy/primitives.tsx`) — aucun visuel n'est « posé » en `<img>` brut.

## Catalogue (17 disponibles : a1 → a17)
| Visuel | Statut | Placement |
|---|---|---|
| [A1](A1.md) | INTÉGRÉ | 1.2 · concept macro + Partie B |
| [A2](A2.md) | INTÉGRÉ | 1.2 · concept macro + Partie B |
| [A3](A3.md) | INTÉGRÉ | 1.2 · concept macro + Partie B |
| [A4](A4.md) | INTÉGRÉ | 1.2 · groupe widgets macro (#macro-widgets) |
| [A5](A5.md) | INTÉGRÉ | 1.2 · command center (#macro-dashboard) |
| [A6](A6.md) | INTÉGRÉ | 1.3 · intro micro (#micro-concept) |
| [A7](A7.md) | INTÉGRÉ | 1.4 · intro outils (#outils-concept) |
| [A8](A8.md) | INTÉGRÉ | 1.3 · groupe widgets micro (#micro-widgets) |
| [A9](A9.md) | INTÉGRÉ | 1.5 · intro prévisions (#previsions-concept) |
| [A10](A10.md) | INTÉGRÉ | Hero chapitre (ChapterHero) |
| [A11](A11.md) | INTÉGRÉ | 1.1 · section radar (#intro-regimes) |
| [A12](A12.md) | INTÉGRÉ | 1.4 · groupe widgets outils (#outils-widgets) |
| [A13](A13.md) | INTÉGRÉ | 1.2 · intermarket (#macro-widgets) |
| [A14](A14.md) | INTÉGRÉ | 1.2 · yield curve (#macro-widgets) |
| [A15](A15.md) | INTÉGRÉ | 1.5 · planificateur (#previsions-planner) |
| [A16](A16.md) | INTÉGRÉ | 1.6 · index cas (#cas-pratiques-index) |
| [A17](A17.md) | INTÉGRÉ | 1.1 · visual hybrid layer (VisualHybridLayer) |

## Check-out 2026-07-05
- Les 17 visuels a1→a17 sont présents sous `/academy/ch1/visuals/`.
- Les visuels sont montés via `VisualLayer` ou `VisualLightbox` ; les questions Partie B référencent désormais a1→a17.
- Les anciens slots réservés sont clos par A1/A2/A3.
