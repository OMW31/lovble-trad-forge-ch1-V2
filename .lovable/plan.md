# Plan World-Class — reprise vérifiée TradForge CH1

## Objectif de livraison
Achever le Chapitre 1 en FR/EN de bout en bout sans régression : parcours public lisible, évaluations authentifiées, progression 5 × 20 %, certification externe débloquée à 100 %, banque de questions traduite, widgets et contenus pédagogiques localisés, chaîne visuelle V1/V2 documentée et vérifiée.

## Audit consolidé — état réellement prouvé

| Domaine | État vérifié | Décision |
|---|---|---|
| Infrastructure i18n | Provider, dictionnaires FR/EN, sélecteur et couche de métadonnées existent ; seuls 33 consommateurs environ sont branchés | Conserver l’architecture et finir le câblage par lots |
| Widgets macro | Plusieurs widgets visibles restent en français sans `useT()` (`MacroIndicatorLab`, `MacroRegimeRadar`, `MarketDriverVisualizer`, `EconomicCycleWheel`, `GdpCpiInterpreters`, `FedSimulator`, etc.) | P0 — namespace data/widgets macro FR/EN + formatage localisé |
| Contenu long | Le chapitre et les banques statiques contiennent encore des chaînes FR ; les cas/scénarios ont une plomberie de surcharge EN partielle | P0 — catalogue de contenu localisé, sans modifier les IDs |
| Questions | 134 questions existent ; le loader prévoit `question_translations`, mais la table a 0 traduction | P0 — migration versionnée avec 134 entrées EN et vérification runtime |
| Évaluations | Gate de leçon authentifié et certification à 5 leçons existent ; le mode legacy reste dans le composant mais n’est plus la cible de la top bar | Conserver la compatibilité, vérifier les deux parcours et les états |
| Parcours suivant | Le chapitre suivant est encore statique/verrouillé dans le hub | P0 — déverrouillage dynamique après certification réussie |
| Auth | Accès cours public et blocage des évaluations invités présents ; confirmation de mot de passe et parcours Apple manquants ; Google n’a pas le dialogue dédié attendu | P1 — compléter sans changer l’accès public |
| V1 Part B fourni | `public/academy/ch1/v1-part-b/` existe maintenant avec une série JPG partielle, séparée des 17 WebP canoniques de `visuals/` | P0 — inventaire, conversion non destructive, décision de remplacement par ID, aucun remplacement silencieux |
| V2/backgrounds | 19 V2 et 5 backgrounds canoniques sont présents et le registre les connaît ; `visuals_v2/` et `backgroound/` sont des dossiers PNG non référencés | Documenter leur statut, ne rien supprimer, éliminer les chemins directs |
| Documentation | Standard/matrice/SENTINEL existent ; `I18N_STRING_MAP.md` n’est pas confirmé dans l’état courant | P0 — cartographie i18n et entrées append-only datées |
| QA | Typecheck historique propre et anciennes validations responsive présentes ; pas de preuve récente de zéro FR en EN sur tout le chapitre | P0 — Playwright FR/EN et largeurs 390/768/1116/1440/2560 |

## Ordre d’exécution

### S0 — Consolidation et inventaire industrialisé
- Relire SENTINEL avant modification et conserver les routes, IDs, leçons, widgets, progression et assets.
- Créer la cartographie exhaustive des chaînes par namespace : shell, hub, chapter, lessons, widgets, scenarios, assessment, certification, auth, system/meta.
- Introduire une convention de contenus localisés indexés par IDs, réutilisable pour une troisième langue ; FR reste la source canonique et EN l’adaptation CFA/FT.
- Ajouter le registre d’audit des assets fournis : canonique, candidat Part B, V2, background, legacy, non référencé.

