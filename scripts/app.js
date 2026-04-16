const supportedLocales = ["en", "de"];
const messagesCache = {};

const topics = {
  en: {
    fractions: {
      title: "Fractions and Percentages",
      category: "Numbers",
      difficulty: "Core",
      summary: "Build confidence with percentages, parts of a whole, and practical word problems.",
      theory: [
        "A fraction shows how many equal parts of a whole are used.",
        "Percent means out of one hundred.",
        "You can move between fractions, decimals, and percentages."
      ],
      exampleTitle: "Worked Example",
      formula: "percentage = (part / whole) x 100",
      example: "Example: 25 out of 80 students joined the club. What percentage is that?",
      solution: "Solution: 25 / 80 = 0.3125, so 31.25% joined the club.",
      practice: [
        "Write 1/2, 3/4, and 1/5 as percentages.",
        "Find 30% of 120.",
        "Compare 2/5 and 45%."
      ],
      challenge: "A jacket is discounted by 15% and then by another 10%. Explain why the total discount is not 25%.",
      nextId: "geometry"
    },
    equations: {
      title: "Equations and Unknowns",
      category: "Algebra",
      difficulty: "Intermediate",
      summary: "Learn how to isolate the unknown and check your answer with confidence.",
      theory: [
        "An equation is a balance between two expressions.",
        "The same operation can be applied to both sides.",
        "Checking by substitution confirms the result."
      ],
      exampleTitle: "Worked Example",
      formula: "x + a = b -> x = b - a",
      example: "Example: Solve 3x + 5 = 23.",
      solution: "Solution: 3x = 18, so x = 6. Check: 3(6) + 5 = 23.",
      practice: [
        "Solve x + 9 = 17.",
        "Solve 4x = 28.",
        "Write an equation for: a number plus 12 is 31."
      ],
      challenge: "Solve 5(2x - 1) = 3x + 19 and explain each transformation.",
      nextId: "fractions"
    },
    geometry: {
      title: "Geometry Basics",
      category: "Geometry",
      difficulty: "Core",
      summary: "Review perimeter, area, shapes, and clear visual reasoning.",
      theory: [
        "Perimeter is the distance around a shape.",
        "Area measures the space inside a shape.",
        "For rectangles, area = length x width."
      ],
      exampleTitle: "Worked Example",
      formula: "rectangle area = length x width",
      example: "Example: Find the area of a rectangle with length 14 cm and width 9 cm.",
      solution: "Solution: 14 x 9 = 126, so the area is 126 cm2.",
      practice: [
        "Find the perimeter of a 6 cm by 4 cm rectangle.",
        "Find the area of a square with side 8 cm.",
        "Compare the areas of 8 x 4 and 6 x 5 rectangles."
      ],
      challenge: "A compound shape is made of two rectangles. Split it and calculate the total area.",
      nextId: "equations"
    }
  },
  de: {
    fractions: {
      title: "Brueche und Prozente",
      category: "Zahlen",
      difficulty: "Grundlage",
      summary: "Baue Sicherheit bei Prozenten, Teil-Ganzes-Beziehungen und alltagsnahen Aufgaben auf.",
      theory: [
        "Ein Bruch zeigt, wie viele gleiche Teile eines Ganzen gemeint sind.",
        "Prozent bedeutet von hundert.",
        "Du kannst zwischen Bruechen, Dezimalzahlen und Prozenten wechseln."
      ],
      exampleTitle: "Ausgearbeitetes Beispiel",
      formula: "Prozent = (Teil / Ganzes) x 100",
      example: "Beispiel: 25 von 80 Schuelerinnen und Schuelern sind im Club. Wie viel Prozent sind das?",
      solution: "Loesung: 25 / 80 = 0.3125, also sind 31.25% im Club.",
      practice: [
        "Schreibe 1/2, 3/4 und 1/5 als Prozente.",
        "Berechne 30% von 120.",
        "Vergleiche 2/5 und 45%."
      ],
      challenge: "Eine Jacke wird zuerst um 15% und dann noch einmal um 10% reduziert. Erklaere, warum der Gesamtrabatt nicht 25% ist.",
      nextId: "geometry"
    },
    equations: {
      title: "Gleichungen und Unbekannte",
      category: "Algebra",
      difficulty: "Mittel",
      summary: "Lerne, wie du die Unbekannte isolierst und dein Ergebnis sicher pruefst.",
      theory: [
        "Eine Gleichung ist ein Gleichgewicht zwischen zwei Ausdruecken.",
        "Du kannst auf beiden Seiten dieselbe Operation anwenden.",
        "Das Einsetzen bestaetigt das Ergebnis."
      ],
      exampleTitle: "Ausgearbeitetes Beispiel",
      formula: "x + a = b -> x = b - a",
      example: "Beispiel: Loese 3x + 5 = 23.",
      solution: "Loesung: 3x = 18, also x = 6. Probe: 3(6) + 5 = 23.",
      practice: [
        "Loese x + 9 = 17.",
        "Loese 4x = 28.",
        "Schreibe eine Gleichung fuer: eine Zahl plus 12 ist 31."
      ],
      challenge: "Loese 5(2x - 1) = 3x + 19 und erklaere jeden Schritt.",
      nextId: "fractions"
    },
    geometry: {
      title: "Geometrie Grundlagen",
      category: "Geometrie",
      difficulty: "Grundlage",
      summary: "Wiederhole Umfang, Flaeche, Formen und klares visuelles Begruenden.",
      theory: [
        "Der Umfang ist der Weg um eine Form herum.",
        "Die Flaeche misst den Platz innerhalb einer Form.",
        "Beim Rechteck gilt: Flaeche = Laenge x Breite."
      ],
      exampleTitle: "Ausgearbeitetes Beispiel",
      formula: "Flaeche Rechteck = Laenge x Breite",
      example: "Beispiel: Berechne die Flaeche eines Rechtecks mit 14 cm Laenge und 9 cm Breite.",
      solution: "Loesung: 14 x 9 = 126, also betraegt die Flaeche 126 cm2.",
      practice: [
        "Berechne den Umfang eines Rechtecks mit 6 cm und 4 cm.",
        "Berechne die Flaeche eines Quadrats mit Seite 8 cm.",
        "Vergleiche die Flaechen der Rechtecke 8 x 4 und 6 x 5."
      ],
      challenge: "Eine zusammengesetzte Form besteht aus zwei Rechtecken. Teile sie auf und berechne die Gesamtflaeche.",
      nextId: "equations"
    }
  }
};

