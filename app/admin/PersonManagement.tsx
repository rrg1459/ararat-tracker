export default function PersonManagement() {
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-orange-800 dark:text-orange-100 sm:text-3xl mb-20">
          Personas ... en desarrollo
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Funcionalidad para administrar personas registradas en la base de datos
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm min-h-[300px] flex flex-col justify-center items-center text-zinc-500 dark:text-zinc-400 animate-fadeIn">
        <p className="font-medium">Cargando gestión de personas...</p>
        <span className="text-xs mt-1 text-zinc-400">(Integrar tabla y formularios aquí)</span>
      </div>
    </>
  );
}