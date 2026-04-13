import type {
  AddProgressInput,
  Account,
  ActivityEvent,
  AddActivityInput,
  CreateEmailChangeChallengeInput,
  CreatePasswordResetChallengeInput,
  CreateAccountInput,
  EmailChangeChallenge,
  GymiTrack,
  HealthResult,
  MockExam,
  PasswordResetChallenge,
  ProgressEntry,
  StudyPlan,
  Topic,
  UpsertStudyPlanInput
} from "../types/domain.js";

export interface DataStore {
  health(): Promise<HealthResult>;
  createAccount(input: CreateAccountInput): Promise<Account>;
  getAccountByEmail(email: string): Promise<Account | null>;
  getAccountById(accountId: string): Promise<Account | null>;
  updateAccountPassword(accountId: string, passwordHash: string): Promise<void>;
  updateAccountEmail(accountId: string, email: string): Promise<void>;
  deleteAccount(accountId: string): Promise<void>;
  listTopics(): Promise<Topic[]>;
  getTopicBySlug(slug: string): Promise<Topic | null>;
  listGymiTracks(): Promise<GymiTrack[]>;
  listMockExams(): Promise<MockExam[]>;
  getStudyPlan(studentId: string): Promise<StudyPlan | null>;
  upsertStudyPlan(input: UpsertStudyPlanInput): Promise<StudyPlan>;
  addProgress(input: AddProgressInput): Promise<ProgressEntry>;
  listProgress(studentId: string): Promise<ProgressEntry[]>;
  addActivity(input: AddActivityInput): Promise<ActivityEvent>;
  listActivity(studentId: string): Promise<ActivityEvent[]>;
  createPasswordResetChallenge(input: CreatePasswordResetChallengeInput): Promise<PasswordResetChallenge>;
  getActivePasswordResetChallengeByEmail(email: string): Promise<PasswordResetChallenge | null>;
  consumePasswordResetChallenge(challengeId: string): Promise<void>;
  createEmailChangeChallenge(input: CreateEmailChangeChallengeInput): Promise<EmailChangeChallenge>;
  getActiveEmailChangeChallenge(accountId: string, nextEmail: string): Promise<EmailChangeChallenge | null>;
  consumeEmailChangeChallenge(challengeId: string): Promise<void>;
}
