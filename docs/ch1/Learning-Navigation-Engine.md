# Learning-Navigation-Engine

Composant réutilisable de navigation pédagogique (partageable Lovable / Bolt / Base44).

## Périmètre par breakpoint (verrouillé)
- **Desktop (lg+)** : sidebar sticky existante CONSERVÉE et ENRICHIE (sous-sections en accordéon + tracking précis par sous-section / leçon / chapitre). Pas de flèche overlay (non pertinente, la sticky est déjà là).
- **Mobile / Tablette (< lg)** : flèche discrète incrustée en haut à gauche → ouverture d'une **Sidebar Overlay** au-dessus du contenu. Fermeture par clic extérieur ou nouvelle pression sur la flèche.
- **Navigation inférieure** : conservée intégralement sur mobile/tablette (design inchangé, logique corrigée — voir CHANGELOG 2026-06-30, bug « 1 fois sur 2 »).

## Contenu de l'overlay
- 5 leçons + sous-sections (accordéon).
- État de chaque sous-section (✓ visité / actif / à faire).
- État de chaque leçon (complétée si évaluation ≥ 70 %).
- Progression globale, nombre de leçons validées, nombre restant.
- Sauvegarde automatique de la position (resume state).

## Modèle de tracking hiérarchique
```
sous-section (visitée)  →  section  →  leçon (20 %)  →  chapitre (100 %)
```
- Sous-sections suivies via IntersectionObserver (`useSubsectionSpy`, déjà en place dans `ChapterShell`).
- Une leçon n'est créditée des 20 % que si son évaluation est réussie (≥ 70 %).

## État d'implémentation
- [x] Desktop sidebar : sous-sections + tracking (Round A).
- [x] Bug nav inférieure corrigé (Round A).
- [ ] Flèche + Sidebar Overlay mobile/tablette (Round B).
- [ ] Sauvegarde auto position overlay (Round B).
