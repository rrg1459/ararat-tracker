// AttendanceClient.tsx
"use client";

import { useEffect, useState, useTransition } from "react"; // 1. Importamos useTransition
import { setAttendance } from "../actions/actions";
import { getRoleBadge } from "../utils/person-role-badge";
import DatePicker, { registerLocale } from "react-datepicker";
import { useRouter } from "next/navigation";

import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { format } from "date-fns";

registerLocale("es", es);

export interface Person {
  id: string;
  id_number: string | null; // Puede ser null si no está registrada
  first_name: string;
  last_name: string;
  person_type: string;
}

interface AttendanceClientProps {
  people: Person[];
  initialLogs: { person_id: string }[];
  currentDate: string;
  serverToday: string;
  attendanceDates: string[];
}

export default function AttendanceClient({ people, initialLogs, currentDate, serverToday, attendanceDates }: AttendanceClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // 2. Inicializamos el hook de transición

  const selectedDate: Date | null = currentDate ? new Date(`${currentDate}T00:00:00`) : new Date();
  const isSelectedToday = currentDate === serverToday;

  const [searchTerm, setSearchTerm] = useState("");
  const dateKey = currentDate || serverToday;
  const [attendedIdsByDate, setAttendedIdsByDate] = useState<Record<string, Set<string>>>({});
  const attendedIds = attendedIdsByDate[dateKey] ?? new Set(initialLogs.map((log) => log.person_id));
  const [pendingPersonIds, setPendingPersonIds] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const localToday = format(new Date(), "yyyy-MM-dd");
    if (serverToday !== localToday) {
      const params = new URLSearchParams(window.location.search);
      params.set("local_today", localToday);
      startTransition(() => {
        router.replace(`?${params.toString()}`);
      });
    }
  }, [router, serverToday]);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [message]);

  const hasRecords = isSelectedToday ? people.length > 0 : initialLogs.length > 0;
  const attendanceDateSet = new Set(attendanceDates);

  async function handleCheckboxChange(personId: string) {
    if (pendingPersonIds.has(personId)) {
      return;
    }

    const attended = !attendedIds.has(personId);
    setAttendedIdsByDate((prev) => {
      const currentIds = prev[dateKey] ?? new Set(initialLogs.map((log) => log.person_id));
      const newIds = new Set(currentIds);

      if (attended) {
        newIds.add(personId);
      } else {
        newIds.delete(personId);
      }

      return { ...prev, [dateKey]: newIds };
    });
    setPendingPersonIds((prev) => new Set(prev).add(personId));
    setMessage(attended ? "Registrando asistencia..." : "Quitando asistencia...");

    const result = await setAttendance(dateKey, personId, attended);

    if (result.success) {
      setMessage(attended ? "Asistencia registrada." : "Asistencia eliminada.");
    } else {
      setAttendedIdsByDate((prev) => {
        const revertedIds = new Set(prev[dateKey] ?? initialLogs.map((log) => log.person_id));

        if (attended) {
          revertedIds.delete(personId);
        } else {
          revertedIds.add(personId);
        }

        return { ...prev, [dateKey]: revertedIds };
      });
      setMessage(`Error al actualizar asistencia: ${result.error}`);
    }

    setPendingPersonIds((prev) => {
      const next = new Set(prev);
      next.delete(personId);
      return next;
    });
  }

  const handleDateChange = (date: Date | null) => {
    setMessage("");
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      setSearchTerm("");

      // 3. Envolvemos el router.push en startTransition para rastrear la carga del servidor
      const params = new URLSearchParams(window.location.search);
      params.set("date", dateString);
      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    }
  };

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

  const visiblePeople = [
    ...(isSelectedToday
      ? filteredPeople
      : filteredPeople.filter((person) => attendedIds.has(person.id))),
  ].sort((first, second) =>
    Number(attendedIds.has(second.id)) - Number(attendedIds.has(first.id)) ||
    first.first_name.localeCompare(second.first_name, "es", { sensitivity: "base" })
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">

      {/* Selector de fecha y botón de guardar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-700 pb-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
            Seleccionar Fecha
          </label>

          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MMM/yyyy"
            placeholderText="Elige un día"
            locale="es"
            maxDate={new Date()}
            disabled={isPending} // Deshabilitar el input temporalmente mientras procesa
            dayClassName={(date) => {
              const day = date.getDay();
              const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
              return [
                day === 0 || day === 6 ? "weekend-day" : "",
                attendanceDateSet.has(dateString) ? "attendance-day" : "",
              ].filter(Boolean).join(" ");
            }}
            className="p-2 w-full sm:w-[140px] rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 font-medium text-zinc-900 dark:text-zinc-100 text-center disabled:opacity-50"
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="text-emerald-600 dark:text-emerald-400" aria-hidden="true">●</span> Fecha con asistencia
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
          {message && <p className="text-sm font-medium text-green-600 dark:text-green-400 sm:whitespace-nowrap">{message}</p>}

          {isSelectedToday ? (
            <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
              Los cambios se guardan automáticamente
            </p>
          ) : (
            <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
              Solo consulta
            </p>
          )}
        </div>
      </div>

      {/* 4. CONTROL DE ESTADO DE TRANSICIÓN */}
      {isPending ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          {/* Un spinner CSS simple y elegante */}
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 italic text-sm text-center dark:text-zinc-400 animate-pulse">
            Procesando...
          </p>
        </div>
      ) : !hasRecords && !isSelectedToday ? (
        <p className="text-zinc-500 italic text-sm text-center py-8 dark:text-zinc-400">
          No se registraron asistencias <br />en este día
        </p>
      ) : (
        <>
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

          {/* Listado de personas */}
          <div className="flex flex-col gap-2">
            {visiblePeople.length > 0 && (
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  {isSelectedToday ? "Directorio" : "Asistentes"}
                </h3>
                <div className="flex items-center gap-2">
                  {attendedIds.size > 0 && (
                    <span className="text-sm font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 px-2.5 py-0.5 rounded-full">
                      Asistentes: {attendedIds.size}
                    </span>
                  )}
                  {isSelectedToday && searchTerm.trim().length === 0 && (
                    <span className="text-sm font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 px-2.5 py-0.5 rounded-full">
                      Total: {visiblePeople.length}
                    </span>
                  )}
                  {searchTerm.trim().length >= 3 && (
                    <span className="text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                      Resultados: {visiblePeople.length}
                    </span>
                  )}
                </div>
              </div>
            )}

            {visiblePeople.length === 0 ? (
              <p className="text-zinc-500 italic text-sm text-center py-6 dark:text-zinc-400">
                No se encontraron personas que coincidan con la búsqueda
              </p>
            ) : (
              visiblePeople.map((person) => {
                const isChecked = attendedIds.has(person.id);

                const currentRole = getRoleBadge(person.person_type);

                return (
                  <label
                    key={person.id}
                    className={`flex items-center justify-between p-3.5 rounded-lg border transition-all select-none ${!isSelectedToday ? 'cursor-default' : 'cursor-pointer'
                      } ${isChecked && isSelectedToday
                        ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/50'
                        : 'bg-zinc-50 border-zinc-100 hover:bg-zinc-100 dark:bg-zinc-700/50 dark:border-zinc-600 dark:hover:bg-zinc-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {isSelectedToday && (
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={pendingPersonIds.has(person.id)}
                          onChange={() => handleCheckboxChange(person.id)}
                          className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-wait disabled:opacity-50"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
                          {person.first_name} {person.last_name}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Cédula: {person.id_number || "No registrada"}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${currentRole.classes}`}>
                      {currentRole.label}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}