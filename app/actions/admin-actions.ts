// app/actions/admin-actions.ts
'use server'

import { createAdminClient } from '../utils/supabase-admin'
import { createClient } from '../utils/supabase'
import { AdminUserAttributes } from '@supabase/supabase-js'

const supabaseAdmin = createAdminClient();

type AdminActorRole = 'admin' | 'superadmin'

// Función auxiliar para verificar si el usuario actual es admin o superadmin
async function checkAdminActor(): Promise<AdminActorRole> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('No autenticado')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'superadmin' && profile?.role !== 'admin') {
    throw new Error('Acceso denegado: No eres admin ni superadmin')
  }

  return profile.role as AdminActorRole
}

// 1. CREAR USUARIO
export async function adminCreateUser(email: string, password: string, fullName: string) {
  try {
    await checkAdminActor()
    const normalizedRole = 'operator'

    // 1. Crear en Supabase Auth
    // Guardamos 'role' dentro de los metadatos. Si tienes un trigger en Postgres, 
    // asegúrate de que tu función SQL lea: new.raw_user_meta_data->>'role'
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: normalizedRole }
    })

    if (error) return { success: false, error: error.message }

    const newUserId = data.user.id

    // 2. Forzar inserción o actualización (Upsert) en la tabla 'profiles'
    // Esto asegura que si el trigger nativo ya insertó una fila vacía, nosotros la llenemos con el nombre y ROL correctos.
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: newUserId,
        full_name: fullName,
        role: normalizedRole,
        email: email
      })

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(newUserId)
      return { success: false, error: `Error al registrar rol en perfil: ${profileError.message}` }
    }

    return { success: true, user: data.user }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
    return { success: false, error: errorMessage };
  }
}

// 2. ACTUALIZAR USUARIO
export async function adminUpdateUser(
  userId: string,
  updates: { email?: string; password?: string; fullName?: string; role?: string; ban?: boolean }
) {
  try {
    const actorRole = await checkAdminActor()

    if (actorRole === 'admin') {
      const { data: targetProfile } = await supabaseAdmin
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (!targetProfile || targetProfile.role !== 'operator') {
        throw new Error('Acceso denegado: solo puedes editar usuarios operator')
      }
    }

    const payload: AdminUserAttributes = {}

    // Si viene un correo nuevo, lo inyectamos al Auth payload
    if (updates.email) payload.email = updates.email
    if (updates.password) payload.password = updates.password

    // Modificamos metadatos en Auth
    if (updates.fullName || updates.role) {
      payload.user_metadata = {
        ...(updates.fullName ? { full_name: updates.fullName } : {}),
        ...(updates.role ? { role: 'operator' } : {})
      }
    }

    if (updates.ban) {
      payload.ban_duration = 'none'
    }

    // 1. Actualizar en Supabase Auth (Cambia el correo en el sistema de autenticación)
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, payload)

    if (error) return { success: false, error: error.message }

    // 2. Actualizar la tabla pública 'profiles'
    // Creamos un objeto dinámico con todo lo que cambió, incluyendo el EMAIL si se modificó.
    const profileUpdates: { role?: string; full_name?: string; email?: string } = {}

    if (updates.role) profileUpdates.role = 'operator'
    if (updates.fullName) profileUpdates.full_name = updates.fullName
    if (updates.email) profileUpdates.email = updates.email // 👈 SOLUCIÓN: Sincroniza el nuevo email en la tabla 'profiles'

    // Solo hacemos la consulta si de verdad hay campos públicos que cambiar
    if (Object.keys(profileUpdates).length > 0) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update(profileUpdates)
        .eq('id', userId)

      if (profileError) return { success: false, error: `Error al actualizar perfil: ${profileError.message}` }
    }

    return { success: true, user: data.user }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
    return { success: false, error: errorMessage }
  }
}

// 3. ELIMINAR USUARIO
export async function adminDeleteUser(userId: string) {
  try {
    const actorRole = await checkAdminActor()

    if (actorRole === 'admin') {
      const { data: targetProfile } = await supabaseAdmin
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (!targetProfile || targetProfile.role !== 'operator') {
        throw new Error('Acceso denegado: solo puedes eliminar usuarios operator')
      }
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
    return { success: false, error: errorMessage };
  }
}