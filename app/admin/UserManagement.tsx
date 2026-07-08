'use client'

import { useState } from 'react'
import { adminCreateUser, adminDeleteUser, adminUpdateUser } from '@/app/actions/admin-actions'
import { useRouter } from "next/navigation";

interface AuthUser {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    role?: string
  }
}

export default function UserManagement({ initialUsers = [] }: { initialUsers?: AuthUser[] }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [createRole, setCreateRole] = useState('operator') // 👈 Nuevo estado (puedes poner 'operator' o tu rol por defecto inicial)
  const [message, setMessage] = useState('')
  const router = useRouter()

  // --- ESTADOS PARA LA EDICIÓN INLINE ---
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [editRole, setEditRole] = useState('')

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Creando usuario...')

    // 🔑 AQUÍ: Ahora sí le enviamos el 'createRole' al backend
    const res = await adminCreateUser(email, password, name, createRole)

    if (res.success) {
      setMessage(`Usuario ${name} creado con éxito`)
      setEmail('');
      setPassword('');
      setName('');
      setCreateRole('operator'); // Reseteamos al valor por defecto
      router.refresh();
    } else {
      setMessage(`Error: ${res.error}`)
    }
  }

  // Añadimos el "?" en userName para indicar que puede ser opcional
  const handleDelete = async (userId: string, userName?: string) => {
    // Si userName no existe, usamos 'este usuario' por defecto
    const nameToDisplay = userName || 'este usuario'

    if (!confirm(`¿Seguro que quieres eliminar el usuario ${nameToDisplay}?`)) return

    setMessage('Eliminando...')
    const res = await adminDeleteUser(userId)
    if (res.success) {
      setMessage(`Usuario ${nameToDisplay} eliminado correctamente`)
      router.refresh();
    } else {
      setMessage(`Error: ${res.error}`)
    }
  }

  // Activa el modo edición cargando los valores actuales
  const startEditing = (user: AuthUser) => {
    setEditingUserId(user.id)
    setEditName(user.user_metadata?.full_name || '')
    setEditEmail(user.email || '')
    setEditPassword('') // Se deja vacío para que solo cambie si escriben algo
    setEditRole(user.user_metadata?.role || 'user')
  }

  const handleUpdate = async (userId: string) => {
    setMessage('Actualizando usuario...')

    const updates: { email?: string; fullName?: string; password?: string; role?: string } = {
      email: editEmail,
      fullName: editName,
      role: editRole // 👈 Enviar el rol seleccionado
    }

    if (editPassword.trim().length >= 6) {
      updates.password = editPassword
    } else if (editPassword.trim().length > 0) {
      setMessage('Error: La nueva contraseña debe tener al menos 6 caracteres.')
      return
    }

    const res = await adminUpdateUser(userId, updates)

    if (res.success) {
      setMessage('Usuario actualizado con éxito.')
      setEditingUserId(null)
      router.refresh()
    } else {
      setMessage(`Error al actualizar: ${res.error}`)
    }
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          Gestión de Usuarios ... en desarrollo
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Resumen general del estado y rendimiento actual
        </p>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4">

        {/* COLUMNA 1: FORMULARIO DE CREACIÓN */}
        <section className="lg:col-span-5 bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
          <h2 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
            Panel de Gestión de Usuarios
          </h2>

          {message && <p className="p-2 mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded text-sm">{message}</p>}

          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <h3 className="font-semibold text-base text-zinc-700 dark:text-zinc-300">Crear Nuevo Usuario</h3>

            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo *</label>
              <input
                type="text"
                placeholder="Ej: Juan Pérez"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico *</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="off"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rol del Usuario *</label>
              <select
                value={createRole} // 👈 Cambiado de editRole a createRole
                onChange={e => setCreateRole(e.target.value)} // 👈 Cambiado de setEditRole a setCreateRole
                className="w-full p-2 text-sm rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              >
                <option value="operator">Operator</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña *</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-700 transition-colors cursor-pointer mt-2">
              Crear Usuario
            </button>
          </form>
        </section>

        {/* COLUMNA 2: LISTADO CON EDICIÓN INTEGRADA */}
        <section className="lg:col-span-7 bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
          <h2 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
            Usuarios en Autenticación ({initialUsers.length})
          </h2>

          <div className="flex flex-col gap-3 max-h-[550px] overflow-y-auto pr-2">
            {initialUsers.length === 0 ? (
              <p className="text-zinc-500 text-sm italic">No hay usuarios registrados en autenticación.</p>
            ) : (
              initialUsers.map((user) => {
                const isEditing = editingUserId === user.id
                const fullName = user.user_metadata?.full_name || "Sin Nombre"
                const userRole = user.user_metadata?.role || "user"

                return (
                  <div
                    key={user.id}
                    className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 dark:bg-zinc-700/50 dark:border-zinc-600 flex flex-col gap-3"
                  >
                    {isEditing ? (
                      /* --- VISTA MODO EDICIÓN --- */
                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          Editando Usuario
                        </p>

                        <div>
                          <label className="block text-[11px] font-medium text-zinc-500">Nombre Completo</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            className="w-full p-1.5 text-sm rounded border border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-zinc-500">Correo Electrónico</label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={e => setEditEmail(e.target.value)}
                            className="w-full p-1.5 text-sm rounded border border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-zinc-500">Rol del Usuario</label>
                          <select
                            value={editRole}
                            onChange={e => setEditRole(e.target.value)}
                            className="w-full p-1.5 text-sm rounded border border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-blue-500"
                          >
                            <option value="operator">Operator</option>
                            <option value="admin">Admin</option>
                            {/* <option value="superadmin">Superadmin</option> */}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-zinc-500">Nueva Contraseña (dejar en blanco para no cambiar)</label>
                          <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={editPassword}
                            onChange={e => setEditPassword(e.target.value)}
                            className="w-full p-1.5 text-sm rounded border border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>

                        <div className="flex justify-center gap-2 mt-2">
                          <button
                            onClick={() => setEditingUserId(null)}
                            className="text-xs bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-md hover:bg-zinc-300 dark:bg-zinc-600 dark:text-zinc-200"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleUpdate(user.id)}
                            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 font-semibold"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* --- VISTA MODO LECTURA --- */
                      <div className="flex justify-between items-center gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm truncate">{fullName}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">📧 {user.email}</p>
                          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">ID: {user.id}</p>

                          <div className="flex flex-wrap gap-1 mt-1.5">
                            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${userRole === 'superadmin'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              }`}>
                              {userRole === 'superadmin' && 'Superadmin 👑'}
                              {userRole === 'admin' && 'Admin 🛡️'}
                              {userRole === 'operator' && 'Operator ⚙️'}
                              {userRole === 'user' && 'Usuario'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-1.5">
                          <button
                            onClick={() => startEditing(user)}
                            className="text-xs bg-white text-zinc-700 border border-zinc-300 px-2.5 py-1.5 rounded-md hover:bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-200 dark:border-zinc-500 dark:hover:bg-zinc-500 transition-colors cursor-pointer font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(user.id, fullName || user.email)}
                            className="text-xs bg-red-50 text-red-600 border border-red-200 px-2.5 py-1.5 rounded-md hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-900/40 transition-colors cursor-pointer font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </section>
      </main>
    </>
  )
}