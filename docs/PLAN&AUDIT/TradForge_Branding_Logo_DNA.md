## Le logo actuel fonctionne.

Mais il reste dans une logique de :

> Logo.
> 

Alors qu'il devrait devenir un véritable :

> Signature institutionnelle.
> 

C'est exactement ce qui différencie Bloomberg, BlackRock, McKinsey, Apple ou Anthropic.

Le logo n'est jamais isolé.

Il fait partie du langage graphique.

---

# Proposition 2 — Forged Metal (RECOMMANDÉE ET RETENUE)

C'est celle que je choisirais.

Pourquoi ?

Parce qu'elle raconte l'histoire de TradForge.

TradForge

↓

Forge

↓

Métal forgé

↓

Transformation

↓

Création de valeur

↓

Institutionnel.

Le mot devient littéralement forgé.

---

## Trad

Blanc cassé

↓

acier brossé

↓

ivoire

---

## Transition

Pas une séparation verticale.

Une courbe organique.

Comme une coulée de métal.

Un masque diagonal incurvé.

Très subtil.

---

## Forge

Commence

or chaud

↓

orange incandescent

↓

ambre

↓

léger reflet métallique.

---

On obtient un rendu :

```
Trad══════╮
          ╰════Forge
```

mais avec une transition invisible.

---

### Ajouter

Micro texture métallique

2 %

maximum.

---

### Reflets

Très légers.

Pas glossy.

Plutôt :

- Apple Vision Pro
- Anthropic
- Bentley

---

### Flame

Même couleur.

Mais :

Glow très discret.

5 %

---

### Ombre

Soft Shadow

0.5 px

quasiment invisible.

---

### Résultat

Le cerveau ne voit pas un dégradé.

Il voit :

une matière.

---

# ARGUMENTATIOON

Je garderais définitivement

## Proposition 2

Elle possède plusieurs avantages.

Elle est :

✓ intemporelle

✓ premium

✓ discrète

✓ institutionnelle

✓ cohérente avec le nom TradForge

✓ facile à reproduire

✓ parfaite pour tous les supports

- UI
- PDF
- Hero
- Présentations
- Animations
- Splash Screen
- Vidéo

---

# Nouveau Visual DNA (à injecter dans tous les prompts)

À partir de maintenant, tous les prompts commenceront par un bloc commun.

---

## TRADFORGE BRAND DNA V2

```
Official TradForge Academy visual identity.

Use the authentic TradForge branding integrated naturally into the composition.

Top-left institutional logo composed of:

• minimalist forged flame icon

• official TradForge typography

Typography must remain identical to the official branding.

Enhance the wordmark using a premium forged-metal gradient.

"Trad"

soft ivory

↓

brushed platinum

↓

warm white

Transition through an elegant organic diagonal curve flowing naturally into

"Forge"

molten gold

↓

amber

↓

burnt orange

↓

subtle metallic reflections.

No hard separation.

No vertical split.

No cheap gradient.

The transition should feel forged into the material.

Extremely premium.

Invisible craftsmanship.

Apple Industrial Design.

Anthropic elegance.

Bloomberg institutional aesthetics.

Bentley level craftsmanship.

Ultra minimal.

Editorial.

Luxury.

Timeless.

No glow except an extremely subtle warmth around the flame.

Never distort the logo.

Never change the typography.

Always keep generous negative space around the logo.
```

Ce bloc devient une **brique réutilisable** pour tous les prompts et garantit une cohérence de marque sur l'ensemble des assets.

---

# Mise à jour des prompts Visuels, infographies, etc

Plutôt que de réécrire uniquement les descriptions des scènes, je recommande que **chaque prompt** soit désormais structuré ainsi :

```
[TRADFORGE BRAND DNA V2]

↓

Scene Description

↓

Composition

↓

Educational Intent

↓

Lighting

↓

Camera

↓

Color Palette

↓

Material Rendering

↓

Post Processing

↓

Negative Prompt
```

Ainsi, le branding n'est plus un simple ajout : il devient une contrainte systématique de génération.

---

# UI/UX kit complet

