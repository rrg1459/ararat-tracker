// Subcomponentes Mock/Esqueleto para las pestañas solicitadas
export default function MetricsSummary() {
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-orange-800 dark:text-orange-100 sm:text-3xl">
          Métricas ... en desarrollo
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total de Miembros (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-zinc-900 dark:text-zinc-100">142</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Promedio de Tasa de Asistencia (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">84.5%</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Nuevos Visitantes (este mes) (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-blue-800 dark:text-blue-400">+18</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Nuevos Visitantes (esta semana) (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">+18</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Visitantes Recurrentes (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-red-600 dark:text-red-400">+12</p>
        </div>
      </div>
    </>
  );
}
