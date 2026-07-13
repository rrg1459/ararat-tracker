"use client";

import { useState, useEffect } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 1. Definimos las interfaces exactas de lo que calcula el backend/padre
interface TrendItem {
  date: string;
  miembros: number;
  visitantes: number;
  total: number;
}

interface CompositionItem {
  name: string;
  value: number;
}

interface NeedsItem {
  name: string;
  cantidad: number;
}

interface MonthlyVisitorsItem {
  month: string;
  cantidad: number;
}

interface AttendanceChartsProps {
  trendData: TrendItem[];
  compositionData: CompositionItem[];
  needsData: NeedsItem[];
  monthlyVisitorsData: MonthlyVisitorsItem[];
}

// Colores bonitos para el gráfico de pastel/tarta (Miembros, Visitantes, Líderes)
const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

export default function AttendanceCharts({
  trendData,
  compositionData,
  needsData,
  monthlyVisitorsData,
}: AttendanceChartsProps) {

  // Estado para detectar si la pantalla es pequeña (ej. menor a 640px)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px es el breakpoint 'sm' de Tailwind
    };

    checkMobile(); // Evaluar al cargar
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

      {/* 📈 GRÁFICO 1: TENDENCIA DE ASISTENCIA */}
      <div className="bg-white dark:bg-zinc-800 p-3 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm col-span-1 md:col-span-2">
        <h3 className="text-base font-bold mb-1 text-zinc-800 dark:text-zinc-100">Tendencia de Asistencia</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Evolución del flujo de miembros vs visitantes por reunión</p>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData}
              margin={{ left: isMobile ? -20 : 0, right: isMobile ? 5 : 10, top: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-100 dark:stroke-zinc-700" />
              <XAxis dataKey="date" className="text-[11px] fill-zinc-400" />
              <YAxis className="text-[11px] fill-zinc-400" />
              <Tooltip contentStyle={{ borderRadius: "8px" }} />
              {/* Ajustamos la leyenda para móviles */}
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: isMobile ? "10px" : "0px"
                }}
                verticalAlign={isMobile ? "bottom" : "top"}
                align="center"
              />
              <Area type="monotone" dataKey="miembros" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} name="Miembros" />
              <Area type="monotone" dataKey="visitantes" stroke="#10b981" fill="#10b981" fillOpacity={0.1} name="Visitantes" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📊 GRÁFICO 2: VISITANTES NUEVOS POR MES */}
      <div className="bg-white dark:bg-zinc-800 p-3 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <h3 className="text-base font-bold mb-1 text-zinc-800 dark:text-zinc-100">Nuevos Visitantes por Mes</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Personas que asistieron por primera vez</p>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyVisitorsData}
              margin={{ left: isMobile ? -20 : 0, right: isMobile ? 5 : 10, top: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-100 dark:stroke-zinc-700" />
              <XAxis dataKey="month" className="text-[11px] fill-zinc-400" />
              <YAxis className="text-[11px] fill-zinc-400" />
              <Tooltip contentStyle={{ borderRadius: "8px" }} />
              <Bar
                dataKey="cantidad"
                fill="#818cf8"
                radius={[4, 4, 0, 0]}
                name="Visitantes"
                barSize={isMobile ? 40 : 60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🍩 GRÁFICO 3: COMPOSICIÓN DE LA IGLESIA */}
      <div className="bg-white dark:bg-zinc-800 p-3 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <h3 className="text-base font-bold mb-1 text-zinc-800 dark:text-zinc-100">Composición General</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Distribución total en la base de datos</p>
        <div className="w-full h-[260px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={compositionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {compositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📋 GRÁFICO 4: RETENCIÓN Y PASOS DE FE / NECESIDADES */}
      <div className="bg-white dark:bg-zinc-800 p-3 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm col-span-1 md:col-span-2">
        <h3 className="text-base font-bold mb-1 text-zinc-800 dark:text-zinc-100">Pasos de Fe y Peticiones</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Métricas de consolidación y necesidades registradas</p>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={needsData}
              layout="vertical"
              margin={{ left: isMobile ? 0 : 30, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-100 dark:stroke-zinc-700" />
              <XAxis type="number" className="text-[11px] fill-zinc-400" />
              <YAxis
                dataKey="name"
                type="category"
                className="text-[11px] fill-zinc-600 dark:fill-zinc-300"
                width={isMobile ? 70 : 120}
              />
              <Tooltip contentStyle={{ borderRadius: "8px" }} />
              <Bar
                dataKey="cantidad"
                fill="#ec4899"
                radius={[0, 4, 4, 0]}
                name="Personas"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}