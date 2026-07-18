import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  createClientMock,
  peopleManagerSpy,
  attendanceClientSpy,
  userSettingsModalSpy,
} = vi.hoisted(() => ({
  createClientMock: vi.fn(),
  peopleManagerSpy: vi.fn(),
  attendanceClientSpy: vi.fn(),
  userSettingsModalSpy: vi.fn(),
}));

vi.mock("./utils/supabase", () => ({
  createClient: createClientMock,
}));

vi.mock("./people-manager", () => ({
  default: ({ initialPeople }: { initialPeople: unknown[] }) => {
    peopleManagerSpy(initialPeople);
    return <div data-testid="people-manager">People Manager</div>;
  },
}));

vi.mock("./attendance/AttendanceClient", () => ({
  default: (props: { people: unknown[]; initialLogs: unknown[]; currentDate: string }) => {
    attendanceClientSpy(props);
    return <div data-testid="AttendanceClient">Attendance Client</div>;
  },
}));

vi.mock("./components/UserSettingsModal", () => ({
  default: (props: { userId: string; initialName: string; initialEmail: string }) => {
    userSettingsModalSpy(props);
    return <div data-testid="settings-modal">Settings</div>;
  },
}));

vi.mock("./components/AraratLogo", () => ({
  default: () => <div data-testid="AraratLogo" />,
}));

vi.mock("./svg/FaSignOutAlt", () => ({
  default: () => <span>Sign Out</span>,
}));

vi.mock("./actions/actions", () => ({
  logout: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: (props: { alt?: string }) => <span role="img" aria-label={props.alt ?? ""} />,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: ReactNode } & Record<string, unknown>) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

import Home from "./page";

type MockUser = {
  id: string;
  email?: string;
};

type MockProfile = {
  email?: string;
  role?: string;
  full_name?: string;
};

function buildSupabaseMock({
  user,
  profile,
  people,
  logs,
}: {
  user: MockUser | null;
  profile: MockProfile | null;
  people: Array<Record<string, unknown>>;
  logs: Array<{ person_id: string }>;
}) {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
    from: vi.fn((table: string) => {
      if (table === "profiles") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: profile, error: null }),
            })),
          })),
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
            eq: vi.fn().mockResolvedValue({ data: logs }),
          })),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    }),
  };
}

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders attendance view by default and passes expected props", async () => {
    const today = "2026-07-14";
    const people = [{ id: "p1" }, { id: "p2" }];
    const logs = [{ person_id: "p1" }];

    createClientMock.mockResolvedValue(
      buildSupabaseMock({
        user: { id: "u1", email: "admin@acme.com" },
        profile: { full_name: "Admin Principal", role: "admin", email: "admin@acme.com" },
        people,
        logs,
      }),
    );

    const ui = await Home({
      searchParams: Promise.resolve({ date: today }),
    });

    render(ui);

    expect(screen.getByTestId("AttendanceClient")).toBeInTheDocument();
    expect(attendanceClientSpy).toHaveBeenCalledWith({
      people,
      initialLogs: logs,
      currentDate: today,
    });

    expect(screen.getByText("Gestión personas")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Admin Icon" })).toHaveAttribute("href", "/admin");
    expect(userSettingsModalSpy).toHaveBeenCalledWith({
      userId: "u1",
      initialName: "Admin Principal",
      initialEmail: "admin@acme.com",
    });
  });

  it("renders people view when view=people and hides admin icon for non-admin users", async () => {
    const people = [{ id: "p1" }];

    createClientMock.mockResolvedValue(
      buildSupabaseMock({
        user: { id: "u2", email: "user@acme.com" },
        profile: { full_name: "Usuario Normal", role: "operator", email: "user@acme.com" },
        people,
        logs: [],
      }),
    );

    const ui = await Home({
      searchParams: Promise.resolve({ view: "people", date: "2026-07-13" }),
    });

    render(ui);

    expect(screen.getByTestId("people-manager")).toBeInTheDocument();
    expect(peopleManagerSpy).toHaveBeenCalledWith(people);
    expect(screen.getByText("Tomar asistencia")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Admin Icon" })).not.toBeInTheDocument();
  });
});
