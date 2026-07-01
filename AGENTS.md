<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Comportement d'exécution — Règles de projet (CH1 World-Class)

Ces règles sont contraignantes pour tout agent travaillant sur ce projet.

1. **Ne jamais s'arrêter après un seul sprint.** Une fois la planification validée,
   exécuter l'INTÉGRALITÉ de l'implémentation : tous les sprints, toutes les tâches,
   jusqu'à ce que la dernière tâche du dernier sprint soit marquée `DONE`. Se mettre
   en boucle d'itération proactive plutôt que de rendre la main après un incrément.
2. **Ne jamais dévier du plan.** Si ce n'est pas planifié, ne pas l'exécuter.
3. **Stabilité d'abord.** Aux phases critiques, être chirurgical : avant toute
   modification, faire une mise au point des changements susceptibles de casser une
   logique, puis prendre les mesures adéquates. Ne jamais régresser, réduire ou
   rétrograder une fonctionnalité existante. On améliore, on ne supprime pas.
4. **Docs versionnées, jamais effacées.** PRD / TASKS / CHANGELOG / SENTINEL :
   on ajoute et on met à jour avec les nouvelles données pour le tracking futur ;
   on ne supprime pas l'historique.
5. **SENTINEL relu avant/après chaque incrément** pour garantir l'anti-régression.
