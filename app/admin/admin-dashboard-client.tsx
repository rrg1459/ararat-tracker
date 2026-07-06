"use client";

import { useState } from "react";
import Image from "next/image";
import { logout } from "../actions";
import Link from "next/link";

// Subcomponentes Mock/Esqueleto para las pestañas solicitadas
function MetricsSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Members</h3>
        <p className="text-3xl font-bold mt-2 text-zinc-900 dark:text-zinc-100">142</p>
      </div>
      <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Avg. Attendance Rate</h3>
        <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">84.5%</p>
      </div>
      <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">New Visitors (Month)</h3>
        <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">+18</p>
      </div>
    </div>
  );
}

function AttendanceCharts() {
  return (
    <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm min-h-[300px] flex flex-col justify-center items-center text-zinc-500 dark:text-zinc-400 animate-fadeIn">
      <div className="w-12 h-12 rounded-full border-4 border-t-indigo-600 border-zinc-200 animate-spin mb-4"></div>
      <p className="font-medium">Loading Attendance Analytics Charts...</p>
      <span className="text-xs mt-1 text-zinc-400">(Integrate Chart.js or Recharts here)</span>
    </div>
  );
}

function UserManagement({ role }: { role: string }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden animate-fadeIn">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">System Users</h3>
          <p className="text-sm text-zinc-500">Manage roles and application access privileges.</p>
        </div>
        {role === "superadmin" && (
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold text-sm hover:bg-indigo-700 transition-colors">
            Invite New User
          </button>
        )}
      </div>
      <div className="p-6 text-zinc-600 dark:text-zinc-300 text-sm">
        <p>List of platform administrative accounts and system-wide roles will be populated here.</p>
      </div>
    </div>
  );
}

export default function AdminDashboardClient({ userName, userRole }: { userName: string, userRole: string }) {
  const [activeTab, setActiveTab] = useState<"metrics" | "charts" | "users">("metrics");

  // 1. Definimos el tipo de las pestañas permitidas
  type TabId = "metrics" | "charts" | "users";

  interface TabItem {
    id: TabId;
    shortLabel: string;
    longLabel: string;
  }

  // 2. Aplicamos el tipo al Array
  const TABS: TabItem[] = [
    { id: "metrics", shortLabel: "Metrics", longLabel: "Metrics Summary" },
    { id: "charts", shortLabel: "Charts", longLabel: "Attendance Charts" },
    { id: "users", shortLabel: "Users", longLabel: "User Management" },
  ];
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
              <p className="text-zinc-600 dark:text-zinc-400 sm:block">
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
              className="px-5 py-2.5 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm"
            >
              Home
            </Link>

            <form action={logout}>
              <button type="submit" className="bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 px-4 py-2.5 rounded-md font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer text-sm">
                Cerrar sesión
              </button>
            </form>
          </div>
        </header>

        {/* Sistema de Pestañas (Tabs en Inglés) */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-8 overflow-x-auto gap-1 sm:gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-3 sm:px-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
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

        {/* Contenido Dinámico de las Pestañas */}
        <main className="mt-4">
          {activeTab === "metrics" && <MetricsSummary />}
          {activeTab === "charts" && <AttendanceCharts />}
          {activeTab === "users" && <UserManagement role={userRole} />}
        </main>
      </div>
    </div>
  );
}