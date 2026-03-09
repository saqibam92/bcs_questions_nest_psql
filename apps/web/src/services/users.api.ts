// src/services/users.api.ts

import api from "@/lib/api";

export const getAdminUsers = async () => {
  return api.get("/users");
};

export const getAdminUser = async (id: string) => {
  return api.get(`/users/${id}`);
};

export const createAdminUser = async (data: any) => {
  return api.post("/users", data);
};

export const updateAdminUser = async (
  id: string,
  data: any
) => {
  return api.patch(`/users/${id}`, data);
};

export const deleteAdminUser = async (id: string) => {
  return api.delete(`/users/${id}`);
};