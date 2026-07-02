'use server'

import { createClient } from "./utils/supabase";
import { revalidatePath } from "next/cache";

export async function registerPerson(formData: FormData) {
  const supabase = await createClient();

  // Extraemos los datos del formulario de manera segura
  const idNumber = formData.get("id_number") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const birthDate = formData.get("birth_date") as string;
  const personType = formData.get("person_type") as string;

  // Insertamos en la tabla 'people' usando los nombres en inglés que definimos
  const { error } = await supabase.from("people").insert([
    {
      id_number: idNumber,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null, // Si está vacío, guardamos NULL
      email: email || null,
      birth_date: birthDate || null,
      person_type: personType,
    },
  ]);

  if (error) {
    console.error("Error inserting person:", error.message);
    return { success: false, error: error.message };
  }

  // Esto le dice a Next.js que limpie la caché de la página de inicio
  // para que muestre inmediatamente a la persona recién registrada
  revalidatePath("/");
  return { success: true };
}

// Añade esta función al final de app/actions.ts

export async function updatePerson(id: string, formData: FormData) {
  const supabase = await createClient();

  // Extraemos los datos actualizados del formulario
  const idNumber = formData.get("id_number") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const birthDate = formData.get("birth_date") as string;
  const personType = formData.get("person_type") as string;

  // Actualizamos la fila correspondiente en Supabase usando el ID
  const { error } = await supabase
    .from("people")
    .update({
      id_number: idNumber,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
      email: email || null,
      birth_date: birthDate || null,
      person_type: personType,
    })
    .eq("id", id); // Filtramos para actualizar solo a esta persona

  if (error) {
    console.error("Error updating person:", error.message);
    return { success: false, error: error.message };
  }

  // Refrescamos la página de inicio para ver los cambios
  revalidatePath("/");
  return { success: true };
}

// Añade esto al final de app/actions.ts

export async function saveAttendance(date: string, personIds: string[]) {
  const supabase = await createClient();

  // 1. Para evitar duplicados si registran el mismo día dos veces,
  // limpiamos los registros existentes de esa fecha en particular
  const { error: deleteError } = await supabase
    .from("attendance_logs")
    .delete()
    .eq("date", date);

  if (deleteError) {
    console.error("Error clearing old logs:", deleteError.message);
    return { success: false, error: deleteError.message };
  }

  // Si no vino nadie (lista vacía), terminamos aquí tras limpiar
  if (personIds.length === 0) {
    revalidatePath("/attendance");
    return { success: true };
  }

  // 2. Preparamos el arreglo de filas a insertar en 'attendance_logs'
  const logsToInsert = personIds.map((id) => ({
    date: date,
    person_id: id,
    //registered_by: null // De momento null hasta que hagamos el login
  }));

  // 3. Insertamos en bloque (Bulk Insert)
  const { error: insertError } = await supabase
    .from("attendance_logs")
    .insert(logsToInsert);

  if (insertError) {
    console.error("Error saving attendance logs:", insertError.message);
    return { success: false, error: insertError.message };
  }

  revalidatePath("/attendance");
  return { success: true };
}

// Añade esto al final de app/actions.ts
import { redirect } from "next/navigation";

// Acción para iniciar sesión
export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return { success: false, error: "Invalid email or password" };
  }

  // Si el login es exitoso, redireccionamos al inicio
  redirect('/');
}

// Acción para cerrar sesión
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}