import { login } from "../actions";
import Image from "next/image"; // 1. Importamos el componente de optimización de imágenes

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700">

        <div className="text-center mb-6">
          {/* 2. Contenedor para centrar y dimensionar el logo */}
          <div className="relative w-[180px] h-[180px] mx-auto mb-4">
            <Image
              src="/ararat.png"
              alt="Logo Iglesia Ararat"
              fill
              priority
              className="object-contain"
              sizes="180px"
            />
          </div>

          {/* CAMBIO AQUÍ: Se agregó whitespace-nowrap y tamaños de texto adaptativos */}
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
            Control de Asistencia
          </h1>
        </div>

        <form action={login} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dirección de correo</label>
            <input
              type="email"
              name="email"
              required
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
              placeholder="••••••••"
              className="w-full p-2.5 rounded-md border border-zinc-300 bg-transparent focus:outline-blue-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors cursor-pointer mt-2"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}