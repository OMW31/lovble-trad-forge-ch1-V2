// ============================================================================
// Visual Question Bank Engine (F12)
// ----------------------------------------------------------------------------
// Banque de questions PAR visuel utilisée dans la Partie B des évaluations de
// leçon. Objectif : éviter la répétition des mêmes questions à chaque tentative.
// Chaque visuel possède plusieurs formulations (angles d'interprétation,
// distracteurs distincts). Le moteur pioche une formulation en rotation, en
// mémorisant les dernières servies (localStorage) pour ne pas les rejouer avant
// d'avoir épuisé le pool.
//
// Extension future : porter chaque pool à 20-50 questions (plusieurs niveaux et
// angles). La structure ci-dessous est conçue pour scaler sans changement d'API.
// ============================================================================

import type { EvaluationQuestion } from "./evaluation-bank";

export interface VisualQuestionSeed {
  prompt: string;
  choices: { id: string; label: string }[];
  correctId: string;
  explanation: string;
}

export interface VisualBankEntry {
  widget: string;
  /** Titre pédagogique court du visuel (FR) — les visuels eux-mêmes restent EN. */
  title: string;
  seeds: VisualQuestionSeed[];
}

// Jeux de choix réutilisables (distracteurs cohérents).
const readChain = [
  { id: "a", label: "Driver → transmission → actif impacté → invalidation" },
  { id: "b", label: "Actif → couleur → conclusion définitive" },
  { id: "c", label: "Inversion systématique du signal publié" },
  { id: "d", label: "Ignorer le consensus et lire le prix brut" },
];

