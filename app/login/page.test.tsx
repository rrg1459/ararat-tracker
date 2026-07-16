import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { useActionStateMock, loginMock, formActionMock, araratLogoSpy } = vi.hoisted(() => ({
  useActionStateMock: vi.fn(),
  loginMock: vi.fn(),
  formActionMock: vi.fn(),
  araratLogoSpy: vi.fn(),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useActionState: useActionStateMock,
  };
});

vi.mock("../actions/actions", () => ({
  login: loginMock,
}));

vi.mock("../components/AraratLogo", () => ({
  default: (props: { size?: number; priority?: boolean; className?: string }) => {
    araratLogoSpy(props);
    return <div data-testid="ararat-logo" />;
  },
}));

import LoginPage from "./page";

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useActionStateMock.mockReturnValue([null, formActionMock, false]);
  });

  it("renders login form with base fields", () => {
    render(<LoginPage />);

    expect(screen.getByTestId("ararat-logo")).toBeInTheDocument();
    expect(araratLogoSpy).toHaveBeenCalledWith({
      size: 180,
      priority: true,
      className: "mx-auto mb-4",
    });

    expect(screen.getByText("Control de Asistencia")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("nombre@correo.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument();
  });

  it("shows pending state while login action is running", () => {
    useActionStateMock.mockReturnValue([null, formActionMock, true]);

    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: "Iniciando sesión..." });
    expect(submitButton).toBeDisabled();
  });

  it("keeps email and shows error message from action state", () => {
    useActionStateMock.mockReturnValue([
      {
        error: "El correo electrónico o la contraseña son incorrectos.",
        email: "user@test.com",
      },
      formActionMock,
      false,
    ]);

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("nombre@correo.com") as HTMLInputElement;
    expect(emailInput.value).toBe("user@test.com");

    expect(
      screen.getByText("El correo electrónico o la contraseña son incorrectos."),
    ).toBeInTheDocument();
  });
});
