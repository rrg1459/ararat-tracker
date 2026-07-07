// app/admin/dashboard/UserManagement.tsx
'use client'

import { useState } from 'react'
import { adminCreateUser, adminDeleteUser, adminUpdateUser } from '@/app/actions/admin-actions'

export default function UserManagement() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Creando usuario...')
    const res = await adminCreateUser(email, password, name)
    if (res.success) {
      setMessage(`Usuario creado con éxito: ${res.user?.id}`)
      setEmail(''); setPassword(''); setName('')
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
    } else {
      setMessage(`Error: ${res.error}`)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold">Panel de Gestión de Usuarios (Superadmin)</h2>

      {message && <p className="p-2 bg-blue-100 text-blue-700 rounded">{message}</p>}

      {/* Formulario de Creación */}
      <form onSubmit={handleCreate} className="space-y-3">
        <h3 className="font-semibold text-lg">Crear Nuevo Usuario</h3>
        <input
          type="text" placeholder="Nombre Completo" value={name}
          onChange={e => setName(e.target.value)} required
          className="w-full p-2 border rounded"
        />
        <input
          type="email" placeholder="Correo Electrónico" value={email}
          onChange={e => setEmail(e.target.value)} required
          className="w-full p-2 border rounded"
        />
        <input
          type="password" placeholder="Contraseña Temporal" value={password}
          onChange={e => setPassword(e.target.value)} required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Crear Usuario
        </button>
      </form>

      {/* Ejemplo rápido de botones de acción para usuarios existentes */}
      <div className="pt-4 border-t">
        <h3 className="font-semibold text-lg mb-2">Acciones Rápidas (Ejemplo con ID simulado)</h3>
        <div className="flex gap-2">
          <button
            onClick={() => adminUpdateUser('id-del-usuario-aqui', { email: 'nuevo_correo@ejemplo.com' })}
            className="bg-yellow-500 text-white p-2 rounded text-sm"
          >
            Modificar Email de Prueba
          </button>
          <button
            onClick={() => handleDelete('id-del-usuario-aqui')}
            className="bg-red-600 text-white p-2 rounded text-sm"
          >
            Eliminar Usuario de Prueba
          </button>
        </div>
      </div>
    </div>
  )
}