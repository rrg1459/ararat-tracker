import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: ({ variable }: { variable: string }) => ({ variable }),
  Geist_Mono: ({ variable }: { variable: string }) => ({ variable }),
}));

import RootLayout, { metadata } from "./layout";

describe("RootLayout", () => {
  it("exports the expected metadata", () => {
    expect(metadata).toMatchObject({
      title: "Asistencia de Ararat",
      description: "Aplicacion para el control de asistencia de la iglesia Ararat",
      manifest: "/manifest.json",
    });
  });

  it("renders html and body wrappers with children", () => {
    const child = <main id="content">Contenido</main>;
    const tree = RootLayout({ children: child });

    expect(tree.type).toBe("html");
    expect(tree.props.lang).toBe("en");
    expect(tree.props.className).toContain("--font-geist-sans");
    expect(tree.props.className).toContain("--font-geist-mono");

    const body = tree.props.children;
    expect(body.type).toBe("body");
    expect(body.props.className).toBe("min-h-full flex flex-col");
    expect(body.props.children).toBe(child);
  });
});
