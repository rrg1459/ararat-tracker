-- Script de migración SQL para Supabase (PostgreSQL)
-- Generado a partir de Asistencia-para-sql.csv
-- Total registros en people: 356 | Total registros en attendance_logs: 1016

BEGIN;

DO $$
DECLARE
  v_person_id uuid;
BEGIN

  DELETE FROM public.attendance_logs;
  DELETE FROM public.people;

-- Persona #1: Abdiel Mujica
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Abdiel', 'Mujica', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #2: Abraham Adraz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Abraham', 'Adraz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #3: Abraham Sierra
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Abraham', 'Sierra', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #4: Adriana de los Angeles Silva Maurera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Adriana de los Angeles', 'Silva Maurera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #5: Adriana Silva
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Adriana', 'Silva', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #6: Ailany Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ailany', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #7: Aixa Rangel
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Aixa', 'Rangel', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #8: Aixa Valentina Rangel
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Aixa Valentina', 'Rangel', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #9: Alaya Guevara
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alaya', 'Guevara', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #10: Alcides Salazar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alcides', 'Salazar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #11: Aleannys David Campos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Aleannys David', 'Campos', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #12: Alejandro Salazar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alejandro', 'Salazar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #13: Alexander David X
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alexander David', ' ', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #14: Alexis Paz Pirela
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alexis Paz', 'Pirela', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #15: Alexismar Lara
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alexismar', 'Lara', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #16: Alirio Antequera Noriega
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alirio', 'Antequera Noriega', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #17: Alirio Josué Antequera Palma
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Alirio Josué', 'Antequera Palma', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #18: Almari Jabnia Paz Díaz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Almari Jabnia', 'Paz Díaz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #19: Ana Cristina Rincón
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ana Cristina', 'Rincón', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #20: Ana Guachez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ana', 'Guachez', '2026-10-11T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z');

-- Persona #21: Ana Isabel Ladera Rodríguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ana Isabel', 'Ladera Rodríguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #22: Ana Maria Quintana
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ana Maria', 'Quintana', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #23: Ana Mendez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ana', 'Mendez', NULL, NULL, 'Flia Christian Soto Rescatista', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #24: Ana Sanez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ana', 'Sanez', '2026-11-01T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #25: Anais del Valle X
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Anais del Valle', ' ', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #26: Andrea Martinez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Andrea', 'Martinez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #27: Andris Miguel Hermoso Aranguren
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Andris Miguel', 'Hermoso Aranguren', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #28: Angel Ladera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Angel', 'Ladera', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #29: Angel Mendoza
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Angel', 'Mendoza', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #30: Angel Ramon Gadea Lovero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Angel Ramon', 'Gadea Lovero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #31: Angela Chacon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Angela', 'Chacon', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #32: Angela Daniela Yarce Valido
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Angela Daniela', 'Yarce Valido', NULL, '2026-03-15T00:00:00Z', NULL, 'visitor', NULL, TRUE) RETURNING id INTO v_person_id;

-- Persona #33: Angelica Martinez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Angelica', 'Martinez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #34: Anniel Salazar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Anniel', 'Salazar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #35: Anthony Castellano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Anthony', 'Castellano', NULL, NULL, 'Hijo de Johan Yepez', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #36: Argenis Francisco Obregon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Argenis Francisco', 'Obregon', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #37: Arianna David Campos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Arianna David', 'Campos', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #38: Arianny Suriel Rodriguez Pedrón
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Arianny Suriel', 'Rodriguez Pedrón', '2021-08-15T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #39: Arturo Rafael Rodriguez Martinez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Arturo Rafael', 'Rodriguez Martinez', '2026-06-21T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #40: Ashley Rios
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ashley', 'Rios', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #41: Aura García
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Aura', 'García', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #42: Avril Carolina Montilla Testa
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Avril Carolina', 'Montilla Testa', '2025-12-21T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #43: Azai Valero Blanco
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Azai Valero', 'Blanco', '2026-11-01T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #44: Belkis Maria Arabia Gudiño
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Belkis Maria', 'Arabia Gudiño', '2026-04-26T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #45: Belkis Nieves
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Belkis', 'Nieves', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #46: Belkys Ferrer
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Belkys', 'Ferrer', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #47: Betzabeth Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Betzabeth', 'Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #48: Biannery Alvarez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Biannery', 'Alvarez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #49: Bianney Alvarez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Bianney', 'Alvarez', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #50: Caleb Adraz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Caleb', 'Adraz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #51: Camila Castillo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Camila', 'Castillo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #52: Carlimar Terán
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carlimar', 'Terán', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #53: Carlos Eduardo Rangel
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carlos Eduardo', 'Rangel', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #54: Carlos Emilita Chacon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carlos Emilita', 'Chacon', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #55: Carlos Rangel
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carlos', 'Rangel', '2026-03-05T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #56: Carmen Machado
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carmen', 'Machado', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #57: Carmen Toribe
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carmen', 'Toribe', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #58: Carmen Zambrano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carmen', 'Zambrano', '2026-10-11T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z');

