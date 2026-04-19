import { seedGymiTracks, seedMockExams, seedTopics } from "../content/seed-content.js";
import { formatMathText } from "./math-text.js";
import { LangGymiTopicPage } from "./lang-gymi-topic-page.js";
import { SimplifyTermsCanvas } from "./simplify-terms-canvas.js";

type Language = "en" | "de";
type ViewName = "home" | "topics" | "plan" | "gymi" | "lang-topic" | "profile" | "auth" | "change-email" | "change-password";
type AuthMode = "sign-up" | "log-in";
type Goal = "school" | "confidence" | "gymi";
type Intensity = "light" | "steady" | "focus";

interface ApiTopic {
  slug: string;
  title: string;
  grade_band: string;
  category: string;
  duration_minutes: number;
  summary: string;
  theory_points: string[];
  practice_easy: string[];
  practice_medium: string[];
  practice_hard: string[];
}

interface ApiGymiTrack {
  code: string;
  title: string;
  audience: string;
  description: string;
}

interface ApiMockExam {
  slug: string;
  track_code: string;
  title: string;
  description: string;
  duration_minutes: number;
  tasks: string[];
}

interface TopicContent {
  id: string;
  title: string;
  grade: string;
  category: string;
  duration: string;
  summary: string;
  formula: string;
  theory: string[];
  practice: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
}

interface TrackContent {
  id: string;
  title: string;
  audience: string;
  pillars: string[];
  diagnostics: string;
}

interface MockExamContent {
  id: string;
  title: string;
  description: string;
  tasks: string[];
}

interface StudyPlanState {
  goal: Goal;
  grade: string;
  intensity: Intensity;
  topicIds: string[];
}

interface AccountState {
  id: string;
  email: string;
  display_name: string;
  grade_band: string;
}

interface ProfileState {
  displayName: string;
  photoUrl: string;
  gradeBand: string;
  about: string;
}

interface ApiStudyPlan {
  student_id: string;
  goal?: string;
  grade_band?: string;
  intensity?: string;
  topic_slugs?: string[];
}

interface ApiProgressEntry {
  student_id: string;
  topic_slug: string;
  status: "started" | "practicing" | "completed";
  score: number | null;
  completed_at: string;
}

interface TranslationSet {
  documentTitle: string;
  navHome: string;
  navLearn: string;
  navPlan: string;
  navGymi: string;
  loginButton: string;
  logoutButton: string;
  avatarProfile: string;
  avatarLogout: string;
  homeTitle: string;
  homeText: string;
  homeOpenTopics: string;
  homeCreateAccount: string;
  statsTopics: string;
  statsTasks: string;
  statsSections: string;
  appIncludes: string;
  appIncludesTitle: string;
  appIncludesText: string;
  currentLearner: string;
  currentLearnerSignedOut: string;
  currentLearnerSignedIn: string;
  mainSections: string;
  openSectionTitle: string;
  openSectionText: string;
  learnCardKicker: string;
  learnCardTitle: string;
  learnCardText: string;
  learnCardButton: string;
  planCardKicker: string;
  planCardTitle: string;
  planCardText: string;
  planCardButton: string;
  gymiCardKicker: string;
  gymiCardTitle: string;
  gymiCardText: string;
  gymiCardButton: string;
  topicsEyebrow: string;
  topicsTitle: string;
  topicsText: string;
  topicsViewerLabel: string;
  topicsFinishButton: string;
  topicFeedback: string;
  topicFinishedAlready: string;
  topicSavedPlan: string;
  topicCompletedMessage: string;
  theoryTitle: string;
  practiceStart: string;
  practiceMiddle: string;
  practiceHard: string;
  planEyebrow: string;
  planTitle: string;
  planText: string;
  goalLabel: string;
  gradeLabel: string;
  intensityLabel: string;
  topicsLegend: string;
  savePlanButton: string;
  progressTitle: string;
  progressDone: string;
  progressMessageDefault: string;
  topicsDone: string;
  topicsPicked: string;
  studyRhythm: string;
  savedPlan: string;
  noPlanTopics: string;
  gymiEyebrow: string;
  gymiTitle: string;
  gymiText: string;
  useTrack: string;
  mockExam: string;
  nextMockExam: string;
  profileEyebrow: string;
  profileTitle: string;
  profileText: string;
  profileName: string;
  profileEmail: string;
  profilePhoto: string;
  profileLevel: string;
  profileAbout: string;
  profileSave: string;
  profileRemove: string;
  profileEmptyEmail: string;
  profileEmptyAbout: string;
  profileMessageSignedOut: string;
  profileMessageSaved: string;
  profileRemoveSuccess: string;
  profileSecurityTitle: string;
  profileSecurityMessage: string;
  openChangeEmail: string;
  openChangePassword: string;
  emailChangeTitle: string;
  changeEmailEyebrow: string;
  changeEmailPageTitle: string;
  changeEmailPageText: string;
  changeEmailInfoTitle: string;
  changeEmailStep1: string;
  changeEmailStep2: string;
  changeEmailStep3: string;
  backToProfile: string;
  emailChangeNewEmail: string;
  emailChangeCode: string;
  emailChangeRequestButton: string;
  emailChangeConfirmButton: string;
  emailChangeHint: string;
  emailChangeSignedOut: string;
  emailChangeRequestSending: string;
  emailChangeRequestSuccess: string;
  emailChangeConfirmSending: string;
  emailChangeConfirmSuccess: string;
  passwordCardTitle: string;
  changePasswordEyebrow: string;
  changePasswordPageTitle: string;
  changePasswordPageText: string;
  changePasswordInfoTitle: string;
  changePasswordStep1: string;
  changePasswordStep2: string;
  changePasswordStep3: string;
  passwordCurrent: string;
  passwordNew: string;
  passwordUpdateButton: string;
  passwordUpdateHint: string;
  passwordUpdateSignedOut: string;
  passwordUpdateSuccess: string;
  authEyebrow: string;
  authTitle: string;
  authText: string;
  authWhyTitle: string;
  authWhy1: string;
  authWhy2: string;
  authWhy3: string;
  authSignUp: string;
  authLogIn: string;
  authName: string;
  authEmail: string;
  authPassword: string;
  authLevel: string;
  authNamePlaceholder: string;
  authPasswordPlaceholder: string;
  authCreateAccount: string;
  authAlready: string;
  authNeedNew: string;
  authHelper: string;
  authSignedIn: string;
  authCreating: string;
  authLoggingIn: string;
  authResetTitle: string;
  authResetRequestButton: string;
  authResetConfirmButton: string;
  authResetCode: string;
  authResetHint: string;
  authResetRequestSending: string;
  authResetRequestSuccess: string;
  authResetConfirmSending: string;
  authResetConfirmSuccess: string;
  accountSignedInTitle: string;
  selectAllGrades: string;
  selectAllTypes: string;
  completedLabel: string;
  grade34: string;
  grade56: string;
  grade78: string;
  grade9Plus: string;
  goalSchool: string;
  goalConfidence: string;
  goalGymi: string;
  intensityLight: string;
  intensitySteady: string;
  intensityFocus: string;
  levelAll: string;
  levelLabel: string;
  languageSwitcherLabel: string;
}

type LocalizedTopicOverride = Partial<{
  title: string;
  category: string;
  summary: string;
  formula: string;
  theory: string[];
  practiceEasy: string[];
  practiceMedium: string[];
  practiceHard: string[];
}>;

type LocalizedTrackOverride = Partial<{
  title: string;
  audience: string;
  description: string;
  pillars: string[];
  diagnostics: string;
}>;

type LocalizedExamOverride = Partial<{
  title: string;
  description: string;
  tasks: string[];
}>;

const homePageContent = {
  en: {
    hero: {
      title: "Prepare for Zurich Gymnasium math entrance exam tasks",
      subtitle:
        "Practice the most common mathematics task types for the Zurich entrance exam to Langgymnasium and Kurzgymnasium. Learn with step-by-step explanations, hints, and similar examples.",
      primaryButton: "Start with Langgymnasium",
      secondaryButton: "Start with Kurzgymnasium",
      infoCard: [
        "Written entrance exam",
        "German + Mathematics",
        "Math counts for 50% of the exam grade"
      ]
    },
    benefits: [
      {
        title: "Train typical math task types",
        text: "Practise common entrance exam patterns such as simplifying expressions, equations, fractions, roots, and geometry."
      },
      {
        title: "Learn from mistakes",
        text: "If your answer is wrong, the app explains the solution step by step and gives you a similar example."
      },
      {
        title: "Choose the right exam path",
        text: "Follow a task path designed for Langgymnasium or Kurzgymnasium and focus on the right level."
      }
    ],
    examCards: {
      lang: {
        title: "Langgymnasium",
        label: "For pupils in 6th grade of primary school",
        text: "The Zurich entrance exam for Langgymnasium is for pupils in the 6th year of primary school. The written exam includes German and Mathematics. Mathematics counts for half of the exam grade.",
        button: "Start Langgymnasium math practice"
      },
      kurz: {
        title: "Kurzgymnasium",
        label: "For students in the 2nd or 3rd year of secondary school",
        text: "The Zurich entrance exam for Kurzgymnasium is for students in the 2nd or 3rd year of secondary school. The written exam includes German and Mathematics. Mathematics counts for half of the exam grade.",
        button: "Start Kurzgymnasium math practice"
      }
    },
    admission: {
      eyebrow: "Admission in the Canton of Zurich",
      title: "How entry to a Zurich Gymnasium works",
      text:
        "In the Canton of Zurich, entry to a Gymnasium normally requires passing the Zentrale Aufnahmeprüfung (ZAP), also called the Gymiprüfung. The exam takes place once a year at the beginning of March.",
      zapTitle: "Zentrale Aufnahmeprüfung (ZAP)",
      zapText:
        "In this app you can go straight to the exam paths and math practice for Langgymnasium and Kurzgymnasium.",
      zapLink: "Open exam paths",
      brochureLink: "Open topic overview",
      note: "This home section gives a short overview of the Zurich Gymnasium route and links only to pages inside this web app.",
      langTitle: "Langgymnasium",
      langText: "The Langgymnasium starts after Year 6 of primary school and lasts 6 years.",
      langLink: "More about Langgymnasium",
      kurzTitle: "Kurzgymnasium",
      kurzText:
        "The Kurzgymnasium starts after Year 2 or 3 of secondary school, or after Year 2 of Langgymnasium, and lasts 4 years.",
      kurzLink: "More about Kurzgymnasium",
      unterTitle: "Untergymnasium",
      unterText:
        "The first two years of the Langgymnasium are called Untergymnasium. In most cases, learners move on to the upper level without another entrance exam.",
      unterLink: "Open Gymnasium overview"
    },
    cta: {
      title: "Start practising the math tasks that matter most",
      text: "Choose your exam path and begin with typical entrance exam exercises, guided solutions, and targeted practice.",
      langButton: "Choose Langgymnasium",
      kurzButton: "Choose Kurzgymnasium"
    },
    footer: {
      tagline: "Math practice for Zurich Gymnasium entrance exam preparation",
      officialInfo: "Official exam information",
      privacy: "Privacy",
      contact: "Contact"
    }
  },
  de: {
    hero: {
      title: "Bereite dich auf Mathematikaufgaben der Zürcher Gymi-Aufnahmeprüfung vor",
      subtitle:
        "Übe die häufigsten Mathematik-Aufgabentypen für die Zürcher Aufnahmeprüfung ins Langgymnasium und Kurzgymnasium. Lerne mit Schritt-für-Schritt-Erklärungen, Hinweisen und ähnlichen Beispielen.",
      primaryButton: "Mit Langgymnasium starten",
      secondaryButton: "Mit Kurzgymnasium starten",
      infoCard: [
        "Schriftliche Aufnahmeprüfung",
        "Deutsch + Mathematik",
        "Mathematik zählt 50% der Prüfungsnote"
      ]
    },
    benefits: [
      {
        title: "Typische Mathematik-Aufgaben trainieren",
        text: "Übe typische Aufgabentypen der Aufnahmeprüfung wie Terme vereinfachen, Gleichungen, Brüche, Wurzeln und Geometrie."
      },
      {
        title: "Aus Fehlern lernen",
        text: "Wenn deine Antwort falsch ist, erklärt die App die Lösung Schritt für Schritt und gibt dir ein ähnliches Beispiel."
      },
      {
        title: "Den richtigen Prüfungsweg wählen",
        text: "Wähle einen Aufgabenpfad für Langgymnasium oder Kurzgymnasium und übe auf dem passenden Niveau."
      }
    ],
    examCards: {
      lang: {
        title: "Langgymnasium",
        label: "Für Schülerinnen und Schüler der 6. Primarklasse",
        text: "Die Zürcher Aufnahmeprüfung ins Langgymnasium richtet sich an Schülerinnen und Schüler der 6. Primarklasse. Die schriftliche Prüfung umfasst Deutsch und Mathematik. Mathematik zählt zur Hälfte der Prüfungsnote.",
        button: "Mit Langgymnasium-Mathe starten"
      },
      kurz: {
        title: "Kurzgymnasium",
        label: "Für Schülerinnen und Schüler der 2. oder 3. Sekundarklasse",
        text: "Die Zürcher Aufnahmeprüfung ins Kurzgymnasium richtet sich an Schülerinnen und Schüler der 2. oder 3. Sekundarklasse. Die schriftliche Prüfung umfasst Deutsch und Mathematik. Mathematik zählt zur Hälfte der Prüfungsnote.",
        button: "Mit Kurzgymnasium-Mathe starten"
      }
    },
    admission: {
      eyebrow: "Aufnahme im Kanton Zürich",
      title: "So funktioniert die Aufnahme ans Gymnasium",
      text:
        "Wer im Kanton Zürich ein Gymnasium besuchen will, muss in der Regel die Zentrale Aufnahmeprüfung (ZAP, auch Gymiprüfung genannt) bestehen. Die Prüfung findet einmal pro Jahr Anfang März statt.",
      zapTitle: "Zentrale Aufnahmeprüfung (ZAP)",
      zapText:
        "In dieser App kannst du direkt zu den Prüfungswegen und zur Mathe-Vorbereitung für Langgymnasium und Kurzgymnasium wechseln.",
      zapLink: "Prüfungswege öffnen",
      brochureLink: "Themenüberblick öffnen",
      note:
        "Dieser Bereich auf der Startseite fasst den Zürcher Gymi-Weg kurz zusammen und verlinkt nur auf Seiten innerhalb dieser WebApp.",
      langTitle: "Langgymnasium",
      langText: "Das Langgymnasium schliesst an die 6. Klasse der Primarschule an und dauert 6 Jahre.",
      langLink: "Mehr zum Langgymnasium",
      kurzTitle: "Kurzgymnasium",
      kurzText:
        "Das Kurzgymnasium schliesst an die 2. oder 3. Klasse der Sekundarschule oder an die 2. Klasse des Langgymnasiums an und dauert 4 Jahre.",
      kurzLink: "Mehr zum Kurzgymnasium",
      unterTitle: "Untergymnasium",
      unterText:
        "Die ersten beiden Jahre des Langgymnasiums werden als Untergymnasium bezeichnet. In der Regel erfolgt danach der prüfungsfreie Übertritt in die Oberstufe.",
      unterLink: "Gymnasium-Überblick öffnen"
    },
    cta: {
      title: "Starte mit den Mathematikaufgaben, die wirklich wichtig sind",
      text: "Wähle deinen Prüfungsweg und beginne mit typischen Aufnahmeprüfungsaufgaben, geführten Lösungen und gezieltem Training.",
      langButton: "Langgymnasium wählen",
      kurzButton: "Kurzgymnasium wählen"
    },
    footer: {
      tagline: "Mathematiktraining zur Vorbereitung auf die Zürcher Gymi-Aufnahmeprüfung",
      officialInfo: "Offizielle Prüfungsinformationen",
      privacy: "Datenschutz",
      contact: "Kontakt"
    }
  }
} as const satisfies Record<Language, unknown>;

