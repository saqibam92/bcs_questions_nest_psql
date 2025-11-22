// src/app/exam-list/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";
import { Timer, Quiz } from "@mui/icons-material";

export default function ExamListPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/exam").then(({ data }) => {
      setExams(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        mb={6}
      >
        Available Exams
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} md={4} key={i}>
              <Skeleton height={200} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {exams.map((exam) => (
            <Grid item key={exam.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                  >
                    {exam.name}
                  </Typography>

                  <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                    <Chip
                      icon={<Timer />}
                      label={`${exam.durationMinutes || 60} min`}
                      size="small"
                    />
                    <Chip
                      icon={<Quiz />}
                      label={`${exam.totalMarks} Marks`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {exam.description
                      ? exam.description.substring(0, 100) + "..."
                      : "No description available."}
                  </Typography>
                </CardContent>
                <Box p={2} pt={0}>
                  <Link
                    href={`/exam/${exam.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="large" variant="contained" fullWidth>
                      Start Exam
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}