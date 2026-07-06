import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase";
import AdminDashboardClient from "./admin-dashboard-client";

export default async function AdminPage() {
  const supabase = await createClient();

  // 1. Verificar sesión de usuario
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }

  // 2. Verificar rol en la base de datos (Middleware o Server Guard)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

    const userName = profile?.full_name?.split(" ")[0] || "Usuario";
  const userRole = profile?.role || "Anotador";
  const hasAccess = userRole === "admin" || userRole === "superadmin";

  // Si no pertenece a los roles autorizados, denegar acceso y redirigir
  if (!hasAccess) {
    redirect("/");
  }

  return <AdminDashboardClient userName={userName} userRole={userRole} />;
}