```markdown
Voici la documentation structurelle de votre design system, construite
directement à partir de l’analyse de votre fichier styles.css.

Pour respecter scrupuleusement vos exigences de construction, chaque section est
divisée en une partie succincte (l'essentiel stratégique) et une partie
développée (l'implémentation opérationnelle).

Certaines spécifications fonctionnelles précises (comme la hiérarchie exacte des
tailles de police ou la structure exacte de vos composants) ne figurent pas dans
votre code CSS brut. Les manquements identifiés ont été répertoriés à la fin du
document afin que vous puissiez nous les fournir pour finaliser ce kit.

TradForge Academy — Visual DNA

1. Overview (Vision d'ensemble)

Version Succincte

TradForge Academy fusionne la rigueur analytique des terminaux financiers
institutionnels et la clarté de l'édition moderne. C'est une interface
ultra-sombre, ponctuée d'un orange ambré signature (« Forge ») issu de
l'esthétique Bloomberg, de détails cyan de haute précision (« Data ») et de
signaux sémantiques stricts pour les tendances de marché (hausse/baisse).

Version Développée

  - L'Angle : Le Quant d’Avant-Garde (The Tech Terminal) TradForge s'écarte des
    codes classiques de la fintech d'accès grand public pour embrasser
    l'esthétique brute et ultra-performante des desks de trading algorithmique
    et des terminaux professionnels (Bloomberg, TradingView).
  - L'Axe : Obscurité souveraine et tension lumineuse Le canevas est nativement
    sombre. Le contraste ne s'opère pas par des surfaces blanches, mais par une
    hiérarchie de gris profonds oklch, des tracés fins (hairlines) et
    l'injection chirurgicale de lumières néons (glow ambré et cyan).
  - La Vibe : Le simulateur de vol macroéconomique L’utilisateur doit ressentir
    la concentration d'un trader haute fréquence. La théorie économique complexe
    s'y matérialise sous forme de tableaux denses, de graphes nets et de
    chiffres monospécifiques hautement lisibles.

2. Palette Chromatique & Sémantique (Colors)

Version Succincte

Le système utilise exclusivement l’espace colorimétrique OKLCH pour garantir une
perception uniforme de la luminosité, même lors des transitions. Aucun code
couleur n'est figé en brut (hexadécimal) dans l'application ; tout passe par des
jetons (tokens) sémantiques.

Version Développée

| Token CSS               | Valeur OKLCH                | Usage Interface                                               |
| :---------------------- | :-------------------------- | :------------------------------------------------------------ |
| `--background`          | `oklch(0.16 0.012 250)`     | Fond principal de l'application (Noir institutionnel)         |
| `--foreground`          | `oklch(0.95 0.006 250)`     | Texte principal (Blanc cassé haute lisibilité)                |
| `--surface`             | `oklch(0.19 0.014 250)`     | Cartes de premier niveau, sections secondaires                |
| `--surface-2`           | `oklch(0.225 0.016 250)`    | Éléments surélevés, champs de saisie                          |
| `--primary` / `--forge` | `oklch(0.8 0.15 75)`        | Ambre Bloomberg signature (Boutons d'action, accents)         |
| `--forge-glow`          | `oklch(0.8 0.15 75 / 0.22)` | Halo lumineux ambré pour l'état actif/focus                   |
| `--data`                | `oklch(0.78 0.12 210)`      | Cyan technique (Données froides, graphiques, valeurs neutres) |
| `--bull`                | `oklch(0.74 0.16 152)`      | Vert sémantique (Marché en hausse, profit)                    |
| `--bear`                | `oklch(0.64 0.21 22)`       | Rouge sémantique (Marché en baisse, perte, destruction)       |
| `--muted-foreground`    | `oklch(0.66 0.018 250)`     | Légendes, textes secondaires, métadonnées                     |
| `--border`              | `oklch(0.3 0.016 250)`      | Bordures fines et séparateurs discrets                        |
| `--grid`                | `oklch(1 0 0 / 0.05)`       | Grille technique en arrière-plan                              |

3. Typographie (Typography)

Version Succincte

La typographie de TradForge repose sur une séparation stricte des rôles : un
caractère géométrique affirmé pour les titres, une police très lisible pour les
textes courants et une police à chasse fixe (monospace) pour toutes les données
chiffrées.

Version Développée

Le système utilise trois familles de polices de caractères spécifiques :

  - Police d'affichage (--font-display) : Space Grotesk (alternative : Manrope).
    Elle est réservée exclusivement aux grands titres de sections et aux
    accroches héroïques. Elle apporte la touche moderniste et technique.
  - Police de texte (--font-sans) : Manrope. Équilibrée, neutre et très lisible
    à petite échelle. Utilisée pour le corps de texte, les explications et les
    étiquettes de boutons.
  - Police de données (--font-mono) : JetBrains Mono (alternatives système : SF
    Mono, ui-monospace). Utilisée obligatoirement pour tous les chiffres,
    pourcentages, prix et codes afin d'éviter le décalage visuel des colonnes
    lors des mises à jour en direct (chiffres tabulaires).

4. Formes, Éléments Visuels & Effets (Shapes & Effects)

Version Succincte

La structure visuelle de TradForge exploite des angles adoucis mais structurés,
des ombres portées subtiles et des effets de balayage lumineux pour mimer
l'activité en temps réel d'une machine financière.

Version Développée

Échelle des arrondis (Border Radius)

La valeur de base (--radius) est de 0.75rem (12px). Elle se décline ainsi :

  - Petit (--radius-sm) : 8px (petits badges, balises).
  - Moyen (--radius-md) : 10px (champs de saisie, petits boutons).
  - Large (--radius-lg) : 12px (cartes d'information de base).
  - Très large (--radius-xl à 3xl) : de 16px à 24px (grands conteneurs, tableaux
    de bord).

Effets Signature & Micro-interactions

  - La Grille Technique (.grid-bg) : Un motif de lignes croisées de 40px
    par 40px en arrière-plan, rappelant les carnets d'ordres ou les écrans de
    calcul mathématique.
  - L'effet Shimmer (.shimmer) : Un balayage lumineux linéaire qui traverse
    discrètement les éléments pour indiquer un chargement ou un flux
    d'information actif.
  - Le Premium Hover (.premium-hover) : Au survol d'une carte, celle-ci s'élève
    légèrement, sa bordure s'illumine de l'ambre signature de la forge et un
    halo arrière (--shadow-glow) apparaît.
  - Le Ticker Pulse (.animate-ticker-pulse) : Clignotement doux des indicateurs
    d'état ou des prix pour signaler la réception d'une nouvelle donnée de
    marché.

5. Recommandations de Conception (Do’s & Don’ts)

Version Succincte

Garantir la clarté et l'impact de la marque passe par le respect absolu de
règles d'association des couleurs et d'utilisation des polices de caractères.

Version Développée

            🟢 À FAIRE (DO)                                  🔴 À ÉVITER (DON'T)
=========================================         =========================================
• Utiliser JetBrains Mono pour tout chiffre       • Ne jamais utiliser Space Grotesk pour
  ou pourcentage affiché à l'écran.                 du corps de texte ou des chiffres.
                                                  
• Réserver l'ambre (--forge) uniquement pour     • Éviter de saturer l'écran d'ambre. C’est
  les appels à l'action principaux (CTA).          une couleur d'accentuation chirurgicale.
                                                  
• Indiquer les variations de prix uniquement     • Ne jamais utiliser le rouge (--bear) ou le
  par la couleur du texte (sans fond coloré).      vert (--bull) en arrière-plan de bouton.
                                                  
• Utiliser la grille d'arrière-plan avec          • Ne pas mélanger plusieurs types d'arrondis
  parcimonie sur les sections principales.          incohérents sur une même ligne visuelle.

6. Les informations manquantes à fournir (Gaps)
Pour que nous puissions amener cette documentation à un niveau d'excellence et de complétude équivalent à celui de Coinbase, certaines données absentes de votre fichier CSS doivent être définies.
Voici la liste des éléments qu'il nous manque et que vous pouvez nous fournir lors de votre prochain message :
L'échelle typographique complète (Tailles de police exactes) :
Quelles sont vos tailles de texte cibles en pixels ? (Ex: Grand titre héroïque, titres de cartes, corps de texte, petites légendes).
Les spécifications des boutons :
Quels sont les espacements (paddings) internes et les hauteurs exactes de vos boutons principaux et secondaires ?
Les dimensions des maquettes et conteneurs :
Quelle est la largeur maximale de vos pages à l'écran ? (Ex: 1200px ou 1400px pour les tableaux de bord).
Quels sont vos espacements (marges) entre les grandes sections ?
Le comportement sur mobile (Responsive) :
Comment vos blocs ou vos grands tableaux de données doivent-ils se réorganiser sur les écrans de smartphones ?
```

