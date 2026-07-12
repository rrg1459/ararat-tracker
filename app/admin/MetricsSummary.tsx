
export interface attendanceLogs {
  id: number;
  date: string;
  person_id: number;
  registered_by: number | null;
  notes: string | null;
}

interface MetricsSummaryProps {
  totalMembers?: number; // Prop opcional por si acaso
  averageAttendanceRate?: number;
  newVisitorsThisMonth?: number;
  newVisitorsThisWeek?: number;
  returningVisitors?: number;
}

export default function MetricsSummary({
  totalMembers = 0,
  averageAttendanceRate = 0,
  newVisitorsThisMonth = 0,
  newVisitorsThisWeek = 0,
  returningVisitors = 0 }: MetricsSummaryProps) {
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-orange-800 dark:text-orange-100 sm:text-3xl">
          Métricas ... en desarrollo
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total de Miembros</h3>
          <p className="text-3xl font-bold mt-2 text-zinc-900 dark:text-zinc-100">{totalMembers}</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Promedio de Tasa de Asistencia (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">{averageAttendanceRate}%</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Nuevos Visitantes (este mes) (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-blue-800 dark:text-blue-400">+{newVisitorsThisMonth}</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Nuevos Visitantes (esta semana) (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">+{newVisitorsThisWeek}</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Visitantes Recurrentes (mock)</h3>
          <p className="text-3xl font-bold mt-2 text-red-600 dark:text-red-400">+{returningVisitors}</p>
        </div>
      </div>
    </>
  );
}
