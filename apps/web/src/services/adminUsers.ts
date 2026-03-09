// apps/web/src/services/adminUsers.ts

import api from "@/lib/api";
import {
  AdminUser,
  CreateAdminDto,
  UpdateAdminDto,
  UpdateUserTypeDto,
} from "@/types/admin";

export const getAdmins = async () => {
  return api.get<AdminUser[]>("/admin/users");
};

export const createAdmin = async (data: CreateAdminDto) => {
  return api.post("/admin/users", data);
};

export const updateAdmin = async (
  id: string,
  data: UpdateAdminDto
) => {
  return api.patch(`/admin/users/${id}`, data);
};

export const deleteAdmin = async (id: string) => {
  return api.delete(`/admin/users/${id}`);
};

export const updateUserType = async (
  id: string,
  data: UpdateUserTypeDto
) => {
  return api.patch(`/admin/users/${id}/type`, data);
};