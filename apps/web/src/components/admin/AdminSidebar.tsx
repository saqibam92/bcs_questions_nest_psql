// // apps/web/src/components/admin/AdminSidebar.tsx

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import {
  Dashboard,
  Assignment,
  Category,
  HelpOutline,
  Logout,
  AdminPanelSettings,
  CloudUpload,
  VideoLibrary,
} from "@mui/icons-material";

interface AdminSidebarProps {
  width: number;
}

export default function AdminSidebar({ width }: AdminSidebarProps) {
  const { logout, admin } = useAdminAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <Dashboard /> },
    { name: "Exams", href: "/admin/exams", icon: <Assignment /> },
    { name: "Subjects", href: "/admin/subjects", icon: <Category /> },
    { name: "Questions", href: "/admin/questions", icon: <HelpOutline /> },
    {
      name: "Bulk Upload",
      href: "/admin/upload-questions",
      icon: <CloudUpload />,
    },
    { name: "Videos", href: "/admin/videos", icon: <VideoLibrary /> },
  ];

  if (admin?.role === "SUPER_ADMIN") {
    navItems.push({
      name: "Manage Admins",
      href: "/admin/users",
      icon: <AdminPanelSettings />,
    });
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: width,
        height: "100vh",
        position: "fixed", // Keeps sidebar visible while scrolling main content
        top: 0,
        left: 0,
        bgcolor: "#111827", // Dark Gray/Black theme
        color: "#e5e7eb",
        borderRadius: 0,
        borderRight: "1px solid #374151",
        display: "flex",
        flexDirection: "column",
        zIndex: 1200, // Higher than main content, but check for dialogs
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="white"
          letterSpacing={1}
        >
          BCS Admin
        </Typography>
        <Typography
          variant="caption"
          color="gray"
          sx={{ display: "block", mt: 0.5 }}
        >
          {admin?.role || "Staff"}
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "#374151", mb: 2 }} />

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <Link
                  href={item.href}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      mx: 1,
                      borderRadius: 1,
                      "&.Mui-selected": {
                        bgcolor: "#2563eb", // Blue-600
                        color: "white",
                        "&:hover": { bgcolor: "#1d4ed8" },
                        "& .MuiListItemIcon-root": { color: "white" },
                      },
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "white" : "#9ca3af",
                        minWidth: 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ bgcolor: "#374151" }} />

      {/* Footer / Logout */}
      <Box sx={{ p: 2 }}>
        <Button
          onClick={logout}
          fullWidth
          variant="contained"
          color="error"
          startIcon={<Logout />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}


// "use client";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAdminAuth } from "@/contexts/AdminAuthContext";
// import { Admin } from "@/types"; // Import your local Admin type

// export default function AdminSidebar() {
//   const { logout, admin } = useAdminAuth();
//   const pathname = usePathname();

//   const navItems = [
//     { name: "Dashboard", href: "/admin" },
//     { name: "Exams", href: "/admin/exams" },
//     { name: "Subjects", href: "/admin/subjects" },
//     { name: "Questions", href: "/admin/questions" },
//     // Conditionally add link based on role
//     // We compare against the string value from your Admin type
//     ...(admin?.role === "SUPER_ADMIN"
//       ? [{ name: "Manage Admins", href: "/admin/manage-admins" }]
//       : []),
//   ];

//   return (
//     <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-900 text-gray-200">
//       <h2 className="text-3xl font-semibold text-center text-white">
//         BCS Admin
//       </h2>
//       <div className="flex flex-col justify-between flex-1 mt-6">
//         <nav>
//           <ul>
//             {navItems.map((item) => (
//               <li key={item.name} className="mb-2">
//                 <Link
//                   href={item.href}
//                   className={`flex items-center px-4 py-2 rounded transition-colors
//                     ${
//                       pathname === item.href
//                         ? "bg-blue-600 text-white"
//                         : "hover:bg-gray-700 hover:text-white"
//                     }
//                   `}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <button
//           onClick={logout}
//           className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-600 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }