# Evaluation-System-Architecture

## Deux niveaux d'évaluation
1. **Évaluation de leçon** (par leçon 1.1 → 1.5)
   - Partie A : QCM + questions ouvertes.
   - Partie B : widgets / indicateurs / interprétation.
   - 7 à 15 questions. Validation ≥ 70 %.
   - Dernière sous-section de la leçon ; sa réussite est la dernière coche.
2. **Certification finale** (chapitre)
   - Uniquement des scénarios scriptés interactifs.
   - 3 niveaux : Standard / High / Premium, 10 scénarios chacun, complexité progressive.
   - Déverrouillée seulement à 100 % de progression (5 leçons validées).

## Logique de progression (V7)
- Navigation libre entre les 5 leçons (aucun blocage intra-chapitre).
- Progression officielle créditée uniquement si évaluation réussie.
- Chaque leçon = 20 %. 1 → 20, 2 → 40, 3 → 60, 4 → 80, 5 → 100.
- Une leçon est « Completed » si : toutes sous-sections parcourues + évaluation terminée + score ≥ 70 %.
- Bouton « Passer la Certification Finale » actif seulement à 100 %.

## Conséquences techniques (Round B)
- Étendre `useChapterProgress` : statut par leçon (`passed`), score, sous-sections.
- Migration backend : table/colonnes pour évaluations par leçon (RLS scoping `auth.uid()`, GRANT).
- `AssessmentModal` réutilisé pour l'éval de leçon ; certification finale = mode dédié.
- 1.6 « Exemples Pratiques » conservé comme index/capstone (pas supprimé).

## État
- [x] Modal 3 niveaux + score engine 70 % (existant).
- [ ] Évaluation par leçon branchée à la progression 5×20 % (Round B).
- [ ] Certification finale gatée à 100 % (Round B).