const translations: Record<Language, TranslationSet> = {
  en: {
    documentTitle: "MathGenius",
    navHome: "Home",
    navLearn: "Learn",
    navPlan: "My Plan",
    navGymi: "Exams",
    loginButton: "Log in",
    logoutButton: "Log out",
    avatarProfile: "User profile",
    avatarLogout: "Log out",
    homeTitle: "Choose the right Gymi exam and start without extra steps",
    homeText:
      "MathGenius is focused here on only two paths: Kurzgymi-Prufung and Langgymi-Prufung. Open the right exam preparation directly and work without distracting extra sections.",
    homeOpenTopics: "Open exams",
    homeCreateAccount: "Create account",
    statsTopics: "exams",
    statsTasks: "mock exams",
    statsSections: "exam paths",
    appIncludes: "Exam focus",
    appIncludesTitle: "Two clear exam areas instead of many scattered pages",
    appIncludesText: "Choose Kurzgymi-Prufung or Langgymi-Prufung and go straight into the matching preparation.",
    currentLearner: "Current learner",
    currentLearnerSignedOut: "Create an account or log in to save your personal progress.",
    currentLearnerSignedIn: "is signed in. Open one of the two exam areas whenever you want to continue.",
    mainSections: "Exam areas",
    openSectionTitle: "Choose your Gymi exam",
    openSectionText: "Only two sections remain. Pick the matching exam and start directly.",
    learnCardKicker: "Exam 1",
    learnCardTitle: "Kurzgymi-Prufung",
    learnCardText: "For later admission with a focus on speed, calculations, word problems, and entrance-style tasks.",
    learnCardButton: "Open Kurzgymi",
    planCardKicker: "Exam 2",
    planCardTitle: "Langgymi-Prufung",
    planCardText: "For early preparation with a focus on foundations, accuracy, and calm step-by-step solving.",
    planCardButton: "Open Langgymi",
    gymiCardKicker: "Exam Preparation",
    gymiCardTitle: "Exam area",
    gymiCardText: "Open the two focused Gymi exam tracks and their matching mock exams.",
    gymiCardButton: "Open exams",
    topicsEyebrow: "Learning library",
    topicsTitle: "Choose a topic and start learning",
    topicsText: "This page is only for exploring topics, reading theory, and practicing one idea at a time.",
    topicsViewerLabel: "Selected topic",
    topicsFinishButton: "I finished this topic",
    topicFeedback: "Pick a topic to see your next step.",
    topicFinishedAlready: "You already finished this",
    topicSavedPlan: "Your plan is saved.",
    topicCompletedMessage: "Great job! You finished this topic.",
    theoryTitle: "What to remember",
    practiceStart: "Start here",
    practiceMiddle: "Keep going",
    practiceHard: "Big challenge",
    planEyebrow: "Personal planning",
    planTitle: "Build and follow your own learning plan",
    planText: "This page is for selecting goals, choosing study rhythm, and checking saved progress.",
    goalLabel: "What do you want to get better at?",
    gradeLabel: "Which level fits you best?",
    intensityLabel: "How many short study times each week?",
    topicsLegend: "Choose topics for my plan",
    savePlanButton: "Save my plan",
    progressTitle: "My progress",
    progressDone: "done",
    progressMessageDefault: "Every small step counts.",
    topicsDone: "topics done",
    topicsPicked: "topics picked",
    studyRhythm: "study rhythm",
    savedPlan: "Saved plan",
    noPlanTopics: "No topics picked yet.",
    gymiEyebrow: "Gymi preparation",
    gymiTitle: "Choose between Kurzgymi-Prufung and Langgymi-Prufung",
    gymiText: "This page contains only the two Gymi exam sections and their matching mock exams.",
    useTrack: "Open this exam",
    mockExam: "Mock exam",
    nextMockExam: "Next mock exam",
    profileEyebrow: "User profile",
    profileTitle: "Manage your personal profile",
    profileText: "Edit your visible profile details here. This page keeps profile information in one clear place.",
    profileName: "Name",
    profileEmail: "Email",
    profilePhoto: "Photo URL",
    profileLevel: "Learning level",
    profileAbout: "About me",
    profileSave: "Save profile",
    profileRemove: "Remove account",
    profileEmptyEmail: "Sign in to see your email",
    profileEmptyAbout: "Add a short line about yourself or your learning goal.",
    profileMessageSignedOut: "Log in to edit your profile.",
    profileMessageSaved: "Your profile settings are saved on this device.",
    profileRemoveSuccess: "Your account and saved browser data were removed.",
    profileSecurityTitle: "Security settings",
    profileSecurityMessage: "Open a separate page to manage secure account changes.",
    openChangeEmail: "Change email",
    openChangePassword: "Update password",
    emailChangeTitle: "Change email",
    changeEmailEyebrow: "Email settings",
    changeEmailPageTitle: "Change email",
    changeEmailPageText: "Confirm the change using a code sent to your current email address.",
    changeEmailInfoTitle: "How it works",
    changeEmailStep1: "Enter your new email address",
    changeEmailStep2: "Get a code in your current mailbox",
    changeEmailStep3: "Enter the code to confirm the change",
    backToProfile: "Back to profile",
    emailChangeNewEmail: "New email",
    emailChangeCode: "Confirmation code from current email",
    emailChangeRequestButton: "Send confirmation code",
    emailChangeConfirmButton: "Confirm new email",
    emailChangeHint: "We will send a confirmation code to your current email address.",
    emailChangeSignedOut: "Log in to change your email.",
    emailChangeRequestSending: "Sending a confirmation code to your current email...",
    emailChangeRequestSuccess: "A confirmation code has been sent to your current email.",
    emailChangeConfirmSending: "Confirming your new email...",
    emailChangeConfirmSuccess: "Your email has been updated.",
    passwordCardTitle: "Update password",
    changePasswordEyebrow: "Password settings",
    changePasswordPageTitle: "Update password",
    changePasswordPageText: "Use your current password first, then choose a stronger new one.",
    changePasswordInfoTitle: "Before you update",
    changePasswordStep1: "Use at least 8 characters",
    changePasswordStep2: "Do not reuse an old password",
    changePasswordStep3: "Store it somewhere safe",
    passwordCurrent: "Current password",
    passwordNew: "New password",
    passwordUpdateButton: "Update password",
    passwordUpdateHint: "Use a strong password with at least 8 characters.",
    passwordUpdateSignedOut: "Log in to update your password.",
    passwordUpdateSuccess: "Your password was updated.",
    authEyebrow: "Account access",
    authTitle: "Create your account or log in",
    authText: "After a successful sign up or log in, this page closes and your avatar appears in the top-right corner.",
    authWhyTitle: "Why use an account?",
    authWhy1: "Keep your plan and progress",
    authWhy2: "Open your personal profile",
    authWhy3: "Come back to your work safely",
    authSignUp: "Sign up",
    authLogIn: "Log in",
    authName: "What should we call you?",
    authEmail: "Email",
    authPassword: "Password",
    authLevel: "Which level fits you best?",
    authNamePlaceholder: "Type your name",
    authPasswordPlaceholder: "At least 8 characters",
    authCreateAccount: "Create my account",
    authAlready: "I already have an account",
    authNeedNew: "I need a new account",
    authHelper: "Create your own account to save your plan and progress safely.",
    authSignedIn: "You are already signed in. Your avatar is in the top-right corner.",
    authCreating: "Creating your account...",
    authLoggingIn: "Logging you in...",
    authResetTitle: "Forgot password?",
    authResetRequestButton: "Send confirmation code",
    authResetConfirmButton: "Reset password",
    authResetCode: "Confirmation code",
    authResetHint: "Enter the code from your email and choose a new password.",
    authResetRequestSending: "Sending your confirmation code...",
    authResetRequestSuccess: "If an account exists for this email, a confirmation code has been sent.",
    authResetConfirmSending: "Updating your password...",
    authResetConfirmSuccess: "Your password has been updated. You can log in now.",
    accountSignedInTitle: "Your account is active.",
    selectAllGrades: "All grades",
    selectAllTypes: "All topic types",
    completedLabel: "Completed",
    grade34: "Grades 3-4",
    grade56: "Grades 5-6",
    grade78: "Grades 7-8",
    grade9Plus: "Grade 9 and above",
    goalSchool: "School math",
    goalConfidence: "Feeling more confident",
    goalGymi: "Gymi preparation",
    intensityLight: "2 sessions of 20 minutes",
    intensitySteady: "3 sessions of 30 minutes",
    intensityFocus: "4 sessions of 40 minutes",
    levelAll: "All levels",
    levelLabel: "Learning level",
    languageSwitcherLabel: "Language switcher"
  },
  de: {
    documentTitle: "MathGenius",
    navHome: "Start",
    navLearn: "Lernen",
    navPlan: "Mein Plan",
    navGymi: "Prufungen",
    loginButton: "Anmelden",
    logoutButton: "Abmelden",
    avatarProfile: "Benutzerprofil",
    avatarLogout: "Abmelden",
    homeTitle: "Wahle die passende Gymi-Prufung und starte ohne Umwege",
    homeText:
      "MathGenius konzentriert sich hier nur auf zwei Wege: Kurzgymi-Prufung und Langgymi-Prufung. Offne direkt die passende Prufungsvorbereitung und arbeite ohne ablenkende Zusatzbereiche.",
    homeOpenTopics: "Prufungen offnen",
    homeCreateAccount: "Konto erstellen",
    statsTopics: "Prufungen",
    statsTasks: "Mock Exams",
    statsSections: "Prufungswege",
    appIncludes: "Prufungsfokus",
    appIncludesTitle: "Zwei klare Bereiche statt vieler verstreuter Seiten",
    appIncludesText: "Wahle Kurzgymi-Prufung oder Langgymi-Prufung und gehe direkt in die passende Vorbereitung.",
    currentLearner: "Aktuelle lernende Person",
    currentLearnerSignedOut: "Erstelle ein Konto oder melde dich an, um deinen persönlichen Fortschritt zu speichern.",
    currentLearnerSignedIn: "ist angemeldet. Offne einen der zwei Prufungsbereiche, wenn du weitermachen mochtest.",
    mainSections: "Prufungsbereiche",
    openSectionTitle: "Wahle deine Gymi-Prufung",
    openSectionText: "Es bleiben nur zwei Bereiche. Wahle direkt die passende Prufung und starte ohne zusatzliche Navigation.",
    learnCardKicker: "Prufung 1",
    learnCardTitle: "Kurzgymi-Prufung",
    learnCardText: "Fur den spateren Eintritt mit Fokus auf Tempo, Rechnen, Sachaufgaben und prufungsnahe Aufgaben.",
    learnCardButton: "Kurzgymi offnen",
    planCardKicker: "Prufung 2",
    planCardTitle: "Langgymi-Prufung",
    planCardText: "Fur fruhe Vorbereitung mit Fokus auf Grundlagen, Genauigkeit und ruhige, klare Losungswege.",
    planCardButton: "Langgymi offnen",
    gymiCardKicker: "Prufungsvorbereitung",
    gymiCardTitle: "Prufungsbereich",
    gymiCardText: "Offne die zwei fokussierten Gymi-Prufungen und ihre passenden Mock Exams.",
    gymiCardButton: "Prufungen offnen",
    topicsEyebrow: "Lernbibliothek",
    topicsTitle: "Wähle ein Thema und starte direkt",
    topicsText: "Diese Seite ist nur für Themen, Theorie und Übungen zu einer Idee nach der anderen.",
    topicsViewerLabel: "Gewähltes Thema",
    topicsFinishButton: "Ich habe dieses Thema geschafft",
    topicFeedback: "Wähle ein Thema, um deinen nächsten Schritt zu sehen.",
    topicFinishedAlready: "Du hast das schon geschafft",
    topicSavedPlan: "Dein Plan wurde gespeichert.",
    topicCompletedMessage: "Toll gemacht! Du hast dieses Thema geschafft.",
    theoryTitle: "Wichtig zu merken",
    practiceStart: "Hier starten",
    practiceMiddle: "Weiter so",
    practiceHard: "Große Herausforderung",
    planEyebrow: "Persönliche Planung",
    planTitle: "Baue deinen eigenen Lernplan auf und folge ihm",
    planText: "Diese Seite ist für Ziele, Lernrhythmus und deinen gespeicherten Fortschritt.",
    goalLabel: "Worin möchtest du besser werden?",
    gradeLabel: "Welches Niveau passt am besten zu dir?",
    intensityLabel: "Wie viele kurze Lernzeiten pro Woche?",
    topicsLegend: "Themen für meinen Plan auswählen",
    savePlanButton: "Meinen Plan speichern",
    progressTitle: "Mein Fortschritt",
    progressDone: "fertig",
    progressMessageDefault: "Jeder kleine Schritt zählt.",
    topicsDone: "Themen geschafft",
    topicsPicked: "Themen ausgewählt",
    studyRhythm: "Lernrhythmus",
    savedPlan: "Gespeicherter Plan",
    noPlanTopics: "Noch keine Themen ausgewählt.",
    gymiEyebrow: "Gymi-Vorbereitung",
    gymiTitle: "Wahle zwischen Kurzgymi-Prufung und Langgymi-Prufung",
    gymiText: "Diese Seite enthalt nur die zwei Gymi-Prufungsbereiche und ihre passenden Mock Exams.",
    useTrack: "Diese Prufung offnen",
    mockExam: "Mock Exam",
    nextMockExam: "Nächstes Mock Exam",
    profileEyebrow: "Benutzerprofil",
    profileTitle: "Verwalte dein persönliches Profil",
    profileText: "Bearbeite hier deine sichtbaren Profildaten. Diese Seite sammelt Profildaten an einem klaren Ort.",
    profileName: "Name",
    profileEmail: "E-Mail",
    profilePhoto: "Foto-URL",
    profileLevel: "Lernniveau",
    profileAbout: "Über mich",
    profileSave: "Profil speichern",
    profileRemove: "Konto entfernen",
    profileEmptyEmail: "Melde dich an, um deine E-Mail zu sehen",
    profileEmptyAbout: "Füge einen kurzen Satz über dich oder dein Lernziel hinzu.",
    profileMessageSignedOut: "Melde dich an, um dein Profil zu bearbeiten.",
    profileMessageSaved: "Deine Profileinstellungen sind auf diesem Gerät gespeichert.",
    profileRemoveSuccess: "Dein Konto und die gespeicherten Browserdaten wurden entfernt.",
    profileSecurityTitle: "Sicherheitseinstellungen",
    profileSecurityMessage: "Öffne eine eigene Seite für sichere Kontoänderungen.",
    openChangeEmail: "E-Mail ändern",
    openChangePassword: "Passwort aktualisieren",
    emailChangeTitle: "E-Mail ändern",
    changeEmailEyebrow: "E-Mail-Einstellungen",
    changeEmailPageTitle: "E-Mail ändern",
    changeEmailPageText: "Bestätige die Änderung mit einem Code, der an deine aktuelle E-Mail gesendet wird.",
    changeEmailInfoTitle: "So funktioniert es",
    changeEmailStep1: "Gib deine neue E-Mail-Adresse ein",
    changeEmailStep2: "Erhalte einen Code in deinem aktuellen Postfach",
    changeEmailStep3: "Gib den Code ein, um die Änderung zu bestätigen",
    backToProfile: "Zurück zum Profil",
    emailChangeNewEmail: "Neue E-Mail",
    emailChangeCode: "Bestätigungscode von der aktuellen E-Mail",
    emailChangeRequestButton: "Bestätigungscode senden",
    emailChangeConfirmButton: "Neue E-Mail bestätigen",
    emailChangeHint: "Wir senden einen Bestätigungscode an deine aktuelle E-Mail-Adresse.",
    emailChangeSignedOut: "Melde dich an, um deine E-Mail zu ändern.",
    emailChangeRequestSending: "Bestätigungscode wird an deine aktuelle E-Mail gesendet...",
    emailChangeRequestSuccess: "Ein Bestätigungscode wurde an deine aktuelle E-Mail gesendet.",
    emailChangeConfirmSending: "Neue E-Mail wird bestätigt...",
    emailChangeConfirmSuccess: "Deine E-Mail wurde aktualisiert.",
    passwordCardTitle: "Passwort aktualisieren",
    changePasswordEyebrow: "Passwort-Einstellungen",
    changePasswordPageTitle: "Passwort aktualisieren",
    changePasswordPageText: "Nutze zuerst dein aktuelles Passwort und wähle dann ein stärkeres neues.",
    changePasswordInfoTitle: "Vor dem Aktualisieren",
    changePasswordStep1: "Nutze mindestens 8 Zeichen",
    changePasswordStep2: "Verwende kein altes Passwort erneut",
    changePasswordStep3: "Bewahre es sicher auf",
    passwordCurrent: "Aktuelles Passwort",
    passwordNew: "Neues Passwort",
    passwordUpdateButton: "Passwort aktualisieren",
    passwordUpdateHint: "Nutze ein sicheres Passwort mit mindestens 8 Zeichen.",
    passwordUpdateSignedOut: "Melde dich an, um dein Passwort zu aktualisieren.",
    passwordUpdateSuccess: "Dein Passwort wurde aktualisiert.",
    authEyebrow: "Kontozugang",
    authTitle: "Erstelle dein Konto oder melde dich an",
    authText: "Nach einer erfolgreichen Registrierung oder Anmeldung schließt sich diese Seite und dein Avatar erscheint oben rechts.",
    authWhyTitle: "Warum ein Konto nutzen?",
    authWhy1: "Speichere deinen Plan und Fortschritt",
    authWhy2: "Öffne dein persönliches Profil",
    authWhy3: "Kehre sicher zu deiner Arbeit zurück",
    authSignUp: "Registrieren",
    authLogIn: "Anmelden",
    authName: "Wie sollen wir dich nennen?",
    authEmail: "E-Mail",
    authPassword: "Passwort",
    authLevel: "Welches Niveau passt am besten zu dir?",
    authNamePlaceholder: "Gib deinen Namen ein",
    authPasswordPlaceholder: "Mindestens 8 Zeichen",
    authCreateAccount: "Mein Konto erstellen",
    authAlready: "Ich habe schon ein Konto",
    authNeedNew: "Ich brauche ein neues Konto",
    authHelper: "Erstelle dein eigenes Konto, um deinen Plan und Fortschritt sicher zu speichern.",
    authSignedIn: "Du bist bereits angemeldet. Dein Avatar ist oben rechts sichtbar.",
    authCreating: "Konto wird erstellt...",
    authLoggingIn: "Du wirst angemeldet...",
    authResetTitle: "Passwort vergessen?",
    authResetRequestButton: "Bestätigungscode senden",
    authResetConfirmButton: "Passwort zurücksetzen",
    authResetCode: "Bestätigungscode",
    authResetHint: "Gib den Code aus deiner E-Mail ein und wähle ein neues Passwort.",
    authResetRequestSending: "Bestätigungscode wird gesendet...",
    authResetRequestSuccess: "Falls ein Konto zu dieser E-Mail existiert, wurde ein Bestätigungscode gesendet.",
    authResetConfirmSending: "Passwort wird aktualisiert...",
    authResetConfirmSuccess: "Dein Passwort wurde aktualisiert. Du kannst dich jetzt anmelden.",
    accountSignedInTitle: "Dein Konto ist aktiv.",
    selectAllGrades: "Alle Niveaus",
    selectAllTypes: "Alle Thementypen",
    completedLabel: "Fertig",
    grade34: "Klassen 3-4",
    grade56: "Klassen 5-6",
    grade78: "Klassen 7-8",
    grade9Plus: "Klasse 9 und höher",
    goalSchool: "Schulmathe",
    goalConfidence: "Mehr Sicherheit",
    goalGymi: "Gymi-Vorbereitung",
    intensityLight: "2 Einheiten à 20 Minuten",
    intensitySteady: "3 Einheiten à 30 Minuten",
    intensityFocus: "4 Einheiten à 40 Minuten",
    levelAll: "Alle Niveaus",
    levelLabel: "Lernniveau",
    languageSwitcherLabel: "Sprachauswahl"
  }
};

