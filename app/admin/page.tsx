import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase";
import { createAdminClient } from "../utils/supabase-admin";
import AdminDashboardClient from "./admin-dashboard-client";

export default async function AdminPage() {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

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

  const userName = profile?.full_name?.trim().split(/\s+/).slice(0, 2).join(" ") || "Usuario";
  const userRole = profile?.role || "Anotador";
  const hasAccess = userRole === "admin" || userRole === "superadmin";

  // Si no pertenece a los roles autorizados, denegar acceso y redirigir
  if (!hasAccess) {
    redirect("/");
  }

  // // Prueba de diagnóstico directo en tu page.tsx
  // try {
  //   const testRes = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users`, {
  //     headers: {
  //       'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
  //       'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`
  //     }
  //   });
  //   const testData = await testRes.json();
  //   console.log("DIAGNÓSTICO DIRECTO:", testRes.status, testData);
  // } catch (e) {
  //   console.log("Error en diagnóstico:", e);
  // }

  // 3. OBTENER LOS USUARIOS DE AUTENTICACIÓN
  // Usamos el listUsers() desde el cliente administrativo
  const { data: authData, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error al listar usuarios de autenticación:", error.message);
  }

  const authUsers = authData?.users || [];

  // 4. Le pasamos 'authUsers' a tu dashboard cliente
  return (
    <AdminDashboardClient
      userName={userName}
      userRole={userRole}
      initialUsers={authUsers}
    />
  );
}
