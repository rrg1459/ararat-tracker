import Link from "next/link";
import { createClient } from "./utils/supabase";
import PeopleManager from "./people-manager";
import { logout } from "./actions";

export default async function Home() {
  const supabase = await createClient();

  // Obtenemos los datos desde el servidor de manera rápida y segura
  const { data: people } = await supabase
    .from("people")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Control de Asistencia - Iglesia
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Gestión y registro de miembros y visitantes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/attendance"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Take Attendance →
          </Link>

          {/* Formulario rápido para ejecutar el Server Action de cerrar sesión */}
          <form action={logout}>
            <button
              type="submit"
              className="bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 px-4 py-2.5 rounded-md font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Renderizamos el manejador dinámico pasándole los datos iniciales */}
      <PeopleManager initialPeople={people || []} />
    </div>
  );
}