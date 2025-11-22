// src/contexts/AuthContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import type { User } from "@/types";

// 1. Define State and Action Types
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User } }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: { user: User } };

interface AuthContextType extends AuthState {
  login: (loginId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string, email: string, phone?: string, password: string }) => Promise<{ success: boolean; error?: string }>;
  updateUser: (data: { name?: string; email?: string; phone?: string; password?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// 2. Create Context and Reducer
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// 3. Create Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      dispatch({ type: "LOGOUT" });
      return;
    }

    const loadUser = async () => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await api.get("/api/auth/me");
        dispatch({ type: "AUTH_SUCCESS", payload: { user: res.data.user } });
      } catch (err) {
        console.error("Load user error:", err);
        Cookies.remove("token");
        dispatch({ type: "AUTH_ERROR", payload: "Session expired." });
      }
    };

    loadUser();
  }, []);

  const login = async (loginId: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.post("/api/auth/login", { loginId, password });
      Cookies.set("token", res.data.access_token, { expires: 7, secure: true });
      dispatch({ type: "AUTH_SUCCESS", payload: { user: res.data.user } });
      return { success: true };
    } catch (err) {
      const message = (err as Error).message || "Login failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      return { success: false, error: message };
    }
  };

  const register = async (data: { name: string, email: string, phone?: string, password: string }) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.post("/api/auth/register", data);
      Cookies.set("token", res.data.access_token, { expires: 7, secure: true });
      dispatch({ type: "AUTH_SUCCESS", payload: { user: res.data.user } });
      return { success: true };
    } catch (err) {
      const message = (err as Error).message || "Registration failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      return { success: false, error: message };
    }
  };

  const updateUser = async (data: { name?: string; email?: string; phone?: string; password?: string }) => {
    try {
      const res = await api.put("/api/auth/update", data);
      dispatch({ type: "UPDATE_USER", payload: { user: res.data.user } });
      return { success: true };
    } catch (err) {
      const message = (err as Error).message || "Failed to update profile";
      return { success: false, error: message };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create useAuth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};