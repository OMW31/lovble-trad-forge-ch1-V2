import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Phase 5 — Architecture du parcours.
 * La home interne est retirée du parcours : la racine mène directement au
 * Chapter Hub (/academy), point d'entrée unique du produit.
 * Aucune page n'est supprimée du produit : le hub porte désormais l'accueil,
 * le Preflight et la sélection de chapitre.
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/academy" });
  },
  head: () => ({
    meta: [
      { title: "TradForge Academy — Le laboratoire macro institutionnel" },
      {
        name: "description",
        content:
          "Entrez dans TradForge Academy : chapitres interactifs, widgets institutionnels et scénarios de marché pour maîtriser l'analyse fondamentale.",
      },
      { property: "og:title", content: "TradForge Academy — Le laboratoire macro institutionnel" },
      {
        property: "og:description",
        content:
          "Chapitres interactifs, widgets institutionnels et scénarios de marché rejouables.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
