// src/components/HomeCard.tsx
"use client";

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface HomeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const HomeCard: React.FC<HomeCardProps> = ({ icon, title, description, onClick }) => (
  <Card className="m-4 shadow-md hover:shadow-lg transition-shadow rounded-lg">
    <CardActionArea onClick={onClick} className="text-center p-4">
      <CardContent className="flex gap-4">
        <Box className="mb-4 text-blue-600">{icon}</Box>
        <div>
          <Typography variant="h6" className="font-bold mb-1">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </div>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default HomeCard;