// ============================================================================
// Dictionnaire FR — langue de référence.
// Namespaces = niveaux de la cartographie i18n (docs/ch1/I18N_STRING_MAP.md) :
//  nav (N1) · system (N4) · preflight (N4) · hub (N1) · eval (N2, amorce)
//  shell (N3, chrome du chapitre) · account (N3) · progressHud / dashboard
//  (N3, cockpit de progression) · gate (N3, gate d'évaluation de leçon)
// Règle éditoriale : le FR est la source, l'EN est une ADAPTATION (registre
// CFA / Financial Times), jamais une traduction littérale.
// ============================================================================

import { chromeFr } from "./chrome.fr";
import { widgetsFr } from "./widgets.fr";
import { contentFr } from "./content.fr";
import { widgetsMacroFr } from "./widgets-macro.fr";
import { widgetsCorpFr } from "./widgets-corp.fr";

export const fr = {
  chrome: chromeFr,
  widgets: widgetsFr,
  widgetsMacro: widgetsMacroFr,
  widgetsCorp: widgetsCorpFr,
  content: contentFr,
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
    title: "Entrez dans le desk",
    lead: "Un parcours pratique pour lire, manipuler et décider sur les marchés.",
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
  shell: {
    academy: "Academy",
    sync: "Progression synchronisée",
    syncShort: "Sync",
    blocks: "blocs",
    nextChapter: "Chapitre suivant",
    centralBanks: "Banques Centrales",
    unlockedHint: "Débloqué à 100% du Chapitre 1",
    openNav: "Ouvrir la navigation du chapitre",
    navigation: "Navigation",
    chapterPlan: "Plan du chapitre",
    close: "Fermer",
    summary: "Sommaire",
    progress: "Progression",
    goTo: (title: string) => `Aller à ${title}`,
    previousUnavailable: "Section précédente indisponible",
    nextUnavailable: "Section suivante indisponible",
    certification: "Certification",
    lessonsCount: (n: number) => `${n}/5 leçons`,
  },
  account: {
    account: "Compte",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    myAccount: "Mon compte",
    myProgress: "Ma progression",
    myCockpit: "Mon cockpit",
    profile: "Profil",
    guest: "Invité",
    defaultLabel: "Mon compte",
  },
  progressHud: {
    myProgress: "Ma progression",
    seeCockpit: "Voir le cockpit →",
  },
  dashboard: {
    cockpitTitle: "Cockpit de progression",
    nextRank: (name: string) => `Prochain rang : ${name}`,
    certification: "Certification",
    lessonsValidated: "Leçons validées",
    remaining: (n: number) => `${n} restante(s)`,
    scenarios: "Scénarios",
    scenariosRemaining: (n: number) => `${n} restant(s)`,
    averageScore: "Score moyen",
    averageScoreSub: "évaluations réussies",
    chapter: "Chapitre",
    chapterSub: "progression globale",
    medalsByLesson: "Médailles par leçon",
    toValidate: "À valider",
    finalCertification: "Certification finale",
    certificationReadyLead: "Toutes les leçons sont validées — la",
    certificationReadyStrong: "certification finale",
    certificationReadyTail: "(Partie C : scénarios scriptés) est débloquée.",
    certificationLockedBody: "Débloquez la certification en validant les leçons restantes :",
    signInHint: "Connectez-vous pour sauvegarder votre progression et vos médailles.",
    ranks: {
      recruit: "Recrue",
      apprentice: "Apprenti Analyste",
      confirmed: "Analyste Confirmé",
      strategist: "Stratège",
      elite: "Élite du Marché",
      master: "Maître Fondamentaliste",
    },
    medals: {
      gold: "Or",
      silver: "Argent",
      bronze: "Bronze",
    },
  },
  gate: {
    title: (num: string) => `Évaluation de leçon · ${num}`,
    passedTitle: "Leçon validée — 20 % crédités",
    validateLesson: (num: string) => `Validez la leçon ${num}`,
    passedBody: "Votre progression officielle a été créditée. La certification finale se débloque à 100 %.",
    pendingBody: "Réussissez l'évaluation (seuil 70 %) pour créditer les 20 % de cette leçon et progresser vers la certification finale.",
    takeAssessment: "Passer l'évaluation",
    validated: "Validée",
    signInHint: "Connectez-vous pour sauvegarder durablement la validation.",
    guestTitle: "Connexion requise pour évaluer",
    guestBody:
      "Les évaluations de leçon (Partie A théorie 30 % · Partie B interprétation 70 %, seuil 70 %) sont réservées aux comptes. Le cours reste librement consultable.",
    guestCta: "Se connecter pour évaluer",
    certificationCta: "Progression & certification",
  },

};

export type Dictionary = typeof fr;
