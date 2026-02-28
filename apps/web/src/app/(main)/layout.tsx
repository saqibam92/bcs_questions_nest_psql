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

  // If we're in admin routes, render children without layout
  // (This shouldn't normally happen due to folder structure, but it's a safety check)
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Header - Sticky at top */}
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          bgcolor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
      </AppBar>

      {/* Sidebar Navigation (Drawer) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fafb",
          minHeight: "calc(100vh - 64px)", // Subtract header height
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
