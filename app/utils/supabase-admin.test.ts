import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { createClientMock } = vi.hoisted(() => ({
  createClientMock: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: createClientMock,
}));

import { createAdminClient } from "./supabase-admin";

describe("createAdminClient", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("throws when required env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    expect(() => createAdminClient()).toThrow(
      "Faltan las variables de entorno de Supabase en el servidor.",
    );
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("creates admin client with service-role headers and safe server auth config", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-secret";

    const fakeClient = { auth: {}, from: vi.fn() };
    createClientMock.mockReturnValue(fakeClient);

    const result = createAdminClient();

    expect(createClientMock).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "service-role-secret",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
        global: {
          headers: {
            apikey: "service-role-secret",
            Authorization: "Bearer service-role-secret",
          },
        },
      },
    );
    expect(result).toBe(fakeClient);
  });
});
