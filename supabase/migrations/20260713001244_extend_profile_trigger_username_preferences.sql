/*
# Extend profile trigger to persist username and profileType

1. Changes
- Recreates `handle_new_user_profile()` trigger function to also read `username`
  and `profileType` from `raw_user_meta_data` and insert them into
  `profiles.username` and `profiles.preferences.profileType` at signup.
- No schema changes (columns already exist).
- No RLS changes.
- Idempotent: uses `create or replace` + `drop trigger if exists`.
*/

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text;
  v_profile_type text;
  v_preferences jsonb;
begin
  v_username := new.raw_user_meta_data ->> 'username';
  v_profile_type := new.raw_user_meta_data ->> 'profileType';
  v_preferences := case
    when v_profile_type is not null
      then jsonb_build_object('profileType', v_profile_type)
    else '{}'::jsonb
  end;

  insert into public.profiles (id, email, display_name, avatar_url, username, preferences)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url',
    v_username,
    v_preferences
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
