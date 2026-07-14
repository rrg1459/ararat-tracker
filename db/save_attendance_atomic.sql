-- Atomic attendance save: replace all logs for a date in a single transaction.
-- Security model:
-- 1) Only authenticated users can execute this RPC.
-- 2) Function enforces auth at runtime with auth.uid().
-- 3) attendance_logs table has an authenticated-only RLS policy.
create or replace function public.save_attendance_atomic(
  p_date date,
  p_person_ids uuid[]
)
returns jsonb
language plpgsql
as $$
declare
  current_user_id uuid;
  affected_count integer := 0;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated'
      using errcode = '42501';
  end if;

  delete from public.attendance_logs
  where created_at = p_date;

  if coalesce(array_length(p_person_ids, 1), 0) > 0 then
    insert into public.attendance_logs (created_at, person_id)
    select p_date, person_id
    from unnest(p_person_ids) as person_id;

    get diagnostics affected_count = row_count;
  end if;

  return jsonb_build_object(
    'success', true,
    'saved_count', affected_count,
    'date', p_date
  );
end;
$$;

revoke all on function public.save_attendance_atomic(date, uuid[]) from public;
revoke all on function public.save_attendance_atomic(date, uuid[]) from anon;
grant execute on function public.save_attendance_atomic(date, uuid[]) to authenticated;
grant execute on function public.save_attendance_atomic(date, uuid[]) to service_role;

alter table public.attendance_logs enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance_logs'
      and policyname = 'authenticated_manage_attendance_logs'
  ) then
    create policy authenticated_manage_attendance_logs
      on public.attendance_logs
      for all
      to authenticated
      using (auth.role() = 'authenticated')
      with check (auth.role() = 'authenticated');
  end if;
end;
$$;
