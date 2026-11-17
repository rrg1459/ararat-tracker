-- Run in the Supabase SQL editor before deploying the attendance calendar.
-- The invoker's permissions and attendance_logs RLS policies remain in effect.
create or replace view public.attendance_dates
with (security_invoker = true) as
select distinct created_at as attendance_date
from public.attendance_logs
where created_at is not null and person_id is not null;

revoke all on public.attendance_dates from public, anon;
grant select on public.attendance_dates to authenticated, service_role;
