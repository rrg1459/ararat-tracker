import { createClient } from "./utils/supabase";
import HomeClientShell from "./components/HomeClientShell";

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
    .select(`
    *,
    attendance_logs:attendance_logs(count)
  `)
    .order("created_at", { ascending: false });

  const { data: initialLogs } = await supabase
    .from("attendance_logs")
    .select("person_id")
    .eq("created_at", currentDate);

  const formattedPeople = people?.map(person => ({
    ...person,
    attendance_count: person.attendance_logs?.[0]?.count ?? 0
  }));

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <HomeClientShell
        currentView={currentView}
        currentDate={currentDate}
        people={formattedPeople || []}
        initialLogs={initialLogs || []}
        isAdminOrSuperAdmin={isAdminOrSuperAdmin}
        user={user ? { id: user.id, email: user.email || undefined } : null}
        userName={userName}
        userRole={userRole}
        profileName={profileData?.full_name || ""}
        profileEmail={profileData?.email || user?.email || ""}
      />
    </div>
  );
}