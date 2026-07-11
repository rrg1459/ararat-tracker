import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase";
import { createAdminClient } from "../utils/supabase-admin";
import AdminDashboardClient from "./admin-dashboard-client";

export default async function AdminPage() {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

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

  // 1. Verificar sesión de usuario
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }

  // 2. Verificar rol en la base de datos
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  const userName = profile?.full_name?.trim().split(/\s+/).slice(0, 2).join(" ") || "Usuario";
  const userRole = profile?.role || "Anotador";
  const hasAccess = userRole === "admin" || userRole === "superadmin";

  if (!hasAccess) {
    redirect("/");
  }

  // 3. OBTENER LOS USUARIOS DE AUTENTICACIÓN
  const { data: authData, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error al listar usuarios de autenticación:", error.message);
  }

  const { data: people } = await supabase
    .from("people")
    .select(`
    *,
    attendance_logs:attendance_logs(count)
  `)
    .order("created_at", { ascending: false });

  const formattedPeople = people?.map(person => ({
    ...person,
    attendance_count: person.attendance_logs?.[0]?.count ?? 0
  }));

  let authUsers = authData?.users || [];

  // 4. FILTRAR SI EL USUARIO ES SOLO 'admin'
  if (userRole === "admin") {
    // Traemos los IDs de los perfiles que son 'admin' o 'superadmin'
    const { data: excludedProfiles } = await supabase
      .from("profiles")
      .select("id")
      .in("role", ["admin", "superadmin"]);

    // Creamos un Set con los IDs a excluir para que la búsqueda sea ultra rápida
    const excludedIds = new Set(excludedProfiles?.map((p) => p.id) || []);

    // Filtramos la lista de authUsers eliminando los que coincidan con esos IDs
    authUsers = authUsers.filter((authUser) => !excludedIds.has(authUser.id));
  } else if (userRole === "superadmin") {
    // Traemos los IDs de los perfiles que son 'superadmin'
    const { data: excludedProfiles } = await supabase
      .from("profiles")
      .select("id")
      .in("role", ["superadmin"]);

    // Creamos un Set con los IDs a excluir para que la búsqueda sea ultra rápida
    const excludedIds = new Set(excludedProfiles?.map((p) => p.id) || []);

    // Filtramos la lista de authUsers eliminando los que coincidan con esos IDs
    authUsers = authUsers.filter((authUser) => !excludedIds.has(authUser.id));

  }

  // 5. Pasar los usuarios ya filtrados al cliente
  return (
    <AdminDashboardClient
      userName={userName}
      userRole={userRole}
      initialUsers={authUsers}
      initialPeople={formattedPeople ?? []}
    />
  );
}