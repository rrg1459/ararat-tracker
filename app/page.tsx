import Link from "next/link";
import Image from "next/image";
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
      {/* Eliminamos el comportamiento justify-between forzado si queremos que todo tienda a la izquierda, 
          pero usamos sm:justify-between para mantener los botones a la derecha si la pantalla es grande */}
      <header className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Nuevo contenedor flex que une la imagen y los títulos hacia la izquierda */}
        <div className="flex items-center gap-4 justify-start">
          <div className="flex-shrink-0">
            <Image
              src="/ararat.png"
              alt="Logo Iglesia Ararat"
              width={60}
              height={60}
              priority
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              Control de Asistencia
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gestión y registro de miembros y visitantes
            </p>
          </div>
        </div>

        {/* Botones de acción (se mantendrán alineados o pasarán abajo en móviles de forma ordenada) */}
        <div className="flex items-center gap-3 justify-start sm:justify-end">
          <Link
            href="/attendance"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Tomar Asistencia
          </Link>

          {/* Formulario rápido para ejecutar el Server Action de cerrar sesión */}
          <form action={logout}>
            <button
              type="submit"
              className="bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 px-4 py-2.5 rounded-md font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      {/* Renderizamos el manejador dinámico pasándole los datos iniciales */}
      <PeopleManager initialPeople={people || []} />
    </div>
  );
}