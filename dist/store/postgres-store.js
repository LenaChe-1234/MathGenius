export function createPostgresStore(pool) {
    return {
        async health() {
            await pool.query("select 1");
            return { mode: "postgres" };
        },
        async createAccount(input) {
            const result = await pool.query(`insert into accounts (email, display_name, grade_band, password_hash)
         values ($1, $2, $3, $4)
         returning id, email, display_name, grade_band, password_hash, created_at`, [input.email, input.displayName, input.gradeBand, input.passwordHash]);
            return result.rows[0];
        },
        async getAccountByEmail(email) {
            const result = await pool.query(`select id, email, display_name, grade_band, password_hash, created_at
         from accounts
         where email = $1`, [email]);
            return result.rows[0] ?? null;
        },
        async getAccountById(accountId) {
            const result = await pool.query(`select id, email, display_name, grade_band, password_hash, created_at
         from accounts
         where id = $1`, [accountId]);
            return result.rows[0] ?? null;
        },
        async updateAccountPassword(accountId, passwordHash) {
            await pool.query(`update accounts
         set password_hash = $2
         where id = $1`, [accountId, passwordHash]);
        },
        async updateAccountEmail(accountId, email) {
            await pool.query(`update accounts
         set email = $2
         where id = $1`, [accountId, email]);
        },
        async deleteAccount(accountId) {
            await pool.query(`delete from accounts where id = $1`, [accountId]);
        },
        async listTopics() {
            const result = await pool.query(`select slug, title, grade_band, category, duration_minutes, summary,
                theory_points, practice_easy, practice_medium, practice_hard
         from topics
         order by grade_band, title`);
            return result.rows;
        },
        async getTopicBySlug(slug) {
            const result = await pool.query(`select slug, title, grade_band, category, duration_minutes, summary,
                theory_points, practice_easy, practice_medium, practice_hard
         from topics
         where slug = $1`, [slug]);
            return result.rows[0] ?? null;
        },
        async listGymiTracks() {
            const result = await pool.query(`select code, title, audience, description
         from gymi_tracks
         order by code`);
            return result.rows;
        },
        async listMockExams() {
            const result = await pool.query(`select slug, track_code, title, description, duration_minutes, tasks
         from mock_exams
         order by track_code, title`);
            return result.rows;
        },
        async getStudyPlan(studentId) {
            const result = await pool.query(`select student_id, goal, grade_band, intensity, topic_slugs
         from study_plans
         where student_id = $1`, [studentId]);
            return result.rows[0] ?? null;
        },
        async upsertStudyPlan(input) {
            const result = await pool.query(`insert into study_plans (student_id, goal, grade_band, intensity, topic_slugs)
         values ($1, $2, $3, $4, $5)
         on conflict (student_id)
         do update set
           goal = excluded.goal,
           grade_band = excluded.grade_band,
           intensity = excluded.intensity,
           topic_slugs = excluded.topic_slugs,
           updated_at = now()
         returning student_id, goal, grade_band, intensity, topic_slugs`, [input.studentId, input.goal, input.gradeBand, input.intensity, input.topicSlugs]);
            return result.rows[0];
        },
        async addProgress(input) {
            const result = await pool.query(`insert into progress_entries (student_id, topic_slug, status, score)
         values ($1, $2, $3, $4)
         returning student_id, topic_slug, status, score, completed_at`, [input.studentId, input.topicSlug, input.status, input.score ?? null]);
            return result.rows[0];
        },
        async listProgress(studentId) {
            const result = await pool.query(`select student_id, topic_slug, status, score, completed_at
         from progress_entries
         where student_id = $1
         order by completed_at desc`, [studentId]);
            return result.rows;
        },
        async addActivity(input) {
            const result = await pool.query(`insert into activity_events (student_id, activity_type, topic_slug, metadata)
         values ($1, $2, $3, $4)
         returning id, student_id, activity_type, topic_slug, metadata, created_at`, [input.studentId, input.activityType, input.topicSlug ?? null, JSON.stringify(input.metadata ?? {})]);
            return {
                ...result.rows[0],
                metadata: typeof result.rows[0].metadata === "string"
                    ? JSON.parse(result.rows[0].metadata)
                    : result.rows[0].metadata
            };
        },
        async listActivity(studentId) {
            const result = await pool.query(`select id, student_id, activity_type, topic_slug, metadata, created_at
         from activity_events
         where student_id = $1
         order by created_at desc`, [studentId]);
            return result.rows.map((row) => ({
                ...row,
                metadata: typeof row.metadata === "string" ? JSON.parse(row.metadata) : row.metadata
            }));
        },
        async createPasswordResetChallenge(input) {
            await pool.query(`update password_reset_challenges
         set used_at = now()
         where email = $1
           and used_at is null`, [input.email]);
            const result = await pool.query(`insert into password_reset_challenges (account_id, email, code_hash, expires_at)
         values ($1, $2, $3, $4)
         returning id, account_id, email, code_hash, expires_at, used_at, created_at`, [input.accountId, input.email, input.codeHash, input.expiresAt]);
            return result.rows[0];
        },
        async getActivePasswordResetChallengeByEmail(email) {
            const result = await pool.query(`select id, account_id, email, code_hash, expires_at, used_at, created_at
         from password_reset_challenges
         where email = $1
           and used_at is null
           and expires_at > now()
         order by created_at desc
         limit 1`, [email]);
            return result.rows[0] ?? null;
        },
        async consumePasswordResetChallenge(challengeId) {
            await pool.query(`update password_reset_challenges
         set used_at = now()
         where id = $1`, [challengeId]);
        },
        async createEmailChangeChallenge(input) {
            await pool.query(`update email_change_challenges
         set used_at = now()
         where account_id = $1
           and used_at is null`, [input.accountId]);
            const result = await pool.query(`insert into email_change_challenges (account_id, current_email, next_email, code_hash, expires_at)
         values ($1, $2, $3, $4, $5)
         returning id, account_id, current_email, next_email, code_hash, expires_at, used_at, created_at`, [input.accountId, input.currentEmail, input.nextEmail, input.codeHash, input.expiresAt]);
            return result.rows[0];
        },
        async getActiveEmailChangeChallenge(accountId, nextEmail) {
            const result = await pool.query(`select id, account_id, current_email, next_email, code_hash, expires_at, used_at, created_at
         from email_change_challenges
         where account_id = $1
           and next_email = $2
           and used_at is null
           and expires_at > now()
         order by created_at desc
         limit 1`, [accountId, nextEmail]);
            return result.rows[0] ?? null;
        },
        async consumeEmailChangeChallenge(challengeId) {
            await pool.query(`update email_change_challenges
         set used_at = now()
         where id = $1`, [challengeId]);
        }
    };
}
