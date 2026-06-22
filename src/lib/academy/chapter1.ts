export interface LessonMeta {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  level: number;
}

export const CHAPTER = {
  id: "analyse-fondamentale",
  num: "Chapitre 01",
  title: "Analyse Fondamentale",
  tagline: "Voir · Manipuler · Décider · Comprendre",
  description:
    "Le laboratoire interactif qui transforme la théorie en intuition. Pilotez un environnement d'analyse macro et micro-économique de niveau institutionnel.",
};

export const LESSONS: LessonMeta[] = [
  {
    id: "intro",
    num: "1.1",
    title: "Introduction & Définition",
    subtitle: "Valeur intrinsèque, efficience, retour à la moyenne",
    level: 1,
  },
  {
    id: "macro",
    num: "1.2",
    title: "Données Macroéconomiques",
    subtitle: "Indicateurs, catégorisation, temporalité",
    level: 2,
  },
  {
    id: "micro",
    num: "1.3",
    title: "Données Microéconomiques",
    subtitle: "États financiers, marges, dette, cash-flow",
    level: 3,
  },
  {
    id: "outils",
    num: "1.4",
    title: "Outils d'Analyse",
    subtitle: "Ratios, DCF, sectoriel, peer, SWOT",
    level: 4,
  },
  {
    id: "previsions",
    num: "1.5",
    title: "Prévisions Financières",
    subtitle: "Tendances, scénarios, guidance",
    level: 5,
  },
  {
    id: "cas-pratiques",
    num: "1.6",
    title: "Exemples Pratiques",
    subtitle: "10 cas historiques rejouables",
    level: 5,
  },
];
