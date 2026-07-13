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
      {
        prompt: "Un Mission Briefing mentionne un driver « dominant ». Que signifie ce qualificatif ?",
        choices: [
          { id: "a", label: "Le driver au meilleur ratio impact/probabilité pour cadrer la thèse" },
          { id: "b", label: "Le driver le plus cité par la presse" },
          { id: "c", label: "Le driver le plus ancien du briefing" },
          { id: "d", label: "Le seul driver à surveiller" },
        ],
        correctId: "a",
        explanation: "Le driver dominant hiérarchise l'attention selon l'impact attendu et la probabilité.",
      },
      {
        prompt: "Dans un briefing, que faire si le driver dominant s'affaiblit avant le catalyseur ?",
        choices: [
          { id: "a", label: "Réévaluer la thèse et rapprocher ou déclencher l'invalidation" },
          { id: "b", label: "Ignorer l'affaiblissement et maintenir la position" },
          { id: "c", label: "Doubler la taille de la position" },
          { id: "d", label: "Supprimer le point d'invalidation" },
        ],
        correctId: "a",
        explanation: "L'affaiblissement du driver dominant est un signal de dégradation de la thèse.",
      },
      {
        prompt: "Un briefing institutionnel distingue thèse et opinion. La différence clé est :",
        choices: [
          { id: "a", label: "La thèse est conditionnelle et invalidable ; l'opinion est statique" },
          { id: "b", label: "La thèse est toujours longue terme" },
          { id: "c", label: "L'opinion est plus rigoureuse" },
          { id: "d", label: "Il n'y a aucune différence" },
        ],
        correctId: "a",
        explanation: "La thèse explicite les conditions d'invalidation, l'opinion non.",
      },
      {
        prompt: "Le mécanisme de transmission dans un briefing relie :",
        choices: [
          { id: "a", label: "Le driver macro à l'impact attendu sur une classe d'actifs" },
          { id: "b", label: "Le prix au volume uniquement" },
          { id: "c", label: "La couleur du graphique au consensus" },
          { id: "d", label: "L'opinion au cours de bourse" },
        ],
        correctId: "a",
        explanation: "La transmission explicite le canal par lequel le driver affecte l'actif.",
      },
      {
        prompt: "Un briefing cite plusieurs drivers secondaires. Leur rôle principal est :",
        choices: [
          { id: "a", label: "Contextualiser et nuancer le driver dominant" },
          { id: "b", label: "Remplacer le driver dominant à chaque mise à jour" },
          { id: "c", label: "Garantir un profit quel que soit le scénario" },
          { id: "d", label: "Servir de décor narratif sans utilité analytique" },
        ],
        correctId: "a",
        explanation: "Les drivers secondaires modulent l'impact et signalent les risques de bascule.",
      },
      {
        prompt: "Un apprenant lit un briefing et ignore le point d'invalidation. Le risque principal est :",
        choices: [
          { id: "a", label: "Maintenir une thèse obsolète par biais de confirmation" },
          { id: "b", label: "Surperformer le marché systématiquement" },
          { id: "c", label: "Réduire la volatilité du portefeuille" },
          { id: "d", label: "Améliorer la précision des prévisions" },
        ],
        correctId: "a",
        explanation: "Sans invalidation prédéfinie, le biais narratif prolonge l'erreur au-delà du raisonnable.",
      },
      {
        prompt: "En gestion institutionnelle, un briefing est mis à jour. L'erreur la plus courante est :",
        choices: [
          { id: "a", label: "Modifier la thèse sans réviser l'invalidation ni le sizing" },
          { id: "b", label: "Mettre à jour trop fréquemment les invalidations" },
          { id: "c", label: "Supprimer les drivers secondaires" },
          { id: "d", label: "Ajouter trop de points d'invalidation" },
        ],
        correctId: "a",
        explanation: "L'invalidation et le sizing doivent rester cohérents avec la thèse actualisée.",
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
      {
        prompt: "Dans le Macro Indicator Lab, un indicateur passe de « expansion » à « ralentissement ». Que faire en priorité ?",
        choices: [
          { id: "a", label: "Vérifier si le changement de régime confirme ou invalide la thèse en cours" },
          { id: "b", label: "Ignorer le signal car les indicateurs sont retardés" },
          { id: "c", label: "Acheter systématiquement des actions défensives" },
          { id: "d", label: "Liquider immédiatement toutes les positions" },
        ],
        correctId: "a",
        explanation: "Un changement de régime macro exige de réévaluer la cohérence de la thèse, non de réagir mécaniquement.",
      },
      {
        prompt: "Le Lab affiche une divergence entre un indicateur avancé et un indicateur coïncident. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "L'avancé anticipe un retournement ; confirmer avec d'autres signaux" },
          { id: "b", label: "Le coïncident est toujours plus fiable" },
          { id: "c", label: "La divergence signifie une erreur de données" },
          { id: "d", label: "Il faut attendre que les deux convergent avant d'agir" },
        ],
        correctId: "a",
        explanation: "Les indicateurs avancés précèdent les coïncidents ; la divergence est un signal précoce, à confirmer.",
      },
      {
        prompt: "Un apprenant compare la valeur d'un indicateur au z-score affiché. Le z-score sert à :",
        choices: [
          { id: "a", label: "Mesurer l'écart par rapport à la normale historique" },
          { id: "b", label: "Prédire le sens futur du marché" },
          { id: "c", label: "Remplacer la lecture du niveau absolu" },
          { id: "d", label: "Calculer le rendement attendu" },
        ],
        correctId: "a",
        explanation: "Le z-score normalise l'indicateur par rapport à sa distribution historique.",
      },
      {
        prompt: "Le Lab montre un indicateur en territoire « extrême » depuis plusieurs mois. L'erreur d'interprétation fréquente est :",
        choices: [
          { id: "a", label: "Anticiper un retournement immédiat alors que les extrêmes peuvent persister" },
          { id: "b", label: "Considérer l'extrême comme un signal d'achat certain" },
          { id: "c", label: "Ignorer totalement l'indicateur" },
          { id: "d", label: "Considérer que l'indicateur est cassé" },
        ],
        correctId: "a",
        explanation: "Les extrêmes peuvent s'étendre ; un catalyseur est nécessaire pour déclencher le retournement.",
      },
      {
        prompt: "Le Lab permet de superposer plusieurs indicateurs. L'intérêt principal est :",
        choices: [
          { id: "a", label: "Croiser les signaux pour confirmer un régime macro" },
          { id: "b", label: "Augmenter le nombre de signaux pour trader plus" },
          { id: "c", label: "Masquer les indicateurs contradictoires" },
          { id: "d", label: "Créer un seul indicateur composite" },
        ],
        correctId: "a",
        explanation: "La convergence de plusieurs indicateurs renforce la robustesse du diagnostic de régime.",
      },
      {
        prompt: "Un indicateur publié avec une révision importante apparaît dans le Lab. La bonne pratique est :",
        choices: [
          { id: "a", label: "Vérifier si la révision modifie le signal de régime" },
          { id: "b", label: "Ignorer la révision car le signal initial est suffisant" },
          { id: "c", label: "Supprimer l'indicateur du tableau de bord" },
          { id: "d", label: "Attendre la prochaine publication avant toute analyse" },
        ],
        correctId: "a",
        explanation: "Les révisions peuvent transformer un signal neutre en alerte ou inversement.",
      },
      {
        prompt: "En gestion de risque, le Lab signale un régime « stagflation ». L'implication pour le portefeuille est :",
        choices: [
          { id: "a", label: "Privilégier des actifs résistants à la fois à l'inflation et à la croissance faible" },
          { id: "b", label: "Augmenter l'exposition aux actions growth" },
          { id: "c", label: "Maintenir l'allocation inchangée" },
          { id: "d", label: "Investir uniquement en obligations longues" },
        ],
        correctId: "a",
        explanation: "La stagflation appelle une allocation spécifique : matières premières, oblig courte, actions qualité.",
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
      {
        prompt: "Le CompanyDashboard montre une rentabilité en hausse mais un endettement qui augmente plus vite. Que conclure ?",
        choices: [
          { id: "a", label: "La croissance est financée par l'endettement ; surveiller la soutenabilité" },
          { id: "b", label: "L'entreprise va nécessairement mieux" },
          { id: "c", label: "L'endettement est sans importance" },
          { id: "d", label: "La rentabilité va s'effondrer immédiatement" },
        ],
        correctId: "a",
        explanation: "Une rentabilité dopée par le levier financier augmente le risque sans garantir la durabilité.",
      },
      {
        prompt: "Un apprenant constate que le cash flow opérationnel est négatif malgré un bénéfice net positif. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Bénéfice comptable non converti en cash ; risque de qualité des résultats" },
          { id: "b", label: "L'entreprise est forcément saine" },
          { id: "c", label: "Le cash flow est un indicateur secondaire" },
          { id: "d", label: "Il s'agit d'une erreur comptable" },
        ],
        correctId: "a",
        explanation: "Un cash flow négatif avec bénéfice positif signale des ajustements comptables ou un besoin en fonds de roulement.",
      },
      {
        prompt: "Le dashboard présente le P/E au-dessus de la moyenne sectorielle. Cela signifie :",
        choices: [
          { id: "a", label: "Le marché anticipe une croissance supérieure ou accepte une prime de risque" },
          { id: "b", label: "L'action est nécessairement surévaluée" },
          { id: "c", label: "L'entreprise est en faillite" },
          { id: "d", label: "Le P/E n'a aucune utilité" },
        ],
        correctId: "a",
        explanation: "Un P/E élevé reflète des attentes ; il faut les confronter aux fondamentaux et au secteur.",
      },
      {
        prompt: "Le ROE est élevé mais le ROIC est faible. Que faut-il en déduire ?",
        choices: [
          { id: "a", label: "Le rendement repose sur l'effet de levier, pas sur la qualité opérationnelle" },
          { id: "b", label: "L'entreprise est excellente sur tous les plans" },
          { id: "c", label: "Le ROIC est trompeur" },
          { id: "d", label: "Il faut ignorer le ROE" },
        ],
        correctId: "a",
        explanation: "L'écart ROE-ROIC positif indique que l'endettement gonfle artificiellement la rentabilité des capitaux propres.",
      },
      {
        prompt: "Le dashboard montre une baisse du besoin en fonds de roulement (BFR). L'impact sur la trésorerie est :",
        choices: [
          { id: "a", label: "Libération de cash, amélioration de la trésorerie disponible" },
          { id: "b", label: "Réduction du cash disponible" },
          { id: "c", label: "Aucun impact sur la trésorerie" },
          { id: "d", label: "Dégradation de la rentabilité" },
        ],
        correctId: "a",
        explanation: "Un BFR qui diminue libère du cash et améliore le cycle de conversion de capital.",
      },
      {
        prompt: "En analyse institutionnelle, le dashboard révèle un ratio de couverture des intérêts inférieur à 2. La conclusion est :",
        choices: [
          { id: "a", label: "Risque de solvabilité élevé en cas de hausse des taux ou de chute du résultat" },
          { id: "b", label: "L'entreprise est sous-évaluée" },
          { id: "c", label: "Le ratio n'a pas de seuil critique" },
          { id: "d", label: "Il faut acheter pour la valeur" },
        ],
        correctId: "a",
        explanation: "Un ratio de couverture < 2 indique une marge de sécurité étroite face aux chocs.",
      },
      {
        prompt: "Le dashboard compare une entreprise à son secteur. Un écart de marge EBIT positive et persistante indique :",
        choices: [
          { id: "a", label: "Un avantage concurrentiel durable ou un modèle économique différencié" },
          { id: "b", label: "Une manipulation comptable systématique" },
          { id: "c", label: "Une anomalie statistique sans signification" },
          { id: "d", label: "Un secteur en déclin" },
        ],
        correctId: "a",
        explanation: "Une marge EBIT structurellement supérieure signale un moat ou une efficacité opérationnelle.",
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
      {
        prompt: "Le NFP publié est supérieur au consensus mais les salaires horaires ralentissent. Que conclure ?",
        choices: [
          { id: "a", label: "Croissance de l'emploi mais tension salariale qui s'atténue ; impact mixte sur la Fed" },
          { id: "b", label: "Bullish pour les actions sans ambiguïté" },
          { id: "c", label: "Bearish pour le dollar sans nuance" },
          { id: "d", label: "Signal sans importance pour la politique monétaire" },
        ],
        correctId: "a",
        explanation: "L'emploi fort avec salaires faibles complique la lecture de la Fed : emploi robuste, inflation salariale contenue.",
      },
      {
        prompt: "Un apprenant lit un NFP en ligne avec le consensus mais le taux de chômage monte. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "La hausse du chômage peut refléter une entrée de chercheurs d'emploi, pas une perte nette" },
          { id: "b", label: "L'économie est en récession certaine" },
          { id: "c", label: "Le NFP est erroné" },
          { id: "d", label: "Il faut ignorer le taux de chômage" },
        ],
        correctId: "a",
        explanation: "Le taux de chômage et les créations d'emplois peuvent diverger à cause de la participation.",
      },
      {
        prompt: "Le NFP montre une forte création d'emplois dans le secteur public. L'impact sur la lecture macro est :",
        choices: [
          { id: "a", label: "Moins significatif qu'une création dans le privé ; qualité de l'emploi à pondérer" },
          { id: "b", label: "Identique à une création privée" },
          { id: "c", label: "Nécessairement bearish" },
          { id: "d", label: "Ignoré par les marchés" },
        ],
        correctId: "a",
        explanation: "Les emplois publics sont moins corrélés au cycle économique que les emplois privés marchands.",
      },
      {
        prompt: "Un NFP décevant sort alors que la Fed est en mode « hawkish ». La réaction probable des taux est :",
        choices: [
          { id: "a", label: "Baisse des taux courts si le signal affaiblit le maintien du taux" },
          { id: "b", label: "Hausse immédiate des taux" },
          { id: "c", label: "Aucune réaction des taux" },
          { id: "d", label: "Hausse du dollar systématique" },
        ],
        correctId: "a",
        explanation: "Un NFP faible dans un régime hawkish peut faire anticiper une pause ou un pivot.",
      },
      {
        prompt: "L'interprète affiche une divergence entre NFP et ADP. La lecture correcte est :",
        choices: [
          { id: "a", label: "Le NFP reste la référence ; l'ADP est un indicateur préliminaire imparfait" },
          { id: "b", label: "L'ADP est plus fiable que le NFP" },
          { id: "c", label: "Les deux doivent toujours converger" },
          { id: "d", label: "Il faut moyenner les deux" },
        ],
        correctId: "a",
        explanation: "Le NFP est l'indicateur officiel ; l'ADP est une estimation privée avec une méthodologie différente.",
      },
      {
        prompt: "En gestion de risque, un NFP très supérieur au consensus dans un marché déjà volatil doit déclencher :",
        choices: [
          { id: "a", label: "Une réduction temporaire de l'exposition avant la publication puis réévaluation" },
          { id: "b", label: "Une augmentation de levier immédiate" },
          { id: "c", label: "Aucune action de gestion des risques" },
          { id: "d", label: "Une vente systématique des actions" },
        ],
        correctId: "a",
        explanation: "Les publications NFP créent une volatilité élevée ; réduire l'exposition avant publication est une pratique prudente.",
      },
      {
        prompt: "Un apprenant constate que le NFP est en ligne mais la participation baisse. L'implication à long terme est :",
        choices: [
          { id: "a", label: "Resserrement structurel du marché du travail, potentiel de salaires plus élevé" },
          { id: "b", label: "Aucune implication macro" },
          { id: "c", label: "Baisse des salaires garantie" },
          { id: "d", label: "Récession imminente" },
        ],
        correctId: "a",
        explanation: "Une participation en baisse réduit l'offre de travail et peut maintenir une pression salariale structurelle.",
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
      {
        prompt: "Le Macro Dashboard montre un PIB en hausse mais l'inflation accélère. Que conclure ?",
        choices: [
          { id: "a", label: "Croissance accompagnée de surchauffe ; risque de resserrement monétaire" },
          { id: "b", label: "L'économie est en récession" },
          { id: "c", label: "L'inflation n'a pas d'impact sur la croissance" },
          { id: "d", label: "La Fed va nécessairement baisser les taux" },
        ],
        correctId: "a",
        explanation: "Croissance + inflation élevée = surchauffe, typiquement traitée par resserrement monétaire.",
      },
      {
        prompt: "Un apprenant voit un écart important entre publié et consensus pour le PMI manufacturier. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Surprise directionnelle significative ; surveiller la réaction des marchés et la révision" },
          { id: "b", label: "Le consensus est toujours plus fiable que le publié" },
          { id: "c", label: "Le PMI n'a pas d'impact macro" },
          { id: "d", label: "Ignorer car le PMI est retardé" },
        ],
        correctId: "a",
        explanation: "Une surprise sur le PMI est un signal directionnel important, à confirmer par les révisions.",
      },
      {
        prompt: "Le dashboard affiche le taux de chômage et la participation simultanément. L'intérêt de cette superposition est :",
        choices: [
          { id: "a", label: "Distinguer une vraie amélioration de l'emploi d'une sortie du marché du travail" },
          { id: "b", label: "Mettre en évidence la couleur des graphiques" },
          { id: "c", label: "Calculer l'inflation" },
          { id: "d", label: "Remplacer le NFP" },
        ],
        correctId: "a",
        explanation: "La participation contextualise le taux de chômage et évite les fausses lectures d'amélioration.",
      },
      {
        prompt: "Le Macro Dashboard indique un régime de « soft landing ». L'implication pour l'allocation est :",
        choices: [
          { id: "a", label: "Maintien d'une exposition équilibrée, légère préférence pour la qualité" },
          { id: "b", label: "Rotation massive vers les value" },
          { id: "c", label: "Liquidation des actions" },
          { id: "d", label: "Surpondération des matières premières" },
        ],
        correctId: "a",
        explanation: "Un soft landing soutient les actions ; la qualité prime sans rotation extrême.",
      },
      {
        prompt: "Un apprenant constate que le dashboard ne montre pas de surprise mais que les marchés bougent. L'explication la plus probable est :",
        choices: [
          { id: "a", label: "Les marchés réagissent aux révisions ou aux détails internes, pas au headline" },
          { id: "b", label: "Le dashboard est erroné" },
          { id: "c", label: "Les marchés sont irrationnels" },
          { id: "d", label: "Il n'y a pas de relation entre macro et marchés" },
        ],
        correctId: "a",
        explanation: "Le headline conforme peut cacher des détails (salaires, participation) qui déplacent les marchés.",
      },
      {
        prompt: "En gestion de risque, le dashboard montre simultanément inflation élevée et croissance faible. La posture adaptée est :",
        choices: [
          { id: "a", label: "Réduire la duration obligataire et privilégier les actifs anti-stagflation" },
          { id: "b", label: "Augmenter la duration obligataire longue" },
          { id: "c", label: "Maintenir une exposition growth élevée" },
          { id: "d", label: "Ignorer le signal car contradictoire" },
        ],
        correctId: "a",
        explanation: "La stagflation pénalise les obligations longues et les actions growth ; rotation vers matières premières et oblig courte.",
      },
      {
        prompt: "Le dashboard permet de comparer les surprises US et EZ. L'utilité principale est :",
        choices: [
          { id: "a", label: "Anticiper les mouvements de change relatifs (EUR/USD) selon les divergences macro" },
          { id: "b", label: "Déterminer le sens du pétrole" },
          { id: "c", label: "Calculer le PIB mondial" },
          { id: "d", label: "Remplacer le consensus" },
        ],
        correctId: "a",
        explanation: "Les divergences de surprises macro entre zones géographiques orientent les flux de change.",
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
      {
        prompt: "Le CompanyHealthScore passe de 75 à 60 en un trimestre. Que faut-il vérifier en priorité ?",
        choices: [
          { id: "a", label: "Quel sous-score a décliné et pourquoi : rentabilité, solvabilité ou liquidité" },
          { id: "b", label: "La couleur du graphique" },
          { id: "c", label: "Le score du secteur entier" },
          { id: "d", label: "Le cours de bourse uniquement" },
        ],
        correctId: "a",
        explanation: "La décomposition du score identifie la dimension dégradée et oriente le diagnostic.",
      },
      {
        prompt: "Un apprenant constate un score de solvabilité faible mais un score de rentabilité élevé. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Rentabilité élevée mais fragile face à un choc de taux ou de liquidité" },
          { id: "b", label: "L'entreprise est saine sur tous les plans" },
          { id: "c", label: "Le score est erroné" },
          { id: "d", label: "Il faut ignorer la solvabilité" },
        ],
        correctId: "a",
        explanation: "Une rentabilité élevée avec solvabilité faible signale un profil risqué, dopé par le levier.",
      },
      {
        prompt: "Le score de liquidité est élevé mais la rentabilité est faible. Que conclure ?",
        choices: [
          { id: "a", label: "L'entreprise est prudente mais sous-utilise son capital ; potentiel d'amélioration" },
          { id: "b", label: "L'entreprise est en faillite" },
          { id: "c", label: "Le score de liquidité n'a pas de valeur" },
          { id: "d", label: "Il faut augmenter le dividende immédiatement" },
        ],
        correctId: "a",
        explanation: "Une liquidité excessive peut traduire un capital mal alloué ; la rentabilité pèse sur le score global.",
      },
      {
        prompt: "Le CompanyHealthScore intègre un score de qualité des résultats. Son rôle est de :",
        choices: [
          { id: "a", label: "Distinguer les bénéfices convertis en cash des bénéfices comptables" },
          { id: "b", label: "Remplacer le P/E" },
          { id: "c", label: "Calculer le beta" },
          { id: "d", label: "Mesurer la volatilité du titre" },
        ],
        correctId: "a",
        explanation: "La qualité des résultats confronte le bénéfice comptable au cash flow effectivement généré.",
      },
      {
        prompt: "Un score global élevé ne garantit pas l'absence de risque car :",
        choices: [
          { id: "a", label: "Le score est statique et ne capte pas les chocs non linéaires ou les risques hors bilan" },
          { id: "b", label: "Le score est toujours faux" },
          { id: "c", label: "Un score élevé signifie risque nul" },
          { id: "d", label: "Le score ignore la rentabilité" },
        ],
        correctId: "a",
        explanation: "Un score synthétique ne remplace pas l'analyse qualitative des risques contingents.",
      },
      {
        prompt: "En application institutionnelle, un score de santé faible combiné à un cours stable suggère :",
        choices: [
          { id: "a", label: "Soit une inefficience de marché, soit une attente de retournement non encore pricée" },
          { id: "b", label: "Que le marché a raison et le score faux" },
          { id: "c", label: "Que l'entreprise va faire faillite" },
          { id: "d", label: "Qu'il faut acheter sans analyser" },
        ],
        correctId: "a",
        explanation: "La divergence score/cours appelle une investigation : catalystes, attentes, qualité des résultats.",
      },
      {
        prompt: "Le score utilise des pondérations par dimension. Un changement de pondération affecte :",
        choices: [
          { id: "a", label: "La comparabilité dans le temps ; il faut recalculer ou utiliser la même méthodologie" },
          { id: "b", label: "Uniquement la couleur du score" },
          { id: "c", label: "Rien car le score est absolu" },
          { id: "d", label: "Le cours de bourse directement" },
        ],
        correctId: "a",
        explanation: "Une méthodologie changeante brise la comparaison temporelle ; il faut homogénéiser ou recalculer.",
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
      {
        prompt: "Le ratio dette nette/EBITDA est de 5x alors que le secteur est à 2x. Que conclure ?",
        choices: [
          { id: "a", label: "Levier élevé ; sensibilité accrue aux taux et à la conjoncture" },
          { id: "b", label: "L'entreprise est sous-évaluée" },
          { id: "c", label: "Le ratio n'a pas de seuil" },
          { id: "d", label: "Il faut acheter pour la valeur" },
        ],
        correctId: "a",
        explanation: "Un levier supérieur au secteur augmente le risque financier et la sensibilité aux taux.",
      },
      {
        prompt: "Un apprenant voit un current ratio inférieur à 1. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Actifs courants insuffisants pour couvrir le passif courant ; risque de liquidité" },
          { id: "b", label: "L'entreprise est en excellente santé" },
          { id: "c", label: "Le ratio est sans signification" },
          { id: "d", label: "Il faut ignorer ce ratio" },
        ],
        correctId: "a",
        explanation: "Un current ratio < 1 signale une incapacité potentielle à honorer les dettes à court terme.",
      },
      {
        prompt: "Le FinancialRatios montre un ROE en hausse mais un ROA en baisse. La cause la plus probable est :",
        choices: [
          { id: "a", label: "L'effet de levier financier augmente le ROE sans améliorer le ROA" },
          { id: "b", label: "L'entreprise est plus efficace" },
          { id: "c", label: "Le ROA est trompeur" },
          { id: "d", label: "Le ROE baisse en réalité" },
        ],
        correctId: "a",
        explanation: "Le levier financier amplifie le ROE ; un ROA en baisse indite une dégradation opérationnelle.",
      },
      {
        prompt: "Le ratio de rotation des stocks diminue significativement. L'impact attendu est :",
        choices: [
          { id: "a", label: "Risque d'obsolescence, hausse du BFR, pression sur le cash" },
          { id: "b", label: "Amélioration de la trésorerie" },
          { id: "c", label: "Hausse immédiate du bénéfice" },
          { id: "d", label: "Aucun impact" },
        ],
        correctId: "a",
        explanation: "Une rotation des stocks plus lente immobilise du capital et augmente le risque d'obsolescence.",
      },
      {
        prompt: "Le widget affiche un PEG ratio inférieur à 1. L'interprétation standard est :",
        choices: [
          { id: "a", label: "La croissance n'est pas pleinement pricée ; potentiel de valeur" },
          { id: "b", label: "L'action est surévaluée" },
          { id: "c", label: "L'entreprise ne croît pas" },
          { id: "d", label: "Le PEG n'a pas de sens" },
        ],
        correctId: "a",
        explanation: "Un PEG < 1 suggère que le P/E est faible au regard du taux de croissance.",
      },
      {
        prompt: "En application institutionnelle, un ratio de couverture des intérêts de 1.5x dans un secteur à 4x implique :",
        choices: [
          { id: "a", label: "Fragilité face à un choc de taux ; surveillance renforcée du service de la dette" },
          { id: "b", label: "L'entreprise est leader du secteur" },
          { id: "c", label: "Aucun risque particulier" },
          { id: "d", label: "Le ratio est non comparable" },
        ],
        correctId: "a",
        explanation: "Une couverture des intérêts faible indique une marge de sécurité étroite face aux chocs.",
      },
      {
        prompt: "Un apprenant compare le ratio dette/capitaux propres de deux entreprises de secteurs différents. L'erreur est :",
        choices: [
          { id: "a", label: "Ignorer que le levier optimal dépend du secteur et du cycle économique" },
          { id: "b", label: "Comparer des ratios est toujours valide" },
          { id: "c", label: "Le ratio n'a pas de sens" },
          { id: "d", label: "Il faut toujours choisir le plus bas" },
        ],
        correctId: "a",
        explanation: "La structure optimale de capital varie selon le secteur ; la comparaison brute est trompeuse.",
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
      {
        prompt: "Le BalanceSheetExplorer montre des goodwill représentant 60% des actifs. Que faut-il surveiller ?",
        choices: [
          { id: "a", label: "Le risque de dépréciation si les acquisitions sous-performent" },
          { id: "b", label: "L'entreprise est très rentable" },
          { id: "c", label: "Le goodwill n'a pas d'impact" },
          { id: "d", label: "Il faut ignorer le goodwill" },
        ],
        correctId: "a",
        explanation: "Un goodwill élevé expose à des dépréciations massives si les synergies attendues ne se matérialisent pas.",
      },
      {
        prompt: "Un apprenant constate que les actifs incorporels dépassent les actifs tangibles. L'implication est :",
        choices: [
          { id: "a", label: "Valeur de revente faible en cas de faillite ; analyser la valeur économique des incorporels" },
          { id: "b", label: "L'entreprise est très solide" },
          { id: "c", label: "Les incorporels sont sans valeur" },
          { id: "d", label: "Il faut supprimer les incorporels du bilan" },
        ],
        correctId: "a",
        explanation: "Les actifs incorporels ont une valeur de liquidation faible ; leur valeur économique dépend de la continuité d'exploitation.",
      },
      {
        prompt: "Le bilan montre une trésorerie équivalente à 30% des actifs totaux. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Soit une prudence excessive, soit un cash en attente d'affectation (M&A, rachats)" },
          { id: "b", label: "L'entreprise est en faillite" },
          { id: "c", label: "La trésorerie n'a pas d'importance" },
          { id: "d", label: "Il faut distribuer tout le cash immédiatement" },
        ],
        correctId: "a",
        explanation: "Un cash élevé peut signaler une inefficience d'allocation ou une option stratégique en attente.",
      },
      {
        prompt: "Le ratio dettes financières / capitaux propres est de 1.5 dans un secteur à 0.8. Que conclure ?",
        choices: [
          { id: "a", label: "Levier supérieur au secteur ; sensibilité accrue aux taux et à la conjoncture" },
          { id: "b", label: "L'entreprise est sous-évaluée" },
          { id: "c", label: "Le ratio n'a pas de sens" },
          { id: "d", label: "Il faut acheter pour la valeur" },
        ],
        correctId: "a",
        explanation: "Un levier supérieur au secteur augmente le risque financier et la volatilité des résultats.",
      },
      {
        prompt: "Le bilan présente des dettes hors bilan importantes (engagements, leasing). L'analyse correcte est :",
        choices: [
          { id: "a", label: "Les intégrer pour évaluer le levier réel et le risque de liquidité" },
          { id: "b", label: "Les ignorer car elles ne sont pas au bilan" },
          { id: "c", label: "Les supprimer du bilan" },
          { id: "d", label: "Les considérer comme des actifs" },
        ],
        correctId: "a",
        explanation: "Les engagements hors bilan (IFRS 16) affectent le levier et la liquidité réels.",
      },
      {
        prompt: "En application institutionnelle, un bilan avec actifs circulants > actifs fixes indique :",
        choices: [
          { id: "a", label: "Un modèle intensif en capital circulant ; surveiller le BFR et le cycle de conversion" },
          { id: "b", label: "Une entreprise industrielle lourde" },
          { id: "c", label: "Un bilan sans signification" },
          { id: "d", label: "Une entreprise en difficulté" },
        ],
        correctId: "a",
        explanation: "La structure du bilan révèle le modèle économique : intensité capitalistique et cycle de capital.",
      },
      {
        prompt: "Un apprenant constate que les capitaux propres sont négatifs. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Soit des pertes accumulées, soit des rachats d'actions massifs ; analyser le contexte" },
          { id: "b", label: "L'entreprise est nécessairement en faillite" },
          { id: "c", label: "Les capitaux propres négatifs sont impossibles" },
          { id: "d", label: "Il faut ignorer ce signal" },
        ],
        correctId: "a",
        explanation: "Des capitaux propres négatifs peuvent résulter de pertes ou de rachats agressifs ; le contexte est décisif.",
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
      {
        prompt: "Le ScenarioBuilder propose un scénario optimiste, un scénario central et un scénario pessimiste. L'erreur d'utilisation est :",
        choices: [
          { id: "a", label: "Ne retenir que le scénario central sans pondérer les scénarios extrêmes" },
          { id: "b", label: "Comparer les trois scénarios" },
          { id: "c", label: "Assigner des probabilités" },
          { id: "d", label: "Stresser les hypothèses" },
        ],
        correctId: "a",
        explanation: "L'analyse de scénarios doit intégrer la distribution complète, pas seulement le cas central.",
      },
      {
        prompt: "Un apprenant construit un scénario avec une probabilité de 80% pour le cas optimiste. Le risque est :",
        choices: [
          { id: "a", label: "Surenchère optimiste par biais de confirmation ; recaler les probabilités avec l'historique" },
          { id: "b", label: "Le scénario est forcément correct" },
          { id: "c", label: "Il faut augmenter la probabilité à 100%" },
          { id: "d", label: "Les probabilités n'ont pas d'importance" },
        ],
        correctId: "a",
        explanation: "Les probabilités subjectives sont souvent biaisées ; les confronter à la fréquence historique.",
      },
      {
        prompt: "Le ScenarioBuilder permet de modifier les hypothèses d'inflation et de croissance. L'intérêt principal est :",
        choices: [
          { id: "a", label: "Évaluer la sensibilité de la thèse aux chocs macro" },
          { id: "b", label: "Trouver le scénario qui confirme l'opinion" },
          { id: "c", label: "Remplacer l'analyse fondamentale" },
          { id: "d", label: "Maximiser le rendement attendu" },
        ],
        correctId: "a",
        explanation: "L'analyse de sensibilité révèle la robustesse de la thèse face aux variations des hypothèses.",
      },
      {
        prompt: "Dans un scénario de stagflation, le ScenarioBuilder suggère une performance négative pour les actions growth. Pourquoi ?",
        choices: [
          { id: "a", label: "La stagflation pénalise les valorisations futures et la croissance des bénéfices" },
          { id: "b", label: "Les actions growth sont immunisées" },
          { id: "c", label: "La stagflation n'a pas d'impact" },
          { id: "d", label: "Les actions growth surperforment toujours" },
        ],
        correctId: "a",
        explanation: "La stagflation augmente le taux d'actualisation et réduit les perspectives de croissance.",
      },
      {
        prompt: "Le ScenarioBuilder affiche une valeur attendue (EV) négative pour un scénario. La conclusion correcte est :",
        choices: [
          { id: "a", label: "Le scénario détruit de la valeur ; éviter ou couvrir l'exposition" },
          { id: "b", label: "Il faut investir davantage" },
          { id: "c", label: "L'EV n'a pas de sens" },
          { id: "d", label: "Le scénario est erroné" },
        ],
        correctId: "a",
        explanation: "Une EV négative indique que le scénario pondéré détruit de la valeur ; il faut l'éviter ou se couvrir.",
      },
      {
        prompt: "En gestion de risque, le ScenarioBuilder est utilisé pour définir le sizing. La bonne pratique est :",
        choices: [
          { id: "a", label: "Calibrer la taille selon la perte attendue dans le scénario pessimiste" },
          { id: "b", label: "Ignorer le scénario pessimiste" },
          { id: "c", label: "Maximiser la taille dans le scénario optimiste" },
          { id: "d", label: "Ne pas utiliser les scénarios pour le sizing" },
        ],
        correctId: "a",
        explanation: "Le sizing basé sur le scénario défavorable aligne l'exposition sur la tolérance au risque.",
      },
      {
        prompt: "Un apprenant constate que deux scénarios donnent des résultats similaires malgré des hypothèses différentes. Que conclure ?",
        choices: [
          { id: "a", label: "La thèse est robuste car peu sensible aux variations des hypothèses" },
          { id: "b", label: "Le modèle est erroné" },
          { id: "c", label: "Il faut changer les hypothèses" },
          { id: "d", label: "Les scénarios sont inutiles" },
        ],
        correctId: "a",
        explanation: "La convergence des résultats malgré des hypothèses variées signale une thèse robuste.",
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
      {
        prompt: "Le Visual Hybrid Layer combine un visuel importé et des éléments natifs. L'avantage principal est :",
        choices: [
          { id: "a", label: "Croiser la richesse visuelle externe avec l'interactivité native" },
          { id: "b", label: "Remplacer tous les visuels par du texte" },
          { id: "c", label: "Supprimer l'interactivité" },
          { id: "d", label: "Uniformiser le rendu" },
        ],
        correctId: "a",
        explanation: "La couche hybride combine le meilleur des deux : visuel statique riche et éléments interactifs natifs.",
      },
      {
        prompt: "Un apprenant voit une incohérence entre le visuel importé et la légende native. Que faire ?",
        choices: [
          { id: "a", label: "Vérifier la source et la date du visuel, puis corriger la légende si nécessaire" },
          { id: "b", label: "Ignorer l'incohérence" },
          { id: "c", label: "Supprimer le visuel" },
          { id: "d", label: "Supprimer la légende" },
        ],
        correctId: "a",
        explanation: "Une incohérence visuel/légende peut indiquer une mise à jour manquée ou une erreur d'interprétation.",
      },
      {
        prompt: "Le Visual Hybrid Layer permet d'ajouter des annotations interactives sur un visuel statique. L'utilité est :",
        choices: [
          { id: "a", label: "Guider l'attention et contextualiser les points clés du visuel" },
          { id: "b", label: "Remplacer le visuel" },
          { id: "c", label: "Masquer les défauts du visuel" },
          { id: "d", label: "Augmenter le temps de chargement" },
        ],
        correctId: "a",
        explanation: "Les annotations interactives orientent la lecture et renforcent la pédagogie.",
      },
      {
        prompt: "Un visuel hybride affiche une courbe de rendements avec un overlay natif de régimes macro. L'intérêt est :",
        choices: [
          { id: "a", label: "Relier la forme de la courbe au régime macro en vigueur" },
          { id: "b", label: "Supprimer la courbe" },
          { id: "c", label: "Remplacer la courbe par du texte" },
          { id: "d", label: "Masquer le régime" },
        ],
        correctId: "a",
        explanation: "L'overlay relie le visuel statique au contexte macro, facilitant l'interprétation.",
      },
      {
        prompt: "Le Visual Hybrid Layer pose un problème de performance (lenteur). La cause la plus probable est :",
        choices: [
          { id: "a", label: "Un visuel importé trop lourd ou des re-rendus excessifs" },
          { id: "b", label: "Le texte natif" },
          { id: "c", label: "La légende" },
          { id: "d", label: "La palette de couleurs" },
        ],
        correctId: "a",
        explanation: "Les visuels importés lourds et les re-rendus fréquents dégradent les performances.",
      },
      {
        prompt: "En application institutionnelle, le Visual Hybrid Layer est utilisé pour présenter une analyse. La bonne pratique est :",
        choices: [
          { id: "a", label: "S'assurer que la source du visuel est citée et la date de mise à jour visible" },
          { id: "b", label: "Masquer la source" },
          { id: "c", label: "Omettre la date" },
          { id: "d", label: "Supprimer les annotations" },
        ],
        correctId: "a",
        explanation: "La traçabilité de la source et de la date garantit la fiabilité et l'auditabilité.",
      },
      {
        prompt: "Un apprenant constate que le visuel hybride ne s'actualise pas quand les données changent. L'explication est :",
        choices: [
          { id: "a", label: "Le visuel importé est statique ; seul l'overlay natif peut s'actualiser" },
          { id: "b", label: "Le widget est cassé" },
          { id: "c", label: "Les données sont erronées" },
          { id: "d", label: "Il faut recharger la page" },
        ],
        correctId: "a",
        explanation: "Les visuels importés sont statiques ; seuls les éléments natifs peuvent réagir aux données en temps réel.",
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
      {
        prompt: "Le MacroRegimeRadar affiche un régime « reflation ». Quelles classes d'actifs sont typiquement favorisées ?",
        choices: [
          { id: "a", label: "Actions, matières premières, crédit à haut rendement" },
          { id: "b", label: "Obligations longues, défensives" },
          { id: "c", label: "Cash, or" },
          { id: "d", label: "Obligations d'État longues" },
        ],
        correctId: "a",
        explanation: "La reflation soutient les actifs risqués et les matières premières ; les obligations longues souffrent.",
      },
      {
        prompt: "Un apprenant constate que le radar bascule de « expansion » à « slowdown ». Que doit-il faire en priorité ?",
        choices: [
          { id: "a", label: "Réévaluer l'allocation : réduire les actions cycliques, augmenter la qualité et la liquidité" },
          { id: "b", label: "Maintenir l'allocation inchangée" },
          { id: "c", label: "Augmenter le levier" },
          { id: "d", label: "Liquider toutes les positions" },
        ],
        correctId: "a",
        explanation: "Le passage au slowdown appelle une rotation défensive : qualité, liquidité, réduction du beta.",
      },
      {
        prompt: "Le radar montre un régime « stagflation » mais le marché actions est haussier. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Soit le marché anticipe une sortie rapide, soit le radar est en retard ; investiguer" },
          { id: "b", label: "Le radar est erroné" },
          { id: "c", label: "Le marché est irrationnel" },
          { id: "d", label: "Il faut ignorer le radar" },
        ],
        correctId: "a",
        explanation: "La divergence radar/marché peut signaler une anticipation ou un retard du modèle ; il faut investiguer.",
      },
      {
        prompt: "Le MacroRegimeRadar pondère plusieurs axes (croissance, inflation, liquidité, politique). L'axe le plus volatil est :",
        choices: [
          { id: "a", label: "La liquidité et la politique monétaire ; elles changent plus vite que la croissance structurelle" },
          { id: "b", label: "La croissance structurelle" },
          { id: "c", label: "L'inflation tendancielle" },
          { id: "d", label: "Aucun axe ne change" },
        ],
        correctId: "a",
        explanation: "La liquidité et la politique monétaire sont plus réactives que les variables structurelles.",
      },
      {
        prompt: "Un apprenant voit le radar pointer vers « risk-off » mais les spreads de crédit se resserrent. Que conclure ?",
        choices: [
          { id: "a", label: "Soit le radar est en avance, soit le marché nie le risque ; surveiller les catalyseurs" },
          { id: "b", label: "Le radar est faux" },
          { id: "c", label: "Les spreads sont erronés" },
          { id: "d", label: "Il faut ignorer les deux" },
        ],
        correctId: "a",
        explanation: "La divergence radar/spreads signale soit une anticipation, soit un déni de marché ; la vigilance s'impose.",
      },
      {
        prompt: "En gestion de risque, le radar indique une probabilité élevée de récession dans 6 mois. L'action adaptée est :",
        choices: [
          { id: "a", label: "Réduire la duration actions, augmenter la couverture et la liquidité" },
          { id: "b", label: "Augmenter le levier" },
          { id: "c", label: "Ignorer le signal" },
          { id: "d", label: "Maintenir l'allocation growth" },
        ],
        correctId: "a",
        explanation: "Une probabilité de récession élevée appelle une posture défensive : réduction du beta, couverture, liquidité.",
      },
      {
        prompt: "Le radar affiche un régime « goldilocks » (croissance + inflation modérée). L'allocation typique est :",
        choices: [
          { id: "a", label: "Surpondération actions, légère sous-pondération obligations longues" },
          { id: "b", label: "Sous-pondération actions massive" },
          { id: "c", label: "Cash uniquement" },
          { id: "d", label: "Obligations longues uniquement" },
        ],
        correctId: "a",
        explanation: "Le régime goldilocks soutient les actions et pénalise modérément les obligations longues.",
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
      {
        prompt: "Le DCF Simulator affiche un WACC de 8% et un taux de croissance perpétuelle de 4%. Que se passe-t-il si le WACC passe à 10% ?",
        choices: [
          { id: "a", label: "La valeur actualisée diminue significativement" },
          { id: "b", label: "La valeur augmente" },
          { id: "c", label: "Aucun changement" },
          { id: "d", label: "La valeur double" },
        ],
        correctId: "a",
        explanation: "Une hausse du WACC augmente le taux d'actualisation et réduit la valeur présente des cash flows.",
      },
      {
        prompt: "Un apprenant constate que le DCF donne une valeur très supérieure au cours actuel. Que doit-il vérifier ?",
        choices: [
          { id: "a", label: "La cohérence des hypothèses de croissance et de marge, et le taux d'actualisation" },
          { id: "b", label: "Il faut acheter immédiatement" },
          { id: "c", label: "Le DCF est toujours correct" },
          { id: "d", label: "Le cours est erroné" },
        ],
        correctId: "a",
        explanation: "Un DCF très optimiste peut reposer sur des hypothèses irréalistes ; il faut les stresser.",
      },
      {
        prompt: "Le simulateur permet de modifier le taux de croissance perpétuelle (g). L'erreur la plus fréquente est :",
        choices: [
          { id: "a", label: "Choisir un g supérieur au taux de croissance de l'économie long terme" },
          { id: "b", label: "Choisir un g faible" },
          { id: "c", label: "Ne pas utiliser de g" },
          { id: "d", label: "Choisir un g négatif" },
        ],
        correctId: "a",
        explanation: "Un g supérieur à la croissance de l'économie est insoutenable à long terme.",
      },
      {
        prompt: "Le DCF Simulator montre que la valeur est très sensible au taux de croissance à 5 ans. Que conclure ?",
        choices: [
          { id: "a", label: "La thèse d'investissement dépend fortement de la trajectoire à court terme ; la renforcer" },
          { id: "b", label: "Le DCF est inutile" },
          { id: "c", label: "Il faut ignorer la croissance à 5 ans" },
          { id: "d", label: "La valeur est stable" },
        ],
        correctId: "a",
        explanation: "Une forte sensibilité à un paramètre signale un point de failure ; il faut documenter la thèse sur ce paramètre.",
      },
      {
        prompt: "Le DCF affiche une valeur négative pour les capitaux propres. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Soit l'entreprise détruit de la valeur, soit les hypothèses sont trop pessimistes" },
          { id: "b", label: "Le DCF est erroné" },
          { id: "c", label: "Il faut acheter" },
          { id: "d", label: "La valeur négative est impossible" },
        ],
        correctId: "a",
        explanation: "Une valeur négative peut refléter une destruction de valeur ou des hypothèses trop pessimistes ; investiguer.",
      },
      {
        prompt: "En application institutionnelle, un DCF est utilisé pour définir un prix cible. La bonne pratique est :",
        choices: [
          { id: "a", label: "Fournir une fourchette de valeurs issues de scénarios variés, pas un chiffre unique" },
          { id: "b", label: "Donner un prix cible unique" },
          { id: "c", label: "Ignorer les scénarios" },
          { id: "d", label: "Ne pas publier le DCF" },
        ],
        correctId: "a",
        explanation: "Un DCF institutionnel présente une distribution de valeurs, pas un point unique.",
      },
      {
        prompt: "Un apprenant compare le DCF à la valorisation relative (multiples). Les deux divergent. Que conclure ?",
        choices: [
          { id: "a", label: "Soit le marché anticipe une croissance inférieure, soit les multiples intègrent un risque non capté par le DCF" },
          { id: "b", label: "Le DCF est toujours juste" },
          { id: "c", label: "Les multiples sont toujours justes" },
          { id: "d", label: "Il faut ignorer les deux" },
        ],
        correctId: "a",
        explanation: "La divergence DCF/multiples signale des attentes différentes ; il faut investiguer les hypothèses implicites.",
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
      {
        prompt: "L'Intermarket Map montre une corrélation actions-obligations négative. Que signifie-t-elle ?",
        choices: [
          { id: "a", label: "Quand les actions montent, les obligations baissent ; régime de croissance typique" },
          { id: "b", label: "Les actions et obligations montent ensemble" },
          { id: "c", label: "Il n'y a pas de relation" },
          { id: "d", label: "Les obligations mènent les actions" },
        ],
        correctId: "a",
        explanation: "Une corrélation négative actions-obligations est typique d'un régime de croissance saine.",
      },
      {
        prompt: "Un apprenant constate que la corrélation USD-or est passée de négative à positive. Que conclure ?",
        choices: [
          { id: "a", label: "Un changement de régime macro ; l'or agit comme valeur refuge et non plus comme anti-dollar" },
          { id: "b", label: "La carte est erronée" },
          { id: "c", label: "Le dollar n'a plus d'impact sur l'or" },
          { id: "d", label: "Il faut ignorer le signal" },
        ],
        correctId: "a",
        explanation: "Le changement de corrélation USD-or signale un changement de régime : l'or devient refuge, pas seulement anti-dollar.",
      },
      {
        prompt: "La carte montre une corrélation pétrole-USD négative. L'interprétation standard est :",
        choices: [
          { id: "a", label: "Un dollar fort réduit le pouvoir d'achat des acheteurs non-US et pèse sur le pétrole" },
          { id: "b", label: "Le dollar et le pétrole montent ensemble" },
          { id: "c", label: "Aucune relation" },
          { id: "d", label: "Le pétrole mène le dollar" },
        ],
        correctId: "a",
        explanation: "Le pétrole est libellé en dollars ; un dollar fort le rend plus cher pour les acheteurs non-US.",
      },
      {
        prompt: "L'Intermarket Map affiche des corrélations à 30 jours et à 1 an. L'intérêt de comparer les deux est :",
        choices: [
          { id: "a", label: "Détecter les changements de régime : si 30j diverge de 1 an, une bascule est en cours" },
          { id: "b", label: "Les deux doivent toujours être identiques" },
          { id: "c", label: "Seule la corrélation 1 an compte" },
          { id: "d", label: "Seule la corrélation 30j compte" },
        ],
        correctId: "a",
        explanation: "La divergence entre corrélations court terme et long terme signale un changement de régime.",
      },
      {
        prompt: "Un apprenant voit une corrélation actions-credit spread négative. Que signifie-t-elle ?",
        choices: [
          { id: "a", label: "Quand le crédit se détériore (spreads larges), les actions baissent ; signal de risk-off" },
          { id: "b", label: "Les actions et le crédit sont indépendants" },
          { id: "c", label: "Les actions montent avec le risque de crédit" },
          { id: "d", label: "Le crédit n'a pas d'impact" },
        ],
        correctId: "a",
        explanation: "La corrélation négative actions-spreads reflète l'appétit pour le risque : spreads larges = risk-off.",
      },
      {
        prompt: "En gestion de risque, la carte montre que toutes les corrélations convergent vers 1. Que conclure ?",
        choices: [
          { id: "a", label: "Régime de stress : la diversification s'effondre, la couverture par la diversité ne fonctionne plus" },
          { id: "b", label: "Le marché est sain" },
          { id: "c", label: "Il faut augmenter le levier" },
          { id: "d", label: "La diversification est parfaite" },
        ],
        correctId: "a",
        explanation: "La convergence des corrélations vers 1 en stress détruit le bénéfice de diversification.",
      },
      {
        prompt: "La carte montre une corrélation EUR/USD et S&P 500 positive. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "L'appétit pour le risque pousse l'euro et les actions US à la hausse simultanément" },
          { id: "b", label: "L'euro et le S&P n'ont pas de relation" },
          { id: "c", label: "Le dollar mène les actions" },
          { id: "d", label: "Les actions mènent l'euro" },
        ],
        correctId: "a",
        explanation: "La corrélation positive EUR/USD-S&P reflète un régime de risk-on : l'euro monte avec l'appétit pour le risque.",
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
      {
        prompt: "La courbe des taux s'inverse (taux 2 ans > taux 10 ans). Que signifie ce signal ?",
        choices: [
          { id: "a", label: "Le marché anticipe une récession et des baisses de taux futures" },
          { id: "b", label: "L'économie est en forte expansion" },
          { id: "c", label: "La Fed va augmenter les taux" },
          { id: "d", label: "L'inflation va accélérer" },
        ],
        correctId: "a",
        explanation: "L'inversion de la courbe est un signal classique de récession anticipée.",
      },
      {
        prompt: "Un apprenant voit la courbe se pentifier (steepening). L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Anticipation de hausse des taux longs ou de répression de la partie courte" },
          { id: "b", label: "La courbe va s'inverser immédiatement" },
          { id: "c", label: "L'inflation va baisser" },
          { id: "d", label: "La récession est confirmée" },
        ],
        correctId: "a",
        explanation: "Le steepening reflète des attentes de taux longs plus élevés ou une politique courte accommodante.",
      },
      {
        prompt: "Le Yield Curve Visualizer montre un spread 10 ans - 2 ans négatif depuis 3 mois. Que conclure ?",
        choices: [
          { id: "a", label: "Le signal de récession reste actif ; surveiller les autres indicateurs de confirmation" },
          { id: "b", label: "Le signal est périmé" },
          { id: "c", label: "Il faut acheter des actions" },
          { id: "d", label: "La courbe n'a pas de valeur prédictive" },
        ],
        correctId: "a",
        explanation: "L'inversion prolongée conserve son signal de récession ; il faut confirmer avec d'autres indicateurs.",
      },
      {
        prompt: "La courbe se déplace parallèlement vers le haut. L'impact sur les obligations longues est :",
        choices: [
          { id: "a", label: "Baisse des prix des obligations longues (hausse des rendements)" },
          { id: "b", label: "Hausse des prix des obligations longues" },
          { id: "c", label: "Aucun impact" },
          { id: "d", label: "Impact uniquement sur les actions" },
        ],
        correctId: "a",
        explanation: "Un déplacement parallèle vers le haut augmente les rendements et réduit les prix des obligations.",
      },
      {
        prompt: "Le visualiseur montre une courbe en U (creux au milieu). L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Anticipation de taux bas à moyen terme puis reprise ; régime de transition" },
          { id: "b", label: "Récession imminente" },
          { id: "c", label: "Expansion forte" },
          { id: "d", label: "Courbe sans signification" },
        ],
        correctId: "a",
        explanation: "La courbe en U reflète des attentes de taux bas à moyen terme puis de reprise économique.",
      },
      {
        prompt: "En gestion de risque, la courbe s'inverse brutalement. L'action adaptée est :",
        choices: [
          { id: "a", label: "Réduire la duration obligataire longue et surveiller le credit spread" },
          { id: "b", label: "Augmenter la duration longue" },
          { id: "c", label: "Maintenir l'allocation" },
          { id: "d", label: "Ignorer le signal" },
        ],
        correctId: "a",
        explanation: "L'inversion brutale appelle une réduction de la duration longue et une surveillance du crédit.",
      },
      {
        prompt: "Un apprenant constate que la courbe se normalise (redevient pentue positive). Que conclure ?",
        choices: [
          { id: "a", label: "Le signal de récession s'affaiblit ; le marché anticipe une reprise" },
          { id: "b", label: "La récession est confirmée" },
          { id: "c", label: "L'inflation va exploser" },
          { id: "d", label: "La courbe n'a plus de valeur" },
        ],
        correctId: "a",
        explanation: "La normalisation de la courbe indique que le signal de récession s'affaiblit.",
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
      {
        prompt: "Le ForecastScenarioPlanner propose trois scénarios avec des probabilités 20%, 50%, 30%. L'espérance se calcule en :",
        choices: [
          { id: "a", label: "Somme pondérée des résultats par leur probabilité" },
          { id: "b", label: "Moyenne simple des résultats" },
          { id: "c", label: "Résultat du scénario central uniquement" },
          { id: "d", label: "Résultat du scénario optimiste" },
        ],
        correctId: "a",
        explanation: "L'espérance = Σ(probabilité × résultat) ; elle pondère chaque scénario par sa vraisemblance.",
      },
      {
        prompt: "Un apprenant constate que le scénario pessimiste a une probabilité faible mais un impact très négatif. Que faire ?",
        choices: [
          { id: "a", label: "Stresser le scénario et vérifier la perte maximale acceptable pour le sizing" },
          { id: "b", label: "Ignorer le scénario car peu probable" },
          { id: "c", label: "Augmenter la probabilité à 50%" },
          { id: "d", label: "Supprimer le scénario" },
        ],
        correctId: "a",
        explanation: "Un scénario peu probable mais à fort impact doit être stressé pour évaluer le risque extrême.",
      },
      {
        prompt: "Le planner montre que les scénarios convergent vers un résultat positif malgré des hypothèses variées. Que conclure ?",
        choices: [
          { id: "a", label: "La thèse est robuste car peu sensible aux variations des hypothèses" },
          { id: "b", label: "Le modèle est erroné" },
          { id: "c", label: "Il faut changer les hypothèses" },
          { id: "d", label: "Les scénarios sont inutiles" },
        ],
        correctId: "a",
        explanation: "La convergence des scénarios malgré des hypothèses variées signale une thèse robuste.",
      },
      {
        prompt: "Le planner permet de modifier le taux de croissance des revenus. L'effet d'une baisse de 2 points est :",
        choices: [
          { id: "a", label: "Réduction significative de la valeur attendue ; à croiser avec le DCF" },
          { id: "b", label: "Augmentation de la valeur" },
          { id: "c", label: "Aucun effet" },
          { id: "d", label: "Effet uniquement sur les actions" },
        ],
        correctId: "a",
        explanation: "Une baisse de la croissance réduit la valeur attendue ; l'analyse de sensibilité quantifie l'impact.",
      },
      {
        prompt: "Un apprenant assigne 100% au scénario optimiste. L'erreur est :",
        choices: [
          { id: "a", label: "Surenchère optimiste par biais de confirmation ; recaler avec l'historique et les pairs" },
          { id: "b", label: "Le scénario est forcément correct" },
          { id: "c", label: "Il faut augmenter à 120%" },
          { id: "d", label: "Les probabilités n'ont pas d'importance" },
        ],
        correctId: "a",
        explanation: "Assigner 100% à un scénario unique ignore l'incertitude et le biais de confirmation.",
      },
      {
        prompt: "En application institutionnelle, le planner est utilisé pour définir un stop-loss. La bonne pratique est :",
        choices: [
          { id: "a", label: "Placer le stop selon la perte du scénario pessimiste, pas selon le cours seul" },
          { id: "b", label: "Placer le stop selon le scénario optimiste" },
          { id: "c", label: "Ne pas utiliser de stop" },
          { id: "d", label: "Placer le stop au hasard" },
        ],
        correctId: "a",
        explanation: "Le stop-loss institutionnel est calé sur le scénario défavorable, pas sur une règle technique arbitraire.",
      },
      {
        prompt: "Le planner montre une grande dispersion entre scénarios. Que conclure ?",
        choices: [
          { id: "a", label: "L'incertitude est élevée ; réduire le sizing et renforcer la recherche" },
          { id: "b", label: "La thèse est robuste" },
          { id: "c", label: "Il faut ignorer les scénarios" },
          { id: "d", label: "L'espérance est nulle" },
        ],
        correctId: "a",
        explanation: "Une grande dispersion signale une incertitude élevée ; le sizing doit être réduit et la recherche renforcée.",
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
      {
        prompt: "Le Capstone Index liste des cas par niveau de difficulté. L'utilité principale est :",
        choices: [
          { id: "a", label: "Permettre une progression graduée et cibler les lacunes" },
          { id: "b", label: "Donner directement les réponses" },
          { id: "c", label: "Supprimer la navigation" },
          { id: "d", label: "Masquer la progression" },
        ],
        correctId: "a",
        explanation: "L'index gradué structure l'apprentissage et permet de cibler les lacunes.",
      },
      {
        prompt: "Un apprenant constate qu'un cas du Capstone Index est marqué « complété ». Que signifie ce statut ?",
        choices: [
          { id: "a", label: "Le cas a été rejoué avec un score de réussite enregistré" },
          { id: "b", label: "Le cas est supprimé" },
          { id: "c", label: "Le cas est obsolète" },
          { id: "d", label: "Le cas n'est plus accessible" },
        ],
        correctId: "a",
        explanation: "Le statut « complété » indique que le cas a été rejoué et le score enregistré.",
      },
      {
        prompt: "Le Capstone Index regroupe les cas par leçon. L'avantage pour la révision est :",
        choices: [
          { id: "a", label: "Réviser par compétence et identifier les leçons à renforcer" },
          { id: "b", label: "Supprimer les ancres" },
          { id: "c", label: "Empêcher la navigation" },
          { id: "d", label: "Masquer les lacunes" },
        ],
        correctId: "a",
        explanation: "Le regroupement par leçon structure la révision et identifie les compétences à renforcer.",
      },
      {
        prompt: "Un cas du Capstone Index pointe vers une route qui n'existe plus. Que faut-il faire ?",
        choices: [
          { id: "a", label: "Signaler le lien cassé et corriger la route ou supprimer l'entrée" },
          { id: "b", label: "Ignorer le lien cassé" },
          { id: "c", label: "Supprimer l'index entier" },
          { id: "d", label: "Rediriger vers la page d'accueil" },
        ],
        correctId: "a",
        explanation: "Un lien cassé doit être corrigé ou supprimé pour maintenir l'expérience utilisateur.",
      },
      {
        prompt: "Le Capstone Index affiche le score moyen par cas. L'interprétation correcte est :",
        choices: [
          { id: "a", label: "Un score faible indique une leçon à renforcer ; un score élevé une maîtrise" },
          { id: "b", label: "Le score n'a pas de signification" },
          { id: "c", label: "Un score faible signifie que le cas est trop difficile" },
          { id: "d", label: "Il faut ignorer le score" },
        ],
        correctId: "a",
        explanation: "Le score moyen par cas oriente la révision : les scores faibles signalent des lacunes.",
      },
      {
        prompt: "En application institutionnelle, le Capstone Index est utilisé pour l'évaluation. La bonne pratique est :",
        choices: [
          { id: "a", label: "Combiner le score de cas avec une évaluation qualitative des raisonnements" },
          { id: "b", label: "Se fier uniquement au score automatique" },
          { id: "c", label: "Ignorer les cas" },
          { id: "d", label: "Supprimer l'évaluation" },
        ],
        correctId: "a",
        explanation: "L'évaluation institutionnelle combine score automatique et analyse qualitative des raisonnements.",
      },
      {
        prompt: "Un apprenant voit que tous les cas d'une leçon sont complétés avec un score élevé. Que conclure ?",
        choices: [
          { id: "a", label: "La compétence est maîtrisée ; passer à la leçon suivante ou réviser périodiquement" },
          { id: "b", label: "Il faut refaire tous les cas" },
          { id: "c", label: "Les scores sont erronés" },
          { id: "d", label: "La leçon est obsolète" },
        ],
        correctId: "a",
        explanation: "Des scores élevés et constants indiquent une maîtrise ; la révision périodique suffit.",
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
      {
        prompt: "Le MarketDriverVisualizer montre une chaîne incomplète (driver sans actif impacté). Que faut-il faire ?",
        choices: [
          { id: "a", label: "Compléter la chaîne en identifiant l'actif impacté et le mécanisme de transmission" },
          { id: "b", label: "Ignorer le driver" },
          { id: "c", label: "Supprimer le driver" },
          { id: "d", label: "Considérer la chaîne comme complète" },
        ],
        correctId: "a",
        explanation: "Une chaîne incomplète doit être complétée : driver → transmission → actif impacté → invalidation.",
      },
      {
        prompt: "Un apprenant constate que le visualiseur affiche un driver haussier pour le pétrole et baissier pour les actions. Que conclure ?",
        choices: [
          { id: "a", label: "Le driver a un impact différencié selon la classe d'actifs ; la transmission n'est pas uniforme" },
          { id: "b", label: "Le visualiseur est erroné" },
          { id: "c", label: "Tous les actifs réagissent identiquement" },
          { id: "d", label: "Il faut ignorer le signal" },
        ],
        correctId: "a",
        explanation: "Un même driver peut avoir des impacts opposés selon la classe d'actifs ; la transmission est différenciée.",
      },
      {
        prompt: "Le visualiseur permet de modifier le curseur de croissance. L'effet d'une baisse de croissance sur les actions cycliques est :",
        choices: [
          { id: "a", label: "Impact baissier ; les actions cycliques sont sensibles à la croissance" },
          { id: "b", label: "Impact haussier" },
          { id: "c", label: "Aucun impact" },
          { id: "d", label: "Impact uniquement sur les obligations" },
        ],
        correctId: "a",
        explanation: "Les actions cycliques sont sensibles à la croissance ; une baisse pèse sur leurs performances.",
      },
      {
        prompt: "Le MarketDriverVisualizer affiche plusieurs drivers simultanément. L'intérêt principal est :",
        choices: [
          { id: "a", label: "Hiérarchiser les drivers et identifier le driver dominant" },
          { id: "b", label: "Supprimer les drivers secondaires" },
          { id: "c", label: "Masquer les drivers contradictoires" },
          { id: "d", label: "Remplacer les drivers par un seul" },
        ],
        correctId: "a",
        explanation: "L'affichage simultané permet de hiérarchiser les drivers et d'identifier le driver dominant.",
      },
      {
        prompt: "Un apprenant voit que le driver « politique monétaire » passe de dovish à hawkish. L'impact attendu sur les obligations longues est :",
        choices: [
          { id: "a", label: "Baisse des prix (hausse des rendements) ; les obligations longues sont sensibles aux taux" },
          { id: "b", label: "Hausse des prix" },
          { id: "c", label: "Aucun impact" },
          { id: "d", label: "Impact uniquement sur les actions" },
        ],
        correctId: "a",
        explanation: "Un passage au hawkish augmente les taux et réduit les prix des obligations longues.",
      },
      {
        prompt: "En gestion de risque, le visualiseur montre un driver de stress systémique. L'action adaptée est :",
        choices: [
          { id: "a", label: "Réduire l'exposition, augmenter la liquidité et envisager des couvertures" },
          { id: "b", label: "Augmenter le levier" },
          { id: "c", label: "Maintenir l'allocation" },
          { id: "d", label: "Ignorer le signal" },
        ],
        correctId: "a",
        explanation: "Un driver de stress systémique appelle une réduction d'exposition, une liquidité accrue et des couvertures.",
      },
      {
        prompt: "Le visualiseur montre une chaîne driver → transmission → actif mais sans point d'invalidation. Que conclure ?",
        choices: [
          { id: "a", label: "La chaîne est incomplète ; sans invalidation, la thèse n'est pas testable" },
          { id: "b", label: "La chaîne est complète" },
          { id: "c", label: "Il faut ignorer la chaîne" },
          { id: "d", label: "L'invalidation est inutile" },
        ],
        correctId: "a",
        explanation: "Sans point d'invalidation, la thèse n'est pas testable ; la chaîne causale est incomplète.",
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
