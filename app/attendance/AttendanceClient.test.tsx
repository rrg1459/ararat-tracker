import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { saveAttendanceMock, getRoleBadgeMock, pushMock, registerLocaleMock } = vi.hoisted(() => ({
  saveAttendanceMock: vi.fn(),
  getRoleBadgeMock: vi.fn(),
  pushMock: vi.fn(),
  registerLocaleMock: vi.fn(),
}));

vi.mock("../actions/actions", () => ({
  saveAttendance: saveAttendanceMock,
}));

vi.mock("../utils/person-role-badge", () => ({
  getRoleBadge: getRoleBadgeMock,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("react-datepicker", () => ({
  registerLocale: registerLocaleMock,
  default: ({ selected, onChange, disabled }: { selected: Date | null; onChange: (date: Date | null) => void; disabled?: boolean }) => (
    <button
      type="button"
      data-testid="datepicker"
      data-selected={selected ? selected.toISOString().slice(0, 10) : ""}
      disabled={disabled}
      onClick={() => onChange(new Date(2026, 6, 15))}
    >
      datepicker
    </button>
  ),
}));

import AttendanceClient from "./AttendanceClient";

type Person = {
  id: string;
  id_number: string | null;
  first_name: string;
  last_name: string;
  person_type: string;
};

function makePeople(): Person[] {
  return [
    { id: "p1", id_number: "V-123", first_name: "Ana", last_name: "Perez", person_type: "member" },
    { id: "p2", id_number: "V-999", first_name: "Luis", last_name: "Mora", person_type: "visitor" },
    { id: "p3", id_number: null, first_name: "Carla", last_name: "Rivas", person_type: "visitor" },
  ];
}

function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

describe("AttendanceClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    saveAttendanceMock.mockResolvedValue({ success: true });
    getRoleBadgeMock.mockImplementation((role: string) => ({
      label: role.toUpperCase(),
      classes: "bg-slate-100 text-slate-800",
    }));
  });

  it("renders today view and saves selected attendance", async () => {
    const todayString = toDateString(new Date());

    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[{ person_id: "p1" }]}
        currentDate={todayString}
      />,
    );

    expect(screen.getByRole("button", { name: "Guardar Asistencia" })).toBeInTheDocument();
    expect(screen.getByText("Directorio")).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);

    fireEvent.click(checkboxes[1]);
    fireEvent.click(screen.getByRole("button", { name: "Guardar Asistencia" }));

    await waitFor(() => {
      expect(saveAttendanceMock).toHaveBeenCalledWith(todayString, ["p1", "p2"]);
    });

    expect(screen.getByText("¡Asistencia guardada con éxito!")).toBeInTheDocument();
  });

  it("renders read-only past day and only shows attended people", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[{ person_id: "p2" }]}
        currentDate={toDateString(yesterday)}
      />,
    );

    expect(screen.getByText("Solo consulta")).toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    expect(screen.getByText("Luis Mora")).toBeInTheDocument();
    expect(screen.queryByText("Ana Perez")).not.toBeInTheDocument();
    expect(screen.getByText("Asistentes")).toBeInTheDocument();
  });

  it("applies search filter only with 3 or more chars", async () => {
    const todayString = toDateString(new Date());

    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[]}
        currentDate={todayString}
      />,
    );

    const input = screen.getByPlaceholderText("por cédula, nombre o apellido... (mínimo 3 caracteres)");

    fireEvent.change(input, { target: { value: "an" } });
    expect(screen.getByText("Escribe al menos 3 caracteres para activar el filtro.")).toBeInTheDocument();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.getByText("Luis Mora")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "ana" } });

    expect(screen.getByText("Resultados: 1")).toBeInTheDocument();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.queryByText("Luis Mora")).not.toBeInTheDocument();
  });

  it("navigates to selected date on date picker change", () => {
    const todayString = toDateString(new Date());

    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[]}
        currentDate={todayString}
      />,
    );

    fireEvent.click(screen.getByTestId("datepicker"));

    expect(pushMock).toHaveBeenCalledWith("?date=2026-07-15");
  });
});
