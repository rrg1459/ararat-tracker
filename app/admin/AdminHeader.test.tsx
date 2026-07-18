import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { araratLogoSpy } = vi.hoisted(() => ({
  araratLogoSpy: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode } & Record<string, unknown>) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock("../components/AraratLogo", () => ({
  default: (props: Record<string, unknown>) => {
    araratLogoSpy(props);
    return <div data-testid="ararat-logo" />;
  },
}));

vi.mock("../svg/FaSignOutAlt", () => ({
  default: () => <span>Salir</span>,
}));

vi.mock("../actions/actions", () => ({
  logout: vi.fn(),
}));

import AdminHeader from "./AdminHeader";

describe("AdminHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders session information and core actions", () => {
    render(<AdminHeader userName="Ana Perez" userRole="superadmin" />);

    expect(screen.getByText("Control de Asistencia")).toBeInTheDocument();
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Sesión:")).toBeInTheDocument();
    expect(screen.getByText("Ana Perez")).toBeInTheDocument();
    expect(screen.getByText("superadmin")).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Gestión y Asistencia" });
    expect(homeLink).toHaveAttribute("href", "/");

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Salir")).toBeInTheDocument();
  });

  it("calls onHomeClick when home link is clicked", () => {
    const onHomeClick = vi.fn();

    render(
      <AdminHeader
        userName="Admin"
        userRole="admin"
        onHomeClick={onHomeClick}
      />,
    );

    fireEvent.click(screen.getByRole("link", { name: "Gestión y Asistencia" }));

    expect(onHomeClick).toHaveBeenCalledTimes(1);
  });

  it("passes logoPriority to AraratLogo and defaults to false", () => {
    const { rerender } = render(
      <AdminHeader userName="Admin" userRole="admin" />,
    );

    expect(araratLogoSpy).toHaveBeenCalled();
    expect(araratLogoSpy.mock.calls.at(-1)?.[0]).toMatchObject({
      size: 60,
      priority: false,
    });

    rerender(
      <AdminHeader userName="Admin" userRole="admin" logoPriority />,
    );

    expect(araratLogoSpy.mock.calls.at(-1)?.[0]).toMatchObject({
      size: 60,
      priority: true,
    });
  });
});
