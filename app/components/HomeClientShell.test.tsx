import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  pushMock,
  attendanceClientSpy,
  peopleManagerSpy,
  userSettingsModalSpy,
} = vi.hoisted(() => ({
  pushMock: vi.fn(),
  attendanceClientSpy: vi.fn(),
  peopleManagerSpy: vi.fn(),
  userSettingsModalSpy: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, scroll: _scroll, ...rest }: { href: string; children: ReactNode; scroll?: boolean } & Record<string, unknown>) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt?: string }) => <span role="img" aria-label={alt ?? ""} />,
}));

vi.mock("../../public/dashboard1.png", () => ({
  default: "/dashboard1.png",
}));

vi.mock("../attendance/AttendanceClient", () => ({
  default: (props: { people: unknown[]; initialLogs: unknown[]; currentDate: string }) => {
    attendanceClientSpy(props);
    return <div data-testid="attendance-client">Attendance Client</div>;
  },
}));

vi.mock("../people-manager", () => ({
  default: ({ initialPeople }: { initialPeople: unknown[] }) => {
    peopleManagerSpy(initialPeople);
    return <div data-testid="people-manager">People Manager</div>;
  },
}));

vi.mock("./AraratLogo", () => ({
  default: () => <div data-testid="ararat-logo" />,
}));

vi.mock("./UserSettingsModal", () => ({
  default: (props: { userId: string; initialName: string; initialEmail: string }) => {
    userSettingsModalSpy(props);
    return <div data-testid="settings-modal">Settings</div>;
  },
}));

vi.mock("../svg/FaSignOutAlt", () => ({
  default: () => <span>Salir</span>,
}));

vi.mock("../actions/actions", () => ({
  logout: vi.fn(),
}));

import HomeClientShell from "./HomeClientShell";

const baseProps = {
  currentDate: "2026-07-18",
  people: [{ id: "p1", id_number: "123", first_name: "Ana", last_name: "Perez", person_type: "member" }],
  initialLogs: [{ person_id: "p1" }],
  userName: "Ana Perez",
  userRole: "admin",
  profileName: "Ana Perez",
  profileEmail: "ana@test.com",
} as const;

describe("HomeClientShell", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders attendance view with header/session and child props", () => {
    render(
      <HomeClientShell
        {...baseProps}
        currentView="attendance"
        isAdminOrSuperAdmin
        user={{ id: "u-1", email: "ana@test.com" }}
      />,
    );

    expect(screen.getByText("Control de Asistencia")).toBeInTheDocument();
    expect(screen.getByText("Sesión:")).toBeInTheDocument();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Gestión personas" })).toHaveAttribute("href", "/?view=people");
    expect(screen.queryByRole("link", { name: "Tomar asistencia" })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Admin Icon" })).toHaveAttribute("href", "/admin");
    expect(screen.getByTestId("settings-modal")).toBeInTheDocument();

    expect(screen.getByTestId("attendance-client")).toBeInTheDocument();
    expect(attendanceClientSpy).toHaveBeenCalledWith({
      people: baseProps.people,
      initialLogs: baseProps.initialLogs,
      currentDate: "2026-07-18",
    });

    expect(userSettingsModalSpy).toHaveBeenCalledWith({
      userId: "u-1",
      initialName: "Ana Perez",
      initialEmail: "ana@test.com",
    });
  });

  it("renders people view and hides admin/settings when no permissions or user", () => {
    render(
      <HomeClientShell
        {...baseProps}
        currentView="people"
        isAdminOrSuperAdmin={false}
        user={null}
      />,
    );

    expect(screen.getByRole("link", { name: "Tomar asistencia" })).toHaveAttribute("href", "/?view=attendance");
    expect(screen.queryByRole("link", { name: "Gestión personas" })).not.toBeInTheDocument();

    expect(screen.queryByRole("link", { name: "Admin Icon" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-modal")).not.toBeInTheDocument();

    expect(screen.getByTestId("people-manager")).toBeInTheDocument();
    expect(peopleManagerSpy).toHaveBeenCalledWith(baseProps.people);
  });

  it("navigates with router.push when nav link is clicked", () => {
    render(
      <HomeClientShell
        {...baseProps}
        currentView="attendance"
        isAdminOrSuperAdmin={false}
        user={null}
      />,
    );

    fireEvent.click(screen.getByRole("link", { name: "Gestión personas" }));

    expect(pushMock).toHaveBeenCalledWith("/?view=people", { scroll: false });
  });
});