### S1 — Internationalisation complète par lots
- Compléter les dictionnaires FR/EN et leur typage pour les surfaces UI, contenu de chapitre, briefing, scénarios, certification et feedbacks.
- Localiser les widgets macro encore codés en dur et les datasets qu’ils affichent.
- Brancher les routes sur les accès localisés existants ; aucun texte utilisateur ne doit contourner la locale.
- Localiser les messages d’erreur, CTA, états vides, labels d’axes, légendes et unités ; utiliser `Intl.NumberFormat` pour les valeurs visibles.

### S2 — Banque de questions sans IA
- Produire une migration versionnée `question_translations` pour les 134 questions FR/EN, avec upsert idempotent, grants/RLS conservés et aucun seed au chargement de page.
- Ajouter un fallback statique EN contrôlé si le backend est indisponible, sans servir silencieusement du FR quand EN est demandé.
- Tester le loader et une évaluation complète en EN : prompts, choix, explications, rotation et score 30/70.

### S3 — Chaîne visuelle Partie B et standardisation
- Vérifier chaque fichier de `v1-part-b` contre les IDs a1→a17, dimensions, format, lisibilité, absence de texte pédagogique incrusté et cohérence Brand DNA.
- Convertir les candidats validés en WebP sans supprimer les sources ; ne remplacer les V1 canoniques qu’après preuve et registre explicite.
- Faire passer `VisualQuestion` et `StrategicBriefing` par `visual-assets.ts`, supprimer les chemins V1 construits en dur.
- Mettre à jour la matrice : emplacement réel, route, composant, variant, opacité, usage cours/Part B, statut de chaque asset.

### S4 — Parcours, auth et certification
- Compléter le profil initial (pseudo/nom) et la confirmation de mot de passe.
- Ajouter les états dédiés pour les fournisseurs non disponibles sans casser le provider existant.
- Garder la lecture publique ; réserver toute validation de leçon au compte connecté.
- Déverrouiller dynamiquement le chapitre suivant uniquement après réussite de la certification finale et conserver le lien vers la codebase certification existante.

### S5 — Preflight et finition responsive
- Remplacer l’entrée Preflight trop fade par une séquence premium lisible, clavier-accessible, interruptible et respectueuse de reduced motion.
- Vérifier les très grands écrans sans casser les contraintes mobiles/tablettes.

### S6 — Documentation append-only
- Ajouter `docs/ch1/I18N_STRING_MAP.md` : namespace → source → composant → priorité → statut.
- Ajouter les sections datées aux standards visuels, matrice assets, CHANGELOG, TASKS et SENTINEL ; ne rien effacer de l’historique.
- Marquer explicitement les dossiers candidats/non référencés au lieu de les supprimer.

### S7 — QA de sortie
- Playwright FR puis EN sur landing → hub → chapitre → gates → certification, avec session invitée puis authentifiée.
- Matrice 390 / 768 / 1116 / 1440 / 2560 ; vérifier overflow, overlays, labels, visuels, liens, états verrouillés et console.
- Critères de sortie : typecheck vert, routes publiques disponibles, zéro chaîne FR détectée dans les surfaces EN couvertes, aucune régression SENTINEL, documentation à jour.

## Contraintes de non-régression
- Ne pas renommer ni supprimer les IDs de leçons, sous-sections, questions ou visuels a1→a17.
- Ne pas recréer la page de certification externe dans le chapitre.
- Ne pas supprimer de contenu pédagogique ou de documentation historique.
- Ne pas rendre le chapitre privé ; seules les évaluations et la persistance utilisateur restent authentifiées.
- Relire SENTINEL avant et après chaque incrément ; valider les résultats avant de clôturer.

## Méthode de traduction industrialisée
1. Inventaire machine par catégories et IDs.
2. Catalogue FR typé comme source canonique.
3. Adaptation EN par namespace et lots cohérents.
4. Contrôle de complétude de type et détection des chaînes non cataloguées.
5. Intégration par hooks/accessors localisés, jamais par branchement dispersé.
6. QA linguistique, visuelle et responsive sur les mêmes scénarios.
