// page.tsx
import { createClient } from "../utils/supabase";
import AttendanceClient, { Person } from "./attendance-client";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function AttendancePage({ searchParams }: PageProps) {
  const supabase = await createClient();

  const resolvedParams = await searchParams;
  const today = new Date().toISOString().split('T')[0];
  const targetDate = resolvedParams.date || today;

  const isToday = targetDate === today;

  let people: Person[] = [];
  let initialLogs: { person_id: string }[] = [];

  if (isToday) {
    // HOY: Traemos logs de hoy y el directorio completo
    const { data: logs } = await supabase
      .from("attendance_logs")
      .select("person_id")
      .eq("date", targetDate);

    initialLogs = logs || [];

    const { data: allPeople } = await supabase
      .from("people")
      .select("id, id_number, first_name, last_name, person_type")
      .order("first_name", { ascending: true });

    people = allPeople || [];
  } else {
    // PASADO: Traemos los logs de ese día específico
    const { data: logs } = await supabase
      .from("attendance_logs")
      .select("person_id")
      .eq("date", targetDate);

    initialLogs = logs || [];

    if (initialLogs.length > 0) {
      // Traemos solo a las personas que asistieron ese día
      const personIds = initialLogs.map(log => log.person_id);
      const { data: attendedPeople } = await supabase
        .from("people")
        .select("id, id_number, first_name, last_name, person_type")
        .in("id", personIds)
        .order("first_name", { ascending: true });

      people = attendedPeople || [];
    } else {
      people = [];
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 justify-start">
          <div className="relative w-[60px] h-[60px] flex-shrink-0">
            <Image
              src="/ararat.png"
              alt="Logo Iglesia Ararat"
              fill
              priority
              className="object-contain"
              sizes="60px"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              Asistencia Diaria
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isToday ? "Marcar asistencia para el servicio de hoy" : `Consulta de fecha: ${targetDate}`}
            </p>
          </div>
        </div>

        <div className="flex justify-start sm:justify-end">
          <Link
            href="/"
            className="text-sm font-semibold bg-zinc-200 text-zinc-800 px-4 py-2 rounded-md hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 transition-colors"
          >
            Volver a Personas
          </Link>
        </div>
      </header>

      <AttendanceClient
        people={people}
        initialLogs={initialLogs}
        currentDate={targetDate}
      />
    </div>
  );
}