import type { Db } from "mongodb";
import { randomUUID } from "node:crypto";
import type {
  Account,
  ActivityEvent,
  EmailChangeChallenge,
  GymiTrack,
  MockExam,
  PasswordResetChallenge,
  ProgressEntry,
  StudyPlan,
  Topic
} from "../types/domain.js";
import type { DataStore } from "./store.js";

export function createMongoStore(database: Db): DataStore {
  const accounts = database.collection<Account>("accounts");
  const topics = database.collection<Topic>("topics");
  const gymiTracks = database.collection<GymiTrack>("gymi_tracks");
  const mockExams = database.collection<MockExam>("mock_exams");
  const studyPlans = database.collection<StudyPlan & { created_at?: string; updated_at?: string }>("study_plans");
  const progressEntries = database.collection<ProgressEntry>("progress_entries");
  const activityEvents = database.collection<ActivityEvent>("activity_events");
  const passwordResetChallenges = database.collection<PasswordResetChallenge>("password_reset_challenges");
  const emailChangeChallenges = database.collection<EmailChangeChallenge>("email_change_challenges");

  return {
    async health() {
      await database.command({ ping: 1 });
      return { mode: "mongo" };
    },

    async createAccount(input) {
      const account: Account = {
        id: randomUUID(),
        email: input.email,
        display_name: input.displayName,
        grade_band: input.gradeBand,
        password_hash: input.passwordHash,
        created_at: new Date().toISOString()
      };

      await accounts.insertOne(account);
      return account;
    },

    async getAccountByEmail(email) {
      return accounts.findOne({ email }, { projection: { _id: 0 } });
    },

    async getAccountById(accountId) {
      return accounts.findOne({ id: accountId }, { projection: { _id: 0 } });
    },

    async updateAccountPassword(accountId, passwordHash) {
      await accounts.updateOne({ id: accountId }, { $set: { password_hash: passwordHash } });
    },

    async updateAccountEmail(accountId, email) {
      await accounts.updateOne({ id: accountId }, { $set: { email } });
    },

    async deleteAccount(accountId) {
      await accounts.deleteOne({ id: accountId });
      await studyPlans.deleteMany({ student_id: accountId });
      await progressEntries.deleteMany({ student_id: accountId });
      await activityEvents.deleteMany({ student_id: accountId });
      await passwordResetChallenges.deleteMany({ account_id: accountId });
      await emailChangeChallenges.deleteMany({ account_id: accountId });
    },

    async listTopics() {
      return topics.find({}, { projection: { _id: 0 } }).sort({ grade_band: 1, title: 1 }).toArray();
    },

    async getTopicBySlug(slug) {
      return topics.findOne({ slug }, { projection: { _id: 0 } });
    },

    async listGymiTracks() {
      return gymiTracks.find({}, { projection: { _id: 0 } }).sort({ code: 1 }).toArray();
    },

    async listMockExams() {
      return mockExams.find({}, { projection: { _id: 0 } }).sort({ track_code: 1, title: 1 }).toArray();
    },

    async getStudyPlan(studentId) {
      return studyPlans.findOne({ student_id: studentId }, { projection: { _id: 0 } });
    },

    async upsertStudyPlan(input) {
      const nextPlan = {
        student_id: input.studentId,
        goal: input.goal,
        grade_band: input.gradeBand,
        intensity: input.intensity,
        topic_slugs: input.topicSlugs,
        updated_at: new Date().toISOString()
      };

      await studyPlans.updateOne(
        { student_id: input.studentId },
        {
          $set: nextPlan,
          $setOnInsert: {
            created_at: new Date().toISOString()
          }
        },
        { upsert: true }
      );

      const plan = await studyPlans.findOne({ student_id: input.studentId }, { projection: { _id: 0 } });

      if (!plan) {
        throw new Error("Study plan was not found after upsert.");
      }

      return plan;
    },

    async addProgress(input) {
      const entry: ProgressEntry = {
        student_id: input.studentId,
        topic_slug: input.topicSlug,
        status: input.status,
        score: input.score ?? null,
        completed_at: new Date().toISOString()
      };

      await progressEntries.insertOne(entry);
      return entry;
    },

    async listProgress(studentId) {
      return progressEntries
        .find({ student_id: studentId }, { projection: { _id: 0 } })
        .sort({ completed_at: -1 })
        .toArray();
    },

    async addActivity(input) {
      const event: ActivityEvent = {
        id: randomUUID(),
        student_id: input.studentId,
        activity_type: input.activityType,
        topic_slug: input.topicSlug ?? null,
        metadata: input.metadata ?? {},
        created_at: new Date().toISOString()
      };

      await activityEvents.insertOne(event);
      return event;
    },

    async listActivity(studentId) {
      return activityEvents
        .find({ student_id: studentId }, { projection: { _id: 0 } })
        .sort({ created_at: -1 })
        .toArray();
    },

    async createPasswordResetChallenge(input) {
      await passwordResetChallenges.updateMany(
        { email: input.email, used_at: null },
        { $set: { used_at: new Date().toISOString() } }
      );

      const challenge: PasswordResetChallenge = {
        id: randomUUID(),
        account_id: input.accountId,
        email: input.email,
        code_hash: input.codeHash,
        expires_at: input.expiresAt,
        used_at: null,
        created_at: new Date().toISOString()
      };

      await passwordResetChallenges.insertOne(challenge);
      return challenge;
    },

    async getActivePasswordResetChallengeByEmail(email) {
      const now = new Date().toISOString();
      return passwordResetChallenges.findOne(
        {
          email,
          used_at: null,
          expires_at: { $gt: now }
        },
        {
          projection: { _id: 0 },
          sort: { created_at: -1 }
        }
      );
    },

    async consumePasswordResetChallenge(challengeId) {
      await passwordResetChallenges.updateOne(
        { id: challengeId },
        { $set: { used_at: new Date().toISOString() } }
      );
    },

    async createEmailChangeChallenge(input) {
      await emailChangeChallenges.updateMany(
        { account_id: input.accountId, used_at: null },
        { $set: { used_at: new Date().toISOString() } }
      );

      const challenge: EmailChangeChallenge = {
        id: randomUUID(),
        account_id: input.accountId,
        current_email: input.currentEmail,
        next_email: input.nextEmail,
        code_hash: input.codeHash,
        expires_at: input.expiresAt,
        used_at: null,
        created_at: new Date().toISOString()
      };

      await emailChangeChallenges.insertOne(challenge);
      return challenge;
    },

    async getActiveEmailChangeChallenge(accountId, nextEmail) {
      const now = new Date().toISOString();
      return emailChangeChallenges.findOne(
        {
          account_id: accountId,
          next_email: nextEmail,
          used_at: null,
          expires_at: { $gt: now }
        },
        {
          projection: { _id: 0 },
          sort: { created_at: -1 }
        }
      );
    },

    async consumeEmailChangeChallenge(challengeId) {
      await emailChangeChallenges.updateOne(
        { id: challengeId },
        { $set: { used_at: new Date().toISOString() } }
      );
    }
  };
}
