import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  metricsSummarySpy,
  attendanceChartsSpy,
  userManagementSpy,
  personManagementSpy,
} = vi.hoisted(() => ({
  metricsSummarySpy: vi.fn(),
  attendanceChartsSpy: vi.fn(),
  userManagementSpy: vi.fn(),
  personManagementSpy: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("./MetricsSummary", () => ({
  default: (props: Record<string, unknown>) => {
    metricsSummarySpy(props);
    return <div data-testid="metrics-summary">Metrics Summary</div>;
  },
}));

vi.mock("./AttendanceCharts", () => ({
  default: (props: Record<string, unknown>) => {
    attendanceChartsSpy(props);
    return <div data-testid="attendance-charts">Attendance Charts</div>;
  },
}));

vi.mock("./UserManagement", () => ({
  default: (props: Record<string, unknown>) => {
    userManagementSpy(props);
    return <div data-testid="user-management">User Management</div>;
  },
}));

vi.mock("./PersonManagement", () => ({
  default: (props: Record<string, unknown>) => {
    personManagementSpy(props);
    return <div data-testid="person-management">Person Management</div>;
  },
}));

vi.mock("../components/AraratLogo", () => ({
  default: () => <div data-testid="ararat-logo" />,
}));

vi.mock("../svg/FaSignOutAlt", () => ({
  default: () => <span>Salir</span>,
}));

vi.mock("../actions/actions", () => ({
  logout: vi.fn(),
}));

import DashboardClient from "./DashboardClient";

type Person = {
  id: string;
  person_type: string;
  needs_prayer: boolean;
  wants_to_be_visited: boolean;
  wants_bible_studies: boolean;
  accepted_jesus: boolean;
  received_holy_spirit: boolean;
};

type AttendanceLog = {
  id: number;
  created_at: string;
  person_id: number;
  people: {
    person_type: string;
    is_first_time_visitor: boolean;
  };
};

function makePeople(): Person[] {
  return [
    {
      id: "p1",
      person_type: "member",
      needs_prayer: true,
      wants_to_be_visited: false,
      wants_bible_studies: true,
      accepted_jesus: true,
      received_holy_spirit: false,
    },
    {
      id: "p2",
      person_type: "visitor",
      needs_prayer: false,
      wants_to_be_visited: true,
      wants_bible_studies: false,
      accepted_jesus: false,
      received_holy_spirit: false,
    },
    {
      id: "p3",
      person_type: "visitor",
      needs_prayer: true,
      wants_to_be_visited: true,
      wants_bible_studies: false,
      accepted_jesus: true,
      received_holy_spirit: true,
    },
    {
      id: "p4",
      person_type: "leader",
      needs_prayer: false,
      wants_to_be_visited: false,
      wants_bible_studies: false,
      accepted_jesus: true,
      received_holy_spirit: true,
    },
  ];
}

function makeAttendanceLogs(): AttendanceLog[] {
  return [
    {
      id: 1,
      created_at: "2026-07-10T10:00:00.000Z",
      person_id: 10,
      people: { person_type: "visitor", is_first_time_visitor: true },
    },
    {
      id: 2,
      created_at: "2026-07-10T11:00:00.000Z",
      person_id: 10,
      people: { person_type: "visitor", is_first_time_visitor: false },
    },
    {
      id: 3,
      created_at: "2026-07-12T10:00:00.000Z",
      person_id: 11,
      people: { person_type: "member", is_first_time_visitor: false },
    },
    {
      id: 4,
      created_at: "2026-07-02T10:00:00.000Z",
      person_id: 12,
      people: { person_type: "visitor", is_first_time_visitor: true },
    },
    {
      id: 5,
      created_at: "2026-06-20T10:00:00.000Z",
      person_id: 13,
      people: { person_type: "visitor", is_first_time_visitor: true },
    },
  ];
}

describe("DashboardClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-16T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows default metrics tab and sends computed summary metrics", () => {
    render(
      <DashboardClient
        userName="Admin Principal"
        userRole="superadmin"
        initialUsers={[] as never[]}
        initialPeople={makePeople() as never[]}
        attendanceLogs={makeAttendanceLogs() as never[]}
      />,
    );

    expect(screen.getByText("Control de Asistencia")).toBeInTheDocument();
    expect(screen.getByText("Sesión:")).toBeInTheDocument();

    expect(screen.getByText("Métricas")).toBeInTheDocument();
    expect(screen.getByText("Gráficos")).toBeInTheDocument();
    expect(screen.getByText("Usuarios")).toBeInTheDocument();
    expect(screen.getByText("Personas")).toBeInTheDocument();

    expect(screen.getByTestId("metrics-summary")).toBeInTheDocument();
    expect(metricsSummarySpy).toHaveBeenCalled();

    const metricsProps = metricsSummarySpy.mock.calls.at(-1)?.[0] as {
      totalMembers: number;
      totalVisitors: number;
      averageAttendanceRate: number;
      newVisitorsThisMonth: number;
      newVisitorsThisWeek: number;
      returningVisitors: number;
    };

    expect(metricsProps).toEqual({
      totalMembers: 1,
      totalVisitors: 2,
      averageAttendanceRate: 41.7,
      newVisitorsThisMonth: 2,
      newVisitorsThisWeek: 1,
      returningVisitors: 1,
    });
  });

  it("renders charts tab and passes processed datasets", async () => {
    render(
      <DashboardClient
        userName="Admin Principal"
        userRole="superadmin"
        initialUsers={[] as never[]}
        initialPeople={makePeople() as never[]}
        attendanceLogs={makeAttendanceLogs() as never[]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Gráficos/ }));

    expect(screen.getByTestId("attendance-charts")).toBeInTheDocument();

    const chartsProps = attendanceChartsSpy.mock.calls.at(-1)?.[0] as {
      trendData: Array<{ date: string; miembros: number; visitantes: number; total: number }>;
      compositionData: Array<{ name: string; value: number }>;
      needsData: Array<{ name: string; cantidad: number }>;
      monthlyVisitorsData: Array<{ month: string; cantidad: number }>;
    };

    expect(chartsProps.trendData).toEqual([
      { date: "2026-06-20", miembros: 0, visitantes: 1, total: 1 },
      { date: "2026-07-02", miembros: 0, visitantes: 1, total: 1 },
      { date: "2026-07-10", miembros: 0, visitantes: 2, total: 2 },
      { date: "2026-07-12", miembros: 1, visitantes: 0, total: 1 },
    ]);

    expect(chartsProps.compositionData).toEqual([
      { name: "Miembros", value: 1 },
      { name: "Visitantes", value: 2 },
      { name: "Líderes", value: 1 },
    ]);

    expect(chartsProps.needsData).toEqual([
      { name: "Necesita Oración", cantidad: 2 },
      { name: "Quiere Visita", cantidad: 2 },
      { name: "Estudios Bíblicos", cantidad: 1 },
      { name: "Aceptó a Jesús", cantidad: 3 },
      { name: "Recibió Espíritu Santo", cantidad: 2 },
    ]);

    expect(chartsProps.monthlyVisitorsData).toHaveLength(2);
    expect(chartsProps.monthlyVisitorsData.map((item) => item.cantidad).sort((a, b) => a - b)).toEqual([1, 2]);
  });

  it("shows users tab for admin and hides persons tab", async () => {
    const initialUsers = [{ id: "u-1" }, { id: "u-2" }];

    render(
      <DashboardClient
        userName="Admin"
        userRole="admin"
        initialUsers={initialUsers as never[]}
        initialPeople={makePeople() as never[]}
        attendanceLogs={makeAttendanceLogs() as never[]}
      />,
    );

    expect(screen.getByText("Usuarios")).toBeInTheDocument();
    expect(screen.queryByText("Personas")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Usuarios/ }));

    expect(screen.getByTestId("user-management")).toBeInTheDocument();
    expect(userManagementSpy).toHaveBeenCalledWith({
      userRole: "admin",
      initialUsers,
    });
  });

  it("hides users and persons tabs for non-admin roles", () => {
    render(
      <DashboardClient
        userName="Operador"
        userRole="operator"
        initialUsers={[] as never[]}
        initialPeople={makePeople() as never[]}
        attendanceLogs={makeAttendanceLogs() as never[]}
      />,
    );

    expect(screen.queryByText("Usuarios")).not.toBeInTheDocument();
    expect(screen.queryByText("Personas")).not.toBeInTheDocument();
    expect(screen.getByTestId("metrics-summary")).toBeInTheDocument();
  });
});
