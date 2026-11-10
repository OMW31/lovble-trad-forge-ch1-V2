# Versioning & documentation

## Arborescence par chapitre
```text
docs/chN/INPUT.md                 entrée standardisée
docs/chN/CHN_GAP_ANALYSIS.md      audit input ↔ CH1
docs/chN/CHN_VISUAL_SPECS/        INDEX.md + A1..An.md
docs/chN/CHN_VISUAL_PROMPTS/
docs/chN/CHN_ASSET_MATRIX.md
docs/chN/WIDGET_ENCYCLOPEDIA.md
docs/chN/i18n/                    catalogues SQL/JSON + MAINTENANCE.md
docs/IMPLEMENTATION/              PRD, TASKS, CHANGELOG, SENTINEL, ROADMAP (partagés, sections par chapitre)
roadmap.md                        liste de tâches courante
```

## Règles
- Append-only : nouvelle section datée `## AAAA-MM-JJ — <Sprint> : <objectif>` ; jamais d'effacement d'historique.
- CHANGELOG : bullets + rationale (3–5 lignes). TASKS : `[x]` + 1 ligne. SENTINEL : checklist pure.
- Mettre à jour CHANGELOG + TASKS + SENTINEL dans le même incrément que le code.
- Décision technique structurante → une règle dans `AGENTS.md` (avec le pourquoi), remplacer l'ancienne plutôt qu'en ajouter une seconde.
- Artefacts rejetés conservés et marqués comme historiques, jamais utilisés au runtime.
- Plans approuvés archivés dans `.lovable/plan/` ; toujours s'y référer de A à Z.
