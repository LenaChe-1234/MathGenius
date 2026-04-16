import cors from "cors";
import express from "express";
import { getConfig } from "./config/env.js";
import { createMongoDatabase, createPostgresPool } from "./db/providers.js";
import { createAuthToken, createPasswordResetCode, hashPassword, hashPasswordResetCode, toSafeAccount, verifyAuthToken, verifyPassword, verifyPasswordResetCode } from "./security/auth.js";
import { isReasonableEmail, isReasonablePassword, sanitizeDisplayName, sanitizeEmail, sanitizeFreeText, sanitizeGradeBand, sanitizeTopicSlug, sanitizeTopicSlugList } from "./security/sanitize.js";
import { createInMemoryStore } from "./store/in-memory-store.js";
import { createMongoStore } from "./store/mongo-store.js";
import { createPostgresStore } from "./store/postgres-store.js";
async function createStore() {
    const config = getConfig();
    switch (config.dbProvider) {
        case "postgres":
            return createPostgresStore(createPostgresPool());
        case "mongo": {
            const mongo = await createMongoDatabase();
            return createMongoStore(mongo.db);
        }
        case "memory":
        default:
            return createInMemoryStore();
    }
}
export async function createApp() {
    const store = await createStore();
    const app = express();
    const passwordResetTtlMs = 1000 * 60 * 15;
    async function resolveAuthenticatedAccount(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return null;
        }
        const token = authHeader.slice("Bearer ".length).trim();
        const payload = verifyAuthToken(token);
        if (!payload) {
            return null;
        }
        return store.getAccountById(payload.sub);
    }
    function sendPasswordResetCodeEmail(email, code) {
        console.log(`[MathGenius] Password reset code for ${email}: ${code}`);
    }
    function sendEmailChangeCodeEmail(currentEmail, nextEmail, code) {
        console.log(`[MathGenius] Email change code sent to ${currentEmail} for new email ${nextEmail}: ${code}`);
    }
    app.use(cors());
    app.use(express.json());
    app.use(express.static("."));
    app.get("/api/health", async (_req, res) => {
        try {
            const health = await store.health();
            res.json({
                ok: true,
                database: health.mode,
                timestamp: new Date().toISOString()
            });
        }
        catch {
            res.status(500).json({
                ok: false,
                error: "Database health check failed"
            });
        }
    });
    app.get("/api/topics", async (_req, res) => {
        res.json(await store.listTopics());
    });
    app.get("/api/topics/:slug", async (req, res) => {
        const topic = await store.getTopicBySlug(req.params.slug);
        if (!topic) {
            res.status(404).json({ error: "Topic not found" });
            return;
        }
        res.json(topic);
    });
    app.get("/api/gymi/tracks", async (_req, res) => {
        res.json(await store.listGymiTracks());
    });
    app.get("/api/gymi/mock-exams", async (_req, res) => {
        res.json(await store.listMockExams());
    });
    app.post("/api/auth/register", async (req, res) => {
        const email = sanitizeEmail(String(req.body?.email ?? ""));
        const password = String(req.body?.password ?? "");
        const rawDisplayName = sanitizeDisplayName(String(req.body?.displayName ?? ""));
        const displayName = rawDisplayName || email.split("@")[0]?.replace(/[._-]+/g, " ").trim().slice(0, 40) || "Learner";
        const gradeBand = sanitizeGradeBand(String(req.body?.gradeBand ?? "")) || "5-6";
        if (!isReasonableEmail(email) || !isReasonablePassword(password)) {
            res.status(400).json({
                error: "Valid email and password are required"
            });
            return;
        }
        const existingAccount = await store.getAccountByEmail(email);
        if (existingAccount) {
            res.status(409).json({
                error: "An account with this email already exists"
            });
            return;
        }
        const account = await store.createAccount({
            email,
            displayName,
            gradeBand,
            passwordHash: hashPassword(password)
        });
        await store.addActivity({
            studentId: account.id,
            activityType: "auth.register",
            metadata: { gradeBand: account.grade_band }
        });
        res.status(201).json({
            token: createAuthToken(account),
            account: toSafeAccount(account)
        });
    });
    app.post("/api/auth/login", async (req, res) => {
        const email = sanitizeEmail(String(req.body?.email ?? ""));
        const password = String(req.body?.password ?? "");
        if (!isReasonableEmail(email) || !password) {
            res.status(400).json({
                error: "Email and password are required"
            });
            return;
        }
        const account = await store.getAccountByEmail(email);
        if (!account || !verifyPassword(password, account.password_hash)) {
            res.status(401).json({
                error: "Invalid credentials"
            });
            return;
        }
        await store.addActivity({
            studentId: account.id,
            activityType: "auth.login",
            metadata: { success: true }
        });
        res.json({
            token: createAuthToken(account),
            account: toSafeAccount(account)
        });
    });
    app.post("/api/auth/password-reset/request", async (req, res) => {
        const email = sanitizeEmail(String(req.body?.email ?? ""));
        if (!isReasonableEmail(email)) {
            res.status(400).json({
                error: "A valid email is required"
            });
            return;
        }
        const account = await store.getAccountByEmail(email);
        if (account) {
            const code = createPasswordResetCode();
            const challenge = await store.createPasswordResetChallenge({
                accountId: account.id,
                email,
                codeHash: hashPasswordResetCode(email, code),
                expiresAt: new Date(Date.now() + passwordResetTtlMs).toISOString()
            });
            await store.addActivity({
                studentId: account.id,
                activityType: "auth.password_reset_requested",
                metadata: { challengeId: challenge.id }
            });
            sendPasswordResetCodeEmail(email, code);
        }
        res.json({
            ok: true,
            message: "If an account exists for this email, a confirmation code has been sent."
        });
    });
    app.post("/api/auth/password-reset/confirm", async (req, res) => {
        const email = sanitizeEmail(String(req.body?.email ?? ""));
        const code = sanitizeFreeText(String(req.body?.code ?? ""), 12);
        const newPassword = String(req.body?.newPassword ?? "");
        if (!isReasonableEmail(email) || !code || !isReasonablePassword(newPassword)) {
            res.status(400).json({
                error: "Valid email, confirmation code, and new password are required"
            });
            return;
        }
        const account = await store.getAccountByEmail(email);
        const challenge = await store.getActivePasswordResetChallengeByEmail(email);
        if (!account || !challenge || challenge.account_id !== account.id) {
            res.status(400).json({
                error: "The confirmation code is invalid or expired"
            });
            return;
        }
        const matches = verifyPasswordResetCode(email, code, challenge.code_hash);
        if (!matches) {
            res.status(400).json({
                error: "The confirmation code is invalid or expired"
            });
            return;
        }
        await store.updateAccountPassword(account.id, hashPassword(newPassword));
        await store.consumePasswordResetChallenge(challenge.id);
        await store.addActivity({
            studentId: account.id,
            activityType: "auth.password_reset_completed",
            metadata: { challengeId: challenge.id }
        });
        res.json({
            ok: true,
            message: "Password updated successfully."
        });
    });
    app.get("/api/auth/me", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        res.json({ account: toSafeAccount(account) });
    });
    app.post("/api/me/password", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const currentPassword = String(req.body?.currentPassword ?? "");
        const newPassword = String(req.body?.newPassword ?? "");
        if (!currentPassword || !isReasonablePassword(newPassword)) {
            res.status(400).json({
                error: "Current password and a valid new password are required"
            });
            return;
        }
        if (!verifyPassword(currentPassword, account.password_hash)) {
            res.status(401).json({
                error: "Current password is incorrect"
            });
            return;
        }
        await store.updateAccountPassword(account.id, hashPassword(newPassword));
        await store.addActivity({
            studentId: account.id,
            activityType: "auth.password_changed"
        });
        res.json({
            ok: true,
            message: "Password updated successfully."
        });
    });
    app.post("/api/me/email-change/request", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const nextEmail = sanitizeEmail(String(req.body?.newEmail ?? ""));
        if (!isReasonableEmail(nextEmail)) {
            res.status(400).json({
                error: "A valid new email is required"
            });
            return;
        }
        if (nextEmail === account.email) {
            res.status(400).json({
                error: "The new email must be different from the current email"
            });
            return;
        }
        const existingAccount = await store.getAccountByEmail(nextEmail);
        if (existingAccount) {
            res.status(409).json({
                error: "An account with this email already exists"
            });
            return;
        }
        const code = createPasswordResetCode();
        const challenge = await store.createEmailChangeChallenge({
            accountId: account.id,
            currentEmail: account.email,
            nextEmail,
            codeHash: hashPasswordResetCode(account.email, code),
            expiresAt: new Date(Date.now() + passwordResetTtlMs).toISOString()
        });
        await store.addActivity({
            studentId: account.id,
            activityType: "auth.email_change_requested",
            metadata: {
                challengeId: challenge.id,
                currentEmail: account.email,
                nextEmail
            }
        });
        sendEmailChangeCodeEmail(account.email, nextEmail, code);
        res.json({
            ok: true,
            message: "A confirmation code has been sent to your current email."
        });
    });
    app.post("/api/me/email-change/confirm", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const nextEmail = sanitizeEmail(String(req.body?.newEmail ?? ""));
        const code = sanitizeFreeText(String(req.body?.code ?? ""), 12);
        if (!isReasonableEmail(nextEmail) || !code) {
            res.status(400).json({
                error: "A valid new email and confirmation code are required"
            });
            return;
        }
        const challenge = await store.getActiveEmailChangeChallenge(account.id, nextEmail);
        if (!challenge || challenge.current_email !== account.email) {
            res.status(400).json({
                error: "The confirmation code is invalid or expired"
            });
            return;
        }
        const existingAccount = await store.getAccountByEmail(nextEmail);
        if (existingAccount && existingAccount.id !== account.id) {
            res.status(409).json({
                error: "An account with this email already exists"
            });
            return;
        }
        const matches = verifyPasswordResetCode(account.email, code, challenge.code_hash);
        if (!matches) {
            res.status(400).json({
                error: "The confirmation code is invalid or expired"
            });
            return;
        }
        await store.updateAccountEmail(account.id, nextEmail);
        await store.consumeEmailChangeChallenge(challenge.id);
        const updatedAccount = await store.getAccountById(account.id);
        if (!updatedAccount) {
            res.status(500).json({ error: "Account update failed" });
            return;
        }
        await store.addActivity({
            studentId: updatedAccount.id,
            activityType: "auth.email_changed",
            metadata: {
                previousEmail: account.email,
                nextEmail
            }
        });
        res.json({
            ok: true,
            message: "Email updated successfully.",
            token: createAuthToken(updatedAccount),
            account: toSafeAccount(updatedAccount)
        });
    });
    app.get("/api/me/plan", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const plan = await store.getStudyPlan(account.id);
        res.json(plan ?? { student_id: account.id, topic_slugs: [] });
    });
    app.post("/api/me/plan", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const goal = sanitizeFreeText(String(req.body?.goal ?? ""), 80);
        const gradeBand = sanitizeGradeBand(String(req.body?.gradeBand ?? ""));
        const intensity = sanitizeFreeText(String(req.body?.intensity ?? ""), 40);
        const topicSlugs = sanitizeTopicSlugList(req.body?.topicSlugs);
        if (!goal || !gradeBand || !intensity || topicSlugs.length === 0) {
            res.status(400).json({
                error: "goal, gradeBand, intensity and topicSlugs[] are required"
            });
            return;
        }
        const plan = await store.upsertStudyPlan({
            studentId: account.id,
            goal,
            gradeBand,
            intensity,
            topicSlugs
        });
        await store.addActivity({
            studentId: account.id,
            activityType: "plan.updated",
            metadata: { topicCount: topicSlugs.length, intensity }
        });
        res.status(201).json(plan);
    });
    app.get("/api/me/progress", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        res.json(await store.listProgress(account.id));
    });
    app.post("/api/me/progress", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { status, score } = req.body;
        const topicSlug = sanitizeTopicSlug(String(req.body?.topicSlug ?? ""));
        const allowedStatuses = ["started", "practicing", "completed"];
        if (!topicSlug || !status || !allowedStatuses.includes(status)) {
            res.status(400).json({
                error: "topicSlug and valid status are required"
            });
            return;
        }
        const progressInput = {
            studentId: account.id,
            topicSlug,
            status,
            ...(score === undefined ? {} : { score })
        };
        const entry = await store.addProgress(progressInput);
        await store.addActivity({
            studentId: account.id,
            activityType: status === "completed" ? "topic.completed" : "progress.recorded",
            topicSlug,
            metadata: {
                status,
                ...(score === undefined ? {} : { score })
            }
        });
        res.status(201).json(entry);
    });
    app.get("/api/me/activity", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        res.json(await store.listActivity(account.id));
    });
    app.delete("/api/me/account", async (req, res) => {
        const account = await resolveAuthenticatedAccount(req);
        if (!account) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        await store.addActivity({
            studentId: account.id,
            activityType: "account.deleted",
            metadata: { email: account.email }
        });
        await store.deleteAccount(account.id);
        res.json({
            ok: true,
            message: "Account removed."
        });
    });
    return app;
}
