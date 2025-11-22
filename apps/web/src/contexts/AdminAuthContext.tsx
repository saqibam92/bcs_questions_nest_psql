// apps/web/src/contexts/AdminAuthContext.tsx

"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api  from "@/lib/api";
import { Admin } from "@/types"; // Import Admin type

// Define the shape of the context data
interface AdminAuthContextType {
  admin: Admin | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  loading: boolean;
}

// Create the context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

// Define the props for the provider
interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token on initial load
    const token = Cookies.get("admin_token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // You could fetch admin profile here to populate `admin` state
      // For now, we just set the header
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/admin/login", { email, password });

      const { access_token, admin } = data; // Destructure response

      Cookies.set("admin_token", access_token, { expires: 1 }); // 1 day expiry
      api.defaults.headers.Authorization = `Bearer ${access_token}`;
      setAdmin(admin);
      return { success: true, admin };
    } catch (error: any) {
      console.error("Admin login failed", error);
      const message = error.response?.data?.message || "Login failed";
      return { success: false, error: message };
    }
  };

  const logout = () => {
    Cookies.remove("admin_token");
    delete api.defaults.headers.Authorization;
    setAdmin(null);
    router.push("/admin-login");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};