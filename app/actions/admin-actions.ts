// app/actions/admin-actions.ts
'use server'

import { createAdminClient } from '../utils/supabase-admin' // Tu cliente de servidor normal para chequear la sesión actual

const supabaseAdmin = createAdminClient();

// 1. IMPORTA TU CLIENTE DE SERVIDOR NORMAL (El que maneja las cookies)
// Dependiendo de tu estructura, suele exportarse desde un archivo utilitario. Por ejemplo:
import { createClient } from '../utils/supabase'

// Función auxiliar para verificar si el usuario actual es Superadmin
async function checkSuperAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('No autenticado')

  // Verificamos su rol en tu tabla profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'superadmin') {
    throw new Error('Acceso denegado: No eres superadmin')
  }
}

// 1. CREAR USUARIO
export async function adminCreateUser(email: string, password: string, fullName: string) {
  try {
    await checkSuperAdmin()

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ⚠️ ESTO ES CRUCIAL para que el trigger lo reciba y lo guarde en 'profiles':
      user_metadata: { full_name: fullName }
    })

    if (error) return { success: false, error: error.message }
    return { success: true, user: data.user }
  } catch (err) {
    // Comprobamos si el error es un objeto de tipo Error nativo
    const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
    return { success: false, error: errorMessage };
  }
}

import { AdminUserAttributes } from '@supabase/supabase-js'

export async function adminUpdateUser(
  userId: string,
  updates: { email?: string; password?: string; fullName?: string; role?: string; ban?: boolean }
) {
  try {
    await checkSuperAdmin()

    const payload: AdminUserAttributes = {}

    if (updates.email) payload.email = updates.email
    if (updates.password) payload.password = updates.password

    // Construimos las actualizaciones de metadatos de forma segura
    if (updates.fullName || updates.role) {
      payload.user_metadata = {
        ...(updates.fullName ? { full_name: updates.fullName } : {}),
        ...(updates.role ? { role: updates.role } : {})
      }
    }

    if (updates.ban) {
      payload.ban_duration = 'none'
    }

    // 1. Actualizar en Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, payload)

    if (error) return { success: false, error: error.message }

    // 2. Actualizar en la tabla 'profiles' (ya que allí se valida el acceso del ecosistema)
    if (updates.role) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({ role: updates.role })
        .eq('id', userId)

      if (profileError) return { success: false, error: profileError.message }
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
    await checkSuperAdmin()

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    // Comprobamos si el error es un objeto de tipo Error nativo
    const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
    return { success: false, error: errorMessage };
  }
}