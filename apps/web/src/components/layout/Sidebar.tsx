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
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const primaryMenu = [
    { text: "হোমপেজ", icon: <Home fontSize="small" />, path: "/" },
    ...(isAuthenticated
      ? [
          {
            text: "আপনার প্রোফাইল",
            icon: <AccountCircle fontSize="small" />,
            path: "/profile",
          },
        ]
      : []),
    {
      text: "প্যাকেজ কিনুন",
      icon: <ShoppingCart fontSize="small" />,
      path: "/packages",
    },
  ];

  const secondaryMenu = [
    {
      text: "সেন্ট্রাল রুটিন",
      icon: <EventNote fontSize="small" />,
      path: "/routine",
    },
    {
      text: "ব্যবহারের নিয়ম",
      icon: <Gavel fontSize="small" />,
      path: "/rules",
    },
    {
      text: "যোগাযোগ",
      icon: <ContactSupport fontSize="small" />,
      path: "/contact",
    },
  ];

  const tertiaryMenu = [
    {
      text: "আমাদের সম্পর্কে",
      icon: <Info fontSize="small" />,
      path: "/about",
    },
    {
      text: "আমাদের পরামর্শকগণ",
      icon: <People fontSize="small" />,
      path: "/consultants",
    },
    { text: "নীতিসমূহ", icon: <Policy fontSize="small" />, path: "/privacy" },
  ];

  const renderList = (items: typeof primaryMenu) => (
    <List sx={{ py: 0 }}>
      {items.map((item) => {
        const active = pathname === item.path;

        return (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              onClick={onClose}
              sx={{
                px: 2,
                py: 1,
                bgcolor: active ? "#f0f0f0" : "transparent",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: "#333" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/");
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose} // click outside closes automatically
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: 260,
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Profile Area */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            background: "linear-gradient(180deg,#f5f1e8 0%, #f0ede5 100%)",
          }}
        >
          <Avatar sx={{ bgcolor: "#6c7ae0" }}>{user?.name?.[0] || "D"}</Avatar>

          <Box>
            <Typography fontSize={13} color="text.secondary">
              আপনার আইডি:
            </Typography>

            <Typography fontWeight={600} fontSize={14}>
              {user?.name || "Wym1"}
            </Typography>

            <Typography fontSize={12} color="text.secondary">
              Deshi AI
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Menus */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {renderList(primaryMenu)}

          <Divider sx={{ my: 1 }} />

          {renderList(secondaryMenu)}

          <Divider sx={{ my: 1 }} />

          {renderList(tertiaryMenu)}

          {/* Admin */}
          {isAdmin && (
            <>
              <Divider sx={{ my: 1 }} />

              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/admin"
                    onClick={onClose}
                  >
                    <ListItemIcon sx={{ minWidth: 34 }}>
                      <Dashboard fontSize="small" />
                    </ListItemIcon>

                    <ListItemText primary="Admin Dashboard" />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )}
        </Box>

        {/* Footer */}
        {isAuthenticated && (
          <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
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
