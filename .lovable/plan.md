# TradForge CH1 — Plan ultime de mise en production

## Audit vérifié de la planification précédente

| Domaine | Promesse documentaire | État réel vérifié | Verdict |
|---|---|---|---|
| i18n FR/EN | Architecture + niveaux 1 et 4 complets | Le provider et le switch existent, mais le switch n’est monté que sur `/academy`. Le chapitre, ses widgets, scénarios, évaluations, progression, certification et auth restent presque entièrement codés en français. Aucun `I18N_STRING_MAP.md` n’existe. | **Très partiel** |
| Questions traduites | Table + loader par locale | 75 questions A et 59 questions B sont bien en base. La table de traductions contient **0 ligne** ; en anglais, le loader restitue donc le français. | **Backend présent, contenu absent** |
| Bouton évaluation top bar | Accès cohérent à la certification | La top bar ouvre encore `AssessmentModal` sans `lessonId`, donc le diagnostic hérité **Standard / High / Premium**. Le panneau de fin et la route dédiée utilisent le parcours 5 leçons → certification. | **Deux parcours contradictoires** |
| Évaluations de leçon | Réservées aux comptes connectés | `LessonEvaluationGate` ouvre actuellement l’évaluation pour les invités et affiche seulement une note de sauvegarde. | **Non conforme** |
| Certification | Déblocage après 5/5 leçons validées | La règle 5 × 20 % est bien calculée. Le cockpit et le panneau final affichent des données utiles, mais la top bar ne pointe pas vers eux et plusieurs textes hérités promettent encore 3 niveaux. | **Logique correcte, UX incohérente** |
| Visuels V2 | Cours et immersion | 19 V2 sont enregistrés ; 12 figures V2 sont effectivement montées dans le cours. Les 5 visuels de cas sont enregistrés mais non montés dans `ScenarioPlayer`. | **Partiel** |
| Backgrounds | 5 fonds distribués | `bg3`, `bg4`, `bg5` sont montés. `bg1` et `bg2` sont seulement enregistrés ; le hero et le bloc macro utilisent encore des V1 en fond. | **3/5 montés** |
| V1 A1→A17 | Régénération Brand DNA, zéro texte fautif | Les 17 anciens WebP sont toujours servis. Aucun dossier legacy, aucun lot pilote régénéré et aucun prompt final par asset n’existent. | **Non exécuté** |
| Cartographie visuelle | Matrice exhaustive avec placements et contraintes | La matrice actuelle est une liste simplifiée et contredit certains fichiers individuels. Elle ne contient ni audit visuel profond, ni prompts de régénération, ni placements runtime certifiés. | **Incomplète / incohérente** |
| Standard visuel | Registre unique, aucun chemin brut | Plusieurs composants utilisent encore des chemins V1 en dur ; `ChapterHero` emploie un `<img>` brut malgré le standard. | **Partiel** |
| Preflight | Dépasser la version alternative | Le contenu i18n et le replay existent, mais le rendu est une modale textuelle générique sans scènes, visuels, démonstration du parcours ni cinématique GSAP. | **Fonctionnel mais sous le niveau demandé** |
| Responsive | 390→2560 sans overflow | Une passe de contrôle a été documentée ; elle doit être rejouée après le chantier i18n et visuel, car l’anglais change fortement les longueurs. | **À revalider en fin de cycle** |
| Documentation | Tracking append-only fiable | `TASKS`, `CHANGELOG`, `SENTINEL`, `GAP_ANALYSIS` contiennent des cases « fait » contredites par le runtime et la base. | **À rectifier sans effacer l’historique** |

## Définition de « production-ready »

- Un changement FR/EN traduit immédiatement **toute l’expérience visible**, du hub à la certification, sans texte français résiduel en mode EN hors noms propres et symboles financiers.
- Un visiteur peut lire le chapitre, mais toute évaluation de leçon exige une connexion et propose un CTA direct vers `/auth` avec retour à l’ancre d’origine.
- La top bar ne contient plus aucun accès au diagnostic Standard/High/Premium ; elle ouvre le cockpit de progression/certification.
- La certification reste débloquée à **5/5 évaluations de leçon réussies à ≥70 %**. Les 10 scénarios sont affichés séparément comme progression pratique, sans modifier silencieusement la règle existante.
- Chaque asset V1, V2 et background a un rôle, un emplacement runtime, une fiche, un prompt source et un statut vérifiés ; aucun texte pédagogique indispensable ne dépend d’un bitmap.
- Le Preflight est un véritable parcours plein écran premium, utile et rejouable, supérieur à la référence fournie.
- Les contrôles invités/connectés, FR/EN et 390→2560 passent sans erreur console, débordement ni route cassée.

