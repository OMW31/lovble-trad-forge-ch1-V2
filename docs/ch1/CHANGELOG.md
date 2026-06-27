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
