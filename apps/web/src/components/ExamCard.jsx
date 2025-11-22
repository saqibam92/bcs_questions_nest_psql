// src/components/ExamCard.jsx

"use client"
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

const ExamCard = ({ exam, onClick }) => (
  <Card className="m-4 shadow-md hover:shadow-lg transition-shadow">
    <CardActionArea onClick={onClick}>
      <CardContent>
        <Typography variant="h6" className="font-bold">
          {exam.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ExamCard;