## Sprint 0 — Réparer les sources de vérité

1. Relire `SENTINEL` avant modification et créer un audit daté append-only avec les écarts ci-dessus.
2. Créer `docs/ch1/I18N_STRING_MAP.md` : inventaire par route/composant, namespace, FR, EN, statut et propriétaire.
3. Étendre `CH1_ASSET_MATRIX.md` en matrice runtime certifiée : famille, contenu observé, rôle pédagogique, leçon, sous-section, composant, mode cours/évaluation, breakpoint, alt FR/EN, prompt, statut réel.
4. Ajouter des errata datés à `TASKS`, `CHANGELOG`, `SENTINEL` et `GAP_ANALYSIS` ; conserver les entrées historiques mais retirer leur autorité via un statut « supersédé / audit réel ».

**Sortie** : aucun item « fait » ne contredit le code ou la base.

## Sprint 1 — i18n systémique de bout en bout

1. Refondre les dictionnaires par domaines : `nav`, `hub`, `chapter`, `lessons`, `widgets`, `visuals`, `scenarios`, `assessment`, `progress`, `certification`, `auth`, `preflight`, `system`.
2. Déplacer les métadonnées traduisibles de `chapter1.ts`, les contenus du cours, les textes de `market-data.ts`, les specs de scénarios et les explications visuelles vers des structures localisées typées.
3. Migrer tous les composants CH1 vers `useT`/contenu localisé : shell, hero, sidebar, navigation mobile, mini-heroes, 20+ widgets, guides, scénarios, cockpit, évaluations, certification et auth.
4. Monter `LanguageSwitch` dans la top bar desktop du chapitre ; sur mobile/tablette, le placer dans le drawer de navigation.
5. Synchroniser la locale avec `profiles.locale` après connexion, tout en conservant le fallback localStorage pour les invités.
6. Alimenter `question_translations` pour les **134 questions** et traduire prompts, choix et explications ; corriger le loader afin qu’un changement de locale rafraîchisse effectivement la série affichée.
7. Localiser les métadonnées SEO selon la locale lorsque cela reste compatible SSR ; conserver au minimum un fallback français cohérent.

**Sortie** : audit automatisé des littéraux visibles + parcours manuel FR/EN ; zéro question française en mode EN.

## Sprint 2 — Parcours évaluation, auth et certification unifié

1. Supprimer du parcours utilisateur le diagnostic top-bar Standard/High/Premium sans supprimer les primitives historiques encore référencées.
2. Remplacer le bouton top-bar par une action « Progression / Certification » ouvrant le cockpit existant : 5 leçons, scores, évaluations restantes, 10 scénarios pratiqués, statut et CTA certification.
3. Donner au panneau final, au cockpit desktop et au drawer mobile la même source de vérité et les mêmes libellés.
4. Transformer `LessonEvaluationGate` en auth wall : pour un invité, afficher une modale claire avec bénéfice, règle 30/70 et bouton vers `/auth?redirect=/academy/analyse-fondamentale#<lesson>` ; ne jamais instancier le questionnaire avant authentification.
5. Vérifier la reprise après connexion, la sauvegarde de tentative, le calcul A30/B70 et le crédit unique de 20 %.
6. Nettoyer tous les textes hérités « Standard / High / Premium », « 3 niveaux × 10 scénarios » et promesses divergentes.
7. Protéger côté serveur chaque écriture de progression/évaluation, indépendamment du verrou UI.

**Sortie** : un seul parcours, aucune évaluation invité, 5/5 → route certification, back-button et logout propres.

## Sprint 3 — Chaîne visuelle définitive et régénération A1→A17

