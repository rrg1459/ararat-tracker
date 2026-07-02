'use client'

import { useState } from "react";
import { saveAttendance } from "../actions";
// import Link from "next/link";

interface Person {
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  person_type: string;
}

interface AttendanceClientProps {
  people: Person[];
  initialLogs: { person_id: string }[];
  currentDate: string;
}

export default function AttendanceClient({ people, initialLogs, currentDate }: AttendanceClientProps) {
  // Estado para controlar la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Estado para guardar un conjunto (Set) de los IDs de personas que asistieron
  const [attendedIds, setAttendedIds] = useState<Set<string>>(
    new Set(initialLogs.map((log) => log.person_id))
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Alterna el estado del check (marcado / desmarcado)
  function handleCheckboxChange(personId: string) {
    const newIds = new Set(attendedIds);
    if (newIds.has(personId)) {
      newIds.delete(personId);
    } else {
      newIds.add(personId);
    }
    setAttendedIds(newIds);
  }

  // Envía los datos acumulados al servidor
  async function handleSave() {
    setSaving(true);
    setMessage("");

    const result = await saveAttendance(selectedDate, Array.from(attendedIds));

    setSaving(false);
    if (result.success) {
      setMessage("¡Attendance saved successfully!  ");
    } else {
      setMessage(`Error saving attendance: ${result.error}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">

      {/* Selector de fecha y botón de guardar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-700 pb-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Seleccionar Fecha</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-4">
          {message && <p className="text-sm font-medium text-green-600 dark:text-green-400">{message}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 cursor-pointer"
          >
            {saving ? "Guardando..." : "Guardar Asistencia"}
          </button>
        </div>
      </div>

      {/* Listado de personas con Checkbox */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">Directorio de Personas</h3>

        {people.length === 0 ? (
          <p className="text-zinc-500 italic text-sm text-center py-4">No se encontraron personas. Por favor, agréguelas primero en la página principal</p>
        ) : (
          people.map((person) => {
            const isChecked = attendedIds.has(person.id);
            return (
              <label
                key={person.id}
                className={`flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer select-none ${isChecked
                  ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/50'
                  : 'bg-zinc-50 border-zinc-100 hover:bg-zinc-100 dark:bg-zinc-700/50 dark:border-zinc-600 dark:hover:bg-zinc-700'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(person.id)}
                    className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                      {person.first_name} {person.last_name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">ID: {person.id_number}</p>
                  </div>
                </div>

                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${person.person_type === 'member'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                  {person.person_type === 'member' ? 'Miembro' : 'Visitante'}
                </span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}