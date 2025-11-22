// src/components/layout/Header.tsx
"use client";

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <AppBar sx={{ backgroundColor: "#f0f2f5"}} position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            <span className="font-bold text-yellow-500">BCS</span>
            <span className="font-bold text-blue-600">Questions</span>
          </Typography>
        </Link>
        <Typography>Menu</Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};