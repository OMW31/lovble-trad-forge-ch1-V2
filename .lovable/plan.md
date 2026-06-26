# Plan d’implémentation — TradForge Academy CH1 World-Class V2

## Objectif
Passer du prototype actuel à une version world-class de Chapitre 1, sans casser l’architecture pédagogique existante, en procédant dans cet ordre:

```text
Documentation de pilotage
→ Audit & cartographie
→ Fondations Cloud/progression
→ Refactor structurel CH1
→ Système visuel hybride
→ Widgets & dashboards premium
→ Évaluation 3 niveaux
→ Motion / mobile / QA
```

## Principes non négociables
- Ne pas reconstruire le chapitre from scratch.
- Ne pas supprimer de contenu pédagogique validé.
- Ne pas créer de nouvelles sections de cours.
- Déplacer, enrichir, densifier, illustrer, animer.
- Toute nouvelle feature doit être documentée et ajoutée au registre anti-régression.
- Les visuels 4K seront intégrés en mode hybride: image-support pour ambiance/composition, reconstruction native HTML/SVG pour tout contenu pédagogique où le texte doit être net, responsive et interactif.

## Ce qui sera livré
### 1. Couche documentation / pilotage
Je crée et maintiens les documents de référence suivants avant et pendant l’implémentation:
- `PRD_CH1_WORLD_CLASS.md`
- `TASKS_CH1_IMPLEMENTATION.md`
- `CHANGELOG.md`
- `SENTINEL.md`
- `CH1_ASSET_MAP.md`
- `CH1_GAP_ANALYSIS.md`
- `CH1_SCENARIO_DISTRIBUTION.md`
- `CH1_VISUAL_DNA.md`
- `CH1_ANIMATION_SYSTEM.md`
- `CH1_INTERACTION_SYSTEM.md`
- `CH1_COMPONENT_LIBRARY.md`

### 2. Couche backend / persistance
Comme tu veux progression + reprise exacte + profils complets, j’active Lovable Cloud et je mets en place:
- Authentification
- Table `profiles`
- Table de rôles séparée `user_roles`
- Table de progression CH1
- Table d’état de reprise exacte (section, widget, niveau d’évaluation, scénario, etc.)
- Table de tentatives / scores d’évaluation
- Server functions sécurisées pour lecture/écriture de progression
- Reprise automatique de session d’apprentissage

### 3. Couche expérience CH1
Implémentation séquentielle jusqu’au dernier bloc demandé:
- Hero V2 avec Mission Briefing
- Hero Macro Radar animé
- Progress tracking avancé
- Persistence utilisateur + reprise exacte
- Redistribution des scénarios dans les bonnes sections
- Macro Dashboard institutionnel
- NFP Calculator
- DCF Simulator
- Financial Ratios
- Economic Scenarios
- Scenario Builder
- Mobile breadcrumb inférieur
- Scroll UX bidirectionnel
- Animation system
- Interaction system
- Nouveau système d’évaluation indépendant en modal, avec niveaux Standard / High / Premium

## Séquence d’implémentation

## Phase 0 — Documentation & contrôle
Créer la couche de pilotage avant code massif.

### Livrables
- PRD consolidé CH1
- backlog exécutable priorisé
- changelog décisionnel
- sentinel anti-régression
- matrice d’audit existant vs cible

### Résultat attendu
Une base documentaire qui permet de tracer tout ce qui existe, ce qui manque, ce qui est modifié et ce qui ne doit jamais être cassé.

## Phase 1 — Audit réel du Chapter 1 actuel
Cartographier précisément l’existant déjà codé.

### Audit à produire
- Hero
- Sidebar
- Progress tracker
- Lessons 1.1 → 1.6
- Scenarios existants
- Widgets existants
- Replay / TradingView-like views
- Animations / reveals
- Composants de shell
- Données `market-data.ts`
- Design tokens / styles

### Résultat attendu
- `CH1_ASSET_MAP.md`
- `CH1_GAP_ANALYSIS.md`
- classification: Implemented / Partial / Missing / Deprecated

## Phase 2 — Audit visuel 4K hybride
Traiter les visuels fournis comme matière première, pas comme vérité finale.

### Travail
- audit complet de tous les visuels fournis
- vérification cohérence pédagogique
- vérification cohérence graphique
- vérification des textes intégrés
- classification: Conserver / Modifier / Régénérer / Supprimer
- mapping section → visuel

### Décision d’intégration
- Les visuels à texte corrompu ne seront pas injectés tels quels dans le contenu pédagogique principal.
- Ils serviront soit de références de composition, soit de fonds d’ambiance.
- Les schémas-clés seront reconstruits en composants natifs premium.

### Pipeline assets
- format final standardisé
- pipeline PNG → WebP
- convention de nommage
- tailles desktop/tablet/mobile
- règles de lazy loading

## Phase 3 — Fondations Cloud
Activer Lovable Cloud puis poser la base data/auth.

### Backend prévu
- auth utilisateur
- profils complets
- rôles séparés
- progression chapitres
- reprise exacte d’état
- scoring / certifications

