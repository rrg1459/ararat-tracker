'use client'

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
// Importa tu acción del servidor para eliminar
import { deletePerson } from "../actions/actions";
import { adminUpdatePersonDates } from "../actions/admin-actions";
import { getRoleBadge } from "../utils/person-role-badge";

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
  invited_by_id?: string | null;
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
  first_visit_date: string | null;
  baptized_at: string | null;
}

export default function PersonManagement({
  initialPeople = [],
  canEditDates = false,
  canExport = false,
}: {
  initialPeople?: People[];
  canEditDates?: boolean;
  canExport?: boolean;
}) {
  const [peopleList, setPeopleList] = useState<People[]>(initialPeople);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [editingDatesId, setEditingDatesId] = useState<string | null>(null);
  const [firstVisitDate, setFirstVisitDate] = useState("");
  const [baptizedAt, setBaptizedAt] = useState("");
  const [isSavingDates, setIsSavingDates] = useState(false);

  const handleExport = () => {
    const columns = [
      { key: "first_name", label: "Nombres" },
      { key: "last_name", label: "Apellidos" },
      { key: "home_phone", label: "Teléfono local" },
      { key: "email", label: "Correo" },
      { key: "birth_date", label: "Fecha de nacimiento" },
      { key: "person_type", label: "Tipo de persona" },
      { key: "cell_phone", label: "Teléfono celular" },
      { key: "first_visit_date", label: "Fecha de 1era Visita" },
      { key: "baptized_at", label: "Bautizado el" },
      { key: "notes", label: "Notas" },
    ] as const satisfies readonly { key: keyof People; label: string }[];
    const csvCell = (value: string | boolean | null | undefined) => {
      let text = value == null ? "" : String(value);
      if (/^[\s]*[=+\-@]/.test(text)) {
        text = `'${text}`;
      }
      return `"${text.replace(/"/g, '""')}"`;
    };
    const csv = [
      columns.map((column) => csvCell(column.label)).join(","),
      ...peopleList.map((person) => columns.map((column) => csvCell(person[column.key])).join(",")),
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    try {
      const link = document.createElement("a");
      link.href = url;
      link.download = `personas-${format(new Date(), "yyyyMMMdd", { locale: es })}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  const handleEditDates = (person: People) => {
    setEditingDatesId(person.id);
    setFirstVisitDate(person.first_visit_date ?? "");
    setBaptizedAt(person.baptized_at ?? "");
  };

  const handleSaveDates = async (personId: string) => {
    try {
      setIsSavingDates(true);
      const result = await adminUpdatePersonDates(personId, {
        first_visit_date: firstVisitDate || null,
        baptized_at: baptizedAt || null,
      });

      if (!result.success) {
        alert(`No se pudieron guardar las fechas: ${result.error}`);
        return;
      }

      setPeopleList((prev) => prev.map((person) => (
        person.id === personId
          ? {
              ...person,
              first_visit_date: firstVisitDate || null,
              baptized_at: baptizedAt || null,
            }
          : person
      )));
      setEditingDatesId(null);
    } catch (error) {
      console.error("Error al actualizar fechas de persona:", error);
      alert("No se pudieron guardar las fechas. Intente de nuevo.");
    } finally {
      setIsSavingDates(false);
    }
  };

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
    <div className="max-w-5xl mx-auto">

      {/* SECCIÓN DEL LISTADO */}
      <section className="bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-md sm:text-xl font-bold text-zinc-800 dark:text-zinc-200">
            Personas Registradas ({peopleList.length})
          </h3>
          {canExport && (
            <button
              type="button"
              onClick={handleExport}
              disabled={peopleList.length === 0}
              className="hidden lg:inline-flex shrink-0 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span aria-hidden="true">📥 </span>
              Exportar a CSV
            </button>
          )}
        </div>

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

              const currentRole = getRoleBadge(person.person_type, "personManagement");

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

                    {(person.first_visit_date || person.baptized_at) && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-zinc-600 dark:text-zinc-300">
                        {person.first_visit_date && (
                          <span>Primera visita: {person.first_visit_date}</span>
                        )}
                        {person.baptized_at && (
                          <span>Bautizado el: {person.baptized_at}</span>
                        )}
                      </div>
                    )}

                    {canEditDates && (
                      <div className="mt-2">
                        {editingDatesId === person.id ? (
                          <div className="flex flex-wrap items-end gap-2">
                            <label className="flex flex-col gap-1 text-[11px] text-zinc-600 dark:text-zinc-300">
                              Primera visita
                              <input
                                type="date"
                                value={firstVisitDate}
                                onChange={(event) => setFirstVisitDate(event.target.value)}
                                className="rounded border border-zinc-300 bg-white px-2 py-1 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                              />
                            </label>
                            <label className="flex flex-col gap-1 text-[11px] text-zinc-600 dark:text-zinc-300">
                              Bautizado el
                              <input
                                type="date"
                                value={baptizedAt}
                                onChange={(event) => setBaptizedAt(event.target.value)}
                                className="rounded border border-zinc-300 bg-white px-2 py-1 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                              />
                            </label>
                            <button
                              type="button"
                              disabled={isSavingDates}
                              onClick={() => handleSaveDates(person.id)}
                              className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                              {isSavingDates ? "Guardando..." : "Guardar"}
                            </button>
                            <button
                              type="button"
                              disabled={isSavingDates}
                              onClick={() => setEditingDatesId(null)}
                              className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:border-zinc-600 dark:text-zinc-200"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditDates(person)}
                            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                          >
                            Editar fechas
                          </button>
                        )}
                      </div>
                    )}

                    {person.cell_phone && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        📱 Cel: {person.cell_phone}
                      </p>
                    )}

                    {person.notes?.trim() && (
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 whitespace-pre-wrap">
                        <span aria-hidden="true">📝 </span>
                        <strong>Notas:</strong> {person.notes}
                      </p>
                    )}

                    {/* CONTENEDOR DE ETIQUETAS */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${currentRole.classes}`}>
                        {currentRole.label}
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
                      {age !== null && age >= 12 && age <= 17 && (
                        <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          Adolescente 👱
                        </span>
                      )}

                      {/* ETIQUETA: CRISTIANO */}
                      {person.accepted_jesus && (
                        <span className="bg-emerald-500 text-white dark:bg-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5 shadow-xs">
                          Cristiano 🙏
                        </span>
                      )}

                      {person.is_first_time_visitor && person.attendance_count < 2 && (
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