# Partie  2: COMPLEMENTS

```markdown
BLOC 1 : PHILOSOPHIE & DIRECTION ESTHÉTIQUE (BRAND DNA)

```

# 1. PHILOSOPHIE VISUELLE & DIRECTION ARTISTIQUE

## 1.1 Partie Succincte

TradForge Academy applique l'esthétique technique des terminaux de trading professionnels (Bloomberg, TradingView) à un environnement éducatif. Le système repose sur une interface ultra-sombre, une typographie d'affichage moderniste, des détails orange ambré chirurgicaux pour les actions principales, et un bleu-vert cyan pour la visualisation de données froides.

## 1.2 Partie Développée

- **L’Angle : Le Terminal Tactique (The Quant Workspace)**
Le design élimine les surfaces blanches traditionnelles et les aplats colorés pour recréer l'environnement de travail immersif d'un analyste quantitatif. L'accent est mis sur la densité d'information lisible, la rigueur géométrique et la suppression de tout élément purement décoratif non fonctionnel.
- **L’Axe : Contraste de luminance chirurgical**
Dans un environnement entièrement sombre, la lumière sert de signal d'attention. L'utilisation de l'ambre signature (`-forge`) et du cyan (`-data`) est restreinte pour préserver leur pouvoir d'appel visuel. Le reste de l'interface utilise des nuances de gris subtilement bleutées (`oklch(250)`) pour hiérarchiser les cartes et les tableaux de bord.
- **L’Atmosphère : Le Laboratoire d'Évaluation Continu**
La mise en page s'organise comme un tableau de bord modulaire. L'utilisateur n'est pas devant un manuel de lecture passive, mais face à un environnement interactif où chaque concept macroéconomique est manipulable via un composant ou un simulateur scénarisé.

