// apps/web/src/app/result/[examId]/page.tsx
"use client";
import React from "react";
import { useResult } from "@/contexts/ResultContext";
import { useRouter } from "next/navigation";
import { Container, Paper, Typography, Box, Grid, Button } from "@mui/material";
import { CheckCircle, Cancel, RemoveCircle } from "@mui/icons-material";

export default function ExamResultPage() {
  const { result } = useResult();
  const router = useRouter();

  if (!result) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography gutterBottom>No result found.</Typography>
        <Button onClick={() => router.push("/exam-list")} variant="contained">
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

  // CRITICAL FIX: Ensure correct comparison regardless of whitespace/case
  const normalizeOption = (val?: string) => (val || "").trim().toUpperCase();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Score Header */}
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
          {examName}
        </Typography>
        <Typography
          variant="h2"
          fontWeight="800"
          color={score >= 40 ? "green" : "red"}
        >
          {score.toFixed(2)}{" "}
          <Typography component="span" variant="h5" color="text.secondary">
            Marks
          </Typography>
        </Typography>

        <Grid container spacing={2} justifyContent="center" mt={3}>
          <Box mx={2} textAlign="center">
            <Typography variant="h6" color="success.main">
              {correctCount}
            </Typography>
            <Typography variant="caption">Correct</Typography>
          </Box>
          <Box mx={2} textAlign="center">
            <Typography variant="h6" color="error.main">
              {wrongCount}
            </Typography>
            <Typography variant="caption">Wrong</Typography>
          </Box>
          <Box mx={2} textAlign="center">
            <Typography variant="h6" color="warning.main">
              {totalQuestions - (correctCount + wrongCount)}
            </Typography>
            <Typography variant="caption">Skipped</Typography>
          </Box>
        </Grid>
      </Paper>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Detailed Solution
      </Typography>

      {examData.sections.map((sec) => (
        <Box key={sec.id} mb={4}>
          <Typography
            variant="h6"
            sx={{ bgcolor: "#e3f2fd", p: 1, borderRadius: 1, mb: 2 }}
          >
            {sec.name}
          </Typography>

          {sec.questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const correctOpt = normalizeOption(q.correctOption);

            const isCorrect = userAnswer === correctOpt;
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

                {/* Options Grid for Visual Review */}
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {["A", "B", "C", "D"].map((opt) => {
                    const isThisOptionCorrect = correctOpt === opt;
                    const isThisOptionSelected = userAnswer === opt;

                    let bgcolor = "transparent";
                    if (isThisOptionCorrect) bgcolor = "#e8f5e9"; // Green bg for correct answer
                    if (isThisOptionSelected && !isThisOptionCorrect)
                      bgcolor = "#ffebee"; // Red bg for wrong selection

                    return (
                      <Grid size={{xs:12, sm:6}} key={opt}>
                        <Box
                          sx={{
                            p: 1,
                            border: "1px solid #eee",
                            borderRadius: 1,
                            bgcolor,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            fontWeight="bold"
                            color="text.secondary"
                            sx={{ mr: 1 }}
                          >
                            {opt}.
                          </Typography>
                          <Typography sx={{ flexGrow: 1 }}>
                            {(q as any)[`option${opt}`]}
                          </Typography>

                          {isThisOptionCorrect && (
                            <CheckCircle
                              fontSize="small"
                              color="success"
                              sx={{ ml: "auto" }}
                            />
                          )}
                          {isThisOptionSelected && !isThisOptionCorrect && (
                            <Cancel
                              fontSize="small"
                              color="error"
                              sx={{ ml: "auto" }}
                            />
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                {q.explanation && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 1.5,
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      display="block"
                    >
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