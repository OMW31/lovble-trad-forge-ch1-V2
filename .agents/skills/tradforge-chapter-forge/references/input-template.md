# Trame d'entrée d'un chapitre

Créer `docs/chN/INPUT.md` avec ces champs. (*) = obligatoire.

```md
# Chapitre N — <Titre FR> / <Title EN> (*)
slug: <kebab-case, ex. analyse-technique> (*)
prérequis: chapitre(s) à certifier avant déblocage (*)

## Objectifs pédagogiques (*)
- 3 à 6 compétences mesurables (verbe d'action + objet + contexte de marché)

## Public & niveau
débutant | intermédiaire | avancé ; erreurs typiques de l'apprenant

## Plan des leçons (*)
N.1 Titre — sous-sections — concept clé — cas historique éventuel
… (5 leçons par défaut → 5 × 20 % de progression)

## Contenu texte source (*)
Texte intégral ou lien vers fichier dans docs/chN/

## Identité du chapitre
- métaphore visuelle / univers (ex. CH1 = salle des marchés macro)
- widgets métier envisagés (simulateurs, lecteurs, matrices)
- scénarios / cas réels marquants (dates, chiffres, sources)

## Banque d'évaluation (si fournie)
Questions Partie A (QCM/QRO) et Partie B (visuel/widget + interprétation) ; sinon l'agent les produit.

## Visuels fournis
Chemin des assets bruts ; sinon génération selon design-intelligence.md

## Contraintes spécifiques
Délais, priorités, éléments interdits, langues supplémentaires.
```

Contrôle d'intake : chaque leçon a un objectif, un contenu source et au moins un mécanisme interactif envisagé. Sinon → questions.
