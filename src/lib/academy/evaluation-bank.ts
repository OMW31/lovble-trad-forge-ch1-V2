import type { CaseStudy } from "./market-data";

export type EvaluationLevel = "standard" | "high" | "premium";
export type EvaluationPart = "A" | "B" | "C";
export type CoreLessonId = "intro" | "macro" | "micro" | "outils" | "previsions";

export interface EvaluationQuestion {
  id: string;
  part: EvaluationPart;
  prompt: string;
  choices: { id: string; label: string }[];
  correctId: string;
  explanation: string;
  widget?: string;
  caseId?: string;
  visualId?: string;
  level?: EvaluationLevel;
}

export interface EvaluationScorePart {
  part: EvaluationPart;
  score: number;
  correct: number;
  total: number;
}

const ratesChoices = [
  { id: "a", label: "Taux attendus plus hauts plus longtemps → devise soutenue" },
  { id: "b", label: "Taux plus hauts → devise automatiquement affaiblie" },
  { id: "c", label: "Aucun effet tant que le chiffre publié est positif" },
  { id: "d", label: "Le marché attend toujours la séance suivante" },
];

const valuationChoices = [
  { id: "a", label: "Comparer multiple, croissance, marges, risque et pairs" },
  { id: "b", label: "Décider uniquement avec le P/E absolu" },
  { id: "c", label: "Ignorer le coût du capital si la société croît" },
  { id: "d", label: "Comparer seulement au plus haut historique" },
];

