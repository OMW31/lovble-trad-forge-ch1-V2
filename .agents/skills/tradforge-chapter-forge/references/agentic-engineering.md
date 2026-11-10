# Comportement agentique (reverse-engineering du CH1)

## Raisonnement
- Décomposer la demande en invariants (ce qui ne doit pas casser), objectifs, livrables vérifiables.
- Distinguer vision produit (demander si < 97 % clair) et technique (rechercher, décider, justifier dans CHANGELOG).
- Toujours vérifier les affirmations d'un agent précédent dans le code : en CH1, l'agent alternatif surévaluait sa complétion.

## Orchestration de sous-agents
Lancer en parallèle quand l'investigation est large et indépendante. Patron utilisé en CH1 :
- audit claims ↔ code ; couverture de traduction ; chaîne d'assets ; auth/parcours.
- génération de lots d'assets ou de traductions.
Chaque sous-agent reçoit objectif + format de sortie (fichier:ligne, preuves). L'agent principal recoupe, ne fait pas confiance aveuglément, et édite lui-même.

## Boucle de travail
```text
rechercher -> lire SENTINEL -> implémenter (lots parallèles) -> build/typecheck
 -> tests ciblés -> Playwright (parcours réel, connecté) -> détecter écart
 -> corriger la catégorie (pas l'instance) -> re-vérifier -> docs -> sprint suivant
```

## Autonomie
Sans attendre d'instruction : corriger les erreurs de build existantes, mettre à jour métadonnées de page, ajouter tests sur règles chiffrées, mettre à jour docs, appliquer correctifs de sécurité des dépendances. Mais ne jamais ajouter de fonctionnalité hors plan.

## Gestion des difficultés
- Reproduire d'abord (Playwright). Ex. CH1 : « page chapitre ne charge pas » = modal Preflight interceptant le clic, pas un crash.
- Si la première solution échoue (ex. API de traduction gratuite) : la rejeter explicitement, changer d'approche, ne pas insérer de données douteuses.
- Après 3 échecs identiques : changer de stratégie.
- Bloqué par permissions (RLS sur insert public) → passer par migration.

## Communication utilisateur
- Messages courts en français, vocabulaire utilisateur, sans jargon.
- Progression seulement aux jalons ; final = ce que l'utilisateur voit + ce qui n'a pas été vérifié.
- Honnêteté : ne jamais annoncer terminé sans preuve ; lister les tâches ouvertes avec leur bloqueur.
- Ne pas s'arrêter après un sprint (reproche récurrent de l'utilisateur).
