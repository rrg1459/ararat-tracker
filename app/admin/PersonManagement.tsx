'use client'

import { useState } from "react";
// Importa tu acción del servidor para eliminar
import { deletePerson } from "../actions/actions";

export interface People {
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  home_phone: string | null;
  cell_phone: string | null;
  email: string | null;
  birth_date: string | null;
  person_type: string;
  address: string | null;
  city: string | null;
  is_first_time_visitor: boolean;
  comes_from_another_church: boolean;
  needs_prayer: boolean;
  wants_to_be_visited: boolean;
  wants_bible_studies: boolean;
  is_new_in_area: boolean;
  accepted_jesus: boolean;
  received_holy_spirit: boolean;
  notes: string | null;
  attendance_count: number;
}

export default function PersonManagement({ initialPeople = [] }: { initialPeople?: People[] }) {
  const [peopleList, setPeopleList] = useState<People[]>(initialPeople);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Handler adaptado para recibir las asistencias y personalizar el texto de confirmación
  const handleDelete = async (id: string, attendanceCount: number) => {
    const hasAttendance = attendanceCount > 0;

    // Texto condicional según el historial de asistencia
    const message = hasAttendance
      ? `Esta persona tiene ${attendanceCount} asistencias registradas. ¿Está seguro de que desea eliminarla? Se borrará todo su historial.`
      : "¿Está seguro de que desea eliminar a esta persona?";

    if (!confirm(message)) return;

    try {
      setIsDeletingId(id);
      // Ejecuta la acción del servidor
      await deletePerson(id);
      // Filtra el estado local si la acción fue exitosa
      setPeopleList(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar a la persona. Intente de nuevo.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-orange-800 dark:text-orange-100 sm:text-3xl mb-4">
          Gestión de Personas
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Administración y listado de personas registradas en el sistema.
        </p>
      </div>

      {/* SECCIÓN DEL LISTADO */}
      <section className="bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
        <h3 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          Personas Registradas ({peopleList.length})
        </h3>

        <div className="flex flex-col gap-3 max-h-[700px] overflow-y-auto pr-2">
          {peopleList.length === 0 ? (
            <p className="text-zinc-500 text-sm italic py-4 text-center">No hay personas registradas aún.</p>
          ) : (
            peopleList.map((person) => {
              // --- LÓGICA PARA CALCULAR LA EDAD ---
              let age: number | null = null;
              if (person.birth_date) {
                const birthDate = new Date(person.birth_date.replace(/-/g, '/'));
                const today = new Date();
                let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();

                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                  calculatedAge--;
                }
                age = calculatedAge;
              }

              return (
                <div
                  key={person.id}
                  className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm truncate text-zinc-900 dark:text-zinc-100">
                        {person.first_name} {person.last_name}
                      </p>

                      {/* CONTADOR DE ASISTENCIAS */}
                      {person.attendance_count > 0 && (

                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          📅 Asistencias: <strong className="font-bold">{person.attendance_count}</strong>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-1">
                      Cédula: {person.id_number || "No registrada"}
                    </p>

                    {person.cell_phone && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        📱 Cel: {person.cell_phone}
                      </p>
                    )}

                    {/* CONTENEDOR DE ETIQUETAS */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${person.person_type === 'member'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                        {person.person_type === 'member' ? 'Miembro' : 'Visitante'}
                      </span>

                      {/* ETIQUETA DE EDAD */}
                      {age !== null && age >= 0 && age <= 3 && (
                        <span className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          Bebé 👶
                        </span>
                      )}
                      {age !== null && age >= 4 && age <= 11 && (
                        <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          Niño 👦
                        </span>
                      )}

                      {/* ETIQUETA: CRISTIANO */}
                      {person.accepted_jesus && (
                        <span className="bg-emerald-500 text-white dark:bg-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5 shadow-xs">
                          Cristiano 🙏
                        </span>
                      )}

                      {person.is_first_time_visitor && (
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          1ra Vez
                        </span>
                      )}
                      {person.needs_prayer && (
                        <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          Oración 🙏
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACCIONES: ELIMINAR */}
                  {(() => {
                    // Aseguramos el valor numérico (puedes usar directamente person.attendance_count si ya es número)
                    const hasAttendance = (person.attendance_count ?? 0) > 0;

                    // Clases de color si TIENE asistencias (Ej: Amber/Orange de advertencia por datos vinculados)
                    const colorsWithAttendance = "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50 dark:hover:bg-amber-900/40";

                    // Clases de color si NO TIENE asistencias (Rojo estándar para borrado seguro)
                    const colorsNoAttendance = "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60 dark:hover:bg-red-900/40";

                    return (
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          disabled={isDeletingId === person.id}
                          onClick={() => handleDelete(person.id, person.attendance_count ?? 0)}
                          className={`text-xs border px-3 py-1.5 rounded-md transition-colors cursor-pointer font-semibold whitespace-nowrap flex-1 sm:flex-none text-center disabled:opacity-50 disabled:cursor-not-allowed ${hasAttendance ? colorsWithAttendance : colorsNoAttendance
                            }`}
                          title={hasAttendance ? `Esta persona tiene ${person.attendance_count} asistencias registradas` : "Sin asistencias"}
                        >
                          {isDeletingId === person.id ? "Eliminando..." : "Eliminar"}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}