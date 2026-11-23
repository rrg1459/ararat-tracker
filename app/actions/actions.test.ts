import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  createClientMock,
  revalidatePathMock,
  redirectMock,
  createSupabaseAdminClientMock,
} = vi.hoisted(() => ({
  createClientMock: vi.fn(),
  revalidatePathMock: vi.fn(),
  redirectMock: vi.fn(),
  createSupabaseAdminClientMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("../utils/supabase", () => ({
  createClient: createClientMock,
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: createSupabaseAdminClientMock,
}));

import {
  deletePerson,
  login,
  logout,
  registerPerson,
  saveAttendance,
  setAttendance,
  updateOwnUserSettings,
  updatePerson,
} from "./actions";

function buildFormData(values: Record<string, string>) {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

function makeRegisterPersonClient({
  role = "operator",
  personError = null,
  attendanceError = null,
}: {
  role?: string;
  personError?: { message: string } | null;
  attendanceError?: { message: string } | null;
} = {}) {
  const personSingleMock = vi.fn().mockResolvedValue({
    data: personError ? null : { id: "person-1" },
    error: personError,
  });
  const personSelectMock = vi.fn(() => ({ single: personSingleMock }));
  const personInsertMock = vi.fn(() => ({ select: personSelectMock }));
  const attendanceInsertMock = vi.fn().mockResolvedValue({ error: attendanceError });
  const profileMaybeSingleMock = vi.fn().mockResolvedValue({
    data: { role },
    error: null,
  });
  const profileEqMock = vi.fn(() => ({ maybeSingle: profileMaybeSingleMock }));
  const profileSelectMock = vi.fn(() => ({ eq: profileEqMock }));
  const fromMock = vi.fn((table: string) => {
    if (table === "profiles") {
      return { select: profileSelectMock };
    }
    if (table === "people") {
      return { insert: personInsertMock };
    }
    if (table === "attendance_logs") {
      return { insert: attendanceInsertMock };
    }
    throw new Error(`Unexpected table: ${table}`);
  });

  return {
    supabase: {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: "user-1" } },
          error: null,
        }),
      },
      from: fromMock,
    },
    attendanceInsertMock,
    fromMock,
    personInsertMock,
  };
}

