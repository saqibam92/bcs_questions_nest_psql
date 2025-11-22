// src/app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GroupsIcon from "@mui/icons-material/Groups";
import FacebookIcon from "@mui/icons-material/Facebook";
import HomeCard from "../components/HomeCard";

export default function Home() {
  const router = useRouter();

  const menuItems = [
    {
      icon: <EditNoteIcon fontSize="large" />,
      title: "পরীক্ষা",
      description: "বিভিন্ন বিষয়ের MCQ পরীক্ষা দিন",
      path: "/exam-list", // Redirect to exam list
    },
    {
      icon: <WorkspacePremiumIcon fontSize="large" />,
      title: "প্রিমিয়াম কোর্স",
      description: "উচ্চ মানের শিক্ষা প্যাকেজ",
      path: "/premium-courses",
    },
    {
      icon: <OndemandVideoIcon fontSize="large" />,
      title: "ভিডিও কনটেন্ট",
      description: "শিক্ষামূলক ভিডিও দেখুন",
      path: "/video-content",
    },
    {
      icon: <PictureAsPdfIcon fontSize="large" />,
      title: "পিডিএফ ডাউনলোড",
      description: "পিডিএফ ফাইল ডাউনলোড করুন",
      path: "/pdf-downloads",
    },
    {
      icon: <GroupsIcon fontSize="large" />,
      title: "গ্রুপ জয়েন করুন",
      description: "শিক্ষার্থীদের সাথে যোগ দিন",
      path: "/join-group",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      {/* Header */}
      {/* <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span className="font-bold text-yellow-500">BCS</span>
            <span className="font-bold text-blue-600">Questions</span>
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}

      {/* Main Content */}
      <Container component="main" maxWidth="sm" className="py-4">
        <Typography
          variant="body2"
          className="text-center text-red-600 font-semibold my-4"
        >
          সর্বশেষ পরীক্ষা চলছে
        </Typography>

        {menuItems.map((item) => (
          <HomeCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={() => router.push(item.path)}
          />
        ))}

        {/* Footer Buttons */}
        <Box className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#45a049" },
            }}
          >
            লগইন
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{
              backgroundColor: "#1877f2",
              "&:hover": { backgroundColor: "#166fe5" },
            }}
          >
            মেসেজ দিন
          </Button>
        </Box>
      </Container>
    </Box>
  );
}