import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { deletePersonMock, adminUpdatePersonDatesMock, getRoleBadgeMock } = vi.hoisted(() => ({
  deletePersonMock: vi.fn(),
  adminUpdatePersonDatesMock: vi.fn(),
  getRoleBadgeMock: vi.fn(),
}));

vi.mock("../actions/actions", () => ({
  deletePerson: deletePersonMock,
}));

vi.mock("../actions/admin-actions", () => ({
  adminUpdatePersonDates: adminUpdatePersonDatesMock,
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
    first_visit_date: null,
    baptized_at: null,
    ...overrides,
  };
}

function birthDateForAge(age: number) {
  const today = new Date();
  const year = today.getFullYear() - age;
  const month = today.getMonth();
  const day = Math.min(today.getDate(), new Date(year, month + 1, 0).getDate());
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

describe("PersonManagement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getRoleBadgeMock.mockReturnValue({
      label: "VISITANTE",
      classes: "bg-slate-100 text-slate-800",
    });
    deletePersonMock.mockResolvedValue({ success: true });
    adminUpdatePersonDatesMock.mockResolvedValue({ success: true });
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders empty state when there are no people", () => {
    render(<PersonManagement initialPeople={[]} />);

    expect(screen.getByText("Personas Registradas (0)")).toBeInTheDocument();
    expect(screen.getByText("No hay personas registradas aún.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Exportar a CSV" })).not.toBeInTheDocument();
  });

  it("filters people and keeps date editing and deletion available for results", async () => {
    render(
      <PersonManagement
        initialPeople={[
          makePerson(),
          makePerson({ id: "p-2", id_number: "V-456", first_name: "Luis", last_name: "Mora" }),
        ]}
        canEditDates
        canDelete
      />,
    );
    const search = screen.getByRole("textbox", { name: "Buscar Persona" });

    fireEvent.change(search, { target: { value: "an" } });
    expect(screen.getByText("Escribe al menos 3 caracteres para activar el filtro.")).toBeInTheDocument();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.getByText("Luis Mora")).toBeInTheDocument();

    fireEvent.change(search, { target: { value: "MOR" } });
    expect(screen.getByText("Resultados: 1")).toBeInTheDocument();
    expect(screen.getByText("Luis Mora")).toBeInTheDocument();
    expect(screen.queryByText("Ana Perez")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Editar fechas" }));
    fireEvent.change(screen.getByLabelText("Primera visita"), { target: { value: "2025-03-10" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
    await waitFor(() => expect(screen.getByText("Primera visita: 2025-03-10")).toBeInTheDocument());

    fireEvent.change(search, { target: { value: "123" } });
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    await waitFor(() => expect(screen.getByText("Resultados: 0")).toBeInTheDocument());
    expect(screen.getByText("No se encontraron personas que coincidan con la búsqueda")).toBeInTheDocument();
    expect(screen.getByText("Personas Registradas (1)")).toBeInTheDocument();

    fireEvent.change(search, { target: { value: "" } });
    expect(screen.getByText("Luis Mora")).toBeInTheDocument();
    expect(screen.queryByText("Ana Perez")).not.toBeInTheDocument();
  });

  it("exports the current list as a safely escaped CSV", async () => {
    const user = userEvent.setup();
    const createObjectURL = vi.fn().mockReturnValue("blob:personas");
    const revokeObjectURL = vi.fn();
    const clickLink = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    vi.stubGlobal("URL", class extends URL {
      static createObjectURL = createObjectURL;
      static revokeObjectURL = revokeObjectURL;
    });

    try {
      const person = makePerson({
        first_name: 'Ana, "A"',
        notes: "=1+1\nSegunda línea",
        invited_by_id: "invitador-1",
        first_visit_date: "2025-03-10",
      });
      render(
        <PersonManagement
          initialPeople={[person, makePerson({ id: "p-delete", first_name: "Luis" })]}
          canExport
          canEditDates
          canDelete
        />,
      );
      expect(screen.getByRole("button", { name: "Exportar a CSV" })).toHaveClass("hidden", "lg:inline-flex");

      await user.click(screen.getAllByRole("button", { name: "Eliminar" })[1]);
      await waitFor(() => expect(screen.queryByText("Luis Perez")).not.toBeInTheDocument());
      await user.click(screen.getByRole("button", { name: "Editar fechas" }));
      await user.clear(screen.getByLabelText("Primera visita"));
      await user.click(screen.getByRole("button", { name: "Guardar" }));
      await waitFor(() => expect(screen.queryByLabelText("Primera visita")).not.toBeInTheDocument());
      fireEvent.change(screen.getByRole("textbox", { name: "Buscar Persona" }), { target: { value: "xyz" } });
      expect(screen.getByText("Resultados: 0")).toBeInTheDocument();

      vi.setSystemTime(new Date(1967, 7, 10, 12));
      try {
        fireEvent.click(screen.getByRole("button", { name: "Exportar a CSV" }));
      } finally {
        vi.useRealTimers();
      }

      const blob = createObjectURL.mock.calls[0][0] as Blob;
      const csv = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsText(blob);
      });
      expect(blob.type).toBe("text/csv;charset=utf-8");
      expect(csv).toBe([
        [
          "Nombres", "Apellidos", "Teléfono local", "Correo", "Fecha de nacimiento",
          "Tipo de persona", "Teléfono celular", "Fecha de 1era Visita", "Bautizado el", "Notas",
        ].map((column) => `"${column}"`).join(","),
        '"Ana, ""A""","Perez","","ana@test.com","2020-01-01","visitor","0414-1234567","","","\'=1+1\nSegunda línea"',
      ].join("\r\n"));
      expect(csv).not.toContain("p-delete");
      expect(csv).not.toContain("2025-03-10");
      expect(clickLink).toHaveBeenCalledOnce();
      expect(clickLink.mock.instances[0]).toHaveAttribute("download", "personas-1967ago10.csv");
      expect(revokeObjectURL).toHaveBeenCalledWith("blob:personas");
    } finally {
      clickLink.mockRestore();
      vi.unstubAllGlobals();
    }
  });

  it("renders person details, attendance badge and tags", () => {
    const person = makePerson({
      attendance_count: 1,
      accepted_jesus: true,
      is_first_time_visitor: true,
      needs_prayer: true,
      notes: "Prefiere recibir una llamada por la tarde.",
    });

    render(<PersonManagement initialPeople={[person]} />);

    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.getByText("Cédula: V-123")).toBeInTheDocument();
    expect(screen.getByText("📱 Cel: 0414-1234567")).toBeInTheDocument();
    expect(screen.getByText("Notas:")).toBeInTheDocument();
    expect(screen.getByText("Prefiere recibir una llamada por la tarde.")).toBeInTheDocument();
    expect(screen.getByText("📅 Asistencias:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("VISITANTE")).toBeInTheDocument();
    expect(screen.getByText("Cristiano 🙏")).toBeInTheDocument();
    expect(screen.getByText("1ra Vez")).toBeInTheDocument();
    expect(screen.getByText("Oración 🙏")).toBeInTheDocument();

    expect(getRoleBadgeMock).toHaveBeenCalledWith("visitor", "personManagement");
  });

  it("shows the adolescent tag for people aged 12 through 17", () => {
    render(
      <PersonManagement
        initialPeople={[makePerson({ birth_date: birthDateForAge(16) })]}
      />,
    );

    expect(screen.getByText("Adolescente 👱")).toBeInTheDocument();
    expect(screen.queryByText("Niño 👦")).not.toBeInTheDocument();
  });

  it("does not show notes when they are empty or only whitespace", () => {
    render(
      <PersonManagement
        initialPeople={[
          makePerson({ id: "p-empty", notes: "" }),
          makePerson({ id: "p-whitespace", notes: "   " }),
          makePerson({ id: "p-null", notes: null }),
        ]}
      />,
    );

    expect(screen.queryByText("Notas:")).not.toBeInTheDocument();
  });

  it("shows recorded dates and lets admins update or clear them", async () => {
    const user = userEvent.setup();
    const person = makePerson({
      first_visit_date: "2025-03-10",
      baptized_at: "2025-08-20",
    });

    render(<PersonManagement initialPeople={[person]} canEditDates />);

    expect(screen.getByText("Primera visita: 2025-03-10")).toBeInTheDocument();
    expect(screen.getByText("Bautizado el: 2025-08-20")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Editar fechas" }));
    await user.clear(screen.getByLabelText("Primera visita"));
    await user.click(screen.getByRole("button", { name: "Guardar" }));

    await waitFor(() => {
      expect(adminUpdatePersonDatesMock).toHaveBeenCalledWith("p-1", {
        first_visit_date: null,
        baptized_at: "2025-08-20",
      });
      expect(screen.queryByText("Primera visita: 2025-03-10")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Bautizado el: 2025-08-20")).toBeInTheDocument();
  });

  it("does not show date editing controls to users without admin permissions", () => {
    render(<PersonManagement initialPeople={[makePerson()]} />);

    expect(screen.queryByRole("button", { name: "Editar fechas" })).not.toBeInTheDocument();
  });

  it("hides deletion without permission", () => {
    render(<PersonManagement initialPeople={[makePerson()]} canEditDates />);

    expect(screen.queryByRole("button", { name: "Eliminar" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar fechas" })).toBeInTheDocument();
  });

  it("does not delete when user cancels confirmation", async () => {
    const user = userEvent.setup();
    (window.confirm as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(false);

    const person = makePerson();
    render(<PersonManagement initialPeople={[person]} canDelete />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(deletePersonMock).not.toHaveBeenCalled();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
  });

  it("deletes user and removes row on success", async () => {
    const user = userEvent.setup();
    const person = makePerson({ id: "p-del", attendance_count: 0 });

    render(<PersonManagement initialPeople={[person]} canDelete />);

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

    render(<PersonManagement initialPeople={[person]} canDelete />);

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
    render(<PersonManagement initialPeople={[person]} canDelete />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("No se pudo eliminar a la persona. Intente de nuevo.");
    });

    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  it("shows a server error and keeps the person when deletion is rejected", async () => {
    deletePersonMock.mockResolvedValueOnce({ success: false, error: "Solo superadmin puede eliminar personas." });
    render(<PersonManagement initialPeople={[makePerson()]} canDelete />);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "No se pudo eliminar a la persona: Solo superadmin puede eliminar personas.",
      );
    });
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
  });
});
