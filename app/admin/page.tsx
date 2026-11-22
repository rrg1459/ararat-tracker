import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase";
import { createAdminClient } from "../utils/supabase-admin";
import DashboardClient from "./DashboardClient";

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

  const { data: appSettings } = await supabase
    .from('app_settings')
    .select('key, value')
    .in('key', ['min_age_member', 'min_age_leader', 'max_age_member', 'max_age_leader']);

  const { data: people } = await supabase
    .from("people")
    .select(`
    *,
    attendance_logs:attendance_logs(count)
  `)
    .order("created_at", { ascending: false });

  const { data: attendanceLogs } = await supabase
    .from("attendance_logs")
    .select(`
    *,
    people!inner (
      person_type,
      is_first_time_visitor
    )
  `)
    .order("created_at", { ascending: false });

  const formattedPeople = people?.map(person => ({
    ...person,
    attendance_count: person.attendance_logs?.[0]?.count ?? 0
  }));

  const { data: userProfiles, error: userProfilesError } = await supabase
    .from("profiles")
    .select("id, role, is_active");

  if (userProfilesError) {
    console.error("Error al listar perfiles de usuarios:", userProfilesError.message);
  }

  const userProfilesById = new Map((userProfiles ?? []).map((userProfile) => [userProfile.id, userProfile]));
  let authUsers = (authData?.users || []).map((authUser) => ({
    ...authUser,
    is_active: userProfilesById.get(authUser.id)?.is_active ?? true,
  }));

  // 4. FILTRAR SI EL USUARIO ES SOLO 'admin'
  if (userRole === "admin") {
    // Un admin solo puede gestionar usuarios con rol 'operator'
    const allowedIds = new Set(
      (userProfiles ?? []).filter((profile) => profile.role === "operator").map((profile) => profile.id),
    );

    // Filtramos la lista de authUsers dejando solo los operadores
    authUsers = authUsers.filter((authUser) => allowedIds.has(authUser.id));
  } else if (userRole === "superadmin") {
    // Traemos los IDs de los perfiles que son 'superadmin'
    // Creamos un Set con los IDs a excluir para que la búsqueda sea ultra rápida
    const excludedIds = new Set(
      (userProfiles ?? []).filter((profile) => profile.role === "superadmin").map((profile) => profile.id),
    );

    // Filtramos la lista de authUsers eliminando los que coincidan con esos IDs
    authUsers = authUsers.filter((authUser) => !excludedIds.has(authUser.id));

  }

  // 5. Pasar los usuarios ya filtrados al cliente
  return (
    <DashboardClient
      userName={userName}
      userRole={userRole}
      initialUsers={authUsers}
      initialPeople={formattedPeople ?? []}
      attendanceLogs={attendanceLogs ?? []}
      appSettings={appSettings ?? []}
    />
  );
}