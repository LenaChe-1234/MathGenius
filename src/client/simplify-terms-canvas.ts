type Language = "en" | "de";
type FeedbackStatus = "idle" | "correct" | "incorrect";

interface SimilarExample {
  question: string;
  answer: string;
}

interface CanvasTask {
  id: string;
  level: string;
  topic: string;
  instruction: string;
  question: string;
  acceptedAnswers: string[];
  canonicalAnswer: string;
  canonicalExpression: string;
  hint: string;
  steps: string[];
  commonMistakes: string[];
  similarExample: SimilarExample;
}

interface CanvasCopy {
  badge: string;
  title: string;
  description: string;
  progress: string;
  solved: string;
  task: string;
  of: string;
  instruction: string;
  expression: string;
  answerLabel: string;
  answerPlaceholder: string;
  examples: string;
  checkAnswer: string;
  showFullSolution: string;
  hideFullSolution: string;
  correctTitle: string;
  correctText: string;
  incorrectTitle: string;
  incorrectText: string;
  hint: string;
  stepByStep: string;
  commonMistakes: string;
  similarExample: string;
  expectedResult: string;
  fullSolution: string;
  finalAnswer: string;
  topicGoals: string;
  goals: string[];
  navigation: string;
  previous: string;
  next: string;
  resetTopic: string;
  taskOverview: string;
  solvedLabel: string;
  loading: string;
  loadError: string;
}

const copy: Record<Language, CanvasCopy> = {
  en: {
    badge: "Kurz Gymi • Canvas",
    title: "Vereinfache die Terme so weit wie möglich",
    description:
      "Practice simplifying expressions with brackets, products, fractions, and square roots. If the answer is wrong, the system explains the solution and suggests a similar example.",
    progress: "Progress",
    solved: "solved",
    task: "Task",
    of: "of",
    instruction: "Instruction",
    expression: "Expression",
    answerLabel: "Your answer",
    answerPlaceholder: "Enter the simplified expression",
    examples: "Examples: 8x - 7, 30x^2z, a - 2",
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
    loading: "Loading task canvas...",
    loadError: "The task canvas could not be loaded right now."
  },
  de: {
    badge: "Kurz Gymi • Canvas",
    title: "Vereinfache die Terme so weit wie möglich",
    description:
      "Übe Terme mit Klammern, Produkten, Brüchen und Wurzeln. Bei einer falschen Antwort zeigt das System zuerst einen Hinweis und dann eine passende Lösung.",
    progress: "Fortschritt",
    solved: "gelöst",
    task: "Aufgabe",
    of: "von",
    instruction: "Auftrag",
    expression: "Term",
    answerLabel: "Deine Antwort",
    answerPlaceholder: "Gib den vereinfachten Term ein",
    examples: "Beispiele: 8x - 7, 30x^2z, a - 2",
    checkAnswer: "Antwort prüfen",
    showFullSolution: "Ganze Lösung zeigen",
    hideFullSolution: "Ganze Lösung ausblenden",
    correctTitle: "Richtig",
    correctText: "Gut gemacht. Die vereinfachte Form ist",
    incorrectTitle: "Noch nicht ganz",
    incorrectText: "Gehen wir es Schritt für Schritt durch.",
    hint: "Hinweis",
    stepByStep: "Schrittweise Lösung",
    commonMistakes: "Häufige Fehler",
    similarExample: "Ähnliches Beispiel",
    expectedResult: "Erwartetes Ergebnis",
    fullSolution: "Vollständige Lösung",
    finalAnswer: "Endergebnis",
    topicGoals: "Ziele dieser Einheit",
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
    loading: "Canvas wird geladen...",
    loadError: "Der Aufgaben-Canvas konnte gerade nicht geladen werden."
  }
};

const taskCache = new Map<Language, CanvasTask[]>();
type SimplifyFunction = (expression: string) => { toString(): string };
let simplifyFunctionPromise: Promise<SimplifyFunction | null> | null = null;

function normalizeExpression(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/·/g, "*")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/−/g, "-")
    .replace(/,/g, ".")
    .replace(/√\(/g, "sqrt(")
    .replace(/√([a-z0-9]+)/gi, "sqrt($1)");
}

function mathEquivalent(left: string, right: string, simplifyFunction: SimplifyFunction | null): boolean {
  if (!simplifyFunction) {
    return false;
  }
  try {
    const normalizedLeft = normalizeExpression(left);
    const normalizedRight = normalizeExpression(right);
    const result = simplifyFunction(`(${normalizedLeft}) - (${normalizedRight})`).toString();
    return result === "0";
  } catch {
    return false;
  }
}

function isAnswerCorrect(input: string, task: CanvasTask, simplifyFunction: SimplifyFunction | null): boolean {
  const normalizedInput = normalizeExpression(input);
  const acceptedMatch = task.acceptedAnswers.some(
    (answer) => normalizeExpression(answer) === normalizedInput
  );

  return acceptedMatch || mathEquivalent(input, task.canonicalExpression, simplifyFunction);
}