BLOC 2 : SYSTÈME COULEUR EN OKLCH (COLORS)

# 2. CARTOGRAPHIE DES COULEURS (SYSTEME OKLCH)

## 2.1 Partie Succincte

La palette utilise exclusivement l'espace colorimétrique OKLCH pour garantir des ratios de contraste réguliers et une transition visuelle fluide entre les différents composants interactifs. Aucun code hexadécimal n'est utilisé en dur dans l'interface de production.

## 2.2 Partie Développée

### 2.2.1 Couleurs Fondations & Surfaces

- **Background principal (`-background`) :** `oklch(0.16 0.012 250)`
Le noir de fond institutionnel. Très légèrement bleuté pour réduire la fatigue oculaire lors des sessions d'analyse prolongées.
- **Foreground principal (`-foreground`) :** `oklch(0.95 0.006 250)`
Gris extrêmement clair utilisé pour le texte de lecture principal et les titres de niveau 1.
- **Surface de base (`-surface`) :** `oklch(0.19 0.014 250)`
La couleur de fond par défaut des cartes interactives, widgets et blocs d'information de premier niveau.
- **Surface élevée (`-surface-2`) :** `oklch(0.225 0.016 250)`
Utilisée pour les éléments interactifs survolés, les champs de saisie de formulaires et les sous-cartes imbriquées.
- **Bordures (`-border`) :** `oklch(0.3 0.016 250)`
Tracé fin de 1px utilisé pour structurer les cartes et dessiner la grille technique.

### 2.2.2 Accents de Marque