const germanTopicContent: Record<string, LocalizedTopicOverride> = {
  "simplify-terms": {
    title: "Vereinfache die Terme so weit wie möglich",
    category: "Algebra",
    summary: "Ein fokussierter Kurzgymi-Canvas mit vier Aufgaben, Antwortprüfung, Hinweisen und ausgearbeiteten Lösungen.",
    formula: "Klammern öffnen -> gleichartige Terme zusammenfassen -> Faktoren kürzen -> erst dann vollständig vereinfachen",
    theory: [
      "Öffne Klammern sorgfältig und beachte jedes Vorzeichen, bevor du gleichartige Terme zusammenfasst.",
      "Bei Produkten multiplizierst du zuerst die Zahlen und fasst gleiche Variablen zu Potenzen zusammen.",
      "Bei Brüchen und Wurzeln vereinfachst du zuerst die Struktur und kürzt nur echte gemeinsame Faktoren."
    ],
    practiceEasy: [
      "Multipliziere Klammern aus und fasse gleichartige Terme zusammen.",
      "Multipliziere Faktoren und schreibe wiederholte Variablen als Potenzen."
    ],
    practiceMedium: [
      "Vereinfache Bruchterme zuerst vor dem Ausmultiplizieren.",
      "Prüfe, ob dein Term wirklich vollständig reduziert ist."
    ],
    practiceHard: [
      "Fasse Wurzeln erst nach dem Vereinfachen des Ausdrucks unter der Wurzel zusammen.",
      "Nutze den Canvas und arbeite alle vier Aufgaben von einfach bis schwer durch."
    ]
  },
  fractions: {
    title: "Brüche und Prozente",
    category: "Zahlen",
    summary: "Brüche, Prozente und ihren Zusammenhang durch Bilder, Vergleiche und alltagsnahe Aufgaben verstehen.",
    formula: "Prozent = Bruch x 100; Teil = Prozent x Ganzes",
    theory: [
      "Ein Bruch zeigt, in wie viele gleiche Teile ein Ganzes geteilt wird und wie viele Teile gemeint sind.",
      "Um einen Bruch in Prozent umzuwandeln, wandle ihn zuerst in eine Dezimalzahl um und multipliziere dann mit 100.",
      "Prozente sind nützlich bei Rabatten, Leistungen, Statistiken und beim Vergleichen von Mengen."
    ],
    practiceEasy: [
      "Schreibe 1/2, 1/4 und 3/4 als Prozente.",
      "Vergleiche die Brüche 2/5 und 1/2.",
      "Berechne 25% von 80."
    ],
    practiceMedium: [
      "In einer Schachtel sind 24 Bleistifte. 3/8 davon sind grün. Wie viele grüne Bleistifte gibt es?",
      "Ein Buch kostete 40 Franken und wurde dann um 15% günstiger. Wie hoch ist der neue Preis?"
    ],
    practiceHard: [
      "Ein Preis steigt um 20% und sinkt danach um 20%. Ist er wieder beim Anfangswert?",
      "Es gibt 48 Schülerinnen und Schüler in zwei Klassen. Die erste Klasse hat 5/8 aller Kinder. Wie viele sind in der zweiten Klasse?"
    ]
  },
  equations: {
    title: "Gleichungen und Unbekannte",
    category: "Algebra",
    summary: "Erste lineare Gleichungen, die Bedeutung einer Unbekannten und das Prüfen durch Einsetzen.",
    formula: "x + a = b -> x = b - a",
    theory: [
      "Eine Gleichung ist eine Gleichheit mit einer unbekannten Zahl, die gefunden werden muss.",
      "Du darfst auf beiden Seiten dieselben Rechenschritte ausführen, ohne die Gleichheit zu verändern.",
      "Durch Einsetzen kannst du prüfen, ob deine Lösung wirklich stimmt."
    ],
    practiceEasy: ["Löse: x + 7 = 15.", "Löse: 18 - y = 5."],
    practiceMedium: [
      "Löse: 3x + 5 = 23.",
      "Schreibe eine Gleichung zu diesem Satz: Die Summe aus einer Zahl und 12 ist 37."
    ],
    practiceHard: [
      "Löse: 5(2x - 1) = 3x + 19.",
      "Finde die Zahl, wenn sie nach einer Erhöhung um 30% den Wert 91 ergibt."
    ]
  },
  geometry: {
    title: "Umfang, Fläche und Formen",
    category: "Geometrie",
    summary: "Formen messen, mit Längen- und Flächeneinheiten arbeiten und von Zeichnungen zu Formeln kommen.",
    formula: "Umfang = Summe aller Seiten; Fläche Rechteck = Länge x Breite",
    theory: [
      "Der Umfang ist die Summe aller Seitenlängen einer Form.",
      "Die Fläche zeigt, wie viel Platz eine Form auf einer ebenen Fläche bedeckt.",
      "Beim Rechteck gilt: Fläche = Länge mal Breite."
    ],
    practiceEasy: [
      "Berechne den Umfang eines Rechtecks mit Seiten 6 cm und 4 cm.",
      "Berechne die Fläche eines Quadrats mit Seitenlänge 5 cm."
    ],
    practiceMedium: [
      "Ein Rechteck ist 12 cm lang und drei Mal so breit wie klein. Berechne seine Fläche.",
      "Vergleiche die Flächen der Rechtecke 8x4 und 6x5."
    ],
    practiceHard: [
      "Teile eine zusammengesetzte Form in zwei Rechtecke und berechne die Fläche.",
      "Erkläre, warum sich die Fläche vervierfacht, wenn alle Seiten verdoppelt werden."
    ]
  }
};

const germanTrackContent: Record<string, LocalizedTrackOverride> = {
  kurz: {
    title: "Kurzgymi-Prufung",
    audience: "Für Lernende aus der Sekundarstufe mit Fokus auf Algebra, Tempo und mehrschrittige Sachaufgaben.",
    description:
      "Schnellere aufnahmeähnliche Vorbereitung mit Termen, Verhältnissen, Prozenten und klarem Prüfungsrhythmus.",
    pillars: ["Algebra", "Tempo", "Prüfungsstrategie"],
    diagnostics: "Nutze diesen Track, wenn du gezielt fürs Kurzgymi mit anspruchsvolleren Rechenwegen üben willst."
  },
  lang: {
    title: "Langgymi-Prufung",
    audience: "Für die frühe Vorbereitung mit Fokus auf Zahlverständnis, Geometrie und ruhige, genaue Lösungen.",
    description:
      "Schrittweise Vorbereitung in Arithmetik, Brüchen und Geometrie mit gut lesbaren, sauberen Lösungswegen.",
    pillars: ["Grundlagen", "Geometrie", "Genauigkeit"],
    diagnostics: "Nutze diesen Track, wenn du fürs Langgymi erst starke Grundlagen und Sicherheit aufbauen möchtest."
  }
};

const germanExamContent: Record<string, LocalizedExamOverride> = {
  "kurz-diagnostic": {
    title: "Mock Exam: Kurzgymi-Prufung",
    description: "Ein kompaktes Kurzgymi-Set mit Algebra, Verhältnissen und Prozentaufgaben unter leichtem Zeitdruck.",
    tasks: [
      "Vereinfache den Term: 3(2x - 5) - 2(x + 4).",
      "Eine Karte hat den Maßstab 1:25 000. Welche echte Strecke entsprechen 8 cm?",
      "Eine Jacke kostet 180 CHF. Sie wird um 15% reduziert und danach kommt eine Liefergebühr von 7.70 CHF dazu. Wie hoch ist der Endpreis?"
    ]
  },
  "lang-foundation": {
    title: "Mock Exam: Langgymi-Prufung",
    description: "Ein ruhigeres Langgymi-Set mit Brüchen, Geometrie und sauberem Schritt-für-Schritt-Rechnen.",
    tasks: [
      "Vergleiche die Brüche 3/4 und 5/8, ohne sie in Dezimalzahlen umzuwandeln.",
      "Ein Rechteck ist 12 cm lang und 7 cm breit. Berechne Umfang und Fläche.",
      "Schreibe den Term und berechne: Nimm ein Drittel von 24, addiere 18 und ziehe dann 5 ab."
    ]
  }
};

