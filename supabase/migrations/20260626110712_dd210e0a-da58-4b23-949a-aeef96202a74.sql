create extension if not exists pgcrypto;

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create type public.app_role as enum ('admin', 'moderator', 'user');
create type public.learning_status as enum ('not_started', 'in_progress', 'completed');
create type public.evaluation_level as enum ('standard', 'high', 'premium');
create type public.attempt_status as enum ('in_progress', 'submitted', 'graded');

create table public.profiles (
  id uuid primary key,
  email text,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  locale text not null default 'fr',
  theme text not null default 'dark',
  onboarding_completed boolean not null default false,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
  constraint username_length check (username is null or char_length(username) between 3 and 32)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);
create policy "Users can create their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
create policy "Users can delete their own profile"
on public.profiles
for delete
to authenticated
using (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamp with time zone not null default now(),
  unique (user_id, role),
  constraint user_roles_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;

create table public.chapter_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  chapter_id text not null,
  overall_status public.learning_status not null default 'not_started',
  progress_percent integer not null default 0,
  sections_completed text[] not null default '{}',
  cases_completed text[] not null default '{}',
  unlocked_levels public.evaluation_level[] not null default '{standard}',
  last_section_id text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  last_seen_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (user_id, chapter_id),
  constraint chapter_progress_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
  constraint chapter_progress_percent_range check (progress_percent between 0 and 100)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chapter_progress TO authenticated;
GRANT ALL ON public.chapter_progress TO service_role;
ALTER TABLE public.chapter_progress ENABLE ROW LEVEL SECURITY;
create policy "Users can manage their own chapter progress"
on public.chapter_progress
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create table public.chapter_resume_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  chapter_id text not null,
  lesson_id text,
  section_id text,
  widget_id text,
  scenario_id text,
  evaluation_level public.evaluation_level,
  scroll_anchor text,
  ui_state jsonb not null default '{}'::jsonb,
  last_route text,
  resumed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (user_id, chapter_id),
  constraint chapter_resume_state_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chapter_resume_state TO authenticated;
GRANT ALL ON public.chapter_resume_state TO service_role;
ALTER TABLE public.chapter_resume_state ENABLE ROW LEVEL SECURITY;
create policy "Users can manage their own resume state"
on public.chapter_resume_state
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create table public.evaluation_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  chapter_id text not null,
  lesson_id text,
  level public.evaluation_level not null,
  status public.attempt_status not null default 'in_progress',
  score numeric(5,2),
  max_score numeric(5,2),
  passed boolean,
  part_a_answers jsonb not null default '[]'::jsonb,
  part_b_answers jsonb not null default '[]'::jsonb,
  part_c_answers jsonb not null default '[]'::jsonb,
  feedback jsonb not null default '{}'::jsonb,
  started_at timestamp with time zone not null default now(),
  submitted_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint evaluation_attempts_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
  constraint evaluation_score_range check (score is null or (score >= 0 and score <= 100)),
  constraint evaluation_max_score_range check (max_score is null or max_score >= 0)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.evaluation_attempts TO authenticated;
GRANT ALL ON public.evaluation_attempts TO service_role;
ALTER TABLE public.evaluation_attempts ENABLE ROW LEVEL SECURITY;
create policy "Users can manage their own evaluation attempts"
on public.evaluation_attempts
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

create trigger update_chapter_progress_updated_at
before update on public.chapter_progress
for each row execute function public.update_updated_at_column();

create trigger update_chapter_resume_state_updated_at
before update on public.chapter_resume_state
for each row execute function public.update_updated_at_column();

create trigger update_evaluation_attempts_updated_at
before update on public.evaluation_attempts
for each row execute function public.update_updated_at_column();