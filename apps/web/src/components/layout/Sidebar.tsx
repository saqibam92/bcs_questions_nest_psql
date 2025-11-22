// src/components/layout/Sidebar.tsx
"use client";

import React from 'react';
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
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GavelIcon from '@mui/icons-material/Gavel';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import PolicyIcon from '@mui/icons-material/Policy';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { user, logout, loading } = useAuth();

  const menuItems = [
    { text: 'হোমপেজ', icon: <HomeIcon />, path: '/' },
    { text: 'আপনার প্রোফাইল', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'প্যাকেজ কিনুন', icon: <ShoppingCartIcon />, path: '/packages' },
  ];

  const secondaryMenuItems = [
    { text: 'সেন্ট্রাল রুটিন', icon: <EventNoteIcon />, path: '/routine' },
    { text: 'ব্যাবহারের নিয়ম', icon: <GavelIcon />, path: '/rules' },
    { text: 'যোগাযোগ', icon: <ContactSupportIcon />, path: '/contact' },
  ];

  const tertiaryMenuItems = [
    { text: 'আমাদের সম্পর্কে', icon: <InfoIcon />, path: '/about' },
    { text: 'আমাদের পরামর্শকগণ', icon: <PeopleIcon />, path: '/consultants' },
    { text: 'নীতিসমূহ', icon: <PolicyIcon />, path: '/privacy' },
  ];

  const adminMenuItems = [
    {
      text: "Bulk Upload Exams",
      icon: <UploadFileIcon />,
      path: "/admin/upload-exams",
    },
    {
      text: "Upload Questions",
      icon: <AddCircleOutlineIcon />,
      path: "/admin/upload-questions",
    },
  ];

  const renderList = (items: typeof menuItems) => (
    <List>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} href={item.path} onClick={onClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{ width: 250, backgroundColor: "#f0f2f5", height: "100%" }}
        role="presentation"
      >
        {user ? (
          <Box className="p-4 bg-gray-200">
            <Avatar sx={{ width: 56, height: 56, margin: "0 auto" }}>
              {user.name[0].toUpperCase()}
            </Avatar>
            <Typography variant="h6" align="center" className="mt-2">
              {user.name}
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary">
              ID: {user.userId}
            </Typography>
          </Box>
        ) : (
          <Box className="p-4 bg-gray-200 text-center">
            <Button component={Link} href="/login" variant="contained">
              Login
            </Button>
          </Box>
        )}

        <Divider />
        {renderList(menuItems)}
        <Divider />
        {renderList(secondaryMenuItems)}
        <Divider />
        {renderList(tertiaryMenuItems)}
        {user && user.role === "admin" && (
          <>
            <Divider>Admin</Divider>
            {renderList(adminMenuItems)}
          </>
        )}
        <Divider />
        <List>
          {user && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="লগআউট" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};