const trackFallbackDetails: Record<
  string,
  {
    pillars: string[];
    diagnostics: string;
  }
> = {
  kurz: {
    pillars: ["Algebra", "Word problems", "Exam strategy"],
    diagnostics: "Use this track for tougher Kurzgymi-style tasks with more algebra, ratios, and timed decisions."
  },
  lang: {
    pillars: ["Foundations", "Geometry", "Accuracy"],
    diagnostics: "Use this track for Langgymi-style basics, calmer pacing, and careful written solutions."
  }
};

const storageKeys = {
  completed: "mathginius-completed-topics",
  plan: "mathginius-study-plan",
  authToken: "mathginius-auth-token",
  account: "mathginius-account",
  language: "mathginius-language-v2"
} as const;

const initialAuthToken = loadAuthToken();
const initialAccount = loadAccount();

function query<T extends Element>(selector: string): T {
  const node = document.querySelector(selector);
  if (!(node instanceof Element)) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node as T;
}

function queryOptional<T extends Element>(selector: string): T | null {
  const node = document.querySelector(selector);
  return node instanceof Element ? (node as T) : null;
}

function queryAll<T extends Element>(selector: string): T[] {
  return Array.from(document.querySelectorAll(selector)) as T[];
}

const dom = {
  html: document.documentElement,
  navHome: queryOptional<HTMLButtonElement>('[data-view-target="home"]'),
  navTopics: queryOptional<HTMLButtonElement>('[data-view-target="topics"]'),
  navPlan: queryOptional<HTMLButtonElement>('[data-view-target="plan"]'),
  navGymi: queryOptional<HTMLButtonElement>('[data-view-target="gymi"]'),
  navKurzButton: query<HTMLButtonElement>("#nav-kurz-button"),
  navLangButton: query<HTMLButtonElement>("#nav-lang-button"),
  navLinks: queryAll<HTMLButtonElement>(".nav-link"),
  quickNavLinks: queryAll<HTMLAnchorElement>(".content-nav-link"),
  views: queryAll<HTMLElement>("[data-view]"),
  homeButton: query<HTMLButtonElement>("#home-button"),
  openAuthButton: query<HTMLButtonElement>("#open-auth-button"),
  languageToggleButton: query<HTMLButtonElement>("#language-toggle-button"),
  languageCurrentLabel: query<HTMLElement>("#language-current-label"),
  languageFlag: queryOptional<HTMLElement>("#csd-flag-container"),
  languageOptionEnglish: query<HTMLButtonElement>("#language-option-en"),
  languageOptionGerman: query<HTMLButtonElement>("#language-option-de"),
  languageMenu: query<HTMLElement>("#language-menu"),
  languageSwitcher: query<HTMLElement>("#language-switcher"),
  avatarShell: query<HTMLElement>("#avatar-shell"),
  avatarButton: query<HTMLButtonElement>("#avatar-button"),
  avatarMenu: query<HTMLElement>("#avatar-menu"),
  avatarImage: query<HTMLImageElement>("#avatar-image"),
  avatarInitials: query<HTMLElement>("#avatar-initials"),
  avatarName: query<HTMLElement>("#avatar-name"),
  openProfileButton: query<HTMLButtonElement>("#open-profile-button"),
  avatarLogoutButton: query<HTMLButtonElement>("#avatar-logout-button"),
  openKurzTrackButton: query<HTMLButtonElement>("#open-kurz-track-button"),
  openLangTrackButton: query<HTMLButtonElement>("#open-lang-track-button"),
  admissionZapLink: query<HTMLButtonElement>("#admission-zap-link"),
  admissionBrochureLink: query<HTMLButtonElement>("#admission-brochure-link"),
  admissionLangLink: query<HTMLButtonElement>("#admission-lang-link"),
  admissionKurzLink: query<HTMLButtonElement>("#admission-kurz-link"),
  admissionUnterLink: query<HTMLButtonElement>("#admission-unter-link"),
  gradeFilters: query<HTMLElement>("#grade-filters"),
  categoryFilters: query<HTMLElement>("#category-filters"),
  topicList: query<HTMLElement>("#topic-list"),
  selectedTopicTitle: query<HTMLElement>("#selected-topic-title"),
  selectedTopicMeta: query<HTMLElement>("#selected-topic-meta"),
  selectedTopicSummary: query<HTMLElement>("#selected-topic-summary"),
  topicFormula: query<HTMLElement>("#topic-formula"),
  topicFeedback: query<HTMLElement>("#topic-feedback"),
  selectedTopicTheory: query<HTMLElement>("#selected-topic-theory"),
  practiceEasy: query<HTMLElement>("#practice-easy"),
  practiceMedium: query<HTMLElement>("#practice-medium"),
  practiceHard: query<HTMLElement>("#practice-hard"),
  topicCanvas: query<HTMLElement>("#topic-canvas"),
  markCompleteButton: query<HTMLButtonElement>("#mark-complete-button"),
  planTopicOptions: query<HTMLElement>("#plan-topic-options"),
  studyPlanForm: query<HTMLFormElement>("#study-plan-form"),
  goalSelect: query<HTMLSelectElement>("#goal-select"),
  gradeSelect: query<HTMLSelectElement>("#grade-select"),
  intensitySelect: query<HTMLSelectElement>("#intensity-select"),
  completionRate: query<HTMLElement>("#completion-rate"),
  progressMessage: query<HTMLElement>("#progress-message"),
  completedTopicsCount: query<HTMLElement>("#completed-topics-count"),
  plannedTopicsCount: query<HTMLElement>("#planned-topics-count"),
  weeklyPlanLabel: query<HTMLElement>("#weekly-plan-label"),
  savedPlanSummary: query<HTMLElement>("#saved-plan-summary"),
  savedPlanTopics: query<HTMLElement>("#saved-plan-topics"),
  progressRing: query<HTMLElement>(".progress-ring"),
  gymiTrackGrid: query<HTMLElement>("#gymi-track-grid"),
  gymiTopicCards: query<HTMLElement>("#gymi-topic-cards"),
  mockExamTitle: query<HTMLElement>("#mock-exam-title"),
  mockExamDescription: query<HTMLElement>("#mock-exam-description"),
  mockExamTasks: query<HTMLElement>("#mock-exam-tasks"),
  switchExamButton: query<HTMLButtonElement>("#switch-exam-button"),
  langTopicPageRoot: query<HTMLElement>("#lang-topic-page-root"),
  signUpTab: query<HTMLButtonElement>("#sign-up-tab-page"),
  logInTab: query<HTMLButtonElement>("#log-in-tab-page"),
  authForm: query<HTMLFormElement>("#auth-form-page"),
  authDisplayNameField: query<HTMLElement>("#auth-display-name-field-page"),
  authDisplayNameLabel: query<HTMLElement>("#auth-display-name-field-page label"),
  authDisplayNameInput: query<HTMLInputElement>("#auth-display-name-input-page"),
  authEmailLabel: query<HTMLElement>('label[for="auth-email-input-page"]'),
  authEmailInput: query<HTMLInputElement>("#auth-email-input-page"),
  authPasswordLabel: query<HTMLElement>('label[for="auth-password-input-page"]'),
  authPasswordInput: query<HTMLInputElement>("#auth-password-input-page"),
  authGradeField: query<HTMLElement>("#auth-grade-field-page"),
  authGradeLabel: query<HTMLElement>("#auth-grade-field-page label"),
  authGradeSelect: query<HTMLSelectElement>("#auth-grade-select-page"),
  authSubmitButton: query<HTMLButtonElement>("#auth-submit-button-page"),
  authSwitchButton: query<HTMLButtonElement>("#auth-switch-button-page"),
  authMessage: query<HTMLElement>("#auth-message-page"),
  profileForm: query<HTMLFormElement>("#profile-form"),
  profileNameLabel: query<HTMLElement>("#profile-name-label"),
  profileNameInput: query<HTMLInputElement>("#profile-name-input"),
  profileEmailLabel: query<HTMLElement>("#profile-email-label"),
  profileEmailInput: query<HTMLInputElement>("#profile-email-input"),
  profilePhotoLabel: query<HTMLElement>("#profile-photo-label"),
  profilePhotoInput: query<HTMLInputElement>("#profile-photo-input"),
  profileGradeLabel: query<HTMLElement>("#profile-grade-label"),
  profileGradeInput: query<HTMLSelectElement>("#profile-grade-input"),
  profileAboutLabel: query<HTMLElement>("#profile-about-label"),
  profileAboutInput: query<HTMLTextAreaElement>("#profile-about-input"),
  profileResetButton: query<HTMLButtonElement>("#profile-reset-button"),
  profileSaveButton: query<HTMLButtonElement>("#profile-save-button"),
  profileMessage: query<HTMLElement>("#profile-message"),
  profileSecurityTitle: query<HTMLElement>("#profile-security-title"),
  profileSecurityMessage: query<HTMLElement>("#profile-security-message"),
  openChangeEmailButton: query<HTMLButtonElement>("#open-change-email-button"),
  openChangePasswordButton: query<HTMLButtonElement>("#open-change-password-button"),
  changeEmailEyebrow: query<HTMLElement>("#change-email-eyebrow"),
  changeEmailPageTitle: query<HTMLElement>("#change-email-page-title"),
  changeEmailPageText: query<HTMLElement>("#change-email-page-text"),
  changeEmailInfoTitle: query<HTMLElement>("#change-email-info-title"),
  changeEmailStep1: query<HTMLElement>("#change-email-step-1"),
  changeEmailStep2: query<HTMLElement>("#change-email-step-2"),
  changeEmailStep3: query<HTMLElement>("#change-email-step-3"),
  backFromChangeEmailButton: query<HTMLButtonElement>("#back-from-change-email-button"),
  emailChangeTitle: query<HTMLElement>("#email-change-title"),
  emailChangeRequestForm: query<HTMLFormElement>("#email-change-request-form"),
  emailChangeNewEmailLabel: query<HTMLElement>('label[for="email-change-new-email-input"]'),
  emailChangeNewEmailInput: query<HTMLInputElement>("#email-change-new-email-input"),
  emailChangeRequestButton: query<HTMLButtonElement>("#email-change-request-button"),
  emailChangeConfirmForm: query<HTMLFormElement>("#email-change-confirm-form"),
  emailChangeCodeLabel: query<HTMLElement>('label[for="email-change-code-input"]'),
  emailChangeCodeInput: query<HTMLInputElement>("#email-change-code-input"),
  emailChangeConfirmButton: query<HTMLButtonElement>("#email-change-confirm-button"),
  emailChangeMessage: query<HTMLElement>("#email-change-message"),
  changePasswordEyebrow: query<HTMLElement>("#change-password-eyebrow"),
  changePasswordPageTitle: query<HTMLElement>("#change-password-page-title"),
  changePasswordPageText: query<HTMLElement>("#change-password-page-text"),
  changePasswordInfoTitle: query<HTMLElement>("#change-password-info-title"),
  changePasswordStep1: query<HTMLElement>("#change-password-step-1"),
  changePasswordStep2: query<HTMLElement>("#change-password-step-2"),
  changePasswordStep3: query<HTMLElement>("#change-password-step-3"),
  backFromChangePasswordButton: query<HTMLButtonElement>("#back-from-change-password-button"),
  passwordCardTitle: query<HTMLElement>("#password-card-title"),
  passwordUpdateForm: query<HTMLFormElement>("#password-update-form"),
  passwordCurrentLabel: query<HTMLElement>('label[for="current-password-input"]'),
  passwordCurrentInput: query<HTMLInputElement>("#current-password-input"),
  passwordNewLabel: query<HTMLElement>('label[for="new-password-input"]'),
  passwordNewInput: query<HTMLInputElement>("#new-password-input"),
  passwordUpdateButton: query<HTMLButtonElement>("#password-update-button"),
  passwordUpdateMessage: query<HTMLElement>("#password-update-message"),
  profileAvatarImage: query<HTMLImageElement>("#profile-avatar-image"),
  profileAvatarInitials: query<HTMLElement>("#profile-avatar-initials"),
  profileNamePreview: query<HTMLElement>("#profile-name-preview"),
  profileEmailPreview: query<HTMLElement>("#profile-email-preview"),
  profileAboutPreview: query<HTMLElement>("#profile-about-preview"),
  passwordResetTitle: query<HTMLElement>("#password-reset-title"),
  passwordResetRequestForm: query<HTMLFormElement>("#password-reset-request-form"),
  passwordResetEmailLabel: query<HTMLElement>('label[for="password-reset-email-input"]'),
  passwordResetEmailInput: query<HTMLInputElement>("#password-reset-email-input"),
  passwordResetRequestButton: query<HTMLButtonElement>("#password-reset-request-button"),
  passwordResetConfirmForm: query<HTMLFormElement>("#password-reset-confirm-form"),
  passwordResetCodeLabel: query<HTMLElement>('label[for="password-reset-code-input"]'),
  passwordResetCodeInput: query<HTMLInputElement>("#password-reset-code-input"),
  passwordResetNewPasswordLabel: query<HTMLElement>('label[for="password-reset-new-password-input"]'),
  passwordResetNewPasswordInput: query<HTMLInputElement>("#password-reset-new-password-input"),
  passwordResetConfirmButton: query<HTMLButtonElement>("#password-reset-confirm-button"),
  passwordResetMessage: query<HTMLElement>("#password-reset-message"),
  goalLabelText: query<HTMLElement>("#goal-label-text"),
  gradeLabelText: query<HTMLElement>("#grade-label-text"),
  intensityLabelText: query<HTMLElement>("#intensity-label-text"),
  topicsLegendText: query<HTMLElement>("#topics-legend-text")
};

