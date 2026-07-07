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

// 2. MODIFICAR USUARIO (Ej. cambiar email o bloquear)
import { AdminUserAttributes } from '@supabase/supabase-js'

// 2. MODIFICAR USUARIO
export async function adminUpdateUser(userId: string, updates: { email?: string; ban?: boolean }) {
  try {
    await checkSuperAdmin()

    // 💡 Tipamos el objeto correctamente en lugar de usar 'any'
    const payload: AdminUserAttributes = {}

    if (updates.email) payload.email = updates.email

    if (updates.ban) {
      payload.ban_duration = 'none'
    }

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, payload)

    if (error) return { success: false, error: error.message }
    return { success: true, user: data.user }
  } catch (err) {
    // Aprovechamos de corregir también el catch como hicimos antes
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