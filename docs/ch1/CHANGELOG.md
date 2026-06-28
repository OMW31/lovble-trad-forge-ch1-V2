# CHANGELOG

## 2026-06-26
### Foundations
- Lovable Cloud activé pour supporter auth, profils, progression persistée, reprise exacte et évaluations.
- Auth sécurisée configurée avec email/mot de passe et Google.
- Nouveau schéma backend créé:
  - `profiles`
  - `user_roles`
  - `chapter_progress`
  - `chapter_resume_state`
  - `evaluation_attempts`
- Fonctions et triggers de bootstrap profil créés.
- Warnings de sécurité backend corrigés immédiatement après migration.
- Première route `/auth` ajoutée pour activer la synchronisation utilisateur.
- Première modal d’évaluation indépendante ajoutée comme base du système Standard / High / Premium.
- Premier breadcrumb mobile inférieur ajouté pour la navigation CH1.
- Couche documentaire CH1 initialisée dans `docs/ch1/`.

### Rationale
- La persistance fiable ne doit plus dépendre du navigateur seul.
- Le chapitre peut rester public, mais la valeur premium doit être liée à un compte.
- Les docs deviennent la source de vérité opérationnelle avant implémentation massive.

## 2026-06-27
### Sprint progression — Foundations branchées + premier widget premium livré
- Route `/auth` désormais visible et branchée dans l’expérience CH1 via CTA header.
- Persistance CH1 reliée à la page avec chargement/sauvegarde de progression et reprise exacte pour utilisateurs connectés.
- Shell chapitre enrichi avec état connecté, bouton compte, indicateur de synchronisation et continuité de progression.
- Nouveau `MacroDashboard` livré dans la leçon 1.2 avec 11 indicateurs clés, filtres par catégorie et modal d’analyse institutionnelle.
- Nouveau dataset `macro-indicators.ts` ajouté pour structurer les indicateurs, impacts marchés et lectures beat/miss.
- Validation visuelle effectuée dans le preview: dashboard rendu, modal NFP rendue, aucun bloc cassé constaté sur la section macro.

### Rationale
- Le shell devait enfin refléter la réalité produit: compte, sync, progression persistée.
- Le bloc macro avait besoin d’un vrai command center pour atteindre le niveau institutionnel des prototypes fournis.
- La modal détaillée permet de garder une page dense sans sacrifier la profondeur pédagogique.

## 2026-06-28
### Sprint order override — S3 → S6 → S5 → S2 → S4 → S7 terminé
- Sprint 3 livré: Mission Briefing, Macro Radar, Skill Unlock Preview, progression avancée et redistribution des 10 cas dans les sections 1.2 → 1.5.
- Le bloc final “cas pratiques” ne concentre plus les replays: il devient un index de navigation anti-silo.
- Sprint 6 livré: `AssessmentModal` V2 avec banques Standard / High / Premium, Partie A QCM, Partie B widgets/dashboards, Partie C replay TradingView, score engine et seuil de validation 70%.
- Sprint 5 livré: Economic Cycle Wheel, Macro Relationship Engine, FED Reaction Simulator, NFP Interpreter, GDP/CPI Interpreters, Yield Curve Visualizer, Intermarket Correlation Map, Company Dashboard, Financial Ratios, DCF Simulator et Scenario Builder.
- Sprint 2 consolidé: mapping codebase, gaps, distribution scénarios et mapping visuels mis à jour post-build.
- Sprint 4 livré: conversion des assets `A*.png` fournis en WebP sous `public/academy/ch1/visuals/`, intégration hybride et reconstruction native des schémas prioritaires.
- Sprint 7 livré: hover premium, animations de feedback, fallback `prefers-reduced-motion`, audits desktop/tablet/mobile et optimisation Lighthouse-oriented.

### Rationale
- Le chapitre devait sortir du rendu “bonne base” pour devenir un vrai desk d’apprentissage institutionnel.
- La redistribution des scénarios évite l’effet annexe final et force l’application immédiate après chaque bloc pédagogique.
- Les visuels 4K restent exploités sans injecter de texte corrompu: image en référence immersive, contenu pédagogique en HTML/SVG natif.
- Le système d’évaluation devient un produit autonome et persistant, au lieu d’un simple bouton placeholder.
