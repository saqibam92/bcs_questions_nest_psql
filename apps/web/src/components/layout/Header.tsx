// apps/web/src/components/layout/Header.tsx
"use client";

import React from "react";
import { Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    // <Toolbar
    //   sx={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     px: { xs: 2, sm: 3 },
    //     py: 0.5,
    //   }}
    // >
    //   {/* Menu Button - Placed on the Left for traditional mobile feel, or Right.
    //       I'll leave it on the right to match your original code */}
    //   <Link
    //     href="/"
    //     style={{
    //       textDecoration: "none",
    //       color: "inherit",
    //       flexGrow: 1,
    //       display: "flex",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Typography
    //       variant="h6"
    //       component="div"
    //       sx={{
    //         fontWeight: 800,
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 0.5,
    //         letterSpacing: "-0.5px",
    //       }}
    //     >
    //       <span style={{ color: "#EAB308" }}>BCS</span>
    //       <span style={{ color: "#2563EB" }}>Questions</span>
    //     </Typography>
    //   </Link>

    //   <IconButton
    //     edge="end"
    //     color="inherit"
    //     aria-label="open menu"
    //     onClick={onMenuClick}
    //     sx={{
    //       ml: 2,
    //       bgcolor: "rgba(0, 0, 0, 0.04)",
    //       "&:hover": {
    //         bgcolor: "rgba(0, 0, 0, 0.08)",
    //       },
    //     }}
    //   >
    //     <MenuIcon />
    //   </IconButton>
    // </Toolbar>

    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
        py: 0.5,
        bgcolor: "#ffffff",
        borderBottom: "1px solid #eee",
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open menu"
        onClick={onMenuClick}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            display: "flex",
            gap: 0.5,
          }}
        >
          <span style={{ color: "#EAB308" }}>BCS</span>
          <span style={{ color: "#2563EB" }}>Questions</span>
        </Typography>
      </Link>
    </Toolbar>
  );
};