const state: {
  currentView: ViewName;
  authMode: AuthMode;
  avatarMenuOpen: boolean;
  language: Language;
  selectedTopicId: string;
  gradeFilter: string;
  categoryFilter: string;
  mockExamIndex: number;
  completedTopicIds: string[];
  studyPlan: StudyPlanState;
  authToken: string;
  account: AccountState | null;
  profile: ProfileState;
  activeTrackId: string;
} = {
  currentView: "home",
  authMode: "sign-up",
  avatarMenuOpen: false,
  language: loadLanguage(),
  selectedTopicId: seedTopics[0]?.slug ?? "",
  gradeFilter: "all",
  categoryFilter: "all",
  mockExamIndex: 0,
  completedTopicIds: loadCompletedTopics(initialAccount?.id),
  studyPlan: loadStudyPlan(initialAccount?.id),
  authToken: initialAuthToken,
  account: initialAccount,
  profile: createEmptyProfile(),
  activeTrackId: "lang"
};

let topicRecords: ApiTopic[] = seedTopics.slice();
let gymiTrackRecords: ApiGymiTrack[] = seedGymiTracks.slice();
let mockExamRecords: ApiMockExam[] = seedMockExams.slice();
const simplifyTermsCanvas = new SimplifyTermsCanvas(dom.topicCanvas);
const langGymiTopicPage = new LangGymiTopicPage(dom.langTopicPageRoot, () => {
  openExamTrack("lang");
  renderGymiArea();
});

initialize().catch((error: unknown) => {
  console.error(error);
});

async function initialize(): Promise<void> {
  bindEvents();
  await hydrateContentFromApi();
  await hydrateAccountFromApi();
  await hydrateLearnerDataFromApi();
  loadProfileForCurrentAccount();
  renderAll();
}

function bindEvents(): void {
  dom.navLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const viewName = button.dataset.viewTarget;
      navigateTo(isViewName(viewName) ? viewName : "home");
    });
  });

  dom.homeButton.addEventListener("click", () => navigateTo("home"));
  dom.openAuthButton.addEventListener("click", () => {
    if (state.account && state.authToken) {
      logOut();
      return;
    }
    navigateTo("auth");
  });
  dom.languageToggleButton.addEventListener("click", () => {
    const isOpen = !dom.languageMenu.hidden;
    dom.languageMenu.hidden = isOpen;
    dom.languageToggleButton.setAttribute("aria-expanded", String(!isOpen));
  });
  dom.languageOptionEnglish.addEventListener("click", () => {
    setLanguage("en");
    dom.languageMenu.hidden = true;
    dom.languageToggleButton.setAttribute("aria-expanded", "false");
  });
  dom.languageOptionGerman.addEventListener("click", () => {
    setLanguage("de");
    dom.languageMenu.hidden = true;
    dom.languageToggleButton.setAttribute("aria-expanded", "false");
  });
  dom.avatarButton.addEventListener("click", toggleAvatarMenu);
  dom.openProfileButton.addEventListener("click", () => {
    closeAvatarMenu();
    navigateTo("profile");
  });
  dom.avatarLogoutButton.addEventListener("click", () => {
    closeAvatarMenu();
    logOut();
  });
  dom.navKurzButton.addEventListener("click", () => openExamTrack("kurz"));
  dom.navLangButton.addEventListener("click", () => openExamTrack("lang"));
  dom.openKurzTrackButton.addEventListener("click", () => openExamTrack("kurz"));
  dom.openLangTrackButton.addEventListener("click", () => openExamTrack("lang"));
  queryAll<HTMLButtonElement>("[data-home-path]").forEach((button) => {
    button.addEventListener("click", () => {
      const path = button.dataset.homePath;
      if (path === "lang") {
        openExamTrack("lang");
      } else if (path === "kurz") {
        openExamTrack("kurz");
      }
    });
  });
  dom.admissionZapLink.addEventListener("click", () => navigateTo("gymi"));
  dom.admissionBrochureLink.addEventListener("click", () => navigateTo("topics"));
  dom.admissionLangLink.addEventListener("click", () => openExamTrack("lang"));
  dom.admissionKurzLink.addEventListener("click", () => openExamTrack("kurz"));
  dom.admissionUnterLink.addEventListener("click", () => navigateTo("topics"));
  dom.quickNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.dataset.quickNav;
      if (target === "algebra") {
        state.categoryFilter = "Algebra";
        state.selectedTopicId = "simplify-terms";
      } else if (target === "geometry") {
        state.categoryFilter = "Geometry";
        state.selectedTopicId = "geometry";
      } else {
        state.categoryFilter = "Algebra";
        state.selectedTopicId = "simplify-terms";
      }
      navigateTo("topics");
      renderTopicsArea();
    });
  });

  document.addEventListener("click", (event) => {
    if (!dom.languageSwitcher.contains(event.target as Node)) {
      dom.languageMenu.hidden = true;
      dom.languageToggleButton.setAttribute("aria-expanded", "false");
    }
    if (!dom.avatarShell.contains(event.target as Node)) {
      closeAvatarMenu();
    }
  });

  dom.signUpTab.addEventListener("click", () => setAuthMode("sign-up"));
  dom.logInTab.addEventListener("click", () => setAuthMode("log-in"));
  dom.authSwitchButton.addEventListener("click", () => {
    setAuthMode(state.authMode === "sign-up" ? "log-in" : "sign-up");
  });

  dom.authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitAuthForm();
  });

  dom.profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveProfileForm();
  });

  dom.profileResetButton.addEventListener("click", async () => {
    await removeAccount();
  });
  dom.openChangeEmailButton.addEventListener("click", () => navigateTo("change-email"));
  dom.openChangePasswordButton.addEventListener("click", () => navigateTo("change-password"));
  dom.backFromChangeEmailButton.addEventListener("click", () => navigateTo("profile"));
  dom.backFromChangePasswordButton.addEventListener("click", () => navigateTo("profile"));

  dom.emailChangeRequestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await requestEmailChange();
  });

  dom.emailChangeConfirmForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await confirmEmailChange();
  });

  dom.passwordUpdateForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await updatePassword();
  });

  dom.passwordResetRequestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await requestPasswordReset();
  });

  dom.passwordResetConfirmForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await confirmPasswordReset();
  });

  dom.markCompleteButton.addEventListener("click", async () => {
    if (!state.selectedTopicId || state.completedTopicIds.includes(state.selectedTopicId)) {
      return;
    }

    state.completedTopicIds = [...state.completedTopicIds, state.selectedTopicId];
    persistCompletedTopics();
    renderTopicsArea();
    renderPlanArea();
    setTopicFeedback(withUserName(translations[state.language].topicCompletedMessage), "success");

    if (state.account && state.authToken) {
      await saveProgressToApi("completed", state.selectedTopicId);
    }
  });

  dom.studyPlanForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const topicIds = queryAll<HTMLInputElement>('input[name="plan-topic"]:checked').map((checkbox) => checkbox.value);
    state.studyPlan = {
      goal: toGoal(dom.goalSelect.value),
      grade: dom.gradeSelect.value,
      intensity: toIntensity(dom.intensitySelect.value),
      topicIds
    };

    persistStudyPlan();
    renderPlanArea();
    setTopicFeedback(translations[state.language].topicSavedPlan, "success");

    if (state.account && state.authToken) {
      await savePlanToApi();
    }
  });

  dom.switchExamButton.addEventListener("click", () => {
    const exams = getMockExams().filter((exam) => {
      const source = mockExamRecords.find((record) => record.slug === exam.id);
      return source?.track_code === state.activeTrackId;
    });
    if (exams.length === 0) {
      return;
    }
    state.mockExamIndex = (state.mockExamIndex + 1) % exams.length;
    renderGymiArea();
  });
}

