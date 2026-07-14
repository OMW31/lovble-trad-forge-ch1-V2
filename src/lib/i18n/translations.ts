// ============================================================================
// i18n — TradForge Academy — Bilingual FR/EN translation system
// ----------------------------------------------------------------------------
// Centralized dictionary for all UI strings. Technical terms (GDP, CPI, NFP,
// DCF, ROE, QE, WACC) are kept identical in both languages.
// ============================================================================

export type Language = "fr" | "en";

export const TRANSLATIONS = {
  // Navigation
  "nav.academy": { fr: "Académie", en: "Academy" },
  "nav.auth": { fr: "Connexion", en: "Sign In" },
  "nav.back": { fr: "Retour", en: "Back" },
  "nav.backToChapter": { fr: "Retour au chapitre", en: "Back to chapter" },
  "nav.cases": { fr: "Cas pratiques", en: "Case studies" },
  "nav.certification": { fr: "Certification", en: "Certification" },
  "nav.lessons": { fr: "Leçons", en: "Lessons" },

  // Assessment
  "eval.title": { fr: "Evaluation Command Center", en: "Evaluation Command Center" },
  "eval.lessonDesc": {
    fr: "Évaluation de leçon en deux volets : Partie A (QCM, 30 %) puis Partie B (widgets & visuels, 70 %). Seuil de validation : 70 % au score global pondéré.",
    en: "Lesson assessment in two parts: Part A (MCQ, 30%) then Part B (widgets & visuals, 70%). Pass threshold: 70% weighted global score.",
  },
  "eval.diagnosticDesc": {
    fr: "Diagnostic de chapitre en deux volets : Partie A (QCM) et Partie B (widgets & visuels). Seuil de validation : 70 % par partie.",
    en: "Chapter diagnostic in two parts: Part A (MCQ) and Part B (widgets & visuals). Pass threshold: 70% per part.",
  },
  "eval.partA": { fr: "Partie A · QCM enrichis", en: "Part A · Enriched MCQ" },
  "eval.partB": { fr: "Partie B · Widgets & visuels", en: "Part B · Widgets & Visuals" },
  "eval.partAShort": { fr: "Partie A", en: "Part A" },
  "eval.partBShort": { fr: "Partie B", en: "Part B" },
  "eval.partAHint": {
    fr: "Concepts, mécanismes et transmissions clés de la leçon.",
    en: "Key concepts, mechanisms and transmissions of the lesson.",
  },
  "eval.partBHint": {
    fr: "Interprétation des widgets et infographies — le cœur analytique de TradForge.",
    en: "Interpretation of widgets and infographics — the analytical core of TradForge.",
  },
  "eval.answered": { fr: "répondu(s)", en: "answered" },
  "eval.scoreEngine": { fr: "Score engine", en: "Score engine" },
  "eval.scoreGlobal": { fr: "Score global", en: "Global score" },
  "eval.calculate": { fr: "Calculer le score", en: "Calculate score" },
  "eval.saving": { fr: "Sauvegarde...", en: "Saving..." },
  "eval.newSet": { fr: "Nouvelle série", en: "New set" },
  "eval.reviewLesson": { fr: "Revoir la leçon", en: "Review lesson" },
  "eval.close": { fr: "Fermer", en: "Close" },
  "eval.passed": { fr: "Validé", en: "Passed" },
  "eval.failed": { fr: "Non validé", en: "Not passed" },
  "eval.detailedReview": { fr: "Revue détaillée", en: "Detailed review" },
  "eval.justification": { fr: "Justification", en: "Justification" },
  "eval.yourAnswer": { fr: "Ta réponse", en: "Your answer" },
  "eval.noAnswer": { fr: "Sans réponse", en: "No answer" },
  "eval.correct": { fr: "correct", en: "correct" },
  "eval.weight": { fr: "poids", en: "weight" },
  "eval.items": { fr: "item(s)", en: "item(s)" },
  "eval.trigger": { fr: "Évaluation", en: "Assessment" },
  "eval.weightedSuffix": { fr: "· 30 / 70", en: "· 30 / 70" },
  "eval.lessonPassedSaved": {
    fr: "Leçon validée. La tentative est sauvegardée si le compte est connecté.",
    en: "Lesson passed. The attempt is saved if the account is signed in.",
  },
  "eval.diagnosticPassedSaved": {
    fr: "Diagnostic validé. La tentative est sauvegardée.",
    en: "Diagnostic passed. The attempt is saved.",
  },
  "eval.lessonFailedHint": {
    fr: "Leçon non validée : le score global pondéré doit atteindre 70 %.",
    en: "Lesson not passed: the weighted global score must reach 70%.",
  },
  "eval.diagnosticFailedHint": {
    fr: "Diagnostic non validé : chaque partie doit atteindre 70 %.",
    en: "Diagnostic not passed: each part must reach 70%.",
  },
  "eval.answerPromptLesson": {
    fr: "Répondez aux parties A et B, puis lancez le scoring pondéré.",
    en: "Answer parts A and B, then run the weighted scoring.",
  },
  "eval.answerPromptDiagnostic": {
    fr: "Répondez aux parties A et B, puis lancez le scoring.",
    en: "Answer parts A and B, then run the scoring.",
  },

  // Feedback messages
  "feedback.excellent": {
    fr: "Excellence — Ta maîtrise des fondamentaux institutionnels est exceptionnelle.",
    en: "Excellence — Your mastery of institutional fundamentals is exceptional.",
  },
  "feedback.solid": {
    fr: "Solide — Tu as validé cette évaluation avec une bonne compréhension des concepts clés.",
    en: "Solid — You passed this assessment with a good understanding of key concepts.",
  },
  "feedback.rework": {
    fr: "À retravailler — Plusieurs concepts nécessitent une révision approfondie.",
    en: "Needs work — Several concepts require deeper review.",
  },
  "feedback.failed": {
    fr: "Non validé — Reprends la leçon et rejoue les widgets avant de retenter l'évaluation.",
    en: "Not passed — Review the lesson and replay the widgets before retrying the assessment.",
  },

  // Auth
  "auth.signIn": { fr: "Connexion", en: "Sign In" },
  "auth.signUp": { fr: "Inscription", en: "Sign Up" },
  "auth.email": { fr: "Email", en: "Email" },
  "auth.password": { fr: "Mot de passe", en: "Password" },
  "auth.displayName": { fr: "Nom affiché", en: "Display name" },
  "auth.pseudo": { fr: "Pseudo", en: "Username" },
  "auth.pseudoPlaceholder": { fr: "3 à 32 caractères", en: "3 to 32 characters" },
  "auth.profileType": { fr: "Profil initial", en: "Initial profile" },
  "auth.chooseProfile": { fr: "Choisir un profil", en: "Choose a profile" },
  "auth.createAccount": { fr: "Créer un compte", en: "Create account" },
  "auth.createToEval": {
    fr: "Créer un compte pour passer l'évaluation",
    en: "Create an account to take the assessment",
  },
  "auth.createToEvalDesc": {
    fr: "Les évaluations sont réservées aux comptes enregistrés. Crée ton compte pour sauvegarder ta progression et débloquer la certification finale.",
    en: "Assessments are reserved for registered accounts. Create your account to save your progress and unlock final certification.",
  },
  "auth.accountCreated": {
    fr: "Compte créé. Connectez-vous pour activer la progression synchronisée.",
    en: "Account created. Sign in to activate synced progress.",
  },
  "auth.pseudoError": {
    fr: "Le pseudo doit contenir entre 3 et 32 caractères.",
    en: "Username must be between 3 and 32 characters.",
  },

  // Profile types
  "profile.investor": { fr: "Investisseur", en: "Investor" },
  "profile.trader": { fr: "Trader indépendant", en: "Independent trader" },
  "profile.analyst": { fr: "Analyste financier/macro", en: "Financial/macro analyst" },
  "profile.student": { fr: "Étudiant avancé en économie", en: "Advanced economics student" },
  "profile.other": { fr: "Autre", en: "Other" },

  // Certification
  "cert.title": { fr: "Certification finale débloquée", en: "Final certification unlocked" },
  "cert.progress": { fr: "Progressez vers la certification", en: "Progress toward certification" },
  "cert.ready": {
    fr: "Les 5 leçons sont validées (≥ 70 %). Lancez la certification finale : 3 niveaux × 10 scénarios institutionnels.",
    en: "All 5 lessons passed (≥ 70%). Launch the final certification: 3 levels × 10 institutional scenarios.",
  },
  "cert.locked": {
    fr: "Chaque leçon vaut 20 %, créditée seulement quand son évaluation est réussie.",
    en: "Each lesson is worth 20%, credited only when its assessment is passed.",
  },
  "cert.lockedShort": { fr: "Certification verrouillée", en: "Certification locked" },
  "cert.launch": { fr: "Passer la Certification Finale", en: "Take Final Certification" },
  "cert.save": { fr: "Sauvegarder la tentative", en: "Save attempt" },
  "cert.saved": { fr: "Certification sauvegardée", en: "Certification saved" },
  "cert.scenarios": { fr: "scénarios notés", en: "scenarios graded" },
  "cert.passed": { fr: "Certification réussie", en: "Certification passed" },
  "cert.notPassed": { fr: "Certification non validée", en: "Certification not passed" },
  "cert.inProgress": { fr: "Certification en cours", en: "Certification in progress" },
  "cert.signInToSave": {
    fr: "Connectez-vous pour sauvegarder cette tentative.",
    en: "Sign in to save this attempt.",
  },

  // Scenario
  "scenario.correct": { fr: "Décision correcte", en: "Correct decision" },
  "scenario.recalibrate": { fr: "Décision à recalibrer", en: "Decision to recalibrate" },
  "scenario.direct": { fr: "Réponse directe", en: "Direct answer" },
  "scenario.complete": { fr: "Réponse complète", en: "Complete answer" },

  // Chapter
  "chapter.mission": { fr: "Mission Briefing", en: "Mission Briefing" },
  "chapter.skillPreview": { fr: "Skill Unlock Preview", en: "Skill Unlock Preview" },
  "chapter.macroRadar": { fr: "Macro Radar", en: "Macro Radar" },

  // Common
  "common.loading": { fr: "Chargement...", en: "Loading..." },
  "common.error": { fr: "Erreur", en: "Error" },
  "common.save": { fr: "Sauvegarder", en: "Save" },
  "common.cancel": { fr: "Annuler", en: "Cancel" },
  "common.confirm": { fr: "Confirmer", en: "Confirm" },
  "common.next": { fr: "Suivant", en: "Next" },
  "common.previous": { fr: "Précédent", en: "Previous" },
  "common.understood": { fr: "Compris", en: "Got it" },
  "common.weight": { fr: "poids", en: "weight" },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS;

/** Get translation for a key in the specified language. Falls back to FR. */
export function t(key: TranslationKey, lang: Language): string {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[lang] ?? entry.fr;
}

/** Detect language from navigator.language. */
export function detectLanguage(): Language {
  if (typeof navigator === "undefined") return "fr";
  const lang = navigator.language.toLowerCase();
  return lang.startsWith("en") ? "en" : "fr";
}
