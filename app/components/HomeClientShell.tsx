"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, useTransition } from "react";
import AttendanceClient, { type Person } from "../attendance/AttendanceClient";
import { logout } from "../actions/actions";
import PeopleManager from "../people-manager";
import FaSignOutAlt from "../svg/FaSignOutAlt";
import AraratLogo from "./AraratLogo";
import UserSettingsModal from "./UserSettingsModal";
import dashboardIcon from "../../public/dashboard1.png";

const PENDING_TEXT = "Procesando...";

interface HomeClientShellProps {
  currentView: "attendance" | "people";
  currentDate: string;
  people: Person[];
  initialLogs: { person_id: string }[];
  isAdminOrSuperAdmin: boolean;
  user: { id: string; email?: string } | null;
  userName: string;
  userRole: string;
  profileName: string;
  profileEmail: string;
}

export default function HomeClientShell({
  currentView,
  currentDate,
  people,
  initialLogs,
  isAdminOrSuperAdmin,
  user,
  userName,
  userRole,
  profileName,
  profileEmail,
}: HomeClientShellProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (href: string, scroll: boolean) => {
    startTransition(() => {
      router.push(href, { scroll });
    });
  };

  const handleNavClick =
    (href: string, scroll = false) =>
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      navigate(href, scroll);
    };

  return (
    <>
      <header className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 justify-start min-w-0">
          <AraratLogo size={60} priority />
          <div className="min-w-0 flex flex-col justify-center">
            <h1 style={{ fontSize: "20px" }} className="sm:text-3xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
              Control de Asistencia
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm hidden sm:block">
              Gestión y registro de miembros y visitantes
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm block sm:hidden">
              Gestión y registro
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
          {currentView !== "attendance" && (
            <Link
              href="/?view=attendance"
              scroll={false}
              onClick={handleNavClick("/?view=attendance")}
              className="px-3 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm"
            >
              Tomar asistencia
            </Link>
          )}

          {currentView !== "people" && (
            <Link
              href="/?view=people"
              scroll={false}
              onClick={handleNavClick("/?view=people")}
              className="px-3 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center text-sm"
            >
              Gestión personas
            </Link>
          )}

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {isAdminOrSuperAdmin && (
              <Link
                href="/admin"
                className="inline-flex h-10 w-10 items-center justify-center flex-shrink-0"
              >
                <Image
                  src={dashboardIcon}
                  alt="Admin Icon"
                  width={40}
                  height={40}
                  priority
                  className="block h-10 w-10 object-contain"
                  sizes="40px"
                />
              </Link>
            )}

            {user && (
              <UserSettingsModal
                userId={user.id}
                initialName={profileName}
                initialEmail={profileEmail}
              />
            )}

            <form action={logout} className="flex items-center">
              <button type="submit" className="text-zinc-700 dark:text-zinc-200 my-2 rounded-md font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer text-sm">
                <FaSignOutAlt size={30} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto">
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <span className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-500 italic text-sm text-center dark:text-zinc-400">
              {PENDING_TEXT}
            </p>
          </div>
        ) : currentView === "attendance" ? (
          <AttendanceClient people={people || []} initialLogs={initialLogs || []} currentDate={currentDate} />
        ) : (
          <PeopleManager initialPeople={people || []} />
        )}
      </div>
    </>
  );
}