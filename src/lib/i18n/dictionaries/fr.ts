// ============================================================================
// Dictionnaire FR — langue de référence.
// Namespaces = niveaux de la cartographie i18n (docs/ch1/I18N_STRING_MAP.md) :
//  nav (N1) · system (N4) · preflight (N4) · hub (N1) · eval (N2, amorce)
// Règle éditoriale : le FR est la source, l'EN est une ADAPTATION (registre
// CFA / Financial Times), jamais une traduction littérale.
// ============================================================================

export const fr = {
  nav: {
    academy: "Academy",
    chapters: "Chapitres",
    chapter1: "Analyse fondamentale",
    certification: "Certification",
    account: "Compte",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    backToHub: "Retour aux chapitres",
    replayGuide: "Revoir le guide",
    language: "Langue",
  },
  hub: {
    eyebrow: "Parcours certifiant",
    title: "Apprenez les marchés en manipulant, pas en lisant.",
    lead: "Un laboratoire interactif de niveau institutionnel. Chaque concept se voit, se manipule, se décide et se comprend.",
    lessons: "leçons",
    open: "Disponible",
    locked: "Bientôt",
    start: "Commencer",
  },
  system: {
    loading: "Chargement…",
    empty: "Aucune donnée à afficher pour l'instant.",
    error: "Une erreur est survenue. Réessayez dans un instant.",
    retry: "Réessayer",
    success: "Enregistré.",
    locked: "Contenu verrouillé",
    lockedHint: "Validez les prérequis pour débloquer cette étape.",
    authRequired: "Créez un compte pour passer l'évaluation et sauvegarder votre progression.",
    offlineBank: "Banque locale utilisée — votre progression reste enregistrée.",
    notFound: "Page introuvable",
    notFoundHint: "Ce contenu n'existe pas ou a été déplacé.",
  },
  preflight: {
    skip: "Passer",
    next: "Continuer",
    back: "Précédent",
    start: "Entrer dans l'Academy",
    step: "Étape",
    of: "sur",
    steps: [
      {
        kicker: "Bienvenue",
        title: "TradForge Academy",
        body: "Un desk d'analyse, pas un cours. Vous manipulez les mêmes objets qu'un analyste institutionnel : indicateurs, cycles, valorisations, scénarios.",
      },
      {
        kicker: "Structure",
        title: "Cinq chapitres, une progression",
        body: "Le Chapitre 1 — Analyse fondamentale — est ouvert. Six leçons, une capstone de dix cas réels, une certification finale.",
      },
      {
        kicker: "Méthode",
        title: "Voir · Manipuler · Décider · Comprendre",
        body: "Chaque section combine un visuel, un widget interactif et une décision à prendre avant la révélation du résultat.",
      },
      {
        kicker: "Évaluation",
        title: "Partie A · Partie B — pondération 30 / 70",
        body: "La théorie compte pour 30 %, l'interprétation des widgets et visuels pour 70 %. Le seuil de validation d'une leçon est de 70 %.",
      },
      {
        kicker: "Certification",
        title: "Débloquée après cinq leçons validées",
        body: "La certification finale s'ouvre une fois les leçons 1.1 à 1.5 validées. Les questions tournent : chaque tentative est une nouvelle série.",
      },
      {
        kicker: "Navigation",
        title: "Vous restez libre",
        body: "Aucune section n'est verrouillée en lecture. Votre progression est sauvegardée localement, et synchronisée si vous avez un compte.",
      },
    ],
  },
  eval: {
    partA: "Partie A · Théorie",
    partB: "Partie B · Interprétation",
    weightA: "30 %",
    weightB: "70 %",
    threshold: "Seuil de validation : 70 %",
    newSeries: "Nouvelle série",
    submit: "Valider",
    passed: "Leçon validée",
    failed: "Non validée — retentez avec une nouvelle série",
  },
};

export type Dictionary = typeof fr;
