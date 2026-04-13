export type DatabaseProvider = "memory" | "postgres" | "mongo";

export type ProgressStatus = "started" | "practicing" | "completed";
export type ActivityType =
  | "auth.register"
  | "auth.login"
  | "auth.email_change_requested"
  | "auth.email_changed"
  | "auth.password_changed"
  | "auth.password_reset_requested"
  | "auth.password_reset_completed"
  | "plan.updated"
  | "progress.recorded"
  | "topic.completed"
  | "account.deleted";

export interface Topic {
  slug: string;
  title: string;
  grade_band: string;
  category: string;
  duration_minutes: number;
  summary: string;
  subtopics: string[];
  theory_points: string[];
  practice_easy: string[];
  practice_medium: string[];
  practice_hard: string[];
}

export interface GymiTrack {
  code: string;
  title: string;
  audience: string;
  description: string;
}

export interface MockExam {
  slug: string;
  track_code: string;
  title: string;
  description: string;
  duration_minutes: number;
  tasks: string[];
}

export interface StudyPlan {
  student_id: string;
  goal: string;
  grade_band: string;
  intensity: string;
  topic_slugs: string[];
}

export interface Account {
  id: string;
  email: string;
  display_name: string;
  grade_band: string;
  password_hash: string;
  created_at: string;
}

export interface SafeAccount {
  id: string;
  email: string;
  display_name: string;
  grade_band: string;
  created_at: string;
}

export interface ProgressEntry {
  student_id: string;
  topic_slug: string;
  status: ProgressStatus;
  score: number | null;
  completed_at: string;
}

export interface ActivityEvent {
  id: string;
  student_id: string;
  activity_type: ActivityType;
  topic_slug: string | null;
  metadata: Record<string, string | number | boolean | null>;
  created_at: string;
}

export interface PasswordResetChallenge {
  id: string;
  account_id: string;
  email: string;
  code_hash: string;
  expires_at: string;
  used_at: string | null;
  created_at: string;
}

export interface EmailChangeChallenge {
  id: string;
  account_id: string;
  current_email: string;
  next_email: string;
  code_hash: string;
  expires_at: string;
  used_at: string | null;
  created_at: string;
}

export interface UpsertStudyPlanInput {
  studentId: string;
  goal: string;
  gradeBand: string;
  intensity: string;
  topicSlugs: string[];
}

export interface AddProgressInput {
  studentId: string;
  topicSlug: string;
  status: ProgressStatus;
  score?: number | null;
}

export interface CreateAccountInput {
  email: string;
  displayName: string;
  gradeBand: string;
  passwordHash: string;
}

export interface AddActivityInput {
  studentId: string;
  activityType: ActivityType;
  topicSlug?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface CreatePasswordResetChallengeInput {
  accountId: string;
  email: string;
  codeHash: string;
  expiresAt: string;
}

export interface CreateEmailChangeChallengeInput {
  accountId: string;
  currentEmail: string;
  nextEmail: string;
  codeHash: string;
  expiresAt: string;
}

export interface HealthResult {
  mode: DatabaseProvider;
}
