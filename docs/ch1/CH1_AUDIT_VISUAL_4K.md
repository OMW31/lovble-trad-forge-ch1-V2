# CH1_AUDIT_VISUAL_4K

## Politique d’intégration
Mode hybride uniquement.

## Décision générale
- Les compositions sont fortes.
- Une partie du texte intégré est corrompue / bruitée / non exploitable.
- Les schémas pédagogiques doivent donc être reconstruits nativement.
- Pipeline WebP appliqué aux assets `A4` → `A17` fournis.
- Intégration V2: les WebP servent de références immersives; les explications pédagogiques restent natives.

## Cadre
### Conserver
- compositions macro de type carte / machine / pipeline comme référence de hiérarchie
- images TradingView comme référence de densité et d’annotation

### Modifier
- toute image utilisée en couverture si besoin de recadrage / compression / WebP

### Régénérer / reconstruire
- infographies avec labels, chiffres, titres, citations ou texte pédagogique

### Supprimer du flux principal
- visuels trop bruités si leur texte est indispensable à la compréhension

## Assets intégrés — 2026-06-28
- Source: `A4.png` → `A17.png`
- Destination: `public/academy/ch1/visuals/a4.webp` → `a17.webp`
- Usage initial: `VisualHybridLayer` dans le haut du chapitre
- Règle: ne jamais utiliser le texte incrusté dans ces images comme source pédagogique primaire
