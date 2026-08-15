# TradForge — Plan de rattrapage stratégique & système visuel définitif

## Constats vérifiés (avant plan)

| Vérification | Résultat réel |
|---|---|
| Tables banque de questions dans CE backend | **Absentes** — seules `profiles`, `user_roles`, `chapter_progress`, `chapter_resume_state`, `evaluation_attempts` existent. Les 125/59/368 lignes de ta capture appartiennent à la version alternative. |
| Visuels V1 montés dans le cours | **5 seulement** : a1, a2 (figures 1.1), a4, a8, a12 (fonds), + a10 (hero), a4/a8/a17 (briefing). 9 visuels non placés dans le corps des leçons. |
| Assets V2 / backgrounds | 19 PNG `visuals_v2/` + 5 PNG `backgroound/`, **aucun converti, aucun intégré**. |
| Preflight / onboarding | **Inexistant** dans cette codebase (construit uniquement côté version alternative). |
| i18n | **Inexistant** ici (aucun dictionnaire, aucun `useT`). |
| Home interne `/` | Présente, doublon de la future landing. |
| Débordements grands écrans | Confirmés sur tes captures : cartes concept 1.2 (« croissance / inflation / directeur… » tronqués) et chaînes de schémas du Visual Hybrid Layer (flèches coupées à droite). |

## Ce que la version alternative a livré (extrait du tracking log B0)
Banque de questions en base + table de traductions, loader async avec fallback, redirect `/` → `/academy`, carte certification dans sidebar + drawer, onboarding 6 étapes rejouable, i18n ~160 clés, conversion V2→WebP, `explanationDirect`/`explanationDetail` sur les 10 cas.

**À reprendre** : banque en base + loader, redirect racine, onboarding/preflight rejouable, carte certification, conversion WebP, explications duales des cas.
**À ne pas reproduire** : i18n mot-à-mot et partielle (cours non traduit), remplacement V1 par V2 (perte de la valeur pédagogique V1), mapping visuel improvisé.

---

## Phases séquencées

### Phase 0 — Socle documentaire (bloquant, append-only)
- `docs/PLAN&AUDIT/GAP_ANALYSIS_VS_AGENT_B0.md` : tableau écart par écart (présent / meilleur ailleurs / à ignorer / à dépasser).
- `docs/ch1/VISUAL_INTEGRATION_STANDARD.md` : le standard officiel extrait des 3 premières intégrations réussies (a1/a2 en `variant="figure"` + couche schéma native sous le visuel).
- `docs/ch1/CH1_ASSET_MATRIX.md` : cartographie exhaustive V1 / V2 / backgrounds (ID, version, rôle, chapitre, leçon, section, éval A/B, emplacement, orientation, format, comportement desktop/mobile, callouts requis, statut WebP, statut intégration).
- `SENTINEL.md` : ajout d'une section « Standards obligatoires » référençant ces trois documents.

### Phase 1 — Système visuel définitif (priorité 1)
1. **Doctrine V1/V2 complémentaires** (pas concurrentes) :
   - V2 (épurés, premium) → cours, leçons, hero, transitions immersives.
   - V1 (denses, pédagogiques) → évaluations Partie B, plus usage cours quand la densité sert la leçon.
   - Backgrounds → immersion de section.
2. **Pipeline conversion** : script `scripts/convert-assets.mjs` (sharp/ImageMagick, WebP q85), V2 → `public/academy/ch1/visuals_v2/*.webp`, backgrounds → `public/academy/ch1/backgrounds/bg1..bg5.webp`. Nomenclature `v2-aNN` / `bgNN`, jamais d'écrasement des V1.
3. **Mapping V2 → slots** : chaque PNG V2 est ouvert et analysé (contenu réel), puis rattaché à un slot documenté dans `CH1_ASSET_MATRIX.md`. Aucune association devinée : tout écart est listé et te sera soumis.
4. **Régénération V1** (schémas déjà justes, seuls branding + texte fautif sont à corriger) :
   - Pour chaque A1→A17 : comparaison prompt (`CH1_VISUAL_PROMPTS`) ↔ rendu actuel ↔ Brand DNA extrait de l'analyse des V2 (palette, iconographie, typographie, grain, cadrage).
   - Régénération avec prompt enrichi Brand DNA + consigne « aucun texte incrusté » (le texte devient couche native traduisible).
   - Lot pilote de 3 visuels soumis à validation avant la série complète.
   - Les anciens fichiers sont conservés (`visuals/legacy/`), jamais supprimés → remapping des questions Partie B garanti.

### Phase 2 — Standard d'intégration visuelle + couche explicative traduisible
- Nouveau composant `VisualExplainer` : image (couche fixe) + **couche schéma/callouts native** (chaîne causale, légendes, badges), pilotée par des données typées et non par du texte figé dans l'image.
- Chaque visuel intégré passe obligatoirement par `VisualLayer` / `VisualLightbox` + `VisualExplainer` : contexte au-dessus, schéma en dessous, cohérence avec la section.
- Amélioration du design des schémas actuels (jugés simplistes) : hiérarchie typographique, flèches, tokens sémantiques, densité institutionnelle.
- Les 9 visuels manquants sont placés aux emplacements documentés dans `CH1_VISUAL_SPECS`.

