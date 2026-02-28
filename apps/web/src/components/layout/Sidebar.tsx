// apps/web/src/components/layout/Sidebar.tsx
"use client";

import React from "react";
import {
  Drawer,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  Skeleton,
} from "@mui/material";
import {
  Home,
  AccountCircle,
  ShoppingCart,
  EventNote,
  Gavel,
  ContactSupport,
  Info,
  People,
  Policy,
  Logout,
  Dashboard,
  Login as LoginIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { user, isAuthenticated, isAdmin, logout, hydrated, loading } =
    useAuth();
  const router = useRouter();

  /* ---------------- Navigation Groups ---------------- */

  const primaryMenu = [
    { text: "হোমপেজ", icon: <Home />, path: "/" },
    ...(isAuthenticated
      ? [
          {
            text: "আপনার প্রোফাইল",
            icon: <AccountCircle />,
            path: "/profile",
          },
        ]
      : []),
    { text: "প্যাকেজ কিনুন", icon: <ShoppingCart />, path: "/packages" },
  ];

  const secondaryMenu = [
    { text: "সেন্ট্রাল রুটিন", icon: <EventNote />, path: "/routine" },
    { text: "ব্যাবহারের নিয়ম", icon: <Gavel />, path: "/rules" },
    { text: "যোগাযোগ", icon: <ContactSupport />, path: "/contact" },
  ];

  const tertiaryMenu = [
    { text: "আমাদের সম্পর্কে", icon: <Info />, path: "/about" },
    { text: "পরামর্শকগণ", icon: <People />, path: "/consultants" },
    { text: "নীতিসমূহ", icon: <Policy />, path: "/privacy" },
  ];

  const renderList = (items: typeof primaryMenu) => (
    <List>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={Link}
            href={item.path}
            onClick={onClose}
            sx={{
              borderRadius: 1,
              mx: 1,
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/");
  };

  /* ---------------- UI ---------------- */

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 280,
          height: "100%",
          bgcolor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ---------- Header ---------- */}
        <Box
          sx={{
            p: 3,
            bgcolor: "primary.main",
            color: "white",
            textAlign: "center",
          }}
        >
          {!hydrated || loading ? (
            <Box>
              <Skeleton
                variant="circular"
                width={64}
                height={64}
                sx={{ mx: "auto", bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                sx={{ mx: "auto", mt: 1, bgcolor: "rgba(255,255,255,0.2)" }}
              />
            </Box>
          ) : isAuthenticated && user ? (
            <>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {user.name?.[0]?.toUpperCase() || "U"}
              </Avatar>

              <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                {user.name}
              </Typography>

              <Chip
                size="small"
                label={user.userType}
                sx={{
                  mt: 1,
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </>
          ) : (
            <Button
              component={Link}
              href="/login"
              variant="contained"
              startIcon={<LoginIcon />}
              onClick={onClose}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              Login / Register
            </Button>
          )}
        </Box>

        {/* ---------- Menu ---------- */}
        <Box
          sx={{ flexGrow: 1, overflowY: "auto", pb: isAuthenticated ? 10 : 2 }}
        >
          {renderList(primaryMenu)}
          <Divider sx={{ my: 1 }} />
          {renderList(secondaryMenu)}
          <Divider sx={{ my: 1 }} />
          {renderList(tertiaryMenu)}

          {/* ---------- Admin Section ---------- */}
          {isAdmin && (
            <>
              <Divider sx={{ my: 1 }} />
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/admin"
                    onClick={onClose}
                    sx={{
                      mx: 1,
                      borderRadius: 1,
                      bgcolor: "primary.light",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Dashboard color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Admin Dashboard"
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        color: "primary",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )}
        </Box>

        {/* ---------- Footer ---------- */}
        {isAuthenticated && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              p: 2,
              borderTop: "1px solid #ddd",
              bgcolor: "white",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

// // apps/web/src/components/layout/Sidebar.tsx
// "use client";

// import React from "react";
// import {
//   Drawer,
//   Box,
//   Avatar,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Button,
//   Chip,
// } from "@mui/material";
// import {
//   Home,
//   AccountCircle,
//   ShoppingCart,
//   EventNote,
//   Gavel,
//   ContactSupport,
//   Info,
//   People,
//   Policy,
//   Logout,
//   Dashboard,
// } from "@mui/icons-material";
// import Link from "next/link";
// import { useAuth } from "@/contexts/AuthContext";

// interface SidebarProps {
//   open: boolean;
//   onClose: () => void;
// }

// export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
//   const { user, isAuthenticated, isAdmin, logout, hydrated, loading } =
//     useAuth();

//   // Prevent flicker / SSR mismatch
//   if (!hydrated || loading) {
//     return null;
//   }

//   /* ---------------- Navigation Groups ---------------- */

//   const primaryMenu = [
//     { text: "হোমপেজ", icon: <Home />, path: "/" },
//     ...(isAuthenticated
//       ? [{ text: "আপনার প্রোফাইল", icon: <AccountCircle />, path: "/profile" }]
//       : []),
//     { text: "প্যাকেজ কিনুন", icon: <ShoppingCart />, path: "/packages" },
//   ];

//   const secondaryMenu = [
//     { text: "সেন্ট্রাল রুটিন", icon: <EventNote />, path: "/routine" },
//     { text: "ব্যাবহারের নিয়ম", icon: <Gavel />, path: "/rules" },
//     { text: "যোগাযোগ", icon: <ContactSupport />, path: "/contact" },
//   ];

//   const tertiaryMenu = [
//     { text: "আমাদের সম্পর্কে", icon: <Info />, path: "/about" },
//     { text: "পরামর্শকগণ", icon: <People />, path: "/consultants" },
//     { text: "নীতিসমূহ", icon: <Policy />, path: "/privacy" },
//   ];

//   const renderList = (items: typeof primaryMenu) => (
//     <List>
//       {items.map((item) => (
//         <ListItem key={item.text} disablePadding>
//           <ListItemButton component={Link} href={item.path} onClick={onClose}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   );

//   /* ---------------- UI ---------------- */

//   return (
//     <Drawer anchor="left" open={open} onClose={onClose}>
//       <Box sx={{ width: 280, height: "100%", bgcolor: "#f8f9fa" }}>
//         {/* ---------- Header ---------- */}
//         <Box
//           sx={{
//             p: 3,
//             bgcolor: "primary.main",
//             color: "white",
//             textAlign: "center",
//           }}
//         >
//           {isAuthenticated && user ? (
//             <>
//               <Avatar
//                 sx={{
//                   width: 64,
//                   height: 64,
//                   mx: "auto",
//                   bgcolor: "white",
//                   color: "primary.main",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {user.name?.[0]?.toUpperCase()}
//               </Avatar>

//               <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
//                 {user.name}
//               </Typography>

//               <Chip
//                 size="small"
//                 label={user.userType}
//                 sx={{
//                   mt: 1,
//                   bgcolor: "rgba(255,255,255,0.2)",
//                   color: "white",
//                   fontWeight: 600,
//                 }}
//               />
//             </>
//           ) : (
//             <Button
//               component={Link}
//               href="/login"
//               variant="contained"
//               sx={{
//                 bgcolor: "white",
//                 color: "primary.main",
//                 fontWeight: "bold",
//                 "&:hover": { bgcolor: "#f0f0f0" },
//               }}
//             >
//               Login / Register
//             </Button>
//           )}
//         </Box>

//         {/* ---------- Menu ---------- */}
//         <Box sx={{ overflowY: "auto", pb: 10 }}>
//           {renderList(primaryMenu)}
//           <Divider />
//           {renderList(secondaryMenu)}
//           <Divider />
//           {renderList(tertiaryMenu)}

//           {/* ---------- Admin Section ---------- */}
//           {isAdmin && (
//             <>
//               <Divider sx={{ my: 1 }} />
//               <List>
//                 <ListItem disablePadding>
//                   <ListItemButton
//                     component={Link}
//                     href="/admin"
//                     onClick={onClose}
//                   >
//                     <ListItemIcon>
//                       <Dashboard color="primary" />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary="Admin Dashboard"
//                       primaryTypographyProps={{
//                         fontWeight: "bold",
//                         color: "primary",
//                       }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </List>
//             </>
//           )}
//         </Box>

//         {/* ---------- Footer ---------- */}
//         {isAuthenticated && (
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 0,
//               width: "100%",
//               p: 2,
//               borderTop: "1px solid #ddd",
//               bgcolor: "white",
//             }}
//           >
//             <Button
//               variant="outlined"
//               color="error"
//               fullWidth
//               startIcon={<Logout />}
//               onClick={() => {
//                 logout();
//                 onClose();
//               }}
//             >
//               Log Out
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </Drawer>
//   );
// };