-- Persona #59: Carolina Testa de Montilla
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carolina', 'Testa de Montilla', '2025-12-21T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #60: Cesar Lovera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Cesar', 'Lovera', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #61: Chiquinquira Torrealba
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Chiquinquira', 'Torrealba', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #62: Christian Soto
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Christian', 'Soto', NULL, NULL, 'Rsta', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #63: Claudio Manfredi
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Claudio', 'Manfredi', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #64: Claumary Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Claumary', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #65: Cristhian Anthony Rivas Agreda
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Cristhian Anthony', 'Rivas Agreda', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #66: Dahir Soto
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Dahir', 'Soto', NULL, NULL, 'Flia Christian Soto Rescatista', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #67: Daleska Rodriguez Arrieta
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Daleska', 'Rodriguez Arrieta', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #68: Danetzi Josefina de Antequera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Danetzi Josefina', 'de Antequera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #69: Daniel Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Daniel', 'Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #70: Daniela Valentina Martínez León
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Daniela Valentina', 'Martínez León', '2026-08-23T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #71: Danilka Alejandra Arrieta Ugueto
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Danilka Alejandra', 'Arrieta Ugueto', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #72: David Vasquez Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'David', 'Vasquez Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #73: Dayelson Jose Ramos O
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Dayelson Jose', 'Ramos O', '2026-03-21T00:00:00Z', '2026-06-14T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #74: Deivy Valero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Deivy', 'Valero', '2026-11-01T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #75: Denis Torres
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Denis', 'Torres', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #76: Deyna Isabel León Paz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Deyna Isabel', 'León Paz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #77: Diana Amezquita de Rodríguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Diana', 'Amezquita de Rodríguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #78: Diana Corrales
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Diana', 'Corrales', '2026-10-25T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #79: Dilan Mota
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Dilan', 'Mota', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #80: Dominga Josefina Rivas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Dominga Josefina', 'Rivas', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #81: Eddie Alejandro Paredes Pereira
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Eddie Alejandro', 'Paredes Pereira', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #82: Edicta Barrios
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Edicta', 'Barrios', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #83: Edilia Josefina Parada Vizamon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Edilia Josefina', 'Parada Vizamon', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #84: Eduardo Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Eduardo', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #85: Edward Osorio Ladera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Edward', 'Osorio Ladera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #86: Eglee Mata
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Eglee', 'Mata', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #87: Eizy Yindrizka Martinez Sifontes
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Eizy Yindrizka', 'Martinez Sifontes', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #88: Eliangely Alfonzo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Eliangely', 'Alfonzo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #89: Elianny Rodrígurez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Elianny', 'Rodrígurez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #90: Elianyelis Valentina Alfonzo Brazon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Elianyelis Valentina', 'Alfonzo Brazon', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #91: Elías Valero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Elías', 'Valero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #92: Eliezer Noe Alfonzo Brazon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Eliezer Noe', 'Alfonzo Brazon', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #93: Elvis Suárez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Elvis', 'Suárez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #94: Elvys Gregorio Díaz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Elvys Gregorio', 'Díaz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #95: Enmanuel Alejandro Antillano Pérez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Enmanuel Alejandro', 'Antillano Pérez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #96: Enrique Ortiz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Enrique', 'Ortiz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #97: Enrrique Jose Noda Requena
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Enrrique Jose', 'Noda Requena', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #98: Erianyeli Hernandez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Erianyeli', 'Hernandez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #99: Esteban Rivas Agreda
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Esteban', 'Rivas Agreda', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #100: Estefany Rivas Barrada
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Estefany', 'Rivas Barrada', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #101: Euglimar Maria Torres Castro
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Euglimar Maria', 'Torres Castro', '2026-03-15T00:00:00Z', '2026-03-15T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #102: Eurismar Caldero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Eurismar', 'Caldero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #103: Evelyn Rojas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Evelyn', 'Rojas', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #104: Felipe Rivadeneira
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Felipe', 'Rivadeneira', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #105: Francelys Cabeza
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Francelys', 'Cabeza', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #106: Francisco Miqueas Enrique Rodríguez Gomez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Francisco Miqueas Enrique', 'Rodríguez Gomez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #107: Francisco Sutil
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Francisco', 'Sutil', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #108: Franyelis Aguilar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Franyelis', 'Aguilar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #109: Freddy Carrion
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Freddy', 'Carrion', '2026-03-05T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #110: Frederick Izaguirre
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Frederick', 'Izaguirre', '2026-10-18T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #111: Gabriela Villan
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Gabriela', 'Villan', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #112: Genesis Salazar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Genesis', 'Salazar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #113: Genoba Ortiz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Genoba', 'Ortiz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #114: Giovanny Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Giovanny', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #115: Giovanny Umbria
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Giovanny', 'Umbria', '2026-10-11T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z');

