// // File: apps/web/src/app/admin/layout.tsx


"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Box, CircularProgress, CssBaseline } from "@mui/material";

const SIDEBAR_WIDTH = 280; // Unified width constant

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

  // 1. Loading State
  if (!isMounted || loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#f4f6f8"
      >
        <CircularProgress />
        <Box ml={2} color="text.secondary" fontWeight="medium">
          Loading Admin Panel...
        </Box>
      </Box>
    );
  }

  // 2. Login Page (No Sidebar)
  if (pathname === "/admin-login") {
    return <>{children}</>;
  }

  // 3. Admin Layout
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <CssBaseline />

      {/* Sidebar Container - Fixed Width, Non-Collapsing */}
      <Box
        component="nav"
        sx={{
          width: { sm: SIDEBAR_WIDTH },
          flexShrink: 0,
        }}
      >
        <AdminSidebar width={SIDEBAR_WIDTH} />
      </Box>

      {/* Main Content Area - Scrollable, Padded */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Cookies from "js-cookie";
// import { useAdminAuth } from "@/contexts/AdminAuthContext";
// import AdminSidebar from "@/components/admin/AdminSidebar";
// import { Box, CircularProgress } from "@mui/material";

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

//   // Loading / Hydration Guard
//   if (!isMounted || loading) {
//     return (
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//         bgcolor="#f5f5f5"
//       >
//         <CircularProgress />
//         <span className="ml-3 text-gray-600 font-medium">
//           Loading Admin Panel...
//         </span>
//       </Box>
//     );
//   }

//   // Don't show layout on login page
//   if (pathname === "/admin-login") {
//     return <>{children}</>;
//   }

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f3f4f6" }}>

//       <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: 0 }}>
//         <AdminSidebar />
//       </Box>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - 240px)` },
//           minHeight: "100vh",
//           zIndex: 1,
//           position: "relative", 
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }


// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useRouter, usePathname } from "next/navigation";
// // import Cookies from "js-cookie";
// // import { useAdminAuth } from "@/contexts/AdminAuthContext";
// // import AdminSidebar from "@/components/admin/AdminSidebar";

// // export default function AdminLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const { loading, admin } = useAdminAuth();
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const [isMounted, setIsMounted] = useState(false);

// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);

// //   // Auth check effect
// //   useEffect(() => {
// //     if (isMounted && !loading) {
// //       const token = Cookies.get("admin_token");
// //       if (!token && pathname !== "/admin-login") {
// //         router.push("/admin-login");
// //       }
// //     }
// //   }, [isMounted, loading, pathname, router]);

// //   // Prevent hydration mismatch: Ensure server and initial client render match
// //   if (!isMounted) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         Loading Admin Panel...
// //       </div>
// //     );
// //   }

// //   // Loading state from Auth Context
// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         Loading Admin Panel...
// //       </div>
// //     );
// //   }

// //   // Don't show layout on login page
// //   if (pathname === "/admin-login") {
// //     return <>{children}</>;
// //   }

// //   return (
// //     <div className="flex min-h-screen">
// //       <AdminSidebar />
// //       <main className="flex-1 p-8 bg-gray-100">{children}</main>
// //     </div>
// //   );
// // }
