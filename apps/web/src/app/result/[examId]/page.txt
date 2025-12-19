// src/app/result/[examId]/page.tsx
"use client";
import React from "react";
import { useResult } from "@/contexts/ResultContext";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { CheckCircle, Cancel, RemoveCircle } from "@mui/icons-material";

export default function ExamResultPage() {
  const { result } = useResult(); // Get data passed from Exam Page
  const router = useRouter();

  if (!result) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography>No result found. Please take an exam first.</Typography>
        <Button onClick={() => router.push("/exam-list")} sx={{ mt: 2 }}>
          Go to Exams
        </Button>
      </Container>
    );
  }

  const {
    examName,
    score,
    correctCount,
    wrongCount,
    totalQuestions,
    answers,
    examData,
  } = result;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Score Card */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 4,
          mb: 6,
          bgcolor: "#f8f9fa",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          {examName} Result
        </Typography>
        <Typography
          variant="h2"
          fontWeight="800"
          color={score >= 40 ? "green" : "red"}
        >
          {score.toFixed(2)}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Total Marks
        </Typography>

        <Grid container spacing={2} justifyContent="center" mt={3}>
          <Grid item>
            <ChipData
              label="Correct"
              count={correctCount}
              color="success.main"
            />
          </Grid>
          <Grid item>
            <ChipData label="Wrong" count={wrongCount} color="error.main" />
          </Grid>
          <Grid item>
            <ChipData
              label="Skipped"
              count={totalQuestions - (correctCount + wrongCount)}
              color="warning.main"
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Detailed Solution
      </Typography>

      {/* Detailed Review */}
      {examData.sections.map((sec: any) => (
        <Box key={sec.id} mb={4}>
          <Typography
            variant="h6"
            sx={{ bgcolor: "#e3f2fd", p: 1, borderRadius: 1, mb: 2 }}
          >
            {sec.name}
          </Typography>

          {sec.questions.map((q: any, idx: number) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctOption;
            const isSkipped = !userAnswer;

            return (
              <Paper
                key={q.id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderLeft: `4px solid ${
                    isCorrect ? "green" : isSkipped ? "orange" : "red"
                  }`,
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="bold">
                    Q{idx + 1}. {q.text}
                  </Typography>
                  {isCorrect ? (
                    <CheckCircle color="success" />
                  ) : isSkipped ? (
                    <RemoveCircle color="warning" />
                  ) : (
                    <Cancel color="error" />
                  )}
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Your Answer: <strong>{userAnswer || "Skipped"}</strong> |
                  Correct Answer: <strong>{q.correctOption}</strong>
                </Typography>

                {q.explanation && (
                  <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
                    <Typography variant="caption" fontWeight="bold">
                      Explanation:
                    </Typography>
                    <Typography variant="body2">{q.explanation}</Typography>
                  </Box>
                )}
              </Paper>
            );
          })}
        </Box>
      ))}
    </Container>
  );
}

function ChipData({ label, count, color }: any) {
  return (
    <Box
      sx={{
        border: `1px solid`,
        borderColor: color,
        borderRadius: 2,
        px: 3,
        py: 1,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color={color}>
        {count}
      </Typography>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
}