const byLesson: Record<CoreLessonId, EvaluationQuestion[]> = {
  intro: [
    {
      id: "intro-a-1",
      part: "A",
      prompt: "La valeur intrinsèque sert d'abord à:",
      choices: [
        { id: "a", label: "Comparer le prix de marché à une estimation fondée sur les fondamentaux" },
        { id: "b", label: "Supprimer l'incertitude de timing" },
        { id: "c", label: "Remplacer toute gestion du risque" },
        { id: "d", label: "Prédire chaque bougie intraday" },
      ],
      correctId: "a",
      explanation: "L'analyse fondamentale estime une valeur et exploite l'écart prix/valeur, sans garantir le timing.",
    },
    {
      id: "intro-a-2",
      part: "A",
      prompt: "Vrai/Faux justifié: un marché parfaitement efficient laisserait peu d'opportunités fondamentales.",
      choices: [
        { id: "a", label: "Vrai — le prix intégrerait déjà l'information disponible" },
        { id: "b", label: "Faux — plus d'efficience crée mécaniquement plus d'inefficiences" },
        { id: "c", label: "Faux — la valeur intrinsèque n'est jamais utilisée" },
        { id: "d", label: "Indécidable — l'efficience ne concerne que les options" },
      ],
      correctId: "a",
      explanation: "L'opportunité naît des imperfections: retard d'intégration, sur-réaction ou mauvaise pondération des drivers.",
    },
    {
      id: "intro-a-3",
      part: "A",
      prompt: "Le retour à la moyenne décrit principalement:",
      choices: [
        { id: "a", label: "La tendance du prix à converger vers une valeur justifiée à long terme" },
        { id: "b", label: "Une obligation de rebond immédiat après toute baisse" },
        { id: "c", label: "Un signal technique de scalping uniquement" },
        { id: "d", label: "Un principe qui annule les chocs macro" },
      ],
      correctId: "a",
      explanation: "Le principe est probabiliste et long terme: il n'empêche ni les excès ni les délais de convergence.",
    },
    {
      id: "intro-a-4",
      part: "A",
      prompt: "Associez correctement le driver au régime: croissance forte + inflation maîtrisée correspond plutôt à:",
      choices: [
        { id: "a", label: "Goldilocks / expansion de qualité" },
        { id: "b", label: "Stagflation" },
        { id: "c", label: "Récession de bilan" },
        { id: "d", label: "Stress de liquidité systémique" },
      ],
      correctId: "a",
      explanation: "Croissance solide sans pression inflationniste excessive soutient généralement risque, earnings et visibilité.",
    },
    {
      id: "intro-b-1",
      part: "B",
      widget: "MacroRegimeRadar",
      prompt: "Sur un radar de régimes, la lecture experte consiste à repérer:",
      choices: [
        { id: "a", label: "Le régime dominant et les axes qui l'invalident" },
        { id: "b", label: "La couleur la plus visible uniquement" },
        { id: "c", label: "Le score le plus faible comme signal d'achat" },
        { id: "d", label: "Un seul axe, sans corrélations" },
      ],
      correctId: "a",
      explanation: "Un radar sert à hiérarchiser les forces et à identifier les signaux qui feraient basculer le régime.",
      visualId: "a11",
    },
    {
      id: "intro-b-2",
      part: "B",
      widget: "MarketDriverVisualizer",
      prompt: "Dans un visualiseur de drivers, le bon ordre de lecture est:",
      choices: [
        { id: "a", label: "Driver → transmission → actif impacté → invalidation" },
        { id: "b", label: "Actif → couleur → conclusion définitive" },
        { id: "c", label: "Inversion systématique du signal" },
        { id: "d", label: "Ignorer le consensus" },
      ],
      correctId: "a",
      explanation: "La valeur du widget vient de la chaîne causale, pas d'une direction brute isolée.",
      visualId: "a17",
    },
    {
      id: "intro-b-3",
      part: "B",
      widget: "Mission Briefing",
      prompt: "Une thèse exploitable doit contenir au minimum:",
      choices: [
        { id: "a", label: "Driver dominant, mécanisme de transmission et risque d'invalidation" },
        { id: "b", label: "Une opinion directionnelle sans condition" },
        { id: "c", label: "Un objectif de prix sans catalyseur" },
        { id: "d", label: "Une statistique isolée" },
      ],
      correctId: "a",
      explanation: "Le raisonnement institutionnel est conditionnel: thèse, transmission, invalidation.",
      visualId: "a1",
    },
    {
      id: "intro-b-4",
      part: "B",
      widget: "Visual Hybrid Layer",
      prompt: "Pourquoi reconstruire les schémas denses en HTML/SVG natif ?",
      choices: [
        { id: "a", label: "Pour garantir lisibilité, accessibilité et texte fiable" },
        { id: "b", label: "Pour rendre les images inutiles" },
        { id: "c", label: "Pour cacher les relations causales" },
        { id: "d", label: "Pour éviter toute hiérarchie visuelle" },
      ],
      correctId: "a",
      explanation: "Les visuels servent l'immersion; les informations pédagogiques critiques doivent rester fiables et natives.",
      visualId: "a10",
    },
  ],
  macro: [
    {
      id: "macro-a-1",
      part: "A",
      prompt: "Une croissance publiée au-dessus du consensus dans une économie data-dependent implique d'abord:",
      choices: ratesChoices,
      correctId: "a",
      explanation: "Une surprise de croissance repousse souvent les baisses de taux attendues et renforce l'attrait relatif de la devise.",
    },
    {
      id: "macro-a-2",
      part: "A",
      prompt: "Associez correctement: indicateur avancé le plus typique parmi ces choix:",
      choices: [
        { id: "a", label: "PMI / enquêtes de confiance" },
        { id: "b", label: "PIB final déjà publié" },
        { id: "c", label: "Taux de chômage seul, retardé" },
        { id: "d", label: "Résultat net annuel audité" },
      ],
      correctId: "a",
      explanation: "Les PMI captent les intentions et inflexions avant les statistiques finales.",
    },
    {
      id: "macro-a-3",
      part: "A",
      prompt: "Une inflation supérieure aux attentes influence d'abord:",
      choices: [
        { id: "a", label: "Les anticipations de politique monétaire et les taux" },
        { id: "b", label: "Uniquement les bénéfices d'une seule entreprise" },
        { id: "c", label: "Le prix sans passer par les taux" },
        { id: "d", label: "Aucune classe d'actifs" },
      ],
      correctId: "a",
      explanation: "L'inflation modifie la trajectoire attendue des banques centrales, donc devises, obligations et actions.",
    },
    {
      id: "macro-a-4",
      part: "A",
      prompt: "Vrai/Faux justifié: la surprise vs consensus peut compter davantage que le chiffre absolu.",
      choices: [
        { id: "a", label: "Vrai — le marché price l'écart à l'attendu" },
        { id: "b", label: "Faux — seul le niveau publié compte" },
        { id: "c", label: "Faux — le consensus est décoratif" },
        { id: "d", label: "Vrai seulement pour les cryptos" },
      ],
      correctId: "a",
      explanation: "La réaction vient souvent de la révision des anticipations, donc de l'écart au consensus.",
    },
    {
      id: "macro-b-1",
      part: "B",
      widget: "Macro Dashboard",
      prompt: "Dans un dashboard macro, la première lecture robuste compare:",
      choices: [
        { id: "a", label: "Publié vs consensus puis impact probable par classe d'actifs" },
        { id: "b", label: "Uniquement le chiffre publié" },
        { id: "c", label: "Uniquement la couleur de la bougie" },
        { id: "d", label: "La donnée la plus ancienne" },
      ],
      correctId: "a",
      explanation: "Le marché price la surprise relative au consensus, puis la transmet aux taux, devises, actions et matières premières.",
      visualId: "a5",
    },
    {
      id: "macro-b-2",
      part: "B",
      widget: "NFP Interpreter",
      prompt: "Un NFP fort avec salaires en hausse influence surtout:",
      choices: ratesChoices,
      correctId: "a",
      explanation: "Emploi fort + salaires soutiennent la persistance inflationniste et une banque centrale plus restrictive.",
      visualId: "a4",
    },
    {
      id: "macro-b-3",
      part: "B",
      widget: "Yield Curve Visualizer",
      prompt: "Une courbe fortement inversée signale souvent:",
      choices: [
        { id: "a", label: "Resserrement monétaire et risque de ralentissement futur" },
        { id: "b", label: "Croissance nominale sans risque" },
        { id: "c", label: "Aucune information macro" },
        { id: "d", label: "Hausse garantie des actions" },
      ],
      correctId: "a",
      explanation: "L'inversion reflète des taux courts restrictifs et des anticipations de ralentissement / futures baisses de taux.",
      visualId: "a14",
    },
    {
      id: "macro-b-4",
      part: "B",
      widget: "Intermarket Correlation Map",
      prompt: "Pour valider un signal FX, l'intermarket utile consiste à regarder:",
      choices: [
        { id: "a", label: "DXY, taux, commodities et appétit pour le risque" },
        { id: "b", label: "Un seul ticker isolé" },
        { id: "c", label: "La couleur de fond du graphique" },
        { id: "d", label: "Les données sans temporalité" },
      ],
      correctId: "a",
      explanation: "Les flux se confirment ou se contredisent entre obligations, devises, matières premières et risque.",
      visualId: "a13",
    },
    {
      id: "macro-b-5",
      part: "B",
      widget: "Macro Indicator Lab",
      prompt: "La hiérarchie signal → indicateur → impact sert à:",
      choices: [
        { id: "a", label: "Transformer une publication en scénario marché exploitable" },
        { id: "b", label: "Lire les données sans consensus" },
        { id: "c", label: "Écarter la temporalité des indicateurs" },
        { id: "d", label: "Remplacer l'analyse par un seul chiffre" },
      ],
      correctId: "a",
      explanation: "Le signal n'a de valeur que lorsqu'il est relié à une transmission et à une classe d'actifs.",
      visualId: "a2",
    },
  ],
  micro: [
    {
      id: "micro-a-1",
      part: "A",
      prompt: "Le risque principal d'une entreprise rentable mais en manque de cash est:",
      choices: [
        { id: "a", label: "Tension de liquidité malgré un résultat comptable positif" },
        { id: "b", label: "Aucun risque si le compte de résultat est positif" },
        { id: "c", label: "Hausse automatique du multiple" },
        { id: "d", label: "Baisse obligatoire de la dette" },
      ],
      correctId: "a",
      explanation: "Le résultat comptable ne remplace pas la capacité à financer le cycle d'exploitation et les échéances.",
    },
    {
      id: "micro-a-2",
      part: "A",
      prompt: "Associez correctement: ROE mesure principalement:",
      choices: [
        { id: "a", label: "La rentabilité des capitaux propres" },
        { id: "b", label: "Le niveau des stocks" },
        { id: "c", label: "La duration obligataire" },
        { id: "d", label: "Le taux directeur" },
      ],
      correctId: "a",
      explanation: "Le ROE rapporte le profit aux capitaux propres mobilisés.",
    },
    {
      id: "micro-a-3",
      part: "A",
      prompt: "Vrai/Faux justifié: la dette est toujours négative, quel que soit le modèle économique.",
      choices: [
        { id: "a", label: "Faux — elle dépend du cash-flow, du coût et de la stabilité du business" },
        { id: "b", label: "Vrai — tout levier détruit la valeur" },
        { id: "c", label: "Vrai — la dette annule les marges" },
        { id: "d", label: "Faux — elle ne doit jamais être analysée" },
      ],
      correctId: "a",
      explanation: "Le levier peut être acceptable si les flux sont prévisibles et le coût maîtrisé; il devient dangereux si la liquidité se tend.",
    },
    {
      id: "micro-a-4",
      part: "A",
      prompt: "La marge opérationnelle renseigne surtout sur:",
      choices: [
        { id: "a", label: "La capacité à transformer le chiffre d'affaires en profit d'exploitation" },
        { id: "b", label: "La valeur de marché de la dette" },
        { id: "c", label: "Le niveau du CPI" },
        { id: "d", label: "Le cours exact demain" },
      ],
      correctId: "a",
      explanation: "Elle mesure l'efficacité économique avant éléments financiers et exceptionnels.",
    },
    {
      id: "micro-b-1",
      part: "B",
      widget: "CompanyHealthScore",
      prompt: "Un score santé entreprise doit combiner:",
      choices: [
        { id: "a", label: "Croissance, marge, dette, liquidité et génération de cash" },
        { id: "b", label: "Le chiffre d'affaires seul" },
        { id: "c", label: "La variation du prix uniquement" },
        { id: "d", label: "Une opinion sectorielle non mesurée" },
      ],
      correctId: "a",
      explanation: "La santé financière est multidimensionnelle: performance, solvabilité et cash doivent être lus ensemble.",
      visualId: "a6",
    },
    {
      id: "micro-b-2",
      part: "B",
      widget: "BalanceSheetExplorer",
      prompt: "Dans un bilan, l'identité de base est:",
      choices: [
        { id: "a", label: "Actif = passif + capitaux propres" },
        { id: "b", label: "Revenus = dette + cash" },
        { id: "c", label: "Inflation = marge + stocks" },
        { id: "d", label: "Prix = volume + bêta" },
      ],
      correctId: "a",
      explanation: "Le bilan décrit les ressources économiques et leur financement.",
      visualId: "a8",
    },
    {
      id: "micro-b-3",
      part: "B",
      widget: "CompanyDashboard",
      prompt: "Le bon diagnostic micro relie les métriques à:",
      choices: [
        { id: "a", label: "Qualité du business, risque financier et réaction attendue du marché" },
        { id: "b", label: "Une note isolée sans contexte" },
        { id: "c", label: "Une lecture macro seulement" },
        { id: "d", label: "Un choix automatique long" },
      ],
      correctId: "a",
      explanation: "Les dashboards servent à transformer des chiffres en risque, qualité et scénario de marché.",
      visualId: "a3",
    },
    {
      id: "micro-b-4",
      part: "B",
      widget: "EarningsImpactEngine",
      prompt: "Une publication de résultats est surtout évaluée par:",
      choices: [
        { id: "a", label: "Surprise, guidance, marges et qualité du beat" },
        { id: "b", label: "Le bénéfice net sans consensus" },
        { id: "c", label: "Le logo de l'entreprise" },
        { id: "d", label: "La couleur du chandelier précédent" },
      ],
      correctId: "a",
      explanation: "Le marché réagit à l'écart à l'attendu et à la trajectoire future, pas au chiffre isolé.",
    },
  ],
  outils: [
    {
      id: "outils-a-1",
      part: "A",
      prompt: "Pour juger un P/E élevé, la lecture institutionnelle consiste à:",
      choices: valuationChoices,
      correctId: "a",
      explanation: "Un multiple n'est ni cher ni bon marché isolément: il dépend de la croissance, de la rentabilité, du risque et du secteur.",
    },
    {
      id: "outils-a-2",
      part: "A",
      prompt: "Le DCF valorise une entreprise en:",
      choices: [
        { id: "a", label: "Actualisant les cash-flows futurs attendus" },
        { id: "b", label: "Additionnant uniquement les revenus passés" },
        { id: "c", label: "Multipliant le prix par le volume" },
        { id: "d", label: "Ignorant le WACC" },
      ],
      correctId: "a",
      explanation: "La valeur dépend des flux futurs et du taux d'actualisation qui reflète le risque.",
    },
    {
      id: "outils-a-3",
      part: "A",
      prompt: "Vrai/Faux justifié: un multiple sectoriel doit être comparé à des pairs pertinents.",
      choices: [
        { id: "a", label: "Vrai — modèle, marges, croissance et risque doivent être comparables" },
        { id: "b", label: "Faux — tout P/E mondial est comparable" },
        { id: "c", label: "Faux — seuls les prix comptent" },
        { id: "d", label: "Vrai uniquement pour les banques centrales" },
      ],
      correctId: "a",
      explanation: "La comparaison sans homogénéité de modèle économique crée de faux signaux.",
    },
    {
      id: "outils-a-4",
      part: "A",
      prompt: "Une analyse SWOT utile doit déboucher sur:",
      choices: [
        { id: "a", label: "Un scénario, des catalyseurs et des risques suivis" },
        { id: "b", label: "Une liste décorative sans décision" },
        { id: "c", label: "Une certitude de prix" },
        { id: "d", label: "Une suppression du risque" },
      ],
      correctId: "a",
      explanation: "La SWOT est utile seulement si elle nourrit la décision et l'invalidation.",
    },
    {
      id: "outils-b-1",
      part: "B",
      widget: "FinancialRatios",
      prompt: "Un ratio dette/capitaux propres élevé doit être interprété avec:",
      choices: [
        { id: "a", label: "Stabilité des cash-flows, coût de la dette et secteur" },
        { id: "b", label: "Une règle universelle sans contexte" },
        { id: "c", label: "La seule croissance du PIB" },
        { id: "d", label: "La forme du chandelier" },
      ],
      correctId: "a",
      explanation: "Le levier acceptable dépend de la prévisibilité des flux et du coût de financement.",
      visualId: "a7",
    },
    {
      id: "outils-b-2",
      part: "B",
      widget: "DCF Simulator",
      prompt: "Dans un DCF, une hausse du WACC affecte la valorisation en:",
      choices: [
        { id: "a", label: "Réduisant la valeur actuelle des flux futurs" },
        { id: "b", label: "Augmentant toujours la valeur terminale" },
        { id: "c", label: "Ne changeant que le chiffre d'affaires" },
        { id: "d", label: "Supprimant le risque de prévision" },
      ],
      correctId: "a",
      explanation: "Le WACC est le taux d'actualisation: plus il est élevé, moins les cash-flows futurs valent aujourd'hui.",
      visualId: "a12",
    },
    {
      id: "outils-b-3",
      part: "B",
      widget: "PeerComparisonMatrix",
      prompt: "La comparaison entre pairs sert à repérer:",
      choices: [
        { id: "a", label: "Prime/décote justifiée ou anomalie relative" },
        { id: "b", label: "Le prix exact du lendemain" },
        { id: "c", label: "Une certitude sans catalyseur" },
        { id: "d", label: "Une donnée macro isolée" },
      ],
      correctId: "a",
      explanation: "Une décote devient intéressante si elle n'est pas expliquée par une qualité inférieure ou un risque supérieur.",
    },
    {
      id: "outils-b-4",
      part: "B",
      widget: "ValuationLab",
      prompt: "Un laboratoire de valorisation est utile quand il montre:",
      choices: [
        { id: "a", label: "La sensibilité de la valeur aux hypothèses clés" },
        { id: "b", label: "Un seul prix cible figé" },
        { id: "c", label: "Une absence d'incertitude" },
        { id: "d", label: "Des hypothèses invisibles" },
      ],
      correctId: "a",
      explanation: "Le niveau world-class vient de la sensibilité: croissance, marge, WACC, terminal value.",
    },
  ],
  previsions: [
    {
      id: "previsions-a-1",
      part: "A",
      prompt: "Une guidance abaissée malgré un trimestre supérieur au consensus peut provoquer:",
      choices: [
        { id: "a", label: "Une baisse du titre car les attentes futures se dégradent" },
        { id: "b", label: "Une hausse automatique car le passé bat le consensus" },
        { id: "c", label: "Aucune réaction" },
        { id: "d", label: "Une baisse uniquement des obligations" },
      ],
      correctId: "a",
      explanation: "Le marché actualise le futur: la guidance peut dominer le résultat passé.",
    },
    {
      id: "previsions-a-2",
      part: "A",
      prompt: "Un scénario pondéré sert à:",
      choices: [
        { id: "a", label: "Mesurer une valeur attendue et ses risques par cas optimiste/neutre/pessimiste" },
        { id: "b", label: "Choisir toujours le scénario optimiste" },
        { id: "c", label: "Supprimer l'incertitude" },
        { id: "d", label: "Ignorer les probabilités" },
      ],
      correctId: "a",
      explanation: "Les scénarios rendent explicites les hypothèses, probabilités et conséquences.",
    },
    {
      id: "previsions-a-3",
      part: "A",
      prompt: "Vrai/Faux justifié: une prévision doit avoir une invalidation claire.",
      choices: [
        { id: "a", label: "Vrai — elle devient exploitable seulement si l'on sait quand elle est fausse" },
        { id: "b", label: "Faux — une bonne prévision ne peut pas être invalidée" },
        { id: "c", label: "Faux — l'invalidation est uniquement technique" },
        { id: "d", label: "Vrai seulement après la publication" },
      ],
      correctId: "a",
      explanation: "L'invalidation évite de transformer une thèse en biais narratif.",
    },
    {
      id: "previsions-a-4",
      part: "A",
      prompt: "La donnée la plus utile pour projeter des revenus est souvent:",
      choices: [
        { id: "a", label: "La combinaison tendance historique + guidance + drivers sectoriels" },
        { id: "b", label: "Le dernier chiffre seul" },
        { id: "c", label: "Le plus haut du graphique" },
        { id: "d", label: "Un multiple sans volume" },
      ],
      correctId: "a",
      explanation: "Une projection robuste combine passé, signaux forward-looking et environnement sectoriel.",
    },
    {
      id: "previsions-b-1",
      part: "B",
      widget: "ForecastScenarioPlanner",
      prompt: "Un planificateur de scénarios doit rendre visibles:",
      choices: [
        { id: "a", label: "Hypothèses, probabilités, impact et décision" },
        { id: "b", label: "Une seule trajectoire non testée" },
        { id: "c", label: "Un prix cible sans drivers" },
        { id: "d", label: "Un résultat garanti" },
      ],
      correctId: "a",
      explanation: "La valeur vient de la comparaison des chemins possibles et de leurs conséquences.",
      visualId: "a15",
    },
    {
      id: "previsions-b-2",
      part: "B",
      widget: "ScenarioBuilder",
      prompt: "Un scénario institutionnel complet doit contenir:",
      choices: [
        { id: "a", label: "Thèse, catalyseur, transmission marché, invalidation et risque" },
        { id: "b", label: "Une opinion directionnelle sans invalidation" },
        { id: "c", label: "Uniquement un objectif de prix" },
        { id: "d", label: "Une capture d'écran sans hypothèse" },
      ],
      correctId: "a",
      explanation: "La qualité du scénario dépend autant de l'invalidation que de la thèse.",
      visualId: "a9",
    },
    {
      id: "previsions-b-3",
      part: "B",
      widget: "EarningsImpactEngine",
      prompt: "Si la guidance future contredit le beat passé, le marché regarde surtout:",
      choices: [
        { id: "a", label: "La trajectoire révisée des cash-flows futurs" },
        { id: "b", label: "Le beat historique seulement" },
        { id: "c", label: "Le ticker le plus connu" },
        { id: "d", label: "La volatilité sans contexte" },
      ],
      correctId: "a",
      explanation: "Les prix actualisent les flux futurs; la guidance est donc centrale.",
    },
    {
      id: "previsions-b-4",
      part: "B",
      widget: "Capstone Index",
      prompt: "Dans un index de cas, le lien doit pointer vers:",
      choices: [
        { id: "a", label: "Le cas exact à rejouer, pas seulement la leçon" },
        { id: "b", label: "Le haut de page uniquement" },
        { id: "c", label: "Une route inexistante" },
        { id: "d", label: "Le premier widget de la section" },
      ],
      correctId: "a",
      explanation: "Le capstone est efficace si l'apprenant retrouve immédiatement le scénario ciblé.",
      visualId: "a16",
    },
  ],
};

