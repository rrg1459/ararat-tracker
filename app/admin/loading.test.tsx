import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  createClientMock,
  adminHeaderSpy,
} = vi.hoisted(() => ({
  createClientMock: vi.fn(),
  adminHeaderSpy: vi.fn(),
}));

vi.mock("../utils/supabase", () => ({
  createClient: createClientMock,
}));

vi.mock("./AdminHeader", () => ({
  default: (props: { userName: string; userRole: string; logoPriority?: boolean }) => {
    adminHeaderSpy(props);
    return <div data-testid="admin-header" />;
  },
}));

import Loading from "./loading";

describe("Admin loading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses default session values when there is no authenticated user", async () => {
    const fromMock = vi.fn();

    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
      from: fromMock,
    });

    const ui = await Loading();
    render(ui);

    expect(screen.getByTestId("admin-header")).toBeInTheDocument();
    expect(screen.getByText("Procesando...")).toBeInTheDocument();

    expect(adminHeaderSpy).toHaveBeenCalledWith({
      userName: "Usuario",
      userRole: "Anotador",
      logoPriority: true,
    });

    expect(fromMock).not.toHaveBeenCalled();
  });

  it("derives userName and userRole from profile when user exists", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: {
                full_name: "Maria Del Carmen Lopez",
                role: "superadmin",
              },
            }),
          })),
        })),
      })),
    });

    const ui = await Loading();
    render(ui);

    expect(adminHeaderSpy).toHaveBeenCalledWith({
      userName: "Maria Del",
      userRole: "superadmin",
      logoPriority: true,
    });
  });

  it("keeps fallback values when profile has missing data", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-2" } } }),
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: {} }),
          })),
        })),
      })),
    });

    const ui = await Loading();
    render(ui);

    expect(adminHeaderSpy).toHaveBeenCalledWith({
      userName: "Usuario",
      userRole: "Anotador",
      logoPriority: true,
    });
  });
});
