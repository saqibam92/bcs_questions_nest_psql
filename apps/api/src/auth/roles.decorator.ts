// apps/api/src/auth/roles.decorator.ts

// apps/api/src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { AdminRole } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);