export const CORE_LESSON_EVALUATION_IDS = Object.keys(byLesson) as CoreLessonId[];

export const CERTIFICATION_QUESTION_IDS = [
  "ch1-pib-us-q4-2023",
  "ch1-inflation-eu-2022-2024",
  "ch1-china-trade-2023-2024",
  "ch1-trade-war-2018-2020",
  "ch1-covid-march-2020",
  "ch1-energy-crisis-eu-2022",
  "ch1-nfp-jan-2024",
  "ch1-try-depreciation-2021-2024",
  "ch1-brexit-2016",
  "ch1-us-election-2016",
];

export function getLessonEvaluationQuestions(lessonId: string | undefined, level: EvaluationLevel) {
  const key = CORE_LESSON_EVALUATION_IDS.includes(lessonId as CoreLessonId)
    ? (lessonId as CoreLessonId)
    : "intro";
  const questions = byLesson[key].map((q) => ({ ...q, level }));
  if (level === "standard") return questions;
  if (level === "high") return questions.map((q, index) => (index < 2 ? { ...q, prompt: `${q.prompt} (lecture multi-facteurs)` } : q));
  return questions.map((q, index) => (index < 3 ? { ...q, prompt: `${q.prompt} (niveau comité d'investissement)` } : q));
}

export function getChapterDiagnosticQuestions(level: EvaluationLevel) {
  const all = CORE_LESSON_EVALUATION_IDS.flatMap((id) => byLesson[id]);
  const picks = [
    ...all.filter((q) => q.part === "A").slice(0, 4),
    ...all.filter((q) => q.part === "B").slice(0, 4),
  ];
  return picks.map((q) => ({ ...q, id: `diagnostic-${level}-${q.id}`, level }));
}

