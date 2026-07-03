'use client'

export default function AttendanceView() {
  return (
    <main className="bg-white p-6 rounded-xl shadow-xs border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
        Registrar Asistencia del Día
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6">
        Aquí puedes colocar el buscador de personas, lista de chequeo (checklists) o el lector de código/cédula para marcar la asistencia actual.
      </p>

      <div className="p-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg text-center">
        <p className="text-zinc-400 dark:text-zinc-500 italic">
          [Espacio asignado para los controles e inputs de toma de asistencia]
        </p>
      </div>
    </main>
  );
}