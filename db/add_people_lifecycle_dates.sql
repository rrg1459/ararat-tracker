alter table public.people
  add column if not exists first_visit_date date,
  add column if not exists baptized_at date;
