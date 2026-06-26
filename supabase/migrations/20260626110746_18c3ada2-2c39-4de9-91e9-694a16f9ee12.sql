revoke all on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to service_role;

revoke all on function public.handle_new_user_profile() from public, anon, authenticated;
grant execute on function public.handle_new_user_profile() to service_role;