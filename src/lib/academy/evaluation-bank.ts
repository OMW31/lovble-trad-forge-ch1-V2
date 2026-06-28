import type { CaseStudy } from "./market-data";

export type EvaluationLevel = "standard" | "high" | "premium";
export type EvaluationPart = "A" | "B" | "C";

export interface EvaluationQuestion {
  id: string;
  part: EvaluationPart;
  prompt: string;
  choices: { id: string; label: string }[];
  correctId: string;
  explanation: string;
  widget?: string;
  caseId?: string;
}

const commonChoices = {
  rates: [
    { id: "a", label: "Elle soutient la devise via des taux plus élevés plus longtemps" },
    { id: "b", label: "Elle affaiblit toujours la devise" },
    { id: "c", label: "Elle n’a aucun effet inter-marchés" },
  ],
  valuation: [
    { id: "a", label: "Comparer le multiple à la croissance, aux marges et aux pairs" },
    { id: "b", label: "Décider uniquement avec le P/E absolu" },
    { id: "c", label: "Ignorer le coût du capital" },
  ],
};

export const EVALUATION_BANK: Record<EvaluationLevel, EvaluationQuestion[]> = {
  standard: [
    {
      id: "std-a-1",
      part: "A",
      prompt: "Une croissance publiée au-dessus du consensus dans une économie data-dependent implique d’abord:",
      choices: commonChoices.rates,
      correctId: "a",
      explanation: "La surprise de croissance repousse souvent les baisses de taux attendues et renforce l’attrait relatif de la devise.",
    },
    {
      id: "std-a-2",
      part: "A",
      prompt: "La valeur intrinsèque sert principalement à:",
      choices: [
        { id: "a", label: "Comparer le prix de marché à une valeur estimée par les fondamentaux" },
        { id: "b", label: "Remplacer toute gestion du risque" },
        { id: "c", label: "Prédire chaque bougie de court terme" },
      ],
      correctId: "a",
      explanation: "L’analyse fondamentale cherche les écarts prix/valeur, sans promettre un timing parfait.",
    },
    {
      id: "std-b-1",
      part: "B",
      widget: "Macro Dashboard",
      prompt: "Dans un dashboard macro, la première lecture robuste compare:",
      choices: [
        { id: "a", label: "Publié vs consensus puis impact probable par classe d’actifs" },
        { id: "b", label: "Uniquement le chiffre publié" },
        { id: "c", label: "Uniquement la couleur de la bougie" },
      ],
      correctId: "a",
      explanation: "Le marché price la surprise relative au consensus, puis la transmet aux taux, devises, actions et matières premières.",
    },
    {
      id: "std-c-1",
      part: "C",
      caseId: "ch1-pib-us-q4-2023",
      prompt: "Replay TradingView: PIB US très supérieur aux attentes. Décision la plus cohérente sur EUR/USD:",
      choices: [
        { id: "a", label: "Biais baissier EUR/USD car USD soutenu" },
        { id: "b", label: "Biais haussier EUR/USD car USD pénalisé" },
        { id: "c", label: "Aucune hypothèse exploitable" },
      ],
      correctId: "a",
      explanation: "Une surprise de croissance US renforce l’USD via les anticipations de taux; EUR/USD baisse mécaniquement si l’euro ne compense pas.",
    },
  ],
  high: [
    {
      id: "high-a-1",
      part: "A",
      prompt: "Si inflation et salaires surprennent à la hausse alors que la croissance ralentit, le conflit principal est:",
      choices: [
        { id: "a", label: "Risque stagflationniste: banque centrale restrictive malgré activité fragile" },
        { id: "b", label: "Expansion sans inflation" },
        { id: "c", label: "Signal uniquement microéconomique" },
      ],
      correctId: "a",
      explanation: "La combinaison inflation haute + activité fragile limite les marges de manœuvre et crée un régime défavorable aux actifs risqués.",
    },
    {
      id: "high-b-1",
      part: "B",
      widget: "NFP Interpreter",
      prompt: "Un NFP fort avec salaires en hausse influence surtout:",
      choices: commonChoices.rates,
      correctId: "a",
      explanation: "L’emploi fort et les salaires alimentent la persistance inflationniste, donc une Fed plus restrictive.",
    },
    {
      id: "high-b-2",
      part: "B",
      widget: "Financial Ratios",
      prompt: "Pour juger un P/E élevé, la lecture institutionnelle consiste à:",
      choices: commonChoices.valuation,
      correctId: "a",
      explanation: "Un multiple n’est ni cher ni bon marché isolément: il dépend de la croissance, de la rentabilité, du risque et du secteur.",
    },
    {
      id: "high-c-1",
      part: "C",
      caseId: "ch1-nfp-jan-2024",
      prompt: "Replay TradingView: NFP 353k vs 180k, salaires +0,6 %. Lecture USD/JPY:",
      choices: [
        { id: "a", label: "Biais haussier USD/JPY par différentiel de taux" },
        { id: "b", label: "Biais baissier USD/JPY car emploi fort affaiblit l’USD" },
        { id: "c", label: "Signal neutre car NFP est retardé" },
      ],
      correctId: "a",
      explanation: "Le différentiel de taux US/Japon domine: une Fed plus restrictive soutient USD/JPY.",
    },
  ],
  premium: [
    {
      id: "prem-a-1",
      part: "A",
      prompt: "Dans un choc énergétique européen, le driver à hiérarchiser avant l’inflation seule est:",
      choices: [
        { id: "a", label: "Détérioration des termes de l’échange, balance commerciale et risque récession" },
        { id: "b", label: "Inflation toujours positive pour la devise" },
        { id: "c", label: "Effet limité aux actions énergie" },
      ],
      correctId: "a",
      explanation: "Un choc d’offre importé peut affaiblir la devise malgré une inflation plus haute, car il dégrade croissance et balance externe.",
    },
    {
      id: "prem-b-1",
      part: "B",
      widget: "DCF Simulator",
      prompt: "Dans un DCF, une hausse du WACC affecte la valorisation en:",
      choices: [
        { id: "a", label: "Réduisant la valeur actuelle des flux futurs" },
        { id: "b", label: "Augmentant toujours la valeur terminale" },
        { id: "c", label: "Ne changeant que le chiffre d’affaires" },
      ],
      correctId: "a",
      explanation: "Le WACC est le taux d’actualisation: plus il est élevé, moins les cash-flows futurs valent aujourd’hui.",
    },
    {
      id: "prem-b-2",
      part: "B",
      widget: "Scenario Builder",
      prompt: "Un scénario institutionnel complet doit contenir:",
      choices: [
        { id: "a", label: "Thèse, catalyseur, transmission marché, invalidation et risque" },
        { id: "b", label: "Une opinion directionnelle sans invalidation" },
        { id: "c", label: "Uniquement un objectif de prix" },
      ],
      correctId: "a",
      explanation: "La qualité du scénario dépend autant de l’invalidation que de la thèse.",
    },
    {
      id: "prem-c-1",
      part: "C",
      caseId: "ch1-energy-crisis-eu-2022",
      prompt: "Replay TradingView: crise énergétique européenne. Biais EUR/USD:",
      choices: [
        { id: "a", label: "Baissier: choc d’offre, balance dégradée, récession et Fed plus agressive" },
        { id: "b", label: "Haussier: inflation élevée suffit à soutenir l’euro" },
        { id: "c", label: "Neutre: l’énergie n’entre pas dans le FX" },
      ],
      correctId: "a",
      explanation: "La crise énergétique combine inflation importée et destruction de croissance: le mix a pesé fortement sur l’euro.",
    },
  ],
};

export function scoreEvaluation(level: EvaluationLevel, answers: Record<string, string>) {
  const questions = EVALUATION_BANK[level];
  const correct = questions.filter((q) => answers[q.id] === q.correctId).length;
  const score = Math.round((correct / questions.length) * 100);
  const parts = (["A", "B", "C"] as EvaluationPart[]).map((part) => {
    const partQuestions = questions.filter((q) => q.part === part);
    const partCorrect = partQuestions.filter((q) => answers[q.id] === q.correctId).length;
    return {
      part,
      score: Math.round((partCorrect / partQuestions.length) * 100),
      correct: partCorrect,
      total: partQuestions.length,
    };
  });
  return {
    score,
    maxScore: 100,
    correct,
    total: questions.length,
    passed: parts.every((part) => part.score >= 70),
    parts,
  };
}

export function getEvaluationCase(level: EvaluationLevel, cases: CaseStudy[]) {
  const caseId = EVALUATION_BANK[level].find((q) => q.part === "C" && q.caseId)?.caseId;
  return cases.find((item) => item.id === caseId) ?? cases[0];
}