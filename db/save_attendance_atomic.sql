-- Atomic attendance save: replace all logs for a date in a single transaction.
create or replace function public.save_attendance_atomic(
  p_date date,
  p_person_ids uuid[]
)
returns jsonb
language plpgsql
as $$
declare
  affected_count integer := 0;
begin
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
