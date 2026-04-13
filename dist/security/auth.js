import { createHmac, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { getConfig } from "../config/env.js";
function base64UrlEncode(input) {
    return Buffer.from(input).toString("base64url");
}
function base64UrlDecode(input) {
    return Buffer.from(input, "base64url").toString("utf8");
}
function signPayload(payload) {
    const secret = getConfig().authTokenSecret;
    return createHmac("sha256", secret).update(payload).digest("base64url");
}
function signValue(value) {
    const secret = getConfig().authTokenSecret;
    return createHmac("sha256", secret).update(value).digest("hex");
}
export function hashPassword(password) {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return `scrypt:${salt}:${hash}`;
}
export function verifyPassword(password, passwordHash) {
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
export function createAuthToken(account) {
    const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = base64UrlEncode(JSON.stringify({
        sub: account.id,
        email: account.email,
        exp: Math.floor(Date.now() / 1000) + getConfig().authTokenTtlSeconds
    }));
    const signature = signPayload(`${header}.${payload}`);
    return `${header}.${payload}.${signature}`;
}
export function verifyAuthToken(token) {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        return null;
    }
    const expectedSignature = signPayload(`${header}.${payload}`);
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
        return null;
    }
    try {
        const parsedPayload = JSON.parse(base64UrlDecode(payload));
        if (parsedPayload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }
        return parsedPayload;
    }
    catch {
        return null;
    }
}
export function toSafeAccount(account) {
    return {
        id: account.id,
        email: account.email,
        display_name: account.display_name,
        grade_band: account.grade_band,
        created_at: account.created_at
    };
}
export function createAccountId() {
    return randomUUID();
}
export function createPasswordResetCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}
export function hashPasswordResetCode(email, code) {
    return signValue(`${sanitizeResetEmail(email)}:${code}`);
}
export function verifyPasswordResetCode(email, code, codeHash) {
    const expected = hashPasswordResetCode(email, code);
    const expectedBuffer = Buffer.from(expected, "hex");
    const actualBuffer = Buffer.from(codeHash, "hex");
    if (expectedBuffer.length !== actualBuffer.length) {
        return false;
    }
    return timingSafeEqual(expectedBuffer, actualBuffer);
}
function sanitizeResetEmail(email) {
    return email.trim().toLowerCase();
}
