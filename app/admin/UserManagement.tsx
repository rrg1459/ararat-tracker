// app/admin/dashboard/UserManagement.tsx
'use client'

import { useState } from 'react'
import { adminCreateUser, adminDeleteUser, adminUpdateUser } from '@/app/actions/admin-actions'
import { useRouter } from "next/navigation";

// Definimos una interfaz básica para el tipado de los usuarios de Supabase Auth
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
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Creando usuario...')
    const res = await adminCreateUser(email, password, name)
    if (res.success) {
      setMessage(`Usuario creado con éxito: ${res.user?.id}`)
      setEmail(''); setPassword(''); setName('')
      router.refresh();
    } else {
      setMessage(`Error: ${res.error}`)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('¿Seguro que quieres eliminar este usuario de la autenticación?')) return
    setMessage('Eliminando...')
    const res = await adminDeleteUser(userId)
    if (res.success) {
      setMessage('Usuario eliminado correctamente.')
      router.refresh();
    } else {
      setMessage(`Error: ${res.error}`)
    }
  }

  return (
    // Estructura grid responsiva (Lg: al lado, Móvil: debajo)
    <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4">

      {/* COLUMNA 1: FORMULARIO */}
      <section className="lg:col-span-6 bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
        <h2 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          Panel de Gestión de Usuarios (Superadmin)
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
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña Temporal *</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-700 transition-colors cursor-pointer mt-2">
            Crear Usuario
          </button>
        </form>
      </section>

      {/* COLUMNA 2: LISTADO REPLICADO DE MANAGER */}
      <section className="lg:col-span-6 bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
        <h2 className="text-md sm:text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
          Usuarios en Autenticación ({initialUsers.length})
        </h2>

        {/* Contenedor con scroll vertical idéntico al de personas registradas */}
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
          {initialUsers.length === 0 ? (
            <p className="text-zinc-500 text-sm italic">No hay usuarios registrados en autenticación.</p>
          ) : (
            initialUsers.map((user) => {
              const fullName = user.user_metadata?.full_name || "Sin Nombre"
              const userRole = user.user_metadata?.role || "user"

              return (
                <div
                  key={user.id}
                  className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 flex justify-between items-center gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">
                      {fullName}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      📧 {user.email}
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                      ID: {user.id}
                    </p>

                    {/* Contenedor de Etiquetas (Estilo Badge)[cite: 3] */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${userRole === 'superadmin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                        {userRole === 'superadmin' ? 'Superadmin 👑' : 'Usuario'}
                      </span>
                    </div>
                  </div>

                  {/* Acciones para cada usuario específico de la lista */}
                  <div className="flex flex-col sm:flex-row gap-1.5">
                    <button
                      onClick={() => adminUpdateUser(user.id, { email: prompt(`Nuevo email para ${fullName}:`, user.email) || undefined })}
                      className="text-xs bg-white text-zinc-700 border border-zinc-300 px-2.5 py-1.5 rounded-md hover:bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-200 dark:border-zinc-500 dark:hover:bg-zinc-500 transition-colors cursor-pointer font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-xs bg-red-50 text-red-600 border border-red-200 px-2.5 py-1.5 rounded-md hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-900/40 transition-colors cursor-pointer font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

    </main>
  )
}