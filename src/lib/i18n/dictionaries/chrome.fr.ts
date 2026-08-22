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
    objectivesShort: "Objectifs",
    keyQuestion: "Question clé",
    flow: "Parcours",
    duration: "Durée",
    tier: "Niveau",
    section: "Section",
    missionBriefing: "Mission Briefing",
    answerHint: "Vous saurez y répondre à la fin de cette leçon.",
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
    seoTitle: "Certification Analyse Fondamentale — TradForge",
    seoDescription: "Certification finale du Chapitre 1 : Partie C, dix scénarios scriptés avec pause pédagogique.",
    seoOgDescription: "Partie C : dix scénarios de marché scriptés pour valider le raisonnement fondamental.",
    eyebrow: "Certification finale · Partie C",
    title: "Dix scénarios scriptés pour valider votre lecture fondamentale",
    lead: "Contexte, bougies, pause pédagogique, publication, décision, feedback et outcome réel. Seuil : 70 %.",
    scoredScenarios: "scénarios notés",
    scoreLabel: (score: number) => `Score ${score}%`,
    lockedTitle: (percent: number) => `Certification verrouillée — ${percent}%`,
    lockedHeading: "Validez les leçons restantes avant la Partie C",
    lockedLessonHint: "Évaluation A+B à réussir à ≥ 70 %.",
    resultPassed: "Certification réussie",
    resultFailed: "Certification non validée",
    resultPending: "Certification en cours",
    resultSummary: (correct: number, total: number, score: number) =>
      `${correct}/${total} décisions correctes · score ${score} %.`,
    resultPendingBody: "Terminez les dix scénarios pour calculer le score final.",
    saveAttempt: "Sauvegarder la tentative",
    saving: "Sauvegarde…",
    saved: "Certification sauvegardée",
    signInToSave: "Connectez-vous pour sauvegarder cette tentative.",
    back: "Retour au chapitre",
  },
  hub: {
    lessonsSuffix: "leçons",
    chapters: {
      "01": {
        title: "Analyse Fondamentale",
        desc: "Valeur intrinsèque, macro & micro, valorisation, prévisions, 10 cas historiques.",
      },
      "02": { title: "Banques Centrales", desc: "Taux, QE/QT, forward guidance, hawkish vs dovish." },
      "03": { title: "Géopolitique & Crises", desc: "Risque politique, refuges, chocs d'offre." },
      "04": { title: "Corrélations de Marché", desc: "Intermarket, diversification, régimes." },
      "05": { title: "Cycles Financiers", desc: "Expansion, pic, récession, reprise." },
    },
  },
};

export type ChromeDictionary = typeof chromeFr;
