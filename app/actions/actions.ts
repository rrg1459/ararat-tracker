'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";

export async function registerPerson(formData: FormData) {
  const supabase = await createClient();

  // Extraemos los datos del formulario de manera segura
  const rawIdNumber = formData.get("id_number") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const homePhone = formData.get("home_phone") as string; // Cambiado de 'phone'
  const cellPhone = formData.get("cell_phone") as string;  // Nuevo campo
  const email = formData.get("email") as string;
  const birthDate = formData.get("birth_date") as string;
  const personType = formData.get("person_type") as string;
  const address = formData.get("address") as string;       // Nuevo campo
  const city = formData.get("city") as string;             // Nuevo campo
  const notes = formData.get("notes") as string;           // Nuevo campo

  // Convertimos las casillas de verificación (Checkboxes) a Booleanos seguros
  const isFirstTimeVisitor = formData.get("is_first_time_visitor") === "on";
  const comesFromAnotherChurch = formData.get("comes_from_another_church") === "on";
  const needsPrayer = formData.get("needs_prayer") === "on";
  const wantsToBeVisited = formData.get("wants_to_be_visited") === "on";
  const wantsBibleStudies = formData.get("wants_bible_studies") === "on";
  const isNewInArea = formData.get("is_new_in_area") === "on";
  const acceptedJesus = formData.get("accepted_jesus") === "on";
  const receivedHolySpirit = formData.get("received_holy_spirit") === "on";

  const idNumber = rawIdNumber && rawIdNumber.trim() !== ""
    ? rawIdNumber.trim().toLowerCase()
    : null;

  // Insertamos en la tabla 'people' usando la nueva estructura de la base de datos
  const { error } = await supabase.from("people").insert([
    {
      id_number: idNumber,
      first_name: firstName,
      last_name: lastName,
      home_phone: homePhone || null, // Guardamos en la nueva columna 'home_phone'
      cell_phone: cellPhone || null,
      email: email || null,
      birth_date: birthDate || null,
      person_type: personType,
      address: address || null,
      city: city || null,
      is_first_time_visitor: isFirstTimeVisitor,
      comes_from_another_church: comesFromAnotherChurch,
      needs_prayer: needsPrayer,
      wants_to_be_visited: wantsToBeVisited,
      wants_bible_studies: wantsBibleStudies,
      is_new_in_area: isNewInArea,
      accepted_jesus: acceptedJesus,
      received_holy_spirit: receivedHolySpirit,
      notes: notes || null,
    },
  ]);

  if (error) {
    console.error("Error inserting person:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function updatePerson(id: string, formData: FormData) {
  const supabase = await createClient();

  // Extraemos los datos actualizados del formulario
  const rawIdNumber = formData.get("id_number") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const homePhone = formData.get("home_phone") as string;
  const cellPhone = formData.get("cell_phone") as string;
  const email = formData.get("email") as string;
  const birthDate = formData.get("birth_date") as string;
  const personType = formData.get("person_type") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const notes = formData.get("notes") as string;

  // Convertimos las casillas de verificación (Checkboxes) a Booleanos seguros
  const isFirstTimeVisitor = formData.get("is_first_time_visitor") === "on";
  const comesFromAnotherChurch = formData.get("comes_from_another_church") === "on";
  const needsPrayer = formData.get("needs_prayer") === "on";
  const wantsToBeVisited = formData.get("wants_to_be_visited") === "on";
  const wantsBibleStudies = formData.get("wants_bible_studies") === "on";
  const isNewInArea = formData.get("is_new_in_area") === "on";
  const acceptedJesus = formData.get("accepted_jesus") === "on";
  const receivedHolySpirit = formData.get("received_holy_spirit") === "on";

  const idNumber = rawIdNumber && rawIdNumber.trim() !== ""
    ? rawIdNumber.trim().toLowerCase()
    : null;

  // Actualizamos la fila correspondiente en Supabase usando el ID
  const { error } = await supabase
    .from("people")
    .update({
      id_number: idNumber,
      first_name: firstName,
      last_name: lastName,
      home_phone: homePhone || null,
      cell_phone: cellPhone || null,
      email: email || null,
      birth_date: birthDate || null,
      person_type: personType,
      address: address || null,
      city: city || null,
      is_first_time_visitor: isFirstTimeVisitor,
      comes_from_another_church: comesFromAnotherChurch,
      needs_prayer: needsPrayer,
      wants_to_be_visited: wantsToBeVisited,
      wants_bible_studies: wantsBibleStudies,
      is_new_in_area: isNewInArea,
      accepted_jesus: acceptedJesus,
      received_holy_spirit: receivedHolySpirit,
      notes: notes || null,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating person:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function deletePerson(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("people").delete().eq("id", id);

  if (error) {
    console.error("Error deleting person:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function saveAttendance(date: string, personIds: string[]) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("save_attendance_atomic", {
    p_date: date,
    p_person_ids: personIds,
  });

  if (error) {
    console.error("Error saving attendance logs atomically:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/attendance");
  return { success: true };
}

export type ActionState = {
  error?: string;
  success?: boolean;
  email?: string;
} | null;

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  // 1. Intentar iniciar sesión en Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // 2. Si las credenciales están MAL, devolvemos el error y los campos intactos
  if (error) {
    console.error("Error en login:", error);

    return {
      error: "El correo electrónico o la contraseña son incorrectos.",
      email,
    };
  }

  // 3. Si las credenciales están BIEN, forzamos la redirección al panel principal
  // ¡OJO! 'redirect' debe ejecutarse fuera del bloque try/catch si usas uno, 
  // ya que Next.js lanza una excepción interna para manejar los redireccionamientos.
  redirect("/"); // Ajusta aquí la ruta de inicio de tu app (ej: "/attendance", "/", etc.)
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

type UpdateOwnUserPayload = {
  fullName?: string;
  email?: string;
  password?: string;
};

export async function updateOwnUserSettings(updates: UpdateOwnUserPayload) {
  try {
    const supabase = await createClient();

    // 1. Obtener el usuario autenticado actual
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) {
      return { success: false, error: getUserError.message };
    }

    if (!user) {
      return { success: false, error: 'No autenticado.' };
    }

    const cleanEmail = updates.email?.trim();
    const cleanPassword = updates.password?.trim();
    const cleanFullName = updates.fullName?.trim();
    const normalizedEmail = cleanEmail?.toLowerCase();
    const currentEmail = user.email?.toLowerCase();

    // 2. SI EL CORREO CAMBIÓ: Usamos el cliente Admin para forzar la actualización inmediata
    if (normalizedEmail && normalizedEmail !== currentEmail) {
      // Creamos el cliente Admin usando variables de entorno del servidor.
      // Recuerda que SUPABASE_SERVICE_ROLE_KEY nunca debe exponerse en el cliente.
      const supabaseAdmin = createSupabaseAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { error: adminAuthError } = await supabaseAdmin.auth.admin.updateUserById(
        user.id,
        {
          email: normalizedEmail,
          email_confirm: true // <-- ESTO fuerza el cambio en auth.users de inmediato sin enviar correos
        }
      );

      if (adminAuthError) {
        return { success: false, error: `Error actualizando identificador: ${adminAuthError.message}` };
      }
    }

    // 3. SI LA CONTRASEÑA CAMBIÓ: La actualizamos con el cliente normal del usuario
    if (cleanPassword) {
      const { error: updateAuthError } = await supabase.auth.updateUser({ password: cleanPassword });
      if (updateAuthError) {
        const errorMessage = updateAuthError.message.toLowerCase().includes('email rate limit exceeded')
          ? 'Has intentado cambiar las credenciales demasiadas veces. Espera unos minutos.'
          : updateAuthError.message;

        return { success: false, error: errorMessage };
      }
    }

    // 4. Actualizamos la tabla 'profiles'
    const profileUpdates: { full_name?: string; email?: string } = {};

    const currentFullName = typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name.trim()
      : '';

    if (typeof cleanFullName === 'string' && cleanFullName !== currentFullName) {
      profileUpdates.full_name = cleanFullName;
    }

    if (normalizedEmail && normalizedEmail !== currentEmail) {
      profileUpdates.email = normalizedEmail;
    }

    if (Object.keys(profileUpdates).length > 0) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', user.id);

      if (profileError) {
        return { success: false, error: profileError.message };
      }
    }

    revalidatePath('/');
    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }

    return { success: false, error: 'Error desconocido al actualizar el usuario.' };
  }
}

export async function updateAppSetting(key: string, value: Record<string, unknown> | unknown, description?: string) {
  const supabase = await createClient();

  // Preparamos los datos para guardar o actualizar (Upsert)
  const payload: {
    key: string;
    value: unknown;
    updated_at: string;
    description?: string;
  } = {
    key,
    value,
    updated_at: new Date().toISOString(),
  };

  if (description !== undefined) {
    payload.description = description;
  }

  // Realizamos un upsert (inserta si no existe la key, actualiza si ya existe)
  const { error } = await supabase
    .from("app_settings")
    .upsert(payload, { onConflict: "key" });

  if (error) {
    console.error("Error updating app setting:", error.message);
    return { success: false, error: error.message };
  }

  // Revalidamos las rutas donde se consultan estas configuraciones
  revalidatePath("/admin");
  return { success: true };
}