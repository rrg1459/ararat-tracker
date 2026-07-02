import { createClient } from "../utils/supabase";
import AttendanceClient from "./attendance-client";
import Link from "next/link";

export default async function AttendancePage() {
  const supabase = await createClient();

  // 1. Obtenemos la fecha de hoy en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // 2. Traemos a todas las personas registradas
  const { data: people } = await supabase
    .from("people")
    .select("id, id_number, first_name, last_name, person_type")
    .order("first_name", { ascending: true });

  // 3. Traemos las asistencias que ya hayan sido marcadas para el día de hoy
  const { data: initialLogs } = await supabase
    .from("attendance_logs")
    .select("person_id")
    .eq("date", today);

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="max-w-3xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Asistencia Diaria
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Marcar asistencia para el servicio de hoy
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold bg-zinc-200 text-zinc-800 px-4 py-2 rounded-md hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 transition-colors"
        >
          Volver a Personas
        </Link>
      </header>

      <AttendanceClient
        people={people || []}
        initialLogs={initialLogs || []}
        currentDate={today}
      />
    </div>
  );
}