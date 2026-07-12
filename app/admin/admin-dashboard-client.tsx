"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserManagement from "./UserManagement";
import PersonManagement, { People } from "./PersonManagement";
import MetricsSummary from "./MetricsSummary";
import AttendanceCharts from "./AttendanceCharts";
import { User } from "@supabase/supabase-js";

interface AdminDashboardClientProps {
  userName: string;
  userRole: string;
  initialUsers: User[];
  initialPeople: People[];
}

export default function AdminDashboardClient({
  userName,
  userRole,
  initialUsers,
  initialPeople
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
          {activeTab === "metrics" && <MetricsSummary totalMembers={totalMembersCount} />}
          {activeTab === "charts" && <AttendanceCharts />}
          {activeTab === "users" && <UserManagement userRole={userRole} initialUsers={initialUsers} />}
          {activeTab === "persons" && userRole === "superadmin" && <PersonManagement initialPeople={initialPeople} />}
        </main>
      </div>
    </div>
  );
}