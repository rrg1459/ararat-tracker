// UserSettingsModal.tsx
'use client';

import { useState, useRef } from 'react';
import GrUserSettings from '../svg/GrUserSettings';
// Si vas a crear una server action para actualizar al usuario en Supabase, la importas aquí:
import { logout, updateOwnUserSettings } from '../actions/actions';

interface UserSettingsModalProps {
  userId: string;
  initialName: string;
  initialEmail: string;
}

export default function UserSettingsModal({
  userId,
  initialName,
  initialEmail,
}: UserSettingsModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const logoutFormRef = useRef<HTMLFormElement>(null);

  const [editName, setEditName] = useState(initialName || '');
  const [editEmail, setEditEmail] = useState(initialEmail || '');
  const [editPassword, setEditPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const openModal = () => {
    setErrorMessage('');
    setSuccessMessage('');
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const trimmedName = editName.trim();
      const trimmedEmail = editEmail.trim();
      const trimmedPassword = editPassword.trim();

      const updates: { fullName?: string; email?: string; password?: string } = {};

      if (trimmedName !== (initialName || '').trim()) {
        updates.fullName = trimmedName;
      }

      if (trimmedEmail !== (initialEmail || '').trim()) {
        updates.email = trimmedEmail;
      }

      if (trimmedPassword) {
        updates.password = trimmedPassword;
      }

      if (Object.keys(updates).length === 0) {
        setErrorMessage('No hay cambios para guardar.');
        return;
      }

      const result = await updateOwnUserSettings(updates);

      if (!result?.success) {
        throw new Error(
          typeof result?.error === 'string' && result.error.trim() !== ''
            ? result.error
            : 'No se pudo actualizar el usuario.'
        );
      }

      console.log('Actualizando usuario:', { userId, editName, editEmail, editPassword });

      setEditPassword(''); // Limpiar contraseña después de guardar
      setSuccessMessage('Datos actualizados. Cerrando sesión...');

      // Enviar como formulario evita respuestas inesperadas al invocar la server action desde onClick.
      setTimeout(() => {
        closeModal();
        logoutFormRef.current?.requestSubmit();
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar:', error);
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocurrió un error inesperado al guardar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón que reemplaza al form vacío que tenías en page.tsx */}
      <button
        type="button"
        onClick={openModal}
        aria-label="settings"
        className="text-zinc-700 dark:text-zinc-200 rounded-md font-semibold hover:bg-blue-300 dark:hover:bg-blue-600 transition-colors cursor-pointer text-sm"
        title="Configuración de Usuario"
      >
        <GrUserSettings size={26} />
      </button>

      {/* Modal nativo con el formato que pediste */}
      <dialog
        ref={modalRef}
        className="backdrop:bg-black/40 p-6 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 w-full max-w-sm fixed top-32 left-1/2 -translate-x-1/2 m-0 text-zinc-900 dark:text-zinc-100"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
            Editando mis datos
          </p>

          <div>
            <label className="block text-[11px] font-medium text-zinc-500">
              Nombre Completo
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-1.5 text-sm rounded border border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-500">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full p-1.5 text-sm rounded border border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-500">
              Nueva Contraseña (dejar en blanco para no cambiar)
            </label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full p-1.5 text-sm rounded border border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="flex justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="text-xs bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-md hover:bg-zinc-300 dark:bg-zinc-600 dark:text-zinc-200 disabled:opacity-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 font-semibold disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1 text-center">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 text-center">
              {successMessage}
            </p>
          )}
        </div>
      </dialog>

      <form ref={logoutFormRef} action={logout} className="hidden" />
    </>
  );
}