-- Persona #116: Glemarys Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Glemarys', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #117: Grecia Palacios
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Grecia', 'Palacios', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #118: Gregory Carmona
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Gregory', 'Carmona', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #119: Grekellys Colina
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Grekellys', 'Colina', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #120: Griseidys Karina Solorzano de Guedez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Griseidys Karina', 'Solorzano de Guedez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #121: Groneiker Requena
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Groneiker', 'Requena', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #122: Harus Pazo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Harus', 'Pazo', '2026-10-25T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #123: Héctor Fabián Fernández R
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Héctor Fabián', 'Fernández R', '2026-02-08T00:00:00Z', '2026-03-15T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #124: Hector Matos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Hector', 'Matos', '2026-11-08T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #125: Heidy Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Heidy', 'Rodriguez', '2026-11-08T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #126: Hellen Campos Brito
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Hellen', 'Campos Brito', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #127: Hiday Samil Rodriguez de Ladera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Hiday Samil', 'Rodriguez de Ladera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #128: Hiraidys Betzai Rodríguez de Blackwood
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Hiraidys Betzai', 'Rodríguez de Blackwood', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #129: Hugo Ernesto Junior Sanchez Beltran
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Hugo Ernesto Junior', 'Sanchez Beltran', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #130: Iliana Vanesa Paz López
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Iliana Vanesa', 'Paz López', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #131: Isbelia Margarita Rodríguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Isbelia Margarita', 'Rodríguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #132: Ivana Yalexis Paz López
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ivana Yalexis', 'Paz López', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #133: Ivis Leonel Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ivis Leonel', 'Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #134: Jacob Aguilar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jacob', 'Aguilar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #135: Javier Jesús Caraballo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Javier Jesús', 'Caraballo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #136: Javier Soto
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Javier', 'Soto', NULL, NULL, 'Flia Christian Soto Rescatista', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #137: Jean Carlos Zambrano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jean Carlos', 'Zambrano', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #138: Jeannette Lissette Romero González
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jeannette Lissette', 'Romero González', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #139: Jenny Zelaya de Diaz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jenny', 'Zelaya de Diaz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #140: Jeorghelys Romero Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jeorghelys', 'Romero Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #141: Jeremias Cardenas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jeremias', 'Cardenas', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #142: Jeremías Rodríguez Amezquita
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jeremías', 'Rodríguez Amezquita', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #143: Jesus Daniel Delgado Silva
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jesus Daniel', 'Delgado Silva', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #144: Jesus Hurtado
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jesus', 'Hurtado', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #145: Jesus Peinado
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jesus', 'Peinado', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #146: Jhonny Caraballo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jhonny', 'Caraballo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #147: Johan Antonio Campos Alcalá
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Johan Antonio', 'Campos Alcalá', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #148: Johan Carlos Yepez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Johan Carlos', 'Yepez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #149: Johana Mezones
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Johana', 'Mezones', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #150: Johanly Campos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Johanly', 'Campos', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z');

