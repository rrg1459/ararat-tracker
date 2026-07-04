"use client";

import { useState } from "react";
import { saveAttendance } from "../actions";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

registerLocale("es", es);

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
  currentDate: string; // Recibe "YYYY-MM-DD" desde el Server Component
}

export default function AttendanceClient({ people, initialLogs, currentDate }: AttendanceClientProps) {
  // 1. Convertimos el string inicial "YYYY-MM-DD" a un objeto Date real agregando 'T00:00:00' para evitar desfases de zona horaria
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    currentDate ? new Date(`${currentDate}T00:00:00`) : new Date()
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [attendedIds, setAttendedIds] = useState<Set<string>>(
    new Set(initialLogs.map((log) => log.person_id))
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleCheckboxChange(personId: string) {
    const newIds = new Set(attendedIds);
    if (newIds.has(personId)) {
      newIds.delete(personId);
    } else {
      newIds.add(personId);
    }
    setAttendedIds(newIds);
  }

  // Envia los datos acumulados al servidor
  async function handleSave() {
    if (!selectedDate) {
      setMessage("Por favor, selecciona una fecha válida.");
      return;
    }

    setSaving(true);
    setMessage("");

    // 2. Convertimos el objeto Date de vuelta a string 'YYYY-MM-DD' para tu Server Action
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const result = await saveAttendance(dateString, Array.from(attendedIds));

    setSaving(false);
    if (result.success) {
      setMessage("¡Asistencia guardada con éxito!");
    } else {
      setMessage(`Error al guardar asistencia: ${result.error}`);
    }
  }

  const filteredPeople = searchTerm.trim().length >= 3
    ? people.filter((person) => {
      const term = searchTerm.toLowerCase();
      const firstName = person.first_name.toLowerCase();
      const lastName = person.last_name.toLowerCase();
      const idNumber = (person.id_number || "").toLowerCase();

      return (
        firstName.includes(term) ||
        lastName.includes(term) ||
        idNumber.includes(term)
      );
    })
    : people;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">

      {/* Selector de fecha y botón de guardar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-700 pb-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
            Seleccionar Fecha
          </label>

          {/* 3. Reemplazo del input nativo por React Datepicker */}
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="dd/MMM/yyyy" // Formato que verá el usuario final
            placeholderText="Elige un día"
            locale="es" // Configuración regional para español
            maxDate={new Date()} // No permitir fechas futuras
            dayClassName={(date) => {
              const day = date.getDay(); // 0 es domingo, 6 es sábado
              // Si es domingo (0) o sábado (6), añadimos la clase 'weekend-day'
              return day === 0 || day === 6 ? "weekend-day" : "";
            }}
            className="p-2 w-full sm:w-[140px] rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 font-medium text-zinc-900 dark:text-zinc-100 text-center"
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

      {/* Campo de Buscador Dinámico */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
          Buscar Persona
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="por cédula, nombre o apellido... (mínimo 3 caracteres)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />
          {searchTerm.trim().length > 0 && searchTerm.trim().length < 3 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              Escribe al menos 3 caracteres para activar el filtro.
            </p>
          )}
        </div>
      </div>

      {/* Listado de personas con Checkbox */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Directorio
          </h3>
          {searchTerm.trim().length >= 3 && (
            <span className="text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
              Resultados: {filteredPeople.length}
            </span>
          )}
        </div>

        {filteredPeople.length === 0 ? (
          <p className="text-zinc-500 italic text-sm text-center py-6">
            No se encontraron personas que coincidan con la búsqueda.
          </p>
        ) : (
          filteredPeople.map((person) => {
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
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Cédula: {person.id_number || "No registrada"}
                    </p>
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