# CH1_VISUAL_PROMPTS — Index des prompts de génération v2

Version : 2026-08-18 — Statut : prompt v2 prêt pour tous les visuels a1 → a17.

Ce dossier contient un fichier de prompt de génération par visuel (`A1.md` … `A17.md`), construit à partir de :
- `docs/PLAN&AUDIT/TradForge_Branding_Logo_DNA.md` (bloc `TRADFORGE BRAND DNA V2`, palette OKLCH, do/don't)
- `docs/ch1/CH1_VISUAL_DNA.md` (direction artistique du chapitre)
- `docs/ch1/CH1_VISUAL_SPECS/A{n}.md` (intention pédagogique et intégration runtime existantes, conservées et affinées)
- `docs/ch1/CH1_ASSET_MATRIX.md` (emplacements runtime actuels)
- `src/lib/academy/visual-assets.ts` (registre des assets)

## Catalogue

| Visuel | Titre | Leçon | Sous-section | Composant | Statut |
|---|---|---|---|---|---|
| [A1](A1.md) | Écosystème macroéconomique | 1.2 | macro-concept | VisualExplainer | prompt v2 prêt |
| [A2](A2.md) | Hiérarchie du signal macro | 1.2 | macro-concept | VisualExplainer | prompt v2 prêt |
| [A3](A3.md) | Matrice de transmission fondamentale | 1.2 | macro-concept | VisualExplainer | prompt v2 prêt |
| [A4](A4.md) | Terminal macro — densité de données | 1.2 | macro-widgets | VisualLayer (background) | prompt v2 prêt |
| [A5](A5.md) | Atmosphère de la grille de données | 1.2 | macro-dashboard | VisualLayer (band) | prompt v2 prêt |
| [A6](A6.md) | Registre comptable institutionnel | 1.3 | micro-concept | VisualLayer (band) | prompt v2 prêt |
| [A7](A7.md) | Trousse d'outils de valorisation | 1.4 | outils-concept | VisualLayer (band) | prompt v2 prêt |
| [A8](A8.md) | Densité du bilan | 1.3 | micro-widgets | VisualLayer (background) | prompt v2 prêt |
| [A9](A9.md) | Horizon de prévision | 1.5 | previsions-concept | VisualLayer (band) | prompt v2 prêt |
| [A10](A10.md) | Atmosphère du centre de contrôle | Hero chapitre | chapter-hero | ChapterHero / VisualLayer (background) | prompt v2 prêt |
| [A11](A11.md) | Radar des régimes — ambiance | 1.1 | intro-regimes | VisualLayer (band) | prompt v2 prêt |
| [A12](A12.md) | Densité de la trousse d'outils | 1.4 | outils-widgets | VisualLayer (background) | prompt v2 prêt |
| [A13](A13.md) | Toile intermarché | 1.2 | macro-widgets | VisualLayer (band) | prompt v2 prêt |
| [A14](A14.md) | Ambiance courbe des taux | 1.2 | macro-widgets | VisualLayer (band) | prompt v2 prêt |
| [A15](A15.md) | Planification de scénarios | 1.5 | previsions-planner | VisualLayer (background) | prompt v2 prêt |
| [A16](A16.md) | Bande historique | 1.6 | cas-pratiques-index | VisualLayer (band) | prompt v2 prêt |
| [A17](A17.md) | Carte institutionnelle | 1.1 | intro-regimes | VisualHybridLayer | prompt v2 prêt |

## Doctrine

- **Ids immuables.** `a1` → `a17` sont référencés par la banque de 59 questions Partie B : aucun id n'est renommé, aucun fichier n'est supprimé, même en cas de régénération d'image.
- **Zéro texte pédagogique incrusté.** Seul le logo TradForge (bloc `TRADFORGE BRAND DNA V2`) peut porter de la typographie dans le bitmap. Tout titre, légende, callout, chiffre ou libellé pédagogique vit exclusivement dans la couche native HTML/SVG (`VisualExplainer`, `VisualLayer`, `VisualHybridLayer`).
- **Structure de prompt systématique.** Chaque prompt de génération suit l'ordre imposé : `[TRADFORGE BRAND DNA V2]` → `Scene Description` → `Composition` → `Educational Intent` → `Lighting` → `Camera` → `Color Palette` → `Material Rendering` → `Post Processing`, suivi d'un `Negative Prompt` dédié.
- **Palette sémantique stricte.** Ambre forge = commandement/accent, cyan data = capteurs/lecture, vert bull / rouge bear = réaction de marché uniquement (jamais décoratifs), fonds toujours oklch très sombres, jamais blancs, jamais de dégradés violet/indigo.
- **Cadrage universel.** Ratio 16:9, zone de sécurité centrale, lisibilité garantie de 390px à 2560px, aucun élément critique dans les 8 % de bord.
- **Intention pédagogique conservée.** L'intention de chaque visuel reprend et affine — sans jamais la contredire — celle déjà documentée dans `docs/ch1/CH1_VISUAL_SPECS/A{n}.md`.
- **Aucun autre fichier modifié.** Ce dossier est un ajout pur ; les specs, la matrice d'assets et le registre de code restent la source de vérité opérationnelle.
