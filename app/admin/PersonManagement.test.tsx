import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { deletePersonMock, getRoleBadgeMock } = vi.hoisted(() => ({
  deletePersonMock: vi.fn(),
  getRoleBadgeMock: vi.fn(),
}));

vi.mock("../actions/actions", () => ({
  deletePerson: deletePersonMock,
}));

vi.mock("../utils/person-role-badge", () => ({
  getRoleBadge: getRoleBadgeMock,
}));

import PersonManagement, { type People } from "./PersonManagement";

function makePerson(overrides: Partial<People> = {}): People {
  return {
    id: "p-1",
    id_number: "V-123",
    first_name: "Ana",
    last_name: "Perez",
    home_phone: null,
    cell_phone: "0414-1234567",
    email: "ana@test.com",
    birth_date: "2020-01-01",
    person_type: "visitor",
    address: null,
    city: null,
    is_first_time_visitor: false,
    comes_from_another_church: false,
    needs_prayer: false,
    wants_to_be_visited: false,
    wants_bible_studies: false,
    is_new_in_area: false,
    accepted_jesus: false,
    received_holy_spirit: false,
    notes: null,
    attendance_count: 0,
    ...overrides,
  };
}

describe("PersonManagement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getRoleBadgeMock.mockReturnValue({
      label: "VISITANTE",
      classes: "bg-slate-100 text-slate-800",
    });
    deletePersonMock.mockResolvedValue({ success: true });
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders empty state when there are no people", () => {
    render(<PersonManagement initialPeople={[]} />);

    expect(screen.getByText("Personas Registradas (0)")).toBeInTheDocument();
    expect(screen.getByText("No hay personas registradas aún.")).toBeInTheDocument();
  });

  it("renders person details, attendance badge and tags", () => {
    const person = makePerson({
      attendance_count: 3,
      accepted_jesus: true,
      is_first_time_visitor: true,
      needs_prayer: true,
    });

    render(<PersonManagement initialPeople={[person]} />);

    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.getByText("Cédula: V-123")).toBeInTheDocument();
    expect(screen.getByText("📱 Cel: 0414-1234567")).toBeInTheDocument();
    expect(screen.getByText("📅 Asistencias:")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByText("VISITANTE")).toBeInTheDocument();
    expect(screen.getByText("Cristiano 🙏")).toBeInTheDocument();
    expect(screen.getByText("1ra Vez")).toBeInTheDocument();
    expect(screen.getByText("Oración 🙏")).toBeInTheDocument();

    expect(getRoleBadgeMock).toHaveBeenCalledWith("visitor", "personManagement");
  });

  it("does not delete when user cancels confirmation", async () => {
    const user = userEvent.setup();
    (window.confirm as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(false);

    const person = makePerson();
    render(<PersonManagement initialPeople={[person]} />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(deletePersonMock).not.toHaveBeenCalled();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
  });

  it("deletes user and removes row on success", async () => {
    const user = userEvent.setup();
    const person = makePerson({ id: "p-del", attendance_count: 0 });

    render(<PersonManagement initialPeople={[person]} />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(window.confirm).toHaveBeenCalledWith("¿Está seguro de que desea eliminar a esta persona?");

    await waitFor(() => {
      expect(deletePersonMock).toHaveBeenCalledWith("p-del");
      expect(screen.queryByText("Ana Perez")).not.toBeInTheDocument();
    });
  });

  it("uses attendance warning confirmation message when person has history", async () => {
    const user = userEvent.setup();
    const person = makePerson({ id: "p-hist", attendance_count: 5 });

    render(<PersonManagement initialPeople={[person]} />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(window.confirm).toHaveBeenCalledWith(
      "Esta persona tiene 5 asistencias registradas. ¿Está seguro de que desea eliminarla? Se borrará todo su historial.",
    );
    expect(deletePersonMock).toHaveBeenCalledWith("p-hist");
  });

  it("shows alert and keeps person when delete throws", async () => {
    const user = userEvent.setup();
    deletePersonMock.mockRejectedValueOnce(new Error("db error"));

    const person = makePerson({ id: "p-err" });
    render(<PersonManagement initialPeople={[person]} />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("No se pudo eliminar a la persona. Intente de nuevo.");
    });

    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
