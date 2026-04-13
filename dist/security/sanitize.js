function stripUnsafeCharacters(value) {
    return value.replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}
export function sanitizeDisplayName(input) {
    return stripUnsafeCharacters(input).replace(/\s+/g, " ").slice(0, 40);
}
export function sanitizeEmail(input) {
    return stripUnsafeCharacters(input).toLowerCase().slice(0, 120);
}
export function sanitizeGradeBand(input) {
    return stripUnsafeCharacters(input).slice(0, 20);
}
export function sanitizeTopicSlug(input) {
    return stripUnsafeCharacters(input).toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
}
export function sanitizeFreeText(input, maxLength = 160) {
    return stripUnsafeCharacters(input).slice(0, maxLength);
}
export function sanitizeTopicSlugList(input) {
    if (!Array.isArray(input)) {
        return [];
    }
    return input
        .filter((item) => typeof item === "string")
        .map((item) => sanitizeTopicSlug(item))
        .filter(Boolean);
}
export function isReasonableEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isReasonablePassword(password) {
    return password.length >= 8 && password.length <= 128;
}
