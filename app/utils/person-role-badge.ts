export type RoleBadgeType = "leader" | "member" | "visitor";

export interface RoleBadge {
  label: string;
  classes: string;
}

interface RoleBadgeConfig {
  labels?: Partial<Record<RoleBadgeType, string>>;
  classes?: Partial<Record<RoleBadgeType, string>>;
}

const DEFAULT_ROLE_LABELS: Record<RoleBadgeType, string> = {
  leader: "Líder",
  member: "Miembro",
  visitor: "Visitante",
};

const DEFAULT_ROLE_CLASSES: Record<RoleBadgeType, string> = {
  leader:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 ring-1 ring-indigo-500/50 font-bold",
  member: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  visitor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
};

export const ROLE_BADGE_VARIANTS = {
  default: {
    labels: DEFAULT_ROLE_LABELS,
    classes: DEFAULT_ROLE_CLASSES,
  },
  personManagement: {
    labels: {
      ...DEFAULT_ROLE_LABELS,
      member: "Miembro",
    },
    classes: DEFAULT_ROLE_CLASSES,
  },
} as const;

type RoleBadgeVariant = keyof typeof ROLE_BADGE_VARIANTS;

export function getRoleBadge(
  personType: string,
  variant: RoleBadgeVariant = "default",
  overrides?: RoleBadgeConfig
): RoleBadge {
  const normalizedType: RoleBadgeType =
    personType === "leader" || personType === "member" || personType === "visitor"
      ? personType
      : "visitor";

  const baseVariant = ROLE_BADGE_VARIANTS[variant];

  return {
    label: overrides?.labels?.[normalizedType] ?? baseVariant.labels[normalizedType],
    classes: overrides?.classes?.[normalizedType] ?? baseVariant.classes[normalizedType],
  };
}
