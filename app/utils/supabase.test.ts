import { beforeEach, describe, expect, it, vi } from "vitest";

const { createServerClientMock, createBrowserClientMock, cookiesMock } = vi.hoisted(() => ({
  createServerClientMock: vi.fn(),
  createBrowserClientMock: vi.fn(),
  cookiesMock: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: createServerClientMock,
  createBrowserClient: createBrowserClientMock,
}));

vi.mock("next/headers", () => ({
  cookies: cookiesMock,
}));

import { createClient, createClientClient } from "./supabase";

describe("supabase utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
  });

  it("createClient wires server client with cookie handlers", async () => {
    const cookieStore = {
      getAll: vi.fn().mockReturnValue([{ name: "sb", value: "token" }]),
      set: vi.fn(),
    };

    cookiesMock.mockResolvedValue(cookieStore);
    const fakeServerClient = { auth: {}, from: vi.fn() };
    createServerClientMock.mockReturnValue(fakeServerClient);

    const result = await createClient();

    expect(createServerClientMock).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "anon-key",
      expect.objectContaining({
        cookies: expect.objectContaining({
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        }),
      }),
    );

    const optionsArg = createServerClientMock.mock.calls[0][2] as {
      cookies: {
        getAll: () => Array<{ name: string; value: string }>;
        setAll: (cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) => void;
      };
    };

    expect(optionsArg.cookies.getAll()).toEqual([{ name: "sb", value: "token" }]);

    optionsArg.cookies.setAll([
      { name: "a", value: "1", options: { path: "/" } },
      { name: "b", value: "2" },
    ]);

    expect(cookieStore.set).toHaveBeenCalledWith("a", "1", { path: "/" });
    expect(cookieStore.set).toHaveBeenCalledWith("b", "2", undefined);

    expect(result).toBe(fakeServerClient);
  });

  it("createClient setAll swallows cookieStore.set errors", async () => {
    const cookieStore = {
      getAll: vi.fn().mockReturnValue([]),
      set: vi.fn(() => {
        throw new Error("cannot set cookie in this context");
      }),
    };

    cookiesMock.mockResolvedValue(cookieStore);
    createServerClientMock.mockReturnValue({});

    await createClient();

    const optionsArg = createServerClientMock.mock.calls[0][2] as {
      cookies: {
        setAll: (cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) => void;
      };
    };

    expect(() => {
      optionsArg.cookies.setAll([{ name: "sb", value: "x" }]);
    }).not.toThrow();
  });

  it("createClientClient builds browser client with public env vars", () => {
    const fakeBrowserClient = { auth: {}, from: vi.fn() };
    createBrowserClientMock.mockReturnValue(fakeBrowserClient);

    const result = createClientClient();

    expect(createBrowserClientMock).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "anon-key",
    );
    expect(result).toBe(fakeBrowserClient);
  });
});
