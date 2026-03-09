// apps/web/src/types/admin.ts

import { Role, UserType } from "./index";

export interface AdminUser {
  id: string;
  name: string;
  email: string;

  role: Role;
  userType: UserType;

  isActive: boolean;

  createdAt: string;
}

export interface CreateAdminDto {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateAdminDto {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
}

export interface UpdateUserTypeDto {
  userType: UserType;
}