async function loadTasks(language: Language): Promise<CanvasTask[]> {
  const cached = taskCache.get(language);
  if (cached) {
    return cached;
  }

  const response = await fetch(`/content/canvas/simplify-terms.${language}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load task canvas content for ${language}`);
  }

  const data = (await response.json()) as CanvasTask[];
  taskCache.set(language, data);
  return data;
}

export class SimplifyTermsCanvas {
  private root: HTMLElement;
  private language: Language = "en";
  private tasks: CanvasTask[] = [];
  private currentIndex = 0;
  private input = "";
  private status: FeedbackStatus = "idle";
  private attemptsById: Record<string, number> = {};
  private solvedIds: string[] = [];
  private showSolution = false;
  private mounted = false;
  private simplifyFunction: SimplifyFunction | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  async show(language: Language): Promise<void> {
    this.root.hidden = false;
    this.language = language;

    if (!this.mounted) {
      this.root.innerHTML = `<div class="canvas-loading">${copy[language].loading}</div>`;
    }

    try {
      const [tasks, simplifyFunction] = await Promise.all([loadTasks(language), loadSimplifyFunction()]);
      this.tasks = tasks;
      this.simplifyFunction = simplifyFunction;
      this.mounted = true;
      this.render();
    } catch {
      this.root.innerHTML = `<div class="canvas-error">${copy[language].loadError}</div>`;
    }
  }

  hide(): void {
    this.root.hidden = true;
  }

