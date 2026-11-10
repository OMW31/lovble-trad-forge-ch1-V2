# Architecture, QA & récupération

## Conventions techniques
- TanStack Start v1, routes fichiers `src/routes/academy.<slug>.tsx` (+ `.certification` si lien), `head()` unique par route (title, description, og:*, twitter:card).
- Séparation UI / logique (`src/lib/academy/*`) / données ; TypeScript strict, zéro `any`, unions discriminées.
- Backend : Lovable Cloud ; RLS + GRANT sur chaque table ; écriture de données de référence par migration ; server functions avec auth middleware pour progression.
- Ne jamais éditer les fichiers auto-générés (client, types, .env, config).

## Pourquoi peu de bugs en CH1
Composition (wrappers uniques), registre unique d'assets, données hors composants, docs/SENTINEL relus, vérification Playwright systématique, changements additifs.

## Incidents CH1 → garde-fous
| Incident | Cause | Garde-fou |
|---|---|---|
| Widgets cassés sur mobile | largeurs fixes / overflow | audit 390–2560 px chaque sprint |
| Chapitre « ne charge pas » | modal bloquant le clic | test de clic hub → chapitre |
| FR dans l'éval EN | réponse tardive + littéraux | locale explicite, latest-request-wins, rg littéraux |
| Traductions mixtes | outils bas de gamme | validation auto + 2e relecteur avant insertion |
| Chemins d'images à la main | contournement registre | rg des chemins `/academy/` hors registre |
| Bouton top-bar vers éval archaïque | ancien point d'entrée gardé | test du parcours certification |
| Évals ouvertes aux invités | gate manquant | test invité → CTA connexion |

## Quality Gate (avant toute validation)
1. Pédagogique : chaque leçon = texte + visuel + widget + scénario + éval ; objectifs couverts.
2. Technique : build OK, `bunx tsgo --noEmit`, `bunx vitest run` verts.
3. Mathématique : tests unitaires sur pondérations, seuils, progression (valeurs concrètes).
4. Linguistique : gate de bilingual-production.md.
5. Fonctionnelle (Playwright, session connectée) : hub → chapitre → leçons → 5 évals FR et EN → 100 % → certification → déblocage ; invité bloqué aux évals.
6. Responsive : 390/768/1116/1440/2560 sans débordement horizontal.
7. SENTINEL : aucune feature listée cassée ; nouvelles features ajoutées.
