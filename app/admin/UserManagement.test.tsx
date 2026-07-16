import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  adminCreateUserMock,
  adminUpdateUserMock,
  adminDeleteUserMock,
  refreshMock,
  useRouterMock,
} = vi.hoisted(() => ({
  adminCreateUserMock: vi.fn(),
  adminUpdateUserMock: vi.fn(),
  adminDeleteUserMock: vi.fn(),
  refreshMock: vi.fn(),
  useRouterMock: vi.fn(),
}));

vi.mock("@/app/actions/admin-actions", () => ({
  adminCreateUser: adminCreateUserMock,
  adminUpdateUser: adminUpdateUserMock,
  adminDeleteUser: adminDeleteUserMock,
}));

vi.mock("next/navigation", () => ({
  useRouter: useRouterMock,
}));

import UserManagement from "./UserManagement";

type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    role?: string;
  };
};

function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: "user-1",
    email: "user1@test.com",
    user_metadata: {
      full_name: "Usuario Uno",
      role: "operator",
    },
    ...overrides,
  };
}

describe("UserManagement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouterMock.mockReturnValue({ refresh: refreshMock });
    vi.spyOn(window, "confirm").mockReturnValue(true);

    adminCreateUserMock.mockResolvedValue({ success: true });
    adminUpdateUserMock.mockResolvedValue({ success: true, user: { id: "user-1" } });
    adminDeleteUserMock.mockResolvedValue({ success: true });
  });

  it("renders create panel and empty state", () => {
    render(<UserManagement userRole="admin" initialUsers={[]} />);

    expect(screen.getByText("Panel de Gestión de Usuarios")).toBeInTheDocument();
    expect(screen.getByText("Usuarios en Autenticación (0)")).toBeInTheDocument();
    expect(screen.getByText("No hay usuarios registrados en autenticación.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear Usuario" })).toBeInTheDocument();
  });

  it("creates user successfully, resets form and refreshes list", async () => {
    const user = userEvent.setup();

    render(<UserManagement userRole="superadmin" initialUsers={[]} />);

    const nameInput = screen.getByPlaceholderText("Ej: Juan Pérez") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("correo@ejemplo.com") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Mínimo 6 caracteres") as HTMLInputElement;
    const roleSelect = screen.getByRole("combobox") as HTMLSelectElement;

    await user.type(nameInput, "Ana Admin");
    await user.type(emailInput, "ana@test.com");
    await user.type(passwordInput, "123456");
    await user.selectOptions(roleSelect, "admin");

    await user.click(screen.getByRole("button", { name: "Crear Usuario" }));

    await waitFor(() => {
      expect(adminCreateUserMock).toHaveBeenCalledWith("ana@test.com", "123456", "Ana Admin");
    });

    expect(screen.getByText("Usuario Ana Admin creado con éxito")).toBeInTheDocument();
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(roleSelect.value).toBe("operator");
    expect(refreshMock).toHaveBeenCalled();
  });

  it("shows create error message when action fails", async () => {
    const user = userEvent.setup();
    adminCreateUserMock.mockResolvedValueOnce({ success: false, error: "correo ya existe" });

    render(<UserManagement userRole="admin" initialUsers={[]} />);

    await user.type(screen.getByPlaceholderText("Ej: Juan Pérez"), "Ana");
    await user.type(screen.getByPlaceholderText("correo@ejemplo.com"), "ana@test.com");
    await user.type(screen.getByPlaceholderText("Mínimo 6 caracteres"), "123456");

    await user.click(screen.getByRole("button", { name: "Crear Usuario" }));

    await waitFor(() => {
      expect(screen.getByText("Error: correo ya existe")).toBeInTheDocument();
    });

    expect(refreshMock).not.toHaveBeenCalled();
  });

  it("validates password length in edit mode and blocks update", async () => {
    const user = userEvent.setup();

    render(<UserManagement userRole="superadmin" initialUsers={[makeUser()]} />);

    await user.click(screen.getByRole("button", { name: "Editar" }));

    const newPasswordInput = screen.getByPlaceholderText("Nueva contraseña");
    await user.type(newPasswordInput, "12345");

    await user.click(screen.getByRole("button", { name: "Guardar Cambios" }));

    expect(
      screen.getByText("La nueva contraseña debe tener al menos 6 caracteres."),
    ).toBeInTheDocument();
    expect(adminUpdateUserMock).not.toHaveBeenCalled();
  });

  it("updates user and shows success badge in list item", async () => {
    const user = userEvent.setup();
    const target = makeUser({
      id: "user-9",
      email: "before@test.com",
      user_metadata: { full_name: "Nombre Viejo", role: "operator" },
    });

    render(<UserManagement userRole="superadmin" initialUsers={[target]} />);

    await user.click(screen.getByRole("button", { name: "Editar" }));

    const editModeText = screen.getByText("Editando Usuario");
    const editContainer = editModeText.closest("div");
    if (!editContainer) {
      throw new Error("Edit container not found");
    }

    const nameInput = screen.getByDisplayValue("Nombre Viejo");
    const emailInput = screen.getByDisplayValue("before@test.com");
    const roleSelect = within(editContainer).getByRole("combobox");

    await user.clear(nameInput);
    await user.type(nameInput, "Nombre Nuevo");
    await user.clear(emailInput);
    await user.type(emailInput, "after@test.com");
    await user.selectOptions(roleSelect, "admin");

    fireEvent.click(screen.getByRole("button", { name: "Guardar Cambios" }));

    await waitFor(() => {
      expect(adminUpdateUserMock).toHaveBeenCalledWith("user-9", {
        email: "after@test.com",
        fullName: "Nombre Nuevo",
        role: "admin",
      });
    });

    expect(refreshMock).toHaveBeenCalled();
    expect(screen.getByText("Usuario actualizado con éxito")).toBeInTheDocument();
    expect(screen.queryByText("Editando Usuario")).not.toBeInTheDocument();
  });

  it("deletes a user after confirmation and refreshes", async () => {
    const user = userEvent.setup();
    const target = makeUser({
      id: "user-7",
      user_metadata: { full_name: "Pedro", role: "operator" },
    });

    render(<UserManagement userRole="admin" initialUsers={[target]} />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith("¿Seguro que quieres eliminar el usuario Pedro?");
      expect(adminDeleteUserMock).toHaveBeenCalledWith("user-7");
    });

    expect(screen.getByText("Usuario Pedro eliminado correctamente")).toBeInTheDocument();
    expect(refreshMock).toHaveBeenCalled();
  });

  it("does not delete when confirmation is canceled", async () => {
    const user = userEvent.setup();
    (window.confirm as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(false);

    render(<UserManagement userRole="admin" initialUsers={[makeUser({ id: "user-11" })]} />);

    await user.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(adminDeleteUserMock).not.toHaveBeenCalled();
    expect(refreshMock).not.toHaveBeenCalled();
  });
});