/**
 * Pondération officielle des évaluations de leçon : le cœur de TradForge est
 * l'analyse (Partie B / widgets-visuels), pas le QCM (Partie A).
 * Score global = 30 % Partie A + 70 % Partie B.
 */
export const LESSON_PART_WEIGHTS: Partial<Record<EvaluationPart, number>> = { A: 0.3, B: 0.7 };

export function scoreQuestions(
  questions: EvaluationQuestion[],
  answers: Record<string, string>,
  requiredParts: EvaluationPart[],
  weights?: Partial<Record<EvaluationPart, number>>,
) {
  const correct = questions.filter((q) => answers[q.id] === q.correctId).length;
  const parts = requiredParts.map((part) => {
    const partQuestions = questions.filter((q) => q.part === part);
    const partCorrect = partQuestions.filter((q) => answers[q.id] === q.correctId).length;
    return {
      part,
      score: Math.round((partCorrect / Math.max(1, partQuestions.length)) * 100),
      correct: partCorrect,
      total: partQuestions.length,
    } satisfies EvaluationScorePart;
  });

  let score: number;
  if (weights) {
    const active = parts.filter((p) => p.total > 0);
    const totalWeight = active.reduce((sum, p) => sum + (weights[p.part] ?? 0), 0) || 1;
    score = Math.round(active.reduce((sum, p) => sum + p.score * (weights[p.part] ?? 0), 0) / totalWeight);
  } else {
    score = Math.round((correct / Math.max(1, questions.length)) * 100);
  }

  return {
    score,
    maxScore: 100,
    correct,
    total: questions.length,
    // Pondéré : seuil global 70 %. Non pondéré (diagnostic/certif) : chaque partie ≥ 70 %.
    passed: weights ? score >= 70 : parts.every((part) => part.total > 0 && part.score >= 70),
    parts,
    weighted: Boolean(weights),
  };
}

/** Backward-compatible aggregate for non-lesson diagnostics. Contains A+B only; C lives on the certification page. */
export const EVALUATION_BANK: Record<EvaluationLevel, EvaluationQuestion[]> = {
  standard: getChapterDiagnosticQuestions("standard"),
  high: getChapterDiagnosticQuestions("high"),
  premium: getChapterDiagnosticQuestions("premium"),
};

export function scoreEvaluation(level: EvaluationLevel, answers: Record<string, string>) {
  return scoreQuestions(EVALUATION_BANK[level], answers, ["A", "B"]);
}

export function getEvaluationCase(level: EvaluationLevel, cases: CaseStudy[]) {
  const caseId = level === "premium" ? "ch1-energy-crisis-eu-2022" : level === "high" ? "ch1-nfp-jan-2024" : "ch1-pib-us-q4-2023";
  return cases.find((item) => item.id === caseId) ?? cases[0];
}