export const VISUAL_QUESTION_BANK: Record<string, VisualBankEntry> = {
  a1: {
    widget: "Mission Briefing",
    title: "Mission Briefing — thèse institutionnelle",
    seeds: [
      {
        prompt: "Une thèse exploitable dans un Mission Briefing doit contenir au minimum :",
        choices: [
          { id: "a", label: "Driver dominant, mécanisme de transmission et risque d'invalidation" },
          { id: "b", label: "Une opinion directionnelle sans condition" },
          { id: "c", label: "Un objectif de prix sans catalyseur" },
          { id: "d", label: "Une statistique isolée" },
        ],
        correctId: "a",
        explanation: "Le raisonnement institutionnel est conditionnel : thèse, transmission, invalidation.",
      },
      {
        prompt: "Dans un briefing, à quoi sert explicitement le point d'invalidation ?",
        choices: [
          { id: "a", label: "Définir à l'avance les conditions qui rendent la thèse fausse" },
          { id: "b", label: "Garantir un objectif de prix" },
          { id: "c", label: "Supprimer le besoin de gérer le risque" },
          { id: "d", label: "Remplacer le driver dominant" },
        ],
        correctId: "a",
        explanation: "L'invalidation évite le biais narratif : on sait quand couper la thèse.",
      },
      {
        prompt: "La « Question Clé » d'un Mission Briefing sert surtout à :",
        choices: [
          { id: "a", label: "Cadrer l'objectif d'apprentissage et hiérarchiser la lecture" },
          { id: "b", label: "Donner la réponse finale au marché" },
          { id: "c", label: "Lister tous les indicateurs sans priorité" },
          { id: "d", label: "Décorer l'en-tête de la leçon" },
        ],
        correctId: "a",
        explanation: "Elle oriente l'attention vers le driver décisif de la leçon.",
      },
    ],
  },
  a2: {
    widget: "Macro Indicator Lab",
    title: "Macro Indicator Lab — signal→indicateur→impact",
    seeds: [
      {
        prompt: "La hiérarchie signal → indicateur → impact sert à :",
        choices: [
          { id: "a", label: "Transformer une publication en scénario marché exploitable" },
          { id: "b", label: "Lire les données sans consensus" },
          { id: "c", label: "Écarter la temporalité des indicateurs" },
          { id: "d", label: "Remplacer l'analyse par un seul chiffre" },
        ],
        correctId: "a",
        explanation: "Le signal n'a de valeur que relié à une transmission et à une classe d'actifs.",
      },
      {
        prompt: "Dans le lab, distinguer indicateur avancé et retardé permet de :",
        choices: [
          { id: "a", label: "Anticiper l'inflexion avant sa confirmation officielle" },
          { id: "b", label: "Ignorer les enquêtes de confiance" },
          { id: "c", label: "Considérer tous les indicateurs comme équivalents" },
          { id: "d", label: "Lire uniquement le PIB final" },
        ],
        correctId: "a",
        explanation: "Les avancés (PMI, confiance) captent les intentions avant les données finales.",
      },
      {
        prompt: "Un indicateur isolé sans transmission associée est :",
        choices: [
          { id: "a", label: "Peu exploitable : il manque le canal d'impact marché" },
          { id: "b", label: "Suffisant pour décider seul" },
          { id: "c", label: "Toujours prioritaire sur le consensus" },
          { id: "d", label: "Un signal technique" },
        ],
        correctId: "a",
        explanation: "L'impact naît de la chaîne indicateur → taux/devise/actions, pas du chiffre nu.",
      },
    ],
  },
  a3: {
    widget: "CompanyDashboard",
    title: "Company Dashboard — diagnostic micro",
    seeds: [
      {
        prompt: "Le bon diagnostic micro relie les métriques à :",
        choices: [
          { id: "a", label: "Qualité du business, risque financier et réaction attendue du marché" },
          { id: "b", label: "Une note isolée sans contexte" },
          { id: "c", label: "Une lecture macro seulement" },
          { id: "d", label: "Un choix automatique long" },
        ],
        correctId: "a",
        explanation: "Les dashboards transforment des chiffres en risque, qualité et scénario.",
      },
      {
        prompt: "Sur un dashboard société, comparer aux pairs permet surtout de :",
        choices: [
          { id: "a", label: "Situer la prime/décote relative et repérer une anomalie" },
          { id: "b", label: "Fixer le prix exact de demain" },
          { id: "c", label: "Ignorer les marges" },
          { id: "d", label: "Remplacer le bilan" },
        ],
        correctId: "a",
        explanation: "La lecture relative révèle une valorisation justifiée ou anormale.",
      },
      {
        prompt: "Un dashboard micro complet doit croiser au minimum :",
        choices: [
          { id: "a", label: "Croissance, rentabilité, solvabilité et génération de cash" },
          { id: "b", label: "Le chiffre d'affaires uniquement" },
          { id: "c", label: "La variation du cours seule" },
          { id: "d", label: "Une opinion sectorielle non mesurée" },
        ],
        correctId: "a",
        explanation: "La santé est multidimensionnelle : performance + solvabilité + cash.",
      },
    ],
  },
  a4: {
    widget: "NFP Interpreter",
    title: "NFP Interpreter — emploi & salaires",
    seeds: [
      {
        prompt: "Un NFP fort avec salaires en hausse influence surtout :",
        choices: [
          { id: "a", label: "Les anticipations de taux (plus restrictives) et la devise" },
          { id: "b", label: "Les taux automatiquement à la baisse" },
          { id: "c", label: "Uniquement les actions d'une entreprise" },
          { id: "d", label: "Rien tant que le chiffre est positif" },
        ],
        correctId: "a",
        explanation: "Emploi fort + salaires nourrissent la persistance inflationniste → banque centrale plus hawkish.",
      },
      {
        prompt: "Pourquoi la composante salaires du NFP est-elle scrutée ?",
        choices: [
          { id: "a", label: "Elle alimente l'inflation des services, clé pour les banques centrales" },
          { id: "b", label: "Elle mesure la dette publique" },
          { id: "c", label: "Elle fixe le multiple boursier" },
          { id: "d", label: "Elle n'a aucun impact" },
        ],
        correctId: "a",
        explanation: "La dynamique salariale conditionne la trajectoire des taux.",
      },
      {
        prompt: "Un NFP supérieur au consensus mais avec révisions fortement baissières :",
        choices: [
          { id: "a", label: "Doit être lu avec nuance : la tendance peut contredire le titre" },
          { id: "b", label: "Est toujours haussier pour la devise" },
          { id: "c", label: "N'a aucune importance" },
          { id: "d", label: "Invalide le consensus" },
        ],
        correctId: "a",
        explanation: "Les révisions modifient la trajectoire réelle du marché du travail.",
      },
    ],
  },
  a5: {
    widget: "Macro Dashboard",
    title: "Macro Dashboard — publié vs consensus",
    seeds: [
      {
        prompt: "Dans un dashboard macro, la première lecture robuste compare :",
        choices: [
          { id: "a", label: "Publié vs consensus puis impact probable par classe d'actifs" },
          { id: "b", label: "Uniquement le chiffre publié" },
          { id: "c", label: "Uniquement la couleur de la bougie" },
          { id: "d", label: "La donnée la plus ancienne" },
        ],
        correctId: "a",
        explanation: "Le marché price la surprise relative au consensus, puis la transmet aux actifs.",
      },
      {
        prompt: "Pourquoi la surprise vs consensus prime souvent sur le niveau absolu ?",
        choices: [
          { id: "a", label: "Le marché a déjà pricé l'attendu ; il réagit à l'écart" },
          { id: "b", label: "Le consensus est décoratif" },
          { id: "c", label: "Seul le niveau publié compte" },
          { id: "d", label: "La surprise ne concerne que les cryptos" },
        ],
        correctId: "a",
        explanation: "La réaction vient de la révision des anticipations, donc de l'écart au consensus.",
      },
      {
        prompt: "Un dashboard macro complet doit hiérarchiser :",
        choices: [
          { id: "a", label: "Les indicateurs par importance et par canal de transmission" },
          { id: "b", label: "Les indicateurs par ordre alphabétique" },
          { id: "c", label: "Uniquement la volatilité affichée" },
          { id: "d", label: "La couleur de fond" },
        ],
        correctId: "a",
        explanation: "Tous les indicateurs ne pèsent pas également selon le régime.",
      },
    ],
  },
  a6: {
    widget: "CompanyHealthScore",
    title: "Company Health Score — santé financière",
    seeds: [
      {
        prompt: "Un score de santé entreprise doit combiner :",
        choices: [
          { id: "a", label: "Croissance, marge, dette, liquidité et génération de cash" },
          { id: "b", label: "Le chiffre d'affaires seul" },
          { id: "c", label: "La variation du prix uniquement" },
          { id: "d", label: "Une opinion sectorielle non mesurée" },
        ],
        correctId: "a",
        explanation: "La santé financière est multidimensionnelle : performance, solvabilité, cash.",
      },
      {
        prompt: "Une société rentable mais à trésorerie tendue présente surtout un risque de :",
        choices: [
          { id: "a", label: "Liquidité, malgré un résultat comptable positif" },
          { id: "b", label: "Hausse automatique du multiple" },
          { id: "c", label: "Baisse obligatoire de la dette" },
          { id: "d", label: "Aucun risque" },
        ],
        correctId: "a",
        explanation: "Le résultat comptable ne finance pas le cycle d'exploitation ni les échéances.",
      },
      {
        prompt: "Pourquoi pondérer les composantes du score selon le secteur ?",
        choices: [
          { id: "a", label: "Le levier et les marges « normaux » diffèrent d'un secteur à l'autre" },
          { id: "b", label: "Pour masquer la dette" },
          { id: "c", label: "Pour ignorer le cash" },
          { id: "d", label: "Ce n'est jamais nécessaire" },
        ],
        correctId: "a",
        explanation: "Un ratio n'est lisible que comparé à des pairs pertinents.",
      },
    ],
  },
  a7: {
    widget: "FinancialRatios",
    title: "Financial Ratios — levier & interprétation",
    seeds: [
      {
        prompt: "Un ratio dette/capitaux propres élevé doit être interprété avec :",
        choices: [
          { id: "a", label: "Stabilité des cash-flows, coût de la dette et secteur" },
          { id: "b", label: "Une règle universelle sans contexte" },
          { id: "c", label: "La seule croissance du PIB" },
          { id: "d", label: "La forme du chandelier" },
        ],
        correctId: "a",
        explanation: "Le levier acceptable dépend de la prévisibilité des flux et du coût de financement.",
      },
      {
        prompt: "Le ROE isolé peut être trompeur car il :",
        choices: [
          { id: "a", label: "Peut être gonflé par un fort levier financier" },
          { id: "b", label: "Mesure la duration obligataire" },
          { id: "c", label: "Ignore toujours les marges" },
          { id: "d", label: "Est indépendant de la dette" },
        ],
        correctId: "a",
        explanation: "Un ROE élevé porté par la dette masque un risque de solvabilité.",
      },
      {
        prompt: "Comparer des ratios n'a de sens qu'entre :",
        choices: [
          { id: "a", label: "Pairs au modèle, marges et risque comparables" },
          { id: "b", label: "Toutes les entreprises mondiales" },
          { id: "c", label: "Secteurs sans lien" },
          { id: "d", label: "Actifs de classes différentes" },
        ],
        correctId: "a",
        explanation: "L'homogénéité du modèle économique conditionne la comparabilité.",
      },
    ],
  },
  a8: {
    widget: "BalanceSheetExplorer",
    title: "Balance Sheet Explorer — structure du bilan",
    seeds: [
      {
        prompt: "Dans un bilan, l'identité de base est :",
        choices: [
          { id: "a", label: "Actif = passif + capitaux propres" },
          { id: "b", label: "Revenus = dette + cash" },
          { id: "c", label: "Inflation = marge + stocks" },
          { id: "d", label: "Prix = volume + bêta" },
        ],
        correctId: "a",
        explanation: "Le bilan décrit les ressources économiques et leur financement.",
      },
      {
        prompt: "Une hausse des stocks non accompagnée de ventes peut signaler :",
        choices: [
          { id: "a", label: "Un risque de mévente / immobilisation de cash" },
          { id: "b", label: "Une amélioration certaine des marges" },
          { id: "c", label: "Une baisse de la dette" },
          { id: "d", label: "Aucune information" },
        ],
        correctId: "a",
        explanation: "Le BFR se dégrade et le cash se retrouve immobilisé.",
      },
      {
        prompt: "Le bilan complète le compte de résultat parce qu'il montre :",
        choices: [
          { id: "a", label: "La solidité patrimoniale et la structure de financement" },
          { id: "b", label: "Le cours de bourse futur" },
          { id: "c", label: "Le taux directeur" },
          { id: "d", label: "Les seules ventes" },
        ],
        correctId: "a",
        explanation: "Résultat = performance ; bilan = solvabilité et structure.",
      },
    ],
  },
  a9: {
    widget: "ScenarioBuilder",
    title: "Scenario Builder — scénario institutionnel",
    seeds: [
      {
        prompt: "Un scénario institutionnel complet doit contenir :",
        choices: [
          { id: "a", label: "Thèse, catalyseur, transmission marché, invalidation et risque" },
          { id: "b", label: "Une opinion directionnelle sans invalidation" },
          { id: "c", label: "Uniquement un objectif de prix" },
          { id: "d", label: "Une capture d'écran sans hypothèse" },
        ],
        correctId: "a",
        explanation: "La qualité du scénario dépend autant de l'invalidation que de la thèse.",
      },
      {
        prompt: "Pondérer plusieurs scénarios (optimiste/neutre/pessimiste) sert à :",
        choices: [
          { id: "a", label: "Mesurer une valeur attendue et son risque" },
          { id: "b", label: "Choisir toujours l'optimiste" },
          { id: "c", label: "Supprimer l'incertitude" },
          { id: "d", label: "Ignorer les probabilités" },
        ],
        correctId: "a",
        explanation: "Les scénarios rendent explicites hypothèses, probabilités et conséquences.",
      },
      {
        prompt: "Le catalyseur, dans un scénario, correspond à :",
        choices: [
          { id: "a", label: "L'événement attendu qui déclenche la transmission" },
          { id: "b", label: "Le prix cible" },
          { id: "c", label: "Une décoration narrative" },
          { id: "d", label: "L'absence de driver" },
        ],
        correctId: "a",
        explanation: "Sans catalyseur, la thèse reste théorique et non datée.",
      },
    ],
  },
  a10: {
    widget: "Visual Hybrid Layer",
    title: "Visual Hybrid Layer — visuels + natif",
    seeds: [
      {
        prompt: "Pourquoi reconstruire les schémas denses en HTML/SVG natif ?",
        choices: [
          { id: "a", label: "Pour garantir lisibilité, accessibilité et texte fiable" },
          { id: "b", label: "Pour rendre les images inutiles" },
          { id: "c", label: "Pour cacher les relations causales" },
          { id: "d", label: "Pour éviter toute hiérarchie visuelle" },
        ],
        correctId: "a",
        explanation: "Les visuels servent l'immersion ; l'info critique reste native et fiable.",
      },
      {
        prompt: "Le rôle d'un visuel pédagogique premium est de :",
        choices: [
          { id: "a", label: "Renforcer la compréhension d'une mécanique, pas de la remplacer" },
          { id: "b", label: "Décorer sans intention" },
          { id: "c", label: "Masquer les données" },
          { id: "d", label: "Éviter tout texte explicatif" },
        ],
        correctId: "a",
        explanation: "Le visuel appuie la note d'application qui l'accompagne.",
      },
      {
        prompt: "Une note d'application associée à un visuel EN sert à :",
        choices: [
          { id: "a", label: "Permettre la compréhension multilingue sans retoucher le visuel" },
          { id: "b", label: "Traduire le visuel lui-même" },
          { id: "c", label: "Supprimer le visuel" },
          { id: "d", label: "Cacher la source" },
        ],
        correctId: "a",
        explanation: "Les visuels restent EN ; les notes traduisibles portent la pédagogie.",
      },
    ],
  },
  a11: {
    widget: "MacroRegimeRadar",
    title: "Macro Regime Radar — régimes de marché",
    seeds: [
      {
        prompt: "Sur un radar de régimes, la lecture experte consiste à repérer :",
        choices: [
          { id: "a", label: "Le régime dominant et les axes qui l'invalident" },
          { id: "b", label: "La couleur la plus visible uniquement" },
          { id: "c", label: "Le score le plus faible comme signal d'achat" },
          { id: "d", label: "Un seul axe, sans corrélations" },
        ],
        correctId: "a",
        explanation: "Un radar hiérarchise les forces et identifie les signaux de bascule.",
      },
      {
        prompt: "Un régime « Goldilocks » sur le radar combine typiquement :",
        choices: [
          { id: "a", label: "Croissance solide et inflation maîtrisée" },
          { id: "b", label: "Stagflation et stress de liquidité" },
          { id: "c", label: "Récession et chômage élevé" },
          { id: "d", label: "Inflation galopante seule" },
        ],
        correctId: "a",
        explanation: "Croissance sans excès inflationniste soutient earnings et appétit pour le risque.",
      },
      {
        prompt: "Suivre l'évolution des axes du radar dans le temps permet de :",
        choices: [
          { id: "a", label: "Anticiper une transition de régime avant qu'elle soit consensuelle" },
          { id: "b", label: "Fixer un prix cible" },
          { id: "c", label: "Ignorer la liquidité" },
          { id: "d", label: "Supprimer le risque" },
        ],
        correctId: "a",
        explanation: "La dynamique des axes signale les bascules de régime.",
      },
    ],
  },
  a12: {
    widget: "DCF Simulator",
    title: "DCF Simulator — actualisation",
    seeds: [
      {
        prompt: "Dans un DCF, une hausse du WACC affecte la valorisation en :",
        choices: [
          { id: "a", label: "Réduisant la valeur actuelle des flux futurs" },
          { id: "b", label: "Augmentant toujours la valeur terminale" },
          { id: "c", label: "Ne changeant que le chiffre d'affaires" },
          { id: "d", label: "Supprimant le risque de prévision" },
        ],
        correctId: "a",
        explanation: "Le WACC est le taux d'actualisation : plus il est haut, moins les flux futurs valent aujourd'hui.",
      },
      {
        prompt: "La valeur terminale d'un DCF est sensible surtout à :",
        choices: [
          { id: "a", label: "L'hypothèse de croissance perpétuelle et au WACC" },
          { id: "b", label: "Le cours de la veille" },
          { id: "c", label: "Le volume échangé" },
          { id: "d", label: "La couleur du graphique" },
        ],
        correctId: "a",
        explanation: "Un petit écart g/WACC change fortement la terminal value.",
      },
      {
        prompt: "Un DCF est robuste quand il montre :",
        choices: [
          { id: "a", label: "La sensibilité de la valeur aux hypothèses clés" },
          { id: "b", label: "Un prix cible unique figé" },
          { id: "c", label: "Une absence d'incertitude" },
          { id: "d", label: "Des hypothèses invisibles" },
        ],
        correctId: "a",
        explanation: "La valeur world-class vient de l'analyse de sensibilité.",
      },
    ],
  },
  a13: {
    widget: "Intermarket Correlation Map",
    title: "Intermarket Map — corrélations",
    seeds: [
      {
        prompt: "Pour valider un signal FX, l'intermarket utile consiste à regarder :",
        choices: [
          { id: "a", label: "DXY, taux, commodities et appétit pour le risque" },
          { id: "b", label: "Un seul ticker isolé" },
          { id: "c", label: "La couleur de fond du graphique" },
          { id: "d", label: "Les données sans temporalité" },
        ],
        correctId: "a",
        explanation: "Les flux se confirment ou se contredisent entre obligations, devises, commodities et risque.",
      },
      {
        prompt: "Une divergence intermarket (ex. actions ↑ mais crédit ↓) suggère :",
        choices: [
          { id: "a", label: "Un signal fragile à surveiller, pas une confirmation" },
          { id: "b", label: "Une certitude haussière" },
          { id: "c", label: "Aucune information" },
          { id: "d", label: "Une invalidation du consensus" },
        ],
        correctId: "a",
        explanation: "Les divergences signalent un risque de retournement ou de faux signal.",
      },
      {
        prompt: "Les corrélations intermarket sont surtout :",
        choices: [
          { id: "a", label: "Régime-dépendantes : elles évoluent avec le contexte macro" },
          { id: "b", label: "Constantes et universelles" },
          { id: "c", label: "Inutiles hors crise" },
          { id: "d", label: "Fixées par la banque centrale" },
        ],
        correctId: "a",
        explanation: "Une corrélation stable en expansion peut s'inverser en stress.",
      },
    ],
  },
  a14: {
    widget: "Yield Curve Visualizer",
    title: "Yield Curve — courbe des taux",
    seeds: [
      {
        prompt: "Une courbe fortement inversée signale souvent :",
        choices: [
          { id: "a", label: "Resserrement monétaire et risque de ralentissement futur" },
          { id: "b", label: "Croissance nominale sans risque" },
          { id: "c", label: "Aucune information macro" },
          { id: "d", label: "Hausse garantie des actions" },
        ],
        correctId: "a",
        explanation: "L'inversion reflète des taux courts restrictifs et des anticipations de ralentissement.",
      },
      {
        prompt: "Un « bull steepening » (pentification par baisse des taux courts) traduit :",
        choices: [
          { id: "a", label: "Des anticipations d'assouplissement monétaire" },
          { id: "b", label: "Un durcissement immédiat" },
          { id: "c", label: "Une inflation ignorée" },
          { id: "d", label: "Aucun changement d'anticipation" },
        ],
        correctId: "a",
        explanation: "La baisse des taux courts anticipe des coupes de taux directrices.",
      },
      {
        prompt: "La forme de la courbe informe surtout sur :",
        choices: [
          { id: "a", label: "Le cycle et les anticipations de politique monétaire" },
          { id: "b", label: "La marge d'une entreprise" },
          { id: "c", label: "Le multiple sectoriel" },
          { id: "d", label: "La couleur des bougies" },
        ],
        correctId: "a",
        explanation: "La courbe est un condensé des anticipations de croissance et de taux.",
      },
    ],
  },
  a15: {
    widget: "ForecastScenarioPlanner",
    title: "Forecast Planner — planification de scénarios",
    seeds: [
      {
        prompt: "Un planificateur de scénarios doit rendre visibles :",
        choices: [
          { id: "a", label: "Hypothèses, probabilités, impact et décision" },
          { id: "b", label: "Une seule trajectoire non testée" },
          { id: "c", label: "Un prix cible sans drivers" },
          { id: "d", label: "Un résultat garanti" },
        ],
        correctId: "a",
        explanation: "La valeur vient de la comparaison des chemins possibles et de leurs conséquences.",
      },
      {
        prompt: "Projeter des revenus de façon robuste combine :",
        choices: [
          { id: "a", label: "Tendance historique + guidance + drivers sectoriels" },
          { id: "b", label: "Le dernier chiffre seul" },
          { id: "c", label: "Le plus haut du graphique" },
          { id: "d", label: "Un multiple sans volume" },
        ],
        correctId: "a",
        explanation: "Une projection combine passé, signaux forward-looking et environnement sectoriel.",
      },
      {
        prompt: "Attribuer des probabilités aux scénarios sert à :",
        choices: [
          { id: "a", label: "Calculer une espérance et dimensionner le risque" },
          { id: "b", label: "Choisir le scénario préféré" },
          { id: "c", label: "Supprimer l'incertitude" },
          { id: "d", label: "Ignorer l'invalidation" },
        ],
        correctId: "a",
        explanation: "L'espérance pondérée guide la décision et le sizing.",
      },
    ],
  },
  a16: {
    widget: "Capstone Index",
    title: "Capstone Index — index de cas",
    seeds: [
      {
        prompt: "Dans un index de cas, le lien doit pointer vers :",
        choices: [
          { id: "a", label: "Le cas exact à rejouer, pas seulement la leçon" },
          { id: "b", label: "Le haut de page uniquement" },
          { id: "c", label: "Une route inexistante" },
          { id: "d", label: "Le premier widget de la section" },
        ],
        correctId: "a",
        explanation: "Le capstone est efficace si l'apprenant retrouve immédiatement le scénario ciblé.",
      },
      {
        prompt: "Regrouper les cas par leçon dans l'index permet de :",
        choices: [
          { id: "a", label: "Réviser par compétence et cibler ses lacunes" },
          { id: "b", label: "Masquer la progression" },
          { id: "c", label: "Empêcher la navigation" },
          { id: "d", label: "Supprimer les ancres" },
        ],
        correctId: "a",
        explanation: "Le regroupement par leçon structure la révision.",
      },
      {
        prompt: "Un bon capstone doit surtout :",
        choices: [
          { id: "a", label: "Faire rejouer les mécaniques dans un contexte réaliste" },
          { id: "b", label: "Donner directement les réponses" },
          { id: "c", label: "Éviter tout scénario" },
          { id: "d", label: "Rester purement théorique" },
        ],
        correctId: "a",
        explanation: "Le capstone consolide par la pratique appliquée.",
      },
    ],
  },
  a17: {
    widget: "MarketDriverVisualizer",
    title: "Market Driver Visualizer — chaîne causale",
    seeds: [
      {
        prompt: "Dans un visualiseur de drivers, le bon ordre de lecture est :",
        choices: readChain,
        correctId: "a",
        explanation: "La valeur du widget vient de la chaîne causale, pas d'une direction brute isolée.",
      },
      {
        prompt: "Le code couleur (vert/rouge) sur les cartes d'actifs indique :",
        choices: [
          { id: "a", label: "L'impact directionnel attendu (bullish/bearish) du driver" },
          { id: "b", label: "La popularité de l'actif" },
          { id: "c", label: "Le volume échangé" },
          { id: "d", label: "Une préférence esthétique" },
        ],
        correctId: "a",
        explanation: "Vert = impact haussier attendu, rouge = baissier, selon la transmission.",
      },
      {
        prompt: "Ajuster le curseur d'inflation dans le visualiseur illustre surtout :",
        choices: [
          { id: "a", label: "Inflation ↑ → posture hawkish → taux ↑ → obligations ↓" },
          { id: "b", label: "Inflation ↑ → taux ↓ automatiquement" },
          { id: "c", label: "Aucune transmission" },
          { id: "d", label: "Un effet uniquement sur les actions tech" },
        ],
        correctId: "a",
        explanation: "La mécanique enchaîne inflation → banque centrale → taux → classes d'actifs.",
      },
    ],
  },
};