function getStoredLocale() {
  const stored = localStorage.getItem("mathgenius-locale");
  if (stored && supportedLocales.includes(stored)) {
    return stored;
  }
  const htmlLang = document.documentElement.lang;
  if (htmlLang && supportedLocales.includes(htmlLang)) {
    return htmlLang;
  }
  return "en";
}

async function loadMessages(locale) {
  if (!messagesCache[locale]) {
    messagesCache[locale] = fetch(`/i18n/${locale}.json`).then((response) => response.json());
  }
  return messagesCache[locale];
}

function pickMessage(messages, fallback, key) {
  return messages?.[key] ?? fallback?.[key] ?? key;
}

function setActiveLocaleOption(locale) {
  document.querySelectorAll(".language-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === locale);
  });
}

function setActiveNav() {
  const current = document.body.dataset.nav;
  document.querySelectorAll(".nav a[data-nav-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.navLink === current);
  });
}

function renderTopic(locale, messages, fallback) {
  if (document.body.dataset.page !== "topic") {
    return;
  }

  const topicId = document.body.dataset.topicId;
  const topic = topics[locale]?.[topicId] ?? topics.en?.[topicId];

  const title = document.getElementById("topic-title");
  const summary = document.getElementById("topic-summary");
  const category = document.getElementById("topic-category");
  const difficulty = document.getElementById("topic-difficulty");
  const theory = document.getElementById("topic-theory");
  const exampleTitle = document.getElementById("topic-example-title");
  const formula = document.getElementById("topic-formula");
  const example = document.getElementById("topic-example");
  const solution = document.getElementById("topic-solution");
  const practice = document.getElementById("topic-practice");
  const challenge = document.getElementById("topic-challenge");
  const nextLink = document.getElementById("next-topic-link");

  if (!topic || !title || !summary || !category || !difficulty || !theory || !exampleTitle || !formula || !example || !solution || !practice || !challenge || !nextLink) {
    const missing = document.getElementById("topic-missing");
    if (missing) {
      missing.hidden = false;
      missing.textContent = pickMessage(messages, fallback, "topic.error.missing");
    }
    return;
  }

  title.textContent = topic.title;
  summary.textContent = topic.summary;
  category.textContent = topic.category;
  difficulty.textContent = topic.difficulty;
  exampleTitle.textContent = topic.exampleTitle;
  formula.textContent = topic.formula;
  example.textContent = topic.example;
  solution.textContent = topic.solution;
  challenge.textContent = topic.challenge;

  theory.innerHTML = "";
  topic.theory.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    theory.appendChild(li);
  });

  practice.innerHTML = "";
  topic.practice.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    practice.appendChild(li);
  });

  nextLink.href = `/learn/${topic.nextId}/`;
}

async function applyLocale(locale) {
  const messages = await loadMessages(locale);
  const fallback = locale === "en" ? messages : await loadMessages("en");

  document.documentElement.lang = locale;
  localStorage.setItem("mathgenius-locale", locale);

  const flag = document.getElementById("language-flag");
  if (flag) {
    flag.textContent = locale.toUpperCase();
  }

  const titleKey = document.body.dataset.pageTitleKey;
  if (titleKey) {
    document.title = pickMessage(messages, fallback, titleKey);
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key) {
      node.textContent = pickMessage(messages, fallback, key);
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.dataset.i18nHtml;
    if (key) {
      node.innerHTML = pickMessage(messages, fallback, key);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (key) {
      node.setAttribute("placeholder", pickMessage(messages, fallback, key));
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    if (key) {
      node.setAttribute("aria-label", pickMessage(messages, fallback, key));
    }
  });

  setActiveLocaleOption(locale);
  setActiveNav();
  renderTopic(locale, messages, fallback);
}

function initLanguagePicker() {
  const picker = document.getElementById("language-picker");
  const toggle = document.getElementById("language-toggle");
  const menu = document.getElementById("language-menu");

  if (!picker || !toggle || !menu) {
    return;
  }

  function closeMenu() {
    menu.hidden = true;
    picker.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    menu.hidden = false;
    picker.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", () => {
    if (menu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  document.querySelectorAll(".language-option").forEach((button) => {
    button.addEventListener("click", async () => {
      await applyLocale(button.dataset.lang || "en");
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

initLanguagePicker();
applyLocale(getStoredLocale());
