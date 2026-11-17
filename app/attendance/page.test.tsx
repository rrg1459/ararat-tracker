import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { createClientMock, attendanceClientSpy } = vi.hoisted(() => ({
  createClientMock: vi.fn(),
  attendanceClientSpy: vi.fn(),
}));

vi.mock("../utils/supabase", () => ({
  createClient: createClientMock,
}));

vi.mock("./AttendanceClient", () => ({
  default: (props: {
    people: Array<Record<string, unknown>>;
    initialLogs: Array<{ person_id: string }>;
    currentDate: string;
    attendanceDates: string[];
  }) => {
    attendanceClientSpy(props);
    return <div data-testid="attendance-client">Attendance Client</div>;
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("../components/AraratLogo", () => ({
  default: () => <div data-testid="ararat-logo" />,
}));

import AttendancePage from "./page";

type PersonRow = {
  id: string;
  id_number: string | null;
  first_name: string;
  last_name: string;
  person_type: string;
};

function buildSupabaseMock(options: {
  logs: Array<{ person_id: string }>;
  allPeople?: PersonRow[];
  attendedPeople?: PersonRow[];
  attendanceDates?: string[];
  datesError?: { message: string };
}) {
  const { logs, allPeople = [], attendedPeople = [], attendanceDates = [], datesError } = options;

  const attendanceEqMock = vi.fn().mockResolvedValue({ data: logs });
  const peopleOrderMock = vi.fn().mockResolvedValue({ data: allPeople });
  const peopleInMock = vi.fn(() => ({ order: vi.fn().mockResolvedValue({ data: attendedPeople }) }));
  const datesGtMock = vi.fn();

  const fromMock = vi.fn((table: string) => {
    if (table === "attendance_dates") {
      let after: string | null = null;
      const query = {
        order: vi.fn(() => query),
        limit: vi.fn(() => query),
        gt: vi.fn((_column: string, value: string) => {
          datesGtMock(_column, value);
          after = value;
          return query;
        }),
        then: (resolve: (result: unknown) => void) => Promise.resolve({
          data: attendanceDates
            .filter((date) => after === null || date > after)
            .slice(0, 2)
            .map((attendance_date) => ({ attendance_date })),
          error: datesError ?? null,
        }).then(resolve),
      };
      return { select: vi.fn(() => query) };
    }

    if (table === "attendance_logs") {
      return {
        select: vi.fn(() => ({
          eq: attendanceEqMock,
        })),
      };
    }

    if (table === "people") {
      return {
        select: vi.fn(() => ({
          order: peopleOrderMock,
          in: peopleInMock,
        })),
      };
    }

    throw new Error(`Unexpected table: ${table}`);
  });

  return {
    client: { from: fromMock },
    spies: { fromMock, attendanceEqMock, peopleOrderMock, peopleInMock, datesGtMock },
  };
}

describe("AttendancePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads today's logs and full people directory when date is not provided", async () => {
    const today = new Date().toISOString().split("T")[0];
    const logs = [{ person_id: "p1" }];
    const allPeople: PersonRow[] = [
      { id: "p1", id_number: "V-1", first_name: "Ana", last_name: "Perez", person_type: "member" },
      { id: "p2", id_number: "V-2", first_name: "Luis", last_name: "Mora", person_type: "visitor" },
    ];

    const attendanceDates = ["2026-07-01", "2026-07-10", "2026-07-15"];
    const { client, spies } = buildSupabaseMock({ logs, allPeople, attendanceDates });
    createClientMock.mockResolvedValue(client);

    const ui = await AttendancePage({ searchParams: Promise.resolve({}) });
    render(ui);

    expect(screen.getByText("Asistencia Diaria")).toBeInTheDocument();
    expect(screen.getByText("Marcar asistencia para el servicio de hoy")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver a Personas" })).toHaveAttribute("href", "/");

    expect(spies.attendanceEqMock).toHaveBeenCalledWith("created_at", today);
    expect(spies.peopleOrderMock).toHaveBeenCalledWith("first_name", { ascending: true });
    expect(spies.datesGtMock).toHaveBeenCalledWith("attendance_date", "2026-07-10");

    expect(attendanceClientSpy).toHaveBeenCalledWith({
      people: allPeople,
      initialLogs: logs,
      currentDate: today,
      attendanceDates,
    });
  });

  it("loads only attended people for a past date with records", async () => {
    const targetDate = "2026-07-10";
    const logs = [{ person_id: "p2" }, { person_id: "p3" }];
    const attendedPeople: PersonRow[] = [
      { id: "p2", id_number: "V-20", first_name: "Luis", last_name: "Mora", person_type: "visitor" },
      { id: "p3", id_number: null, first_name: "Carla", last_name: "Rivas", person_type: "member" },
    ];

    const { client, spies } = buildSupabaseMock({ logs, attendedPeople });
    createClientMock.mockResolvedValue(client);

    const ui = await AttendancePage({ searchParams: Promise.resolve({ date: targetDate }) });
    render(ui);

    expect(screen.getByText(`Consulta de fecha: ${targetDate}`)).toBeInTheDocument();
    expect(spies.attendanceEqMock).toHaveBeenCalledWith("created_at", targetDate);
    expect(spies.peopleInMock).toHaveBeenCalledWith("id", ["p2", "p3"]);

    expect(attendanceClientSpy).toHaveBeenCalledWith({
      people: attendedPeople,
      initialLogs: logs,
      currentDate: targetDate,
      attendanceDates: [],
    });
  });

  it("returns empty people list for a past date without records", async () => {
    const targetDate = "2026-07-01";
    const { client, spies } = buildSupabaseMock({ logs: [] });
    createClientMock.mockResolvedValue(client);

    const ui = await AttendancePage({ searchParams: Promise.resolve({ date: targetDate }) });
    render(ui);

    expect(screen.getByText(`Consulta de fecha: ${targetDate}`)).toBeInTheDocument();
    expect(spies.attendanceEqMock).toHaveBeenCalledWith("created_at", targetDate);
    expect(spies.peopleInMock).not.toHaveBeenCalled();

    expect(attendanceClientSpy).toHaveBeenCalledWith({
      people: [],
      initialLogs: [],
      currentDate: targetDate,
      attendanceDates: [],
    });
  });

  it("reports errors when attendance dates cannot be loaded", async () => {
    const { client } = buildSupabaseMock({ logs: [], datesError: { message: "query failed" } });
    createClientMock.mockResolvedValue(client);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      await expect(AttendancePage({ searchParams: Promise.resolve({}) }))
        .rejects.toThrow("No se pudieron consultar las fechas de asistencia.");
      expect(consoleError).toHaveBeenCalled();
    } finally {
      consoleError.mockRestore();
    }
  });
});