### Règles de sécurité
- RLS partout
- rôles dans table séparée
- server functions sécurisées
- aucune logique de progression fiable côté client seul

## Phase 4 — Refactor structurel CH1
Réorganiser le chapitre sans casser sa logique pédagogique.

### Travail
- Hero Rebuild
- Mission Briefing
- Macro Radar
- Progress Tracker avancé
- Skill Unlock Preview
- redistribution des 10 scénarios dans 1.1 → 1.5
- suppression du poids du bloc final trop concentré
- nettoyage de sections / hiérarchies / densité

### Résultat attendu
Architecture V2, plus lisible, plus fluide, plus premium.

## Phase 5 — Visual system premium
Construire un langage visuel homogène “institutionnel immersif”.

### Travail
- intégrer l’ADN TradingView/Bloomberg/terminal de manière cohérente
- remplacer les zones trop simples par des surfaces premium denses
- créer la couche illustration/infographie native
- uniformiser spacing, ombres, cards, couleurs, typographie
- supprimer les éléments qui cassent le niveau perçu

### Reconstruction native prioritaire
- Inflation transmission mechanism
- Macro engine / economic cycle wheel
- Central bank decision logic
- Corporate value creation engine
- Energy crisis cascade

## Phase 6 — Dashboard & widget system
Passer d’une suite de widgets à un vrai système d’analyse institutionnel.

### Bloc macro
- Macro Dashboard (étendu jusqu’au format cible 11 indicateurs)
- CPI Interpreter
- NFP Interpreter / Calculator
- GDP Interpreter
- Macro Relationship Engine
- FED / central bank reaction engine
- Yield Curve Visualizer
- Intermarket Correlation Map
- Economic Scenarios

### Bloc micro / valorisation
- Company Dashboard
- Company Health Score
- Balance Sheet Explorer
- Earnings Impact Simulator
- PE / valuation explorer
- Financial Ratios
- DCF Simulator

### Bloc prévision
- Scenario Builder
- Probability Engine
- Regime Detector
- Decision Lab

## Phase 7 — Nouveau système d’évaluation
Créer une couche indépendante de la page leçon.

### Format
Modal indépendante, non imbriquée directement dans le flux de lecture.

### 3 niveaux
- Standard
- High
- Premium

### Pour chaque niveau
- Partie A: QCM
- Partie B: widgets / indicateurs / dashboards
- Partie C: TradingView scénarisé

### Système associé
- score engine
- unlock logic
- persistance des tentatives
- reprise exacte du niveau en cours

## Phase 8 — Motion, interaction, scroll UX
Ajouter la sensation “living experience”.

### Travail
- scroll down reveals
- scroll up behavior symétrique
- animation system cohérent
- hover system premium
- micro-interactions de feedback
- animation spécifique des scénarios
- hero radar animé
- interactions contextualisées sur dashboards

## Phase 9 — Mobile & responsive system
Rendre le chapitre premium sur mobile sans compromis.

### Travail
- mobile breadcrumb inférieur
- comportement sticky intelligent
- densité adaptée petit écran
- relecture des headers complexes avec patterns robustes
- validation tablet / desktop / mobile

## Phase 10 — QA & Sentinel loop
Boucle de contrôle qualité à chaque incrément.

### Contrôle systématique après chaque implémentation
- vérifier les features listées dans `SENTINEL.md`
- mettre à jour `CHANGELOG.md`
- mettre à jour `SENTINEL.md` si nouvelle feature
- vérifier non-régression visuelle et fonctionnelle

### QA finale
- mobile audit
- tablet audit
- desktop audit
- performance audit
- accessibility audit
- consistency audit
- Lighthouse target > 90 sur les critères critiques

## Détails techniques
- Frontend: TanStack Start + React 19 + Tailwind v4
- Persistance: Lovable Cloud
- Auth: comptes utilisateurs avec profils complets
- Sécurité: RLS + `user_roles` séparée + server functions sécurisées
- Assets: pipeline WebP + lazy loading + intégration hybride
- Composants pédagogiques à texte dense: HTML/SVG natif, pas image brute
- Évaluation: système modal piloté par données persistées
- Progression: stockage section + sous-état + scores + dernier point exact

## Ordre de build recommandé
```text
1. Documentation de pilotage
2. Audit + gap analysis + sentinel initial
3. Cloud + auth + profils + progression
4. Refactor shell + hero + tracking + reprise
5. Redistribution scénarios
6. Audit visuel + pipeline assets
7. Dashboards macro/micro/prévision
8. Evaluation engine modal 3 niveaux
9. Motion + scroll + mobile breadcrumb
10. QA + sentinel final + polish
```

## Premier incrément que j’exécuterai après validation du plan
```text
Sprint 1
- Activer Lovable Cloud
- Créer les docs de pilotage
- Produire Asset Map / Gap Analysis / Scenario Distribution
- Créer Sentinel.md
- Poser le schéma profils + rôles + progression + reprise
```

## Critère de succès
Le prototype suivant doit être non seulement plus beau, mais surtout mieux piloté, persisté, auditable, extensible, et impossible à faire régresser silencieusement.