/**
 * Construit une question d'évaluation Partie B à partir de la banque d'un visuel,
 * en piochant le seed d'index `seedIndex` (rotation gérée par l'appelant).
 * Retourne `null` si le visuel n'a pas d'entrée dans la banque.
 */
export function buildVisualQuestion(
  visualId: string,
  seedIndex: number,
): EvaluationQuestion | null {
  const entry = VISUAL_QUESTION_BANK[visualId];
  if (!entry || entry.seeds.length === 0) return null;
  const idx = ((seedIndex % entry.seeds.length) + entry.seeds.length) % entry.seeds.length;
  const seed = entry.seeds[idx];
  return {
    id: `${visualId}-b-${idx}`,
    part: "B",
    prompt: seed.prompt,
    choices: seed.choices,
    correctId: seed.correctId,
    explanation: seed.explanation,
    widget: entry.widget,
    visualId,
  };
}

// -------- Rotation memory (localStorage, anti-répétition ≥ pool size) ---------

const ROTATION_KEY = "tradforge:visualbank:rotation:v1";

function readRotation(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(ROTATION_KEY) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

function writeRotation(state: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ROTATION_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

/** Renvoie l'index de seed courant pour un visuel puis avance le compteur. */
export function nextSeedIndex(visualId: string): number {
  const state = readRotation();
  const current = state[visualId] ?? 0;
  state[visualId] = current + 1;
  writeRotation(state);
  return current;
}
