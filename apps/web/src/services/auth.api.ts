// src/services/auth.api.ts

import api from "@/lib/api";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  return api.post("/auth/login", data);
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};

export const getProfile = async () => {
  return api.get("/auth/profile");
};

export const logout = async () => {
  return api.post("/auth/logout");
};