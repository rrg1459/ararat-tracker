"use client";

import Link from "next/link";
import AraratLogo from "../components/AraratLogo";
import FaSignOutAlt from "../svg/FaSignOutAlt";
import { logout } from "../actions/actions";

interface AdminHeaderProps {
  userName: string;
  userRole: string;
  onHomeClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  logoPriority?: boolean;
}

export default function AdminHeader({
  userName,
  userRole,
  onHomeClick,
  logoPriority = false,
}: AdminHeaderProps) {
  return (
    <header className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4 justify-start min-w-0">
        <AraratLogo size={60} priority={logoPriority} />
        <div className="min-w-0 flex flex-col justify-center">
          <h1 style={{ fontSize: "20px" }} className="sm:text-3xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
            Control de Asistencia
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm block">
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

      <div className="flex items-center gap-3 justify-start sm:justify-end flex-wrap w-full sm:w-auto">
        <Link
          href="/"
          onClick={onHomeClick}
          className="px-3 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm"
        >
          Gestión y Asistencia
        </Link>

        <div className="flex items-center ml-auto sm:ml-0">
          <form action={logout}>
            <button type="submit" className="text-zinc-700 dark:text-zinc-200 my-2 rounded-md font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer text-sm">
              <FaSignOutAlt size={30} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}