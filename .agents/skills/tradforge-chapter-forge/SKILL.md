---
name: tradforge-chapter-forge
description: Produit un chapitre complet de l'académie TradForge (CH2–CH5) de bout en bout à partir de sa documentation et de son contenu texte, en reproduisant puis dépassant la méthode du Chapitre 1 (Analyse Fondamentale) — leçons, widgets, visuels, scénarios, évaluations Partie A/B, gamification, progression, bilinguisme FR/EN et quality gate. Utiliser dès qu'on demande de créer, auditer, étendre ou industrialiser un chapitre TradForge, ou de reproduire le comportement de l'agent qui a construit le CH1.
---

# TradForge Chapter Forge — Master Skill

Moteur de production d'un chapitre. Deux volets indissociables :
1. **WHAT & HOW TO PRODUCE** — pédagogie, contenus, visuels, évaluations, gamification, bilinguisme.
2. **HOW THE AGENT OPERATES** — raisonnement, orchestration, boucles build/test/correction, communication.

Le CH1 est un **socle, pas un plafond** : extraire les méthodes, pas figer les solutions. Chaque chapitre garde son identité propre (contexte, enjeux, scénarios).

## Entrée attendue
Le livrable d'entrée suit `references/input-template.md`. Si un champ obligatoire manque ou si la compréhension de la vision < 97 %, poser les questions (outil questions) avant de planifier. Pour un doute technique : rechercher, ne pas demander.

## Pipeline (ne jamais s'arrêter en cours)

```text
0 INTAKE   lire input + AGENTS.md + docs/Elite_Behavior.md + SENTINEL + CHANGELOG
1 AUDIT    comparer input ↔ CH1 (ce qui se réutilise / s'adapte / est nouveau)
2 PLAN     sprints atomiques numérotés -> .lovable/plan.md -> validation utilisateur
3 BUILD    boucle par sprint : SENTINEL avant -> implémenter -> vérifier -> corriger -> SENTINEL après -> docs
4 GATE     quality gate complète (references/qa-recovery.md)
5 SHIP     docs append-only + résumé court à l'utilisateur
```

Une fois le plan validé : exécuter **tous** les sprints jusqu'au dernier `DONE`, dans l'ordre demandé. Rien hors plan. Une tâche reste ouverte uniquement si elle attend quelque chose d'impossible à fournir (crédit, réponse, accès) — la nommer avec son bloqueur.

## Modules (lire ceux qui concernent la tâche)

| Module | Fichier |
|---|---|
| Trame d'entrée standardisée | `references/input-template.md` |
| Architecture pédagogique, pondérations, gamification | `references/learning-architecture.md` |
| Production bilingue FR/EN | `references/bilingual-production.md` |
| Direction artistique, visuels, animations | `references/design-intelligence.md` |
| Comportement agentique (raisonnement, sous-agents, autonomie, communication) | `references/agentic-engineering.md` |
| Architecture technique, builds, tests, incidents, récupération | `references/qa-recovery.md` |
| Versioning & documentation append-only | `references/versioning-docs.md` |

## Invariants non négociables
- Non-régression : `extend`, jamais `replace` ; ne jamais réduire une feature existante.
- IDs stables (leçons, sous-sections, questions, visuels `aN`) — jamais renommés après publication.
- Cours en lecture publique ; évaluations de leçon réservées aux connectés ; certification = codebase externe (ne jamais la recréer).
- Tout texte visible passe par le dictionnaire i18n ou le contenu localisé — zéro littéral FR codé en dur.
- Couleurs uniquement via tokens sémantiques de `src/styles.css`.
- Docs PRD/TASKS/CHANGELOG/SENTINEL : append-only, sections datées.
- Ne jamais déclarer « fait » sans preuve exécutée dans le tour (typecheck, tests, Playwright).
