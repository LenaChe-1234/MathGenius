function stripUnsafeCharacters(value: string): string {
  return value.replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

export function sanitizeDisplayName(input: string): string {
  return stripUnsafeCharacters(input).replace(/\s+/g, " ").slice(0, 40);
}

export function sanitizeEmail(input: string): string {
  return stripUnsafeCharacters(input).toLowerCase().slice(0, 120);
}

export function sanitizeGradeBand(input: string): string {
  return stripUnsafeCharacters(input).slice(0, 20);
}

export function sanitizeTopicSlug(input: string): string {
  return stripUnsafeCharacters(input).toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
}

export function sanitizeFreeText(input: string, maxLength = 160): string {
  return stripUnsafeCharacters(input).slice(0, maxLength);
}

export function sanitizeTopicSlugList(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((item): item is string => typeof item === "string")
    .map((item) => sanitizeTopicSlug(item))
    .filter(Boolean);
}

export function isReasonableEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isReasonablePassword(password: string): boolean {
  return password.length >= 8 && password.length <= 128;
}
