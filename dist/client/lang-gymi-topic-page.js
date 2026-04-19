import { formatMathText, normalizeMathInput } from "./math-text.js";
const TASKS = [
    {
        id: "simplify-1",
        level: "Easy",
        topic: "Expand brackets",
        instruction: "Vereinfache die Terme so weit wie möglich.",
        question: "2(x - 2) - 3(1 - 2x)",
        acceptedAnswers: ["8x-7", "8*x-7", "-7+8x", "8x + -7"],
        canonicalAnswer: "8x - 7",
        hint: "Open both brackets carefully. Watch the minus sign before 3(1 - 2x).",
        steps: [
            "Expand the first bracket: 2(x - 2) = 2x - 4.",
            "Expand the second bracket: -3(1 - 2x) = -3 + 6x.",
            "Combine all parts: 2x - 4 - 3 + 6x.",
            "Group like terms: 2x + 6x = 8x and -4 - 3 = -7.",
            "Final answer: 8x - 7."
        ],
        commonMistakes: [
            "Forgetting to change signs when multiplying by -3.",
            "Combining 2x and 6x incorrectly.",
            "Leaving the answer as 2x - 4 - 3 + 6x without simplifying."
        ],
        similarExample: {
            question: "3(x - 1) - 2(2 - x)",
            answer: "5x - 7"
        }
    },
    {
        id: "simplify-2",
        level: "Easy",
        topic: "Multiply factors",
        instruction: "Vereinfache die Terme so weit wie möglich.",
        question: "2x · (3x · 5z)",
        acceptedAnswers: ["30x^2z", "30x²z", "30*x^2*z", "30z*x^2"],
        canonicalAnswer: "30x²z",
        hint: "Multiply the numbers first, then combine the variables.",
        steps: [
            "Multiply the numbers: 2 · 3 · 5 = 30.",
            "Multiply the variables: x · x = x².",
            "Keep z as it is: z.",
            "Final answer: 30x²z."
        ],
        commonMistakes: [
            "Writing x · x as 2x instead of x².",
            "Forgetting the variable z.",
            "Multiplying the coefficients incorrectly."
        ],
        similarExample: {
            question: "4a · (2a · 3b)",
            answer: "24a²b"
        }
    },
    {
        id: "simplify-3",
        level: "Medium",
        topic: "Fractions",
        instruction: "Vereinfache den Term so weit wie möglich.",
        question: "((18a - 14a) / 6) · ((6a - 12) / (4a))",
        acceptedAnswers: ["a-2", "-2+a", "a + -2"],
        canonicalAnswer: "a - 2",
        hint: "First simplify each bracket. Then reduce common factors before expanding.",
        steps: [
            "Simplify the first numerator: 18a - 14a = 4a.",
            "Now the term is (4a / 6) · ((6a - 12) / 4a).",
            "Reduce the common factor 4a in numerator and denominator.",
            "This leaves (1 / 6)(6a - 12).",
            "Distribute 1/6: 6a/6 - 12/6 = a - 2.",
            "Final answer: a - 2."
        ],
        commonMistakes: [
            "Not simplifying 18a - 14a first.",
            "Trying to cancel terms inside a sum incorrectly.",
            "Forgetting that 12/6 = 2."
        ],
        similarExample: {
            question: "((12x - 8x) / 4) · ((8x - 16) / (4x))",
            answer: "2x - 4"
        }
    },
    {
        id: "simplify-4",
        level: "Hard",
        topic: "Combine square roots",
        instruction: "Vereinfache den Term so weit wie möglich.",
        question: "√(49x² + (4x)² + (-4x)²) - √(2x) · √(18x)",
        acceptedAnswers: ["x", "1x"],
        canonicalAnswer: "x",
        hint: "Simplify inside the first root first. Then use √a · √b = √(ab).",
        steps: [
            "Compute the squares inside the first root: 49x² + 16x² + 16x² = 81x².",
            "So the first part becomes √(81x²) = 9x (in this school context we simplify to 9x).",
            "Combine the second part: √(2x) · √(18x) = √(36x²) = 6x.",
            "Subtract: 9x - 6x = x.",
            "Final answer: x."
        ],
        commonMistakes: [
            "Forgetting that (−4x)² is positive 16x².",
            "Not combining roots before simplifying.",
            "Making an arithmetic error with 49 + 16 + 16."
        ],
        similarExample: {
            question: "√(25y² + (2y)² + (-2y)²) - √(3y) · √(12y)",
            answer: "y"
        }
    }
];
const copy = {
    en: {
        badge: "Lang Gymi • Topic 1",
        title: "Vereinfache die Terme so weit wie möglich",
        description: "Practice simplifying expressions with brackets, products, fractions, and square roots. If the answer is wrong, the system explains the solution and suggests a similar example.",
        progress: "Progress",
        solved: "solved",
        task: "Task",
        of: "of",
        instruction: "Instruction",
        expression: "Expression",
        answerLabel: "Your answer",
        answerPlaceholder: "Enter the simplified expression",
        examples: "Examples: 8x - 7, 30x²z, a - 2",
        checkAnswer: "Check answer",
        showFullSolution: "Show full solution",
        hideFullSolution: "Hide full solution",
        correctTitle: "Correct",
        correctText: "Great job. The simplified form is",
        incorrectTitle: "Not quite right",
        incorrectText: "Let's work through it step by step.",
        hint: "Hint",
        stepByStep: "Step-by-step solution",
        commonMistakes: "Common mistakes",
        similarExample: "Try a similar example",
        expectedResult: "Expected result",
        fullSolution: "Full solution",
        finalAnswer: "Final answer",
        topicGoals: "Topic goals",
        goals: [
            "Open brackets correctly",
            "Multiply factors and combine variables",
            "Simplify fractional expressions",
            "Reduce square roots in algebraic expressions"
        ],
        navigation: "Navigation",
        previous: "Previous",
        next: "Next",
        resetTopic: "Reset topic",
        taskOverview: "Task overview",
        solvedLabel: "Solved",
        backToLang: "Back to Langgymi"
    },
    de: {
        badge: "Lang Gymi • Thema 1",
        title: "Vereinfache die Terme so weit wie möglich",
        description: "Übe Terme mit Klammern, Produkten, Brüchen und Wurzeln. Bei einer falschen Antwort zeigt das System die Lösung Schritt für Schritt und schlägt ein ähnliches Beispiel vor.",
        progress: "Fortschritt",
        solved: "gelöst",
        task: "Aufgabe",
        of: "von",
        instruction: "Auftrag",
        expression: "Term",
        answerLabel: "Deine Antwort",
        answerPlaceholder: "Gib den vereinfachten Term ein",
        examples: "Beispiele: 8x - 7, 30x²z, a - 2",
        checkAnswer: "Antwort prüfen",
        showFullSolution: "Ganze Lösung zeigen",
        hideFullSolution: "Ganze Lösung ausblenden",
        correctTitle: "Richtig",
        correctText: "Gut gemacht. Die vereinfachte Form ist",
        incorrectTitle: "Noch nicht richtig",
        incorrectText: "Gehen wir es Schritt für Schritt durch.",
        hint: "Hinweis",
        stepByStep: "Schrittweise Lösung",
        commonMistakes: "Häufige Fehler",
        similarExample: "Ähnliches Beispiel",
        expectedResult: "Erwartetes Ergebnis",
        fullSolution: "Vollständige Lösung",
        finalAnswer: "Endergebnis",
        topicGoals: "Ziele dieses Themas",
        goals: [
            "Klammern sicher ausmultiplizieren",
            "Faktoren und Variablen richtig zusammenfassen",
            "Bruchterme vereinfachen",
            "Wurzeln in algebraischen Termen reduzieren"
        ],
        navigation: "Navigation",
        previous: "Zurück",
        next: "Weiter",
        resetTopic: "Thema zurücksetzen",
        taskOverview: "Aufgabenübersicht",
        solvedLabel: "Gelöst",
        backToLang: "Zurück zu Langgymi"
    }
};
function isAnswerCorrect(input, task) {
    const normalizedInput = normalizeMathInput(input);
    return task.acceptedAnswers.some((answer) => normalizeMathInput(answer) === normalizedInput);
}
export class LangGymiTopicPage {
    root;
    onBack;
    language = "de";
    currentIndex = 0;
    input = "";
    status = "idle";
    attemptsById = {};
    solvedIds = [];
    showSolution = false;
    constructor(root, onBack) {
        this.root = root;
        this.onBack = onBack;
    }
    show(language) {
        this.root.hidden = false;
        this.language = language;
        this.render();
    }
    hide() {
        this.root.hidden = true;
    }
    resetTaskView(index) {
        this.currentIndex = index;
        this.input = "";
        this.status = "idle";
        this.showSolution = false;
        this.render();
    }
    resetTopic() {
        this.currentIndex = 0;
        this.input = "";
        this.status = "idle";
        this.attemptsById = {};
        this.solvedIds = [];
        this.showSolution = false;
        this.render();
    }
    handleCheck() {
        const task = TASKS[this.currentIndex];
        if (!task || !this.input.trim()) {
            return;
        }
        if (isAnswerCorrect(this.input, task)) {
            this.status = "correct";
            this.showSolution = false;
            if (!this.solvedIds.includes(task.id)) {
                this.solvedIds = [...this.solvedIds, task.id];
            }
            this.render();
            return;
        }
        this.status = "incorrect";
        this.attemptsById = {
            ...this.attemptsById,
            [task.id]: (this.attemptsById[task.id] ?? 0) + 1
        };
        this.render();
    }
    bindEvents() {
        this.root.querySelector("#lang-topic-answer")?.addEventListener("input", (event) => {
            const target = event.target;
            if (target instanceof HTMLInputElement) {
                this.input = target.value;
            }
        });
        this.root.querySelector("#lang-topic-back-button")?.addEventListener("click", () => {
            this.onBack();
        });
        this.root.querySelector("#lang-topic-check-button")?.addEventListener("click", () => {
            this.handleCheck();
        });
        this.root.querySelector("#lang-topic-solution-button")?.addEventListener("click", () => {
            this.showSolution = !this.showSolution;
            this.render();
        });
        this.root.querySelector("#lang-topic-prev-button")?.addEventListener("click", () => {
            if (this.currentIndex > 0) {
                this.resetTaskView(this.currentIndex - 1);
            }
        });
        this.root.querySelector("#lang-topic-next-button")?.addEventListener("click", () => {
            if (this.currentIndex < TASKS.length - 1) {
                this.resetTaskView(this.currentIndex + 1);
            }
        });
        this.root.querySelector("#lang-topic-reset-button")?.addEventListener("click", () => {
            this.resetTopic();
        });
        this.root.querySelectorAll("[data-lang-task-index]").forEach((button) => {
            button.addEventListener("click", () => {
                const value = Number(button.dataset.langTaskIndex);
                if (Number.isFinite(value)) {
                    this.resetTaskView(value);
                }
            });
        });
    }
    renderFeedback(task, ui) {
        if (this.status === "idle") {
            return "";
        }
        if (this.status === "correct") {
            return `
        <div class="canvas-feedback success">
          <h4>${ui.correctTitle}</h4>
          <p>${ui.correctText} <strong>${escapeHtml(formatMathText(task.canonicalAnswer))}</strong>.</p>
        </div>
      `;
        }
        const attempts = this.attemptsById[task.id] ?? 0;
        const helpLevel = attempts === 1 ? "hint" : attempts === 2 ? "partial" : "full";
        const steps = helpLevel === "partial" ? task.steps.slice(0, 2) : task.steps;
        return `
      <div class="canvas-feedback warning">
        <div>
          <h4>${ui.incorrectTitle}</h4>
          <p>${ui.incorrectText}</p>
        </div>
        <section class="canvas-panel">
          <h5>${ui.hint}</h5>
          <p>${escapeHtml(formatMathText(task.hint))}</p>
        </section>
        ${helpLevel !== "hint"
            ? `
            <section class="canvas-panel">
              <h5>${ui.stepByStep}</h5>
              <ol>${steps.map((step) => `<li>${escapeHtml(formatMathText(step))}</li>`).join("")}</ol>
            </section>
          `
            : ""}
        ${helpLevel === "full"
            ? `
            <section class="canvas-panel">
              <h5>${ui.commonMistakes}</h5>
              <ul>${task.commonMistakes.map((mistake) => `<li>${escapeHtml(formatMathText(mistake))}</li>`).join("")}</ul>
            </section>
            <section class="canvas-panel accent">
              <h5>${ui.similarExample}</h5>
              <p>${escapeHtml(formatMathText(task.similarExample.question))}</p>
              <p class="canvas-small">${ui.expectedResult}: ${escapeHtml(formatMathText(task.similarExample.answer))}</p>
            </section>
          `
            : ""}
      </div>
    `;
    }
    render() {
        const ui = copy[this.language];
        const task = TASKS[this.currentIndex];
        if (!task) {
            return;
        }
        const solvedCount = this.solvedIds.length;
        const percent = Math.round((solvedCount / TASKS.length) * 100);
        this.root.innerHTML = `
      <div class="canvas-shell">
        <header class="canvas-header">
          <div>
            <span class="canvas-badge">${ui.badge}</span>
            <h3>${ui.title}</h3>
            <p>${ui.description}</p>
          </div>
          <div class="lang-topic-header-actions">
            <button class="secondary-button" id="lang-topic-back-button" type="button">${ui.backToLang}</button>
            <div class="canvas-progress">
              <div class="canvas-progress-meta">
                <span>${ui.progress}</span>
                <span>${solvedCount}/${TASKS.length} ${ui.solved}</span>
              </div>
              <div class="canvas-progress-bar">
                <span style="width:${percent}%"></span>
              </div>
            </div>
          </div>
        </header>

        <div class="canvas-grid">
          <section class="canvas-main">
            <div class="canvas-task-head">
              <div>
                <p>${ui.task} ${this.currentIndex + 1} ${ui.of} ${TASKS.length}</p>
                <h4>${escapeHtml(formatMathText(task.topic))}</h4>
              </div>
              <span class="canvas-level">${task.level}</span>
            </div>

            <div class="canvas-block">
              <p class="canvas-label">${ui.instruction}</p>
              <p>${escapeHtml(formatMathText(task.instruction))}</p>
            </div>

            <div class="canvas-expression">
              <p class="canvas-label">${ui.expression}</p>
              <div>${escapeHtml(formatMathText(task.question))}</div>
            </div>

            <div class="canvas-block">
              <label class="canvas-label" for="lang-topic-answer">${ui.answerLabel}</label>
              <input id="lang-topic-answer" class="canvas-input" type="text" value="${escapeHtml(this.input)}" placeholder="${ui.answerPlaceholder}" />
              <p class="canvas-small">${ui.examples}</p>
            </div>

            <div class="canvas-actions">
              <button class="primary-button" id="lang-topic-check-button" type="button">${ui.checkAnswer}</button>
              <button class="secondary-button" id="lang-topic-solution-button" type="button">${this.showSolution ? ui.hideFullSolution : ui.showFullSolution}</button>
            </div>

            ${this.renderFeedback(task, ui)}

            ${this.showSolution
            ? `
                <section class="canvas-solution">
                  <h4>${ui.fullSolution}</h4>
                  <ol>${task.steps.map((step) => `<li>${escapeHtml(formatMathText(step))}</li>`).join("")}</ol>
                  <div class="canvas-final">${ui.finalAnswer}: <strong>${escapeHtml(formatMathText(task.canonicalAnswer))}</strong></div>
                </section>
              `
            : ""}
          </section>

          <aside class="canvas-sidebar">
            <section class="canvas-side-card">
              <h4>${ui.topicGoals}</h4>
              <ul>${ui.goals.map((goal) => `<li>${goal}</li>`).join("")}</ul>
            </section>

            <section class="canvas-side-card">
              <h4>${ui.navigation}</h4>
              <div class="canvas-nav-buttons">
                <button class="secondary-button" id="lang-topic-prev-button" type="button" ${this.currentIndex === 0 ? "disabled" : ""}>${ui.previous}</button>
                <button class="secondary-button" id="lang-topic-next-button" type="button" ${this.currentIndex === TASKS.length - 1 ? "disabled" : ""}>${ui.next}</button>
                <button class="primary-button" id="lang-topic-reset-button" type="button">${ui.resetTopic}</button>
              </div>
            </section>

            <section class="canvas-side-card">
              <h4>${ui.taskOverview}</h4>
              <div class="canvas-overview">
                ${TASKS.map((item, index) => {
            const solved = this.solvedIds.includes(item.id);
            const active = item.id === task.id;
            const label = solved ? ui.solvedLabel : item.level;
            return `
                    <button class="canvas-overview-item${active ? " active" : ""}" type="button" data-lang-task-index="${index}">
                      <div>
                        <strong>${ui.task} ${index + 1}</strong>
                        <span>${escapeHtml(formatMathText(item.topic))}</span>
                      </div>
                      <span class="canvas-pill${solved ? " solved" : ""}${active ? " active" : ""}">${label}</span>
                    </button>
                  `;
        }).join("")}
              </div>
            </section>
          </aside>
        </div>
      </div>
    `;
        this.bindEvents();
    }
}
function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