  private handleCheck(): void {
    const task = this.tasks[this.currentIndex];
    if (!task || !this.input.trim()) {
      return;
    }

    if (isAnswerCorrect(this.input, task, this.simplifyFunction)) {
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

  private resetTaskView(index: number): void {
    this.currentIndex = index;
    this.input = "";
    this.status = "idle";
    this.showSolution = false;
    this.render();
  }

  private resetTopic(): void {
    this.currentIndex = 0;
    this.input = "";
    this.status = "idle";
    this.attemptsById = {};
    this.solvedIds = [];
    this.showSolution = false;
    this.render();
  }

  private bindEvents(): void {
    const answerInput = this.root.querySelector<HTMLInputElement>("#canvas-answer");
    answerInput?.addEventListener("input", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        this.input = target.value;
      }
    });

    this.root.querySelector<HTMLButtonElement>("#canvas-check-button")?.addEventListener("click", () => {
      this.handleCheck();
    });

    this.root.querySelector<HTMLButtonElement>("#canvas-solution-button")?.addEventListener("click", () => {
      this.showSolution = !this.showSolution;
      this.render();
    });

    this.root.querySelector<HTMLButtonElement>("#canvas-prev-button")?.addEventListener("click", () => {
      if (this.currentIndex > 0) {
        this.resetTaskView(this.currentIndex - 1);
      }
    });

    this.root.querySelector<HTMLButtonElement>("#canvas-next-button")?.addEventListener("click", () => {
      if (this.currentIndex < this.tasks.length - 1) {
        this.resetTaskView(this.currentIndex + 1);
      }
    });

    this.root.querySelector<HTMLButtonElement>("#canvas-reset-button")?.addEventListener("click", () => {
      this.resetTopic();
    });

    this.root.querySelectorAll<HTMLButtonElement>("[data-canvas-task-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = Number(button.dataset.canvasTaskIndex);
        if (Number.isFinite(value)) {
          this.resetTaskView(value);
        }
      });
    });
  }

  private renderFeedback(task: CanvasTask, ui: CanvasCopy): string {
    if (this.status === "idle") {
      return "";
    }

    if (this.status === "correct") {
      return `
        <div class="canvas-feedback success">
          <h4>${ui.correctTitle}</h4>
          <p>${ui.correctText} <strong>${task.canonicalAnswer}</strong>.</p>
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
          <p>${task.hint}</p>
        </section>
        ${
          helpLevel !== "hint"
            ? `
          <section class="canvas-panel">
            <h5>${ui.stepByStep}</h5>
            <ol>${steps.map((step) => `<li>${step}</li>`).join("")}</ol>
          </section>
        `
            : ""
        }
        ${
          helpLevel === "full"
            ? `
          <section class="canvas-panel">
            <h5>${ui.commonMistakes}</h5>
            <ul>${task.commonMistakes.map((mistake) => `<li>${mistake}</li>`).join("")}</ul>
          </section>
          <section class="canvas-panel accent">
            <h5>${ui.similarExample}</h5>
            <p>${task.similarExample.question}</p>
            <p class="canvas-small">${ui.expectedResult}: ${task.similarExample.answer}</p>
          </section>
        `
            : ""
        }
      </div>
    `;
  }

  private render(): void {
    const task = this.tasks[this.currentIndex];
    if (!task) {
      return;
    }

    const ui = copy[this.language];
    const solvedCount = this.solvedIds.length;
    const percent = this.tasks.length === 0 ? 0 : Math.round((solvedCount / this.tasks.length) * 100);
    const attempts = this.attemptsById[task.id] ?? 0;

    this.root.innerHTML = `
      <div class="canvas-shell">
        <header class="canvas-header">
          <div>
            <span class="canvas-badge">${ui.badge}</span>
            <h3>${ui.title}</h3>
            <p>${ui.description}</p>
          </div>
          <div class="canvas-progress">
            <div class="canvas-progress-meta">
              <span>${ui.progress}</span>
              <span>${solvedCount}/${this.tasks.length} ${ui.solved}</span>
            </div>
            <div class="canvas-progress-bar">
              <span style="width:${percent}%"></span>
            </div>
          </div>
        </header>

        <div class="canvas-grid">
          <section class="canvas-main">
            <div class="canvas-task-head">
              <div>
                <p>${ui.task} ${this.currentIndex + 1} ${ui.of} ${this.tasks.length}</p>
                <h4>${task.topic}</h4>
              </div>
              <span class="canvas-level">${task.level}</span>
            </div>

            <div class="canvas-block">
              <p class="canvas-label">${ui.instruction}</p>
              <p>${task.instruction}</p>
            </div>

            <div class="canvas-expression">
              <p class="canvas-label">${ui.expression}</p>
              <div>${task.question}</div>
            </div>

            <div class="canvas-block">
              <label class="canvas-label" for="canvas-answer">${ui.answerLabel}</label>
              <input id="canvas-answer" class="canvas-input" type="text" value="${escapeHtml(this.input)}" placeholder="${ui.answerPlaceholder}" />
              <p class="canvas-small">${ui.examples}</p>
            </div>

            <div class="canvas-actions">
              <button class="primary-button" id="canvas-check-button" type="button">${ui.checkAnswer}</button>
              <button class="secondary-button" id="canvas-solution-button" type="button">${this.showSolution ? ui.hideFullSolution : ui.showFullSolution}</button>
            </div>

            ${this.renderFeedback(task, ui)}

            ${
              this.showSolution
                ? `
              <section class="canvas-solution">
                <h4>${ui.fullSolution}</h4>
                <ol>${task.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
                <div class="canvas-final">${ui.finalAnswer}: <strong>${task.canonicalAnswer}</strong></div>
              </section>
            `
                : ""
            }
          </section>

          <aside class="canvas-sidebar">
            <section class="canvas-side-card">
              <h4>${ui.topicGoals}</h4>
              <ul>${ui.goals.map((goal) => `<li>${goal}</li>`).join("")}</ul>
            </section>

            <section class="canvas-side-card">
              <h4>${ui.navigation}</h4>
              <div class="canvas-nav-buttons">
                <button class="secondary-button" id="canvas-prev-button" type="button" ${this.currentIndex === 0 ? "disabled" : ""}>${ui.previous}</button>
                <button class="secondary-button" id="canvas-next-button" type="button" ${this.currentIndex === this.tasks.length - 1 ? "disabled" : ""}>${ui.next}</button>
                <button class="primary-button" id="canvas-reset-button" type="button">${ui.resetTopic}</button>
              </div>
            </section>

            <section class="canvas-side-card">
              <h4>${ui.taskOverview}</h4>
              <div class="canvas-overview">
                ${this.tasks
                  .map((item, index) => {
                    const solved = this.solvedIds.includes(item.id);
                    const active = item.id === task.id;
                    const label = solved ? ui.solvedLabel : item.level;
                    return `
                      <button
                        class="canvas-overview-item${active ? " active" : ""}"
                        type="button"
                        data-canvas-task-index="${index}"
                      >
                        <div>
                          <strong>${ui.task} ${index + 1}</strong>
                          <span>${item.topic}</span>
                        </div>
                        <span class="canvas-pill${solved ? " solved" : ""}${active ? " active" : ""}">${label}</span>
                      </button>
                    `;
                  })
                  .join("")}
              </div>
            </section>
          </aside>
        </div>
      </div>
    `;

    if (attempts > 0 && this.status === "incorrect") {
      this.root.querySelector<HTMLInputElement>("#canvas-answer")?.focus();
    }

    this.bindEvents();
  }
}

async function loadSimplifyFunction(): Promise<SimplifyFunction | null> {
  if (!simplifyFunctionPromise) {
    // @ts-expect-error No declaration file exists for this browser import path.
    simplifyFunctionPromise = import("../../node_modules/mathjs/lib/esm/index.js")
      .then((module) => {
        const maybeSimplify = (module as { simplify?: SimplifyFunction }).simplify;
        return typeof maybeSimplify === "function" ? maybeSimplify : null;
      })
      .catch(() => null);
  }

  return simplifyFunctionPromise;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
