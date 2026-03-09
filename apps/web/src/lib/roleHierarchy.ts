// utils/roleHierarchy.ts
import { Role } from "@/types";

export const ROLE_HIERARCHY: Record<Role, number> = {
  SUPER_ADMIN: 5,
  ADMIN: 4,
  MODERATOR: 3,
  EDITOR: 2,
  VIEWER: 1,
  USER: 0,
};

export const canManageRole = (
  currentRole: Role,
  targetRole: Role
): boolean => {
  return ROLE_HIERARCHY[currentRole] > ROLE_HIERARCHY[targetRole];
};