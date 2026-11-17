import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  createClientMock,
  createAdminClientMock,
  supabaseAdminMock,
  revalidatePathMock,
} = vi.hoisted(() => {
  const supabaseAdmin = {
    auth: {
      admin: {
        createUser: vi.fn(),
        updateUserById: vi.fn(),
        deleteUser: vi.fn(),
      },
    },
    from: vi.fn(),
  };

  return {
    createClientMock: vi.fn(),
    createAdminClientMock: vi.fn(() => supabaseAdmin),
    supabaseAdminMock: supabaseAdmin,
    revalidatePathMock: vi.fn(),
  };
});

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("../utils/supabase", () => ({
  createClient: createClientMock,
}));

vi.mock("../utils/supabase-admin", () => ({
  createAdminClient: createAdminClientMock,
}));

import {
  adminCreateUser,
  adminDeleteUser,
  adminUpdatePersonDates,
  adminUpdateUser,
} from "./admin-actions";

function mockActorClient(params: { userId?: string | null; actorRole?: string | null }) {
  const { userId = "actor-1", actorRole = "superadmin" } = params;

  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: userId ? { id: userId } : null },
      }),
    },
    from: vi.fn((table: string) => {
      if (table === "profiles") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({
                data: actorRole ? { role: actorRole } : null,
              }),
            })),
          })),
        };
      }

      throw new Error(`Unexpected actor table: ${table}`);
    }),
  };
}

