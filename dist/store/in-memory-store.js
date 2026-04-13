import { randomUUID } from "node:crypto";
import { seedGymiTracks, seedMockExams, seedTopics } from "../content/seed-content.js";
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
export function createInMemoryStore() {
    const topics = clone(seedTopics);
    const gymiTracks = clone(seedGymiTracks);
    const mockExams = clone(seedMockExams);
    const accounts = new Map();
    const studyPlans = new Map();
    const progressEntries = [];
    const activityEvents = [];
    const passwordResetChallenges = new Map();
    const emailChangeChallenges = new Map();
    return {
        async health() {
            return { mode: "memory" };
        },
        async createAccount(input) {
            const account = {
                id: randomUUID(),
                email: input.email,
                display_name: input.displayName,
                grade_band: input.gradeBand,
                password_hash: input.passwordHash,
                created_at: new Date().toISOString()
            };
            accounts.set(account.id, account);
            return account;
        },
        async getAccountByEmail(email) {
            return [...accounts.values()].find((account) => account.email === email) ?? null;
        },
        async getAccountById(accountId) {
            return accounts.get(accountId) ?? null;
        },
        async updateAccountPassword(accountId, passwordHash) {
            const account = accounts.get(accountId);
            if (!account) {
                return;
            }
            accounts.set(accountId, { ...account, password_hash: passwordHash });
        },
        async updateAccountEmail(accountId, email) {
            const account = accounts.get(accountId);
            if (!account) {
                return;
            }
            accounts.set(accountId, { ...account, email });
        },
        async deleteAccount(accountId) {
            accounts.delete(accountId);
            studyPlans.delete(accountId);
            for (let index = progressEntries.length - 1; index >= 0; index -= 1) {
                if (progressEntries[index]?.student_id === accountId) {
                    progressEntries.splice(index, 1);
                }
            }
            for (let index = activityEvents.length - 1; index >= 0; index -= 1) {
                if (activityEvents[index]?.student_id === accountId) {
                    activityEvents.splice(index, 1);
                }
            }
            for (const [challengeId, challenge] of passwordResetChallenges.entries()) {
                if (challenge.account_id === accountId) {
                    passwordResetChallenges.delete(challengeId);
                }
            }
            for (const [challengeId, challenge] of emailChangeChallenges.entries()) {
                if (challenge.account_id === accountId) {
                    emailChangeChallenges.delete(challengeId);
                }
            }
        },
        async listTopics() {
            return topics;
        },
        async getTopicBySlug(slug) {
            return topics.find((topic) => topic.slug === slug) ?? null;
        },
        async listGymiTracks() {
            return gymiTracks;
        },
        async listMockExams() {
            return mockExams;
        },
        async getStudyPlan(studentId) {
            return studyPlans.get(studentId) ?? null;
        },
        async upsertStudyPlan(input) {
            const plan = {
                student_id: input.studentId,
                goal: input.goal,
                grade_band: input.gradeBand,
                intensity: input.intensity,
                topic_slugs: input.topicSlugs
            };
            studyPlans.set(input.studentId, plan);
            return plan;
        },
        async addProgress(input) {
            const entry = {
                student_id: input.studentId,
                topic_slug: input.topicSlug,
                status: input.status,
                score: input.score ?? null,
                completed_at: new Date().toISOString()
            };
            progressEntries.push(entry);
            return entry;
        },
        async listProgress(studentId) {
            return progressEntries.filter((entry) => entry.student_id === studentId);
        },
        async addActivity(input) {
            const event = {
                id: randomUUID(),
                student_id: input.studentId,
                activity_type: input.activityType,
                topic_slug: input.topicSlug ?? null,
                metadata: input.metadata ?? {},
                created_at: new Date().toISOString()
            };
            activityEvents.push(event);
            return event;
        },
        async listActivity(studentId) {
            return activityEvents.filter((entry) => entry.student_id === studentId);
        },
        async createPasswordResetChallenge(input) {
            for (const [challengeId, challenge] of passwordResetChallenges.entries()) {
                if (challenge.email === input.email && challenge.used_at === null) {
                    passwordResetChallenges.delete(challengeId);
                }
            }
            const challenge = {
                id: randomUUID(),
                account_id: input.accountId,
                email: input.email,
                code_hash: input.codeHash,
                expires_at: input.expiresAt,
                used_at: null,
                created_at: new Date().toISOString()
            };
            passwordResetChallenges.set(challenge.id, challenge);
            return challenge;
        },
        async getActivePasswordResetChallengeByEmail(email) {
            const now = Date.now();
            const latest = [...passwordResetChallenges.values()]
                .filter((challenge) => challenge.email === email && challenge.used_at === null && Date.parse(challenge.expires_at) > now)
                .sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at))[0];
            return latest ?? null;
        },
        async consumePasswordResetChallenge(challengeId) {
            const challenge = passwordResetChallenges.get(challengeId);
            if (!challenge) {
                return;
            }
            passwordResetChallenges.set(challengeId, {
                ...challenge,
                used_at: new Date().toISOString()
            });
        },
        async createEmailChangeChallenge(input) {
            for (const [challengeId, challenge] of emailChangeChallenges.entries()) {
                if (challenge.account_id === input.accountId && challenge.used_at === null) {
                    emailChangeChallenges.delete(challengeId);
                }
            }
            const challenge = {
                id: randomUUID(),
                account_id: input.accountId,
                current_email: input.currentEmail,
                next_email: input.nextEmail,
                code_hash: input.codeHash,
                expires_at: input.expiresAt,
                used_at: null,
                created_at: new Date().toISOString()
            };
            emailChangeChallenges.set(challenge.id, challenge);
            return challenge;
        },
        async getActiveEmailChangeChallenge(accountId, nextEmail) {
            const now = Date.now();
            const latest = [...emailChangeChallenges.values()]
                .filter((challenge) => challenge.account_id === accountId &&
                challenge.next_email === nextEmail &&
                challenge.used_at === null &&
                Date.parse(challenge.expires_at) > now)
                .sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at))[0];
            return latest ?? null;
        },
        async consumeEmailChangeChallenge(challengeId) {
            const challenge = emailChangeChallenges.get(challengeId);
            if (!challenge) {
                return;
            }
            emailChangeChallenges.set(challengeId, {
                ...challenge,
                used_at: new Date().toISOString()
            });
        }
    };
}