-- Persona #151: Johany Hernandez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Johany', 'Hernandez', '2025-03-23T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #152: Johnson Esteves
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Johnson', 'Esteves', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #153: Jonny Fuentes
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jonny', 'Fuentes', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #154: Jorge Coledo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jorge', 'Coledo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #155: Josabet Shadai Guédez Solorzano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Josabet Shadai', 'Guédez Solorzano', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #156: Jose Alfredo Calcurian A
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Jose Alfredo', 'Calcurian A', '2026-02-22T00:00:00Z', '2026-05-10T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #157: Jose Arabia
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jose', 'Arabia', '2026-09-13T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #158: Jose Francisco Guédez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jose Francisco', 'Guédez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #159: José Gabriel Sicimica
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'José Gabriel', 'Sicimica', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #160: José Gregorio Rodríguez Suniaga
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'José Gregorio', 'Rodríguez Suniaga', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #161: Jose Manuel Martinez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jose Manuel', 'Martinez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #162: Jose Mathias Valera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jose Mathias', 'Valera', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #163: Jose Miguel Romero Jimenez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jose Miguel', 'Romero Jimenez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #164: Jose Valera N
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Jose', 'Valera N', '2026-06-14T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #165: Joseannys Lusía Rodriguez Ortega
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Joseannys Lusía', 'Rodriguez Ortega', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #166: Joselmith Victoria Barcenas Blanco
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Joselmith Victoria', 'Barcenas Blanco', '2025-01-05T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #167: Josias Pacheco
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Josias', 'Pacheco', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #168: Joskar Emanuel Guédez Solorzano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Joskar Emanuel', 'Guédez Solorzano', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #169: Josmar Enrique Ortiz Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Josmar Enrique', 'Ortiz Gonzalez', '2026-03-15T00:00:00Z', '2026-03-15T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #170: Josmar Javier Pérez A
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Josmar Javier', 'Pérez A', '2024-12-24T00:00:00Z', '2025-01-26T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #171: Josnier José Torrealba Ladera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Josnier José', 'Torrealba Ladera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #172: Josué Alejandro Bastardo Rodríguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Josué Alejandro', 'Bastardo Rodríguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #173: Josué Sánchez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Josué', 'Sánchez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #174: Joswar Uriel Guedez Solorzano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Joswar Uriel', 'Guedez Solorzano', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #175: Juan  David Hernandez Cedeño
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juan  David', 'Hernandez Cedeño', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #176: Juan Carlos Mariño
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juan Carlos', 'Mariño', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #177: Juan José Suárez Velázquez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juan José', 'Suárez Velázquez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #178: Juan Silva
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juan', 'Silva', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #179: Juana Karielys Cedeño
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juana Karielys', 'Cedeño', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #180: Juliana Aguilar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juliana', 'Aguilar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #181: Julianny Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Julianny', 'Rodriguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #182: Juliany Marcano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juliany', 'Marcano', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #183: Juliany Naranjo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Juliany', 'Naranjo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #184: Julitza Salinas de Caraballo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Julitza', 'Salinas de Caraballo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #185: Kailin Valentina Costa Aranguren
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Kailin Valentina', 'Costa Aranguren', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z');

-- Persona #186: Kariana Cedeño de Belmonte
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Kariana', 'Cedeño de Belmonte', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #187: Karina Ginez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Karina', 'Ginez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #188: Katerin Valera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Katerin', 'Valera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #189: Katiuska Valera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Katiuska', 'Valera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #190: Keiber Jose Martinez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Keiber Jose', 'Martinez', '2026-06-21T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #191: Keiver David Rosales Martínez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Keiver David', 'Rosales Martínez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #192: Kelly Dusbraskey Moreno Lopez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Kelly Dusbraskey', 'Moreno Lopez', '2026-03-29T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;

