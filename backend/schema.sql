create extension if not exists "pgcrypto";

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  display_name text not null,
  grade_band text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists topics (
  slug text primary key,
  title text not null,
  grade_band text not null,
  category text not null,
  duration_minutes integer not null,
  summary text not null,
  subtopics text[] not null default '{}',
  theory_points text[] not null,
  practice_easy text[] not null,
  practice_medium text[] not null,
  practice_hard text[] not null,
  created_at timestamptz not null default now()
);

create table if not exists gymi_tracks (
  code text primary key,
  title text not null,
  audience text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists mock_exams (
  slug text primary key,
  track_code text not null references gymi_tracks(code) on delete cascade,
  title text not null,
  description text not null,
  duration_minutes integer not null,
  tasks text[] not null,
  created_at timestamptz not null default now()
);

create table if not exists study_plans (
  student_id uuid primary key references accounts(id) on delete cascade,
  goal text not null,
  grade_band text not null,
  intensity text not null,
  topic_slugs text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists progress_entries (
  id bigserial primary key,
  student_id uuid not null references accounts(id) on delete cascade,
  topic_slug text not null references topics(slug) on delete cascade,
  status text not null check (status in ('started', 'practicing', 'completed')),
  score integer,
  completed_at timestamptz not null default now()
);

create table if not exists activity_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references accounts(id) on delete cascade,
  activity_type text not null,
  topic_slug text references topics(slug) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists password_reset_challenges (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  email text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists email_change_challenges (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  current_email text not null,
  next_email text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists progress_entries_student_id_idx on progress_entries(student_id);
create index if not exists progress_entries_topic_slug_idx on progress_entries(topic_slug);
create index if not exists activity_events_student_id_idx on activity_events(student_id);
create index if not exists activity_events_created_at_idx on activity_events(created_at desc);
create index if not exists password_reset_challenges_email_idx on password_reset_challenges(email);
create index if not exists email_change_challenges_account_id_idx on email_change_challenges(account_id);
