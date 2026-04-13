import { createHmac, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { getConfig } from "../config/env.js";
import type { Account, SafeAccount } from "../types/domain.js";

interface AuthTokenPayload {
  sub: string;
  email: string;
  exp: number;
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signPayload(payload: string): string {
  const secret = getConfig().authTokenSecret;
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function signValue(value: string): string {
  const secret = getConfig().authTokenSecret;
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string): boolean {
  const [scheme, salt, storedHash] = passwordHash.split(":");

  if (scheme !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const computedHash = scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(storedHash, "hex");

  if (computedHash.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(computedHash, storedBuffer);
}

export function createAuthToken(account: Pick<Account, "id" | "email">): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: account.id,
      email: account.email,
      exp: Math.floor(Date.now() / 1000) + getConfig().authTokenTtlSeconds
    } satisfies AuthTokenPayload)
  );

  const signature = signPayload(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(`${header}.${payload}`);

  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(base64UrlDecode(payload)) as AuthTokenPayload;

    if (parsedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsedPayload;
  } catch {
    return null;
  }
}

export function toSafeAccount(account: Account): SafeAccount {
  return {
    id: account.id,
    email: account.email,
    display_name: account.display_name,
    grade_band: account.grade_band,
    created_at: account.created_at
  };
}

export function createAccountId(): string {
  return randomUUID();
}

export function createPasswordResetCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function hashPasswordResetCode(email: string, code: string): string {
  return signValue(`${sanitizeResetEmail(email)}:${code}`);
}

export function verifyPasswordResetCode(email: string, code: string, codeHash: string): boolean {
  const expected = hashPasswordResetCode(email, code);
  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(codeHash, "hex");

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

function sanitizeResetEmail(email: string): string {
  return email.trim().toLowerCase();
}