-- Persona #193: Kellys Caraballo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Kellys', 'Caraballo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #194: Kimdreilys Romero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Kimdreilys', 'Romero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #195: Leiby Orozcos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Leiby', 'Orozcos', '2026-09-20T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #196: Leidy Sanchez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Leidy', 'Sanchez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #197: Liam Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Liam', 'Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #198: Liam Mota
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Liam', 'Mota', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #199: Liam Rojas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Liam', 'Rojas', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #200: Lieser Isaac Montilla Rodríguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Lieser Isaac', 'Montilla Rodríguez', '2025-12-30T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #201: Lilibeth Mosqueda
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Lilibeth', 'Mosqueda', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #202: Lissie Adriel Castro Pedrón
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Lissie Adriel', 'Castro Pedrón', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #203: Liz García
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Liz', 'García', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #204: Lourdes Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Lourdes', 'Perez', '2026-11-01T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #205: Lucia Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Lucia', 'Rodriguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #206: Lucia Valentina Villarroel Brito
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Lucia Valentina', 'Villarroel Brito', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #207: Luiritza Nicol Rangel M
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Luiritza Nicol', 'Rangel M', '2026-06-07T00:00:00Z', '2026-06-14T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #208: Luis Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Luis', 'Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #209: Luis Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Luis', 'Rodriguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #210: Luis Albarto Sulbarán Sulbaran
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Luis Albarto', 'Sulbarán Sulbaran', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #211: Luisa Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Luisa', 'Rodriguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #212: Magaly Vera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Magaly', 'Vera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #213: Magda Acevedo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Magda', 'Acevedo', '2022-05-15T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;

-- Persona #214: Maikel Aristigueta
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maikel', 'Aristigueta', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #215: Maikel Freites
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maikel', 'Freites', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #216: Manfrelys Blanco
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Manfrelys', 'Blanco', '2026-11-01T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #217: Manuela Malave
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Manuela', 'Malave', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #218: Marco Antonio Corro Yépez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Marco Antonio', 'Corro Yépez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #219: Marcos Jose Paredes M
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Marcos Jose', 'Paredes M', '2024-04-07T00:00:00Z', '2024-05-05T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #220: Margaret Dubleidys Niño de Torrealba
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Margaret Dubleidys', 'Niño de Torrealba', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #221: Mari Ortiz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Mari', 'Ortiz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #222: Maria Alexandra Aguilera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Maria Alexandra', 'Aguilera', '2026-10-18T00:00:00Z', '2026-10-18T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #223: Maria Aura Perez de Orellana
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maria Aura', 'Perez de Orellana', '2026-05-10T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #224: Maria Cordova
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maria', 'Cordova', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #225: Maria de los Angeles Peña Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maria de los Angeles', 'Peña Gonzalez', '2026-03-08T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #226: María del Carmen Diaz de Paz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'María del Carmen', 'Diaz de Paz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #227: María del P Cardona de A
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'María del P', 'Cardona de A', '2021-04-18T00:00:00Z', '2026-06-14T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #228: Maria Eugenia Gutierrez Leon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maria Eugenia', 'Gutierrez Leon', '2026-03-05T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #229: Maria Fermin
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maria', 'Fermin', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #230: María Gabriela Brito
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'María Gabriela', 'Brito', '2022-07-17T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #231: María González
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'María', 'González', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #232: María Noriega
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'María', 'Noriega', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #233: Maria Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maria', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #234: Maria Rada
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maria', 'Rada', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #235: Maritza Josefina Maurera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maritza Josefina', 'Maurera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #236: Martha Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Martha', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #237: Martin Antonio Maqueda Rivas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Martin Antonio', 'Maqueda Rivas', '2021-10-31T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z');

-- Persona #238: Martin Valera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Martin', 'Valera', '2026-09-06T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #239: Maryelis Cruz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Maryelis', 'Cruz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #240: Masorie Padron
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Masorie', 'Padron', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #241: Matias del Valle X
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Matias del Valle', ' ', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #242: Mercedes Ramirez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Mercedes', 'Ramirez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #243: Mirella Mendoza
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Mirella', 'Mendoza', NULL, NULL, 'Miliciana', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #244: Miriam Mercedes De La Rosa
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Miriam', 'Mercedes De La Rosa', '2025-12-15T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #245: Miriam Naranjo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Miriam', 'Naranjo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #246: Nahomi Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nahomi', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #247: Naonis Marcela Fermín
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Naonis Marcela', 'Fermín', '2021-08-29T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #248: Nayarit Dubraska Perez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nayarit Dubraska', 'Perez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #249: Nazareth Madeleiner Gonzalez Meneses
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nazareth Madeleiner', 'Gonzalez Meneses', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #250: Nelson Leal
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nelson', 'Leal', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #251: Neyelbe Freite
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Neyelbe', 'Freite', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #252: Nicol De Sousa
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nicol', 'De Sousa', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #253: Nicole Villalobos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nicole', 'Villalobos', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #254: Nieves Ladera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nieves', 'Ladera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #255: Norelis Coromoto Cedeño García
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Norelis Coromoto', 'Cedeño García', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #256: Norma del Carmen Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Norma del Carmen', 'Rodriguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #257: Norys Ortiz de Sulbaran
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Norys', 'Ortiz de Sulbaran', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #258: Odalis Katiuska Bigott de Osorio
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Odalis Katiuska', 'Bigott de Osorio', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #259: Olinda Chavez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Olinda', 'Chavez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #260: Olivia Ladera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Olivia', 'Ladera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #261: Omar Eladio Contrera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Omar Eladio', 'Contrera', '2026-01-18T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z');

