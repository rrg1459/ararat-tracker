"use client";

import { useActionState } from "react";
import { login, type ActionState } from "../actions/actions";
import AraratLogo from "../components/AraratLogo";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700">

        <div className="text-center mb-6">
          <AraratLogo size={180} priority className="mx-auto mb-4" />

          <h1 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
            Control de Asistencia
          </h1>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dirección de correo</label>
            <input
              type="email"
              name="email"
              required
              // MANTIENE EL CORREO: si hay error, reasigna lo que el usuario escribió
              defaultValue={state?.email || ""}
              placeholder="nombre@correo.com"
              className="w-full p-2.5 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full p-2.5 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors cursor-pointer mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {/* CONTENEDOR CON ALTURA FIJA PARA EVITAR EL SALTO VISUAL */}
          <div className="min-h-[20px] flex items-center justify-center text-center mt-1">
            {state?.error && (
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                {state.error}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}