const superscriptMap = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "+": "⁺",
    "-": "⁻",
    "=": "⁼",
    "(": "⁽",
    ")": "⁾"
};
const reverseSuperscriptMap = Object.fromEntries(Object.entries(superscriptMap).map(([key, value]) => [value, key]));
const vulgarFractions = {
    "½": "(1/2)",
    "⅓": "(1/3)",
    "⅔": "(2/3)",
    "¼": "(1/4)",
    "¾": "(3/4)",
    "⅕": "(1/5)",
    "⅖": "(2/5)",
    "⅗": "(3/5)",
    "⅘": "(4/5)",
    "⅙": "(1/6)",
    "⅚": "(5/6)",
    "⅛": "(1/8)",
    "⅜": "(3/8)",
    "⅝": "(5/8)",
    "⅞": "(7/8)"
};
export function formatMathText(value) {
    return value
        .replace(/sqrt\(([^)]+)\)/gi, "√($1)")
        .replace(/sqrt([a-z0-9]+)/gi, "√$1")
        .replace(/->/g, "→")
        .replace(/>=/g, "≥")
        .replace(/<=/g, "≤")
        .replace(/!=/g, "≠")
        .replace(/\*/g, "·")
        .replace(/(?<=[\w)\]])\/(?=[\w([])/g, "⁄")
        .replace(/\^([+-]?\d+)/g, (_match, exponent) => exponentToSuperscript(exponent))
        .replace(/-/g, "−");
}
export function normalizeMathInput(value) {
    const superscriptNormalized = replaceSuperscriptRuns(value);
    return superscriptNormalized
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[·×∙•]/g, "*")
        .replace(/[÷⁄]/g, "/")
        .replace(/−/g, "-")
        .replace(/,/g, ".")
        .replace(/[﹙［{]/g, "(")
        .replace(/[﹚］}]/g, ")")
        .replace(/√\(/g, "sqrt(")
        .replace(/√([a-z0-9]+)/gi, "sqrt($1)")
        .replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, (match) => vulgarFractions[match] ?? match);
}
function exponentToSuperscript(exponent) {
    return exponent
        .split("")
        .map((character) => superscriptMap[character] ?? character)
        .join("");
}
function replaceSuperscriptRuns(value) {
    return value.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾]+/g, (match, offset, source) => {
        const previousCharacter = source[offset - 1] ?? "";
        const normalized = match
            .split("")
            .map((character) => reverseSuperscriptMap[character] ?? character)
            .join("");
        return /[a-z0-9)\]]/i.test(previousCharacter) ? `^${normalized}` : normalized;
    });
}
