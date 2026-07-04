import Image from "next/image";
import { createClient } from "./utils/supabase";
import PeopleManager from "./people-manager";
import AttendanceClient from "./attendance/attendance-client"; // Tu componente cliente importado aquí
import { logout } from "./actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; date?: string }>;
}) {
  const supabase = await createClient();
  const { view, date } = await searchParams;

  // OBTENER USUARIO LOGUEADO: Solicitamos de forma segura la info de la sesión activa
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email || "Usuario";
  // Buscamos el rol en los metadatos de Supabase, o usamos 'Anotador' por defecto
  const userRole = user?.user_metadata?.role || "Anotador";

  // Vista por defecto: asistencia
  const currentView = view === "people" ? "people" : "attendance";

  // Fecha por defecto: la del día de hoy en formato YYYY-MM-DD
  const currentDate = date || new Date().toISOString().split("T")[0];

  // 1. Traemos la lista completa de personas de manera segura en el servidor
  const { data: people } = await supabase
    .from("people")
    .select("*")
    .order("created_at", { ascending: false });

  // 2. Traemos la asistencia ya guardada para la fecha seleccionada
  const { data: initialLogs } = await supabase
    .from("attendance_logs")
    .select("person_id")
    .eq("date", currentDate);

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Info de la aplicación */}
        <div className="flex items-center gap-4 justify-start min-w-0">
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
          <div className="min-w-0 flex flex-col justify-center">
            <h1
              style={{ fontSize: '20px' }}
              className="sm:text-3xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap"
            >
              Control de Asistencia
            </h1>

            {/* Oculto por defecto en pantallas pequeñas (hidden) y visible desde 'sm' en adelante (sm:block) */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm hidden sm:block">
              Gestión y registro de miembros y visitantes
            </p>

            {/* CORREO DE USUARIO LOGUEADO: Se muestra con estilo pequeño y sutil */}
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5 truncate">
              Sesión: <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{userEmail}</span>

              {/* Badge/Etiqueta para el Rol */}
              <span className="text-[9px] uppercase tracking-wider font-bold bg-terracota/10 text-terracota dark:bg-terracota/20 dark:text-terracota-light px-1.5 py-0.5 rounded flex-shrink-0 ml-2.5">
                {userRole}
              </span>

            </p>

          </div>
        </div>

        {/* Botones de navegación nativa condicionales */}
        <div className="flex items-center gap-3 justify-start sm:justify-end">

          {/* Solo se muestra si NO estamos en la toma de asistencia */}
          {currentView !== "attendance" && (
            <a
              href="?view=attendance"
              className="px-5 py-2.5 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm"
            >
              Tomar Asistencia
            </a>
          )}

          {/* Solo se muestra si NO estamos en la gestión de personas */}
          {currentView !== "people" && (
            <a
              href="?view=people"
              className="px-5 py-2.5 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm"
            >
              Gestionar Personas
            </a>
          )}

          <form action={logout}>
            <button
              type="submit"
              className="bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 px-4 py-2.5 rounded-md font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer text-sm"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      {/* Renderizado en base a la pestaña activa */}
      <div className="max-w-5xl mx-auto">
        {currentView === "attendance" ? (
          <AttendanceClient
            people={people || []}
            initialLogs={initialLogs || []}
            currentDate={currentDate}
          />
        ) : (
          <PeopleManager initialPeople={people || []} />
        )}
      </div>
    </div>
  );
}