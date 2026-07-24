--- https://gemini.google.com/app/6494cbb6095156b1

--- firefox rrg1459

---

-- 1. Crear la tabla de configuraciones
create table app_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Insertar los valores iniciales para las edades
insert into app_settings (key, value, description)
values
  ('min_age_member', '18'::jsonb, 'Edad mínima permitida para miembros'),
  ('min_age_leader', '21'::jsonb, 'Edad mínima permitida para líderes');

-- 2. Insertar los valores iniciales para las edades
insert into app_settings (key, value, description)
values
  ('max_age_member', '99'::jsonb, 'Edad máxima permitida para miembros'),
  ('max_age_leader', '79'::jsonb, 'Edad máxima permitida para líderes');


-- 3. Habilitar Seguridad a Nivel de Fila (RLS)
alter table app_settings enable row level security;

-- 4. Políticas de acceso (Permitir lectura a usuarios autenticados, escritura solo a administradores)
create policy "Cualquier usuario autenticado puede leer la configuración"
 on app_settings for select
 to authenticated
 using (true);

-- Política para permitir INSERT, UPDATE y DELETE solo a administradores
create policy "Solo los administradores pueden modificar configuraciones"
  on app_settings
  for all -- Aplica para INSERT, UPDATE y DELETE
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );

-- 1. Eliminamos la política anterior
drop policy if exists "Solo los administradores pueden modificar configuraciones" on app_settings;

-- 2. Creamos la nueva política limpia para usuarios autenticados
create policy "Usuarios autenticados pueden modificar configuraciones"
  on app_settings
  for all
  to authenticated
  using (true)
  with check (true);

-- 2. Cómo Consultar desde Frontend (JavaScript/TypeScript)
-- import { supabase } from './supabaseClient'

-- async function getMinAges() {
--   const { data, error } = await supabase
--     .from('app_settings')
--     .select('key, value')
--     .in('key', ['min_age_member', 'min_age_leader'])

--   if (error) {
--     console.error('Error al obtener la configuración:', error)
--     return
--   }

--   // Convertimos el array en un objeto fácil de usar
--   const settings = data.reduce((acc, curr) => {
--     acc[curr.key] = Number(curr.value)
--     return acc
--   }, {})

--   console.log('Edad mínima miembro:', settings.min_age_member) // 18
--   console.log('Edad mínima líder:', settings.min_age_leader)   // 21

--   return settings
-- }