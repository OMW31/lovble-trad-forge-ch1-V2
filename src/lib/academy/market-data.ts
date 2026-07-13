// TradForge — synthetic-but-faithful market data engine.
// Deterministic OHLC generation so historical replays are reproducible and light.

export interface Candle {
  /** sequential index (bar number) */
  i: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

export interface Segment {
  bars: number;
  /** total fractional drift applied across the segment, e.g. -0.08 = -8% */
  drift: number;
  /** per-bar volatility as a fraction of price */
  vol: number;
}

export interface SeriesConfig {
  start: number;
  decimals: number;
  segments: Segment[];
  seed: number;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSeries(config: SeriesConfig): Candle[] {
  const rng = mulberry32(config.seed);
  const candles: Candle[] = [];
  let price = config.start;
  let i = 0;

  for (const seg of config.segments) {
    const perBarDrift = Math.pow(1 + seg.drift, 1 / seg.bars) - 1;
    for (let b = 0; b < seg.bars; b++) {
      const o = price;
      // trend + noise
      const noise = (rng() - 0.5) * 2 * seg.vol;
      const trended = o * (1 + perBarDrift + noise);
      const c = trended;
      const wickUp = o * seg.vol * rng() * 1.4;
      const wickDown = o * seg.vol * rng() * 1.4;
      const h = Math.max(o, c) + wickUp;
      const l = Math.min(o, c) - wickDown;
      candles.push({
        i,
        o: round(o, config.decimals),
        h: round(h, config.decimals),
        l: round(l, config.decimals),
        c: round(c, config.decimals),
      });
      price = c;
      i++;
    }
  }
  return candles;
}

function round(n: number, d: number) {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
}

export interface ReplayMarker {
  /** bar index where the event lands */
  at: number;
  label: string;
}

export interface CaseStudy {
  id: string;
  index: number;
  title: string;
  instrument: string;
  period: string;
  /** difficulty 1..5 */
  level: number;
  /** narrative classification */
  driver: string;
  context: string;
  series: SeriesConfig;
  marker: ReplayMarker;
  /** horizontal reference level (e.g. parity, major support) */
  refLevel?: { value: number; label: string };
  decision: {
    prompt: string;
    choices: { id: string; label: string }[];
    correctId: string;
    explanation: string;
    explanationDirect?: string;
    explanationDetail?: string;
  };
  outcome: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ch1-pib-us-q4-2023",
    index: 1,
    title: "PIB US Q4 2023 — Surprise haussière",
    instrument: "EUR/USD",
    period: "Janvier 2024 · H4",
    level: 2,
    driver: "Croissance · Différentiel de taux",
    context:
      "Le marché anticipe une croissance annualisée du PIB américain de 2,0 %. La Fed reste data-dependent : un chiffre robuste retarderait les baisses de taux 2024. Le BEA publie finalement +3,3 %, bien au-dessus des attentes.",
    series: {
      start: 1.092,
      decimals: 4,
      seed: 11,
      segments: [
        { bars: 26, drift: -0.002, vol: 0.0018 },
        { bars: 4, drift: -0.004, vol: 0.004 },
        { bars: 30, drift: -0.006, vol: 0.0016 },
      ],
    },
    marker: { at: 26, label: "BEA : PIB +3,3 % (att. +2,0 %)" },
    refLevel: { value: 1.085, label: "Support court terme 1.0850" },
    decision: {
      prompt:
        "Croissance US largement au-dessus du consensus, Fed data-dependent. Quel est l'effet fondamental le plus probable sur l'USD ?",
      choices: [
        { id: "a", label: "USD se renforce (taux élevés plus longtemps)" },
        { id: "b", label: "USD s'affaiblit (la Fed va baisser plus vite)" },
        { id: "c", label: "Aucun impact, données déjà intégrées" },
      ],
      correctId: "a",
      explanation:
        "Une croissance résiliente donne à la Fed la marge pour garder des taux élevés plus longtemps. Le différentiel de taux favorise l'USD : EUR/USD baisse (USD ↑).",
      explanationDirect: "Croissance US > consensus → Fed maintient taux élevés → différentiel de taux favorable → USD se renforce.",
      explanationDetail: "Driver : PIB US +3,3 % vs +2,0 % attendu. Transmission : croissance résiliente → Fed data-dependent maintient taux restrictifs plus longtemps → différentiel de taux US/EU se creuse. Actif impacté : USD se renforce, EUR/USD baisse. Invalidation : si les données ultérieures (NFP, CPI) déçoivent, la Fed pourrait pivoter plus tôt et inverser le mouvement.",
    },
    outcome:
      "EUR/USD glisse de ~1.0880 vers 1.0850 dans les heures suivantes ; USD/JPY monte de 147.50 à 148.00. L'attrait relatif des actifs en USD augmente.",
  },
  {
    id: "ch1-inflation-eu-2022-2024",
    index: 2,
    title: "Inflation Zone Euro & réponse BCE",
    instrument: "EUR/USD",
    period: "2022 – 2024 · Daily",
    level: 3,
    driver: "Inflation · Politique monétaire",
    context:
      "Après la crise énergétique, l'inflation de la Zone Euro dépasse 10 %. La BCE entame un cycle de hausses de taux sans précédent à partir de juillet 2022, sortant des taux négatifs.",
    series: {
      start: 1.035,
      decimals: 4,
      seed: 22,
      segments: [
        { bars: 22, drift: -0.09, vol: 0.006 },
        { bars: 10, drift: -0.01, vol: 0.008 },
        { bars: 34, drift: 0.17, vol: 0.006 },
        { bars: 14, drift: -0.03, vol: 0.005 },
      ],
    },
    marker: { at: 32, label: "BCE : début du cycle de hausses" },
    refLevel: { value: 1.0, label: "Parité EUR/USD" },
    decision: {
      prompt:
        "Inflation hors de contrôle, BCE soudainement déterminée à resserrer agressivement. Effet de moyen terme sur l'EUR ?",
      choices: [
        { id: "a", label: "EUR soutenu : le resserrement réduit le différentiel défavorable" },
        { id: "b", label: "EUR s'effondre durablement malgré les hausses" },
        { id: "c", label: "EUR sans réaction aux taux BCE" },
      ],
      correctId: "a",
      explanation:
        "Initialement EUR/USD chute sous la parité (récession + différentiel de taux US). Mais la détermination de la BCE réduit l'écart de politique et soutient une remontée vers 1.10-1.12 en 2023.",
    },
    outcome:
      "EUR/USD passe sous la parité en 2022 (~0.95) puis rebondit vers 1.10-1.12 en 2023 à mesure que la BCE resserre, avant de se stabiliser début 2024.",
  },
  {
    id: "ch1-china-trade-2023-2024",
    index: 3,
    title: "Balance commerciale Chine & AUD",
    instrument: "AUD/USD",
    period: "2023 – 2024 · Daily",
    level: 3,
    driver: "Balance commerciale · Commodités",
    context:
      "La réouverture post-COVID de la Chine suscite l'espoir d'une forte demande de matières premières australiennes (fer, charbon, GNL). La reprise s'avère plus mitigée que prévu, surtout dans l'immobilier.",
    series: {
      start: 0.683,
      decimals: 4,
      seed: 33,
      segments: [
        { bars: 14, drift: 0.02, vol: 0.005 },
        { bars: 30, drift: -0.08, vol: 0.006 },
        { bars: 16, drift: 0.015, vol: 0.005 },
      ],
    },
    marker: { at: 14, label: "Importations chinoises décevantes" },
    refLevel: { value: 0.64, label: "Zone de faiblesse 0.6400" },
    decision: {
      prompt:
        "Les importations chinoises de fer déçoivent et l'immobilier ralentit. Quel est l'impact le plus probable sur l'AUD ?",
      choices: [
        { id: "a", label: "AUD faiblit (demande de commodités en baisse)" },
        { id: "b", label: "AUD se renforce (refuge régional)" },
        { id: "c", label: "AUD ignore les données chinoises" },
      ],
      correctId: "a",
      explanation:
        "L'AUD est une devise « commodity » très sensible à la Chine, son premier partenaire. Une demande plus faible pèse sur les exportations australiennes et donc sur l'AUD.",
    },
    outcome:
      "AUD/USD montre une sensibilité nette : les chiffres décevants coïncident avec des phases de faiblesse ; les relances de Pékin soutiennent ponctuellement la devise.",
  },
  {
    id: "ch1-trade-war-2018-2020",
    index: 4,
    title: "Guerre commerciale USA–Chine",
    instrument: "USD/CNH",
    period: "2018 – 2020 · Daily",
    level: 4,
    driver: "Géo-commerce · Risque",
    context:
      "À partir de 2018, Washington impose des tarifs sur des centaines de milliards de produits chinois ; Pékin riposte. Les chaînes d'approvisionnement et la croissance mondiale sont menacées.",
    series: {
      start: 6.3,
      decimals: 4,
      seed: 44,
      segments: [
        { bars: 18, drift: 0.05, vol: 0.004 },
        { bars: 8, drift: 0.02, vol: 0.008 },
        { bars: 34, drift: 0.06, vol: 0.005 },
      ],
    },
    marker: { at: 18, label: "Escalade tarifaire majeure" },
    refLevel: { value: 7.0, label: "Seuil psychologique 7.00" },
    decision: {
      prompt:
        "Escalade tarifaire et craintes pour l'économie chinoise. Direction la plus probable de l'USD/CNH ?",
      choices: [
        { id: "a", label: "USD/CNH monte (pression + dépréciation compétitive)" },
        { id: "b", label: "USD/CNH baisse (la Chine défend le yuan à tout prix)" },
        { id: "c", label: "Stable, le sujet est purement politique" },
      ],
      correctId: "a",
      explanation:
        "La pression sur l'économie chinoise et une dépréciation compétitive font grimper l'USD/CNH ; l'USD agit aussi comme refuge pendant les pics de tension.",
    },
    outcome:
      "USD/CNH passe d'environ 6.30 début 2018 à plus de 7.15 en 2019. Volatilité accrue sur les actions, perturbations des chaînes d'approvisionnement.",
  },
  {
    id: "ch1-covid-march-2020",
    index: 5,
    title: "COVID-19 — Fuite vers la qualité",
    instrument: "AUD/USD",
    period: "Mars 2020 · H4",
    level: 4,
    driver: "Risque systémique · Liquidité",
    context:
      "En mars 2020, les confinements mondiaux provoquent une panique. Demande massive d'USD comme monnaie de réserve et de liquidité. Les devises matières premières s'effondrent.",
    series: {
      start: 0.66,
      decimals: 4,
      seed: 55,
      segments: [
        { bars: 10, drift: -0.02, vol: 0.006 },
        { bars: 12, drift: -0.13, vol: 0.018 },
        { bars: 14, drift: 0.05, vol: 0.01 },
      ],
    },
    marker: { at: 10, label: "Panique mondiale · liquidation du risque" },
    refLevel: { value: 0.55, label: "Plus-bas de crise 0.5500" },
    decision: {
      prompt:
        "Aversion au risque extrême, ruée vers la liquidité. Que fait l'AUD/USD ?",
      choices: [
        { id: "a", label: "Chute brutale (vente d'actifs risqués vers l'USD)" },
        { id: "b", label: "Hausse (l'Australie est un refuge)" },
        { id: "c", label: "Stable, marché trop incertain pour bouger" },
      ],
      correctId: "a",
      explanation:
        "En aversion au risque extrême, les investisseurs liquident les actifs risqués (AUD) pour les actifs les plus liquides et sûrs (USD). L'AUD chute violemment.",
    },
    outcome:
      "AUD/USD plonge de ~0.66 à ~0.55 en quelques semaines. Le DXY bondit ; JPY et CHF profitent aussi de leur statut de refuge, mais l'USD domine.",
  },
  {
    id: "ch1-energy-crisis-eu-2022",
    index: 6,
    title: "Crise énergétique Europe",
    instrument: "EUR/USD",
    period: "2022 · Daily",
    level: 4,
    driver: "Choc d'offre · Inflation importée",
    context:
      "Après l'invasion de l'Ukraine, les livraisons de gaz russe à l'Europe sont drastiquement réduites. Les prix du gaz (TTF) explosent ; risque de pénuries et de récession sévère.",
    series: {
      start: 1.14,
      decimals: 4,
      seed: 66,
      segments: [
        { bars: 16, drift: -0.06, vol: 0.005 },
        { bars: 20, drift: -0.1, vol: 0.007 },
        { bars: 10, drift: 0.02, vol: 0.006 },
      ],
    },
    marker: { at: 16, label: "Flambée du gaz · coupures russes" },
    refLevel: { value: 1.0, label: "Parité EUR/USD" },
    decision: {
      prompt:
        "Choc d'offre énergétique frappant directement l'Europe. Impact sur l'EUR/USD ?",
      choices: [
        { id: "a", label: "EUR/USD chute sous la parité" },
        { id: "b", label: "EUR/USD monte (l'inflation soutient l'EUR)" },
        { id: "c", label: "Pas de lien entre énergie et change" },
      ],
      correctId: "a",
      explanation:
        "La crise dégrade la balance commerciale et les perspectives de la Zone Euro, rendant l'EUR moins attractif — d'autant que la Fed resserrait plus agressivement. EUR/USD passe sous la parité.",
    },
    outcome:
      "EUR/USD chute sous la parité pour la première fois en 20 ans, atteignant ~0.95 en septembre 2022.",
  },
  {
    id: "ch1-nfp-jan-2024",
    index: 7,
    title: "NFP US — Surprise (janv. 2024)",
    instrument: "USD/JPY",
    period: "Février 2024 · H1",
    level: 3,
    driver: "Emploi · Anticipations de taux",
    context:
      "Consensus : 180k créations d'emplois. Publication : 353k. Taux de chômage stable à 3,7 % (att. 3,8 %). Salaires horaires +0,6 % m/m (att. +0,3 %).",
    series: {
      start: 146.8,
      decimals: 3,
      seed: 77,
      segments: [
        { bars: 22, drift: 0.001, vol: 0.0014 },
        { bars: 4, drift: 0.012, vol: 0.005 },
        { bars: 26, drift: 0.006, vol: 0.0016 },
      ],
    },
    marker: { at: 22, label: "NFP : 353k (att. 180k)" },
    refLevel: { value: 148.5, label: "Résistance 148.50" },
    decision: {
      prompt:
        "Marché du travail US brûlant, salaires en forte hausse. Effet sur l'USD/JPY ?",
      choices: [
        { id: "a", label: "USD/JPY monte (Fed reste restrictive plus longtemps)" },
        { id: "b", label: "USD/JPY baisse (le marché ignore l'emploi)" },
        { id: "c", label: "USD/JPY stable, le JPY est trop fort" },
      ],
      correctId: "a",
      explanation:
        "Un emploi très fort et des salaires en hausse repoussent les baisses de taux de la Fed et alimentent l'inflation. Le différentiel de taux US-Japon, déjà large, favorise l'USD : USD/JPY monte.",
    },
    outcome:
      "L'USD se renforce franchement à la publication ; USD/JPY accélère à la hausse, le différentiel de taux dominant la dynamique.",
  },
  {
    id: "ch1-try-depreciation-2021-2024",
    index: 8,
    title: "Dépréciation de la livre turque",
    instrument: "USD/TRY",
    period: "2021 – 2024 · Daily",
    level: 5,
    driver: "Crédibilité monétaire · Taux réels négatifs",
    context:
      "Malgré une inflation galopante, la banque centrale turque baisse ses taux sous pression politique. Les taux réels profondément négatifs détruisent la confiance dans la livre.",
    series: {
      start: 8.3,
      decimals: 3,
      seed: 88,
      segments: [
        { bars: 16, drift: 0.35, vol: 0.012 },
        { bars: 14, drift: 0.5, vol: 0.02 },
        { bars: 30, drift: 0.6, vol: 0.012 },
      ],
    },
    marker: { at: 16, label: "Baisses de taux malgré l'inflation" },
    decision: {
      prompt:
        "Inflation très élevée mais taux directeurs abaissés (taux réels négatifs). Que devient l'USD/TRY ?",
      choices: [
        { id: "a", label: "USD/TRY explose à la hausse (TRY s'effondre)" },
        { id: "b", label: "USD/TRY baisse (taux bas = croissance = TRY fort)" },
        { id: "c", label: "Stable, l'inflation est déjà connue" },
      ],
      correctId: "a",
      explanation:
        "Des taux réels négatifs détruisent l'attrait de détenir la devise : fuite des capitaux et perte de crédibilité monétaire font s'effondrer la TRY. L'USD/TRY grimpe massivement.",
    },
    outcome:
      "USD/TRY enchaîne des records, la livre perdant une large part de sa valeur — illustration extrême du lien crédibilité monétaire / change.",
  },
  {
    id: "ch1-brexit-2016",
    index: 9,
    title: "Brexit — Référendum 2016",
    instrument: "GBP/USD",
    period: "Juin 2016 · H1",
    level: 4,
    driver: "Risque politique · Incertitude",
    context:
      "Les sondages annoncent un référendum serré. Les marchés se positionnent pour un maintien dans l'UE. Le résultat « Leave » prend le marché à contre-pied.",
    series: {
      start: 1.495,
      decimals: 4,
      seed: 99,
      segments: [
        { bars: 18, drift: 0.01, vol: 0.003 },
        { bars: 6, drift: -0.1, vol: 0.02 },
        { bars: 24, drift: -0.02, vol: 0.006 },
      ],
    },
    marker: { at: 18, label: "Résultat : « Leave » l'emporte" },
    refLevel: { value: 1.32, label: "Effondrement vers 1.3200" },
    decision: {
      prompt:
        "Vote surprise pour la sortie de l'UE, incertitude maximale. Réaction du GBP/USD ?",
      choices: [
        { id: "a", label: "Chute violente (risque politique + incertitude)" },
        { id: "b", label: "Hausse (souveraineté retrouvée = livre forte)" },
        { id: "c", label: "Aucun mouvement notable" },
      ],
      correctId: "a",
      explanation:
        "L'incertitude politique et économique extrême déclenche une fuite hors de la livre. Le GBP/USD s'effondre en quelques heures, l'un des plus gros mouvements intraday de son histoire.",
    },
    outcome:
      "GBP/USD chute d'environ 1.50 vers 1.32 dans la nuit du résultat — un choc politique de manuel.",
  },
  {
    id: "ch1-us-election-2016",
    index: 10,
    title: "Élections américaines 2016",
    instrument: "USD/MXN",
    period: "Novembre 2016 · H1",
    level: 5,
    driver: "Risque politique · Reflation",
    context:
      "Le marché anticipe une issue, puis le résultat surprend. Le peso mexicain devient le baromètre du risque commercial lié au nouveau programme économique américain.",
    series: {
      start: 18.6,
      decimals: 3,
      seed: 123,
      segments: [
        { bars: 16, drift: -0.01, vol: 0.004 },
        { bars: 6, drift: 0.11, vol: 0.022 },
        { bars: 22, drift: 0.03, vol: 0.008 },
      ],
    },
    marker: { at: 16, label: "Résultat de l'élection" },
    refLevel: { value: 20, label: "Cap symbolique 20.00" },
    decision: {
      prompt:
        "Résultat surprise, craintes pour le commerce Mexique–USA. Que fait l'USD/MXN ?",
      choices: [
        { id: "a", label: "USD/MXN bondit (peso pénalisé par le risque commercial)" },
        { id: "b", label: "USD/MXN chute (le Mexique en profite)" },
        { id: "c", label: "Marché indifférent à la politique" },
      ],
      correctId: "a",
      explanation:
        "Le peso, très exposé au commerce avec les USA, devient le véhicule du risque politique : l'USD/MXN bondit. L'USD se renforce aussi sur le thème de la reflation.",
    },
    outcome:
      "USD/MXN bondit fortement à l'annonce des résultats ; le peso encaisse l'incertitude sur la relation commerciale.",
  },
];

export function caseById(id: string) {
  return CASE_STUDIES.find((c) => c.id === id);
}