- **Signature Ambre (`-primary` / `-forge`) :** `oklch(0.8 0.15 75)`
Orange ambré hérité des moniteurs Bloomberg. Utilisé pour les boutons d'action principaux, les titres de sous-sections techniques et les valeurs à forte importance.
- **Glow Ambre (`-forge-glow`) :** `oklch(0.8 0.15 75 / 0.22)`
Halo de mise au point appliqué derrière les boutons actifs ou lors des états de focus.
- **Cyan Technique (`-data`) :** `oklch(0.78 0.12 210)`
Utilisé pour identifier les graphiques de données froides, les indicateurs neutres et les éléments d'affichage statistiques.

### 2.2.3 Sémantique de Marché

- **Bull Market (`-bull`) :** `oklch(0.74 0.16 152)`
Vert technique utilisé pour les flux haussiers, les résultats positifs et les validations de leçons. S'applique uniquement sur le texte ou les icônes, jamais en fond de conteneur.
- **Bear Market / Danger (`-bear` / `-destructive`) :** `oklch(0.64 0.21 22)`
Rouge technique pour les mouvements baissiers, les invalidations de scénarios et les états d'erreur.

BLOC 3 : TYPOGRAPHIE & RYTHME VERTICAL (TYPO & SPACING)

# 3. TYPOGRAPHIE, HIÉRARCHIE & RYTHME VERTICAL

## 3.1 Partie Succincte

La typographie s'articule autour de trois polices : **Space Grotesk** pour l'affirmation des grands titres, **Manrope** pour le confort de lecture des textes de cours, et **JetBrains Mono** pour la précision absolue des données chiffrées. L'espacement applique une respiration verticale aérée pour rythmer la progression pédagogique.

## 3.2 Partie Développée

### 3.2.1 Échelle Typographique TradForge

