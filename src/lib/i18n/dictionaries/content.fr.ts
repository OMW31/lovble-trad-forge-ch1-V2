// ============================================================================
// Namespace `content` (FR — source) : contenu éditorial inline de la route
// chapitre (`src/routes/academy.analyse-fondamentale.tsx`) — sous-titres de
// section, callouts, légendes de visuels, textes des cas pratiques.
// Une clé racine par leçon (intro, macro, micro, outils, previsions, cas).
// ============================================================================

export const contentFr = {
  seo: {
    title: "Analyse Fondamentale — TradForge Academy",
    description:
      "Chapitre 1 : maîtrisez l'analyse fondamentale dans un laboratoire interactif. Macro, micro, valorisation, prévisions et 10 cas historiques rejouables.",
    ogDescription: "Voir, manipuler, décider, comprendre les moteurs des marchés. Niveau institutionnel.",
  },

  intro: {
    regimesHeading: "Les 4 régimes macro — Vue radar",
    regimesVisual: {
      kicker: "1.1 · Mémoire des régimes",
      title: "Cinquante ans de régimes d'inflation",
      lead: "Chaque régime impose sa hiérarchie d'actifs. Lire le régime avant de lire la donnée : c'est l'ordre institutionnel.",
      chain: [
        { label: "Choc d'offre", detail: "1973 · 1979" },
        { label: "Désinflation", detail: "Volcker" },
        { label: "Grande modération", detail: "1990 → 2007" },
        { label: "Retour inflation", detail: "2021 →" },
      ],
      callouts: [
        { label: "Variable pivot", value: "Taux réels" },
        { label: "Réponse", value: "Politique monétaire" },
      ],
      reading: "Un même chiffre d'IPC n'a pas la même conséquence selon le régime : le marché price la réaction attendue de la banque centrale, pas la donnée brute.",
    },
    conceptHeading: "Concept",
    conceptBody:
      "L'analyse fondamentale est la pierre angulaire de l'évaluation des actifs financiers. Elle consiste à déterminer la valeur intrinsèque — la « juste valeur » — d'un actif en examinant l'ensemble des facteurs économiques, financiers et qualitatifs qui l'influencent. Contrairement à l'analyse technique, centrée sur les prix et volumes, elle s'intéresse aux causes sous-jacentes des mouvements de marché.",
    conceptBodyStrongs: ["valeur intrinsèque", "causes sous-jacentes"],
    cards: {
      priceValueTitle: "Valeur intrinsèque vs prix",
      priceValueBody: "Le prix de marché peut différer de la valeur réelle. L'objectif est d'exploiter ces divergences.",
      efficiencyTitle: "Efficience imparfaite",
      efficiencyBody: "Les marchés ne sont pas toujours efficients : des opportunités existent quand les prix n'intègrent pas toute l'information.",
      meanReversionTitle: "Retour à la moyenne",
      meanReversionBody: "À long terme, le prix tend à converger vers la valeur intrinsèque de l'actif.",
    },
    icebergVisual: {
      kicker: "Principe fondateur",
      title: "Le prix est visible, la valeur est immergée",
      lead: "Le marché cote en permanence un prix ; la valeur intrinsèque, elle, se déduit des fondamentaux.",
      chain: [
        { label: "Prix", detail: "cotation" },
        { label: "Sentiment", detail: "flux, narratif" },
        { label: "Fondamentaux", detail: "comptes, macro" },
        { label: "Valeur", detail: "juste valeur" },
      ],
      reading: "L'écart prix / valeur est l'espace de l'opportunité : il se mesure, il ne se devine pas.",
    },
    realEconomyVisual: {
      kicker: "Chaîne de valeur",
      title: "De l'économie réelle au prix de marché",
      lead: "Production, emploi et revenus alimentent les bénéfices, qui alimentent les valorisations.",
      chain: [
        { label: "Production" },
        { label: "Revenus" },
        { label: "Bénéfices" },
        { label: "Valorisation" },
      ],
      reading: "Toute thèse fondamentale doit pouvoir se raccrocher à un maillon réel de cette chaîne.",
    },
    illustrationHeading: "Illustration interactive",
    scenario: {
      title: "Scénario #1 — Pourquoi le prix bouge",
      context: "Une devise se négocie nettement sous ce que ses fondamentaux justifient : croissance solide, comptes publics sains, taux attractifs. Le marché reste pessimiste à court terme à cause d'un titre de presse anxiogène.",
      prompt: "Selon le principe de retour à la moyenne, quelle est l'hypothèse de travail la plus cohérente ?",
      choices: {
        a: "Le prix devrait tendre à se rapprocher de la valeur intrinsèque dans le temps",
        b: "Le prix s'éloignera toujours davantage de sa valeur",
        c: "La valeur intrinsèque n'a aucune importance",
      },
      explanation: "L'analyse fondamentale parie qu'à long terme le prix converge vers la valeur intrinsèque. Une sous-évaluation soutenue par des fondamentaux solides est une opportunité potentielle.",
    },
  },

  macro: {
    conceptHeading: "Concept",
    conceptBody: "Les indicateurs macroéconomiques reflètent la santé d'une économie et guident les flux de capitaux. On les classe par nature (croissance, inflation, politique monétaire) et par temporalité (avancés, coïncidents, retardés). Lire la surprise par rapport au consensus est souvent plus important que la donnée brute.",
    kpis: {
      pib: { label: "PIB", value: "croissance", hint: "activité globale" },
      ipc: { label: "IPC", value: "inflation", hint: "prix & taux" },
      taux: { label: "Taux", value: "directeurs", hint: "coût du capital" },
      nfp: { label: "NFP", value: "emploi", hint: "marché du travail" },
      balance: { label: "Balance", value: "commerce", hint: "export − import" },
      pmi: { label: "PMI", value: "confiance", hint: "indicateur avancé" },
    },
    ecosystemVisual: {
      kicker: "1.2 · Figure 1",
      title: "L'écosystème macroéconomique",
      lead: "PIB, inflation, emploi, balance commerciale et taux forment un système bouclé : aucun indicateur ne se lit isolément.",
      chain: [
        { label: "Emploi" },
        { label: "Demande" },
        { label: "Inflation" },
        { label: "Taux" },
      ],
      reading: "Le marché arbitre la boucle complète, pas le point de donnée.",
      altPrimary: "L'écosystème macroéconomique",
      altSecondary: "L'écosystème macroéconomique — comment les indicateurs clés pilotent l'économie",
    },
    hierarchyVisual: {
      kicker: "1.2 · Figure 2",
      title: "Avancés, coïncidents, retardés",
      lead: "La temporalité d'un indicateur détermine sa valeur décisionnelle : l'avancé anticipe, le retardé confirme.",
      chain: [
        { label: "Avancés", detail: "PMI, permis" },
        { label: "Coïncidents", detail: "PIB, ventes" },
        { label: "Retardés", detail: "chômage, IPC core" },
      ],
      reading: "Se positionner sur un retardé, c'est acheter une information déjà price-ée.",
      altPrimary: "Hiérarchie du signal",
      altSecondary: "La hiérarchie de l'intelligence — du signal à l'impact (indicateurs avancés, coïncidents, retardés)",
    },
    productionChainVisual: {
      kicker: "Transmission",
      title: "Production → croissance → capitaux → devise",
      lead: "La chaîne de transmission qui relie l'activité industrielle à la valorisation d'une devise.",
      chain: [
        { label: "Production" },
        { label: "Croissance" },
        { label: "Flux de capitaux" },
        { label: "Devise" },
      ],
      callouts: [
        { label: "Signal amont", value: "PMI manufacturier" },
        { label: "Signal aval", value: "Taux de change" },
      ],
      reading: "Un choc de production ne se lit sur la devise qu'après avoir traversé la croissance et les flux : d'où le décalage temporel observé.",
    },
    dashboardHeading: "Command center — 11 indicateurs clés",
    cycleWheelVisual: {
      kicker: "Widget · contexte",
      title: "Où sommes-nous dans le cycle ?",
      lead: "Le cycle fixe le régime d'exposition : chaque phase favorise une classe d'actifs différente.",
      chain: [
        { label: "Expansion" },
        { label: "Ralentissement" },
        { label: "Contraction" },
        { label: "Reprise" },
      ],
      reading: "La roue ci-contre se manipule : positionnez la phase et lisez la rotation sectorielle attendue.",
    },
    centralBankVisual: {
      kicker: "Widget · contexte",
      title: "La salle où le prix de l'argent se décide",
      lead: "Le taux directeur est le prix de référence de tout le système : il réordonne les rendements, les devises et les valorisations.",
      chain: [
        { label: "Inflation" },
        { label: "Décision", detail: "taux directeur" },
        { label: "Rendements" },
        { label: "Devise" },
      ],
      callouts: [{ label: "Levier", value: "Taux réel" }],
      reading: "Le marché ne réagit pas à la décision mais à l'écart avec ce qu'il avait déjà price-é.",
    },
    nfpVisual: {
      kicker: "Widget · contexte",
      title: "14h30 — la mécanique d'une publication NFP",
      lead: "Emploi, salaires et taux de participation forment un triptyque : le chiffre principal ment souvent seul.",
      chain: [
        { label: "NFP", detail: "créations" },
        { label: "Salaires", detail: "pression prix" },
        { label: "Taux", detail: "anticipations" },
        { label: "USD" },
      ],
      reading: "Un NFP fort avec salaires faibles n'a pas la même conséquence monétaire qu'un NFP faible avec salaires en hausse.",
    },
    cpiDriversVisual: {
      kicker: "Widget · contexte",
      title: "Ce qui fabrique réellement l'IPC",
      lead: "Matières premières, salaires et loyers alimentent l'indice avec des délais différents.",
      chain: [
        { label: "Matières" },
        { label: "Salaires" },
        { label: "Loyers", detail: "composante lente" },
        { label: "IPC core" },
      ],
      reading: "Le core, plus lent, est celui que la banque centrale suit : il révèle la persistance.",
    },
    commoditiesFxVisual: {
      kicker: "Widget · contexte",
      title: "Matières premières → devises",
      lead: "Pétrole, or et cuivre transmettent l'inflation importée et repricent les devises exportatrices.",
      chain: [
        { label: "Pétrole" },
        { label: "Inflation importée" },
        { label: "Rendements" },
        { label: "FX" },
      ],
      reading: "Le cuivre est un thermomètre d'activité ; l'or, un thermomètre de taux réels.",
    },
    labHeading: "Laboratoire interactif — simulez une surprise",
    tradeFlowsVisual: {
      kicker: "1.2 · Flux mondiaux",
      title: "La balance commerciale, moteur silencieux des devises",
      lead: "Les échanges physiques créent une demande structurelle de devise, indépendante du narratif de marché.",
      chain: [
        { label: "Exportations" },
        { label: "Demande de devise" },
        { label: "Balance" },
        { label: "Taux de change" },
      ],
      callouts: [
        { label: "Excédent", value: "Devise soutenue" },
        { label: "Déficit", value: "Dépendance aux flux" },
      ],
      reading: "Un déficit courant n'est pas fatal tant que les flux de capitaux le financent : c'est la conjonction des deux qui casse une devise.",
    },
  },

  micro: {
    conceptHeading: "Concept",
    conceptBody: "Au niveau de l'entreprise, l'analyse repose sur les états financiers : compte de résultat (revenus, marges, bénéfice), bilan (actif = passif + capitaux propres) et tableau des flux de trésorerie. On y mesure la croissance, la rentabilité (ROE, ROA, marges), l'endettement (D/E) et la génération de cash-flow.",
    anatomyVisual: {
      kicker: "1.3 · Anatomie",
      title: "Les trois états financiers, un seul récit",
      lead: "Résultat, bilan et cash-flow racontent la même entreprise sous trois angles : performance, structure, liquidité.",
      chain: [
        { label: "Résultat", detail: "revenus, marges" },
        { label: "Bilan", detail: "actif = passif + CP" },
        { label: "Cash-flow", detail: "trésorerie réelle" },
      ],
      callouts: [
        { label: "Rentabilité", value: "ROE / ROA" },
        { label: "Solidité", value: "D/E" },
      ],
      reading: "Un bénéfice sans cash-flow associé est un signal d'alerte : la trésorerie ne se manipule pas aussi facilement qu'un résultat comptable.",
      altPrimary: "Anatomie financière d'une entreprise",
      altSecondary: "Vue d'ensemble des états financiers : compte de résultat, bilan et flux de trésorerie",
    },
    widgetsHeading: "Widgets — pilotez les fondamentaux",
  },

  outils: {
    conceptHeading: "Concept",
    conceptBody: "Pour transformer les données en décision, on s'appuie sur des outils : les ratios (P/E, P/B, D/E, ROE), le modèle DCF (actualisation des flux), l'analyse sectorielle, la comparaison entre pairs (peer comparison) et l'analyse SWOT. Aucun multiple ne se lit seul : il se compare à la croissance, au secteur et à l'historique.",
    capitalMachineVisual: {
      kicker: "1.4 · Machine d'allocation",
      title: "Des entrées macro aux sorties de marché",
      lead: "Les outils d'analyse sont la mécanique qui convertit une lecture macro en allocation explicite.",
      chain: [
        { label: "Entrées", detail: "macro, comptes" },
        { label: "Modèles", detail: "ratios, DCF" },
        { label: "Arbitrage", detail: "pairs, secteur" },
        { label: "Allocation", detail: "FX, taux, actions" },
      ],
      callouts: [
        { label: "Multiple", value: "P/E vs croissance" },
        { label: "Actualisation", value: "WACC & terminal" },
      ],
      reading: "Un modèle n'est jamais une vérité : c'est un cadre d'hypothèses dont chaque paramètre doit être défendable.",
    },
    widgetsHeading: "Boîte à outils interactive",
  },

  previsions: {
    conceptHeading: "Concept",
    conceptBody: "Prévoir consiste à projeter l'avenir à partir des tendances historiques, de scénarios (optimiste, neutre, pessimiste) et de la guidance communiquée par les entreprises. La guidance pèse souvent plus que le dernier résultat publié : elle oriente les anticipations du marché.",
    energyChainVisual: {
      kicker: "1.5 · Chaîne de prévision",
      title: "Anatomie d'un choc : de l'énergie au repricing de l'euro",
      lead: "Une prévision institutionnelle n'est pas une opinion : c'est une chaîne causale datée, avec ses points de rupture.",
      chain: [
        { label: "Choc d'offre", detail: "gaz, pétrole" },
        { label: "Coûts", detail: "production" },
        { label: "Inflation", detail: "IPC, core" },
        { label: "Réponse BCE", detail: "taux" },
        { label: "Croissance / EUR", detail: "repricing" },
      ],
      callouts: [
        { label: "Horizon", value: "3 → 12 mois" },
        { label: "Point de rupture", value: "Taux réels > 0" },
      ],
      reading: "Chaque maillon est falsifiable : si les coûts refluent avant la réponse monétaire, le scénario devient caduc et se révise.",
    },
    plannerHeading: "Planificateur de scénarios",
  },

  cas: {
    caseTitle: (i: number, title: string) => `Cas ${i} — ${title}`,
    capstoneHeading: "Capstone — Appliquer l'analyse fondamentale",
    capstoneBody: "Dix moments de marché réels, rejouables bougie par bougie. Pour chacun : lisez le contexte, prenez votre décision avant la révélation, puis comparez avec ce qui s'est réellement passé. La difficulté monte progressivement.",
    analyzedCount: (n: number) => `${n}/10 cas analysés`,
    groups: {
      macro: "1.2 · Macroéconomie",
      micro: "1.3 · Microéconomie",
      outils: "1.4 · Outils d'analyse",
      previsions: "1.5 · Prévisions",
    },
    casesRange: (from: number, to: number) => `Cas ${from}–${to}`,
    caseIndexLabel: (i: number) => `Cas ${i}`,
    levelLabel: (level: number | string) => `Niv. ${level}`,
  },

  completion: {
    titleReady: "Certification finale débloquée",
    titleLocked: "Progressez vers la certification",
    bodyReady: "Les 5 leçons sont validées (≥ 70 %). Lancez la certification finale : 3 niveaux × 10 scénarios institutionnels.",
    bodyLocked: (certifiedLessons: number, total: number, cases: number) =>
      `Chaque leçon vaut 20 %, créditée seulement quand son évaluation est réussie. ${certifiedLessons}/${total} leçons validées · ${cases}/10 cas rejoués.`,
    cta: "Passer la Certification Finale",
    lockedCta: (percent: number) => `Certification verrouillée — ${percent}%`,
  },
};

export type ContentDictionary = typeof contentFr;
