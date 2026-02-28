// apps/web/src/app/admin/layout.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
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
  const [isMounted, setIsMounted] = useState(false);
  const hasCheckedRef = useRef(false);

  // Mount effect - runs once
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auth check effect - separated from render logic
  // useEffect(() => {
  //   // Only run once we're mounted and auth is ready
  //   if (!isMounted || !hydrated) return;

  //   // Skip check for login page
  //   if (pathname === "/admin-login") {
  //     hasCheckedRef.current = true;
  //     return;
  //   }

  //   // Only check once per navigation
  //   if (hasCheckedRef.current) return;

  //   // If auth is loaded and user is not admin, redirect
  //   if (!loading && !isAdmin) {
  //     hasCheckedRef.current = true;
  //     router.replace("/admin-login");
  //   }

  //   // Mark as checked if user is admin
  //   if (!loading && isAdmin) {
  //     hasCheckedRef.current = true;
  //   }
  // }, [isMounted, hydrated, loading, isAdmin, pathname, router]);

  // Auth check effect
  useEffect(() => {
    if (isMounted && !loading) {
      // Logic is simple: If done loading and no token, go to login.
      // It doesn't rely on complex refs or isAdmin flags that might flicker.
      const token = Cookies.get("access_token");
      if (!token && pathname !== "/admin-login") {
        router.push("/admin-login");
      }
    }
  }, [isMounted, loading, pathname, router]);

  // Reset check flag when pathname changes
  useEffect(() => {
    hasCheckedRef.current = false;
  }, [pathname]);

  // Loading state - show while auth is initializing
  if (!isMounted || !hydrated || loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#f4f6f8"
      >
        <CircularProgress size={40} />
        <Box
          ml={2}
          color="text.secondary"
          fontWeight="medium"
          fontSize="0.95rem"
        >
          Loading Admin Panel...
        </Box>
      </Box>
    );
  }

  // Login page - no layout
  if (pathname === "/admin-login") {
    return (
      <>
        <CssBaseline />
        {children}
      </>
    );
  }

  // If not admin and not on login page, show loading
  // (redirect will happen in useEffect)
  if (!isAdmin) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#f4f6f8"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  // Admin layout
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
        }}
      >
        <AdminSidebar width={SIDEBAR_WIDTH} />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}// // File: apps/web/src/app/admin/layout.tsx

// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Cookies from "js-cookie";
// import { useAdminAuth } from "@/contexts/AdminAuthContext";
// import AdminSidebar from "@/components/admin/AdminSidebar";
// import { Box, CircularProgress, CssBaseline } from "@mui/material";

// const SIDEBAR_WIDTH = 280; // Unified width constant

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { loading, admin } = useAdminAuth();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Auth check effect
//   useEffect(() => {
//     if (isMounted && !loading) {
//       const token = Cookies.get("admin_token");
//       if (!token && pathname !== "/admin-login") {
//         router.push("/admin-login");
//       }
//     }
//   }, [isMounted, loading, pathname, router]);

//   // 1. Loading State
//   if (!isMounted || loading) {
//     return (
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//         bgcolor="#f4f6f8"
//       >
//         <CircularProgress />
//         <Box ml={2} color="text.secondary" fontWeight="medium">
//           Loading Admin Panel...
//         </Box>
//       </Box>
//     );
//   }

//   // 2. Login Page (No Sidebar)
//   if (pathname === "/admin-login") {
//     return <>{children}</>;
//   }

//   // 3. Admin Layout
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
//       <CssBaseline />

//       {/* Sidebar Container - Fixed Width, Non-Collapsing */}
//       <Box
//         component="nav"
//         sx={{
//           width: { sm: SIDEBAR_WIDTH },
//           flexShrink: 0,
//         }}
//       >
//         <AdminSidebar width={SIDEBAR_WIDTH} />
//       </Box>

//       {/* Main Content Area - Scrollable, Padded */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
//           minHeight: "100vh",
//           overflowX: "hidden",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }
