"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, admin } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auth check effect
  useEffect(() => {
    if (isMounted && !loading) {
      const token = Cookies.get("admin_token");
      if (!token && pathname !== "/admin-login") {
        router.push("/admin-login");
      }
    }
  }, [isMounted, loading, pathname, router]);

  // Prevent hydration mismatch: Ensure server and initial client render match
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading Admin Panel...
      </div>
    );
  }

  // Loading state from Auth Context
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading Admin Panel...
      </div>
    );
  }

  // Don't show layout on login page
  if (pathname === "/admin-login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