-- Persona #262: Omar Vargas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Omar', 'Vargas', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #263: Orlando José Salazar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Orlando José', 'Salazar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #264: Pablo Antonio Rivas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Pablo Antonio', 'Rivas', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #265: Porfirio Alberto Alfonzo Meneses
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Porfirio Alberto', 'Alfonzo Meneses', NULL, '2025-11-30T00:00:00Z', NULL, 'visitor', NULL, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #266: Rafael Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Rafael', 'Rodriguez', '2026-06-14T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #267: Rafael Romero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Rafael', 'Romero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #268: Rainer Vasquez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Rainer', 'Vasquez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #269: Raisbelis Escudero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Raisbelis', 'Escudero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #270: Ramon Reinaldo Leon Guevara
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ramon Reinaldo', 'Leon Guevara', '2026-03-12T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;

-- Persona #271: Ramon Serrano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ramon', 'Serrano', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #272: Ransés Calcurian
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ransés', 'Calcurian', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #273: Reichell Pazo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Reichell', 'Pazo', '2026-10-25T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #274: Reina Delgado
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Reina', 'Delgado', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #275: Richard Jose Romero Castillo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Richard Jose', 'Romero Castillo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #276: Rosa de Hernández
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Rosa de', 'Hernández', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #277: Rosa Virginia Caraballo H
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Rosa Virginia', 'Caraballo H', '2025-11-30T00:00:00Z', '2026-03-15T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #278: Rosaura Romero de Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Rosaura', 'Romero de Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #279: Salome Paredes Pereira
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Salome', 'Paredes Pereira', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #280: Samuel Elías Ladera Rodríguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Samuel Elías', 'Ladera Rodríguez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #281: Samuel Quintana
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Samuel', 'Quintana', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #282: Sandra Aranguren de Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Sandra', 'Aranguren de Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #283: Santiago José Calcurian  González
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Santiago José', 'Calcurian  González', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #284: Sebastian Tovar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Sebastian', 'Tovar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #285: Sebastin Ortiz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Sebastin', 'Ortiz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #286: Senobia Obregon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Senobia', 'Obregon', '2026-03-08T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;

-- Persona #287: Sulrima Aixa Elena Millan Rios
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Sulrima Aixa Elena', 'Millan Rios', '2026-03-05T00:00:00Z', '2026-06-14T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #288: Surni Guaimar Yanez Montaño
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Surni Guaimar', 'Yanez Montaño', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #289: Tamara Peñar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Tamara', 'Peñar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #290: Teisy Oropeza
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Teisy', 'Oropeza', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #291: Thabata B Pereira de P
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Thabata B', 'Pereira de P', '2024-04-07T00:00:00Z', '2024-05-05T00:00:00Z', NULL, 'visitor', TRUE, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #292: Thania Idrobo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Thania', 'Idrobo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #293: Urania del Carmen Raschiery Hernández
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Urania del Carmen', 'Raschiery Hernández', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #294: Valentina Marin
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Valentina', 'Marin', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #295: Valeria Escudero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Valeria', 'Escudero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #296: Vicente Parra
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Vicente', 'Parra', '2024-08-25T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #297: Victor José Santana Martinez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Victor José', 'Santana Martinez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #298: Victor Vasquez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Victor', 'Vasquez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #299: Victoria Alissandra Antequera P
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Victoria Alissandra', 'Antequera P', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #300: Victoria Diaz Zelaya
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Victoria', 'Diaz Zelaya', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #301: Victoria Galilea Martinez Serrano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Victoria Galilea', 'Martinez Serrano', NULL, '2025-11-30T00:00:00Z', NULL, 'visitor', NULL, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #302: Victoria Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Victoria', 'Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #303: Victoria Rodriguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Victoria', 'Rodriguez', '2026-06-14T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;

