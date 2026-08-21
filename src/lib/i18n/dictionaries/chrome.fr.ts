// ============================================================================
// Namespace `chrome` (FR — source) : chrome éditorial du chapitre.
// Couvre ChapterHero, StrategicBriefing (MissionBriefing / SkillUnlockPreview /
// VisualHybridLayer), LessonSection, LessonMiniHero, ScenarioPlayer,
// la route certification et le hub Academy.
// ============================================================================

export const chromeFr = {
  hero: {
    missionControl: "Mission Control",
    edition: "World-Class Edition",
    startLab: "Démarrer le laboratoire",
    seeCases: "Voir les cas historiques",
    statLessons: "Leçons",
    statWidgets: "Widgets interactifs",
    statCases: "Cas redistribués",
  },
  briefing: {
    eyebrow: "Mission briefing",
    title: "Desk d'analyse fondamentale — protocole de décision",
    lead: "Le chapitre est structuré comme un workflow institutionnel : signal macro, diagnostic entreprise, valorisation, scénarios et exécution d'un cas. Chaque bloc produit une décision observable, pas une lecture passive.",
    points: [
      {
        label: "Lire",
        title: "Identifier le driver dominant",
        detail: "Croissance, inflation, liquidité, bilan, valorisation ou risque politique.",
      },
      {
        label: "Pondérer",
        title: "Hiérarchiser l'impact marché",
        detail: "Différencier donnée brute, surprise, consensus et réaction de deuxième tour.",
      },
      {
        label: "Décider",
        title: "Transformer l'analyse en scénario",
        detail: "Construire une thèse, une invalidation et une lecture inter-marchés.",
      },
    ],
    radarTitle: "Macro radar",
    radarSignals: {
      growth: "Croissance",
      inflation: "Inflation",
      rates: "Taux",
      liquidity: "Liquidité",
    },
    radarBull: "Régime porteur si croissance et taux réels restent cohérents.",
    radarBear: "Régime fragile si inflation et stress de liquidité dominent.",
    skillEyebrow: "Skill unlock preview",
    skillTitle: "Compétences débloquées par section",
    skillModules: (done: number, total: number) => `${done}/${total} modules validés`,
    hybridEyebrow: "Visual hybrid layer",
    hybridTitle: "Schémas reconstruits en natif",
    hybridBadge: "4K-safe · aucun texte incrusté",
    hybridAssets: {
      macro: "Moteur macro",
      terminal: "Densité terminal",
      map: "Cartographie institutionnelle",
    },
    hybridAssetAlt: (label: string) => `Référence visuelle ${label} pour le chapitre Analyse Fondamentale`,
    hybridAssetLabel: (label: string) => `${label} · référence hybride WebP`,
    schemas: [
      { title: "Inflation → taux → devise", left: "IPC", mid: "Banque centrale", right: "FX / Obligations" },
      { title: "Croissance → résultats → multiples", left: "PIB", mid: "CA / marges", right: "P/E / DCF" },
      { title: "Choc énergie → balance → risque", left: "Gaz / pétrole", mid: "Termes de l'échange", right: "EUR / AUD" },
    ],
  },
  lesson: {
    objectives: "Objectifs de la leçon",
    keyQuestion: "Question clé",
    flow: "Parcours",
    duration: "Durée",
    tier: "Niveau",
    sectionOf: (num: string) => `Leçon ${num}`,
  },
  scenario: {
    eyebrow: "Cas pratique",
    context: "Contexte",
    decision: "Votre décision",
    validate: "Valider ma décision",
    outcome: "Ce qui s'est réellement passé",
    explanation: "Lecture institutionnelle",
    next: "Cas suivant",
    replay: "Rejouer",
    correct: "Décision correcte",
    incorrect: "Décision à revoir",
  },
  certification: {
    eyebrow: "Certification finale",
    title: "Certification — Analyse Fondamentale",
    lead: "L'épreuve finale du chapitre : cas scriptés, lecture de widgets et arbitrage sous contrainte.",
    lockedTitle: "Certification verrouillée",
    lockedBody: "Validez les cinq leçons du chapitre pour ouvrir l'épreuve finale.",
    readyTitle: "Certification débloquée",
    readyBody: "Toutes les leçons sont validées. Vous pouvez lancer l'épreuve finale.",
    start: "Lancer la certification",
    back: "Retour au chapitre",
    progress: "Progression du chapitre",
  },
};

export type ChromeDictionary = typeof chromeFr;