async function hydrateContentFromApi(): Promise<void> {
  const [topicsResult, tracksResult, examsResult] = await Promise.allSettled([
    fetchJson<ApiTopic[]>("/api/topics"),
    fetchJson<ApiGymiTrack[]>("/api/gymi/tracks"),
    fetchJson<ApiMockExam[]>("/api/gymi/mock-exams")
  ]);

  if (topicsResult.status === "fulfilled" && topicsResult.value.length > 0) {
    topicRecords = topicsResult.value;
  }

  if (tracksResult.status === "fulfilled" && tracksResult.value.length > 0) {
    gymiTrackRecords = tracksResult.value;
  }

  if (examsResult.status === "fulfilled" && examsResult.value.length > 0) {
    mockExamRecords = examsResult.value;
  }

  if (!state.selectedTopicId) {
    state.selectedTopicId = topicRecords[0]?.slug ?? "";
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${url}`);
  }
  return (await response.json()) as T;
}

function renderAll(): void {
  renderShell();
  renderTopicsArea();
  renderPlanArea();
  renderGymiArea();
  renderLangTopicPage();
  renderAuthPage();
  renderProfilePage();
}

function renderShell(): void {
  const t = translations[state.language];

  document.title = t.documentTitle;
  dom.html.lang = state.language;
  dom.languageSwitcher.setAttribute("aria-label", t.languageSwitcherLabel);
  dom.languageCurrentLabel.textContent = state.language === "en" ? "🇬🇧 EN" : "🇩🇪 DE";
  dom.languageToggleButton.setAttribute("aria-label", state.language === "en" ? "English" : "Deutsch");
  dom.languageOptionEnglish.parentElement?.toggleAttribute("hidden", state.language === "en");
  dom.languageOptionGerman.parentElement?.toggleAttribute("hidden", state.language === "de");
  if (dom.navHome) {
    dom.navHome.textContent = t.navHome;
  }
  if (dom.navTopics) {
    dom.navTopics.textContent = t.navLearn;
  }
  if (dom.navPlan) {
    dom.navPlan.textContent = t.navPlan;
  }
  if (dom.navGymi) {
    dom.navGymi.textContent = t.navGymi;
  }
  dom.openAuthButton.textContent = state.account && state.authToken ? t.logoutButton : t.loginButton;
  dom.openProfileButton.textContent = t.avatarProfile;
  dom.avatarLogoutButton.textContent = t.avatarLogout;
  dom.views.forEach((view) => view.classList.toggle("active", view.dataset.view === state.currentView));
  dom.avatarShell.hidden = true;
  renderAvatar();
  updateStaticTexts();
}

function updateStaticTexts(): void {
  const t = translations[state.language];
  const home = homePageContent[state.language];

  setText("#home-hero-title", home.hero.title);
  setText("#home-hero-subtitle", home.hero.subtitle);
  setText("#home-hero-lang-button", home.hero.primaryButton);
  setText("#home-hero-kurz-button", home.hero.secondaryButton);
  setText("#home-info-1", home.hero.infoCard[0]);
  setText("#home-info-2", home.hero.infoCard[1]);
  setText("#home-info-3", home.hero.infoCard[2]);
  setText("#benefit-1-title", home.benefits[0].title);
  setText("#benefit-1-text", home.benefits[0].text);
  setText("#benefit-2-title", home.benefits[1].title);
  setText("#benefit-2-text", home.benefits[1].text);
  setText("#benefit-3-title", home.benefits[2].title);
  setText("#benefit-3-text", home.benefits[2].text);
  setText("#exam-lang-title", home.examCards.lang.title);
  setText("#exam-lang-label", home.examCards.lang.label);
  setText("#exam-lang-text", home.examCards.lang.text);
  setText("#open-lang-track-button", home.examCards.lang.button);
  setText("#exam-kurz-title", home.examCards.kurz.title);
  setText("#exam-kurz-label", home.examCards.kurz.label);
  setText("#exam-kurz-text", home.examCards.kurz.text);
  setText("#open-kurz-track-button", home.examCards.kurz.button);
  setText("#admission-eyebrow", home.admission.eyebrow);
  setText("#admission-title", home.admission.title);
  setText("#admission-text", home.admission.text);
  setText("#admission-zap-title", home.admission.zapTitle);
  setText("#admission-zap-text", home.admission.zapText);
  setText("#admission-zap-link", home.admission.zapLink);
  setText("#admission-brochure-link", home.admission.brochureLink);
  setText("#admission-note", home.admission.note);
  setText("#admission-lang-title", home.admission.langTitle);
  setText("#admission-lang-text", home.admission.langText);
  setText("#admission-lang-link", home.admission.langLink);
  setText("#admission-kurz-title", home.admission.kurzTitle);
  setText("#admission-kurz-text", home.admission.kurzText);
  setText("#admission-kurz-link", home.admission.kurzLink);
  setText("#admission-unter-title", home.admission.unterTitle);
  setText("#admission-unter-text", home.admission.unterText);
  setText("#admission-unter-link", home.admission.unterLink);
  setText("#home-cta-title", home.cta.title);
  setText("#home-cta-text", home.cta.text);
  setText("#home-cta-lang-button", home.cta.langButton);
  setText("#home-cta-kurz-button", home.cta.kurzButton);
  setText("#home-footer-tagline", home.footer.tagline);
  setText("#home-footer-official", home.footer.officialInfo);
  setText("#home-footer-privacy", home.footer.privacy);
  setText("#home-footer-contact", home.footer.contact);
  setText(".view[data-view='topics'] .section-heading .eyebrow", t.topicsEyebrow);
  setText(".view[data-view='topics'] .section-heading h2", t.topicsTitle);
  setText(".view[data-view='topics'] .section-heading p", t.topicsText);
  setText(".view[data-view='topics'] .viewer-label", t.topicsViewerLabel);
  setText(".view[data-view='topics'] .theory-card h4", t.theoryTitle);
  setText(".view[data-view='topics'] .practice-column:nth-child(1) h4", t.practiceStart);
  setText(".view[data-view='topics'] .practice-column:nth-child(2) h4", t.practiceMiddle);
  setText(".view[data-view='topics'] .practice-column:nth-child(3) h4", t.practiceHard);
  setText(".view[data-view='plan'] .section-heading .eyebrow", t.planEyebrow);
  setText(".view[data-view='plan'] .section-heading h2", t.planTitle);
  setText(".view[data-view='plan'] .section-heading p", t.planText);
  dom.goalLabelText.textContent = t.goalLabel;
  dom.gradeLabelText.textContent = t.gradeLabel;
  dom.intensityLabelText.textContent = t.intensityLabel;
  dom.topicsLegendText.textContent = t.topicsLegend;
  setText(".view[data-view='plan'] .dashboard-card h3", t.progressTitle);
  setText(".view[data-view='plan'] .progress-ring-inner span", t.progressDone);
  setText(".view[data-view='plan'] .dashboard-stats article:nth-child(1) span", t.topicsDone);
  setText(".view[data-view='plan'] .dashboard-stats article:nth-child(2) span", t.topicsPicked);
  setText(".view[data-view='plan'] .dashboard-stats article:nth-child(3) span", t.studyRhythm);
  setText(".view[data-view='plan'] .saved-plan h4", t.savedPlan);
  setText(".view[data-view='gymi'] .section-heading .eyebrow", t.gymiEyebrow);
  setText(".view[data-view='gymi'] .section-heading h2", t.gymiTitle);
  setText(".view[data-view='gymi'] .section-heading p", t.gymiText);
  setText(".view[data-view='gymi'] .mock-exam-header .viewer-label", t.mockExam);
  setText(".view[data-view='profile'] .section-heading .eyebrow", t.profileEyebrow);
  setText(".view[data-view='profile'] .section-heading h2", t.profileTitle);
  setText(".view[data-view='profile'] .section-heading p", t.profileText);
  setText(".view[data-view='auth'] .section-heading .eyebrow", t.authEyebrow);
  setText(".view[data-view='auth'] .section-heading h2", t.authTitle);
  setText(".view[data-view='auth'] .section-heading p", t.authText);
  setText(".view[data-view='auth'] .auth-info-card h3", t.authWhyTitle);
  setText(".view[data-view='auth'] .auth-info-card .mini-checklist li:nth-child(1)", t.authWhy1);
  setText(".view[data-view='auth'] .auth-info-card .mini-checklist li:nth-child(2)", t.authWhy2);
  setText(".view[data-view='auth'] .auth-info-card .mini-checklist li:nth-child(3)", t.authWhy3);
  setText("#switch-exam-button", t.nextMockExam);

  updateFormOptions();
}

function updateFormOptions(): void {
  const t = translations[state.language];

  updateSelectOption(dom.goalSelect, "school", t.goalSchool);
  updateSelectOption(dom.goalSelect, "confidence", t.goalConfidence);
  updateSelectOption(dom.goalSelect, "gymi", t.goalGymi);
  updateSelectOption(dom.gradeSelect, "3-4", t.grade34);
  updateSelectOption(dom.gradeSelect, "5-6", t.grade56);
  updateSelectOption(dom.gradeSelect, "7-8", t.grade78);
  updateSelectOption(dom.gradeSelect, "9+", t.grade9Plus);
  updateSelectOption(dom.intensitySelect, "light", t.intensityLight);
  updateSelectOption(dom.intensitySelect, "steady", t.intensitySteady);
  updateSelectOption(dom.intensitySelect, "focus", t.intensityFocus);
  updateSelectOption(dom.authGradeSelect, "3-4", t.grade34);
  updateSelectOption(dom.authGradeSelect, "5-6", t.grade56);
  updateSelectOption(dom.authGradeSelect, "7-8", t.grade78);
  updateSelectOption(dom.authGradeSelect, "9+", t.grade9Plus);
  updateSelectOption(dom.profileGradeInput, "3-4", t.grade34);
  updateSelectOption(dom.profileGradeInput, "5-6", t.grade56);
  updateSelectOption(dom.profileGradeInput, "7-8", t.grade78);
  updateSelectOption(dom.profileGradeInput, "9+", t.grade9Plus);
}

function updateSelectOption(select: HTMLSelectElement, value: string, text: string): void {
  const option = select.querySelector(`option[value="${CSS.escape(value)}"]`);
  if (option) {
    option.textContent = text;
  }
}

function renderTopicsArea(): void {
  renderFilters();
  renderTopicList();
  renderSelectedTopic();
}

function renderFilters(): void {
  const t = translations[state.language];
  const topics = getTopics();
  const grades = ["all", ...new Set(topics.map((topic) => topic.grade))];
  const categories = ["all", ...new Set(topics.map((topic) => topic.category))];

  dom.gradeFilters.innerHTML = "";
  dom.categoryFilters.innerHTML = "";

  grades.forEach((grade) => {
    dom.gradeFilters.appendChild(
      createFilterButton({
        label: grade === "all" ? t.selectAllGrades : grade,
        active: state.gradeFilter === grade,
        onClick: () => {
          state.gradeFilter = grade;
          renderTopicsArea();
        }
      })
    );
  });

  categories.forEach((category) => {
    dom.categoryFilters.appendChild(
      createFilterButton({
        label: category === "all" ? t.selectAllTypes : category,
        active: state.categoryFilter === category,
        onClick: () => {
          state.categoryFilter = category;
          renderTopicsArea();
        }
      })
    );
  });
}

function createFilterButton(args: { label: string; active: boolean; onClick: () => void }): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `filter-button${args.active ? " active" : ""}`;
  button.textContent = args.label;
  button.addEventListener("click", args.onClick);
  return button;
}

function getVisibleTopics(): TopicContent[] {
  return getTopics().filter((topic) => {
    const gradeMatches = state.gradeFilter === "all" || topic.grade === state.gradeFilter;
    const categoryMatches = state.categoryFilter === "all" || topic.category === state.categoryFilter;
    return gradeMatches && categoryMatches;
  });
}

function renderTopicList(): void {
  const visibleTopics = getVisibleTopics();
  const allTopics = getTopics();

  if (!visibleTopics.some((topic) => topic.id === state.selectedTopicId)) {
    state.selectedTopicId = visibleTopics[0]?.id ?? allTopics[0]?.id ?? "";
  }

  dom.topicList.innerHTML = "";

  visibleTopics.forEach((topic) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `topic-chip${topic.id === state.selectedTopicId ? " active" : ""}`;
    chip.innerHTML = `
      <h3>${escapeHtml(topic.title)}</h3>
      <p>${escapeHtml(topic.summary)}</p>
      <div class="topic-badges">
        <span>${escapeHtml(topic.grade)}</span>
        <span>${escapeHtml(topic.category)}</span>
        <span>${escapeHtml(state.completedTopicIds.includes(topic.id) ? translations[state.language].completedLabel : topic.duration)}</span>
      </div>
    `;
    chip.addEventListener("click", () => {
      state.selectedTopicId = topic.id;
      renderTopicsArea();
    });
    dom.topicList.appendChild(chip);
  });
}

function renderSelectedTopic(): void {
  const topics = getTopics();
  const topic = topics.find((item) => item.id === state.selectedTopicId) ?? topics[0];

  if (!topic) {
    return;
  }

  dom.selectedTopicTitle.textContent = topic.title;
  dom.selectedTopicMeta.textContent = `${topic.grade} • ${topic.category} • ${topic.duration}`;
  dom.selectedTopicSummary.textContent = topic.summary;

  if (!dom.topicFeedback.classList.contains("success") && !dom.topicFeedback.classList.contains("error")) {
    setTopicFeedback(translations[state.language].topicFeedback);
  }

  dom.markCompleteButton.textContent = state.completedTopicIds.includes(topic.id)
    ? translations[state.language].topicFinishedAlready
    : translations[state.language].topicsFinishButton;

  dom.topicFormula.textContent = formatMathText(topic.formula);
  fillList(dom.selectedTopicTheory, topic.theory);
  fillList(dom.practiceEasy, topic.practice.easy);
  fillList(dom.practiceMedium, topic.practice.medium);
  fillList(dom.practiceHard, topic.practice.hard);

  if (topic.id === "simplify-terms") {
    void simplifyTermsCanvas.show(state.language);
  } else {
    simplifyTermsCanvas.hide();
  }
}

function fillList(element: HTMLElement, items: string[]): void {
  element.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = formatMathText(item);
    element.appendChild(li);
  });
}

function renderPlanArea(): void {
  const t = translations[state.language];
  const topics = getTopics();
  const planTopicIds = state.studyPlan.topicIds;
  const completedCount = state.completedTopicIds.length;
  const completionBase = planTopicIds.length || topics.length || 1;
  const completionRate = Math.round((completedCount / completionBase) * 100);

  dom.planTopicOptions.innerHTML = "";
  topics.forEach((topic) => {
    const label = document.createElement("label");
    label.className = "plan-checkbox";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "plan-topic";
    input.value = topic.id;
    input.checked = state.studyPlan.topicIds.includes(topic.id);

    const text = document.createElement("span");
    text.textContent = topic.title;
    label.append(input, text);
    dom.planTopicOptions.appendChild(label);
  });

  dom.goalSelect.value = state.studyPlan.goal;
  dom.gradeSelect.value = state.studyPlan.grade;
  dom.intensitySelect.value = state.studyPlan.intensity;
  dom.completionRate.textContent = `${completionRate}%`;
  dom.completedTopicsCount.textContent = String(completedCount);
  dom.plannedTopicsCount.textContent = String(planTopicIds.length);
  dom.weeklyPlanLabel.textContent = intensityToLabel(state.studyPlan.intensity);
  dom.progressRing.style.setProperty("--progress", String(completionRate));
  dom.progressMessage.textContent = progressMessageFor(completionRate, completedCount);
  dom.savedPlanSummary.innerHTML = `
    <p><strong>${escapeHtml(t.goalLabel)}</strong> ${escapeHtml(goalToLabel(state.studyPlan.goal))}</p>
    <p><strong>${escapeHtml(t.gradeLabel)}</strong> ${escapeHtml(gradeLabel(state.studyPlan.grade))}</p>
    <p><strong>${escapeHtml(t.studyRhythm)}</strong> ${escapeHtml(intensityToLabel(state.studyPlan.intensity))}</p>
  `;

  dom.savedPlanTopics.innerHTML = "";

  if (planTopicIds.length === 0) {
    const li = document.createElement("li");
    li.textContent = t.noPlanTopics;
    dom.savedPlanTopics.appendChild(li);
    return;
  }

  planTopicIds
    .map((topicId) => topics.find((topic) => topic.id === topicId))
    .filter((topic): topic is TopicContent => Boolean(topic))
    .forEach((topic) => {
      const li = document.createElement("li");
      li.textContent = `${state.completedTopicIds.includes(topic.id) ? "✓" : "•"} ${topic.title}`;
      dom.savedPlanTopics.appendChild(li);
    });
}

function renderGymiArea(): void {
  const t = translations[state.language];
  const tracks = getTracks();
  const exams = getMockExams().filter((exam) => {
    const source = mockExamRecords.find((record) => record.slug === exam.id);
    return source?.track_code === state.activeTrackId;
  });

  dom.gymiTrackGrid.innerHTML = "";
  dom.gymiTopicCards.innerHTML = "";

  tracks.forEach((track) => {
    const card = document.createElement("article");
    const isActive = track.id === state.activeTrackId;
    card.className = `gymi-card${isActive ? " active" : ""}`;
    card.innerHTML = `
      <h3>${escapeHtml(track.title)}</h3>
      <p>${escapeHtml(track.audience)}</p>
      <div class="gymi-pill-row">${track.pillars.map((pillar) => `<span>${escapeHtml(pillar)}</span>`).join("")}</div>
      <p>${escapeHtml(track.diagnostics)}</p>
      <button class="${isActive ? "primary-button" : "secondary-button"}" type="button">${escapeHtml(t.useTrack)}</button>
    `;

    const button = card.querySelector("button");
    button?.addEventListener("click", () => {
      openExamTrack(track.id);
      renderGymiArea();
    });

    dom.gymiTrackGrid.appendChild(card);
  });

  if (state.activeTrackId === "lang") {
    const topicCard = document.createElement("article");
    topicCard.className = "gymi-topic-card";
    topicCard.innerHTML = `
      <span class="panel-kicker">${state.language === "de" ? "Erstes Thema" : "First topic"}</span>
      <h3>${state.language === "de" ? "Terme vereinfachen" : "Simplify expressions"}</h3>
      <p>${
        state.language === "de"
          ? "Öffne eine eigene Seite mit Aufgaben zu Klammern, Produkten, Brüchen und Wurzeln."
          : "Open a dedicated page with tasks on brackets, products, fractions, and square roots."
      }</p>
      <button class="primary-button" type="button">${state.language === "de" ? "Thema öffnen" : "Open topic"}</button>
    `;

    topicCard.querySelector<HTMLButtonElement>("button")?.addEventListener("click", () => {
      navigateTo("lang-topic");
      renderLangTopicPage();
    });

    dom.gymiTopicCards.appendChild(topicCard);
  }

  if (exams.length === 0) {
    dom.switchExamButton.hidden = true;
    dom.mockExamTitle.textContent = "";
    dom.mockExamDescription.textContent = "";
    dom.mockExamTasks.innerHTML = "";
    return;
  }

  if (state.mockExamIndex >= exams.length) {
    state.mockExamIndex = 0;
  }

  const exam = exams[state.mockExamIndex];
  if (!exam) {
    return;
  }
  dom.switchExamButton.hidden = exams.length <= 1;
  dom.mockExamTitle.textContent = exam.title;
  dom.mockExamDescription.textContent = exam.description;
  fillList(dom.mockExamTasks, exam.tasks);
}

function renderLangTopicPage(): void {
  if (state.currentView === "lang-topic") {
    langGymiTopicPage.show(state.language);
    return;
  }

  langGymiTopicPage.hide();
}

function renderAuthPage(): void {
  const t = translations[state.language];
  const isSignedIn = Boolean(state.account && state.authToken);

  dom.signUpTab.textContent = t.authSignUp;
  dom.logInTab.textContent = t.authLogIn;
  dom.signUpTab.classList.toggle("active", state.authMode === "sign-up");
  dom.logInTab.classList.toggle("active", state.authMode === "log-in");
  dom.authDisplayNameField.hidden = true;
  dom.authGradeField.hidden = true;
  dom.authSubmitButton.textContent = state.authMode === "sign-up" ? t.authCreateAccount : t.authLogIn;
  dom.authSwitchButton.textContent = state.authMode === "sign-up" ? t.authAlready : t.authNeedNew;
  dom.authDisplayNameLabel.textContent = t.authName;
  dom.authDisplayNameInput.placeholder = t.authNamePlaceholder;
  dom.authEmailLabel.textContent = t.authEmail;
  dom.authPasswordLabel.textContent = t.authPassword;
  dom.authPasswordInput.placeholder = t.authPasswordPlaceholder;
  dom.authPasswordInput.autocomplete = state.authMode === "sign-up" ? "new-password" : "current-password";
  dom.authGradeLabel.textContent = t.authLevel;
  dom.authMessage.className = "auth-message learner-note";
  dom.authMessage.textContent = isSignedIn ? t.authSignedIn : t.authHelper;
  dom.passwordResetTitle.textContent = t.authResetTitle;
  dom.passwordResetEmailLabel.textContent = t.authEmail;
  dom.passwordResetCodeLabel.textContent = t.authResetCode;
  dom.passwordResetNewPasswordLabel.textContent = t.passwordNew;
  dom.passwordResetRequestButton.textContent = t.authResetRequestButton;
  dom.passwordResetConfirmButton.textContent = t.authResetConfirmButton;
  if (!dom.passwordResetMessage.classList.contains("success") && !dom.passwordResetMessage.classList.contains("error")) {
    dom.passwordResetMessage.textContent = t.authResetHint;
  }
}

function renderProfilePage(): void {
  const t = translations[state.language];
  dom.profileNameLabel.textContent = t.profileName;
  dom.profileEmailLabel.textContent = t.profileEmail;
  dom.profilePhotoLabel.textContent = t.profilePhoto;
  dom.profileGradeLabel.textContent = t.profileLevel;
  dom.profileAboutLabel.textContent = t.profileAbout;
  dom.profileResetButton.textContent = t.profileRemove;
  dom.profileSaveButton.textContent = t.profileSave;
  dom.profileSecurityTitle.textContent = t.profileSecurityTitle;
  dom.profileSecurityMessage.textContent = t.profileSecurityMessage;
  dom.openChangeEmailButton.textContent = t.openChangeEmail;
  dom.openChangePasswordButton.textContent = t.openChangePassword;
  dom.changeEmailEyebrow.textContent = t.changeEmailEyebrow;
  dom.changeEmailPageTitle.textContent = t.changeEmailPageTitle;
  dom.changeEmailPageText.textContent = t.changeEmailPageText;
  dom.changeEmailInfoTitle.textContent = t.changeEmailInfoTitle;
  dom.changeEmailStep1.textContent = t.changeEmailStep1;
  dom.changeEmailStep2.textContent = t.changeEmailStep2;
  dom.changeEmailStep3.textContent = t.changeEmailStep3;
  dom.backFromChangeEmailButton.textContent = t.backToProfile;
  dom.emailChangeTitle.textContent = t.emailChangeTitle;
  dom.emailChangeNewEmailLabel.textContent = t.emailChangeNewEmail;
  dom.emailChangeCodeLabel.textContent = t.emailChangeCode;
  dom.emailChangeRequestButton.textContent = t.emailChangeRequestButton;
  dom.emailChangeConfirmButton.textContent = t.emailChangeConfirmButton;
  dom.changePasswordEyebrow.textContent = t.changePasswordEyebrow;
  dom.changePasswordPageTitle.textContent = t.changePasswordPageTitle;
  dom.changePasswordPageText.textContent = t.changePasswordPageText;
  dom.changePasswordInfoTitle.textContent = t.changePasswordInfoTitle;
  dom.changePasswordStep1.textContent = t.changePasswordStep1;
  dom.changePasswordStep2.textContent = t.changePasswordStep2;
  dom.changePasswordStep3.textContent = t.changePasswordStep3;
  dom.backFromChangePasswordButton.textContent = t.backToProfile;
  dom.passwordCardTitle.textContent = t.passwordCardTitle;
  dom.passwordCurrentLabel.textContent = t.passwordCurrent;
  dom.passwordNewLabel.textContent = t.passwordNew;
  dom.passwordUpdateButton.textContent = t.passwordUpdateButton;

  if (!state.account) {
    dom.profileNamePreview.textContent = t.profileTitle;
    dom.profileEmailPreview.textContent = t.profileEmptyEmail;
    dom.profileAboutPreview.textContent = t.profileEmptyAbout;
    dom.profileNameInput.value = "";
    dom.profileEmailInput.value = "";
    dom.profilePhotoInput.value = "";
    dom.profileGradeInput.value = "5-6";
    dom.profileAboutInput.value = "";
    dom.profileMessage.textContent = t.profileMessageSignedOut;
    dom.emailChangeMessage.textContent = t.emailChangeSignedOut;
    dom.passwordUpdateMessage.textContent = t.passwordUpdateSignedOut;
    dom.profileAvatarImage.hidden = true;
    dom.profileAvatarInitials.hidden = false;
    dom.profileAvatarInitials.textContent = "MG";
    return;
  }

  dom.profileNameInput.value = state.profile.displayName;
  dom.profileEmailInput.value = state.account.email;
  dom.profilePhotoInput.value = state.profile.photoUrl;
  dom.profileGradeInput.value = state.profile.gradeBand;
  dom.profileAboutInput.value = state.profile.about;
  dom.profileNamePreview.textContent = state.profile.displayName;
  dom.profileEmailPreview.textContent = state.account.email;
  dom.profileAboutPreview.textContent = state.profile.about || t.profileEmptyAbout;
  dom.profileMessage.textContent = t.profileMessageSaved;
  if (!dom.emailChangeMessage.classList.contains("success") && !dom.emailChangeMessage.classList.contains("error")) {
    dom.emailChangeMessage.textContent = t.emailChangeHint;
  }
  if (!dom.passwordUpdateMessage.classList.contains("success") && !dom.passwordUpdateMessage.classList.contains("error")) {
    dom.passwordUpdateMessage.textContent = t.passwordUpdateHint;
  }
  renderAvatar();
}

function renderAvatar(): void {
  if (!state.account) {
    dom.avatarImage.hidden = true;
    dom.avatarInitials.hidden = false;
    dom.avatarInitials.textContent = "MG";
    dom.profileAvatarImage.hidden = true;
    dom.profileAvatarInitials.hidden = false;
    dom.profileAvatarInitials.textContent = "MG";
    dom.avatarName.textContent = "MathGenius";
    return;
  }

  const initials = getInitials(getDisplayName());
  const photoUrl = state.profile.photoUrl;
  dom.avatarInitials.textContent = initials;
  dom.profileAvatarInitials.textContent = initials;
  dom.avatarName.textContent = getDisplayName();

  if (photoUrl) {
    dom.avatarImage.src = photoUrl;
    dom.avatarImage.hidden = false;
    dom.avatarInitials.hidden = true;
    dom.profileAvatarImage.src = photoUrl;
    dom.profileAvatarImage.hidden = false;
    dom.profileAvatarInitials.hidden = true;
  } else {
    dom.avatarImage.hidden = true;
    dom.avatarInitials.hidden = false;
    dom.profileAvatarImage.hidden = true;
    dom.profileAvatarInitials.hidden = false;
  }
}

function navigateTo(viewName: ViewName): void {
  state.currentView = viewName;
  renderShell();
}

function openExamTrack(trackId: string): void {
  state.activeTrackId = trackId;
  state.mockExamIndex = 0;
  navigateTo("gymi");
}

function toggleAvatarMenu(): void {
  state.avatarMenuOpen = !state.avatarMenuOpen;
  dom.avatarMenu.hidden = !state.avatarMenuOpen;
  dom.avatarButton.setAttribute("aria-expanded", String(state.avatarMenuOpen));
}

function closeAvatarMenu(): void {
  state.avatarMenuOpen = false;
  dom.avatarMenu.hidden = true;
  dom.avatarButton.setAttribute("aria-expanded", "false");
}

function setAuthMode(mode: AuthMode): void {
  state.authMode = mode;
  renderAuthPage();
}

async function submitAuthForm(): Promise<void> {
  const t = translations[state.language];
  const email = dom.authEmailInput.value.trim();
  const password = dom.authPasswordInput.value;
  const endpoint = state.authMode === "sign-up" ? "/api/auth/register" : "/api/auth/login";
  const payload = state.authMode === "sign-up" ? { email, password } : { email, password };

  dom.authMessage.className = "auth-message learner-note";
  dom.authMessage.textContent = state.authMode === "sign-up" ? t.authCreating : t.authLoggingIn;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = (await response.json()) as {
      token?: string;
      account?: AccountState;
      error?: string;
    };

    if (!response.ok || !result.token || !result.account) {
      throw new Error(result.error ?? "Could not complete authentication.");
    }

    state.authToken = result.token;
    state.account = result.account;
    persistAuthState();
    if (state.authMode === "sign-up") {
      await syncCurrentLearnerDataToApi();
    }
    await hydrateLearnerDataFromApi();
    loadProfileForCurrentAccount();
    dom.authPasswordInput.value = "";
    renderAll();
    navigateTo("home");
  } catch (error: unknown) {
    dom.authMessage.className = "auth-message learner-note error";
    dom.authMessage.textContent = error instanceof Error ? error.message : t.authHelper;
  }
}

async function hydrateAccountFromApi(): Promise<void> {
  if (!state.authToken) {
    return;
  }

  try {
    const response = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${state.authToken}` }
    });

    if (!response.ok) {
      throw new Error("Session expired.");
    }

    const result = (await response.json()) as { account?: AccountState };
    if (!result.account) {
      throw new Error("Session expired.");
    }

    state.account = result.account;
    persistAuthState();
  } catch {
    state.authToken = "";
    state.account = null;
    persistAuthState();
  }
}