1. Ouvrir et auditer visuellement chaque V1, V2 et background ; rapprocher chaque rendu de sa fiche, de son emplacement réel et du Brand DNA V2.
2. Produire `docs/ch1/CH1_VISUAL_PROMPTS/` avec une fiche versionnée A1→A17 : intention, composition, format, contraintes de cadrage, Brand DNA commun, palette, négatifs, règle **zéro texte pédagogique incrusté** et couche HTML/SVG attendue.
3. Régénérer un lot pilote A1/A2/A3, contrôler lisibilité, cohérence et recadrages mobile/desktop, puis appliquer la même norme à A4→A17 sans changer les ids utilisés par la Partie B.
4. Archiver les rendus actuels sous une famille legacy non servie par défaut ; remplacer atomiquement les pointeurs runtime après validation du lot complet.
5. Refaire les couches natives FR/EN de chaque figure (`title`, `lead`, `chain`, `callouts`, `reading`, alt).
6. Remplacer tous les chemins bruts par le registre typé et faire passer `ChapterHero`, `StrategicBriefing`, backgrounds et questions par les composants standard.

**Sortie** : 17/17 V1 régénérés et mappés, ids stables, aucun texte bitmap critique, aucune question Partie B orpheline.

## Sprint 4 — Redistribution exhaustive V2 et backgrounds

1. Monter `bg1` sur le hero via `VisualLayer` et `bg2` sur l’ambiance macro ; conserver `bg3`–`bg5` à leurs sections avec opacités documentées et testées.
2. Intégrer les 5 visuels V2 de cas dans `ScenarioPlayer`/index selon le scénario correspondant, avec fallback propre pour les cinq cas sans V2 dédié.
3. Vérifier les 14 autres V2 : placement sémantique, ordre narratif, absence de doublon, lightbox, alt localisé, cadrage 390→2560.
4. Certifier la matrice par un test comparant registre, fichiers présents, ids de questions et callsites runtime.

**Sortie** : 5/5 backgrounds et 19/19 V2 ont un statut explicite « monté » ou « registre volontaire », jamais ambigu.

## Sprint 5 — Preflight cinématique next-level

1. Reconcevoir le Preflight comme une expérience plein écran en six scènes : identité TradForge, architecture 5 chapitres, méthode Voir/Manipuler/Décider/Comprendre, démonstration widget, évaluation 30/70, certification.
2. Utiliser les assets V2 et le Brand DNA comme première information visuelle ; ajouter une scène de terminal/macro radar et une simulation contrôlée du parcours.
3. Orchestrer transitions et profondeur avec Framer Motion ; réserver GSAP aux séquences de timeline réellement complexes. Respecter `prefers-reduced-motion`.
4. Fournir navigation clavier, focus trap, labels, progression, skip/replay et rendu mobile dédié ; contenu entièrement FR/EN.
5. Maintenir le Preflight uniquement à l’entrée du hub et rejouable depuis le hub.

**Sortie** : six scènes utiles, visuellement distinctes, responsive et accessibles.

## Sprint 6 — QA production et clôture documentaire

1. Tests Playwright invités et connectés : hub, switch FR/EN, entrée chapitre, drawer mobile, auth wall, login-return, tentative A+B, progression, cockpit, verrou 4/5, déblocage 5/5, certification, logout.
2. Matrice responsive 390 / 834 / 1280 / 1440 / 1920 / 2560 en FR et EN ; vérifier overflow, texte coupé, chevauchement, images blanches/noires, focus et console.
3. Tests de contrat : 75 A, 59 B, 134 traductions EN, 17 ids V1, 19 V2, 5 backgrounds, aucune référence cassée.
4. Vérifier routes, métadonnées, requêtes réseau, erreurs runtime, politiques d’accès et sauvegardes réelles.
5. Relire `SENTINEL` après chaque incrément puis effectuer le checkout final. Ajouter les résultats datés à `CHANGELOG`, `TASKS`, `PRD`, `SENTINEL`, `I18N_STRING_MAP` et `CH1_ASSET_MATRIX`, sans effacer l’historique.

**Sortie** : tous les critères sont `DONE` avec preuve de test ; aucun « à finir plus tard » dans le périmètre.

## Ordre d’exécution verrouillé

```text
Sprint 0 → Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 → Sprint 6
Docs vérité   i18n       parcours     V1         V2/BG       Preflight    QA
```

Aucune fonctionnalité hors de ce périmètre ne sera ajoutée. Aucun sprint ne sera déclaré terminé sans ses critères de sortie, et l’exécution continuera jusqu’au dernier contrôle du Sprint 6.