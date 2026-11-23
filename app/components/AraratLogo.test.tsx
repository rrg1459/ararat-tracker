import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AraratLogo from "./AraratLogo";

vi.mock("../../public/ararat.png", () => ({
  default: {
    src: "/ararat.png",
    width: 200,
    height: 200,
    blurDataURL: "data:image/png;base64,test",
  },
}));

describe("AraratLogo", () => {
  it("links the logo to the home page", () => {
    render(<AraratLogo />);

    const link = screen.getByRole("link", { name: "Logo Iglesia Ararat" });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toContainElement(screen.getByRole("img", { name: "Logo Iglesia Ararat" }));
  });
});
