// apps/web/src/app/(main)/layout.tsx
"use client";

import React, { useState } from "react";
import { AppBar, Box, CssBaseline } from "@mui/material";
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

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{
          bgcolor: "white",
        }}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fafb",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
// // apps/web/src/app/(main)/layout.tsx
// "use client";

// import { useState } from "react";
// import { AppBar, Box } from "@mui/material";
// import { Header } from "@/components/layout/Header";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { usePathname } from "next/navigation";

// export default function MainAppLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // 🔒 HARD STOP: do NOT render public layout on admin routes
//   if (pathname.startsWith("/admin")) {
//     return <>{children}</>;
//   }

//   return (
//     <>
//       <AppBar position="static" color="transparent" elevation={1}>
//         <Header onMenuClick={() => setSidebarOpen(true)} />
//       </AppBar>

//       <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <Box component="main">{children}</Box>
//     </>
//   );
// }