-- Persona #304: Visleidy Colina
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Visleidy', 'Colina', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #305: Walter Niño Porras
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Walter', 'Niño Porras', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #306: Wileidy Colina
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Wileidy', 'Colina', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #307: Wilexy Diaz Zelaya
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Wilexy', 'Diaz Zelaya', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #308: Wileyner Graviel Amaya
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Wileyner', 'Graviel Amaya', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #309: Wilfred Rios
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Wilfred', 'Rios', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #310: William Diaz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'William', 'Diaz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #311: Yael Cedeño
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yael', 'Cedeño', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #312: Yajaira Yakelin Castillo Rodríguez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor, accepted_jesus) VALUES (NULL, 'Yajaira Yakelin', 'Castillo Rodríguez', NULL, '2026-06-14T00:00:00Z', NULL, 'visitor', NULL, TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #313: Yaneiby Escalona
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yaneiby', 'Escalona', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #314: Yaneska Pantoja
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yaneska', 'Pantoja', '2026-09-20T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #315: Yanetzy Villarroel Brito
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yanetzy', 'Villarroel Brito', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #316: Yaritza Flores
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yaritza', 'Flores', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #317: Yaritza Nazaret Rodriguez Millán
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yaritza Nazaret', 'Rodriguez Millán', '2026-08-16T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #318: Yei Andrés Ladera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yei Andrés', 'Ladera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #319: Yeiber del Valle X
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yeiber del Valle', ' ', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #320: Yeisdiber Tovar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yeisdiber', 'Tovar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #321: Yeiser Tovar
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yeiser', 'Tovar', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #322: Yelitza Flores
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yelitza', 'Flores', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z');

-- Persona #323: Yelvis Miguel Torrealba Izaguirre
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yelvis Miguel', 'Torrealba Izaguirre', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #324: Yemy del Carmen Peña Pacheco
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yemy del Carmen', 'Peña Pacheco', '2026-03-15T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;

-- Persona #325: Yennys Campos de David
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yennys', 'Campos de David', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #326: Yeslai Alvarez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yeslai', 'Alvarez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #327: Yetsenia Serrano
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yetsenia', 'Serrano', '2021-09-05T00:00:00Z', NULL, NULL, 'visitor', TRUE) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #328: Yirbin Brazon
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yirbin', 'Brazon', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #329: Yoiker Johan Belmonte Suárez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yoiker Johan', 'Belmonte Suárez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #330: Yoleida María Hernández
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yoleida María', 'Hernández', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #331: Yonaí Gonzalez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yonaí', 'Gonzalez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #332: Yoseika Cortes
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yoseika', 'Cortes', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z');

-- Persona #333: Yoselin Antequera
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yoselin', 'Antequera', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-11T00:00:00Z');

-- Persona #334: Yovana Lopez de Paz
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yovana', 'Lopez de Paz', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #335: Ysamar Carmona
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ysamar', 'Carmona', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;

-- Persona #336: Ysvelis Rosa Barrada de Rivas
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Ysvelis Rosa', 'Barrada de Rivas', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #337: Yubel Del Valle X
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yubel Del Valle', ' ', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z');

-- Persona #338: Yubisay Noemi Agreda Garrido
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yubisay Noemi', 'Agreda Garrido', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-11T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z');

-- Persona #339: Yuelis Gutierrez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yuelis', 'Gutierrez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #340: Yuleida Hernandez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yuleida', 'Hernandez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #341: Yusleidy Arteaga
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yusleidy', 'Arteaga', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-06T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z');

-- Persona #342: Yusmari Romero
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yusmari', 'Romero', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #343: Yusmira Batatima
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Yusmira', 'Batatima', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-10-18T00:00:00Z');

-- Persona #344: Zoraida Merlo
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Zoraida', 'Merlo', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-27T00:00:00Z');

-- Persona #345: Zuleica Ramos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Zuleica', 'Ramos', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-13T00:00:00Z'),
    (v_person_id, '2026-09-20T00:00:00Z');

