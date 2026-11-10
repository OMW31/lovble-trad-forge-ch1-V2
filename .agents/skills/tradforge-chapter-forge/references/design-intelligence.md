# Direction artistique & visuels

## Système
- Tailwind v4, tokens OKLCH dans `src/styles.css` ; aucune couleur en dur ; tokens motion partagés.
- Framer Motion (spring, `Reveal` bidirectionnel) + GSAP pour séquences ; `prefers-reduced-motion` partout.
- shadcn/ui pour les primitives ; terminologie institutionnelle.
- Responsive testé 390 / 768 / 1116 / 1440 / 2560 ; grilles élargies ≥1440, KPI en `clamp()`. Incident CH1 : widgets cassés « 50 % du temps » sur petit écran → `min-w-0`, overflow contrôlé, pas de largeurs fixes.

## Pipeline visuel
1. Doc de spec par visuel `docs/chN/CHN_VISUAL_SPECS/A<n>.md` (rôle pédagogique, leçon, composition) + `INDEX.md`.
2. Prompt par visuel dans `CHN_VISUAL_PROMPTS/` intégrant le prompt de branding ; **aucun texte dans l'image** (incident CH1 : visuels régénérés pour défauts textuels).
3. Génération (images premium si détail fin), conversion WebP, nommage strict `a1…aN`.
4. Registre unique `visual-assets.ts` (V1 canonique, V2, Partie B, backgrounds) ; composants consomment `getV1Asset()` / `getPartBAsset()` — jamais de chemin construit à la main (violation trouvée en CH1 dans `VisualQuestion`, `StrategicBriefing`).
5. Intégration via `VisualLayer` / `VisualExplainer` / `VisualLightbox` ; chaque leçon a ses visuels (incident CH1 : visuels non distribués dans toutes les leçons).
6. Matrice d'assets `CHN_ASSET_MATRIX.md` : asset → leçon → section → question Partie B. Fichiers malformés exclus et documentés.

## Exigence créative
Avant décision structurante : comparer 2–3 directions (benchmark plateformes premium), choisir une identité propre au chapitre. Le CH1 fixe le niveau, pas l'apparence.