async function hydrateLearnerDataFromApi(): Promise<void> {
  if (!state.account || !state.authToken) {
    return;
  }

  try {
    const [planResponse, progressResponse] = await Promise.all([
      fetch("/api/me/plan", {
        headers: { Authorization: `Bearer ${state.authToken}` }
      }),
      fetch("/api/me/progress", {
        headers: { Authorization: `Bearer ${state.authToken}` }
      })
    ]);

    if (planResponse.ok) {
      const plan = (await planResponse.json()) as ApiStudyPlan;
      const topicIds = Array.isArray(plan.topic_slugs) ? plan.topic_slugs : [];
      if (topicIds.length > 0) {
        state.studyPlan = {
          goal: toGoal(plan.goal ?? state.studyPlan.goal),
          grade: plan.grade_band ?? state.studyPlan.grade,
          intensity: toIntensity(plan.intensity ?? state.studyPlan.intensity),
          topicIds
        };
      }
    }

    if (progressResponse.ok) {
      const progress = (await progressResponse.json()) as ApiProgressEntry[];
      const completedTopicIds = [...new Set(progress.filter((entry) => entry.status === "completed").map((entry) => entry.topic_slug))];
      if (completedTopicIds.length > 0) {
        state.completedTopicIds = completedTopicIds;
      }
    }

    persistStudyPlan();
    persistCompletedTopics();
  } catch {
    // Keep the learner's device data if the API is temporarily unavailable.
  }
}

async function syncCurrentLearnerDataToApi(): Promise<void> {
  if (!state.account || !state.authToken) {
    return;
  }

  const requests: Promise<Response>[] = [];

  if (state.studyPlan.topicIds.length > 0) {
    requests.push(
      fetch("/api/me/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.authToken}`
        },
        body: JSON.stringify({
          goal: state.studyPlan.goal,
          gradeBand: state.studyPlan.grade,
          intensity: state.studyPlan.intensity,
          topicSlugs: state.studyPlan.topicIds
        })
      })
    );
  }

  state.completedTopicIds.forEach((topicSlug) => {
    requests.push(
      fetch("/api/me/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.authToken}`
        },
        body: JSON.stringify({ topicSlug, status: "completed" })
      })
    );
  });

  try {
    await Promise.all(requests);
  } catch {
    // The UI can still proceed with local data and sync later.
  }
}

function logOut(): void {
  clearCurrentLearnerState();
  renderAll();
  navigateTo("home");
}

async function removeAccount(): Promise<void> {
  const t = translations[state.language];

  if (!state.account || !state.authToken) {
    clearCurrentLearnerState();
    renderAll();
    navigateTo("home");
    return;
  }

  try {
    const response = await fetch("/api/me/account", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.authToken}`
      }
    });

    const result = (await response.json()) as { error?: string };
    if (!response.ok) {
      throw new Error(result.error ?? "Could not remove the account.");
    }

    clearCurrentLearnerState();
    renderAll();
    dom.authMessage.className = "auth-message learner-note success";
    dom.authMessage.textContent = t.profileRemoveSuccess;
    navigateTo("auth");
  } catch (error: unknown) {
    dom.profileMessage.className = "auth-message learner-note error";
    dom.profileMessage.textContent = error instanceof Error ? error.message : t.profileRemove;
  }
}

async function updatePassword(): Promise<void> {
  const t = translations[state.language];

  if (!state.account || !state.authToken) {
    dom.passwordUpdateMessage.className = "auth-message learner-note error";
    dom.passwordUpdateMessage.textContent = t.passwordUpdateSignedOut;
    return;
  }

  dom.passwordUpdateMessage.className = "auth-message learner-note";
  dom.passwordUpdateMessage.textContent = t.authResetConfirmSending;

  try {
    const response = await fetch("/api/me/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.authToken}`
      },
      body: JSON.stringify({
        currentPassword: dom.passwordCurrentInput.value,
        newPassword: dom.passwordNewInput.value
      })
    });

    const result = (await response.json()) as { error?: string };
    if (!response.ok) {
      throw new Error(result.error ?? "Could not update the password.");
    }

    dom.passwordUpdateForm.reset();
    dom.passwordUpdateMessage.className = "auth-message learner-note success";
    dom.passwordUpdateMessage.textContent = t.passwordUpdateSuccess;
  } catch (error: unknown) {
    dom.passwordUpdateMessage.className = "auth-message learner-note error";
    dom.passwordUpdateMessage.textContent = error instanceof Error ? error.message : t.passwordUpdateHint;
  }
}

async function requestEmailChange(): Promise<void> {
  const t = translations[state.language];

  if (!state.account || !state.authToken) {
    dom.emailChangeMessage.className = "auth-message learner-note error";
    dom.emailChangeMessage.textContent = t.emailChangeSignedOut;
    return;
  }

  dom.emailChangeMessage.className = "auth-message learner-note";
  dom.emailChangeMessage.textContent = t.emailChangeRequestSending;

  try {
    const response = await fetch("/api/me/email-change/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.authToken}`
      },
      body: JSON.stringify({
        newEmail: dom.emailChangeNewEmailInput.value.trim()
      })
    });

    const result = (await response.json()) as { error?: string; message?: string };
    if (!response.ok) {
      throw new Error(result.error ?? "Could not send the confirmation code.");
    }

    dom.emailChangeCodeInput.value = "";
    dom.emailChangeMessage.className = "auth-message learner-note success";
    dom.emailChangeMessage.textContent = result.message ?? t.emailChangeRequestSuccess;
  } catch (error: unknown) {
    dom.emailChangeMessage.className = "auth-message learner-note error";
    dom.emailChangeMessage.textContent = error instanceof Error ? error.message : t.emailChangeHint;
  }
}