describe("admin-actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adminCreateUser creates auth user and profile as operator", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "superadmin" }));

    const upsertMock = vi.fn().mockResolvedValue({ error: null });
    supabaseAdminMock.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return { upsert: upsertMock };
      }
      throw new Error(`Unexpected admin table: ${table}`);
    });

    supabaseAdminMock.auth.admin.createUser.mockResolvedValue({
      data: { user: { id: "new-user-1", email: "new@test.com" } },
      error: null,
    });

    const result = await adminCreateUser("new@test.com", "StrongPass123", "Nuevo Usuario", "operator");

    expect(supabaseAdminMock.auth.admin.createUser).toHaveBeenCalledWith({
      email: "new@test.com",
      password: "StrongPass123",
      email_confirm: true,
      user_metadata: { full_name: "Nuevo Usuario", role: "operator" },
    });
    expect(upsertMock).toHaveBeenCalledWith({
      id: "new-user-1",
      full_name: "Nuevo Usuario",
      role: "operator",
      email: "new@test.com",
    });
    expect(result).toEqual({
      success: true,
      user: { id: "new-user-1", email: "new@test.com" },
    });
  });

  it("adminCreateUser rolls back auth user when profile upsert fails", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "superadmin" }));

    supabaseAdminMock.auth.admin.createUser.mockResolvedValue({
      data: { user: { id: "new-user-2" } },
      error: null,
    });
    supabaseAdminMock.auth.admin.deleteUser.mockResolvedValue({ error: null });

    const upsertMock = vi.fn().mockResolvedValue({
      error: { message: "duplicate key" },
    });
    supabaseAdminMock.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return { upsert: upsertMock };
      }
      throw new Error(`Unexpected admin table: ${table}`);
    });

    const result = await adminCreateUser("broken@test.com", "StrongPass123", "Broken", "operator");

    expect(supabaseAdminMock.auth.admin.deleteUser).toHaveBeenCalledWith("new-user-2");
    expect(result).toEqual({
      success: false,
      error: "Error al registrar rol en perfil: duplicate key",
    });
  });

  it("adminCreateUser returns unauthenticated error when actor has no session", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ userId: null }));

    const result = await adminCreateUser("x@test.com", "StrongPass123", "X", "operator");

    expect(result).toEqual({ success: false, error: "No autenticado" });
    expect(supabaseAdminMock.auth.admin.createUser).not.toHaveBeenCalled();
  });

  it("adminUpdatePersonDates allows admin to set and clear nullable dates", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "admin" }));

    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const updateMock = vi.fn(() => ({ eq: eqMock }));
    supabaseAdminMock.from.mockImplementation((table: string) => {
      if (table === "people") return { update: updateMock };
      throw new Error(`Unexpected admin table: ${table}`);
    });

    const result = await adminUpdatePersonDates("person-1", {
      first_visit_date: "2025-03-10",
      baptized_at: null,
    });

    expect(updateMock).toHaveBeenCalledWith({
      first_visit_date: "2025-03-10",
      baptized_at: null,
    });
    expect(eqMock).toHaveBeenCalledWith("id", "person-1");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin");
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(result).toEqual({ success: true });
  });

  it("adminUpdatePersonDates rejects invalid dates and non-admin users", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "superadmin" }));

    const invalidDateResult = await adminUpdatePersonDates("person-1", {
      first_visit_date: "2025-02-30",
      baptized_at: null,
    });

    expect(invalidDateResult).toEqual({
      success: false,
      error: "Las fechas deben tener un formato válido",
    });
    expect(supabaseAdminMock.from).not.toHaveBeenCalled();

    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "operator" }));

    const result = await adminUpdatePersonDates("person-1", {
      first_visit_date: null,
      baptized_at: null,
    });

    expect(result).toEqual({
      success: false,
      error: "Acceso denegado: No eres admin ni superadmin",
    });
    expect(supabaseAdminMock.from).not.toHaveBeenCalled();
  });

  it("adminUpdateUser denies admin editing non-operator targets", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "admin" }));

    const selectTargetMock = vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn().mockResolvedValue({ data: { role: "admin" } }),
      })),
    }));

    supabaseAdminMock.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return { select: selectTargetMock };
      }
      throw new Error(`Unexpected admin table: ${table}`);
    });

    const result = await adminUpdateUser("target-1", { fullName: "Cambio" });

    expect(result).toEqual({
      success: false,
      error: "Acceso denegado: solo puedes editar usuarios operator",
    });
    expect(supabaseAdminMock.auth.admin.updateUserById).not.toHaveBeenCalled();
  });

  it("adminUpdateUser updates auth payload and profile fields", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "superadmin" }));

    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const updateMock = vi.fn(() => ({ eq: eqMock }));

    supabaseAdminMock.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return { update: updateMock };
      }
      throw new Error(`Unexpected admin table: ${table}`);
    });

    supabaseAdminMock.auth.admin.updateUserById.mockResolvedValue({
      data: { user: { id: "target-2" } },
      error: null,
    });

    const result = await adminUpdateUser("target-2", {
      email: "updated@test.com",
      password: "NewStrongPass123",
      fullName: "Nombre Actualizado",
      role: "superadmin",
      ban: true,
    });

    expect(supabaseAdminMock.auth.admin.updateUserById).toHaveBeenCalledWith("target-2", {
      email: "updated@test.com",
      password: "NewStrongPass123",
      user_metadata: { full_name: "Nombre Actualizado", role: "operator" },
      ban_duration: "none",
    });
    expect(updateMock).toHaveBeenCalledWith({
      role: "operator",
      full_name: "Nombre Actualizado",
      email: "updated@test.com",
    });
    expect(eqMock).toHaveBeenCalledWith("id", "target-2");
    expect(result).toEqual({ success: true, user: { id: "target-2" } });
  });

  it("adminDeleteUser allows admin to delete operator users", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "admin" }));

    supabaseAdminMock.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: { role: "operator" } }),
            })),
          })),
        };
      }
      throw new Error(`Unexpected admin table: ${table}`);
    });

    supabaseAdminMock.auth.admin.deleteUser.mockResolvedValue({ error: null });

    const result = await adminDeleteUser("target-3");

    expect(supabaseAdminMock.auth.admin.deleteUser).toHaveBeenCalledWith("target-3");
    expect(result).toEqual({ success: true });
  });

  it("adminDeleteUser denies admin deleting non-operator users", async () => {
    createClientMock.mockResolvedValue(mockActorClient({ actorRole: "admin" }));

    supabaseAdminMock.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: { role: "superadmin" } }),
            })),
          })),
        };
      }
      throw new Error(`Unexpected admin table: ${table}`);
    });

    const result = await adminDeleteUser("target-4");

    expect(result).toEqual({
      success: false,
      error: "Acceso denegado: solo puedes eliminar usuarios operator",
    });
    expect(supabaseAdminMock.auth.admin.deleteUser).not.toHaveBeenCalled();
  });
});
