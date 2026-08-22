// ============================================================================
// Namespace `widgets` (FR — source) : toutes les chaînes des widgets
// pédagogiques du Chapitre 1 (labels, axes, boutons, verdicts, feedbacks).
// Une clé racine par widget, nommée d'après le composant en camelCase.
// ============================================================================

export const widgetsFr = {
  common: {
    reset: "Réinitialiser",
    play: "Lancer",
    pause: "Pause",
    next: "Suivant",
    previous: "Précédent",
    validate: "Valider",
    result: "Résultat",
    impact: "Impact",
    bullish: "Haussier",
    bearish: "Baissier",
    neutral: "Neutre",
    high: "Élevé",
    medium: "Moyen",
    low: "Faible",
  },
};

export type WidgetsDictionary = typeof widgetsFr;
