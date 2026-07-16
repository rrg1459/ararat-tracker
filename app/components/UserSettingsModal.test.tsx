import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  updateOwnUserSettingsMock,
  showModalMock,
  closeModalMock,
} = vi.hoisted(() => ({
  updateOwnUserSettingsMock: vi.fn(),
  showModalMock: vi.fn(),
  closeModalMock: vi.fn(),
}));

vi.mock("../actions/actions", () => ({
  logout: vi.fn(),
  updateOwnUserSettings: updateOwnUserSettingsMock,
}));

vi.mock("../svg/FcSettings", () => ({
  default: () => <span>settings</span>,
}));

import UserSettingsModal from "./UserSettingsModal";

describe("UserSettingsModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        showModalMock();
        this.setAttribute("open", "");
      },
    });

    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        closeModalMock();
        this.removeAttribute("open");
      },
    });

    vi.spyOn(HTMLFormElement.prototype, "requestSubmit").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});

    updateOwnUserSettingsMock.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("opens the dialog and allows manual close", () => {
    render(
      <UserSettingsModal
        userId="u-1"
        initialName="Ana Perez"
        initialEmail="ana@test.com"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "settings" }));
    expect(showModalMock).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(closeModalMock).toHaveBeenCalled();
  });

  it("shows no changes message when nothing changed", async () => {
    render(
      <UserSettingsModal
        userId="u-1"
        initialName="Ana Perez"
        initialEmail="ana@test.com"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "settings" }));

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("No hay cambios para guardar.")).toBeInTheDocument();
    expect(updateOwnUserSettingsMock).not.toHaveBeenCalled();
  });

  it("submits trimmed updates and logs out after success timeout", async () => {
    const realSetTimeout = globalThis.setTimeout;
    vi.spyOn(globalThis, "setTimeout").mockImplementation(((
      handler: TimerHandler,
      timeout?: number,
      ...args: unknown[]
    ) => {
      if (timeout === 2000 && typeof handler === "function") {
        (handler as (...params: unknown[]) => void)(...args);
        return 0 as unknown as ReturnType<typeof setTimeout>;
      }

      return realSetTimeout(handler, timeout, ...args);
    }) as typeof setTimeout);

    render(
      <UserSettingsModal
        userId="u-2"
        initialName="Nombre Viejo"
        initialEmail="old@test.com"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "settings" }));

    const nameInput = screen.getByDisplayValue("Nombre Viejo");
    const emailInput = screen.getByDisplayValue("old@test.com");
    const passwordInput = screen.getByPlaceholderText("Nueva contraseña");

    fireEvent.change(nameInput, { target: { value: "  Nombre Nuevo  " } });
    fireEvent.change(emailInput, { target: { value: "  new@test.com  " } });
    fireEvent.change(passwordInput, { target: { value: "  secret123  " } });

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    await waitFor(() => {
      expect(updateOwnUserSettingsMock).toHaveBeenCalledWith({
        fullName: "Nombre Nuevo",
        email: "new@test.com",
        password: "secret123",
      });
    });

    expect(screen.getByText("Datos actualizados. Cerrando sesión...")).toBeInTheDocument();
    expect((passwordInput as HTMLInputElement).value).toBe("");

    expect(closeModalMock).toHaveBeenCalled();
    expect(HTMLFormElement.prototype.requestSubmit).toHaveBeenCalled();
  });

  it("shows action error when update fails", async () => {
    updateOwnUserSettingsMock.mockResolvedValueOnce({
      success: false,
      error: "correo invalido",
    });

    render(
      <UserSettingsModal
        userId="u-3"
        initialName="Ana"
        initialEmail="ana@test.com"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "settings" }));

    const emailInput = screen.getByDisplayValue("ana@test.com");
    fireEvent.change(emailInput, { target: { value: "otro@test.com" } });

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    await waitFor(() => {
      expect(screen.getByText("correo invalido")).toBeInTheDocument();
    });
  });
});
