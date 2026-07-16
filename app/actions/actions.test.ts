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

describe("actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
  });

  it("registerPerson inserts normalized payload and revalidates on success", async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    const fromMock = vi.fn(() => ({ insert: insertMock }));

    createClientMock.mockResolvedValue({ from: fromMock });

    const formData = buildFormData({
      id_number: "  V-12345 ",
      first_name: "Ana",
      last_name: "Perez",
      home_phone: "",
      cell_phone: "0414-1234567",
      email: "ana@test.com",
      birth_date: "2000-10-01",
      person_type: "visitor",
      address: "Av. 1",
      city: "Caracas",
      notes: "Nueva",
      is_first_time_visitor: "on",
      wants_bible_studies: "on",
      accepted_jesus: "on",
    });

    const result = await registerPerson(formData);

    expect(fromMock).toHaveBeenCalledWith("people");
    expect(insertMock).toHaveBeenCalledWith([
      expect.objectContaining({
        id_number: "v-12345",
        first_name: "Ana",
        last_name: "Perez",
        home_phone: null,
        cell_phone: "0414-1234567",
        is_first_time_visitor: true,
        wants_bible_studies: true,
        accepted_jesus: true,
        needs_prayer: false,
      }),
    ]);
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it("registerPerson returns error payload when insert fails", async () => {
    const insertMock = vi.fn().mockResolvedValue({
      error: { message: "duplicate key value violates unique constraint" },
    });

    createClientMock.mockResolvedValue({
      from: vi.fn(() => ({ insert: insertMock })),
    });

    const result = await registerPerson(buildFormData({ first_name: "Ana", last_name: "Perez", person_type: "visitor" }));

    expect(result).toEqual({
      success: false,
      error: "duplicate key value violates unique constraint",
    });
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("updatePerson updates expected row and handles empty id_number", async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const updateMock = vi.fn(() => ({ eq: eqMock }));

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
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it("deletePerson deletes by id and returns success", async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const deleteMock = vi.fn(() => ({ eq: eqMock }));

    createClientMock.mockResolvedValue({
      from: vi.fn(() => ({ delete: deleteMock })),
    });

    const result = await deletePerson("person-44");

    expect(deleteMock).toHaveBeenCalled();
    expect(eqMock).toHaveBeenCalledWith("id", "person-44");
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
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
    const signInWithPasswordMock = vi.fn().mockResolvedValue({ error: null });

    createClientMock.mockResolvedValue({
      auth: { signInWithPassword: signInWithPasswordMock },
    });

    await login(null, buildFormData({ email: "ok@test.com", password: "123456" }));

    expect(signInWithPasswordMock).toHaveBeenCalledWith({
      email: "ok@test.com",
      password: "123456",
    });
    expect(redirectMock).toHaveBeenCalledWith("/");
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
