# CH1_VISUAL_SPECS — Index des visuels

Spécification détaillée par visuel (effet, position, animation, opacité, fondu, gradient, alt, responsive).
Tous les visuels passent par le composant `VisualLayer` (`src/components/academy/primitives.tsx`) — aucun visuel n'est « posé » en `<img>` brut.

## Catalogue (14 disponibles : a4 → a17)
| Visuel | Statut | Placement |
|---|---|---|
| [A4](A4.md) | INTÉGRÉ | 1.2 · groupe widgets macro (#macro-widgets) |
| [A5](A5.md) | RÉSERVÉ | 1.2 · command center (#macro-dashboard) |
| [A6](A6.md) | RÉSERVÉ | 1.3 · intro micro (#micro-concept) |
| [A7](A7.md) | RÉSERVÉ | 1.4 · intro outils (#outils-concept) |
| [A8](A8.md) | INTÉGRÉ | 1.3 · groupe widgets micro (#micro-widgets) |
| [A9](A9.md) | RÉSERVÉ | 1.5 · intro prévisions (#previsions-concept) |
| [A10](A10.md) | RÉSERVÉ | Hero chapitre (ChapterHero) |
| [A11](A11.md) | RÉSERVÉ | 1.1 · section radar (#intro-regimes) |
| [A12](A12.md) | INTÉGRÉ | 1.4 · groupe widgets outils (#outils-widgets) |
| [A13](A13.md) | RÉSERVÉ | 1.2 · intermarket (#macro-widgets) |
| [A14](A14.md) | RÉSERVÉ | 1.2 · yield curve (#macro-widgets) |
| [A15](A15.md) | RÉSERVÉ | 1.5 · planificateur (#previsions-planner) |
| [A16](A16.md) | RÉSERVÉ | 1.6 · index cas (#cas-pratiques-index) |
| [A17](A17.md) | INTÉGRÉ | 1.1 · visual hybrid layer (VisualHybridLayer) |

## Emplacements réservés (3 visuels à fournir)
Trois visuels supplémentaires sont attendus (réf. « 17 visuels » partagés en chat). Slots réservés et documentés :
- **RESERVED-1** → 1.1 hero secondaire / bandeau d'ouverture chapitre.
- **RESERVED-2** → 1.2 bandeau de transition audit-analyse-reporting.
- **RESERVED-3** → 1.6 clôture capstone / certification.

Dès réception : déposer en `public/academy/ch1/visuals/`, créer le `.md` de spec, brancher via `VisualLayer`, puis mettre à jour `SENTINEL.md`.
