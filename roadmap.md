# TradForge CH1 execution roadmap

- [x] S5: stabilize chapter route failure and finish Preflight/responsive polish.
- [x] S3: audit and wire supplied Part B visual candidates through the central registry without changing a1-a17 IDs.
- [ ] S2: validate translation batches, generate/apply only clean idempotent question translations, and verify EN runtime. Current supplied and machine-generated batches rejected: 134 rows, 75 A / 59 B, still mixed FR/EN; no database write performed.
- [ ] [ ] S6/S7: append-only documentation and responsive/FR-EN QA across the delivery path.

## Reprise ciblée — 2026-10-31 (priorité utilisateur)
- [ ] S2: appliquer les 134 traductions EN versionnées (75 A / 59 B) et vérifier leur lecture publique.
- [ ] S2: câbler le fallback EN et empêcher les réponses réseau d'une ancienne langue de remplacer la langue courante.
- [ ] S2/S7: tests de complétude, identifiants, rotation, score 30/70 et évaluation authentifiée FR/EN.
- [ ] S6: ajouter les preuves et statuts actuels dans CHANGELOG, TASKS et SENTINEL sans effacer l'historique.
- S4 hors modification : livré selon confirmation utilisateur ; ne pas reconstruire l'authentification.
