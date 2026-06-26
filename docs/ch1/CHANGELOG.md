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
