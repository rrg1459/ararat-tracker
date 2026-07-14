// page.tsx
import Image from "next/image";
import { createClient } from "./utils/supabase";
import PeopleManager from "./people-manager";
import AttendanceClient from "./attendance/attendance-client";
import FaSignOutAlt from "./svg/FaSignOutAlt";
// import FcSettings from "./svg/FcSettings";
import { logout } from "./actions/actions";
import Link from "next/link"; // Usamos Link de Next.js para navegación limpia
// 1. IMPORTA EL NUEVO COMPONENTE DEL CLIENTE (Ya no necesitas importar FcSettings aquí)
import UserSettingsModal from "./components/user-settings-modal";
import AraratLogo from "./components/ararat-logo";
import dashboardIcon from "../public/dashboard1.png";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; date?: string }>;
}) {
  const supabase = await createClient();
  const { view, date } = await searchParams;

  const { data: { user } } = await supabase.auth.getUser();

  let profileData = null;
  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("email, role, full_name")
      .eq("id", user.id)
      .single();

    if (!error) {
      profileData = profile;
    }
  }

  const userName = profileData?.full_name?.trim().split(/\s+/).slice(0, 2).join(" ") || "Usuario";
  const userRole = profileData?.role || "Anotador";

  // Validamos si tiene permisos de administración
  const isAdminOrSuperAdmin = userRole === "admin" || userRole === "superadmin";

  const currentView = view === "people" ? "people" : "attendance";
  const currentDate = date || new Date().toISOString().split("T")[0];

  const { data: people } = await supabase
    .from("people")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: initialLogs } = await supabase
    .from("attendance_logs")
    .select("person_id")
    .eq("created_at", currentDate);

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Info de la aplicación */}
        <div className="flex items-center gap-4 justify-start min-w-0">
          <AraratLogo size={60} priority />
          <div className="min-w-0 flex flex-col justify-center">
            <h1 style={{ fontSize: '20px' }} className="sm:text-3xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
              Control de Asistencia
            </h1>
            {/* Texto largo: se muestra solo en pantallas 'sm' (640px) o más grandes */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm hidden sm:block">
              Gestión y registro de miembros y visitantes
            </p>

            {/* Texto corto: se muestra en móviles y se oculta en 'sm' en adelante */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm block sm:hidden">
              Gestión y registro
            </p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5 truncate">
              Sesión: <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{userName}</span>
              <span className="text-[9px] uppercase tracking-wider font-bold bg-terracota/10 text-terracota dark:bg-terracota/20 dark:text-terracota-light px-1.5 py-0.5 rounded flex-shrink-0 ml-2.5">
                {userRole}
              </span>
            </p>
          </div>
        </div>

        {/* Botones de navegación nativa condicionales */}
        <div className="flex items-center gap-3 justify-start sm:justify-end flex-wrap">

          {currentView !== "attendance" && (
            <Link href="/?view=attendance" scroll={false} className="px-3 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm">
              Tomar Asistencia
            </Link>
          )}

          {currentView !== "people" && (
            <Link href="/?view=people" scroll={false} className="px-3 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm">
              Gestión Personas
            </Link>
          )}

          {isAdminOrSuperAdmin && (
            <Link
              href="/admin"
              className="inline-flex h-10 w-10 items-center justify-center flex-shrink-0"
            >
              <Image
                src={dashboardIcon}
                alt="Admin Icon"
                width={40}
                height={40}
                priority
                className="block h-10 w-10 object-contain"
                sizes="40px"
              />
            </Link>
          )}

          {/* 2. AQUÍ INSERTAMOS EL COMPONENTE CLIENTE DEL MODAL DE CONFIGURACIÓN */}
          {user && (
            <UserSettingsModal
              userId={user.id}
              initialName={profileData?.full_name || ""}
              initialEmail={profileData?.email || user.email || ""}
            />
          )}

          <form action={logout}>
            <button type="submit" className="text-zinc-700 dark:text-zinc-200 my-2 rounded-md font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer text-sm">
              <FaSignOutAlt size={30} />
            </button>
          </form>

        </div>
      </header>

      <div className="max-w-5xl mx-auto">
        {currentView === "attendance" ? (
          <AttendanceClient people={people || []} initialLogs={initialLogs || []} currentDate={currentDate} />
        ) : (
          <PeopleManager initialPeople={people || []} />
        )}
      </div>
    </div>
  );
}