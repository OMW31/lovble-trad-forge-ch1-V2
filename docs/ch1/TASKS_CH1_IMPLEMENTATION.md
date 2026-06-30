# TASKS_CH1_IMPLEMENTATION

## Statut
Document opératoire de build séquentiel.

## Sprint 1 — Foundations
- [x] Lovable Cloud activé
- [x] Schéma profils / rôles / progression / reprise / évaluations créé
- [x] Google auth configuré
- [x] Documentations de pilotage créées
- [x] Route `/auth` branchée dans l’expérience
- [x] Persistance CH1 branchée à la page
- [x] Hero / shell mis à jour avec état connecté

## Sprint 2 — Audit & Mapping
- [x] CH1_ASSET_MAP complété depuis la codebase réelle
- [x] CH1_GAP_ANALYSIS complété
- [x] CH1_SCENARIO_DISTRIBUTION verrouillé
- [x] Audit 4K assets verrouillé
- [x] Mapping visuels → sections validé

## Sprint 3 — Structural Upgrade
- [x] Mission Briefing
- [x] Hero Macro Radar
- [x] Progress Tracker avancé
- [x] Skill Unlock Preview
- [x] Suppression du poids du bloc cas pratiques final
- [x] Redistribution scénarios 1 → 10 dans 1.1 → 1.5

## Sprint 4 — Visual Hybrid Layer
- [x] Pipeline PNG → WebP
- [x] Standardisation noms / tailles / formats
- [x] Reconstruction native des schémas prioritaires
- [x] TradingView DNA harmonisé
- [x] Uniformisation cards / spacing / ombres / typo / couleurs

## Sprint 5 — Widget Expansion
- [x] Macro Dashboard 11 indicateurs
- [x] Economic Cycle Wheel
- [x] Macro Relationship Engine
- [x] FED Simulator
- [x] NFP Calculator / Interpreter
- [x] GDP / CPI interpreters
- [x] Yield Curve Visualizer
- [x] Intermarket Correlation Map
- [x] Company Dashboard
- [x] Financial Ratios
- [x] DCF Simulator
- [x] Scenario Builder

## Sprint 6 — Evaluation System
- [x] Modal indépendante créée
- [x] Question banks Standard / High / Premium
- [x] Partie A/QCM branchée
- [x] Partie B/widgets branchée
- [x] Partie C/TradingView branchée
- [x] Score engine complet
- [x] Unlock logic 70 / 70 / 70

## Sprint 7 — Motion / Mobile / QA
- [x] Scroll up/down system
- [x] Hover system premium
- [x] Feedback animations
- [x] Mobile breadcrumb inférieur
- [x] Tablet audit
- [x] Desktop audit
- [x] Mobile audit
- [x] Lighthouse optimization

## Versioning — 2026-06-28 Sprint order override exécuté
Ordre demandé appliqué: Sprint 3 → Sprint 6 → Sprint 5 → Sprint 2 → Sprint 4 → Sprint 7.

### Notes d’implémentation
- Sprint 3: ajout Mission Briefing, Macro Radar, Skill Unlock Preview, réduction du bloc final en index navigable, redistribution intégrale des 10 cas dans 1.2 → 1.5.
- Sprint 6: AssessmentModal V2 avec banques Standard/High/Premium, parties A/B/C, replay TradingView, score engine et seuil 70%.
- Sprint 5: ajout des widgets prioritaires listés: cycle, relationship engine, FED, NFP, GDP/CPI, yield curve, intermarket, company dashboard, ratios, DCF, scenario builder.
- Sprint 2: docs de mapping mises à jour après implémentation réelle.
- Sprint 4: pipeline WebP appliqué aux visuels fournis et couche hybride native ajoutée.
- Sprint 7: hover premium, feedback animations, reduced-motion fallback et audits de rendu effectués en contrôle local.

## Règle d’exécution
Toujours mettre à jour `CHANGELOG.md` et `SENTINEL.md` après chaque incrément significatif.

## Versioning — 2026-06-30 · Round A (Corrections) livré
- [x] Bug navigation inférieure corrigé (logique déterministe, design conservé)
- [x] Responsive `EconomicCycleWheel` + `MacroRelationshipEngine`
- [x] Macro Radar polygone (régimes + implications) en section 1.1
- [x] Mini-heroes leçons 1.2 → 1.5
- [x] Sidebar desktop : sous-sections + tracking précis
- [x] Scroll bidirectionnel (Framer Motion) + reduced-motion
- [x] `VisualLayer` + 1re passe d'intégration des visuels (a4/a8/a12/a17)
- [x] Stack animation installée (framer-motion, gsap, @gsap/react)
- [x] Documentation globale produite (visual specs + 6 docs d'architecture)

## Backlog — Round B (Upscaling) à exécuter
- [ ] Learning Navigation Engine : flèche + Sidebar Overlay (mobile/tablette uniquement)
- [ ] Progression V7 : 5 leçons × 20 %, créditées sur évaluation ≥ 70 %
- [ ] Évaluation par leçon (Partie A QCM/ouvertes + Partie B widgets) branchée à la progression
- [ ] Certification finale gatée à 100 % (3 niveaux × 10 scénarios)
- [ ] Moteur de scénarios unique (Learning + Evaluation avec pause pédagogique)
- [ ] Scenario Library + Scenario Engine + Difficulty Engine + Random Selection
- [ ] Fiches widget individuelles (Widget-Interaction-Guide)
- [ ] Intégration des 3 visuels manquants + extension des fonds (a5/a6/a7/a9/a10/a11/a13/a14/a15/a16)
- [ ] Migration backend tracking sous-section + évaluations par leçon (RLS + GRANT)