- **Display Title (Titre Chapitre / Hero) :** `Space Grotesk` | Poids 400 ou 500 (selon le niveau d'importance). Éviter le gras excessif (poids 700+) sur les titres principaux pour préserver la sobriété éditoriale.
- **Sub-Header Technique (Sous-titre d'accroche) :** `JetBrains Mono` | Tout en majuscules (all-caps) | Couleur `-primary` | Lettres espacées (tracking large). Utilisé pour les lignes d'étapes d'apprentissage (Ex : `VOIR • MANIPULER • DÉCIDER • COMPRENDRE`).
- **Body Text (Explications pédagogiques) :** `Manrope` | Poids 400 | Hauteur de ligne 1.5. Offre une lisibilité maximale pour les paragraphes d'analyse macroéconomique complexes.
- **Price & Data (Chiffres de marché) :** `JetBrains Mono` | Chiffres tabulaires à largeur fixe. Indispensable pour éviter que les tableaux de bord ne tressautent lors des variations de valeurs en temps réel.

### 3.2.2 Rythme vertical de leçon ("Respiration pédagogique")

Afin d'éviter la surcharge d'informations entre les modules de cours, les valeurs d'espacement de la classe `LessonSection` sont normalisées :

- **Padding vertical (Haut/Bas de section) :** `pt-16 pb-20` (mobile), s'élargissant à `lg:pt-24 lg:pb-28` (sur ordinateur de bureau).
- **Espacement interne des composants :** `space-y-8` (mobile) évoluant vers `lg:space-y-12` (ordinateur).
- **Séparateurs inter-leçons :** Utilisation d'un filet dégradé accompagné d'un numéro de section géant en arrière-plan flouté (effet "grand numéro fantôme") pour marquer une pause visuelle claire avant la leçon suivante.

BLOC 4 : CALQUE VISUEL & CONCEPTION DE LA PROFONDEUR (VISUALLAYER)

# 4. GESTION DES IMAGES, GRILLES & PROFONDEUR VISUELLE

## 4.1 Partie Succincte

TradForge interdit l'intégration d'images brutes via des balises `<img>` standards dans les flux d'apprentissage. Tous les visuels techniques de l'application (schémas d'inflation, flux financiers, cartographies) sont traités comme des calques dynamiques intégrés par le composant primitif `VisualLayer`.

## 4.2 Partie Développée

### 4.2.1 Le Composant Primitif `VisualLayer`

Ce composant encapsule les images au format WebP haute définition (catalogue d'actifs `a4` à `a17`) et applique une série de filtres visuels intégrés pour les fondre dans le design de l'application :

- **Opacité contrôlée :** Intégration en arrière-plan des blocs de widgets à opacité réduite pour ne pas perturber la lecture des données actives.
- **Masque de fondu progressif (Fade Mask) :** Dégradé radial ou linéaire transparent aux bordures du calque pour éliminer les contours rectangulaires des images et les fusionner avec le fond `-background`.
- **Transitions d'affichage :** Les apparitions et disparitions des calques sont animées via la bibliothèque Framer Motion de manière douce (fondus enchaînés bidirectionnels), tout en respectant l'accessibilité système si l'utilisateur a désactivé les animations (`prefers-reduced-motion`).

### 4.2.2 Grille de fond technique (`.grid-bg`)

Un motif quadrillé de 40px par 40px est appliqué en arrière-plan des zones de démonstration et des bandeaux d'introduction. Ce tracé utilise la variable de couleur `--grid` (luminosité blanche ultra-faible à 5 % d'opacité) pour rappeler les repères d'un papier millimétré ou d'un écran d'ingénierie financière.

BLOC 5 : BIBLIOTHÈQUE DE COMPOSANTS INTERACTIFS

# 5. SPÉCIFICATIONS DES COMPOSANTS INTERACTIFS

## 5.1 Partie Succincte

Les composants visuels de TradForge suivent une géométrie stricte et modulaire. Contrairement aux boutons de type "pilule", TradForge utilise l'échelle de coins arrondis `--radius` de `12px` (soit `rounded-xl` ou `rounded-2xl` de Tailwind) pour créer une structure de cartes et de modules stables et professionnels.

## 5.2 Partie Développée

### 5.2.1 Boutons d'Action (Buttons)

- **Bouton Primaire (`button-primary`) :**
    - *Rôle :* Lancer une action majeure (Ex : « Démarrer le laboratoire »).
    - *Style :* Fond de couleur ambre `-primary` (`oklch(0.8 0.15 75)`), texte noir à fort contraste.
    - *Forme :* Coins arrondis de `12px` (`-radius-lg` ou `rounded-xl`). Pas de forme pilule complète à moins d'une mention explicite pour un badge.
    - *Complément visuel :* Flèche directionnelle d'action (vers le bas ou la droite) intégrée à droite du texte pour insister sur l'action en cours.
- **Bouton Secondaire (`button-secondary`) :**
    - *Rôle :* Accéder aux cas historiques ou aux options de contournement.
    - *Style :* Fond transparent, texte blanc, bordure fine de 1px de couleur `-border`.
    - *Forme :* Identique au bouton primaire.

### 5.2.2 Le Mini-Hero de Leçon (`LessonMiniHero`)

Placé systématiquement au sommet des leçons de 1.2 à 1.5, il synthétise les données d'apprentissage :

- **Badge de niveau :** Un petit élément textuel affichant la difficulté et le niveau d'accès (Standard, High, Premium).
- **Métadonnées de cours :** Indicateur de durée estimée et fil d'étapes à franchir sous forme de puces horizontales.
- **Mission Briefing :** Un bloc d'introduction résumant succinctement l'objectif principal de la leçon et la question clé à résoudre par l'étudiant à la fin de celle-ci.

### 5.2.3 Cartes d'Analyse (Analysis Cards)

Les cartes de leçons et de statistiques (ex : "6 leçons", "28+ widgets") partagent les règles d'affichage suivantes :

- *Fond :* `-surface` avec une bordure fine de 1px `-border`.
- *Effet de survol (`.premium-hover`) :* Légère élévation physique de la carte, la bordure s'illumine discrètement à l'ambre `-primary` et un léger halo lumineux arrière est projeté.

BLOC 6 : ARCHITECTURE DU MOTEUR DE SCÉNARIOS (SCENARIOS SPEC)