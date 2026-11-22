import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { registerPersonMock, updatePersonMock, getRoleBadgeMock, registerLocaleMock } = vi.hoisted(() => ({
  registerPersonMock: vi.fn(),
  updatePersonMock: vi.fn(),
  getRoleBadgeMock: vi.fn(),
  registerLocaleMock: vi.fn(),
}));

vi.mock("./actions/actions", () => ({
  registerPerson: registerPersonMock,
  updatePerson: updatePersonMock,
}));

vi.mock("./utils/person-role-badge", () => ({
  getRoleBadge: getRoleBadgeMock,
}));

vi.mock("react-datepicker", () => ({
  registerLocale: registerLocaleMock,
  default: ({
    selected,
    onChange,
    required,
    className,
    placeholderText,
    locale,
  }: {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    required?: boolean;
    className?: string;
    placeholderText?: string;
    locale?: string;
  }) => (
    <input
      data-testid="birth-date-picker"
      data-locale={locale}
      type="date"
      required={required}
      className={className}
      placeholder={placeholderText}
      value={selected ? selected.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        const value = e.target.value;
        onChange(value ? new Date(`${value}T00:00:00`) : null);
      }}
    />
  ),
}));

import PeopleManager from "./people-manager";

function getInputByName(name: string): HTMLInputElement {
  const element = document.querySelector(`input[name="${name}"]`);
  if (!element) {
    throw new Error(`Input not found: ${name}`);
  }
  return element as HTMLInputElement;
}

function getSelectByName(name: string): HTMLSelectElement {
  const element = document.querySelector(`select[name="${name}"]`);
  if (!element) {
    throw new Error(`Select not found: ${name}`);
  }
  return element as HTMLSelectElement;
}

function getFormAction(form: HTMLFormElement): (formData: FormData) => Promise<void> {
  const reactPropsKey = Object.keys(form).find((key) => key.startsWith("__reactProps$"));
  if (!reactPropsKey) {
    throw new Error("React props not found on form");
  }

  const action = (form as unknown as Record<string, { action?: (formData: FormData) => Promise<void> }>)[reactPropsKey]?.action;
  if (!action) {
    throw new Error("Form action handler not found");
  }

  return action;
}

type Person = {
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  home_phone: string | null;
  cell_phone: string | null;
  email: string | null;
  birth_date: string | null;
  person_type: string;
  address: string | null;
  city: string | null;
  is_first_time_visitor: boolean;
  comes_from_another_church: boolean;
  needs_prayer: boolean;
  wants_to_be_visited: boolean;
  wants_bible_studies: boolean;
  is_new_in_area: boolean;
  accepted_jesus: boolean;
  received_holy_spirit: boolean;
  notes: string | null;
};

function makePerson(overrides: Partial<Person> = {}): Person {
  return {
    id: "p-1",
    id_number: "V-123",
    first_name: "Ana",
    last_name: "Perez",
    home_phone: "0212-1111111",
    cell_phone: "0414-1234567",
    email: "ana@test.com",
    birth_date: "2018-01-20",
    person_type: "visitor",
    address: "Calle 1",
    city: "Caracas",
    is_first_time_visitor: false,
    comes_from_another_church: false,
    needs_prayer: false,
    wants_to_be_visited: false,
    wants_bible_studies: false,
    is_new_in_area: false,
    accepted_jesus: false,
    received_holy_spirit: false,
    notes: "Nota",
    ...overrides,
  };
}

