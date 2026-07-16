import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  redirectMock,
  createClientMock,
  createAdminClientMock,
} = vi.hoisted(() => ({
  redirectMock: vi.fn(),
  createClientMock: vi.fn(),
  createAdminClientMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("../utils/supabase", () => ({
  createClient: createClientMock,
}));

vi.mock("../utils/supabase-admin", () => ({
  createAdminClient: createAdminClientMock,
}));

vi.mock("./DashboardClient", () => ({
  default: (props: {
    userName: string;
    userRole: string;
    initialUsers: Array<{ id: string }>;
    initialPeople: Array<Record<string, unknown>>;
    attendanceLogs: Array<Record<string, unknown>>;
  }) => <div data-testid="dashboard-client">{JSON.stringify(props)}</div>,
}));

import AdminPage from "./page";

type AuthUser = { id: string };

type BuildSupabaseOptions = {
  user: { id: string } | null;
  profile?: { role?: string; full_name?: string } | null;
  people?: Array<Record<string, unknown>>;
  attendanceLogs?: Array<Record<string, unknown>>;
  operatorProfiles?: Array<{ id: string }>;
  excludedProfiles?: Array<{ id: string }>;
};

function buildSupabaseMock(options: BuildSupabaseOptions) {
  const {
    user,
    profile = null,
    people = [],
    attendanceLogs = [],
    operatorProfiles = [],
    excludedProfiles = [],
  } = options;

  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
    from: vi.fn((table: string) => {
      if (table === "profiles") {
        return {
          select: vi.fn((columns: string) => {
            if (columns === "role, full_name") {
              return {
                eq: vi.fn(() => ({
                  single: vi.fn().mockResolvedValue({ data: profile }),
                })),
              };
            }

            if (columns === "id") {
              return {
                eq: vi.fn(() => Promise.resolve({ data: operatorProfiles })),
                in: vi.fn(() => Promise.resolve({ data: excludedProfiles })),
              };
            }

            throw new Error(`Unexpected profiles select: ${columns}`);
          }),
        };
      }

      if (table === "people") {
        return {
          select: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: people }),
          })),
        };
      }

      if (table === "attendance_logs") {
        return {
          select: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: attendanceLogs }),
          })),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    }),
  };
}

describe("AdminPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to / when there is no authenticated user", async () => {
    redirectMock.mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });

    createClientMock.mockResolvedValue(buildSupabaseMock({ user: null }));
    createAdminClientMock.mockReturnValue({
      auth: { admin: { listUsers: vi.fn().mockResolvedValue({ data: { users: [] }, error: null }) } },
    });

    await expect(AdminPage()).rejects.toThrow("NEXT_REDIRECT");
    expect(redirectMock).toHaveBeenCalledWith("/");
  });

  it("redirects to / when authenticated user has no admin access", async () => {
    redirectMock.mockImplementation(() => {
      throw new Error("NEXT_REDIRECT");
    });

    createClientMock.mockResolvedValue(
      buildSupabaseMock({
        user: { id: "u-1" },
        profile: { role: "operator", full_name: "Operador Uno" },
      }),
    );
    createAdminClientMock.mockReturnValue({
      auth: { admin: { listUsers: vi.fn().mockResolvedValue({ data: { users: [] }, error: null }) } },
    });

    await expect(AdminPage()).rejects.toThrow("NEXT_REDIRECT");
    expect(redirectMock).toHaveBeenCalledWith("/");
  });

  it("renders dashboard for admin with only operator users", async () => {
    const authUsers: AuthUser[] = [{ id: "op-1" }, { id: "admin-1" }];

    createClientMock.mockResolvedValue(
      buildSupabaseMock({
        user: { id: "u-admin" },
        profile: { role: "admin", full_name: "Maria Admin Extra" },
        operatorProfiles: [{ id: "op-1" }],
        people: [
          {
            id: "p1",
            first_name: "Ana",
            attendance_logs: [{ count: 2 }],
          },
        ],
        attendanceLogs: [{ id: "l1" }],
      }),
    );

    createAdminClientMock.mockReturnValue({
      auth: {
        admin: {
          listUsers: vi.fn().mockResolvedValue({
            data: { users: authUsers },
            error: null,
          }),
        },
      },
    });

    const ui = await AdminPage();

    expect(ui).toBeTruthy();
    expect((ui as { props: Record<string, unknown> }).props).toEqual({
      userName: "Maria Admin",
      userRole: "admin",
      initialUsers: [{ id: "op-1" }],
      initialPeople: [
        {
          id: "p1",
          first_name: "Ana",
          attendance_logs: [{ count: 2 }],
          attendance_count: 2,
        },
      ],
      attendanceLogs: [{ id: "l1" }],
    });
  });

  it("renders dashboard for superadmin excluding superadmin accounts", async () => {
    const authUsers: AuthUser[] = [{ id: "super-1" }, { id: "admin-2" }, { id: "op-2" }];

    createClientMock.mockResolvedValue(
      buildSupabaseMock({
        user: { id: "u-super" },
        profile: { role: "superadmin", full_name: "Super Admin Principal" },
        excludedProfiles: [{ id: "super-1" }],
        people: [
          {
            id: "p2",
            first_name: "Luis",
            attendance_logs: [],
          },
        ],
        attendanceLogs: [],
      }),
    );

    createAdminClientMock.mockReturnValue({
      auth: {
        admin: {
          listUsers: vi.fn().mockResolvedValue({
            data: { users: authUsers },
            error: null,
          }),
        },
      },
    });

    const ui = await AdminPage();

    expect((ui as { props: Record<string, unknown> }).props).toEqual({
      userName: "Super Admin",
      userRole: "superadmin",
      initialUsers: [{ id: "admin-2" }, { id: "op-2" }],
      initialPeople: [
        {
          id: "p2",
          first_name: "Luis",
          attendance_logs: [],
          attendance_count: 0,
        },
      ],
      attendanceLogs: [],
    });
  });
});