describe("actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
  });

  it("registerPerson inserts normalized payload and revalidates on success", async () => {
    const client = makeRegisterPersonClient();
    createClientMock.mockResolvedValue(client.supabase);

    const formData = buildFormData({
      id_number: "  V-12345 ",
      first_name: "Ana",
      last_name: "Perez",
      home_phone: "",
      cell_phone: "0414-1234567",
      email: "ana@test.com",
      birth_date: "2000-10-01",
      first_visit_date: "2026-07-16",
      person_type: "visitor",
      address: "Av. 1",
      city: "Caracas",
      notes: "Nueva",
      is_first_time_visitor: "on",
      wants_bible_studies: "on",
      accepted_jesus: "on",
    });

    const result = await registerPerson(formData);

    expect(client.fromMock).toHaveBeenCalledWith("people");
    expect(client.personInsertMock).toHaveBeenCalledWith([
      expect.objectContaining({
        id_number: "v-12345",
        first_name: "Ana",
        last_name: "Perez",
        home_phone: null,
        cell_phone: "0414-1234567",
        is_first_time_visitor: true,
        first_visit_date: "2026-07-16",
        wants_bible_studies: true,
        accepted_jesus: true,
        needs_prayer: false,
      }),
    ]);
    expect(client.attendanceInsertMock).toHaveBeenCalledWith({
      person_id: "person-1",
      created_at: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it("registerPerson skips attendance for superadmins", async () => {
    const client = makeRegisterPersonClient({ role: "superadmin" });
    createClientMock.mockResolvedValue(client.supabase);

    const result = await registerPerson(buildFormData({
      first_name: "Ana",
      last_name: "Perez",
      person_type: "visitor",
    }));

    expect(result).toEqual({ success: true });
    expect(client.attendanceInsertMock).not.toHaveBeenCalled();
  });

  it("registerPerson reports partial success when attendance insert fails", async () => {
    const client = makeRegisterPersonClient({
      attendanceError: { message: "attendance insert failed" },
    });
    createClientMock.mockResolvedValue(client.supabase);

    const result = await registerPerson(buildFormData({
      first_name: "Ana",
      last_name: "Perez",
      person_type: "visitor",
    }));

    expect(result).toEqual({
      success: false,
      error: "La persona fue creada, pero no se pudo registrar su asistencia: attendance insert failed",
      personCreated: true,
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
  });

  it("registerPerson returns error payload when insert fails", async () => {
    const client = makeRegisterPersonClient({
      personError: { message: "duplicate key value violates unique constraint" },
    });
    createClientMock.mockResolvedValue(client.supabase);

    const result = await registerPerson(buildFormData({ first_name: "Ana", last_name: "Perez", person_type: "visitor" }));

    expect(result).toEqual({
      success: false,
      error: "duplicate key value violates unique constraint",
    });
    expect(revalidatePathMock).not.toHaveBeenCalled();
    expect(client.attendanceInsertMock).not.toHaveBeenCalled();
  });

  it("updatePerson updates expected row and handles empty id_number", async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const updateMock = vi.fn<(payload: Record<string, unknown>) => { eq: typeof eqMock }>(() => ({ eq: eqMock }));

    createClientMock.mockResolvedValue({
      from: vi.fn(() => ({ update: updateMock })),
    });

    const formData = buildFormData({
      id_number: "   ",
      first_name: "Luis",
      last_name: "Ramirez",
      person_type: "member",
    });

    const result = await updatePerson("person-1", formData);

    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id_number: null,
        first_name: "Luis",
        last_name: "Ramirez",
        person_type: "member",
      }),
    );
    expect(eqMock).toHaveBeenCalledWith("id", "person-1");
    expect(updateMock.mock.calls[0][0]).not.toHaveProperty("first_visit_date");
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it("updatePerson saves the supplied first visit date for a first-time visitor", async () => {
    const updateMock = vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) }));
    createClientMock.mockResolvedValue({ from: vi.fn(() => ({ update: updateMock })) });

    await updatePerson("person-1", buildFormData({
      is_first_time_visitor: "on",
      first_visit_date: "2026-07-16",
    }));

    expect(updateMock).toHaveBeenCalledWith(expect.objectContaining({
      is_first_time_visitor: true,
      first_visit_date: "2026-07-16",
    }));
  });

  it("deletePerson deletes by id and returns success", async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const deleteMock = vi.fn(() => ({ eq: eqMock }));

    createClientMock.mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }) },
      from: vi.fn((table: string) => table === "profiles"
        ? { select: () => ({ eq: () => ({ maybeSingle: vi.fn().mockResolvedValue({ data: { role: "superadmin" }, error: null }) }) }) }
        : { delete: deleteMock }),
    });

    const result = await deletePerson("person-44");

    expect(deleteMock).toHaveBeenCalled();
    expect(eqMock).toHaveBeenCalledWith("id", "person-44");
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it.each(["admin", "operator", null])("deletePerson rejects role %s", async (role) => {
    const deleteMock = vi.fn();
    createClientMock.mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }) },
      from: vi.fn((table: string) => table === "profiles"
        ? { select: () => ({ eq: () => ({ maybeSingle: vi.fn().mockResolvedValue({ data: role ? { role } : null, error: null }) }) }) }
        : { delete: deleteMock }),
    });

    expect(await deletePerson("person-44")).toEqual({
      success: false,
      error: "Solo superadmin puede eliminar personas.",
    });
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it("deletePerson rejects unauthenticated users and profile lookup failures", async () => {
    const from = vi.fn();
    createClientMock.mockResolvedValueOnce({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }) },
      from,
    });
    expect(await deletePerson("person-44")).toEqual({ success: false, error: "No autenticado." });
    expect(from).not.toHaveBeenCalled();

    const deleteMock = vi.fn();
    createClientMock.mockResolvedValueOnce({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }) },
      from: vi.fn((table: string) => table === "profiles"
        ? { select: () => ({ eq: () => ({ maybeSingle: vi.fn().mockResolvedValue({ data: null, error: { message: "profile error" } }) }) }) }
        : { delete: deleteMock }),
    });
    expect(await deletePerson("person-44")).toEqual({ success: false, error: "No se pudo verificar el rol del usuario." });
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it("saveAttendance calls RPC with date and ids", async () => {
    const rpcMock = vi.fn().mockResolvedValue({ error: null });
    createClientMock.mockResolvedValue({ rpc: rpcMock });

    const result = await saveAttendance("2026-07-16", ["p1", "p2"]);

    expect(rpcMock).toHaveBeenCalledWith("save_attendance_atomic", {
      p_date: "2026-07-16",
      p_person_ids: ["p1", "p2"],
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/attendance");
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it("setAttendance inserts a missing log when attendance is selected", async () => {
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: null, error: null });
    const personEqMock = vi.fn(() => ({ maybeSingle: maybeSingleMock }));
    const dateEqMock = vi.fn(() => ({ eq: personEqMock }));
    const selectMock = vi.fn(() => ({ eq: dateEqMock }));
    const insertMock = vi.fn().mockResolvedValue({ error: null });

    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }),
      },
      from: vi.fn(() => ({ select: selectMock, insert: insertMock })),
    });

    const result = await setAttendance("2026-07-16", "person-44", true);

    expect(insertMock).toHaveBeenCalledWith({
      person_id: "person-44",
      created_at: "2026-07-16",
    });
    expect(result).toEqual({ success: true });
  });

  it("setAttendance deletes the log when attendance is deselected", async () => {
    const personEqMock = vi.fn().mockResolvedValue({ error: null });
    const dateEqMock = vi.fn(() => ({ eq: personEqMock }));
    const deleteMock = vi.fn(() => ({ eq: dateEqMock }));

    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }),
      },
      from: vi.fn(() => ({ delete: deleteMock })),
    });

    const result = await setAttendance("2026-07-16", "person-44", false);

    expect(dateEqMock).toHaveBeenCalledWith("created_at", "2026-07-16");
    expect(personEqMock).toHaveBeenCalledWith("person_id", "person-44");
    expect(result).toEqual({ success: true });
  });

  it("login returns friendly auth error when credentials are invalid", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          error: { message: "Invalid login credentials" },
        }),
      },
    });

    const result = await login(
      null,
      buildFormData({ email: "wrong@test.com", password: "badpass" }),
    );

    expect(result).toEqual({
      error: "El correo electrónico o la contraseña son incorrectos.",
      email: "wrong@test.com",
    });
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("login redirects to home on success", async () => {
    const signInWithPasswordMock = vi.fn().mockResolvedValue({
      data: { user: { id: "user-1" } },
      error: null,
    });
    const profileMaybeSingleMock = vi.fn().mockResolvedValue({
      data: { is_active: true },
      error: null,
    });
    const profileEqMock = vi.fn(() => ({ maybeSingle: profileMaybeSingleMock }));
    const profileSelectMock = vi.fn(() => ({ eq: profileEqMock }));
    const fromMock = vi.fn(() => ({ select: profileSelectMock }));

    createClientMock.mockResolvedValue({
      auth: { signInWithPassword: signInWithPasswordMock },
      from: fromMock,
    });

    await login(null, buildFormData({ email: "ok@test.com", password: "123456" }));

    expect(signInWithPasswordMock).toHaveBeenCalledWith({
      email: "ok@test.com",
      password: "123456",
    });
    expect(fromMock).toHaveBeenCalledWith("profiles");
    expect(profileSelectMock).toHaveBeenCalledWith("is_active");
    expect(profileEqMock).toHaveBeenCalledWith("id", "user-1");
    expect(redirectMock).toHaveBeenCalledWith("/");
  });

  it("login rejects inactive accounts, signs out and shows a support message", async () => {
    const signOutMock = vi.fn().mockResolvedValue({ error: null });
    const profileMaybeSingleMock = vi.fn().mockResolvedValue({
      data: { is_active: false },
      error: null,
    });

    createClientMock.mockResolvedValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { user: { id: "inactive-user" } },
          error: null,
        }),
        signOut: signOutMock,
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({ maybeSingle: profileMaybeSingleMock })),
        })),
      })),
    });

    const result = await login(
      null,
      buildFormData({ email: "inactive@test.com", password: "123456" }),
    );

    expect(result).toEqual({
      error: "Tu cuenta está inactiva. Contacta al administrador.",
      email: "inactive@test.com",
    });
    expect(signOutMock).toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("logout signs out and redirects to /login", async () => {
    const signOutMock = vi.fn().mockResolvedValue({});
    createClientMock.mockResolvedValue({ auth: { signOut: signOutMock } });

    await logout();

    expect(signOutMock).toHaveBeenCalled();
    expect(redirectMock).toHaveBeenCalledWith("/login");
  });

  it("updateOwnUserSettings returns auth error when no user is available", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
      from: vi.fn(),
    });

    const result = await updateOwnUserSettings({ fullName: "Nuevo" });

    expect(result).toEqual({ success: false, error: "No autenticado." });
  });

  it("updateOwnUserSettings updates email, password and profile", async () => {
    const updateUserByIdMock = vi.fn().mockResolvedValue({ error: null });
    const updateUserMock = vi.fn().mockResolvedValue({ error: null });
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const profileUpdateMock = vi.fn(() => ({ eq: eqMock }));

    createSupabaseAdminClientMock.mockReturnValue({
      auth: {
        admin: {
          updateUserById: updateUserByIdMock,
        },
      },
    });

    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: {
              id: "user-1",
              email: "old@mail.com",
              user_metadata: { full_name: "Nombre Viejo" },
            },
          },
          error: null,
        }),
        updateUser: updateUserMock,
      },
      from: vi.fn(() => ({ update: profileUpdateMock })),
    });

    const result = await updateOwnUserSettings({
      email: "NEW@MAIL.COM ",
      password: " new-password ",
      fullName: " Nombre Nuevo ",
    });

    expect(createSupabaseAdminClientMock).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "service-role-key",
    );
    expect(updateUserByIdMock).toHaveBeenCalledWith("user-1", {
      email: "new@mail.com",
      email_confirm: true,
    });
    expect(updateUserMock).toHaveBeenCalledWith({ password: "new-password" });
    expect(profileUpdateMock).toHaveBeenCalledWith({
      full_name: "Nombre Nuevo",
      email: "new@mail.com",
    });
    expect(eqMock).toHaveBeenCalledWith("id", "user-1");
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it("updateOwnUserSettings maps password rate-limit errors to user-friendly text", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: {
              id: "user-2",
              email: "user@mail.com",
              user_metadata: {},
            },
          },
          error: null,
        }),
        updateUser: vi.fn().mockResolvedValue({
          error: { message: "Email rate limit exceeded" },
        }),
      },
      from: vi.fn(),
    });

    const result = await updateOwnUserSettings({ password: "abc12345" });

    expect(result).toEqual({
      success: false,
      error: "Has intentado cambiar las credenciales demasiadas veces. Espera unos minutos.",
    });
  });
});
