import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { setAttendanceMock, getRoleBadgeMock, pushMock, replaceMock, registerLocaleMock } = vi.hoisted(() => ({
  setAttendanceMock: vi.fn(),
  getRoleBadgeMock: vi.fn(),
  pushMock: vi.fn(),
  replaceMock: vi.fn(),
  registerLocaleMock: vi.fn(),
}));
const mockedRouter = { push: pushMock, replace: replaceMock };

vi.mock("../actions/actions", () => ({
  setAttendance: setAttendanceMock,
}));

vi.mock("../utils/person-role-badge", () => ({
  getRoleBadge: getRoleBadgeMock,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => mockedRouter,
}));

vi.mock("react-datepicker", () => ({
  registerLocale: registerLocaleMock,
  default: ({ selected, onChange, disabled, dayClassName }: { selected: Date | null; onChange: (date: Date | null) => void; disabled?: boolean; dayClassName: (date: Date) => string }) => (
    <button
      type="button"
      data-testid="datepicker"
      data-selected={selected ? toDateString(selected) : ""}
      data-weekday-class={dayClassName(new Date(2026, 6, 15))}
      data-weekend-class={dayClassName(new Date(2026, 6, 19))}
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
  notes: string | null;
};

function makePeople(): Person[] {
  return [
    { id: "p1", id_number: "V-123", first_name: "Ana", last_name: "Perez", person_type: "member", notes: "Needs prayer\nCall next week" },
    { id: "p2", id_number: "V-999", first_name: "Luis", last_name: "Mora", person_type: "visitor", notes: null },
    { id: "p3", id_number: null, first_name: "Carla", last_name: "Rivas", person_type: "visitor", notes: "  \n " },
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
    window.history.replaceState({}, "", "/");

    setAttendanceMock.mockResolvedValue({ success: true });
    getRoleBadgeMock.mockImplementation((role: string) => ({
      label: role.toUpperCase(),
      classes: "bg-slate-100 text-slate-800",
    }));
  });

  it("saves and removes attendance immediately when a person is toggled", async () => {
    const todayString = toDateString(new Date());

    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[{ person_id: "p1" }]}
        currentDate={todayString}
        serverToday={todayString}
        attendanceDates={[]}
      />,
    );

    expect(screen.getByText("Guardado automático")).toBeInTheDocument();
    expect(screen.getByText("Los cambios se guardan automáticamente")).toBeInTheDocument();
    expect(screen.getByText("Directorio")).toBeInTheDocument();
    expect(screen.getByText("Asistentes: 1")).toBeInTheDocument();
    expect(screen.getByText("Total: 3")).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);

    fireEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.getByText("Asistentes: 2")).toBeInTheDocument();
    expect(screen.getByText("Registrando asistencia...")).toBeInTheDocument();

    await waitFor(() => {
      expect(setAttendanceMock).toHaveBeenCalledWith(todayString, "p3", true);
    });

    expect(screen.getByText("Asistencia registrada.")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByText("Asistentes: 1")).toBeInTheDocument();
    expect(screen.getByText("Quitando asistencia...")).toBeInTheDocument();

    await waitFor(() => {
      expect(setAttendanceMock).toHaveBeenLastCalledWith(todayString, "p1", false);
    });

    expect(screen.getByText("Asistencia eliminada.")).toBeInTheDocument();
  });

  it("reverts the selection and shows an error when saving fails", async () => {
    setAttendanceMock.mockResolvedValueOnce({ success: false, error: "database unavailable" });
    const todayString = toDateString(new Date());

    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[]}
        currentDate={todayString}
        serverToday={todayString}
        attendanceDates={[]}
      />,
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    expect(screen.getByText("Asistentes: 1")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Error al actualizar asistencia: database unavailable")).toBeInTheDocument();
    });

    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.queryByText(/^Asistentes:/)).not.toBeInTheDocument();
  });

  it("keeps checked people first and sorts each group by first name", async () => {
    const todayString = toDateString(new Date());
    const { container } = render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[{ person_id: "p2" }]}
        currentDate={todayString}
        serverToday={todayString}
        attendanceDates={[]}
      />,
    );

    const getPeopleOrder = () =>
      screen.getAllByRole("checkbox").map((checkbox) =>
        checkbox.closest("label")?.querySelector("p")?.textContent
      );

    expect(getPeopleOrder()).toEqual(["Luis Mora", "Ana Perez", "Carla Rivas"]);

    fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[2]);
    expect(getPeopleOrder()).toEqual(["Carla Rivas", "Luis Mora", "Ana Perez"]);

    await waitFor(() => {
      expect(screen.getAllByRole("checkbox")[0]).toBeEnabled();
    });

    fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[0]);
    expect(getPeopleOrder()).toEqual(["Luis Mora", "Ana Perez", "Carla Rivas"]);
  });

  it("shows a person's non-empty note below their name", () => {
    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[]}
        currentDate={toDateString(new Date())}
        serverToday={toDateString(new Date())}
        attendanceDates={[]}
      />,
    );

    const anaCard = screen.getByText("Ana Perez").closest("label");
    const note = anaCard?.querySelector("p.whitespace-pre-wrap");
    expect(note?.textContent).toBe("📝 Needs prayer\nCall next week");
    expect(screen.getByText("Carla Rivas").closest("label")?.querySelector("p.whitespace-pre-wrap")).toBeNull();
  });

  it("shows the age badge indicated by the code in the last name", () => {
    const people = [
      { ...makePeople()[0], last_name: "Perez (B)" },
      { ...makePeople()[1], last_name: "Mora (N)" },
      { ...makePeople()[2], last_name: "Rivas (A)" },
      { id: "p4", id_number: null, first_name: "David", last_name: "Soto", person_type: "visitor", notes: null },
    ];

    render(
      <AttendanceClient
        people={people}
        initialLogs={[]}
        currentDate={toDateString(new Date())}
        serverToday={toDateString(new Date())}
        attendanceDates={[]}
      />,
    );

    expect(screen.getByText("Bebé 👶").closest("label")).toHaveTextContent("Ana Perez (B)");
    expect(screen.getByText("Niño 👦").closest("label")).toHaveTextContent("Luis Mora (N)");
    expect(screen.getByText("Adolescente 👱").closest("label")).toHaveTextContent("Carla Rivas (A)");
    expect(screen.getByText("David Soto").closest("p")?.querySelector("span.bg-sky-100, span.bg-indigo-100")).toBeNull();
  });

  it("renders read-only past day and only shows attended people", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { container } = render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[{ person_id: "p2" }, { person_id: "p3" }]}
        currentDate={toDateString(yesterday)}
        serverToday={toDateString(new Date())}
        attendanceDates={[]}
      />,
    );

    expect(screen.getByText("Solo consulta")).toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    expect(screen.getByText("Luis Mora")).toBeInTheDocument();
    expect(screen.getByText("Asistentes: 2")).toBeInTheDocument();
    expect(
      Array.from(container.querySelectorAll("label p.font-semibold")).map((person) => person.textContent),
    ).toEqual(["Carla Rivas", "Luis Mora"]);
    expect(screen.queryByText(/^Total:/)).not.toBeInTheDocument();
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
        serverToday={todayString}
        attendanceDates={[]}
      />,
    );

    const input = screen.getByPlaceholderText("por cédula, nombre o apellido... (mínimo 3 caracteres)");

    fireEvent.change(input, { target: { value: "an" } });
    expect(screen.getByText("Escribe al menos 3 caracteres para activar el filtro.")).toBeInTheDocument();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.getByText("Luis Mora")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "ana" } });

    expect(screen.getByText("Resultados: 1")).toBeInTheDocument();
    expect(screen.queryByText("Asistentes: 0")).not.toBeInTheDocument();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.queryByText("Luis Mora")).not.toBeInTheDocument();
  });

  it("navigates to selected date on date picker change", () => {
    const todayString = toDateString(new Date());
    window.history.replaceState({}, "", `/?view=attendance&local_today=${todayString}`);

    render(
      <AttendanceClient
        people={makePeople()}
        initialLogs={[]}
        currentDate={todayString}
        serverToday={todayString}
        attendanceDates={[]}
      />,
    );

    fireEvent.click(screen.getByTestId("datepicker"));

    expect(pushMock).toHaveBeenCalledWith(`?view=attendance&local_today=${todayString}&date=2026-07-15`);
  });

  it("clears success message automatically after timeout", async () => {
    vi.useFakeTimers();

    try {
      const todayString = toDateString(new Date());

      render(
        <AttendanceClient
          people={makePeople()}
          initialLogs={[]}
          currentDate={todayString}
          serverToday={todayString}
          attendanceDates={[]}
        />,
      );

      await act(async () => {
        fireEvent.click(screen.getAllByRole("checkbox")[0]);
      });

      await act(async () => {
        await Promise.resolve();
      });

      expect(screen.getByText("Asistencia registrada.")).toBeInTheDocument();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(2500);
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1);
      });

      expect(screen.queryByText("Asistencia registrada.")).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("marks dates with attendance while preserving weekend styling and updates when dates change", () => {
    const props = {
      people: makePeople(),
      initialLogs: [],
      currentDate: toDateString(new Date()),
      serverToday: toDateString(new Date()),
    };
    const { rerender } = render(
      <AttendanceClient {...props} attendanceDates={["2026-07-15", "2026-07-19"]} />,
    );

    const datepicker = screen.getByTestId("datepicker");
    expect(datepicker).toHaveAttribute("data-weekday-class", "attendance-day");
    expect(datepicker).toHaveAttribute("data-weekend-class", "weekend-day attendance-day");
    expect(screen.getByText("Fecha con asistencia")).toBeInTheDocument();

    rerender(<AttendanceClient {...props} attendanceDates={[]} />);
    expect(datepicker).toHaveAttribute("data-weekday-class", "");
    expect(datepicker).toHaveAttribute("data-weekend-class", "weekend-day");
  });

  it("corrects the server date using the browser's local day", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 16, 22, 12));
    window.history.replaceState({}, "", "/?view=attendance");

    try {
      const { rerender } = render(
        <AttendanceClient
          people={makePeople()}
          initialLogs={[]}
          currentDate="2026-11-17"
          serverToday="2026-11-17"
          attendanceDates={[]}
        />,
      );

      expect(replaceMock).toHaveBeenCalledWith("?view=attendance&local_today=2026-11-16");
      rerender(
        <AttendanceClient
          people={makePeople()}
          initialLogs={[]}
          currentDate="2026-11-16"
          serverToday="2026-11-16"
          attendanceDates={[]}
        />,
      );
      expect(screen.getByTestId("datepicker")).toHaveAttribute("data-selected", "2026-11-16");
      expect(screen.getByText("Los cambios se guardan automáticamente")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("preserves an explicitly selected date when synchronizing the local day", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 16, 22, 12));
    window.history.replaceState({}, "", "/?date=2026-10-10");

    try {
      render(
        <AttendanceClient
          people={makePeople()}
          initialLogs={[]}
          currentDate="2026-10-10"
          serverToday="2026-11-17"
          attendanceDates={[]}
        />,
      );

      expect(replaceMock).toHaveBeenCalledWith("?date=2026-10-10&local_today=2026-11-16");
    } finally {
      vi.useRealTimers();
    }
  });
});
