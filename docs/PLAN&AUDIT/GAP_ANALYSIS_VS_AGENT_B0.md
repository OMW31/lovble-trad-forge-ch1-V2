# GAP_ANALYSIS_VS_AGENT_B0 — Écart par écart

**Version** : 2026-08-17 — append-only.
Référence : plan « TradForge — Plan de rattrapage stratégique & système visuel définitif » (2026-08-15).

| # | Capacité | Version alternative (B0) | Cette codebase | Décision | Statut |
|---|---|---|---|---|---|
| 1 | Banque de questions en base | Tables + traductions | Absentes au départ | **Rattraper et dépasser** : 3 tables + RLS + GRANT + seed 134 lignes + loader avec fallback TS | ✅ FAIT |
| 2 | Loader async + fallback | Oui, sans fallback robuste | — | Dépasser : `question-bank-loader.ts` idempotent, silencieux, fallback TS intégral | ✅ FAIT |
| 3 | Redirect `/` → `/academy` | Oui | Home interne doublon | Reprendre | ✅ FAIT |
| 4 | Onboarding / Preflight rejouable | 6 étapes | Inexistant | Dépasser : `PreflightGuide`, cinématique, i18n, rejouable depuis le hub uniquement | ✅ FAIT |
| 5 | i18n | ~160 clés, mot-à-mot, cours non traduit | Inexistant | Dépasser : architecture par namespaces, **adaptation éditoriale** FR→EN, jamais littérale | ✅ SOCLE + N1/N4 |
| 6 | Conversion WebP V2 + backgrounds | Oui | PNG bruts | Reprendre | ✅ FAIT (19 V2 + 5 BG) |
| 7 | Remplacement V1 → V2 | Oui (destructif) | — | **Ne pas reproduire** : V1 conservés, doctrine de complémentarité | ✅ ARBITRÉ |
| 8 | Mapping visuel | Improvisé | — | Dépasser : registre typé `visual-assets.ts` + standard d'intégration | ✅ FAIT |
| 9 | Explications duales des cas | `explanationDirect` / `explanationDetail` | Explication unique | Reprendre via la couche `reading` du standard visuel | ✅ COUVERT |
| 10 | Carte certification (sidebar/drawer) | Oui | Panneau de fin + route dédiée | Déjà couvert et supérieur (route certification 3 niveaux) | ✅ COUVERT |

## Ce qui dépasse explicitement B0
- `VisualExplainer` : couche explicative native traduisible (B0 laissait le texte dans l'image).
- Fallback TS derrière la base : l'évaluation ne tombe jamais.
- Moteur de sélection **déterministe sans IA** : 2×diff1 + 2×diff2 + 3×diff3, pondération A/B 30/70, seuil 70 %.
- Grilles fluides et harnais responsive 390 → 2560 px.
