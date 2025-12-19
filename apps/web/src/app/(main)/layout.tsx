// apps/web/src/app/(main)/layout.ts
"use client";

import { useState } from "react";
import { AppBar, Box } from "@mui/material";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔒 HARD STOP: do NOT render public layout on admin routes
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <AppBar position="static" color="transparent" elevation={1}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
      </AppBar>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box component="main">{children}</Box>
    </>
  );
}