-- Persona #346: Zuyelis del Valle Brazon F
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Zuyelis del Valle', 'Brazon F', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-09-20T00:00:00Z'),
    (v_person_id, '2026-09-27T00:00:00Z'),
    (v_person_id, '2026-10-04T00:00:00Z'),
    (v_person_id, '2026-10-18T00:00:00Z'),
    (v_person_id, '2026-10-25T00:00:00Z'),
    (v_person_id, '2026-11-01T00:00:00Z'),
    (v_person_id, '2026-11-08T00:00:00Z'),
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #347: Nelianis Zelaya
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Nelianis', 'Zelaya', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #348: María Sanchez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'María', 'Sanchez', NULL, NULL, 'Misionera USA', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #349: Hugo Sanchez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Hugo', 'Sanchez', NULL, NULL, 'Hno. María Sanchez', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #350: Melisa Palacios
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Melisa', 'Palacios', NULL, NULL, 'Misionera Argentina', 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #351: Carmen Tapisqueira
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carmen', 'Tapisqueira', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #352: Dilia Ramos
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Dilia', 'Ramos', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #353: Carlos Rafael Puppo Vasquez
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Carlos Rafael', 'Puppo Vasquez', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #354: Evi Barroso
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Evi', 'Barroso', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #355: Franjelimar Filames
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Franjelimar', 'Filames', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

-- Persona #356: Victoria Barboza
  INSERT INTO public.people (id_number, first_name, last_name, first_visit_date, baptized_at, notes, person_type, is_first_time_visitor) VALUES (NULL, 'Victoria', 'Barboza', NULL, NULL, NULL, 'visitor', NULL) RETURNING id INTO v_person_id;
  INSERT INTO public.attendance_logs (person_id, created_at) VALUES
    (v_person_id, '2026-11-15T00:00:00Z');

  UPDATE public.people AS p
  SET last_name = p.last_name || tags.suffix
  FROM (VALUES
    ('Abraham', 'Sierra', ' (N)'),
    ('Ailany', 'Perez', ' (N)'),
    ('Aixa Valentina', 'Rangel', ' (N)'),
    ('Alaya', 'Guevara', ' (N)'),
    ('Alexismar', 'Lara', ' (A)'),
    ('Alirio Josué', 'Antequera Palma', ' (N)'),
    ('Andrea', 'Martinez', ' (N)'),
    ('Andris Miguel', 'Hermoso Aranguren', ' (N)'),
    ('Anthony', 'Castellano', ' (A)'),
    ('Arianna David', 'Campos', ' (A)'),
    ('Ashley', 'Rios', ' (N)'),
    ('Avril Carolina', 'Montilla Testa', ' (N)'),
    ('Azai Valero', 'Blanco', ' (N)'),
    ('Camila', 'Castillo', ' (N)'),
    ('Carlimar', 'Terán', ' (N)'),
    ('David', 'Vasquez Perez', ' (N)'),
    ('Dilan', 'Mota', ' (N)'),
    ('Eddie Alejandro', 'Paredes Pereira', ' (A)'),
    ('Eliangely', 'Alfonzo', ' (N)'),
    ('Elianyelis Valentina', 'Alfonzo Brazon', ' (N)'),
    ('Elías', 'Valero', ' (N)'),
    ('Eliezer Noe', 'Alfonzo Brazon', ' (A)'),
    ('Enrique', 'Ortiz', ' (N)'),
    ('Genoba', 'Ortiz', ' (N)'),
    ('Hellen', 'Campos Brito', ' (N)'),
    ('Jacob', 'Aguilar', ' (N)'),
    ('Jeremias', 'Cardenas', ' (N)'),
    ('Jeremías', 'Rodríguez Amezquita', ' (N)'),
    ('Josabet Shadai', 'Guédez Solorzano', ' (A)'),
    ('Jose', 'Valera N', ' (N)'),
    ('Joseannys Lusía', 'Rodriguez Ortega', ' (N)'),
    ('Josias', 'Pacheco', ' (N)'),
    ('Josué', 'Sánchez', ' (N)'),
    ('Juliana', 'Aguilar', ' (A)'),
    ('Keiver David', 'Rosales Martínez', ' (N)'),
    ('Raisbelis', 'Escudero', ' (A)')
  ) AS tags(first_name, last_name, suffix)
  WHERE p.first_name = tags.first_name
    AND p.last_name = tags.last_name;

END $$;

COMMIT;