describe("PeopleManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    registerPersonMock.mockResolvedValue({ success: true });
    updatePersonMock.mockResolvedValue({ success: true });
    getRoleBadgeMock.mockImplementation((personType: string) => ({
      label: personType.toUpperCase(),
      classes: "bg-slate-100 text-slate-800",
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders empty state when there are no people", () => {
    render(<PeopleManager initialPeople={[]} />);

    expect(screen.getByText("Registro de Nueva Persona")).toBeInTheDocument();
    expect(screen.getByText("Personas Registradas (0)")).toBeInTheDocument();
    expect(screen.getByText("No hay personas registradas aún.")).toBeInTheDocument();
    expect(screen.getByTestId("birth-date-picker")).toHaveAttribute("data-locale", "es");
  });

  it("renders list details and role/age/tags for people", () => {
    const baby = makePerson({
      id: "baby",
      first_name: "Bebe",
      last_name: "Uno",
      birth_date: "2024-01-01",
      accepted_jesus: true,
      is_first_time_visitor: true,
      needs_prayer: true,
      notes: "Prefiere recibir una llamada por la tarde.",
    });

    const child = makePerson({
      id: "child",
      first_name: "Nino",
      last_name: "Dos",
      birth_date: "2018-01-01",
      accepted_jesus: false,
      is_first_time_visitor: false,
      needs_prayer: false,
      cell_phone: null,
      person_type: "member",
      notes: "   ",
    });

    render(<PeopleManager initialPeople={[baby, child]} />);

    expect(screen.getByText("Personas Registradas (2)")).toBeInTheDocument();
    expect(screen.getByText("Bebe Uno")).toBeInTheDocument();
    expect(screen.getByText("Nino Dos")).toBeInTheDocument();
    expect(screen.getByText("Notas:")).toBeInTheDocument();
    expect(screen.getByText("Prefiere recibir una llamada por la tarde.")).toBeInTheDocument();
    expect(screen.queryAllByText("Notas:")).toHaveLength(1);
    expect(screen.getByText("Bebé 👶")).toBeInTheDocument();
    expect(screen.getByText("Niño 👦")).toBeInTheDocument();
    expect(screen.getByText("Cristiano 🙏")).toBeInTheDocument();
    expect(screen.getByText("1ra Vez")).toBeInTheDocument();
    expect(screen.getByText("Oración 🙏")).toBeInTheDocument();

    expect(getRoleBadgeMock).toHaveBeenCalledWith("visitor");
    expect(getRoleBadgeMock).toHaveBeenCalledWith("member");
  });

  it("preloads form values in edit mode and allows canceling edit", async () => {
    const user = userEvent.setup();
    const person = makePerson({
      id: "edit-1",
      first_name: "Carlos",
      last_name: "Mena",
      person_type: "leader",
      is_first_time_visitor: true,
      needs_prayer: true,
      accepted_jesus: true,
      birth_date: "2000-12-25",
    });

    render(<PeopleManager initialPeople={[person]} />);

    await user.click(screen.getByRole("button", { name: "Editar" }));

    expect(screen.getByText("Editando: Carlos")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Actualizar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();

    expect(getInputByName("first_name")).toHaveValue("Carlos");
    expect(getInputByName("last_name")).toHaveValue("Mena");
    expect(getSelectByName("person_type")).toHaveValue("leader");
    expect(screen.getByTestId("birth-date-picker")).toHaveValue("2000-12-25");

    expect(screen.getByRole("checkbox", { name: "Visitante por primera vez" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Necesita oración" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Aceptó a Jesús" })).toBeChecked();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.getByText("Registro de Nueva Persona")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar Persona" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Visitante por primera vez" })).not.toBeChecked();
    expect(screen.getByTestId("birth-date-picker")).toHaveValue("");
  });

  it("submits create flow with mapped birth_date and checkbox fields", async () => {
    const user = userEvent.setup();

    const { container } = render(<PeopleManager initialPeople={[]} />);

    await user.type(getInputByName("first_name"), "Luis");
    await user.type(getInputByName("last_name"), "Perez");
    await user.type(getInputByName("email"), "luis@test.com");
    await user.type(getInputByName("city"), "Valencia");

    fireEvent.change(screen.getByTestId("birth-date-picker"), {
      target: { value: "1999-05-12" },
    });

    await user.click(screen.getByRole("checkbox", { name: "Visitante por primera vez" }));
    await user.click(screen.getByRole("checkbox", { name: "Desea estudios bíblicos" }));

    const form = container.querySelector("form") as HTMLFormElement;
    const action = getFormAction(form);
    await act(async () => {
      await action(new FormData(form));
    });

    await waitFor(() => {
      expect(registerPersonMock).toHaveBeenCalledTimes(1);
    });

    const submittedFormData = registerPersonMock.mock.calls[0][0] as FormData;

    expect(submittedFormData.get("first_name")).toBe("Luis");
    expect(submittedFormData.get("last_name")).toBe("Perez");
    expect(submittedFormData.get("birth_date")).toBe("1999-05-12");
    expect(submittedFormData.get("first_visit_date")).toBe(format(new Date(), "yyyy-MM-dd"));
    expect(submittedFormData.get("is_first_time_visitor")).toBe("on");
    expect(submittedFormData.get("wants_bible_studies")).toBe("on");
    expect(submittedFormData.has("needs_prayer")).toBe(false);

    expect(updatePersonMock).not.toHaveBeenCalled();
    expect(screen.getByTestId("birth-date-picker")).toHaveValue("");
  });

  it("shows a registration error and keeps the form values when creation fails", async () => {
    const user = userEvent.setup();
    registerPersonMock.mockResolvedValue({
      success: false,
      error: "No se pudo registrar la persona.",
    });

    const { container } = render(<PeopleManager initialPeople={[]} />);
    await user.type(getInputByName("first_name"), "Luis");
    await user.type(getInputByName("last_name"), "Perez");

    const form = container.querySelector("form") as HTMLFormElement;
    const action = getFormAction(form);
    await act(async () => {
      await action(new FormData(form));
    });

    expect(await screen.findByRole("alert")).toHaveTextContent("No se pudo registrar la persona.");
    expect(getInputByName("first_name")).toHaveValue("Luis");
  });

  it("clears the form but displays the attendance error after the person was created", async () => {
    const user = userEvent.setup();
    registerPersonMock.mockResolvedValue({
      success: false,
      error: "La persona fue creada, pero no se pudo registrar su asistencia.",
      personCreated: true,
    });

    const { container } = render(<PeopleManager initialPeople={[]} />);
    await user.type(getInputByName("first_name"), "Luis");
    await user.type(getInputByName("last_name"), "Perez");

    const form = container.querySelector("form") as HTMLFormElement;
    const action = getFormAction(form);
    await act(async () => {
      await action(new FormData(form));
    });

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "La persona fue creada, pero no se pudo registrar su asistencia."
    );
    expect(getInputByName("first_name")).toHaveValue("");
  });

  it("shows age limit error and blocks submit when person is older than 120", async () => {
    const user = userEvent.setup();

    const { container } = render(<PeopleManager initialPeople={[]} />);

    await user.type(getInputByName("first_name"), "Pedro");
    await user.type(getInputByName("last_name"), "Ramirez");

    fireEvent.change(screen.getByTestId("birth-date-picker"), {
      target: { value: "1900-01-01" },
    });

    expect(
      screen.getByText("No se puede registrar: la edad no puede ser mayor a 120 años.")
    ).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Guardar Persona" });
    expect(submitButton).toBeDisabled();

    const form = container.querySelector("form") as HTMLFormElement;
    const action = getFormAction(form);
    await act(async () => {
      await action(new FormData(form));
    });

    expect(registerPersonMock).not.toHaveBeenCalled();
    expect(updatePersonMock).not.toHaveBeenCalled();
  });

  it("allows an adolescent member within the configured age range", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PeopleManager
        initialPeople={[]}
        rangeMember={{ min: 13, max: 17 }}
      />,
    );

    await user.type(getInputByName("first_name"), "Alex");
    await user.type(getInputByName("last_name"), "Perez");
    await user.selectOptions(getSelectByName("person_type"), "member");
    await user.click(screen.getByRole("checkbox", { name: "Aceptó a Jesús" }));

    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 16);
    fireEvent.change(screen.getByTestId("birth-date-picker"), {
      target: { value: format(birthDate, "yyyy-MM-dd") },
    });

    expect(screen.queryByText(/Para ser registrado como Miembro/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar Persona" })).toBeEnabled();

    const form = container.querySelector("form") as HTMLFormElement;
    await act(async () => {
      await getFormAction(form)(new FormData(form));
    });

    expect(registerPersonMock).toHaveBeenCalledOnce();
  });

  // it("blocks an adolescent member below the configured minimum age", async () => {
  //   const user = userEvent.setup();
  //   const { container } = render(
  //     <PeopleManager
  //       initialPeople={[]}
  //       rangeMember={{ min: 13, max: 17 }}
  //     />,
  //   );

  //   await user.type(getInputByName("first_name"), "Alex");
  //   await user.type(getInputByName("last_name"), "Perez");
  //   await user.selectOptions(getSelectByName("person_type"), "member");
  //   await user.click(screen.getByRole("checkbox", { name: "Aceptó a Jesús" }));

  //   const birthDate = new Date();
  //   birthDate.setFullYear(birthDate.getFullYear() - 12);
  //   fireEvent.change(screen.getByTestId("birth-date-picker"), {
  //     target: { value: format(birthDate, "yyyy-MM-dd") },
  //   });

  //   expect(
  //     screen.getByText("Para ser registrado como Miembro: debe tener entre 13 y 17 años.")
  //   ).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: "Guardar Persona" })).toBeDisabled();

  //   const form = container.querySelector("form") as HTMLFormElement;
  //   await act(async () => {
  //     await getFormAction(form)(new FormData(form));
  //   });

  //   expect(registerPersonMock).not.toHaveBeenCalled();
  // });

  it.each([
    { editing: false, message: "Persona agregada" },
    { editing: true, message: "Datos actualizados" },
  ])("shows $message above the submit button for two seconds", async ({ editing, message }) => {
    vi.useFakeTimers();
    const { container } = render(<PeopleManager initialPeople={editing ? [makePerson()] : []} />);
    if (editing) {
      fireEvent.click(screen.getByRole("button", { name: "Editar" }));
    }

    const form = container.querySelector("form") as HTMLFormElement;
    await act(async () => {
      await getFormAction(form)(new FormData(form));
    });

    const status = screen.getByRole("status");
    const submitButton = screen.getByRole("button", { name: "Guardar Persona" });
    expect(status).toHaveTextContent(message);
    expect(status).toHaveClass("text-blue-600");
    expect(status.compareDocumentPosition(submitButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    act(() => vi.advanceTimersByTime(1999));
    expect(screen.getByRole("status")).toHaveTextContent(message);
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("restarts the confirmation timer after another successful submission", async () => {
    vi.useFakeTimers();
    const { container } = render(<PeopleManager initialPeople={[]} />);
    const form = container.querySelector("form") as HTMLFormElement;

    await act(async () => {
      await getFormAction(form)(new FormData(form));
    });
    act(() => vi.advanceTimersByTime(1500));
    await act(async () => {
      await getFormAction(form)(new FormData(form));
    });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("status")).toHaveTextContent("Persona agregada");
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows an update error without a success message or leaving edit mode", async () => {
    updatePersonMock.mockResolvedValue({ success: false, error: "No se pudo actualizar." });
    const { container } = render(<PeopleManager initialPeople={[makePerson()]} />);
    fireEvent.click(screen.getByRole("button", { name: "Editar" }));

    const form = container.querySelector("form") as HTMLFormElement;
    await act(async () => {
      await getFormAction(form)(new FormData(form));
    });

    expect(screen.getByRole("alert")).toHaveTextContent("No se pudo actualizar.");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Actualizar" })).toBeInTheDocument();
    expect(getInputByName("first_name")).toHaveValue("Ana");
  });

  it("submits update flow with person id and exits editing mode", async () => {
    const user = userEvent.setup();
    const person = makePerson({
      id: "update-1",
      first_name: "Maria",
      last_name: "Lopez",
      birth_date: "1990-03-10",
      is_first_time_visitor: true,
    });

    const { container } = render(<PeopleManager initialPeople={[person]} />);

    await user.click(screen.getByRole("button", { name: "Editar" }));

    const firstNameInput = getInputByName("first_name");
    await user.clear(firstNameInput);
    await user.type(firstNameInput, "Mariana");

    await user.click(screen.getByRole("checkbox", { name: "Visitante por primera vez" }));

    const form = container.querySelector("form") as HTMLFormElement;
    const action = getFormAction(form);
    await act(async () => {
      await action(new FormData(form));
    });

    await waitFor(() => {
      expect(updatePersonMock).toHaveBeenCalledTimes(1);
    });

    const [calledId, submittedFormData] = updatePersonMock.mock.calls[0] as [string, FormData];
    expect(calledId).toBe("update-1");
    expect(submittedFormData.get("first_name")).toBe("Mariana");
    expect(submittedFormData.get("birth_date")).toBe("1990-03-10");
    expect(submittedFormData.has("is_first_time_visitor")).toBe(false);
    expect(submittedFormData.has("first_visit_date")).toBe(false);

    expect(registerPersonMock).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("Registro de Nueva Persona")).toBeInTheDocument();
    });
  });

  it("sets today's first visit date when saving an existing first-time visitor", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PeopleManager initialPeople={[makePerson({ is_first_time_visitor: true })]} />,
    );

    await user.click(screen.getByRole("button", { name: "Editar" }));
    const form = container.querySelector("form") as HTMLFormElement;
    await act(async () => {
      await getFormAction(form)(new FormData(form));
    });

    const [, submittedFormData] = updatePersonMock.mock.calls[0] as [string, FormData];
    expect(submittedFormData.get("first_visit_date")).toBe(format(new Date(), "yyyy-MM-dd"));
  });
});
