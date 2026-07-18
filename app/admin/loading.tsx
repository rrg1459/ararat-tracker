import { createClient } from "../utils/supabase";
import AdminHeader from "./AdminHeader";

export default async function Loading() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let usrName = "Usuario";
  let userRole = "Anotador";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", user.id)
      .single();

    usrName = profile?.full_name?.trim().split(/\s+/).slice(0, 2).join(" ") || usrName;
    userRole = profile?.role || userRole;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <AdminHeader userName={usrName} userRole={userRole} logoPriority />

        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 italic text-sm text-center dark:text-zinc-400">Procesando...</p>
        </div>
      </div>
    </div>
  );
}