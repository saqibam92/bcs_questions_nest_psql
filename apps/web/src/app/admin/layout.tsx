// apps/web/src/app/admin/layout.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Box, CircularProgress, CssBaseline } from "@mui/material";

const SIDEBAR_WIDTH = 280;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, hydrated, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!hydrated || loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAdmin && pathname !== "/admin-login") {
    router.replace("/admin-login");
    return null;
  }

  if (pathname === "/admin-login") {
    return (
      <>
        <CssBaseline />
        {children}
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
        }}
      >
        <AdminSidebar width={SIDEBAR_WIDTH} />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}