async function confirmEmailChange(): Promise<void> {
  const t = translations[state.language];

  if (!state.account || !state.authToken) {
    dom.emailChangeMessage.className = "auth-message learner-note error";
    dom.emailChangeMessage.textContent = t.emailChangeSignedOut;
    return;
  }

  dom.emailChangeMessage.className = "auth-message learner-note";
  dom.emailChangeMessage.textContent = t.emailChangeConfirmSending;

  try {
    const response = await fetch("/api/me/email-change/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.authToken}`
      },
      body: JSON.stringify({
        newEmail: dom.emailChangeNewEmailInput.value.trim(),
        code: dom.emailChangeCodeInput.value.trim()
      })
    });

    const result = (await response.json()) as {
      error?: string;
      message?: string;
      token?: string;
      account?: AccountState;
    };

    if (!response.ok || !result.token || !result.account) {
      throw new Error(result.error ?? "Could not confirm the new email.");
    }

    state.authToken = result.token;
    state.account = result.account;
    persistAuthState();
    loadProfileForCurrentAccount();
    dom.profileEmailInput.value = result.account.email;
    dom.emailChangeConfirmForm.reset();
    dom.emailChangeMessage.className = "auth-message learner-note success";
    dom.emailChangeMessage.textContent = result.message ?? t.emailChangeConfirmSuccess;
    renderShell();
    renderProfilePage();
  } catch (error: unknown) {
    dom.emailChangeMessage.className = "auth-message learner-note error";
    dom.emailChangeMessage.textContent = error instanceof Error ? error.message : t.emailChangeHint;
  }
}

async function requestPasswordReset(): Promise<void> {
  const t = translations[state.language];
  dom.passwordResetMessage.className = "auth-message learner-note";
  dom.passwordResetMessage.textContent = t.authResetRequestSending;

  try {
    const response = await fetch("/api/auth/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: dom.passwordResetEmailInput.value.trim() })
    });

    const result = (await response.json()) as { error?: string; message?: string };
    if (!response.ok) {
      throw new Error(result.error ?? "Could not send a confirmation code.");
    }

    dom.passwordResetCodeInput.value = "";
    dom.passwordResetNewPasswordInput.value = "";
    dom.passwordResetMessage.className = "auth-message learner-note success";
    dom.passwordResetMessage.textContent = result.message ?? t.authResetRequestSuccess;
  } catch (error: unknown) {
    dom.passwordResetMessage.className = "auth-message learner-note error";
    dom.passwordResetMessage.textContent = error instanceof Error ? error.message : t.authResetHint;
  }
}

async function confirmPasswordReset(): Promise<void> {
  const t = translations[state.language];
  dom.passwordResetMessage.className = "auth-message learner-note";
  dom.passwordResetMessage.textContent = t.authResetConfirmSending;

  try {
    const response = await fetch("/api/auth/password-reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: dom.passwordResetEmailInput.value.trim(),
        code: dom.passwordResetCodeInput.value.trim(),
        newPassword: dom.passwordResetNewPasswordInput.value
      })
    });

    const result = (await response.json()) as { error?: string; message?: string };
    if (!response.ok) {
      throw new Error(result.error ?? "Could not reset the password.");
    }

    dom.passwordResetConfirmForm.reset();
    dom.passwordResetMessage.className = "auth-message learner-note success";
    dom.passwordResetMessage.textContent = result.message ?? t.authResetConfirmSuccess;
  } catch (error: unknown) {
    dom.passwordResetMessage.className = "auth-message learner-note error";
    dom.passwordResetMessage.textContent = error instanceof Error ? error.message : t.authResetHint;
  }
}

function clearCurrentLearnerState(): void {
  const accountId = state.account?.id;

  state.authToken = "";
  state.account = null;
  state.profile = createEmptyProfile();
  state.completedTopicIds = [];
  state.studyPlan = {
    goal: "school",
    grade: "5-6",
    intensity: "light",
    topicIds: ["fractions", "geometry"]
  };
  persistAuthState();
  localStorage.removeItem(storageKeys.completed);
  localStorage.removeItem(storageKeys.plan);
  if (accountId) {
    localStorage.removeItem(profileStorageKey(accountId));
    localStorage.removeItem(completedStorageKey(accountId));
    localStorage.removeItem(planStorageKey(accountId));
  }
  dom.authForm.reset();
  dom.emailChangeRequestForm.reset();
  dom.emailChangeConfirmForm.reset();
  dom.passwordUpdateForm.reset();
  dom.passwordResetRequestForm.reset();
  dom.passwordResetConfirmForm.reset();
  setTopicFeedback(translations[state.language].topicFeedback);
}

function saveProfileForm(): void {
  if (!state.account) {
    return;
  }

  state.profile = {
    displayName: dom.profileNameInput.value.trim() || state.account.display_name,
    photoUrl: dom.profilePhotoInput.value.trim(),
    gradeBand: dom.profileGradeInput.value,
    about: dom.profileAboutInput.value.trim()
  };

  persistProfileForCurrentAccount();
  renderShell();
  renderProfilePage();
  dom.profileMessage.textContent = translations[state.language].profileMessageSaved;
}

async function savePlanToApi(): Promise<void> {
  try {
    await fetch("/api/me/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.authToken}`
      },
      body: JSON.stringify({
        goal: state.studyPlan.goal,
        gradeBand: state.studyPlan.grade,
        intensity: state.studyPlan.intensity,
        topicSlugs: state.studyPlan.topicIds
      })
    });
  } catch {
    // Keep local state working even if the backend is temporarily unavailable.
  }
}

async function saveProgressToApi(status: string, topicSlug: string): Promise<void> {
  try {
    await fetch("/api/me/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.authToken}`
      },
      body: JSON.stringify({ topicSlug, status })
    });
  } catch {
    // Local progress is still kept in the browser.
  }
}

function createEmptyProfile(): ProfileState {
  return {
    displayName: "",
    photoUrl: "",
    gradeBand: "5-6",
    about: ""
  };
}

function loadProfileForCurrentAccount(): void {
  if (!state.account) {
    state.profile = createEmptyProfile();
    return;
  }

  const fallbackProfile: ProfileState = {
    displayName: state.account.display_name,
    photoUrl: "",
    gradeBand: state.account.grade_band,
    about: ""
  };

  try {
    const stored = JSON.parse(localStorage.getItem(profileStorageKey(state.account.id)) ?? "null") as ProfileState | null;
    state.profile = stored ?? fallbackProfile;
  } catch {
    state.profile = fallbackProfile;
  }
}

function persistProfileForCurrentAccount(): void {
  if (!state.account) {
    return;
  }
  localStorage.setItem(profileStorageKey(state.account.id), JSON.stringify(state.profile));
}

function profileStorageKey(accountId: string): string {
  return `mathginius-profile-${accountId}`;
}

function completedStorageKey(accountId?: string): string {
  return accountId ? `${storageKeys.completed}-${accountId}` : storageKeys.completed;
}

function planStorageKey(accountId?: string): string {
  return accountId ? `${storageKeys.plan}-${accountId}` : storageKeys.plan;
}

function loadCompletedTopics(accountId?: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(completedStorageKey(accountId)) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function persistCompletedTopics(): void {
  localStorage.setItem(completedStorageKey(state.account?.id), JSON.stringify(state.completedTopicIds));
}

function loadStudyPlan(accountId?: string): StudyPlanState {
  const fallback: StudyPlanState = {
    goal: "school",
    grade: "5-6",
    intensity: "light",
    topicIds: ["fractions", "geometry"]
  };

  try {
    const stored = JSON.parse(localStorage.getItem(planStorageKey(accountId)) ?? "null") as Partial<StudyPlanState> | null;
    return {
      goal: toGoal(stored?.goal ?? fallback.goal),
      grade: stored?.grade ?? fallback.grade,
      intensity: toIntensity(stored?.intensity ?? fallback.intensity),
      topicIds: Array.isArray(stored?.topicIds) ? stored?.topicIds : fallback.topicIds
    };
  } catch {
    return fallback;
  }
}

function persistStudyPlan(): void {
  localStorage.setItem(planStorageKey(state.account?.id), JSON.stringify(state.studyPlan));
}

function loadAuthToken(): string {
  return localStorage.getItem(storageKeys.authToken) ?? "";
}

function loadAccount(): AccountState | null {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.account) ?? "null") as AccountState | null;
  } catch {
    return null;
  }
}

function persistAuthState(): void {
  if (state.authToken) {
    localStorage.setItem(storageKeys.authToken, state.authToken);
  } else {
    localStorage.removeItem(storageKeys.authToken);
  }

  if (state.account) {
    localStorage.setItem(storageKeys.account, JSON.stringify(state.account));
  } else {
    localStorage.removeItem(storageKeys.account);
  }
}

function loadLanguage(): Language {
  return "de";
}

function setLanguage(language: Language): void {
  state.language = language;
  localStorage.setItem(storageKeys.language, language);
  renderAll();
}

function getTopics(): TopicContent[] {
  return topicRecords.map((topic) => mapApiTopicToClientTopic(topic, state.language));
}

function getTracks(): TrackContent[] {
  return gymiTrackRecords.map((track) => mapApiTrackToClientTrack(track, state.language));
}

function getMockExams(): MockExamContent[] {
  return mockExamRecords.map((exam) => mapApiMockExamToClientMockExam(exam, state.language));
}

function mapApiTopicToClientTopic(topic: ApiTopic, language: Language): TopicContent {
  const override = language === "de" ? germanTopicContent[topic.slug] : undefined;
  return {
    id: topic.slug,
    title: override?.title ?? topic.title,
    grade: gradeLabel(topic.grade_band),
    category: override?.category ?? categoryLabel(topic.category),
    duration: durationLabel(topic.duration_minutes),
    summary: override?.summary ?? topic.summary,
    formula: override?.formula ?? formulaForTopic(topic.slug, language),
    theory: override?.theory ?? topic.theory_points,
    practice: {
      easy: override?.practiceEasy ?? topic.practice_easy,
      medium: override?.practiceMedium ?? topic.practice_medium,
      hard: override?.practiceHard ?? topic.practice_hard
    }
  };
}

function formulaForTopic(topicId: string, language: Language): string {
  if (topicId === "simplify-terms") {
    return language === "de"
      ? "Klammern öffnen -> gleichartige Terme zusammenfassen -> Faktoren kürzen -> vollständig vereinfachen"
      : "Open brackets -> combine like terms -> reduce factors -> simplify completely";
  }
  if (topicId === "equations") {
    return language === "de" ? "x + a = b -> x = b - a" : "x + a = b -> x = b - a";
  }
  if (topicId === "geometry") {
    return language === "de"
      ? "Umfang = Summe aller Seiten; Fläche Rechteck = Länge x Breite"
      : "Perimeter = sum of all sides; Rectangle area = length x width";
  }
  return language === "de"
    ? "Prozent = Bruch x 100; Teil = Prozent x Ganzes"
    : "Percentage = fraction x 100; Part = percentage x whole";
}

function mapApiTrackToClientTrack(track: ApiGymiTrack, language: Language): TrackContent {
  const baseDetails = trackFallbackDetails[track.code] ?? {
    pillars: language === "de" ? ["Fokus", "Routine", "Strategie"] : ["Focus", "Routine", "Strategy"],
    diagnostics:
      language === "de"
        ? "Nutze diesen Track, wenn du ein klares Gymi-Ziel verfolgen willst."
        : "Use this track when you want a clear Gymi study path."
  };
  const override = language === "de" ? germanTrackContent[track.code] : undefined;

  return {
    id: track.code,
    title: override?.title ?? track.title,
    audience: override?.audience ?? track.audience,
    pillars: override?.pillars ?? baseDetails.pillars,
    diagnostics: override?.diagnostics ?? override?.description ?? track.description ?? baseDetails.diagnostics
  };
}

function mapApiMockExamToClientMockExam(exam: ApiMockExam, language: Language): MockExamContent {
  const override = language === "de" ? germanExamContent[exam.slug] : undefined;
  return {
    id: exam.slug,
    title: override?.title ?? exam.title,
    description: override?.description ?? exam.description,
    tasks: override?.tasks ?? exam.tasks
  };
}

function getDisplayName(): string {
  return state.profile.displayName || state.account?.display_name || "Learner";
}

function getInitials(value: string): string {
  return (
    value
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "MG"
  );
}

function goalToLabel(goal: Goal): string {
  const t = translations[state.language];
  const labels: Record<Goal, string> = {
    school: t.goalSchool,
    confidence: t.goalConfidence,
    gymi: t.goalGymi
  };
  return labels[goal];
}

function intensityToLabel(intensity: Intensity): string {
  const t = translations[state.language];
  const labels: Record<Intensity, string> = {
    light: t.intensityLight,
    steady: t.intensitySteady,
    focus: t.intensityFocus
  };
  return labels[intensity];
}

function progressMessageFor(completionRate: number, completedCount: number): string {
  if (completionRate >= 80) {
    return state.language === "de"
      ? "Großartige Arbeit. Du baust richtig Schwung auf."
      : "Amazing work. You are really building momentum.";
  }
  if (completionRate >= 40) {
    return state.language === "de"
      ? "Du machst das gut. Geh Thema für Thema weiter."
      : "You are doing well. Keep going one topic at a time.";
  }
  if (completedCount > 0) {
    return state.language === "de" ? "Guter Start. Jeder kleine Schritt zählt." : "Nice start. Every small step counts.";
  }
  return state.language === "de" ? "Wähle einen einfachen Anfang und starte." : "Pick one easy win and begin.";
}

function gradeLabel(value: string): string {
  const t = translations[state.language];
  switch (value) {
    case "3-4":
      return t.grade34;
    case "5-6":
      return t.grade56;
    case "7-8":
      return t.grade78;
    case "9+":
      return t.grade9Plus;
    default:
      return value;
  }
}

function categoryLabel(value: string): string {
  if (state.language === "de") {
    switch (value.toLowerCase()) {
      case "numbers":
        return "Zahlen";
      case "geometry":
        return "Geometrie";
      case "algebra":
        return "Algebra";
      default:
        return value;
    }
  }
  return value;
}

function durationLabel(minutes: number): string {
  return state.language === "de" ? `${minutes} Minuten` : `${minutes} minutes`;
}

function setTopicFeedback(message: string, variant: "default" | "success" | "error" = "default"): void {
  dom.topicFeedback.className = "feedback-banner";
  if (variant !== "default") {
    dom.topicFeedback.classList.add(variant);
  }
  dom.topicFeedback.textContent = message;
}

function withUserName(message: string): string {
  return state.account ? message.replace("!", `, ${getDisplayName()}!`) : message;
}

function setText(selector: string, value: string): void {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toGoal(value: string): Goal {
  return value === "confidence" || value === "gymi" ? value : "school";
}

function toIntensity(value: string): Intensity {
  return value === "steady" || value === "focus" ? value : "light";
}

function isViewName(value: string | undefined): value is ViewName {
  return (
    value === "home" ||
    value === "topics" ||
    value === "plan" ||
    value === "gymi" ||
    value === "lang-topic" ||
    value === "profile" ||
    value === "auth" ||
    value === "change-email" ||
    value === "change-password"
  );
}