### Phase 3 — Internationalisation profonde (architecture d'abord)
Cartographie en 5 niveaux, comme spécifié :
1. navigation / titres / descriptions / CTA — 2. widgets / tooltips / modales / évaluations / feedback — 3. scénarios / infographies / callouts / animations / états système — 4. erreurs / loading / empty / success / locked / auth / onboarding — 5. media localization (inventaire des visuels contenant du texte).
Livrables : `src/lib/i18n/` (provider, `useT`, dictionnaires namespacés, locale persistée + colonne `profiles.locale` déjà présente), schéma de contenu extensible à N langues, `docs/ch1/I18N_STRING_MAP.md`. **Règle : adaptation éditoriale, jamais traduction littérale** — l'anglais est réécrit pour un lecteur financier anglophone (registre CFA/FT).
Ce soir : architecture + niveaux 1 et 4 complets, FR de référence, EN sur ces niveaux. Niveaux 2/3/5 (cours, scénarios, callouts) traités par lots suivants, suivis dans `I18N_STRING_MAP.md`.

### Phase 4 — Banque de questions en base + moteur déterministe
- Migration : tables `question_bank_part_a`, `question_bank_part_b`, `question_translations` (RLS lecture publique/authentifiée, GRANT explicites), alimentées depuis `part-a-bank.ts` / `part-b-bank.ts` par INSERT littéraux dans la migration.
- `question-bank-loader.ts` : chargement async par leçon + locale, **fallback sur les banques TS** si la base est injoignable.
- Moteur **déterministe, sans IA** : `assessment-picker.ts` conservé — 7 questions/partie, 2×diff1 + 2×diff2 + 3×diff3, rotation anti-répétition persistée, pondération A/B 30/70, seuil 70 %.
- Remapping Partie B sur les V1 régénérés (`visual_id` stable, aucune question orpheline).

### Phase 5 — Architecture du parcours
- Suppression de la home interne : `/` → redirect vers `/academy` (Chapter Hub). Anciens liens internes mis à jour.
- Chapter Hub : liste des chapitres, Chapitre 1 accessible, règles de déblocage inchangées.
- **Preflight** (nouveau, next-level) : overlay plein écran multi-étapes joué à la première entrée, cinématique (Framer Motion + GSAP), visuels V2, explication du parcours, du seuil 70 %, du déblocage certification et de la navigation libre. Bouton « Revoir le guide » **sur le Chapter Hub uniquement**, jamais dans le Chapitre 1. Contenu i18n dès le départ.

### Phase 6 — Polish grands écrans & finitions (fin de cycle, comme demandé)
- Cartes concept 1.2 : passage en grille fluide (`minmax`, `min-w-0`, `text-balance`, tailles clampées) — texte « croissance / inflation / directeur / emploi » ne doit plus déborder en ≥1440px.
- Chaînes de schémas du Visual Hybrid Layer (1.1) : wrapping des flèches, `flex-wrap` + `min-w-0`, pas de coupe droite.
- Les deux visuels de 1.2 alignés sur le standard `VisualExplainer`.
- Ajout de ces cas au harnais responsive permanent (Playwright 390 / 834 / 1280 / 1920 / 2560).
- Tes captures complémentaires seront intégrées à cette phase quand tu les enverras.

### Phase 7 — QA & anti-régression
- Relecture SENTINEL avant/après, build + typecheck zéro erreur.
- Vérifications : 6 leçons, 21 widgets, 17 visuels servis, certification, persistance invité/connecté, éval A/B 30/70.
- Docs mises à jour en **append-only daté** : CHANGELOG, TASKS, PRD, SENTINEL, ASSET_MATRIX.

---

## Détails techniques
- Stack inchangée (TanStack Start, Tailwind v4 tokens, shadcn, Framer Motion + GSAP). Zéro couleur en dur, `prefers-reduced-motion` respecté.
- Nouveaux fichiers : `src/components/academy/VisualExplainer.tsx`, `src/components/academy/PreflightGuide.tsx`, `src/lib/i18n/*`, `src/lib/academy/question-bank-loader.ts`, `scripts/convert-assets.mjs`.
- Une seule migration base (3 tables + RLS + GRANT + seed des 184 questions), aucune modification destructive des tables existantes.
- Aucun asset supprimé : V1 archivés sous `visuals/legacy/`, V2 dans leur propre dossier.

## Règles anti-régression
On étend, on ne remplace pas. Aucun visuel, question, widget ou leçon supprimé. Le fallback TS reste actif derrière la base. Le passage V2 dans le cours ne retire jamais un V1 utilisé par une question.
