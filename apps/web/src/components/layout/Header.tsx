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
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
        py: 1,
      }}
    >
      {/* Logo/Brand */}
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "inherit",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <span style={{ color: "#EAB308" }}>BCS</span>
          <span style={{ color: "#2563EB" }}>Questions</span>
        </Typography>
      </Link>

      {/* Menu Button */}
      <IconButton
        edge="end"
        color="inherit"
        aria-label="open menu"
        onClick={onMenuClick}
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.04)",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  );
};

// // src/components/layout/Header.tsx
// "use client";

// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Link from 'next/link';

// interface HeaderProps {
//   onMenuClick: () => void;
// }

// export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
//   return (
//     <AppBar sx={{ backgroundColor: "#f0f2f5"}} position="static" color="transparent" elevation={1}>
//       <Toolbar>
//         <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
//           <Typography variant="h6" component="div">
//             <span className="font-bold text-yellow-500">BCS</span>
//             <span className="font-bold text-blue-600">Questions</span>
//           </Typography>
//         </Link>
//         <Typography>Menu</Typography>
//         <IconButton
//           edge="end"
//           color="inherit"
//           aria-label="menu"
//           onClick={onMenuClick}
//         >
//           <MenuIcon />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// };
