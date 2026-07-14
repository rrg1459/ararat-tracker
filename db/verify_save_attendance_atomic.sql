-- Verification script for public.save_attendance_atomic
-- Run this after executing db/save_attendance_atomic.sql

-- 1) Confirm function exists
select
  n.nspname as schema_name,
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as args
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'save_attendance_atomic';

-- 2) Confirm execute privileges
select
  has_function_privilege('anon', 'public.save_attendance_atomic(date,uuid[])', 'EXECUTE') as anon_can_execute,
  has_function_privilege('authenticated', 'public.save_attendance_atomic(date,uuid[])', 'EXECUTE') as authenticated_can_execute,
  has_function_privilege('service_role', 'public.save_attendance_atomic(date,uuid[])', 'EXECUTE') as service_role_can_execute;

-- 3) Confirm RLS enabled on attendance_logs
select
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as rls_forced
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'attendance_logs';

-- 4) Confirm policy exists
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
from pg_policies
where schemaname = 'public'
  and tablename = 'attendance_logs'
  and policyname = 'authenticated_manage_attendance_logs';

-- 5) Smoke test A: unauthenticated call should fail with 42501 (expected)
do $$
begin
  perform public.save_attendance_atomic(current_date, array[]::uuid[]);
  raise exception 'Expected unauthenticated call to fail, but it succeeded.';
exception
  when sqlstate '42501' then
    raise notice 'OK: unauthenticated call blocked (%).', sqlerrm;
end;
$$;

-- 6) Smoke test B: simulate authenticated context in SQL editor and call RPC
-- Supabase auth.uid() reads request.jwt.claim.sub.
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000001', true);

select public.save_attendance_atomic(
  current_date,
  array[]::uuid[]
) as simulated_authenticated_result;

-- Clean up simulated auth context for the session.
select set_config('request.jwt.claim.sub', '', true);


-- Sí, es correcto.

-- Ese mensaje de st_config o set_config es normal: esa función solo devuelve el valor que acaba de fijar para simular el JWT en la sesión SQL.

-- Y sí, casi eso es todo. Solo confirma este checklist del script en verify_save_attendance_atomic.sql:

-- Privilegios:
-- anon_can_execute = false, authenticated_can_execute = true, service_role_can_execute = true.

-- RLS:
-- rls_enabled