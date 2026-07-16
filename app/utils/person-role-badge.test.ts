import { describe, expect, it } from "vitest";

import { ROLE_BADGE_VARIANTS, getRoleBadge } from "./person-role-badge";

describe("getRoleBadge", () => {
  it("returns default badge for leader", () => {
    const result = getRoleBadge("leader");

    expect(result).toEqual({
      label: "Líder",
      classes: ROLE_BADGE_VARIANTS.default.classes.leader,
    });
  });

  it("returns default badge for member", () => {
    const result = getRoleBadge("member");

    expect(result).toEqual({
      label: "Miembro",
      classes: ROLE_BADGE_VARIANTS.default.classes.member,
    });
  });

  it("falls back to visitor for unknown role", () => {
    const result = getRoleBadge("staff");

    expect(result).toEqual({
      label: "Visitante",
      classes: ROLE_BADGE_VARIANTS.default.classes.visitor,
    });
  });

  it("uses selected variant when provided", () => {
    const result = getRoleBadge("visitor", "personManagement");

    expect(result).toEqual({
      label: ROLE_BADGE_VARIANTS.personManagement.labels.visitor,
      classes: ROLE_BADGE_VARIANTS.personManagement.classes.visitor,
    });
  });

  it("applies partial overrides over base variant", () => {
    const result = getRoleBadge("member", "default", {
      labels: { member: "Discípulo" },
      classes: { member: "custom-member-class" },
    });

    expect(result).toEqual({
      label: "Discípulo",
      classes: "custom-member-class",
    });
  });
});
