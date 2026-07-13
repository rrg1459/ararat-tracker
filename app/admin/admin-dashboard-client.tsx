"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserManagement from "./UserManagement";
import PersonManagement, { People } from "./PersonManagement";
import { attendanceLogs } from "./MetricsSummary";
import MetricsSummary from "./MetricsSummary";
import AttendanceCharts from "./AttendanceCharts";
import { User } from "@supabase/supabase-js";

interface AdminDashboardClientProps {
  userName: string;
  userRole: string;
  initialUsers: User[];
  initialPeople: People[];
  attendanceLogs: attendanceLogs[];
}

export default function AdminDashboardClient({
  userName,
  userRole,
  initialUsers,
  initialPeople,
  attendanceLogs
}: AdminDashboardClientProps) {

  const [activeTab, setActiveTab] = useState<"metrics" | "charts" | "users" | "persons">("metrics");

  // 1. Definimos el tipo de las pestañas permitidas
  type TabId = "metrics" | "charts" | "users" | "persons";

  interface TabItem {
    id: TabId;
    shortLabel: string;
    longLabel: string;
  }

  // 2. Aplicamos el tipo al Array base
  const allTabs: TabItem[] = [
    { id: "metrics", shortLabel: "Métricas", longLabel: "Resumen de Métricas" },
    { id: "charts", shortLabel: "Gráficos", longLabel: "Gráficos de Asistencia" },
    { id: "users", shortLabel: "Usuarios", longLabel: "Gestión de Usuarios" },
    { id: "persons", shortLabel: "Personas", longLabel: "Gestión de Personas" },
  ];

  // 3. Filtramos las pestañas basándonos en el rol del usuario
  const visibleTabs = allTabs.filter(tab => {
    if (tab.id === "persons" && userRole !== "superadmin") {
      return false;
    }
    return true;
  });

  // ✨ Sumar dinámicamente cuántos registros tienen person_type === 'member'
  const totalMembersCount = initialPeople.filter(person => person.person_type === "member").length;

  // 🕒 Obtener fechas de referencia actuales
  const now = new Date();

  // Inicio de la semana actual (hace 7 días o calculando el último lunes)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  // Inicio del mes actual (Día 1 del mes en curso a las 00:00:00)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 📊 Filtrar registros buscando en el objeto relacional 'people'
  const visitorsLogs = attendanceLogs.filter(log => log.people?.is_first_time_visitor === true);

  // Calcular totales dinámicos
  const newVisitorsThisWeek = visitorsLogs.filter(log => {
    const logDate = new Date(log.created_at);
    return logDate >= oneWeekAgo;
  }).length;

  const newVisitorsThisMonth = visitorsLogs.filter(log => {
    const logDate = new Date(log.created_at);
    return logDate >= startOfMonth;
  }).length;

  // ==========================================
  // 🔄 2. VISITANTES RECURRENTES (Returning Visitors)
  // ==========================================

  // Paso A: Filtramos todos los logs que pertenecen a alguien de tipo "visitor"
  const generalVisitorLogs = attendanceLogs.filter(log => log.people?.person_type === "visitor");

  // Paso B: Creamos un mapa/diccionario para contar cuántas veces aparece cada 'person_id'
  const visitorAttendanceCounts: { [key: number]: number } = {};

  generalVisitorLogs.forEach(log => {
    const id = log.person_id;
    visitorAttendanceCounts[id] = (visitorAttendanceCounts[id] || 0) + 1;
  });

  // Paso C: Contamos cuántas PERSONAS ÚNICAS tienen 2 o más asistencias
  const returningVisitors = Object.values(visitorAttendanceCounts).filter(
    count => count >= 2
  ).length;

  // ==========================================
  // 📈 3. TASA PROMEDIO DE ASISTENCIA (averageAttendanceRate)
  // ==========================================

  // 1. Obtener el total de personas activas en la iglesia (Miembros + Visitantes Regulares)
  // Excluimos 'new_visitor' si solo queremos medir la fidelidad de la base fija.
  const totalActivePeople = initialPeople.filter(
    person => person.person_type === "member" || person.person_type === "visitor"
  ).length;

  // 2. Agrupar los logs por fecha única (YYYY-MM-DD) para saber cuántos asistieron por día
  const attendancePerDay: { [dateStr: string]: number } = {};

  attendanceLogs.forEach(log => {
    // Extraemos solo la parte de la fecha '2026-03-15' del timestamp '2026-03-15T10:00:00Z'
    const dateStr = log.created_at.split("T")[0];

    // Contamos esta asistencia para ese día específico
    attendancePerDay[dateStr] = (attendancePerDay[dateStr] || 0) + 1;
  });

  // 3. Calcular el porcentaje de asistencia de cada día y promediarlos
  const dailyPercentages = Object.values(attendancePerDay).map(count => {
    if (totalActivePeople === 0) return 0;
    // Porcentaje de este día específico: (Asistentes / Total Iglesia) * 100
    return (count / totalActivePeople) * 100;
  });

  // 4. Sacar el promedio final de todos los días registrados
  const averageAttendanceRate = dailyPercentages.length > 0
    ? parseFloat((dailyPercentages.reduce((sum, pct) => sum + pct, 0) / dailyPercentages.length).toFixed(1))
    : 0; // Retorna 0 si no hay logs aún

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">

        <header className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Info de la aplicación */}
          <div className="flex items-center gap-4 justify-start min-w-0">
            <div className="relative w-[60px] h-[60px] flex-shrink-0">
              <Image
                src="/ararat.png"
                alt="Logo Iglesia Ararat"
                fill
                priority
                className="object-contain"
                sizes="60px"
              />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h1 style={{ fontSize: '20px' }} className="sm:text-3xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                Control de Asistencia
              </h1>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm block sm:hidden">
                Admin Dashboard
              </p>

              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5 truncate">
                Sesión: <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{userName}</span>
                <span className="text-[9px] uppercase tracking-wider font-bold bg-terracota/10 text-terracota dark:bg-terracota/20 dark:text-terracota-light px-1.5 py-0.5 rounded flex-shrink-0 ml-2.5">
                  {userRole}
                </span>
              </p>
            </div>
          </div>

          {/* Botones de navegación nativa condicionales */}
          <div className="flex items-center gap-3 justify-start sm:justify-end flex-wrap">
            <Link
              href="/"
              className="px-3 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm"
            >
              Home
            </Link>
          </div>
        </header>

        {/* Sistema de Pestañas (Tabs) */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-8 overflow-x-auto scrollbar-none gap-1 sm:gap-2 -mb-[1px]">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap focus:outline-none ${isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 z-10"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
              >
                {/* Texto corto para móvil, largo para escritorio */}
                <span className="md:hidden">{tab.shortLabel}</span>
                <span className="hidden md:inline">{tab.longLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido Dinámico de las Pestañas (Se protege también por seguridad del render) */}
        <main className="mt-4">
          {activeTab === "metrics" &&
            <MetricsSummary
              totalMembers={totalMembersCount}
              totalVisitors={visitorsLogs.length}
              averageAttendanceRate={averageAttendanceRate}
              newVisitorsThisMonth={newVisitorsThisMonth}
              newVisitorsThisWeek={newVisitorsThisWeek}
              returningVisitors={returningVisitors}
            />}
          {activeTab === "charts" && <AttendanceCharts />}
          {activeTab === "users" && <UserManagement userRole={userRole} initialUsers={initialUsers} />}
          {activeTab === "persons" && userRole === "superadmin" && <PersonManagement initialPeople={initialPeople} />}
        </main>
      </div>
    </div>
  );
}